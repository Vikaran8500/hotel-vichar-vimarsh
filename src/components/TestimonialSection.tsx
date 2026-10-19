import React, { useState, useEffect, useCallback } from 'react';
import {
  Star,
  Quote,
  CheckCircle,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { TESTIMONIALS, HOTEL_INFO } from '../data/hotelData';

export const TestimonialSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  // Dynamically update cards per row according to viewport
  // Desktop: 3 cards, Tablet: 2 cards, Mobile: 1 card
  const updateVisibleCount = useCallback(() => {
    if (typeof window === 'undefined') return;
    const width = window.innerWidth;
    let count = 1;
    if (width >= 1024) {
      count = 3;
    } else if (width >= 768) {
      count = 2;
    } else {
      count = 1;
    }
    setVisibleCount(count);
    setCurrentIndex((prev) => Math.min(prev, Math.max(0, TESTIMONIALS.length - count)));
  }, []);

  useEffect(() => {
    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, [updateVisibleCount]);

  const maxIndex = Math.max(0, TESTIMONIALS.length - visibleCount);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > 45;
    const isRightSwipe = distance < -45;

    if (isLeftSwipe && currentIndex < maxIndex) {
      handleNext();
    } else if (isRightSwipe && currentIndex > 0) {
      handlePrev();
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  // Generate author initials monogram
  const getInitials = (author: string) => {
    return author
      .replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.)\s+/i, '')
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <section
      id="testimonials"
      aria-label="Guest Reviews and Testimonials"
      className="w-full py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-ivory-200/60 via-ivory-100 to-ivory-200/60 border-t border-b border-sandstone/40 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-[11px] sm:text-xs uppercase font-sans font-semibold tracking-[0.25em] text-gold-700 block mb-2.5">
            GUEST EXPERIENCES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal-900 font-medium tracking-tight mb-4">
            Stories from Our Guests
          </h2>
          <p className="font-sans text-sm sm:text-base text-charcoal-600 font-light leading-relaxed max-w-2xl mx-auto">
            Reflections on genuine hospitality, peaceful night repose, and dedicated 24/7 front desk care at Hotel Vichar Vimarsh.
          </p>
          <div className="w-12 h-0.5 bg-gold/50 mx-auto mt-4"></div>
        </div>

        {/* Carousel & Controls Wrapper */}
        <div
          className="relative focus:outline-none"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          aria-roledescription="carousel"
          aria-label="Guest reviews carousel"
        >
          {/* Top Carousel Navigation Buttons (Visible on desktop & tablet) */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-medium text-gold-800 tracking-wider">
                {String(currentIndex + 1).padStart(2, '0')} / {String(maxIndex + 1).padStart(2, '0')}
              </span>
              <span className="text-[11px] font-sans text-charcoal-500 uppercase tracking-widest hidden sm:inline">
                • Verified Stories
              </span>
            </div>

            {/* Discreet Previous & Next Buttons */}
            <div className="flex items-center gap-2">
              <button
                id="testimonial-prev-btn"
                type="button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                aria-label="Previous review"
                className="w-10 h-10 border border-sandstone/70 bg-ivory-50 text-charcoal-800 hover:border-gold hover:text-gold-800 hover:bg-gold-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-warm-sm active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                id="testimonial-next-btn"
                type="button"
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                aria-label="Next review"
                className="w-10 h-10 border border-sandstone/70 bg-ivory-50 text-charcoal-800 hover:border-gold hover:text-gold-800 hover:bg-gold-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-warm-sm active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cards Track Container with Touch Swipe */}
          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
              }}
            >
              {TESTIMONIALS.map((item, idx) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 px-2 sm:px-3 lg:px-3.5"
                  style={{ width: `${100 / visibleCount}%` }}
                >
                  <article
                    id={`testimonial-card-${idx}`}
                    className="h-full bg-ivory-50 border border-sandstone/70 hover:border-gold/70 shadow-warm-sm hover:shadow-warm-md hover:-translate-y-1 transition-all duration-300 p-6 sm:p-7 lg:p-8 flex flex-col justify-between relative group"
                  >
                    {/* Top Row: Stars + Verified Badge */}
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        {/* 5 Radiant Gold Stars */}
                        <div className="flex items-center gap-1 text-gold" aria-label="5 out of 5 stars">
                          {[...Array(item.rating || 5)].map((_, starIdx) => (
                            <Star
                              key={starIdx}
                              className="w-4 h-4 fill-gold text-gold"
                            />
                          ))}
                        </div>

                        {/* Verified Stay Badge — displayed strictly for verified reviews */}
                        {item.verifiedStay && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-ivory-200/80 border border-sandstone/70 text-[10px] uppercase font-sans font-semibold tracking-wider text-charcoal-700">
                            <CheckCircle className="w-3 h-3 text-emerald-700 flex-shrink-0" />
                            <span>Verified Stay</span>
                          </span>
                        )}
                      </div>

                      {/* Soft Quote Icon */}
                      <Quote className="w-6 h-6 text-gold/30 mb-2 rotate-180" />

                      {/* Review Highlight Title */}
                      {item.highlight && (
                        <h3 className="font-serif text-base sm:text-lg font-medium text-charcoal-900 leading-snug mb-2.5 group-hover:text-gold-800 transition-colors">
                          "{item.highlight}"
                        </h3>
                      )}

                      {/* Readable Review Quote */}
                      <blockquote className="font-sans text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed italic mb-6">
                        "{item.quote}"
                      </blockquote>
                    </div>

                    {/* Bottom Row: Guest Attribution */}
                    <div className="border-t border-sandstone/40 pt-4 mt-auto flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {/* Initials Monogram */}
                        <div
                          className="w-9 h-9 rounded-full bg-charcoal-900 text-gold flex items-center justify-center font-serif text-xs font-semibold border border-gold/40 flex-shrink-0 shadow-warm-sm"
                          aria-hidden="true"
                        >
                          {getInitials(item.author)}
                        </div>

                        {/* Name & Origin */}
                        <div>
                          <span className="font-sans font-semibold text-xs sm:text-sm text-charcoal-900 block leading-tight">
                            {item.author}
                          </span>
                          <span className="font-sans text-[11px] text-charcoal-500 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-gold-600 flex-shrink-0" />
                            <span>{item.origin}</span>
                          </span>
                        </div>
                      </div>

                      {/* Stay Type Tag */}
                      {item.stayType && (
                        <span className="text-[10px] font-sans font-medium uppercase tracking-wider text-gold-800 bg-gold-50 border border-gold/30 px-2 py-0.5 rounded-sm self-center hidden sm:inline-block">
                          {item.stayType}
                        </span>
                      )}
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator for Pagination */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {[...Array(maxIndex + 1)].map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => setCurrentIndex(dotIdx)}
                aria-label={`Go to slide ${dotIdx + 1}`}
                className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                  currentIndex === dotIdx
                    ? 'w-7 bg-gold'
                    : 'w-2 bg-sandstone hover:bg-sandstone-dark'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Rating Summary & Authentic Travel Portals Link */}
        <div className="mt-12 sm:mt-14 pt-8 border-t border-sandstone/40 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-charcoal-600 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div className="flex text-gold">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
              ))}
            </div>
            <span className="font-semibold text-charcoal-800">
              Authentic Guest Experiences
            </span>
            <span className="text-sandstone-dark hidden sm:inline">•</span>
            <span className="text-charcoal-500 hidden sm:inline">
              Verified Rajasthan Stays
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              id="reviews-goibibo-link"
              href="https://www.goibibo.com/hotels/hotel-vichar-vimarsh-hotel-in-jaipur-6916560960578637775/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-gold-800 hover:text-gold-900 font-semibold uppercase tracking-wider underline decoration-gold/40 underline-offset-4 hover:decoration-gold transition-all"
            >
              <span>Read on Goibibo</span>
              <ExternalLink className="w-3.5 h-3.5 text-gold-700" />
            </a>

            <span className="text-sandstone-dark">•</span>

            <a
              id="reviews-maps-link"
              href={HOTEL_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-charcoal-700 hover:text-gold-800 font-semibold uppercase tracking-wider underline decoration-sandstone underline-offset-4 hover:decoration-gold transition-all"
            >
              <span>Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-charcoal-500" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
