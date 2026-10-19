// ==============================================================================
// HOTEL VICHAR VIMARSH — SERVER-SIDE EMAIL ENQUIRY HANDLER
// ==============================================================================
// Compatible with Vercel / Netlify / Node.js Serverless Functions
// Receives guest accommodation enquiry and dispatches notification via Resend
// Never exposes RESEND_API_KEY in client-side code.
// ==============================================================================

export default async function handler(req: any, res: any) {
  // 1. Enforce POST method only
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Expected POST request.'
    });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});

    // 2. Extract and validate required fields
    const guestName = (body.guestName || body.name || '').trim();
    const mobileNumber = (body.mobileNumber || body.phone || '').trim();
    const emailAddress = (body.emailAddress || body.email || '').trim();
    const roomCategory = (body.roomCategory || body.roomType || '').trim();
    const checkInDate = (body.checkInDate || body.checkIn || '').trim();
    const checkOutDate = (body.checkOutDate || body.checkOut || '').trim();
    const numberOfGuests = body.numberOfGuests || body.guests || '1';
    const specialRequests = (body.specialRequests || '').trim().substring(0, 1000);

    if (!guestName || guestName.length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid guest name (minimum 2 characters).'
      });
    }

    const phoneDigits = mobileNumber.replace(/\D/g, '');
    if (!mobileNumber || phoneDigits.length < 7 || phoneDigits.length > 15) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid contact phone number (7 to 15 digits).'
      });
    }

    if (emailAddress && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address or leave it blank.'
      });
    }

    if (!checkInDate || !checkOutDate) {
      return res.status(400).json({
        success: false,
        error: 'Check-in and check-out dates are required.'
      });
    }

    const checkInTime = new Date(checkInDate).getTime();
    const checkOutTime = new Date(checkOutDate).getTime();
    if (isNaN(checkInTime) || isNaN(checkOutTime) || checkOutTime <= checkInTime) {
      return res.status(400).json({
        success: false,
        error: 'Check-out date must be strictly after check-in date.'
      });
    }

    // 3. Generate human-readable reference code: VV-YYYYMMDD-XXXX
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, '0');
    const day = String(now.getUTCDate()).padStart(2, '0');
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let randomPart = '';
    for (let i = 0; i < 4; i++) {
      randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const referenceCode = `VV-${year}${month}${day}-${randomPart}`;
    const nights = Math.max(1, Math.round((checkOutTime - checkInTime) / (1000 * 60 * 60 * 24)));

    // 4. Server-Side Email Dispatch via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    const receptionEmail = process.env.HOTEL_RECEPTION_EMAIL || 'HOTELVICHARVIMARSH@GMAIL.COM';
    const verifiedSender = process.env.VERIFIED_SENDER_EMAIL || 'onboarding@resend.dev';

    if (!resendApiKey) {
      console.error('[Hotel Vichar Vimarsh] RESEND_API_KEY is not configured on the server.');
      return res.status(503).json({
        success: false,
        error: 'Server email service is not configured (RESEND_API_KEY is missing). Please contact reception directly via WhatsApp or phone.'
      });
    }

    // Escape untrusted guest input for safe HTML insertion
    const escapeHtml = (str: string) =>
      (str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

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

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
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
      const errorText = await resendResponse.text();
      console.error('[Resend Error]', resendResponse.status, errorText);
      return res.status(502).json({
        success: false,
        error: `Email service rejected the message (${resendResponse.status}). Please verify sending domain or contact reception directly.`
      });
    }

    const resendResult = await resendResponse.json();

    return res.status(200).json({
      success: true,
      referenceCode,
      providerId: resendResult?.id,
      message: 'Enquiry email successfully accepted by Resend for reception dispatch.'
    });

  } catch (err: any) {
    console.error('Server error handling enquiry:', err);
    return res.status(500).json({
      success: false,
      error: 'An unexpected server error occurred. Please call reception directly.'
    });
  }
}
