import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HighlightsProps {
  onOpenBooking: () => void;
}

export const Highlights: React.FC<HighlightsProps> = ({ onOpenBooking }) => {
  return (
    <section className="w-full py-20 lg:py-28 bg-ivory-200/60 border-b border-sandstone/30" id="highlights">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div>
            <span className="text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-widest text-gold-700 block mb-2">
              PROPERTY ATTRIBUTES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal-900 font-normal">
              Architectural Tactility &amp; Warmth
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-charcoal-600 max-w-md mt-4 md:mt-0 font-light leading-relaxed">
            Carefully composed environments where natural stone textures, thoughtful in-room amenities, and attentive Indian hospitality coalesce.
          </p>
        </div>

        {/* Asymmetrical 4-Card Composition */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Highlight 1: Accommodations (Span 7) */}
          <div className="lg:col-span-7 bg-ivory-50 border border-sandstone/50 p-5 sm:p-7 lg:p-8 flex flex-col justify-between group shadow-warm-sm hover:shadow-warm-md hover:border-gold/50 transition-all duration-300">
            <div className="overflow-hidden aspect-[16/10] mb-5 sm:mb-6 relative">
              <img
                src="/images/Premium Big size Bedroom.png"
                alt="Hotel Vichar Vimarsh authentic double room"
                className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-charcoal-900/85 backdrop-blur-sm text-gold px-3 py-1 text-[10px] uppercase font-sans font-semibold tracking-wider">
                Accommodations
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-sans font-semibold uppercase tracking-widest text-gold-700">
                HAVEN 01 • PRIVATE ACCOMMODATIONS
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-charcoal-900 font-normal group-hover:text-gold-800 transition-colors">
                Restful &amp; Private Accommodations
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
                From solo voyagers choosing our practical Budget Single Room to couples enjoying our spacious double rooms, each room features an attached private bathroom, inverter backup, and peaceful comfort.
              </p>
            </div>
          </div>

          {/* Highlight 2: 24x7 Lobby & Concierge (Span 5) */}
          <div className="lg:col-span-5 bg-ivory-50 border border-sandstone/50 p-5 sm:p-7 lg:p-8 flex flex-col justify-between group shadow-warm-sm hover:shadow-warm-md hover:border-gold/50 transition-all duration-300">
            <div className="overflow-hidden aspect-[4/3] mb-5 sm:mb-6 relative">
              <img
                src="/images/lobby-warm.png"
                alt="Hotel Vichar Vimarsh entrance reception warmly lit at dusk"
                className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-charcoal-900/85 backdrop-blur-sm text-gold px-3 py-1 text-[10px] uppercase font-sans font-semibold tracking-wider">
                Round-The-Clock
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-sans font-semibold uppercase tracking-widest text-gold-700">
                CARE 02 • ALWAYS ON DUTY
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-charcoal-900 font-normal group-hover:text-gold-800 transition-colors">
                24x7 Reception &amp; Security
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
                Physical front desk staff welcoming late-night road arrivals, express check-ins, and direct concierge assistance with genuine Rajasthani warmth.
              </p>
            </div>
          </div>

          {/* Highlight 3: Private Hydrotherapy (Span 5) */}
          <div className="lg:col-span-5 bg-ivory-50 border border-sandstone/50 p-5 sm:p-7 lg:p-8 flex flex-col justify-between group shadow-warm-sm hover:shadow-warm-md hover:border-gold/50 transition-all duration-300">
            <div className="overflow-hidden aspect-[4/3] mb-5 sm:mb-6 relative">
              <img
                src="/images/bathroom-jacuzzi.png"
                alt="Hydrotherapy Jacuzzi with turquoise lighting"
                className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-charcoal-900/85 backdrop-blur-sm text-gold px-3 py-1 text-[10px] uppercase font-sans font-semibold tracking-wider">
                Wellness Feature
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-sans font-semibold uppercase tracking-widest text-gold-700">
                COMFORT 03 • HYDRO-THERAPY
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-charcoal-900 font-normal group-hover:text-gold-800 transition-colors">
                Hydrotherapy Jacuzzi Bath
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
                Rejuvenating jacuzzi bath equipped with therapeutic water jets and ambient chromotherapy lighting, designed to wash away all road fatigue.
              </p>
            </div>
          </div>

          {/* Highlight 4: Modern Facade & Gated Parking (Span 7) */}
          <div className="lg:col-span-7 bg-ivory-50 border border-sandstone/50 p-5 sm:p-7 lg:p-8 flex flex-col justify-between group shadow-warm-sm hover:shadow-warm-md hover:border-gold/50 transition-all duration-300">
            <div className="overflow-hidden aspect-[16/10] mb-5 sm:mb-6 relative">
              <img
                src="/images/facade-golden-hour.png"
                alt="Hotel Vichar Vimarsh exterior at golden hour"
                className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-charcoal-900/85 backdrop-blur-sm text-gold px-3 py-1 text-[10px] uppercase font-sans font-semibold tracking-wider">
                Sanctuary Grounds
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-sans font-semibold uppercase tracking-widest text-gold-700">
                SANCTUARY 04 • CONVENIENCE
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-charcoal-900 font-normal group-hover:text-gold-800 transition-colors">
                Sunset Facade &amp; Gated Parking
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
                Generous modern facade capturing the Rajasthan golden hour, featuring safe on-site gated parking with continuous CCTV security for guest cars and touring vehicles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
