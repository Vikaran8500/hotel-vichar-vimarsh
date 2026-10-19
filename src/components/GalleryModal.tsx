import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { GalleryImage } from '../types';

interface GalleryModalProps {
  image: GalleryImage | null;
  images: GalleryImage[];
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({
  image,
  images,
  onClose,
  onNext,
  onPrev,
}) => {
  const currentIndex = image ? images.findIndex((img) => img.id === image.id) : -1;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    },
    [onClose, onNext, onPrev]
  );

  useEffect(() => {
    if (image) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [image, handleKeyDown]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-900/95 backdrop-blur-xl p-4 sm:p-6 lg:p-10 animate-fadeIn"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-20 p-2.5 text-ivory-300 hover:text-gold bg-charcoal-800/80 rounded-full border border-charcoal-700 transition-colors"
        aria-label="Close Lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-3 text-ivory-200 hover:text-gold bg-charcoal-800/80 rounded-full border border-charcoal-700 transition-all hover:scale-105"
        aria-label="Previous Image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-3 text-ivory-200 hover:text-gold bg-charcoal-800/80 rounded-full border border-charcoal-700 transition-all hover:scale-105"
        aria-label="Next Image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Central Image Container */}
      <div
        className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image.src}
          alt={image.title}
          className="max-w-full max-h-[75vh] object-contain shadow-2xl border border-charcoal-700"
        />

        {/* Caption & Counter */}
        <div className="w-full mt-4 flex items-center justify-between text-xs text-ivory-300 px-2">
          <div>
            <h4 className="font-serif text-base text-ivory-100 font-medium">{image.title}</h4>
            <p className="text-ivory-400 font-light mt-0.5">{image.caption}</p>
          </div>
          <div className="text-gold font-sans font-medium tracking-widest uppercase">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </div>
    </div>
  );
};
