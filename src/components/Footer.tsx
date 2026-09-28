import React from 'react';
import { Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#222120] text-stone-300 border-t border-black/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#355E4C] flex items-center justify-center text-white">
                <Sparkles className="w-3.5 h-3.5 text-[#E2EBE4]" />
              </div>
              <span className="text-xl font-serif font-bold text-white tracking-tight">
                RoomRevive
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              AI-powered interior redesigns tailored to your style, preserved furniture, and budget. Design smarter. Spend better. Live better.
            </p>
          </div>

          {/* Experience Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-stone-200 uppercase tracking-wider">
              Experience
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('upload')}
                  className="hover:text-white transition-colors"
                >
                  Revive My Room
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-white transition-colors"
                >
                  Design Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('how-it-works')}
                  className="hover:text-white transition-colors"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('saved')}
                  className="hover:text-white transition-colors"
                >
                  My Saved Designs
                </button>
              </li>
            </ul>
          </div>

          {/* Design Aesthetics */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-stone-200 uppercase tracking-wider">
              Popular Styles
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>Japandi & Warm Minimal</li>
              <li>Nordic Scandinavian</li>
              <li>Cozy Contemporary</li>
              <li>Modern Industrial</li>
              <li>Earthy Bohemian</li>
            </ul>
          </div>

          {/* Transparency & AI Note */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-stone-200 uppercase tracking-wider">
              Design Guidelines
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              RoomRevive provides intelligent AI design proposals and cost estimates based on visual room analysis. Estimates are non-contractual approximations intended to guide real-world shopping and DIY execution.
            </p>
          </div>
        </div>

        {/* Bottom hairline & copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            © {new Date().getFullYear()} RoomRevive. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Crafted for renters, students, and homeowners</span>
            <span aria-hidden="true">·</span>
            <span>Powered by Gemini</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
