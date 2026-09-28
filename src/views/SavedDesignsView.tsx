import React, { useState, useEffect } from 'react';
import { Bookmark, Trash2, ExternalLink, Sparkles, ArrowRight, Calendar, IndianRupee } from 'lucide-react';
import { ReviveResult } from '../types';
import { getSavedDesigns, deleteDesign } from '../services/storage';
import { useToast } from '../components/Toast';
import { RoomImages } from '../assets/images';

interface SavedDesignsViewProps {
  onOpenDesign: (design: ReviveResult) => void;
  onStartNew: () => void;
}

export const SavedDesignsView: React.FC<SavedDesignsViewProps> = ({
  onOpenDesign,
  onStartNew,
}) => {
  const [designs, setDesigns] = useState<ReviveResult[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    setDesigns(getSavedDesigns());
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteDesign(id);
    setDesigns((prev) => prev.filter((d) => d.id !== id));
    showToast('Design deleted from saved list', 'info');
  };

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return 'Recently';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/[0.06] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#355E4C]">
            <Bookmark className="w-3.5 h-3.5" />
            <span>Local Portfolio</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#222120] tracking-tight mt-1">
            My Saved Designs
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            Designs and 7-day makeover plans stored in your browser.
          </p>
        </div>

        <button
          onClick={onStartNew}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#355E4C] rounded-xl hover:bg-[#2A4B3D] transition-all shadow-xs"
        >
          <Sparkles className="w-4 h-4 text-[#E2EBE4]" />
          <span>New Makeover</span>
        </button>
      </div>

      {/* Grid of Saved Designs */}
      {designs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {designs.map((design) => {
            const previewImg =
              design.redesignedImageUrl ||
              design.originalImageUrl ||
              RoomImages.heroAfter;

            return (
              <div
                key={design.id}
                onClick={() => onOpenDesign(design)}
                className="group bg-white rounded-3xl overflow-hidden border border-black/[0.08] shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden bg-stone-100 relative">
                    <img
                      src={previewImg}
                      alt={design.designName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-[#222120]/80 backdrop-blur-sm px-2.5 py-1 rounded-md text-[11px] font-semibold text-white uppercase tracking-wider">
                      {design.style}
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="text-base font-serif font-bold text-[#222120] group-hover:text-[#355E4C] transition-colors truncate">
                      {design.designName}
                    </h3>

                    <div className="flex items-center justify-between text-xs text-stone-500">
                      <span>{design.roomType}</span>
                      <span className="font-mono tabular-nums font-semibold text-[#355E4C]">
                        ₹{design.estimatedTotal?.toLocaleString() || design.budget?.toLocaleString()}
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {design.explanation}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-stone-100 flex items-center justify-between mt-2">
                  <span className="text-[11px] text-stone-400">
                    Saved {formatDate(design.createdAt)}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => handleDelete(design.id, e)}
                      className="p-2 text-stone-400 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete saved design"
                      aria-label="Delete saved design"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onOpenDesign(design)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#355E4C] bg-[#EAEFEA] hover:bg-[#355E4C] hover:text-white rounded-lg transition-colors"
                    >
                      <span>Open</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-black/[0.06] p-8 space-y-4 max-w-lg mx-auto">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#EAEFEA] text-[#355E4C] flex items-center justify-center">
            <Bookmark className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-serif font-bold text-[#222120]">
              No saved designs yet
            </h3>
            <p className="text-xs sm:text-sm text-stone-500">
              When you revive a room, click "Save Design" to keep your makeover plan and budget accessible anytime.
            </p>
          </div>
          <div>
            <button
              onClick={onStartNew}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#355E4C] rounded-xl hover:bg-[#2A4B3D] transition-all shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-[#E2EBE4]" />
              <span>Create Your First Design</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
