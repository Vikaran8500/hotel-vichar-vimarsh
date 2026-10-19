import React from 'react';
import { ArrowRight, Sparkles, Phone } from 'lucide-react';
import { ROOMS, HOTEL_INFO } from '../data/hotelData';
import { Room } from '../types';

interface RoomsShowcaseProps {
  onSelectRoom: (room: Room) => void;
}

export const RoomsShowcase: React.FC<RoomsShowcaseProps> = ({ onSelectRoom }) => {
  return (
    <section
      id="rooms"
      className="w-full py-20 lg:py-28 bg-ivory-100 border-b border-sandstone/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-20">
          <span className="text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-widest text-gold-700 block mb-3">
            ACCOMMODATION &amp; ROOMS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal-900 mb-4 font-normal">
            Thoughtfully Crafted for Restful Stays
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-charcoal-600 font-light leading-relaxed">
            Every room at Hotel Vichar Vimarsh features an attached private bathroom, air conditioning, continuous power backup, and dedicated 24/7 reception assistance.
          </p>
        </div>

        {/* Accommodation Cards Stack */}
        <div className="space-y-14 lg:space-y-20">
          {ROOMS.map((room, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <div
                key={room.id}
                id={`room-card-${room.id}`}
                className="grid grid-cols-1 lg:grid-cols-12 bg-ivory-50 border border-sandstone/60 shadow-warm-sm overflow-hidden group hover:border-gold/60 transition-all duration-300"
              >
                {/* Image Column */}
                <div
                  className={`lg:col-span-7 overflow-hidden relative aspect-[16/10] sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-full ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <img
                    src={room.image}
                    alt={room.name}
                    className={`w-full h-full object-cover ${
                      room.id === 'budget-single-room' ? 'object-[center_70%]' : 'object-center'
                    } transform group-hover:scale-102 transition-transform duration-500`}
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-charcoal-900/90 backdrop-blur-sm text-gold px-3.5 py-1 text-xs font-sans font-semibold uppercase tracking-wider border border-gold/30">
                    {room.badge || room.category}
                  </div>

                  {/* Private Jacuzzi highlight for Premium Room */}
                  {room.id === 'premium-double-jacuzzi' && (
                    <div className="absolute bottom-4 right-4 flex items-center gap-2.5 bg-charcoal-900/95 backdrop-blur-md p-1.5 pr-3 border border-gold/40 shadow-lg text-ivory-100">
                      <img
                        src="/images/bathroom-jacuzzi.png"
                        alt="Attached Private Jacuzzi Bath"
                        className="w-12 h-12 object-cover border border-gold/40"
                      />
                      <div className="text-left">
                        <span className="text-[9px] font-sans uppercase tracking-widest text-gold font-semibold block">Attached Amenity</span>
                        <span className="text-[11px] font-serif text-ivory-50 font-normal">Private Jacuzzi Bath</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content Column */}
                <div
                  className={`lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div>
                    {/* Meta Info Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-sandstone/40 text-xs font-sans text-gold-800 font-semibold tracking-wider uppercase">
                      <span>{room.size}</span>
                      <span>•</span>
                      <span>{room.occupancy}</span>
                      <span>•</span>
                      <span>{room.bedType}</span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl text-charcoal-900 mb-3 group-hover:text-gold-800 transition-colors">
                      {room.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-charcoal-600 mb-6 font-light leading-relaxed">
                      {room.description}
                    </p>

                    {/* Features Grid */}
                    <div className="mb-6">
                      <span className="text-[10px] uppercase font-sans font-semibold tracking-widest text-charcoal-600 block mb-2.5">
                        ROOM HIGHLIGHTS &amp; INCLUSIONS
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {room.features.slice(0, 4).map((feature, fIdx) => (
                          <div
                            key={fIdx}
                            className="flex items-center gap-2 text-xs text-charcoal-700"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0"></span>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Booking Footer inside card */}
                  <div className="pt-5 border-t border-sandstone/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-charcoal-500 block">
                        Direct Booking Tariff
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-charcoal-900">
                        {room.startingRate}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 w-full sm:w-auto">
                      <button
                        id={`enquire-btn-${room.id}`}
                        type="button"
                        onClick={() => onSelectRoom(room)}
                        className="flex-1 sm:flex-initial px-5 py-3 bg-charcoal-900 text-gold hover:bg-gold hover:text-charcoal-900 text-xs uppercase tracking-widest font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-warm-sm active:scale-95 whitespace-nowrap cursor-pointer"
                      >
                        <span>ENQUIRE ABOUT THIS ROOM</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <a
                        id={`call-desk-room-${room.id}`}
                        href={`tel:${HOTEL_INFO.phones[0].tel}`}
                        className="p-3 border border-sandstone hover:border-gold text-charcoal-800 hover:text-gold transition-colors flex-shrink-0"
                        title="Call front desk directly about this room"
                      >
                        <Phone className="w-4 h-4" />
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
