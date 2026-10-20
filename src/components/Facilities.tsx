import React from 'react';
import {
  Clock,
  ShieldCheck,
  Waves,
  Zap,
  Coffee,
  Droplet,
  Car,
  Leaf,
  Wifi,
  Sparkles
} from 'lucide-react';
import { AMENITIES } from '../data/hotelData';

export const Facilities: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Clock':
        return <Clock className="w-5 h-5 text-gold" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-gold" />;
      case 'Waves':
        return <Waves className="w-5 h-5 text-gold" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-gold" />;
      case 'Coffee':
        return <Coffee className="w-5 h-5 text-gold" />;
      case 'Droplet':
        return <Droplet className="w-5 h-5 text-gold" />;
      case 'Car':
        return <Car className="w-5 h-5 text-gold" />;
      case 'Leaf':
        return <Leaf className="w-5 h-5 text-gold" />;
      default:
        return <Sparkles className="w-5 h-5 text-gold" />;
    }
  };

  return (
    <section className="w-full py-20 lg:py-28 bg-ivory-200/50 border-b border-sandstone/30" id="facilities">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div>
            <span className="text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-widest text-gold-700 block mb-2">
              COMFORT &amp; CONVENIENCE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal-900 font-normal">
              Amenities Curated for Quiet Ease
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-charcoal-600 max-w-md mt-4 md:mt-0 font-light leading-relaxed">
            Every service is tailored to remove travel friction, ensuring uninterrupted rest from late arrivals to morning departures.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {AMENITIES.map((amenity) => (
            <div
              key={amenity.id}
              className="bg-ivory-50 border border-sandstone/50 p-5 sm:p-6 flex flex-col justify-between group shadow-warm-sm hover:shadow-warm-md hover:border-gold/50 transition-all duration-300"
            >
              <div>
                {/* Header with Icon and Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 bg-ivory-100 border border-sandstone/40 flex items-center justify-center group-hover:border-gold/50 transition-colors">
                    {getIcon(amenity.iconName)}
                  </div>
                  {amenity.highlightTag && (
                    <span className="text-[10px] uppercase font-sans font-semibold tracking-wider text-gold-800 bg-ivory-200/80 px-2.5 py-1">
                      {amenity.highlightTag}
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-lg sm:text-xl text-charcoal-900 mb-1 group-hover:text-gold-800 transition-colors">
                  {amenity.title}
                </h3>
                <span className="text-[10px] sm:text-[11px] font-sans text-gold-700 font-medium tracking-wide uppercase block mb-2.5">
                  {amenity.subtitle}
                </span>

                <p className="text-xs text-charcoal-600 font-light leading-relaxed mb-4">
                  {amenity.description}
                </p>
              </div>

              {amenity.image && (
                <div className="mt-3 pt-3 border-t border-sandstone/40 overflow-hidden aspect-[16/9]">
                  <img
                    src={amenity.image}
                    alt={amenity.title}
                    className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional verified highlights strip */}
        <div className="mt-10 sm:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-5 sm:p-6 bg-charcoal-900 text-ivory-200">
          <div className="flex items-center gap-2.5">
            <Wifi className="w-4 h-4 text-gold flex-shrink-0" />
            <span className="text-[11px] sm:text-xs font-sans tracking-wider uppercase font-medium">
              High-Speed Wi-Fi
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <Zap className="w-4 h-4 text-gold flex-shrink-0" />
            <span className="text-[11px] sm:text-xs font-sans tracking-wider uppercase font-medium">
              Inverter Backup
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <Droplet className="w-4 h-4 text-gold flex-shrink-0" />
            <span className="text-[11px] sm:text-xs font-sans tracking-wider uppercase font-medium">
              Pure RO Drinking Water
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-gold flex-shrink-0" />
            <span className="text-[11px] sm:text-xs font-sans tracking-wider uppercase font-medium">
              24/7 Physical Desk
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
