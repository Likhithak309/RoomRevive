import React, { useState } from 'react';
import { X, SlidersHorizontal, Columns, Sparkles } from 'lucide-react';
import { BeforeAfterSlider } from './BeforeAfterSlider';

interface FullscreenModalProps {
  isOpen: boolean;
  onClose: () => void;
  beforeImage: string;
  afterImage: string;
  designTitle: string;
  styleName: string;
}

export const FullscreenModal: React.FC<FullscreenModalProps> = ({
  isOpen,
  onClose,
  beforeImage,
  afterImage,
  designTitle,
  styleName,
}) => {
  const [viewMode, setViewMode] = useState<'slider' | 'side-by-side'>('slider');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#141413]/95 backdrop-blur-lg flex flex-col p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10 text-white">
        <div>
          <h3 className="text-lg font-serif font-bold text-[#FAF9F5]">{designTitle}</h3>
          <p className="text-xs text-stone-400">
            {styleName} Style Transformation · High-Resolution Comparison
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View mode toggle */}
          <div className="hidden sm:flex items-center p-1 bg-white/10 rounded-lg">
            <button
              onClick={() => setViewMode('slider')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                viewMode === 'slider' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-300 hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Slider</span>
            </button>
            <button
              onClick={() => setViewMode('side-by-side')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                viewMode === 'side-by-side' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-300 hover:text-white'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Side by Side</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-6">
        {viewMode === 'slider' ? (
          <div className="w-full max-w-5xl">
            <BeforeAfterSlider
              beforeImage={beforeImage}
              afterImage={afterImage}
              aspectRatio="aspect-[16/9]"
              className="max-h-[75vh]"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl">
            <div className="space-y-2">
              <span className="text-xs font-medium text-stone-400 uppercase tracking-wider block">
                Original Space
              </span>
              <div className="rounded-xl overflow-hidden bg-stone-900 border border-white/10 aspect-[16/10]">
                <img
                  src={beforeImage}
                  alt="Original room"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-medium text-[#88B29C] uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Revived Transformation
              </span>
              <div className="rounded-xl overflow-hidden bg-stone-900 border border-white/10 aspect-[16/10]">
                <img
                  src={afterImage}
                  alt="Revived room"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="pt-2 text-center text-xs text-stone-400">
        Press Esc or click the close icon to return to design details
      </div>
    </div>
  );
};
