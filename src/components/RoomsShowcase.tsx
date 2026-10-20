import React, { useState } from 'react';
import { ArrowRight, Sparkles, Phone } from 'lucide-react';
import { ROOMS, HOTEL_INFO } from '../data/hotelData';
import { Room } from '../types';

interface RoomsShowcaseProps {
  onSelectRoom: (room: Room) => void;
}

export const RoomsShowcase: React.FC<RoomsShowcaseProps> = ({ onSelectRoom }) => {
  const [activeImageIndex, setActiveImageIndex] = useState<Record<string, number>>({});

  const getGridClasses = (index: number) => {
    // Top Row (3 cards): Each spans 2 columns in a 6-column grid (2 + 2 + 2 = 6 cols)
    if (index < 3) {
      return 'col-span-1 md:col-span-1 lg:col-span-2';
    }
    // Bottom Row (2 cards): Each spans 3 columns in a 6-column grid (3 + 3 = 6 cols)
    // Both rows span the exact same total content width!
    if (index === 3) {
      return 'col-span-1 md:col-span-1 lg:col-span-3';
    }
    // Card 5 (index 4): centered on tablet, spans 3 cols on desktop
    return 'col-span-1 md:col-span-2 md:max-w-md md:mx-auto md:w-full lg:max-w-none lg:w-full lg:col-span-3';
  };

  const getImageObjectPosition = (roomId: string) => {
    if (roomId === 'budget-single-room') return 'object-[center_60%]';
    if (roomId === 'premium-king-size-room') return 'object-[center_45%]';
    return 'object-center';
  };

  return (
    <section
      id="rooms"
      className="w-full py-16 sm:py-20 lg:py-24 bg-ivory-100 border-b border-sandstone/30 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-widest text-gold-700 block mb-2.5">
            ACCOMMODATION &amp; ROOMS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal-900 mb-3.5 font-normal tracking-tight">
            Find Your Stay
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-charcoal-600 font-light leading-relaxed">
            Five distinct room categories tailored for solo travelers, couples, and road trips—featuring dedicated private bathrooms, inverter backup, and 24/7 reception care.
          </p>
        </div>

        {/* 5 Accommodation Cards Grid: Exact 3 Top (2 cols each) + 2 Bottom (3 cols each) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-8 items-stretch">
          {ROOMS.map((room, index) => {
            const currentImageIdx = activeImageIndex[room.id] || 0;
            const currentImage = (room.images && room.images[currentImageIdx]) || room.image;

            return (
              <div
                key={room.id}
                id={`room-card-${room.id}`}
                className={`${getGridClasses(index)} bg-ivory-50 border border-sandstone/60 shadow-warm-sm overflow-hidden group hover:border-gold/60 transition-all duration-300 flex flex-col h-full`}
              >
                {/* Standardised Image Container with Consistent Display Height (15-20% reduced for top cards) */}
                <div className={`overflow-hidden relative ${index < 3 ? 'h-48 sm:h-52 lg:h-52' : 'h-52 sm:h-56 lg:h-56'} w-full bg-charcoal-900 border-b border-sandstone/40`}>
                  <img
                    src={currentImage}
                    alt={`${room.name}${room.images && room.images.length > 1 ? ` - View ${currentImageIdx + 1}` : ''}`}
                    className={`w-full h-full object-cover ${getImageObjectPosition(room.id)} transform group-hover:scale-103 transition-transform duration-500`}
                    loading="lazy"
                  />

                  {/* Badge */}
                  <div className="absolute top-3 left-3 bg-charcoal-900/90 backdrop-blur-sm text-gold px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-wider border border-gold/30 shadow-sm">
                    {room.badge || room.category}
                  </div>

                  {/* Multi-Photo Switcher for rooms with more than one photo */}
                  {room.images && room.images.length > 1 && (
                    <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 bg-charcoal-900/90 backdrop-blur-md p-1 border border-gold/40 shadow-lg text-ivory-100 z-10">
                      <span className="text-[9px] font-sans uppercase tracking-wider text-gold-300 font-medium px-1">
                        Photo {currentImageIdx + 1}/{room.images.length}
                      </span>
                      {room.images.map((imgSrc, imgIdx) => (
                        <button
                          key={imgIdx}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveImageIndex((prev) => ({ ...prev, [room.id]: imgIdx }));
                          }}
                          className={`w-6 h-6 sm:w-7 sm:h-7 border transition-all overflow-hidden cursor-pointer ${
                            currentImageIdx === imgIdx
                              ? 'border-gold ring-1 ring-gold opacity-100 scale-105'
                              : 'border-sandstone/50 opacity-60 hover:opacity-100'
                          }`}
                          title={`View photo ${imgIdx + 1} for ${room.name}`}
                          aria-label={`View photo ${imgIdx + 1} for ${room.name}`}
                        >
                          <img src={imgSrc} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Content Area - Compact padding for top cards */}
                <div className={`${index < 3 ? 'p-4 sm:p-5 lg:p-5' : 'p-5 sm:p-6 lg:p-6'} flex flex-col flex-1`}>
                  <div>
                    {/* Meta Info Bar - Compact single line on desktop */}
                    <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 mb-2 pb-2 border-b border-sandstone/50 text-[10px] sm:text-[11px] font-sans text-gold-800 font-semibold tracking-wider uppercase">
                      <span>{room.size}</span>
                      <span className="text-sandstone-dark">•</span>
                      <span>{room.occupancy}</span>
                      <span className="text-sandstone-dark">•</span>
                      <span>{room.bedType}</span>
                    </div>

                    {/* Room Title - 22px on desktop */}
                    <h3 className="font-serif text-lg sm:text-xl lg:text-[22px] text-charcoal-900 mb-1.5 group-hover:text-gold-800 transition-colors leading-snug font-normal">
                      {room.name}
                    </h3>

                    {/* Room Description - Readable 14px on desktop */}
                    <p className="text-xs sm:text-[13px] lg:text-[14px] text-charcoal-600 mb-2.5 font-light leading-relaxed">
                      {room.description}
                    </p>

                    {/* Features List - Tightened vertical spacing */}
                    <div className="mb-3">
                      <span className="text-[10px] uppercase font-sans font-semibold tracking-widest text-charcoal-500 block mb-1">
                        KEY HIGHLIGHTS
                      </span>
                      <div className={index >= 3 ? "grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1" : "space-y-1"}>
                        {room.features.slice(0, index < 3 ? 3 : 4).map((feature, fIdx) => (
                          <div
                            key={fIdx}
                            className="flex items-start gap-2 text-xs text-charcoal-700 leading-tight"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0 mt-1" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Booking Action Area at Bottom of Card */}
                  <div className="mt-auto pt-3 border-t border-sandstone/50 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[10px] uppercase font-sans tracking-wider text-charcoal-500">
                        Direct Tariff
                      </span>
                      <span className="text-[11px] sm:text-xs font-semibold text-charcoal-900 tracking-tight">
                        {room.startingRate}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        id={`enquire-btn-${room.id}`}
                        type="button"
                        onClick={() => onSelectRoom(room)}
                        className="flex-1 py-2 sm:py-2.5 px-3 sm:px-4 bg-charcoal-900 text-gold hover:bg-gold hover:text-charcoal-900 text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 shadow-warm-sm active:scale-95 whitespace-nowrap cursor-pointer rounded-none border border-gold/40 focus:outline-none focus:ring-1 focus:ring-gold"
                        aria-label={`Enquire about ${room.name}`}
                      >
                        <span>ENQUIRE ABOUT THIS ROOM</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <a
                        id={`call-desk-room-${room.id}`}
                        href={`tel:${HOTEL_INFO.phones[0].tel}`}
                        className="p-2 sm:p-2.5 border border-sandstone/80 hover:border-gold text-charcoal-800 hover:text-gold transition-colors flex-shrink-0 bg-ivory-100 hover:bg-ivory-200"
                        title="Call front desk directly about this room"
                        aria-label={`Call front desk about ${room.name}`}
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Direct Booking Assurance Note */}
        <div className="mt-12 sm:mt-14 p-5 sm:p-6 bg-ivory-200/70 border border-sandstone/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-charcoal-800 text-xs sm:text-sm">
            <Sparkles className="w-5 h-5 text-gold flex-shrink-0" />
            <p className="font-light leading-relaxed">
              <strong className="font-medium text-charcoal-900">Direct Reservation Privilege:</strong> Reserve directly via phone or our verified inquiry desk for guaranteed best tariff rates, flexible arrival adjustments, and personalized room selection.
            </p>
          </div>
          <a
            id="room-footer-call-btn"
            href={`tel:${HOTEL_INFO.phones[0].tel}`}
            className="whitespace-nowrap px-5 py-2.5 bg-ivory-50 border border-gold/60 text-gold-800 hover:bg-gold hover:text-charcoal-900 text-xs uppercase font-semibold tracking-wider transition-colors flex-shrink-0"
          >
            Call Desk: {HOTEL_INFO.phones[0].number}
          </a>
        </div>
      </div>
    </section>
  );
};
