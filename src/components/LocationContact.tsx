import React from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Mail,
  Zap
} from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

interface LocationContactProps {
  onOpenBooking: () => void;
}

export const LocationContact: React.FC<LocationContactProps> = ({ onOpenBooking }) => {
  // Pre-filled WhatsApp message for direct enquiry
  const prefilledText =
    `*HOTEL VICHAR VIMARSH - DIRECT ENQUIRY*\n\n` +
    `Hello Reception Desk, I would like to inquire about room availability, current tariff, and check-in details for an upcoming stay. Thank you!`;

  const whatsappDirectUrl = `https://wa.me/919636082789?text=${encodeURIComponent(prefilledText)}`;

  return (
    <section
      id="location"
      aria-label="Location, Arrival and Contact"
      className="w-full py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-ivory-100 via-ivory-50 to-ivory-100 border-b border-sandstone/40 text-charcoal-900 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-[11px] sm:text-xs uppercase font-sans font-semibold tracking-[0.25em] text-gold-700 block mb-2.5">
            ARRIVAL &amp; TRANSIT
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal-900 font-medium tracking-tight mb-4">
            Reach Hotel Vichar Vimarsh
          </h2>
          <p className="font-sans text-sm sm:text-base text-charcoal-600 font-light leading-relaxed">
            Conveniently positioned for peaceful repose with direct access to major arterial transit routes, local hubs, and commercial centers in Rajasthan.
          </p>
          <div className="w-12 h-0.5 bg-gold/50 mt-4"></div>
        </div>

        {/* Balanced Two-Column Desktop / Stacked Mobile Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column (Span 6): Direct Helplines, WhatsApp & Contact Card */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Primary Contact Hub Container */}
            <div className="bg-ivory-50 border border-sandstone/70 shadow-warm-md p-6 sm:p-8 space-y-6">
              
              {/* Header inside Hub */}
              <div className="flex items-center justify-between pb-4 border-b border-sandstone/50">
                <div>
                  <span className="text-[10px] sm:text-[11px] uppercase font-sans font-semibold tracking-widest text-gold-800 block">
                    DIRECT 24X7 DESK HELPLINES
                  </span>
                  <span className="text-xs text-charcoal-500 font-light">
                    Immediate assistance with physical staff on duty
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Desk Active</span>
                </span>
              </div>

              {/* 1. MOST PROMINENT ACTION: WhatsApp Reception Hero Card */}
              <div className="relative overflow-hidden bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-800 border border-emerald-600/50 p-5 sm:p-6 text-ivory-50 shadow-warm-sm group hover:shadow-warm-md transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-900/60 border border-emerald-400/30 flex items-center justify-center flex-shrink-0 text-emerald-300">
                        <MessageCircle className="w-4 h-4 text-ivory-50" />
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-wider text-emerald-200">
                        24/7 Official Reception WhatsApp
                      </span>
                    </div>
                    <h3 className="font-serif text-lg sm:text-xl font-medium text-ivory-50 leading-tight">
                      Chat Directly with Front Desk
                    </h3>
                    <p className="text-xs text-emerald-100/90 font-light">
                      Pre-filled enquiry for live availability &amp; instant quotes: +91 9636082789
                    </p>
                  </div>

                  <a
                    id="location-whatsapp-btn"
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-ivory-50 hover:bg-gold-100 text-emerald-950 font-sans text-xs uppercase tracking-wider font-semibold shadow-warm-sm transition-all duration-200 active:scale-95 flex-shrink-0 cursor-pointer"
                    title="Open official WhatsApp chat with pre-filled enquiry"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-700" />
                    <span>Open WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* 2. TWO REDESIGNED HELPLINE CARDS (Equal Heights & Clean Layout) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Helpline 01: Front Desk & Reception */}
                <div className="h-full bg-ivory-100/80 border border-sandstone/60 hover:border-gold/70 p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 group shadow-warm-sm">
                  <div>
                    <div className="flex items-center justify-between text-[10px] uppercase font-sans font-semibold tracking-wider text-charcoal-500 mb-1.5">
                      <span>HELPLINE 01</span>
                      <span className="text-gold-700">RECEPTION</span>
                    </div>
                    <span className="font-serif text-lg text-charcoal-900 font-semibold group-hover:text-gold-800 transition-colors block">
                      {HOTEL_INFO.phones[0].number}
                    </span>
                    <p className="text-[11px] text-charcoal-600 font-light mt-1 leading-normal">
                      24/7 Check-in, late night arrival coordination &amp; luggage care.
                    </p>
                  </div>

                  <a
                    id="location-phone-1-btn"
                    href={`tel:${HOTEL_INFO.phones[0].tel}`}
                    className="mt-4 pt-3 border-t border-sandstone/40 text-xs font-sans font-semibold text-gold-800 hover:text-gold-900 flex items-center justify-between group-hover:underline transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-gold-700" />
                      <span>Call Front Desk</span>
                    </span>
                    <span className="text-[11px] font-mono text-charcoal-500">tel:</span>
                  </a>
                </div>

                {/* Helpline 02: Reservations & Alternate Desk */}
                <div className="h-full bg-ivory-100/80 border border-sandstone/60 hover:border-gold/70 p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 group shadow-warm-sm">
                  <div>
                    <div className="flex items-center justify-between text-[10px] uppercase font-sans font-semibold tracking-wider text-charcoal-500 mb-1.5">
                      <span>HELPLINE 02</span>
                      <span className="text-gold-700">RESERVATIONS</span>
                    </div>
                    <span className="font-serif text-lg text-charcoal-900 font-semibold group-hover:text-gold-800 transition-colors block">
                      {HOTEL_INFO.phones[1].number}
                    </span>
                    <p className="text-[11px] text-charcoal-600 font-light mt-1 leading-normal">
                      Direct tariff inquiry, advance booking dates &amp; road navigation.
                    </p>
                  </div>

                  <a
                    id="location-phone-2-btn"
                    href={`tel:${HOTEL_INFO.phones[1].tel}`}
                    className="mt-4 pt-3 border-t border-sandstone/40 text-xs font-sans font-semibold text-gold-800 hover:text-gold-900 flex items-center justify-between group-hover:underline transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-gold-700" />
                      <span>Call Reservations</span>
                    </span>
                    <span className="text-[11px] font-mono text-charcoal-500">tel:</span>
                  </a>
                </div>
              </div>

              {/* 3. Secondary Email Inquiries Link (No API dependency) */}
              <div className="pt-1">
                <a
                  id="location-email-link"
                  href={`mailto:${HOTEL_INFO.email}`}
                  className="w-full p-3.5 bg-ivory-100/60 border border-sandstone/60 hover:border-gold text-charcoal-700 hover:text-charcoal-900 text-xs font-sans font-medium tracking-wide transition-all flex items-center justify-between"
                  title="Send general enquiry email to reception"
                >
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-gold-700 flex-shrink-0" />
                    <span>Reception Email: <strong>{HOTEL_INFO.email}</strong></span>
                  </div>
                  <span className="text-[10px] uppercase font-sans text-gold-800 font-semibold tracking-wider hidden sm:inline">
                    Secondary Channel →
                  </span>
                </a>
              </div>

              {/* Direct Booking Guarantee Notice */}
              <div className="text-xs text-charcoal-600 flex items-center gap-2 font-light pt-1">
                <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                <span>
                  Direct communication ensures guaranteed room lock, verified direct tariffs, and zero intermediary fees.
                </span>
              </div>
            </div>

            {/* Check-In / Check-Out Hours Cards */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-ivory-50 border border-sandstone/60 shadow-warm-sm">
                <span className="text-[10px] uppercase font-sans font-semibold tracking-wider text-gold-700 block mb-1">
                  STANDARD CHECK-IN
                </span>
                <span className="font-serif text-base font-medium text-charcoal-900 block">
                  12:00 PM Onward
                </span>
                <span className="text-charcoal-500 text-[11px] block mt-0.5">
                  Flexible arrival assistance 24/7
                </span>
              </div>

              <div className="p-4 bg-ivory-50 border border-sandstone/60 shadow-warm-sm">
                <span className="text-[10px] uppercase font-sans font-semibold tracking-wider text-gold-700 block mb-1">
                  STANDARD CHECK-OUT
                </span>
                <span className="font-serif text-base font-medium text-charcoal-900 block">
                  11:00 AM
                </span>
                <span className="text-charcoal-500 text-[11px] block mt-0.5">
                  Express check-out with night staff
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (Span 6): Architectural Visual, Google Maps Overlay & Verified Badges */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Visual Card Container */}
            <div className="bg-ivory-50 border border-sandstone/70 p-4 sm:p-5 shadow-warm-md">
              <div className="relative w-full aspect-[16/11] sm:aspect-[16/10] overflow-hidden border border-sandstone/50 bg-charcoal-900 group">
                
                {/* Authentic Hotel Photograph: Illuminated Entrance Sign */}
                <img
                  src="/images/entrance-sign.jpg"
                  alt="Hotel Vichar Vimarsh illuminated entrance sign in Rajasthan"
                  className="w-full h-full object-cover object-[center_35%] filter contrast-[1.05] brightness-95 group-hover:scale-102 transition-transform duration-700"
                  loading="lazy"
                />

                {/* Top Location Pill Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-charcoal-900/95 border border-gold/40 text-[10px] font-sans font-semibold tracking-wider uppercase text-gold shadow-warm-sm backdrop-blur-md">
                    <MapPin className="w-3.5 h-3.5 text-gold" />
                    <span>Rajasthan, India</span>
                  </span>
                </div>

                {/* Tasteful Dark Overlay Card Docked at Bottom */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-10 bg-charcoal-900/95 backdrop-blur-md border border-gold/40 p-4 sm:p-5 shadow-2xl text-ivory-100">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="font-serif text-lg sm:text-xl text-ivory-50 font-medium">
                        Hotel Vichar Vimarsh
                      </h3>
                      <p className="text-xs text-ivory-300 font-light mt-0.5 leading-relaxed">
                        Private gated property with secure on-site parking and 24/7 reception check-in.
                      </p>
                    </div>

                    <div className="hidden sm:flex w-9 h-9 p-1 bg-charcoal-800 border border-gold/50 items-center justify-center flex-shrink-0">
                      <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain" />
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="mt-3.5 pt-3 border-t border-charcoal-700/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    {/* Prominent Google Maps Action */}
                    <a
                      id="location-maps-cta-btn"
                      href={HOTEL_INFO.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 bg-gold hover:bg-gold-200 text-charcoal-900 text-xs font-sans font-semibold uppercase tracking-wider transition-all shadow-warm-sm flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    {/* Secondary Inquire Action */}
                    <button
                      id="location-inquire-modal-btn"
                      type="button"
                      onClick={onOpenBooking}
                      className="px-4 py-2.5 border border-sandstone/50 hover:border-gold text-ivory-100 hover:text-gold text-xs font-sans font-semibold uppercase tracking-wider transition-colors cursor-pointer text-center"
                    >
                      Inquire Stay
                    </button>
                  </div>
                </div>
              </div>

              {/* Verified Property & Parking Information */}
              <div className="mt-4 pt-3.5 border-t border-sandstone/40 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-charcoal-700">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>Guarded Gated Premises &amp; On-Site Parking</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>24-Hour Front Desk Physical Care</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>Continuous Generator &amp; Power Backup</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>Direct Highway &amp; Arterial Road Link</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
