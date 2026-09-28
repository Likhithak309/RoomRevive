import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Maximize2, Sparkles, SlidersHorizontal, Eye } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  aspectRatio?: string;
  onFullscreen?: () => void;
  className?: string;
  isConcept?: boolean;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Original Room',
  afterLabel = 'Revived Room',
  aspectRatio = 'aspect-[16/10]',
  onFullscreen,
  className = '',
  isConcept = false,
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(position);
    },
    []
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging || !e.touches[0]) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    handleMove(e.clientX);
  };

  return (
    <div className={`relative select-none overflow-hidden rounded-2xl bg-stone-100 shadow-sm border border-black/[0.08] ${className}`}>
      <div
        ref={containerRef}
        onClick={handleContainerClick}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
        className={`relative w-full ${aspectRatio} cursor-ew-resize overflow-hidden`}
      >
        {/* AFTER IMAGE (Underneath, full container) */}
        <img
          src={afterImage}
          alt="Revived room redesign"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* BEFORE IMAGE (Clipped overlay) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt="Original room before makeover"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover max-w-none"
            style={{
              width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
              height: containerRef.current ? `${containerRef.current.clientHeight}px` : '100%',
            }}
          />
        </div>

        {/* SLIDER DIVIDER LINE & HANDLE */}
        <div
          className="absolute inset-y-0 pointer-events-none flex items-center justify-center"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Vertical hairline */}
          <div className="w-[2px] h-full bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)]" />

          {/* Draggable Circle Handle */}
          <div
            className={`absolute w-10 h-10 -ml-5 rounded-full bg-white text-[#222120] shadow-md border border-black/10 flex items-center justify-center transition-transform duration-100 ${
              isDragging ? 'scale-110 shadow-lg' : 'hover:scale-105'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4 text-stone-700 rotate-90" />
          </div>
        </div>

        {/* CLEAN UNBOXED TEXT LABELS WITH MEASURED SCRIM */}
        <div className="absolute top-4 left-4 pointer-events-none">
          <div className="bg-[#222120]/75 backdrop-blur-sm px-3 py-1 rounded-md text-[11px] font-semibold text-stone-200 uppercase tracking-wider">
            {beforeLabel}
          </div>
        </div>

        <div className="absolute top-4 right-4 pointer-events-none">
          <div className="bg-[#355E4C]/85 backdrop-blur-sm px-3 py-1 rounded-md text-[11px] font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#E2EBE4]" />
            <span>{afterLabel}</span>
          </div>
        </div>

        {/* CONCEPT NOTICE IF FALLBACK CONCEPT MODE */}
        {isConcept && (
          <div className="absolute bottom-4 left-4 right-16 pointer-events-none">
            <div className="inline-flex items-center gap-2 bg-[#222120]/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs text-stone-200">
              <Eye className="w-3.5 h-3.5 text-[#88B29C]" />
              <span>AI Design Concept Preview · See full makeover recommendations below</span>
            </div>
          </div>
        )}

        {/* FULLSCREEN BUTTON */}
        {onFullscreen && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFullscreen();
            }}
            className="absolute bottom-4 right-4 p-2 rounded-xl bg-[#222120]/75 backdrop-blur-sm text-stone-200 hover:text-white hover:bg-[#222120] transition-colors focus:outline-none"
            title="View Fullscreen"
            aria-label="View Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* BOTTOM HINT CONTROLS */}
      <div className="px-4 py-2.5 bg-[#FAF9F5] border-t border-black/[0.06] flex items-center justify-between text-xs text-stone-500">
        <span className="flex items-center gap-2">
          <span>Drag slider or tap anywhere to compare Before & After</span>
        </span>
        <span className="font-mono tabular-nums text-stone-600">
          {Math.round(sliderPosition)}% Original
        </span>
      </div>
    </div>
  );
};
