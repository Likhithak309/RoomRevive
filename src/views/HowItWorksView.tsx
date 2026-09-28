import React from 'react';
import { Sparkles, UploadCloud, Sliders, CheckCircle, ShieldCheck, Palette, Layers, HelpCircle, ArrowRight } from 'lucide-react';

interface HowItWorksViewProps {
  onStartUpload: () => void;
}

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({ onStartUpload }) => {
  const faqs = [
    {
      q: 'Do I have to buy all new furniture?',
      a: 'Never! RoomRevive is explicitly engineered to preserve your existing bed, desk, wardrobe, or favorite pieces. Our AI integrates them into the new layout and suggests complementary accessories, lighting, and textiles.',
    },
    {
      q: 'Can I use this if I am renting and cannot paint walls?',
      a: 'Yes! In the personalization step, you can select goals like "Make it cozier" or "Improve lighting" and prioritize non-invasive upgrades: peel-and-stick art, layered rugs, warm lamps, and vertical freestanding storage.',
    },
    {
      q: 'How accurate are the budget estimates?',
      a: 'Our AI calculates approximate cost breakdowns based on common retail and e-commerce decor rates in India (₹ INR). They serve as practical planning envelopes so you know where to spend versus save.',
    },
    {
      q: 'What kind of photo works best?',
      a: 'A wide-angle horizontal shot taken during daytime with natural window light. Stand in the corner of your room to capture the bed/desk, walls, and main walking pathway.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 animate-in fade-in duration-200">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#355E4C]">
          <span>Behind The Platform</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#222120] tracking-tight">
          How RoomRevive Works
        </h1>
        <p className="text-sm sm:text-base text-stone-600">
          The science and design architecture behind turning an ordinary room photo into a customized interior makeover.
        </p>
      </div>

      {/* The 5-Stage Transformation Architecture */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif font-bold text-[#222120] text-center">
          The RoomRevive Transformation Pipeline
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-black/[0.06] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#EAEFEA] text-[#355E4C] flex items-center justify-center font-serif font-bold text-lg">
              1
            </div>
            <h3 className="text-base font-serif font-bold text-[#222120]">Vision Diagnostics</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Gemini vision analyzes natural light angles, current ceiling fixtures, surface clutter dispersion, and room proportions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-black/[0.06] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#F6ECE7] text-[#B85D38] flex items-center justify-center font-serif font-bold text-lg">
              2
            </div>
            <h3 className="text-base font-serif font-bold text-[#222120]">Preservation Constraints</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              We lock in your chosen kept furniture pieces (bed, desk, wardrobe) so the AI never wastes money replacing what you already own.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-black/[0.06] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FAF1D6] text-[#A67C1E] flex items-center justify-center font-serif font-bold text-lg">
              3
            </div>
            <h3 className="text-base font-serif font-bold text-[#222120]">Adaptive Budgeting</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Algorithms allocate your chosen budget across lighting, textiles, wall accents, and functional storage for maximum visual impact.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-black/[0.06] shadow-sm space-y-8">
        <div className="space-y-1">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#355E4C]">
            Frequently Asked Questions
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#222120] tracking-tight">
            Everything you need to know
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqs.map((faq, idx) => (
            <div key={idx} className="space-y-2">
              <h4 className="text-sm font-semibold text-stone-900 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-[#355E4C] shrink-0 mt-0.5" />
                <span>{faq.q}</span>
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="text-center pt-4">
        <button
          onClick={onStartUpload}
          className="inline-flex items-center gap-2.5 px-8 py-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#355E4C] rounded-xl hover:bg-[#2A4B3D] transition-all shadow-md active:scale-95"
        >
          <Sparkles className="w-4 h-4 text-[#E2EBE4]" />
          <span>Upload Room & Experience It</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
