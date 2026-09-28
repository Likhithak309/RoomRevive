import React from 'react';
import { Sparkles, ArrowRight, UploadCloud, Sliders, CheckCircle, ShieldCheck, Palette, Layers } from 'lucide-react';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { RoomImages } from '../assets/images';

interface HomeViewProps {
  onStartUpload: () => void;
  onExploreGallery: () => void;
  onHowItWorks: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onStartUpload,
  onExploreGallery,
  onHowItWorks,
}) => {
  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 sm:pt-14 pb-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Copy & Actions */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-left">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#355E4C] bg-[#EAEFEA] px-3 py-1.5 rounded-lg">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Gen Interior Intelligence</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#222120] tracking-tight leading-[1.1] text-balance">
                Your Room. <br className="hidden sm:inline" />
                <span className="italic font-normal text-[#355E4C]">Reimagined.</span>
              </h1>

              <p className="text-base sm:text-lg text-stone-600 max-w-xl leading-relaxed">
                Turn a photo of your room into a personalized makeover designed around your style, space, and budget. Keep what you love. Change what you don't.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={onStartUpload}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white bg-[#355E4C] rounded-xl hover:bg-[#2A4B3D] active:scale-[0.98] transition-all shadow-md group"
                >
                  <Sparkles className="w-4 h-4 text-[#E2EBE4]" />
                  <span>Revive My Room</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={onHowItWorks}
                  className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium text-stone-700 bg-white border border-stone-200 rounded-xl hover:bg-stone-50 hover:text-[#222120] transition-colors"
                >
                  See How It Works
                </button>
              </div>

              {/* Trust Indicators / Metrics */}
              <div className="pt-4 border-t border-black/[0.06] grid grid-cols-3 gap-4 text-left">
                <div>
                  <div className="text-2xl font-serif font-bold text-[#222120] tabular-nums">14k+</div>
                  <div className="text-xs text-stone-500">Rooms Transformed</div>
                </div>
                <div>
                  <div className="text-2xl font-serif font-bold text-[#222120] tabular-nums">8</div>
                  <div className="text-xs text-stone-500">Aesthetic Styles</div>
                </div>
                <div>
                  <div className="text-2xl font-serif font-bold text-[#222120] tabular-nums">₹5k+</div>
                  <div className="text-xs text-stone-500">Adaptive Budgets</div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Before/After Interactive Comparison */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                {/* Decorative architectural shadow blur */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#355E4C]/10 via-[#B85D38]/5 to-transparent rounded-3xl blur-2xl -z-10" />

                <div className="bg-white p-3 rounded-3xl shadow-xl border border-black/[0.06]">
                  <BeforeAfterSlider
                    beforeImage={RoomImages.heroBefore}
                    afterImage={RoomImages.heroAfter}
                    beforeLabel="Ordinary Bedroom"
                    afterLabel="Japandi Revival"
                    aspectRatio="aspect-[16/11]"
                  />

                  <div className="mt-3 px-3 py-2 flex items-center justify-between text-xs text-stone-500">
                    <span className="font-medium text-stone-700">Actual RoomRevive Transformation</span>
                    <span>Preserved: Desk & Bed Frame</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE SIMPLE STEPS */}
      <section id="how-it-works-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#355E4C]">
            <span>Effortless Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#222120] tracking-tight">
            Three simple steps to your dream space
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            No expensive consultation fees or weeks of waiting. Get an architect-grade redesign in under 60 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white p-8 rounded-2xl border border-black/[0.06] shadow-sm hover:shadow-md transition-shadow relative space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-serif font-bold text-[#355E4C]/30 tabular-nums">
                01
              </span>
              <div className="w-10 h-10 rounded-xl bg-[#EAEFEA] flex items-center justify-center text-[#355E4C]">
                <UploadCloud className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-xl font-serif font-bold text-[#222120]">
              Upload
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Upload a photo of your room. AI instantly detects furniture, room dimensions, natural light, and layout constraints.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-8 rounded-2xl border border-black/[0.06] shadow-sm hover:shadow-md transition-shadow relative space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-serif font-bold text-[#355E4C]/30 tabular-nums">
                02
              </span>
              <div className="w-10 h-10 rounded-xl bg-[#F6ECE7] flex items-center justify-center text-[#B85D38]">
                <Sliders className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-xl font-serif font-bold text-[#222120]">
              Personalize
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Choose your style, budget, colors, and furniture to keep. Whether student budget or luxury upgrade, it tailors to you.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-8 rounded-2xl border border-black/[0.06] shadow-sm hover:shadow-md transition-shadow relative space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-serif font-bold text-[#355E4C]/30 tabular-nums">
                03
              </span>
              <div className="w-10 h-10 rounded-xl bg-[#EAEFEA] flex items-center justify-center text-[#355E4C]">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-xl font-serif font-bold text-[#222120]">
              Revive
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              AI creates a personalized redesign, interactive Before/After comparison, itemized shopping budget, and 7-day plan.
            </p>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT PILLARS & DISCIPLINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#222120] text-stone-200 rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#355E4C]/20 rounded-full blur-3xl -z-0 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#88B29C]">
                Why RoomRevive Feels Different
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                Designed for real apartments and realistic budgets.
              </h2>
              <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
                Most AI tools replace everything with fake luxury renders that cost lakhs. RoomRevive works with your actual existing bed, desk, and wardrobe.
              </p>
              <div className="pt-2">
                <button
                  onClick={onStartUpload}
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#222120] bg-[#FAF9F5] rounded-xl hover:bg-white active:scale-95 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-[#355E4C]" />
                  <span>Start Your Redesign</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-3">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-[#88B29C]">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <h4 className="text-base font-semibold text-white">Preserves What You Keep</h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Select your existing desk, bed, or wardrobe. The AI incorporates them into the layout instead of replacing them.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-3">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-[#88B29C]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-base font-semibold text-white">Adaptive Budget Engine</h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Set a budget from ₹5,000 to ₹1,00,000+. Get itemized recommendations tailored to what you actually want to spend.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-3">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-[#88B29C]">
                  <Palette className="w-4 h-4" />
                </div>
                <h4 className="text-base font-semibold text-white">Architectural Color Theory</h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Detailed palettes with specific 60-30-10 distribution, exact hex codes, and wall vs textile recommendations.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-3">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-[#88B29C]">
                  <Layers className="w-4 h-4" />
                </div>
                <h4 className="text-base font-semibold text-white">Actionable 7-Day Plan</h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  A day-by-day practical checklist from decluttering to final lighting and textile styling so you never feel overwhelmed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GALLERY PREVIEW TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#355E4C]">
              Inspiration Catalog
            </div>
            <h2 className="text-3xl font-serif font-bold text-[#222120] tracking-tight mt-1">
              Recent Room Transformations
            </h2>
          </div>
          <button
            onClick={onExploreGallery}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#355E4C] hover:text-[#2A4B3D] transition-colors"
          >
            <span>Browse All Gallery Styles</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="group bg-white rounded-2xl overflow-hidden border border-black/[0.06] shadow-sm hover:shadow-md transition-all">
            <div className="aspect-[4/3] overflow-hidden bg-stone-100">
              <img
                src={RoomImages.galleryLiving}
                alt="Scandinavian Living Room Makeover"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-5 space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span>Living Room</span>
                <span className="font-mono tabular-nums">Budget ₹25,000</span>
              </div>
              <h3 className="text-lg font-serif font-bold text-[#222120]">
                Nordic Scandinavian Living
              </h3>
              <p className="text-xs text-stone-600 line-clamp-2">
                Warm morning light, bouclé textures, low oak coffee table, and soft pampas grass accents.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group bg-white rounded-2xl overflow-hidden border border-black/[0.06] shadow-sm hover:shadow-md transition-all">
            <div className="aspect-[4/3] overflow-hidden bg-stone-100">
              <img
                src={RoomImages.galleryStudy}
                alt="Minimalist Study Room Makeover"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-5 space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span>Study & Office</span>
                <span className="font-mono tabular-nums">Budget ₹15,000</span>
              </div>
              <h3 className="text-lg font-serif font-bold text-[#222120]">
                Minimalist Productivity Nook
              </h3>
              <p className="text-xs text-stone-600 line-clamp-2">
                Walnut floating desk, warm brass task lighting, acoustic slat accent wall, and clutter-free workspace.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group bg-white rounded-2xl overflow-hidden border border-black/[0.06] shadow-sm hover:shadow-md transition-all">
            <div className="aspect-[4/3] overflow-hidden bg-stone-100">
              <img
                src={RoomImages.galleryGaming}
                alt="Cozy Gaming & Studio Room"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-5 space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span>Gaming & Media</span>
                <span className="font-mono tabular-nums">Budget ₹30,000</span>
              </div>
              <h3 className="text-lg font-serif font-bold text-[#222120]">
                Cozy Modern Creative Studio
              </h3>
              <p className="text-xs text-stone-600 line-clamp-2">
                Warm amber backlighting, acoustic felt panels, ergonomic chair, and mature ambient lighting without harsh neon.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FINAL INVITATION */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6 pt-6">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#222120] tracking-tight">
          Ready to see your room revived?
        </h2>
        <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto">
          Upload any photo of your room. In under a minute, get a full architectural redesign tailored to your exact budget.
        </p>
        <div>
          <button
            onClick={onStartUpload}
            className="inline-flex items-center gap-2.5 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white bg-[#355E4C] rounded-xl hover:bg-[#2A4B3D] active:scale-95 transition-all shadow-md"
          >
            <Sparkles className="w-4 h-4 text-[#E2EBE4]" />
            <span>Revive My Room Now</span>
          </button>
        </div>
      </section>
    </div>
  );
};
