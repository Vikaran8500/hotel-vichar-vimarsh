import React, { useState } from 'react';
import { Calendar, Users, BedDouble, ArrowRight, ShieldCheck, Clock, Sparkles, ChevronDown } from 'lucide-react';
import { HOTEL_INFO, ROOMS } from '../data/hotelData';

interface HeroProps {
  onOpenBookingWithDetails?: (details: {
    checkIn: string;
    checkOut: string;
    roomType: string;
    guests: string;
  }) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBookingWithDetails }) => {
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const todayDate = new Date();
  const tomorrowDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const today = formatDate(todayDate);
  const tomorrow = formatDate(tomorrowDate);

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [roomType, setRoomType] = useState(ROOMS[0].name);
  const [guests, setGuests] = useState('2 Guests');

  const handleCheckInChange = (newCheckIn: string) => {
    setCheckIn(newCheckIn);
    if (newCheckIn >= checkOut) {
      const nextDay = new Date(new Date(newCheckIn).getTime() + 24 * 60 * 60 * 1000);
      setCheckOut(formatDate(nextDay));
    }
  };

  const handleQuickReserve = (e: React.FormEvent) => {
    e.preventDefault();
    if (onOpenBookingWithDetails) {
      onOpenBookingWithDetails({
        checkIn,
        checkOut,
        roomType,
        guests
      });
    }
  };

  return (
    <section
      id="hero-section"
      className="relative w-full min-h-[92vh] lg:min-h-screen flex flex-col justify-between overflow-hidden bg-charcoal-900 text-ivory-100 pt-28 sm:pt-32 lg:pt-36"
    >
      {/* Background Image: Authentic architectural golden-hour facade */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/images/facade-golden-hour.png"
          alt="Hotel Vichar Vimarsh architectural facade warmly illuminated at golden hour"
          className="w-full h-full object-cover object-[center_35%] lg:object-[center_30%] filter brightness-[0.78] contrast-[1.10] scale-100 lg:scale-[1.02] transition-transform duration-[12000ms] ease-out"
        />
        {/* Layered cinematic scrims: top gradient, bottom anchor, and center radial vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/50 to-charcoal-900/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/80 via-charcoal-900/40 to-charcoal-900/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(18,17,16,0.60)_100%)]" />
      </div>

      {/* Hero Narrative Overlay */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col items-center text-center my-auto pb-4 sm:pb-6">
        
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-charcoal-900/85 border border-gold/50 backdrop-blur-md mb-5 sm:mb-6 shadow-warm-md">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
          <span className="text-[10px] sm:text-[11px] font-sans font-semibold tracking-widest text-gold-300 uppercase">
            SANCTUARY OF THOUGHTFUL HOSPITALITY • RAJASTHAN
          </span>
        </div>

        {/* Grand Luxury Headline */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-ivory-50 tracking-tight max-w-4xl mx-auto leading-[1.14] mb-5 drop-shadow-md">
          A Stay Designed <br className="hidden sm:inline" />
          <span className="italic font-normal text-gold-300">Around You.</span>
        </h1>

        {/* Narrative Subtext - Strictly accommodation-focused */}
        <p className="font-sans text-xs sm:text-base lg:text-lg text-ivory-200 max-w-2xl mx-auto mb-8 sm:mb-10 font-light leading-relaxed drop-shadow-sm px-2">
          Where authentic Indian hospitality converges with calm comfort. Clean, air-conditioned rooms, attached private bathrooms, restorative Jacuzzi relaxation, and 24/7 dedicated reception in Rajasthan.
        </p>

        {/* Action Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto mb-8 sm:mb-10">
          <button
            id="hero-book-btn"
            type="button"
            onClick={() => {
              if (onOpenBookingWithDetails) {
                onOpenBookingWithDetails({ checkIn, checkOut, roomType, guests });
              }
            }}
            className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 bg-gold text-charcoal-900 font-sans text-xs uppercase tracking-widest font-semibold hover:bg-gold-200 transition-all duration-300 shadow-warm-lg flex items-center justify-center gap-2 active:scale-95 whitespace-nowrap cursor-pointer"
          >
            <span>Book Your Stay</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            id="hero-explore-btn"
            href="#rooms"
            className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 bg-charcoal-900/80 border border-ivory-300/30 backdrop-blur-md text-ivory-100 font-sans text-xs uppercase tracking-widest font-medium hover:border-gold hover:text-gold transition-all duration-300 text-center whitespace-nowrap"
          >
            Explore Rooms
          </a>
        </div>

        {/* Trust Badges Bar */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-xs text-ivory-300/90 font-sans uppercase tracking-widest">
          <span className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-gold" />
            24/7 Reception &amp; Security
          </span>
          <span className="text-charcoal-600">•</span>
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-gold" />
            100% Power &amp; AC Backup
          </span>
          <span className="text-charcoal-600">•</span>
          <span className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            Direct Tariff Guarantee
          </span>
        </div>
      </div>

      {/* Quick Reservation Panel Docked at Base */}
      <div className="relative z-20 w-full px-3 sm:px-6 lg:px-8 pb-6 sm:pb-8 max-w-6xl mx-auto" id="booking-strip">
        <form
          id="quick-reservation-form"
          onSubmit={handleQuickReserve}
          className="bg-ivory-50 text-charcoal-800 shadow-warm-xl border border-sandstone/70 p-4 sm:p-5 lg:p-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4 items-stretch">
            
            {/* Check-In */}
            <div className="flex flex-col justify-between p-2.5 sm:p-3 bg-ivory-200/70 border border-sandstone/60 focus-within:border-gold focus-within:bg-ivory-50 transition-colors">
              <label
                htmlFor="quick-checkin-input"
                className="text-[10px] uppercase tracking-widest text-gold-800 font-semibold mb-1 block"
              >
                Check-In Date
              </label>
              <div className="flex items-center gap-2 text-charcoal-900">
                <Calendar className="w-4 h-4 text-gold flex-shrink-0" />
                <input
                  id="quick-checkin-input"
                  type="date"
                  min={today}
                  value={checkIn}
                  onChange={(e) => handleCheckInChange(e.target.value)}
                  className="bg-transparent text-xs sm:text-sm font-medium text-charcoal-900 focus:outline-none w-full cursor-pointer"
                  required
                />
              </div>
            </div>

            {/* Check-Out */}
            <div className="flex flex-col justify-between p-2.5 sm:p-3 bg-ivory-200/70 border border-sandstone/60 focus-within:border-gold focus-within:bg-ivory-50 transition-colors">
              <label
                htmlFor="quick-checkout-input"
                className="text-[10px] uppercase tracking-widest text-gold-800 font-semibold mb-1 block"
              >
                Check-Out Date
              </label>
              <div className="flex items-center gap-2 text-charcoal-900">
                <Calendar className="w-4 h-4 text-gold flex-shrink-0" />
                <input
                  id="quick-checkout-input"
                  type="date"
                  min={checkIn || today}
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="bg-transparent text-xs sm:text-sm font-medium text-charcoal-900 focus:outline-none w-full cursor-pointer"
                  required
                />
              </div>
            </div>

            {/* Room Category */}
            <div className="flex flex-col justify-between p-2.5 sm:p-3 bg-ivory-200/70 border border-sandstone/60 focus-within:border-gold focus-within:bg-ivory-50 transition-colors relative">
              <label
                htmlFor="quick-room-select"
                className="text-[10px] uppercase tracking-widest text-gold-800 font-semibold mb-1 block"
              >
                Room Category
              </label>
              <div className="flex items-center gap-2 text-charcoal-900">
                <BedDouble className="w-4 h-4 text-gold flex-shrink-0" />
                <select
                  id="quick-room-select"
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="bg-transparent text-xs sm:text-sm font-medium text-charcoal-900 focus:outline-none w-full cursor-pointer pr-4 appearance-none"
                >
                  {ROOMS.map((r) => (
                    <option key={r.id} value={r.name} className="text-charcoal-900 bg-ivory-50">
                      {r.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-charcoal-500 absolute right-3 pointer-events-none" />
              </div>
            </div>

            {/* Guests */}
            <div className="flex flex-col justify-between p-2.5 sm:p-3 bg-ivory-200/70 border border-sandstone/60 focus-within:border-gold focus-within:bg-ivory-50 transition-colors relative">
              <label
                htmlFor="quick-guests-select"
                className="text-[10px] uppercase tracking-widest text-gold-800 font-semibold mb-1 block"
              >
                Guests
              </label>
              <div className="flex items-center gap-2 text-charcoal-900">
                <Users className="w-4 h-4 text-gold flex-shrink-0" />
                <select
                  id="quick-guests-select"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="bg-transparent text-xs sm:text-sm font-medium text-charcoal-900 focus:outline-none w-full cursor-pointer pr-4 appearance-none"
                >
                  <option value="1 Guest">1 Guest</option>
                  <option value="2 Guests">2 Guests (Couple / Friends)</option>
                  <option value="3 Guests">3 Guests (with Extra Bed)</option>
                  <option value="4+ Family">Family Group (4+)</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-charcoal-500 absolute right-3 pointer-events-none" />
              </div>
            </div>

            {/* Submit Action - Explicit CHECK AVAILABILITY CTA */}
            <div className="h-full flex items-center pt-1 sm:pt-0">
              <button
                id="quick-submit-btn"
                type="submit"
                className="w-full h-full min-h-[50px] py-3.5 px-6 bg-charcoal-900 text-gold hover:bg-gold hover:text-charcoal-900 transition-all duration-300 text-xs font-sans uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-warm-sm active:scale-95 whitespace-nowrap cursor-pointer"
              >
                <span>Check Availability</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
