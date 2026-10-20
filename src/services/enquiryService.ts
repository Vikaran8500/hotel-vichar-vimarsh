// ==============================================================================
// HOTEL VICHAR VIMARSH — CLIENT-SIDE WHATSAPP ENQUIRY SERVICE
// ==============================================================================
// Pure client-side validation and WhatsApp click-to-chat URL generator
// Does not require API keys, server backends, or email services.
// ==============================================================================

export interface EnquiryPayload {
  guestName: string;
  mobileNumber: string;
  emailAddress?: string;
  roomCategory: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number | string;
  specialRequests?: string;
}

/**
 * Validates enquiry input fields on the client before opening WhatsApp
 */
export function validateEnquiryInput(payload: EnquiryPayload): { isValid: boolean; error?: string } {
  if (!payload.guestName || payload.guestName.trim().length < 2) {
    return { isValid: false, error: 'Please enter your full name (minimum 2 characters).' };
  }

  const phoneDigits = (payload.mobileNumber || '').replace(/\D/g, '');
  if (phoneDigits.length < 7 || phoneDigits.length > 15) {
    return { isValid: false, error: 'Please enter a valid mobile number (7 to 15 digits).' };
  }

  if (payload.emailAddress && payload.emailAddress.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(payload.emailAddress.trim())) {
      return { isValid: false, error: 'Please enter a valid email address, or leave it blank.' };
    }
  }

  if (!payload.checkInDate || !payload.checkOutDate) {
    return { isValid: false, error: 'Please select both check-in and check-out dates.' };
  }

  const checkIn = new Date(payload.checkInDate).getTime();
  const checkOut = new Date(payload.checkOutDate).getTime();
  if (isNaN(checkIn) || isNaN(checkOut) || checkOut <= checkIn) {
    return { isValid: false, error: 'Check-out date must be strictly after your check-in date.' };
  }

  const guestsNum = parseInt(String(payload.numberOfGuests).replace(/\D/g, ''), 10) || 1;
  if (guestsNum < 1 || guestsNum > 10) {
    return { isValid: false, error: 'Guest count must be between 1 and 10.' };
  }

  return { isValid: true };
}

/**
 * Builds a structured, pre-filled WhatsApp click-to-chat URL
 */
export function buildWhatsAppEnquiryUrl(
  payload: EnquiryPayload,
  referenceCode: string,
  whatsappNumber: string = '919251112789'
): string {
  const checkIn = new Date(payload.checkInDate).getTime();
  const checkOut = new Date(payload.checkOutDate).getTime();
  const diffDays = Math.max(1, Math.round((checkOut - checkIn) / (1000 * 60 * 60 * 24)));
  const nightsText = `${diffDays} Night${diffDays > 1 ? 's' : ''}`;

  const emailPart = payload.emailAddress?.trim() ? `*Email:* ${payload.emailAddress.trim()}\n` : '';
  const requestsPart = payload.specialRequests?.trim()
    ? `*Special Requests:* ${payload.specialRequests.trim()}\n`
    : '*Special Requests:* None\n';

  const text =
    `*HOTEL VICHAR VIMARSH - STAY ENQUIRY*\n\n` +
    `*Reference Code:* ${referenceCode}\n` +
    `*Guest Name:* ${payload.guestName.trim()}\n` +
    `*Phone Number:* ${payload.mobileNumber.trim()}\n` +
    emailPart +
    `*Selected Room:* ${payload.roomCategory}\n` +
    `*Check-In Date:* ${payload.checkInDate}\n` +
    `*Check-Out Date:* ${payload.checkOutDate} (${nightsText})\n` +
    `*Guest Count:* ${payload.numberOfGuests}\n` +
    requestsPart +
    `\nHello Reception Desk, please share room availability and tariff quote for this stay enquiry. Thank you!`;

  const cleanPhone = whatsappNumber.replace(/\D/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}
