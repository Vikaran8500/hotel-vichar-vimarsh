import React, { useState } from 'react';
import { Calendar, Users, Bed, ArrowRight, Headphones, Zap, MapPin, ChevronDown } from 'lucide-react';
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

  const formatDisplayDate = (isoDateStr: string) => {
    if (!isoDateStr) return '';
    const parts = isoDateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return isoDateStr;
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
      className="relative w-full min-h-[92vh] lg:min-h-screen flex flex-col justify-between overflow-hidden bg-charcoal-900 text-ivory-100 pt-20 sm:pt-24 lg:pt-26"
    >
      {/* Background Image: Authentic architectural golden-hour facade clearly displaying building & signage */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/images/facade-golden-hour.png"
          alt="Hotel Vichar Vimarsh architectural facade warmly illuminated at golden hour"
          className="w-full h-full object-cover object-[72%_center] sm:object-[82%_center] lg:object-[88%_center] filter brightness-[1.0] contrast-[1.02] transition-transform duration-[12000ms] ease-out"
        />
        {/* Subtle, premium black gradient overlay ONLY behind the left-side hero text */}
        <div
          className="absolute inset-y-0 left-0 w-full sm:w-9/12 lg:w-[52%] pointer-events-none transition-opacity duration-300"
          style={{
            background:
              'linear-gradient(to right, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.68) 28%, rgba(0, 0, 0, 0.38) 55%, rgba(0, 0, 0, 0.10) 80%, rgba(0, 0, 0, 0) 100%)',
          }}
        />

        {/* Soft top gradient solely for navbar contrast */}
        <div className="absolute top-0 inset-x-0 h-24 sm:h-28 bg-gradient-to-b from-charcoal-950/75 via-charcoal-950/20 to-transparent pointer-events-none" />

        {/* Soft bottom gradient solely behind the booking strip */}
        <div className="absolute bottom-0 inset-x-0 h-32 sm:h-40 bg-gradient-to-t from-charcoal-950/75 via-charcoal-950/15 to-transparent pointer-events-none" />
      </div>

      {/* Hero Narrative Overlay - Aligned to left on all screen sizes, clearing the building and signage */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-auto py-3 sm:py-5 lg:py-6 flex flex-col items-start text-left">
        
        <div className="max-w-[420px] lg:max-w-[440px] xl:max-w-[460px] flex flex-col items-start">
          {/* Eyebrow Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-black/60 border border-gold/45 backdrop-blur-md mb-3 sm:mb-3.5 shadow-md">
            <MapPin className="w-3.5 h-3.5 text-gold flex-shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-sans font-semibold tracking-widest text-gold-300 uppercase">
              HOTEL VICHAR VIMARSH · RAJASTHAN
            </span>
          </div>

          {/* Grand Luxury Headline matching reference design */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-normal text-ivory-50 tracking-tight leading-[1.12] mb-3 sm:mb-3.5 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
            A Stay Designed <br />
            <span className="italic font-normal text-gold-300">Around You.</span>
          </h1>

          {/* Narrative Subtext - Concise, clean & accommodation-focused */}
          <p className="font-sans text-xs sm:text-sm md:text-base text-ivory-100/90 mb-5 sm:mb-6 font-light leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.95)] max-w-[360px]">
            Comfortable rooms, private bathrooms and a welcoming 24/7 reception.
          </p>

          {/* Action Group matching reference buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-3.5 w-full sm:w-auto mb-5 sm:mb-6">
            <button
              id="hero-book-btn"
              type="button"
              onClick={() => {
                if (onOpenBookingWithDetails) {
                  onOpenBookingWithDetails({ checkIn, checkOut, roomType, guests });
                }
              }}
              className="w-full sm:w-auto px-5 sm:px-6 py-3 bg-gold hover:bg-gold-200 text-charcoal-900 font-sans text-xs uppercase tracking-widest font-bold rounded-md transition-all duration-300 shadow-warm-lg flex items-center justify-center gap-2 active:scale-95 whitespace-nowrap cursor-pointer"
            >
              <Bed className="w-4 h-4 flex-shrink-0" />
              <span>BOOK YOUR STAY</span>
              <ArrowRight className="w-4 h-4 flex-shrink-0" />
            </button>

            <a
              id="hero-explore-btn"
              href="#rooms"
              className="w-full sm:w-auto px-5 sm:px-6 py-3 bg-charcoal-900/60 border border-gold/40 hover:border-gold hover:text-gold backdrop-blur-md text-ivory-100 font-sans text-xs uppercase tracking-widest font-semibold rounded-md transition-all duration-300 text-center whitespace-nowrap"
            >
              EXPLORE ROOMS
            </a>
          </div>

          {/* Trust Indicators Bar matching reference icons */}
          <div className="flex items-center justify-start gap-4 sm:gap-5 text-[11px] sm:text-xs text-ivory-200 font-sans uppercase tracking-widest">
            <span className="flex items-center gap-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]">
              <Headphones className="w-4 h-4 text-gold flex-shrink-0" />
              <span className="font-semibold text-ivory-100">24/7 RECEPTION</span>
            </span>
            <span className="text-gold/40">|</span>
            <span className="flex items-center gap-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]">
              <Zap className="w-4 h-4 text-gold fill-gold/20 flex-shrink-0" />
              <span className="font-semibold text-ivory-100">INVERTER BACKUP</span>
            </span>
          </div>
        </div>
      </div>

      {/* Quick Reservation Panel Docked at Base - Refined white card with light sand pill fields */}
      <div className="relative z-20 w-full px-3 sm:px-6 lg:px-8 pb-5 sm:pb-7 lg:pb-8 max-w-7xl mx-auto" id="booking-strip">
        <form
          id="quick-reservation-form"
          onSubmit={handleQuickReserve}
          className="bg-white text-charcoal-800 shadow-[0_20px_50px_rgba(0,0,0,0.35)] rounded-2xl border border-white/60 p-3 sm:p-4 lg:p-4.5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2.5 sm:gap-3 items-stretch">
            
            {/* Check-In Date */}
            <div className="relative lg:col-span-2 bg-[#F7F6F2] hover:bg-[#F2F0EB] transition-colors rounded-xl p-2.5 sm:p-3 flex flex-col justify-between min-w-0 focus-within:ring-2 focus-within:ring-gold/60">
              <label
                htmlFor="quick-checkin-input"
                className="text-[10px] uppercase tracking-wider text-charcoal-500 font-semibold mb-1 block select-none"
              >
                CHECK-IN DATE
              </label>
              <div className="flex items-center justify-between gap-1.5 text-charcoal-900">
                <div className="flex items-center gap-2 min-w-0">
                  <Calendar className="w-4 h-4 text-gold flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-charcoal-900 font-sans tracking-tight">
                    {formatDisplayDate(checkIn)}
                  </span>
                </div>
                <Calendar className="w-3.5 h-3.5 text-charcoal-400 flex-shrink-0" />
              </div>
              <input
                id="quick-checkin-input"
                type="date"
                min={today}
                value={checkIn}
                onChange={(e) => handleCheckInChange(e.target.value)}
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                required
                aria-label="Check-In Date"
              />
            </div>

            {/* Check-Out Date */}
            <div className="relative lg:col-span-2 bg-[#F7F6F2] hover:bg-[#F2F0EB] transition-colors rounded-xl p-2.5 sm:p-3 flex flex-col justify-between min-w-0 focus-within:ring-2 focus-within:ring-gold/60">
              <label
                htmlFor="quick-checkout-input"
                className="text-[10px] uppercase tracking-wider text-charcoal-500 font-semibold mb-1 block select-none"
              >
                CHECK-OUT DATE
              </label>
              <div className="flex items-center justify-between gap-1.5 text-charcoal-900">
                <div className="flex items-center gap-2 min-w-0">
                  <Calendar className="w-4 h-4 text-gold flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-charcoal-900 font-sans tracking-tight">
                    {formatDisplayDate(checkOut)}
                  </span>
                </div>
                <Calendar className="w-3.5 h-3.5 text-charcoal-400 flex-shrink-0" />
              </div>
              <input
                id="quick-checkout-input"
                type="date"
                min={checkIn || today}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                required
                aria-label="Check-Out Date"
              />
            </div>

            {/* Room Category */}
            <div className="relative lg:col-span-3 bg-[#F7F6F2] hover:bg-[#F2F0EB] transition-colors rounded-xl p-2.5 sm:p-3 flex flex-col justify-between min-w-0 focus-within:ring-2 focus-within:ring-gold/60">
              <label
                htmlFor="quick-room-select"
                className="text-[10px] uppercase tracking-wider text-charcoal-500 font-semibold mb-1 block select-none"
              >
                ROOM CATEGORY
              </label>
              <div className="flex items-center justify-between gap-2 text-charcoal-900 min-w-0">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <Bed className="w-4 h-4 text-gold flex-shrink-0" />
                  <select
                    id="quick-room-select"
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="bg-transparent text-xs sm:text-sm font-medium text-charcoal-900 focus:outline-none w-full cursor-pointer appearance-none truncate pr-1"
                    title={roomType}
                  >
                    {ROOMS.map((r) => (
                      <option key={r.id} value={r.name} className="text-charcoal-900 bg-white">
                        {r.name}
                      </option>
                    ))}
                  </select>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-charcoal-400 flex-shrink-0 pointer-events-none" />
              </div>
            </div>

            {/* Guests */}
            <div className="relative lg:col-span-2 bg-[#F7F6F2] hover:bg-[#F2F0EB] transition-colors rounded-xl p-2.5 sm:p-3 flex flex-col justify-between min-w-0 focus-within:ring-2 focus-within:ring-gold/60">
              <label
                htmlFor="quick-guests-select"
                className="text-[10px] uppercase tracking-wider text-charcoal-500 font-semibold mb-1 block select-none"
              >
                GUESTS
              </label>
              <div className="flex items-center justify-between gap-2 text-charcoal-900 min-w-0">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <Users className="w-4 h-4 text-gold flex-shrink-0" />
                  <select
                    id="quick-guests-select"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="bg-transparent text-xs sm:text-sm font-medium text-charcoal-900 focus:outline-none w-full cursor-pointer appearance-none truncate pr-1"
                    title={guests}
                  >
                    <option value="1 Guest">1 Guest</option>
                    <option value="2 Guests">2 Guests</option>
                    <option value="3 Guests">3 Guests</option>
                    <option value="4+ Family">Family Group (4+)</option>
                  </select>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-charcoal-400 flex-shrink-0 pointer-events-none" />
              </div>
            </div>

            {/* Submit Action: CHECK AVAILABILITY CTA */}
            <div className="lg:col-span-3 sm:col-span-2 h-full flex items-stretch">
              <button
                id="quick-submit-btn"
                type="submit"
                className="w-full h-full min-h-[48px] py-3 px-6 bg-[#141414] hover:bg-black text-gold-300 hover:text-gold-200 transition-all duration-300 text-xs sm:text-[13px] font-sans uppercase tracking-widest font-semibold rounded-xl flex items-center justify-center gap-2 shadow-md active:scale-[0.98] whitespace-nowrap cursor-pointer"
              >
                <span>CHECK AVAILABILITY</span>
                <ArrowRight className="w-4 h-4 flex-shrink-0" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

