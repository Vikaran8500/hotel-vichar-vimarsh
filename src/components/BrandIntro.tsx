import React from 'react';
import { ArrowRight, Shield, Clock, Waves, Zap } from 'lucide-react';

export const BrandIntro: React.FC = () => {
  return (
    <section className="w-full py-20 lg:py-28 bg-ivory-100 border-b border-sandstone/30" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Monogram & Overline */}
          <div className="lg:col-span-4 flex flex-col items-start space-y-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-ivory-50 border border-gold/40 flex items-center justify-center p-3 shadow-warm-md">
              <img
                src="/images/logo.png"
                alt="Hotel Vichar Vimarsh Monogram Seal"
                className="w-full h-full object-contain filter drop-shadow"
              />
            </div>

            <div>
              <span className="text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-widest text-gold-700 block mb-2">
                THE VICHAR VIMARSH ETHOS
              </span>
              <h2 className="font-serif text-2xl lg:text-3xl text-charcoal-900 font-normal">
                Mindful Hospitality
              </h2>
            </div>

            <p className="text-sm text-charcoal-600 leading-relaxed font-light">
              Derived from the classical Sanskrit principles of introspective contemplation (<em className="italic font-serif">Vichar</em>) and constructive discourse (<em className="italic font-serif">Vimarsh</em>), our haven offers travelers an unhurried pause from the fast momentum of everyday travel.
            </p>

            <div className="pt-2">
              <a
                href="#rooms"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold-700 font-semibold hover:text-gold-900 transition-colors group"
              >
                <span>Explore Rooms</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Column: Expansive Narrative & Key Pillars */}
          <div className="lg:col-span-8 space-y-8">
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-charcoal-900 leading-[1.2] font-normal">
              More Than a Stay. <br className="hidden sm:inline" />
              A Thoughtfully Designed Experience in Conscious Warmth.
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-2">
              <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed font-light">
                Every detail of our marble backdrops, the soothing ambient cove lighting, and the round-the-clock availability of our reception team are orchestrated with one singular aspiration: to make you feel completely, deeply at ease.
              </p>
              <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed font-light">
                Whether unwinding in our hydrotherapy bath after a long highway journey or relaxing in the quiet calm of your room, Hotel Vichar Vimarsh remains your personal retreat of warmth and refined taste.
              </p>
            </div>

            {/* Key Pillars Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4 pt-4">
              <div className="p-4 sm:p-5 bg-ivory-50 border border-sandstone/50 shadow-warm-sm hover:border-gold/60 transition-colors">
                <Clock className="w-5 h-5 text-gold mb-2" />
                <span className="block font-serif text-xl sm:text-2xl lg:text-3xl text-charcoal-900 font-medium mb-1">
                  24/7
                </span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-charcoal-600 font-medium block">
                  Front Desk Care
                </span>
              </div>

              <div className="p-4 sm:p-5 bg-ivory-50 border border-sandstone/50 shadow-warm-sm hover:border-gold/60 transition-colors">
                <Zap className="w-5 h-5 text-gold mb-2" />
                <span className="block font-serif text-xl sm:text-2xl lg:text-3xl text-charcoal-900 font-medium mb-1">
                  Inverter
                </span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-charcoal-600 font-medium block">
                  Power Backup
                </span>
              </div>

              <div className="p-4 sm:p-5 bg-ivory-50 border border-sandstone/50 shadow-warm-sm hover:border-gold/60 transition-colors">
                <Waves className="w-5 h-5 text-gold mb-2" />
                <span className="block font-serif text-xl sm:text-2xl lg:text-3xl text-charcoal-900 font-medium mb-1">
                  Hydro
                </span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-charcoal-600 font-medium block">
                  Wellness Bath
                </span>
              </div>

              <div className="p-4 sm:p-5 bg-ivory-50 border border-sandstone/50 shadow-warm-sm hover:border-gold/60 transition-colors">
                <Shield className="w-5 h-5 text-gold mb-2" />
                <span className="block font-serif text-xl sm:text-2xl lg:text-3xl text-charcoal-900 font-medium mb-1">
                  24x7
                </span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-charcoal-600 font-medium block">
                  CCTV Security
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
