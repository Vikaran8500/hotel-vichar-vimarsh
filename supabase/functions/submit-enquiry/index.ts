// ==============================================================================
// HOTEL VICHAR VIMARSH — SUPABASE EDGE FUNCTION: submit-enquiry
// ==============================================================================
// Runtime: Deno (Supabase Edge Functions)
// Dispatches guest accommodation enquiries directly to reception email via Resend
// Database-free & serverless for simple, reliable email notifications.
// ==============================================================================

const VALID_ROOM_CATEGORIES = [
  "Budget Single Bed Room",
  "Small Economy Double Room",
  "Premium Double Room with Jacuzzi"
] as const;

// Safe HTML character escaping to prevent HTML injection in emails
function escapeHtml(str: string): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Generate human-readable reference code: VV-YYYYMMDD-XXXX
function generateReferenceCode(): string {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const day = String(now.getUTCDate()).padStart(2, "0");
  const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  let randomPart = "";
  for (let i = 0; i < 4; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `VV-${year}${month}${day}-${randomPart}`;
}

// Dynamic CORS configuration
function getCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("origin") || "";
  const allowedOriginEnv = Deno.env.get("ALLOWED_ORIGIN");
  
  const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    ...(allowedOriginEnv ? [allowedOriginEnv.trim()] : [])
  ];

  const isAllowed = allowedOrigins.includes(origin) || (allowedOriginEnv === "*" && origin);
  const resolvedOrigin = isAllowed ? origin : (allowedOriginEnv || "http://localhost:5173");

  return {
    "Access-Control-Allow-Origin": resolvedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, x-client-info, apikey",
    "Access-Control-Max-Age": "86400",
    "Content-Type": "application/json"
  };
}

Deno.serve(async (req: Request) => {
  const corsHeaders = getCorsHeaders(req);

  // 1. Handle CORS Preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  // 2. Enforce HTTP POST only
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ success: false, error: "Method not allowed. Use POST." }),
      { status: 405, headers: corsHeaders }
    );
  }

  try {
    // 3. Parse Payload
    const rawBody = await req.text();
    let payload: any;
    try {
      payload = JSON.parse(rawBody || "{}");
    } catch {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid JSON format." }),
        { status: 400, headers: corsHeaders }
      );
    }

    // 4. Server-Side Input Normalization & Validation
    const guestName = (payload.guestName || payload.name || "").trim();
    const mobileNumber = (payload.mobileNumber || payload.phone || "").trim();
    const emailAddress = (payload.emailAddress || payload.email || "").trim();
    const roomCategory = (payload.roomCategory || payload.roomType || "").trim();
    const checkInDate = (payload.checkInDate || payload.checkIn || "").trim();
    const checkOutDate = (payload.checkOutDate || payload.checkOut || "").trim();
    const numberOfGuests = payload.numberOfGuests || payload.guests || "1";
    const specialRequests = (payload.specialRequests || "").trim().substring(0, 1000);

    if (!guestName || guestName.length < 2) {
      return new Response(
        JSON.stringify({ success: false, error: "Please enter a valid guest name (minimum 2 characters)." }),
        { status: 400, headers: corsHeaders }
      );
    }

    const phoneDigits = mobileNumber.replace(/\D/g, "");
    if (!mobileNumber || phoneDigits.length < 7 || phoneDigits.length > 15) {
      return new Response(
        JSON.stringify({ success: false, error: "Please enter a valid contact phone number (7 to 15 digits)." }),
        { status: 400, headers: corsHeaders }
      );
    }

    if (emailAddress && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) {
      return new Response(
        JSON.stringify({ success: false, error: "Please provide a valid email address or leave it blank." }),
        { status: 400, headers: corsHeaders }
      );
    }

    if (!checkInDate || !checkOutDate) {
      return new Response(
        JSON.stringify({ success: false, error: "Check-in and check-out dates are required." }),
        { status: 400, headers: corsHeaders }
      );
    }

    const checkInTime = new Date(checkInDate).getTime();
    const checkOutTime = new Date(checkOutDate).getTime();
    if (isNaN(checkInTime) || isNaN(checkOutTime) || checkOutTime <= checkInTime) {
      return new Response(
        JSON.stringify({ success: false, error: "Check-out date must be strictly after check-in date." }),
        { status: 400, headers: corsHeaders }
      );
    }

    // 5. Generate Safe Reference Code
    const referenceCode = generateReferenceCode();
    const nights = Math.max(1, Math.round((checkOutTime - checkInTime) / (1000 * 60 * 60 * 24)));

    // 6. Server-Side Email Dispatch via Resend
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const receptionEmail = Deno.env.get("HOTEL_RECEPTION_EMAIL") || "HOTELVICHARVIMARSH@GMAIL.COM";
    const verifiedSender = Deno.env.get("VERIFIED_SENDER_EMAIL") || "onboarding@resend.dev";

    if (!resendApiKey) {
      console.error("Missing RESEND_API_KEY secret.");
      return new Response(
        JSON.stringify({
          success: false,
          error: "Server email service is not configured (RESEND_API_KEY is missing). Please contact reception directly via WhatsApp or phone."
        }),
        { status: 503, headers: corsHeaders }
      );
    }

    const emailHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>New Accommodation Enquiry</title></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f6f2; color: #1f1f1f; margin: 0; padding: 24px;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e0d8; border-top: 4px solid #c8a24c; padding: 32px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
    <div style="margin-bottom: 24px; border-bottom: 1px solid #f0ece1; padding-bottom: 16px;">
      <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #9c782b; font-weight: 600;">Hotel Vichar Vimarsh • Front Desk Alert</span>
      <h2 style="margin: 8px 0 4px 0; color: #141414; font-size: 22px;">New Stay Enquiry Received</h2>
      <p style="margin: 0; font-size: 13px; color: #666666;">Reference Code: <strong style="color: #9c782b; font-family: monospace; font-size: 15px;">${escapeHtml(referenceCode)}</strong></p>
    </div>

    <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
      <tr style="background: #faf8f5;">
        <td style="padding: 10px 14px; border: 1px solid #ede8de; font-weight: 600; width: 38%; color: #444;">Guest Name:</td>
        <td style="padding: 10px 14px; border: 1px solid #ede8de; color: #111;"><strong>${escapeHtml(guestName)}</strong></td>
      </tr>
      <tr>
        <td style="padding: 10px 14px; border: 1px solid #ede8de; font-weight: 600; color: #444;">Contact Phone:</td>
        <td style="padding: 10px 14px; border: 1px solid #ede8de;"><a href="tel:${escapeHtml(mobileNumber)}" style="color: #9c782b; text-decoration: none; font-weight: 600;">${escapeHtml(mobileNumber)}</a></td>
      </tr>
      <tr style="background: #faf8f5;">
        <td style="padding: 10px 14px; border: 1px solid #ede8de; font-weight: 600; color: #444;">Email Address:</td>
        <td style="padding: 10px 14px; border: 1px solid #ede8de;">${emailAddress ? `<a href="mailto:${escapeHtml(emailAddress)}" style="color: #444;">${escapeHtml(emailAddress)}</a>` : '<em style="color:#888;">Not provided</em>'}</td>
      </tr>
      <tr>
        <td style="padding: 10px 14px; border: 1px solid #ede8de; font-weight: 600; color: #444;">Room Category:</td>
        <td style="padding: 10px 14px; border: 1px solid #ede8de; color: #111; font-weight: 600;">${escapeHtml(roomCategory)}</td>
      </tr>
      <tr style="background: #faf8f5;">
        <td style="padding: 10px 14px; border: 1px solid #ede8de; font-weight: 600; color: #444;">Dates of Stay:</td>
        <td style="padding: 10px 14px; border: 1px solid #ede8de;"><strong>${escapeHtml(checkInDate)}</strong> to <strong>${escapeHtml(checkOutDate)}</strong> (${nights} Night${nights > 1 ? 's' : ''})</td>
      </tr>
      <tr>
        <td style="padding: 10px 14px; border: 1px solid #ede8de; font-weight: 600; color: #444;">Number of Guests:</td>
        <td style="padding: 10px 14px; border: 1px solid #ede8de;">${escapeHtml(String(numberOfGuests))}</td>
      </tr>
      <tr style="background: #faf8f5;">
        <td style="padding: 10px 14px; border: 1px solid #ede8de; font-weight: 600; color: #444;">Special Requests:</td>
        <td style="padding: 10px 14px; border: 1px solid #ede8de; color: #333;">${specialRequests ? escapeHtml(specialRequests) : '<em style="color:#888;">None mentioned</em>'}</td>
      </tr>
    </table>

    <div style="background: #fff8e8; border-left: 4px solid #c8a24c; padding: 14px; font-size: 13px; color: #5a4516; margin-bottom: 24px;">
      <strong>Action Required:</strong> Please contact the guest promptly to confirm room availability and direct tariff.
    </div>

    <div style="text-align: center; border-top: 1px solid #f0ece1; padding-top: 20px; font-size: 12px; color: #888888;">
      <p style="margin: 0;">Hotel Vichar Vimarsh • Direct Stay Inquiry System</p>
      <p style="margin: 4px 0 0 0;">This email is an automated dispatch from your official hotel website.</p>
    </div>
  </div>
</body>
</html>
    `.trim();

    const emailText = `
HOTEL VICHAR VIMARSH — NEW ACCOMMODATION ENQUIRY
===============================================
Reference Code: ${referenceCode}

Guest Name:       ${guestName}
Contact Phone:    ${mobileNumber}
Email Address:    ${emailAddress || 'Not provided'}
Room Category:    ${roomCategory}
Dates of Stay:    ${checkInDate} to ${checkOutDate} (${nights} Night${nights > 1 ? 's' : ''})
Guests:           ${numberOfGuests}
Special Requests: ${specialRequests || 'None'}

Please contact the guest to confirm room availability and direct tariff.
    `.trim();

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: `Hotel Vichar Vimarsh <${verifiedSender}>`,
        to: [receptionEmail],
        subject: `[New Stay Enquiry] ${referenceCode} — ${guestName} (${roomCategory})`,
        html: emailHtml,
        text: emailText
      })
    });

    if (!resendResponse.ok) {
      const resendErr = await resendResponse.text();
      console.error("Resend API failed:", resendErr);
      return new Response(
        JSON.stringify({
          success: false,
          error: `Email service rejected the message (${resendResponse.status}). Please check sender domain or contact reception directly.`
        }),
        { status: 502, headers: corsHeaders }
      );
    }

    const resendData = await resendResponse.json();

    return new Response(
      JSON.stringify({
        success: true,
        referenceCode: referenceCode,
        providerId: resendData?.id,
        message: "Enquiry email successfully accepted by Resend for reception dispatch."
      }),
      { status: 200, headers: corsHeaders }
    );

  } catch (error: any) {
    console.error("Unexpected error:", error?.message);
    return new Response(
      JSON.stringify({
        success: false,
        error: "An unexpected error occurred while processing your request. Please call reception directly."
      }),
      { status: 500, headers: corsHeaders }
    );
  }
});
