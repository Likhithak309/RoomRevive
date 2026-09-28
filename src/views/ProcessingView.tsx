import React, { useState, useEffect } from 'react';
import { Sparkles, Check, Loader2 } from 'lucide-react';
import { DesignStyle, RoomType } from '../types';

interface ProcessingViewProps {
  roomType: RoomType;
  style: DesignStyle;
  budget: number;
}

export const ProcessingView: React.FC<ProcessingViewProps> = ({
  roomType,
  style,
  budget,
}) => {
  const steps = [
    { id: 1, label: 'Detecting furniture & key pieces' },
    { id: 2, label: 'Understanding room layout & focal sightlines' },
    { id: 3, label: 'Identifying lighting conditions & natural shadows' },
    { id: 4, label: `Applying ${style} architectural aesthetic & color harmony` },
    { id: 5, label: `Optimizing itemized decor within ₹${budget.toLocaleString()} budget` },
    { id: 6, label: 'Creating your personalized 7-day makeover plan' },
  ];

  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    // Advance steps periodically
    const intervals = [1200, 1400, 1500, 1800, 1600, 2000];
    let current = 0;

    const timer = setInterval(() => {
      if (current < steps.length - 1) {
        current += 1;
        setActiveStepIndex(current);
      }
    }, intervals[activeStepIndex] || 1500);

    return () => clearInterval(timer);
  }, [activeStepIndex, steps.length]);

  const progressPercentage = Math.round(((activeStepIndex + 1) / steps.length) * 100);

  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-8 animate-in fade-in duration-300">
      {/* Visual pulse icon */}
      <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
        <div className="absolute inset-0 bg-[#355E4C]/15 rounded-3xl animate-ping opacity-75" />
        <div className="relative w-20 h-20 bg-[#355E4C] text-white rounded-3xl flex items-center justify-center shadow-lg">
          <Sparkles className="w-10 h-10 text-[#E2EBE4]" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#222120] tracking-tight">
          Reviving Your {roomType}...
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto">
          Gemini is analyzing your space to generate a custom {style} interior transformation.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-[#355E4C] h-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Steps List */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.06] shadow-sm text-left space-y-4">
        {steps.map((step, idx) => {
          const isDone = idx < activeStepIndex;
          const isCurrent = idx === activeStepIndex;
          const isPending = idx > activeStepIndex;

          return (
            <div
              key={step.id}
              className={`flex items-center gap-3 transition-opacity duration-300 ${
                isPending ? 'opacity-40' : 'opacity-100'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs transition-colors ${
                  isDone
                    ? 'bg-[#355E4C] text-white'
                    : isCurrent
                    ? 'bg-[#EAEFEA] text-[#355E4C] ring-2 ring-[#355E4C]/20'
                    : 'bg-stone-100 text-stone-400'
                }`}
              >
                {isDone ? (
                  <Check className="w-3.5 h-3.5" />
                ) : isCurrent ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <span>{step.id}</span>
                )}
              </div>

              <span
                className={`text-xs ${
                  isCurrent
                    ? 'font-semibold text-stone-900'
                    : isDone
                    ? 'text-stone-700'
                    : 'text-stone-400'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="text-[11px] text-stone-500">
        Takes about 5–15 seconds · Synthesizing interior layout, lighting warmth, and materials
      </div>
    </div>
  );
};
