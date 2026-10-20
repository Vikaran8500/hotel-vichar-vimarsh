import React, { useState } from 'react';
import { Maximize2, ArrowUpRight } from 'lucide-react';
import { GALLERY_IMAGES } from '../data/hotelData';
import { GalleryImage } from '../types';
import { GalleryModal } from './GalleryModal';

export const Gallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'rooms' | 'exterior' | 'amenities' | 'reception'>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filteredImages = activeFilter === 'all'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter((img) => img.category === activeFilter);

  const handleNext = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex]);
  };

  const renderCard = (
    image: GalleryImage,
    aspectRatioClass = 'aspect-[16/10]',
    objectPositionClass = 'object-center',
    containerClass = ''
  ) => {
    return (
      <div
        key={image.id}
        id={`gallery-item-${image.id}`}
        onClick={() => setSelectedImage(image)}
        className={`group relative overflow-hidden bg-charcoal-900 border border-sandstone/50 cursor-pointer shadow-warm-sm hover:shadow-warm-lg transition-all duration-500 ${containerClass}`}
      >
        <div className={`w-full h-full overflow-hidden ${aspectRatioClass}`}>
          <img
            src={image.src}
            alt={image.title}
            className={`w-full h-full object-cover ${objectPositionClass} transform group-hover:scale-105 transition-transform duration-700`}
            loading="lazy"
          />
        </div>

        {/* Hover overlay with title and icon */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/90 via-charcoal-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-ivory-100 pointer-events-none">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-sans font-semibold tracking-widest text-gold block mb-1">
                {image.category}
              </span>
              <h4 className="font-serif text-lg text-ivory-50 font-medium">
                {image.title}
              </h4>
            </div>
            <div className="p-2 bg-charcoal-800/80 rounded-full text-gold">
              <Maximize2 className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      id="gallery"
      className="w-full py-20 lg:py-28 bg-ivory-100 border-b border-sandstone/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[11px] font-sans font-semibold uppercase tracking-widest text-gold-700 block mb-2">
              VISUAL CHRONICLE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal-900 font-normal">
              Moments of Calm &amp; Craft
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 mt-6 md:mt-0">
            {[
              { label: 'All Photographs', value: 'all', id: 'gallery-filter-all' },
              { label: 'Guest Rooms', value: 'rooms', id: 'gallery-filter-rooms' },
              { label: 'Exterior & Dusk', value: 'exterior', id: 'gallery-filter-exterior' },
              { label: 'Amenities', value: 'amenities', id: 'gallery-filter-amenities' },
              { label: 'Reception & Security', value: 'reception', id: 'gallery-filter-reception' },
            ].map((tab) => (
              <button
                key={tab.value}
                id={tab.id}
                onClick={() => setActiveFilter(tab.value as any)}
                className={`px-3.5 py-1.5 text-xs font-sans uppercase tracking-wider font-semibold transition-all ${
                  activeFilter === tab.value
                    ? 'bg-charcoal-900 text-gold shadow-warm-sm'
                    : 'bg-ivory-50 text-charcoal-600 hover:text-charcoal-900 border border-sandstone/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Refined Image Layout Grid */}
        {activeFilter === 'all' && filteredImages.length >= 12 && (
          <div className="space-y-6">
            {/* Trio 1: 3 Guest Rooms in an Aligned Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {renderCard(filteredImages[0], 'aspect-[16/10]', 'object-[center_70%]')}
              {renderCard(filteredImages[1], 'aspect-[16/10]', 'object-center')}
              {renderCard(filteredImages[2], 'aspect-[16/10]', 'object-center')}
            </div>

            {/* Trio 2: Balanced 3-Image Composition (Grand Entrance Sign + Facade Views) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
              <div className="md:col-span-5 h-full">
                {renderCard(
                  filteredImages[4], // ext-entrance-sign
                  'aspect-[3/4] sm:aspect-[4/5] md:aspect-auto md:h-full',
                  'object-top sm:object-[center_20%]',
                  'h-full'
                )}
              </div>
              <div className="md:col-span-7 flex flex-col justify-between gap-6">
                {renderCard(filteredImages[3], 'aspect-[16/10]', 'object-center')}
                {renderCard(filteredImages[5], 'aspect-[16/10]', 'object-center')}
              </div>
            </div>

            {/* Trio 3: 3 Hospitality & Atmosphere Views in an Aligned Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {renderCard(filteredImages[6], 'aspect-[16/10]', 'object-center')}
              {renderCard(filteredImages[7], 'aspect-[16/10]', 'object-center')}
              {renderCard(filteredImages[8], 'aspect-[16/10]', 'object-center')}
            </div>

            {/* Trio 4: Balanced 3-Image Composition (Jacuzzi Bath + CCTV + Pure RO Station) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
              <div className="md:col-span-7 flex flex-col justify-between gap-6">
                {renderCard(filteredImages[9], 'aspect-[16/10]', 'object-center')}
                {renderCard(filteredImages[10], 'aspect-[16/10]', 'object-center')}
              </div>
              <div className="md:col-span-5 h-full">
                {renderCard(
                  filteredImages[11], // amenity-2
                  'aspect-[3/4] sm:aspect-[4/5] md:aspect-auto md:h-full',
                  'object-[center_30%]',
                  'h-full'
                )}
              </div>
            </div>

            {/* Additional Curated Views (Deluxe & Luxury Suite) */}
            {filteredImages.length > 12 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {filteredImages.slice(12).map((img) =>
                  renderCard(img, 'aspect-[16/10]', 'object-center')
                )}
              </div>
            )}
          </div>
        )}

        {/* Filter Tab: Guest Rooms */}
        {activeFilter === 'rooms' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {filteredImages.slice(0, 3).map((img) =>
                renderCard(
                  img,
                  'aspect-[16/10]',
                  img.id === 'room-1' ? 'object-[center_70%]' : 'object-center'
                )
              )}
            </div>
            {filteredImages.length > 3 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {filteredImages.slice(3).map((img) =>
                  renderCard(img, 'aspect-[16/10]', 'object-center')
                )}
              </div>
            )}
          </div>
        )}

        {/* Filter Tab: Exterior & Dusk */}
        {activeFilter === 'exterior' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {filteredImages
                .filter((img) => img.aspectRatio === 'wide')
                .map((img) => renderCard(img, 'aspect-[16/10]', 'object-center'))}
            </div>
            {filteredImages.find((img) => img.id === 'ext-entrance-sign') && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div className="md:col-span-2">
                  {renderCard(
                    filteredImages.find((img) => img.id === 'ext-entrance-sign')!,
                    'aspect-[16/9] sm:aspect-[21/9]',
                    'object-[center_25%]'
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Filter Tab: Amenities */}
        {activeFilter === 'amenities' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {filteredImages.map((img) =>
              renderCard(
                img,
                'aspect-[4/3]',
                img.id === 'amenity-2' ? 'object-[center_30%]' : 'object-center'
              )
            )}
          </div>
        )}

        {/* Filter Tab: Reception & Security */}
        {activeFilter === 'reception' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {filteredImages.map((img) =>
              renderCard(img, 'aspect-[16/10]', 'object-center')
            )}
          </div>
        )}

        {/* Monogram Seal Tribute Card */}
        <div className="mt-12 p-8 bg-ivory-50 border border-sandstone/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 p-2 bg-ivory-100 border border-gold/40 flex-shrink-0">
              <img src="/images/logo.png" alt="Hotel Seal" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-sans font-semibold tracking-widest text-gold-700 block">
                AUTHENTIC HOSPITALITY PROMISE
              </span>
              <h4 className="font-serif text-xl text-charcoal-900 font-medium">
                Hospitality Rooted in Rajasthan
              </h4>
              <p className="text-xs text-charcoal-600 font-light mt-0.5">
                Every photograph presented is an authentic portrayal of Hotel Vichar Vimarsh premises and rooms.
              </p>
            </div>
          </div>
          <a
            id="gallery-tribute-book-btn"
            href="#booking-strip"
            className="px-6 py-3 bg-charcoal-900 text-gold hover:bg-gold hover:text-charcoal-900 text-xs uppercase font-sans font-semibold tracking-widest transition-all whitespace-nowrap active:scale-95"
          >
            Experience It Firsthand →
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      <GalleryModal
        image={selectedImage}
        images={filteredImages}
        onClose={() => setSelectedImage(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  );
};
