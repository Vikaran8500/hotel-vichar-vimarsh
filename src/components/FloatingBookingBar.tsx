import React, { useState, useEffect } from 'react';
import { Phone, ArrowRight, MessageCircle } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

interface FloatingBookingBarProps {
  onOpenBooking: () => void;
}

export const FloatingBookingBar: React.FC<FloatingBookingBarProps> = ({ onOpenBooking }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past 350px
      if (window.scrollY > 350) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  const prefilledText =
    `*HOTEL VICHAR VIMARSH - DIRECT ENQUIRY*\n\n` +
    `Hello Reception Desk, I would like to inquire about room availability, current tariff, and check-in details for an upcoming stay. Thank you!`;

  const whatsappDirectUrl = `https://wa.me/919251112789?text=${encodeURIComponent(prefilledText)}`;

  return (
    <aside
      id="floating-booking-bar"
      aria-label="Quick Concierge Actions"
      className="fixed bottom-0 left-0 right-0 z-40 bg-charcoal-900/98 backdrop-blur-md border-t border-gold/40 shadow-warm-xl transition-all duration-300 py-2 sm:py-3 px-3 sm:px-6 pb-[max(0.6rem,env(safe-area-inset-bottom,0px))]"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-4">
        
        {/* Left: Brand Seal & 24/7 Desk Info (Hidden on narrow mobile to keep mobile footer sleek & compact) */}
        <div className="hidden sm:flex items-center gap-3.5">
          <div className="w-8 h-8 p-1 bg-charcoal-800 border border-gold/50 flex items-center justify-center flex-shrink-0 shadow-warm-sm">
            <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <span className="font-serif text-sm text-ivory-50 block font-medium leading-tight">
              Hotel Vichar Vimarsh
            </span>
            <span className="text-[10px] uppercase font-sans tracking-widest text-gold block">
              24/7 Desk: {HOTEL_INFO.phones[0].number}
            </span>
          </div>
        </div>

        {/* Right / Full-Width on Mobile: Action Buttons */}
        <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 w-full sm:w-auto">
          {/* Quick Call Desk */}
          <a
            id="floating-call-btn"
            href={`tel:${HOTEL_INFO.phones[0].tel}`}
            className="flex-1 sm:flex-initial px-3 sm:px-4 py-2 sm:py-2.5 bg-charcoal-800 border border-sandstone/40 hover:border-gold text-ivory-100 hover:text-gold text-[11px] sm:text-xs uppercase font-sans font-semibold tracking-wider transition-colors flex items-center justify-center gap-1.5"
            title="Call hotel front desk directly"
          >
            <Phone className="w-3.5 h-3.5 text-gold" />
            <span>Call Desk</span>
          </a>

          {/* Quick WhatsApp */}
          <a
            id="floating-whatsapp-btn"
            href={whatsappDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 sm:px-4 py-2 sm:py-2.5 bg-emerald-700 hover:bg-emerald-800 text-ivory-50 text-[11px] sm:text-xs uppercase font-sans font-semibold tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-warm-sm"
            title="Chat with reception on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>

          {/* Primary Book Now */}
          <button
            id="floating-reserve-btn"
            type="button"
            onClick={onOpenBooking}
            className="flex-1 sm:flex-initial px-3.5 sm:px-5 py-2 sm:py-2.5 bg-gold hover:bg-gold-200 text-charcoal-900 text-[11px] sm:text-xs uppercase font-sans font-semibold tracking-widest transition-all shadow-warm-sm flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-charcoal-900 animate-pulse hidden xs:inline-block"></span>
            <span>Reserve Room</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
