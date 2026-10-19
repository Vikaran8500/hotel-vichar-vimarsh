import React from 'react';
import {
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  ArrowUp,
  Mail,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { HOTEL_INFO, ROOMS } from '../data/hotelData';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const receptionEmail = 'hotelvicharvimarsh@gmail.com';
  const receptionPhone = '+91 9636082789';
  const reservationsPhone = '+91 9251112789';

  const footerWhatsappMessage =
    `*HOTEL VICHAR VIMARSH - GENERAL ENQUIRY*\n\n` +
    `Hello Reception Desk, I would like to inquire about room availability, current tariff, and check-in details. Thank you!`;

  const footerWhatsappUrl = `https://wa.me/919636082789?text=${encodeURIComponent(footerWhatsappMessage)}`;

  return (
    <footer
      id="main-footer"
      aria-label="Hotel Vichar Vimarsh Footer"
      className="w-full bg-charcoal-900 text-ivory-300 border-t border-charcoal-700/80 pt-16 sm:pt-20 pb-28 sm:pb-32 lg:pb-36 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Footer Grid on Desktop / Clean Stacking on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 pb-14 border-b border-charcoal-800">
          
          {/* Column 1 (Span 4): Hotel Logo, Name & Brand Description */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 p-1 bg-charcoal-800 border border-gold/50 flex items-center justify-center flex-shrink-0 shadow-warm-sm">
                <img
                  src="/images/logo.png"
                  alt="Hotel Vichar Vimarsh Seal"
                  className="w-full h-full object-contain filter drop-shadow"
                />
              </div>
              <div>
                <h3 className="font-serif text-xl sm:text-2xl text-ivory-50 font-medium tracking-wide">
                  HOTEL VICHAR VIMARSH
                </h3>
                <span className="text-[10px] tracking-widest text-gold uppercase font-sans font-semibold block">
                  Mindful Hospitality • Rajasthan, India
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-ivory-400 font-light leading-relaxed max-w-sm">
              An introspective sanctuary of conscious hospitality and architectural stillness in Rajasthan. Conceived for thoughtful discourse, restful accommodation, and the timeless art of attentive 24/7 care.
            </p>

            {/* Ethos Tag */}
            <div className="pt-1 text-[11px] text-gold-300 font-sans tracking-wider uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
              <span>Vichar &amp; Vimarsh — Discourse &amp; Contemplation</span>
            </div>

            {/* Security & Desk Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-ivory-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <span>Guarded Gated Premises</span>
              </span>
              <span className="text-charcoal-700">•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <span>24/7 Physical Desk</span>
              </span>
            </div>
          </div>

          {/* Column 2 (Span 2): Accommodation Links */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-[11px] font-sans font-semibold uppercase tracking-widest text-gold block pb-1 border-b border-charcoal-800/80">
              ACCOMMODATIONS
            </span>
            <ul className="space-y-2.5 text-xs text-ivory-400">
              {ROOMS.map((room) => (
                <li key={room.id}>
                  <a
                    href="#rooms"
                    className="hover:text-gold transition-colors block py-0.5"
                  >
                    {room.name}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <button
                  id="footer-direct-tariff-btn"
                  type="button"
                  onClick={onOpenBooking}
                  className="text-gold hover:text-gold-200 transition-colors uppercase font-medium tracking-wider text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  <span>Direct Tariff Quotes</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3 (Span 2): Website Navigation Links */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-[11px] font-sans font-semibold uppercase tracking-widest text-gold block pb-1 border-b border-charcoal-800/80">
              EXPLORE PROPERTY
            </span>
            <ul className="space-y-2.5 text-xs text-ivory-400">
              <li>
                <a href="#about" className="hover:text-gold transition-colors block py-0.5">
                  Our Philosophy
                </a>
              </li>
              <li>
                <a href="#rooms" className="hover:text-gold transition-colors block py-0.5">
                  Stay &amp; Rooms
                </a>
              </li>
              <li>
                <a href="#highlights" className="hover:text-gold transition-colors block py-0.5">
                  Property Highlights
                </a>
              </li>
              <li>
                <a href="#facilities" className="hover:text-gold transition-colors block py-0.5">
                  Facilities &amp; Jacuzzi
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-gold transition-colors block py-0.5">
                  Visual Chronicle
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-gold transition-colors block py-0.5">
                  Guest Experiences
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-gold transition-colors block py-0.5">
                  Location &amp; Arrival
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 (Span 4): Contact, WhatsApp & Email Section */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[11px] font-sans font-semibold uppercase tracking-widest text-gold block pb-1 border-b border-charcoal-800/80">
              24X7 RECEPTION &amp; RESERVATIONS
            </span>

            <div className="space-y-3.5 text-xs text-ivory-300">
              
              {/* Reception Helpline 01 */}
              <div>
                <span className="text-[10px] uppercase font-sans tracking-wider text-ivory-400 block font-medium">
                  Front Desk &amp; Reception (24/7)
                </span>
                <a
                  id="footer-reception-phone"
                  href={`tel:${receptionPhone.replace(/\s+/g, '')}`}
                  className="text-sm sm:text-base font-semibold text-ivory-50 hover:text-gold transition-colors font-mono tracking-wide inline-flex items-center gap-1.5 mt-0.5"
                >
                  <Phone className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <span>{receptionPhone}</span>
                </a>
              </div>

              {/* Reservations Helpline 02 */}
              <div>
                <span className="text-[10px] uppercase font-sans tracking-wider text-ivory-400 block font-medium">
                  Reservations &amp; Enquiries
                </span>
                <a
                  id="footer-reservations-phone"
                  href={`tel:${reservationsPhone.replace(/\s+/g, '')}`}
                  className="text-sm sm:text-base font-semibold text-ivory-50 hover:text-gold transition-colors font-mono tracking-wide inline-flex items-center gap-1.5 mt-0.5"
                >
                  <Phone className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <span>{reservationsPhone}</span>
                </a>
              </div>

              {/* Prominently Displayed Email Address & Action Button */}
              <div className="p-3 bg-charcoal-800/90 border border-sandstone/30 space-y-2">
                <span className="text-[10px] uppercase font-sans tracking-wider text-gold-300 block font-semibold">
                  Official Reception Email
                </span>
                
                {/* Clickable Email Link */}
                <a
                  id="footer-email-link"
                  href={`mailto:${receptionEmail}`}
                  className="text-xs sm:text-sm font-medium text-ivory-100 hover:text-gold transition-colors font-mono block break-all underline decoration-sandstone/40 hover:decoration-gold"
                  title="Click to email reception"
                >
                  {receptionEmail}
                </a>

                {/* Elegant "Email Reception" Button */}
                <a
                  id="footer-email-btn"
                  href={`mailto:${receptionEmail}`}
                  className="w-full py-2 px-3 bg-charcoal-700/80 hover:bg-gold hover:text-charcoal-900 border border-gold/40 text-gold text-xs uppercase font-sans font-semibold tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-warm-sm"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Reception</span>
                </a>
              </div>

              {/* Prominent Green WhatsApp Button */}
              <div className="pt-1">
                <a
                  id="footer-whatsapp-btn"
                  href={footerWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-ivory-50 text-xs uppercase font-sans font-semibold tracking-wider transition-colors flex items-center justify-center gap-2 shadow-warm-sm"
                  title="Chat directly with reception on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 text-ivory-50 flex-shrink-0" />
                  <span>Chat on WhatsApp (+91 9636082789)</span>
                </a>
              </div>

              {/* Inquire Stay Modal Action */}
              <button
                id="footer-inquire-modal-btn"
                type="button"
                onClick={onOpenBooking}
                className="w-full py-2.5 px-4 bg-gold hover:bg-gold-200 text-charcoal-900 text-xs uppercase font-sans font-semibold tracking-wider transition-colors text-center shadow-warm-sm cursor-pointer"
              >
                Reserve Room / Inquire Stay →
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Secondary Links & Back to Top */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ivory-400 font-light text-center md:text-left">
          <div>
            © {new Date().getFullYear()} Hotel Vichar Vimarsh. All rights reserved. Handcrafted Hospitality in Rajasthan, India.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-ivory-300">
            <a href="#about" className="hover:text-gold transition-colors">
              Authentic Ethos
            </a>
            <a href="#location" className="hover:text-gold transition-colors">
              Estate Location
            </a>
            <a href="#testimonials" className="hover:text-gold transition-colors">
              Guest Reviews
            </a>
            <button
              id="footer-back-to-top"
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-gold hover:text-gold-200 transition-colors uppercase text-[10px] font-sans font-semibold tracking-wider cursor-pointer"
              aria-label="Scroll back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
