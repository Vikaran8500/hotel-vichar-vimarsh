import React, { useState, useEffect, useCallback } from 'react';
import {
  X,
  Calendar,
  Users,
  BedDouble,
  Phone,
  Mail,
  User,
  MessageSquare,
  CheckCircle,
  ShieldCheck,
  MessageCircle,
  AlertCircle
} from 'lucide-react';
import { HOTEL_INFO, ROOMS } from '../data/hotelData';
import { Room, BookingInquiry } from '../types';
import { validateEnquiryInput, buildWhatsAppEnquiryUrl } from '../services/enquiryService';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDetails?: {
    checkIn?: string;
    checkOut?: string;
    roomType?: string;
    guests?: string;
  };
  initialRoom?: Room | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialDetails,
  initialRoom,
}) => {
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const today = formatDate(new Date());
  const tomorrow = formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000));

  const [formData, setFormData] = useState<BookingInquiry>({
    name: '',
    phone: '',
    email: '',
    checkIn: initialDetails?.checkIn || today,
    checkOut: initialDetails?.checkOut || tomorrow,
    roomType: initialRoom?.name || initialDetails?.roomType || ROOMS[0].name,
    guests: initialDetails?.guests || '2 Guests',
    specialRequests: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [whatsappLink, setWhatsappLink] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  useEffect(() => {
    if (initialRoom) {
      setFormData((prev) => ({ ...prev, roomType: initialRoom.name }));
    }
    if (initialDetails && (initialDetails.checkIn || initialDetails.roomType)) {
      setFormData((prev) => ({
        ...prev,
        checkIn: initialDetails.checkIn || prev.checkIn,
        checkOut: initialDetails.checkOut || prev.checkOut,
        roomType: initialDetails.roomType || prev.roomType,
        guests: initialDetails.guests || prev.guests,
      }));
    }
  }, [initialRoom, initialDetails]);

  // Calculate number of nights
  const calculateNights = () => {
    const start = new Date(formData.checkIn).getTime();
    const end = new Date(formData.checkOut).getTime();
    const diff = (end - start) / (1000 * 60 * 60 * 24);
    return diff > 0 ? Math.round(diff) : 1;
  };

  const nights = calculateNights();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setErrorMessage(null);

    if (name === 'checkIn') {
      setFormData((prev) => {
        let updatedCheckOut = prev.checkOut;
        if (value >= prev.checkOut) {
          const nextDay = new Date(new Date(value).getTime() + 24 * 60 * 60 * 1000);
          updatedCheckOut = formatDate(nextDay);
        }
        return { ...prev, checkIn: value, checkOut: updatedCheckOut };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit Enquiry Directly via WhatsApp Click-to-Chat
  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // 1. Client-Side Input Validation
    const validation = validateEnquiryInput({
      guestName: formData.name,
      mobileNumber: formData.phone,
      emailAddress: formData.email,
      roomCategory: formData.roomType,
      checkInDate: formData.checkIn,
      checkOutDate: formData.checkOut,
      numberOfGuests: formData.guests,
      specialRequests: formData.specialRequests,
    });

    if (!validation.isValid) {
      setErrorMessage(validation.error || 'Please fill in all required fields accurately.');
      return;
    }

    // 2. Generate local reference code: VV-YYYYMMDD-XXXX
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let rand = '';
    for (let i = 0; i < 4; i++) {
      rand += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const generatedRef = referenceId || `VV-${year}${month}${day}-${rand}`;
    setReferenceId(generatedRef);

    // 3. Build WhatsApp URL with full pre-filled inquiry details
    const receptionWhatsApp = HOTEL_INFO.whatsapp || '919251112789';
    const url = buildWhatsAppEnquiryUrl(
      {
        guestName: formData.name,
        mobileNumber: formData.phone,
        emailAddress: formData.email,
        roomCategory: formData.roomType,
        checkInDate: formData.checkIn,
        checkOutDate: formData.checkOut,
        numberOfGuests: formData.guests,
        specialRequests: formData.specialRequests,
      },
      generatedRef,
      receptionWhatsApp
    );

    setWhatsappLink(url);

    // 4. Open WhatsApp in new tab / application
    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.warn('Could not open WhatsApp window automatically:', err);
    }

    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div
      id="booking-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-900/90 backdrop-blur-md p-4 sm:p-6 overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="booking-modal-container"
        className="relative w-full max-w-2xl bg-ivory-50 border border-sandstone shadow-warm-xl my-8 overflow-hidden text-charcoal-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-charcoal-900 text-ivory-100 p-5 sm:p-6 flex items-center justify-between border-b border-gold/40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 p-1 bg-charcoal-800 border border-gold/50 flex items-center justify-center">
              <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-medium tracking-wide text-ivory-50">
                Direct Stay Enquiry Desk
              </h3>
              <p className="text-[10px] uppercase font-sans tracking-widest text-gold font-semibold">
                Hotel Vichar Vimarsh • 24/7 WhatsApp Reception Desk
              </p>
            </div>
          </div>

          <button
            id="modal-close-btn"
            type="button"
            onClick={onClose}
            className="p-1.5 text-ivory-300 hover:text-gold transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        {submitted ? (
          <div id="booking-success-view" className="p-6 sm:p-10 text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center shadow-inner">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase font-sans font-semibold tracking-widest text-gold-700">
                WHATSAPP ENQUIRY PREPARED
              </span>
              <h4 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-medium">
                Thank You, {formData.name}
              </h4>
              <p className="text-sm text-charcoal-600 font-light max-w-md mx-auto leading-relaxed">
                Your direct enquiry reference code is{' '}
                <strong className="font-mono text-gold-800 font-semibold text-base block mt-1 py-1 px-3 bg-ivory-200 border border-gold/40 rounded inline-block">
                  {referenceId}
                </strong>
              </p>
            </div>

            {/* Notification Delivery Notice */}
            <div className="max-w-md mx-auto text-left text-xs p-3.5 space-y-1 rounded border bg-emerald-50/80 border-emerald-200 text-emerald-950">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block">
                    WhatsApp Chat Prepared with Enquiry Details
                  </span>
                  <span>
                    WhatsApp has opened in a new tab with your pre-filled enquiry. Please click <strong>Send</strong> in your WhatsApp window to deliver the message to our reception desk ({HOTEL_INFO.phones[0].number}).
                  </span>
                </div>
              </div>
            </div>

            {/* Accommodation Disclaimer */}
            <div className="p-3 bg-gold-50/70 border border-gold/30 text-xs text-gold-900 max-w-md mx-auto text-left leading-relaxed">
              <strong>Notice:</strong> Every submission is an accommodation enquiry and does not constitute a confirmed reservation. Our 24/7 reception team will respond via WhatsApp or call to verify live room availability, direct tariff rates, and arrival details.
            </div>

            {/* Summary Card */}
            <div className="p-4 bg-ivory-200/80 border border-sandstone/60 text-xs text-left max-w-md mx-auto space-y-2">
              <div className="flex justify-between">
                <span className="text-charcoal-600">Selected Room:</span>
                <span className="font-semibold text-charcoal-900">{formData.roomType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-600">Dates of Stay:</span>
                <span className="font-semibold text-charcoal-900">
                  {formData.checkIn} to {formData.checkOut} ({nights} Night{nights > 1 ? 's' : ''})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-600">Guests:</span>
                <span className="font-semibold text-charcoal-900">{formData.guests}</span>
              </div>
              {formData.email && (
                <div className="flex justify-between">
                  <span className="text-charcoal-600">Email:</span>
                  <span className="font-semibold text-charcoal-900">{formData.email}</span>
                </div>
              )}
            </div>

            {/* WhatsApp Click-to-Chat Re-open */}
            <div className="max-w-md mx-auto pt-1 space-y-2">
              <a
                id="modal-success-whatsapp-btn"
                href={whatsappLink || HOTEL_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-ivory-50 text-xs uppercase font-sans font-semibold tracking-wider transition-colors flex items-center justify-center gap-2 shadow-warm-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open in WhatsApp ({HOTEL_INFO.phones[0].number})</span>
              </a>
              <span className="text-[10px] text-charcoal-500 block leading-tight">
                If the chat didn't open automatically, click the button above to launch WhatsApp.
              </span>
            </div>

            {/* Actions: Call Reception & Close */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                id="modal-success-call-btn"
                href={`tel:${HOTEL_INFO.phones[0].tel}`}
                className="w-full sm:w-auto px-6 py-3 bg-charcoal-900 text-gold text-xs uppercase font-sans font-semibold tracking-widest hover:bg-gold hover:text-charcoal-900 transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Desk: {HOTEL_INFO.phones[0].number}</span>
              </a>

              <button
                id="modal-success-close-btn"
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setErrorMessage(null);
                  onClose();
                }}
                className="w-full sm:w-auto px-6 py-3 border border-sandstone text-charcoal-800 text-xs uppercase font-sans font-semibold tracking-widest hover:border-charcoal-900 transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form id="booking-modal-form" onSubmit={handleWhatsAppSubmit} className="p-6 sm:p-8 space-y-5">
            {/* Top Info Banner */}
            <div className="p-3 bg-gold-50 border border-gold/30 flex items-center gap-2.5 text-xs text-gold-900">
              <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0" />
              <span>
                Submit your stay enquiry to connect directly with our 24/7 reception desk on WhatsApp for live room availability and tariff quotes.
              </span>
            </div>

            {/* Error Message Alert */}
            {errorMessage && (
              <div
                id="modal-error-alert"
                className="p-3 bg-rose-50 border border-rose-300 text-rose-800 text-xs flex items-start gap-2.5 animate-fadeIn"
              >
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-semibold block">Please Check Your Input</span>
                  <span>{errorMessage}</span>
                </div>
              </div>
            )}

            {/* Room Preview Banner when inquiring about a specific room */}
            {initialRoom && (
              <div className="p-3 bg-ivory-200/90 border border-gold/40 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={initialRoom.image}
                    alt={initialRoom.name}
                    className="w-12 h-10 object-cover border border-gold/40"
                  />
                  <div>
                    <span className="text-[10px] uppercase font-sans tracking-widest text-gold-800 font-semibold block">
                      Enquiring About
                    </span>
                    <span className="font-serif text-sm font-medium text-charcoal-900">
                      {initialRoom.name}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-sans text-charcoal-600 hidden sm:inline">
                  {initialRoom.size} • {initialRoom.occupancy}
                </span>
              </div>
            )}

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-1">
                <label htmlFor="modal-name-input" className="text-[10px] font-sans font-semibold uppercase tracking-wider text-charcoal-700 flex items-center gap-1">
                  <User className="w-3 h-3 text-gold" />
                  Full Name *
                </label>
                <input
                  id="modal-name-input"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Vikram Sharma"
                  className="w-full p-2.5 bg-ivory-100 border border-sandstone text-sm focus:outline-none focus:border-gold"
                />
              </div>

              {/* Mobile Phone */}
              <div className="space-y-1">
                <label htmlFor="modal-phone-input" className="text-[10px] font-sans font-semibold uppercase tracking-wider text-charcoal-700 flex items-center gap-1">
                  <Phone className="w-3 h-3 text-gold" />
                  Mobile Number (WhatsApp) *
                </label>
                <input
                  id="modal-phone-input"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. +91 98765 43210"
                  className="w-full p-2.5 bg-ivory-100 border border-sandstone text-sm focus:outline-none focus:border-gold"
                />
              </div>

              {/* Email (Optional) */}
              <div className="space-y-1">
                <label htmlFor="modal-email-input" className="text-[10px] font-sans font-semibold uppercase tracking-wider text-charcoal-700 flex items-center gap-1">
                  <Mail className="w-3 h-3 text-gold" />
                  Your Email Address (Optional)
                </label>
                <input
                  id="modal-email-input"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g. vikram@example.com"
                  className="w-full p-2.5 bg-ivory-100 border border-sandstone text-sm focus:outline-none focus:border-gold"
                />
              </div>

              {/* Room Selection */}
              <div className="space-y-1">
                <label htmlFor="modal-room-select" className="text-[10px] font-sans font-semibold uppercase tracking-wider text-charcoal-700 flex items-center gap-1">
                  <BedDouble className="w-3 h-3 text-gold" />
                  Select Accommodation *
                </label>
                <select
                  id="modal-room-select"
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleInputChange}
                  className="w-full p-2.5 bg-ivory-100 border border-sandstone text-sm focus:outline-none focus:border-gold"
                >
                  {ROOMS.map((r) => (
                    <option key={r.id} value={r.name}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Check-In */}
              <div className="space-y-1">
                <label htmlFor="modal-checkin-input" className="text-[10px] font-sans font-semibold uppercase tracking-wider text-charcoal-700 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-gold" />
                  Check-In Date *
                </label>
                <input
                  id="modal-checkin-input"
                  type="date"
                  name="checkIn"
                  min={today}
                  value={formData.checkIn}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2.5 bg-ivory-100 border border-sandstone text-sm focus:outline-none focus:border-gold"
                />
              </div>

              {/* Check-Out */}
              <div className="space-y-1">
                <label htmlFor="modal-checkout-input" className="text-[10px] font-sans font-semibold uppercase tracking-wider text-charcoal-700 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-gold" />
                  Check-Out Date * ({nights} Night{nights > 1 ? 's' : ''})
                </label>
                <input
                  id="modal-checkout-input"
                  type="date"
                  name="checkOut"
                  min={formData.checkIn}
                  value={formData.checkOut}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2.5 bg-ivory-100 border border-sandstone text-sm focus:outline-none focus:border-gold"
                />
              </div>

              {/* Guests Count */}
              <div className="space-y-1 sm:col-span-2">
                <label htmlFor="modal-guests-select" className="text-[10px] font-sans font-semibold uppercase tracking-wider text-charcoal-700 flex items-center gap-1">
                  <Users className="w-3 h-3 text-gold" />
                  Number of Guests *
                </label>
                <select
                  id="modal-guests-select"
                  name="guests"
                  value={formData.guests}
                  onChange={handleInputChange}
                  className="w-full p-2.5 bg-ivory-100 border border-sandstone text-sm focus:outline-none focus:border-gold"
                >
                  <option value="1 Guest">1 Guest</option>
                  <option value="2 Guests">2 Guests (Couple / Friends)</option>
                  <option value="3 Guests">3 Guests (with Extra Bed)</option>
                  <option value="4 Guests">Family Group (4 Guests)</option>
                  <option value="5+ Guests">Group (5+ Guests)</option>
                </select>
              </div>

              {/* Special Requests */}
              <div className="space-y-1 sm:col-span-2">
                <label htmlFor="modal-requests-input" className="text-[10px] font-sans font-semibold uppercase tracking-wider text-charcoal-700 flex items-center gap-1">
                  <MessageSquare className="w-3 h-3 text-gold" />
                  Special Requests / Arrival Notes
                </label>
                <textarea
                  id="modal-requests-input"
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  rows={2}
                  maxLength={1000}
                  placeholder="e.g. Late night arrival around 1:00 AM, ground floor preference, quiet room..."
                  className="w-full p-2.5 bg-ivory-100 border border-sandstone text-sm focus:outline-none focus:border-gold"
                />
              </div>
            </div>

            {/* WhatsApp Enquiry Submission Button */}
            <div className="pt-2">
              <button
                id="modal-whatsapp-btn"
                type="submit"
                className="w-full py-4 px-6 bg-emerald-700 hover:bg-emerald-800 text-ivory-50 text-xs sm:text-sm uppercase font-sans font-semibold tracking-wider transition-all duration-300 flex items-center justify-center gap-2.5 shadow-warm-md hover:shadow-warm-lg active:scale-[0.99] cursor-pointer"
                title="Send stay enquiry directly to reception on WhatsApp"
              >
                <MessageCircle className="w-5 h-5 text-ivory-50" />
                <span>Send Stay Enquiry via WhatsApp ({HOTEL_INFO.phones[0].number})</span>
              </button>
            </div>

            <p className="text-[11px] text-charcoal-600 text-center leading-normal pt-1">
              Clicking opens official hotel WhatsApp chat with your pre-filled details. Direct reservation with 24/7 front desk. No booking fees.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
