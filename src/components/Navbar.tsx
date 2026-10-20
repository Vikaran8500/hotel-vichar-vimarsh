import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, MapPin, Clock, Bed } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Strictly accommodation-focused navigation (Dining and Gallery removed from navbar)
  const navLinks = [
    { name: 'Stay & Rooms', href: '#rooms', id: 'nav-link-rooms' },
    { name: 'Highlights', href: '#highlights', id: 'nav-link-highlights' },
    { name: 'Facilities', href: '#facilities', id: 'nav-link-facilities' },
    { name: 'Location', href: '#location', id: 'nav-link-location' },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-40 transition-all duration-300 bg-charcoal-900">
      {/* Top announcement bar */}
      <div
        id="top-announcement-bar"
        className="hidden"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-gold-300 font-medium">
              <Clock className="w-3.5 h-3.5 text-gold" />
              24/7 Front Desk Active
            </span>
            <span className="flex items-center gap-1.5 text-ivory-400">
              <MapPin className="w-3.5 h-3.5 text-gold-400" />
              {HOTEL_INFO.location}
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-ivory-400">Direct Helplines:</span>
            <a
              id="top-bar-phone-1"
              href={`tel:${HOTEL_INFO.phones[0].tel}`}
              className="text-gold font-medium hover:text-gold-200 transition-colors flex items-center gap-1 font-mono"
            >
              <Phone className="w-3 h-3" />
              {HOTEL_INFO.phones[0].number}
            </a>
            <span className="text-charcoal-700">|</span>
            <a
              id="top-bar-phone-2"
              href={`tel:${HOTEL_INFO.phones[1].tel}`}
              className="text-gold font-medium hover:text-gold-200 transition-colors flex items-center gap-1 font-mono"
            >
              {HOTEL_INFO.phones[1].number}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header
        id="main-header"
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-charcoal-900 shadow-warm-lg border-b border-gold/40 py-2.5 sm:py-3'
            : 'bg-charcoal-900 border-b border-charcoal-800 shadow-warm-sm py-2.5 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Brand Logo & Wordmark */}
          <a id="brand-logo-link" href="#" className="flex items-center gap-3 sm:gap-3.5 group flex-shrink-0">
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 flex-shrink-0 flex items-center justify-center bg-charcoal-900/90 p-1 border border-gold/50 group-hover:border-gold transition-colors shadow-warm-sm">
              <img
                src="/images/logo.png"
                alt="Hotel Vichar Vimarsh Seal Logo"
                className="w-full h-full object-contain filter drop-shadow"
              />
            </div>
            <span className="font-serif text-[18px] sm:text-2xl lg:text-[24px] xl:text-[26px] font-medium tracking-wide text-ivory-50 group-hover:text-gold-200 transition-colors leading-tight whitespace-nowrap">
              HOTEL VICHAR VIMARSH
            </span>
          </a>

          {/* Desktop Nav Links - Spacious, evenly distributed layout */}
          <nav id="desktop-nav-links" className="hidden lg:flex items-center gap-5 xl:gap-8 flex-shrink-0">
            {navLinks.map((link) => (
              <a
                key={link.name}
                id={link.id}
                href={link.href}
                className="text-xs uppercase tracking-widest text-ivory-200 hover:text-gold transition-colors font-medium relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-gold hover:after:w-full after:transition-all after:duration-300 whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs: Call Reception + Book Your Stay matching reference */}
          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
            {/* Direct Call Button */}
            <a
              id="header-call-btn"
              href={`tel:${HOTEL_INFO.phones[0].tel}`}
              className="hidden md:flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs uppercase tracking-wider text-ivory-100 hover:text-gold transition-colors font-medium whitespace-nowrap border border-gold/40 hover:border-gold rounded-md bg-charcoal-900/50"
            >
              <Phone className="w-3.5 h-3.5 text-gold flex-shrink-0" />
              <span>CALL RECEPTION</span>
            </a>

            {/* Primary Booking CTA */}
            <button
              id="header-book-btn"
              type="button"
              onClick={onOpenBooking}
              className="relative px-4 sm:px-5 py-2.5 bg-gold hover:bg-gold-200 text-charcoal-900 font-sans text-xs uppercase tracking-wider font-semibold transition-all duration-300 rounded-md shadow-warm-sm hover:shadow-warm-md flex items-center gap-2 active:scale-95 whitespace-nowrap cursor-pointer"
            >
              <Bed className="w-4 h-4 text-charcoal-900 flex-shrink-0" />
              <span>BOOK YOUR STAY</span>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              id="mobile-menu-trigger"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-ivory-200 hover:text-gold transition-colors focus:outline-none cursor-pointer flex-shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="fixed inset-0 z-50 lg:hidden bg-charcoal-900 backdrop-blur-xl flex flex-col justify-between p-6 pt-20 animate-fadeIn"
        >
          <div className="flex justify-between items-center absolute top-5 left-6 right-6">
            <div className="flex items-center gap-3">
              <img src="/images/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
              <span className="font-serif text-lg text-ivory-100 font-medium tracking-wide">
                HOTEL VICHAR VIMARSH
              </span>
            </div>
            <button
              id="mobile-menu-close"
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-ivory-300 hover:text-gold cursor-pointer"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          <div className="flex flex-col space-y-4 mt-6">
            <span className="text-[10px] tracking-widest uppercase text-gold font-semibold">
              EXPLORE THE PROPERTY
            </span>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-2xl text-ivory-100 hover:text-gold transition-colors py-2 border-b border-charcoal-800/80"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="space-y-4 pt-6 border-t border-charcoal-800">
            <div className="text-xs text-ivory-400 space-y-1">
              <p className="text-gold font-semibold tracking-wider uppercase text-[10px]">
                24/7 Direct Help Desk
              </p>
              <p className="text-ivory-200 text-sm font-mono">{HOTEL_INFO.phones[0].number}</p>
              <p className="text-ivory-200 text-sm font-mono">{HOTEL_INFO.phones[1].number}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                id="mobile-drawer-call-btn"
                href={`tel:${HOTEL_INFO.phones[0].tel}`}
                className="w-full py-3 text-center border border-gold text-gold text-xs uppercase tracking-wider font-semibold"
              >
                Call Desk
              </a>
              <button
                id="mobile-drawer-book-btn"
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 text-center bg-gold text-charcoal-900 text-xs uppercase tracking-wider font-semibold cursor-pointer"
              >
                Book Room
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
