import React, { useState } from 'react';
import {
  Sparkles,
  Bookmark,
  BookmarkCheck,
  RefreshCw,
  Maximize2,
  Palette,
  Lightbulb,
  Flower2,
  Armchair,
  Package,
  Calendar,
  IndianRupee,
  CheckCircle2,
  AlertCircle,
  Share2,
  Download,
  Info,
  Check,
} from 'lucide-react';
import { ReviveResult, DesignStyle } from '../types';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { FullscreenModal } from '../components/FullscreenModal';
import { RoomImages } from '../assets/images';
import { saveDesign, isDesignSaved, deleteDesign } from '../services/storage';
import { useToast } from '../components/Toast';

interface ResultsViewProps {
  result: ReviveResult;
  onRedesignAnother: () => void;
  onTryAlternativeStyle: (styleName: DesignStyle) => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  result,
  onRedesignAnother,
  onTryAlternativeStyle,
}) => {
  const { showToast } = useToast();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [saved, setSaved] = useState<boolean>(() => isDesignSaved(result.id));
  const [completedDays, setCompletedDays] = useState<Record<number, boolean>>({});

  // Pick the best visual display for the After image
  // If the server generated a custom base64 image, use that.
  // Otherwise, use our high-fidelity generated architectural photo matching the space & style
  const afterImageDisplay =
    result.redesignedImageUrl ||
    (result.roomType === 'Study Room'
      ? RoomImages.galleryStudy
      : result.roomType === 'Gaming Room'
      ? RoomImages.galleryGaming
      : result.roomType === 'Living Room'
      ? RoomImages.galleryLiving
      : RoomImages.heroAfter);

  const beforeImageDisplay = result.originalImageUrl || RoomImages.heroBefore;

  const handleSaveToggle = () => {
    if (saved) {
      deleteDesign(result.id);
      setSaved(false);
      showToast('Removed from My Designs', 'info');
    } else {
      saveDesign(result);
      setSaved(true);
      showToast('Saved to My Designs!', 'success');
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `RoomRevive: ${result.designName}`,
          text: `Check out my ${result.style} room redesign plan on RoomRevive!`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        showToast('Link copied to clipboard!', 'success');
      }
    } catch {
      // User cancelled or clipboard not supported
    }
  };

  const toggleDayComplete = (day: number) => {
    setCompletedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  // Calculate budget breakdown stats
  const totalAllocated = result.budgetBreakdown.reduce((sum, item) => sum + item.cost, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-in fade-in duration-300">
      {/* 1. TOP HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/[0.06] pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#355E4C]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Transformation Ready</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#222120] tracking-tight">
            ✨ Your Room, Revived
          </h1>
          <p className="text-sm sm:text-base text-stone-600">
            A personalized redesign created for your space, furniture, and budget.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleSaveToggle}
            className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl border transition-all ${
              saved
                ? 'bg-[#355E4C] border-[#355E4C] text-white'
                : 'bg-white border-stone-300 text-stone-700 hover:border-stone-400'
            }`}
          >
            {saved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            <span>{saved ? 'Saved' : 'Save Design'}</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-stone-700 bg-white border border-stone-300 hover:border-stone-400 rounded-xl transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>

          <button
            onClick={onRedesignAnother}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#355E4C] hover:bg-[#2A4B3D] rounded-xl transition-all shadow-xs"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Generate Another</span>
          </button>
        </div>
      </div>

      {/* 2. BEFORE / AFTER COMPARISON MODULE */}
      <section className="space-y-3">
        <div className="bg-white p-3 sm:p-4 rounded-3xl border border-black/[0.08] shadow-md">
          <BeforeAfterSlider
            beforeImage={beforeImageDisplay}
            afterImage={afterImageDisplay}
            beforeLabel="Original Room"
            afterLabel={`${result.style} Revival`}
            aspectRatio="aspect-[16/10]"
            onFullscreen={() => setIsFullscreen(true)}
            isConcept={result.isConceptVisualization}
          />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-stone-500 px-2 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#355E4C]" />
            <span>Interactive comparison · Click or drag slider to explore</span>
          </div>
          <button
            onClick={() => setIsFullscreen(true)}
            className="inline-flex items-center gap-1.5 text-stone-700 hover:text-stone-900 font-medium transition-colors"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Expand Fullscreen</span>
          </button>
        </div>
      </section>

      {/* 3. DESIGN SUMMARY METRICS & EXPLANATION */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.06] shadow-sm space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-stone-200/80">
          <div>
            <div className="text-xs text-stone-500">Design Style</div>
            <div className="text-base sm:text-lg font-serif font-bold text-[#222120] mt-0.5">
              {result.style}
            </div>
          </div>
          <div>
            <div className="text-xs text-stone-500">Target Budget</div>
            <div className="text-base sm:text-lg font-serif font-bold text-[#222120] mt-0.5 tabular-nums">
              ₹{result.budget.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-xs text-stone-500">Estimated Makeover</div>
            <div className="text-base sm:text-lg font-serif font-bold text-[#355E4C] mt-0.5 tabular-nums">
              ₹{result.estimatedTotal.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-xs text-stone-500">Space Optimization</div>
            <div className="text-base sm:text-lg font-serif font-bold text-[#222120] mt-0.5">
              {result.spaceOptimization || 'High'}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-500">
            Architectural Design Summary
          </h3>
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
            "{result.explanation}"
          </p>
        </div>

        {/* Room Observations */}
        {result.detectedRoomAnalysis && (
          <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-stone-200/80 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#355E4C]">
              <Info className="w-3.5 h-3.5" />
              <span>Room Analysis Insights</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-stone-600">
              <div>
                <span className="font-semibold text-stone-800">Preserved Pieces:</span>
                <p className="mt-0.5">
                  {result.detectedRoomAnalysis.furniture?.join(', ') || 'Bed, Desk'}
                </p>
              </div>
              <div>
                <span className="font-semibold text-stone-800">Spatial Layout:</span>
                <p className="mt-0.5">{result.detectedRoomAnalysis.layout}</p>
              </div>
              <div>
                <span className="font-semibold text-stone-800">Lighting Diagnostics:</span>
                <p className="mt-0.5">{result.detectedRoomAnalysis.lighting}</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 4. AI RECOMMENDATIONS (WHAT CHANGED) */}
      <section className="space-y-6">
        <div className="space-y-1">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#355E4C]">
            Design Breakdown
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#222120] tracking-tight">
            What Changed
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Key physical and sensory upgrades tailored to this space:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: COLOR */}
          <div className="bg-white p-6 rounded-3xl border border-black/[0.06] shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F6ECE7] text-[#B85D38] flex items-center justify-center">
                <Palette className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-serif font-bold text-[#222120]">Color & Wall Tones</h3>
                <span className="text-[11px] text-stone-500">{result.recommendations.color.title}</span>
              </div>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              {result.recommendations.color.description}
            </p>
            {result.recommendations.color.palette && (
              <div className="space-y-2 pt-2 border-t border-stone-100">
                <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
                  Curated Palette
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {result.recommendations.color.palette.map((swatch, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-1.5 rounded-lg bg-stone-50 text-[11px]">
                      <div
                        className="w-4 h-4 rounded-md border border-black/10 shrink-0"
                        style={{ backgroundColor: swatch.hex }}
                      />
                      <div className="truncate">
                        <span className="font-medium text-stone-800 block truncate">{swatch.name}</span>
                        <span className="text-stone-600 font-mono text-[10px]">{swatch.hex}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Card 2: LIGHTING */}
          <div className="bg-white p-6 rounded-3xl border border-black/[0.06] shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF1D6] text-[#A67C1E] flex items-center justify-center">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-serif font-bold text-[#222120]">Lighting Architecture</h3>
                <span className="text-[11px] text-stone-500">{result.recommendations.lighting.title}</span>
              </div>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              {result.recommendations.lighting.description}
            </p>
            {result.recommendations.lighting.fixtures && (
              <ul className="space-y-1.5 pt-2 border-t border-stone-100 text-xs text-stone-700">
                {result.recommendations.lighting.fixtures.map((fixture, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A67C1E] mt-1.5 shrink-0" />
                    <span>{fixture}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Card 3: DECOR & TEXTILES */}
          <div className="bg-white p-6 rounded-3xl border border-black/[0.06] shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EAEFEA] text-[#355E4C] flex items-center justify-center">
                <Flower2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-serif font-bold text-[#222120]">Decor & Living Accents</h3>
                <span className="text-[11px] text-stone-500">{result.recommendations.decor.title}</span>
              </div>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              {result.recommendations.decor.description}
            </p>
            {result.recommendations.decor.items && (
              <ul className="space-y-1.5 pt-2 border-t border-stone-100 text-xs text-stone-700">
                {result.recommendations.decor.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#355E4C] mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Card 4: FURNITURE */}
          <div className="bg-white p-6 rounded-3xl border border-black/[0.06] shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center">
                <Armchair className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-serif font-bold text-[#222120]">Furniture Realignment</h3>
                <span className="text-[11px] text-stone-500">{result.recommendations.furniture.title}</span>
              </div>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              {result.recommendations.furniture.description}
            </p>
            {result.recommendations.furniture.retainedPlacement && (
              <div className="p-3 bg-stone-50 rounded-xl text-xs text-stone-700">
                <span className="font-semibold text-stone-900 block mb-0.5">Kept Furniture Placement:</span>
                {result.recommendations.furniture.retainedPlacement}
              </div>
            )}
          </div>

          {/* Card 5: STORAGE & CLUTTER */}
          <div className="bg-white p-6 rounded-3xl border border-black/[0.06] shadow-sm space-y-4 md:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E8F0F2] text-[#2C6975] flex items-center justify-center">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-serif font-bold text-[#222120]">Clutter Reduction & Storage</h3>
                <span className="text-[11px] text-stone-500">{result.recommendations.storage.title}</span>
              </div>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              {result.recommendations.storage.description}
            </p>
            {result.recommendations.storage.tips && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-stone-100">
                {result.recommendations.storage.tips.map((tip, idx) => (
                  <div key={idx} className="p-3 bg-stone-50 rounded-xl text-xs text-stone-700">
                    <span className="font-semibold text-stone-900 block mb-1">Tip {idx + 1}</span>
                    {tip}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. BUDGET BREAKDOWN CARD & CHART */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.06] shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/80 pb-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#355E4C]">
              Itemized Allocation
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#222120] tracking-tight mt-0.5">
              Estimated Budget Breakdown
            </h2>
            <p className="text-xs text-stone-500">
              Allocated smartly to make the highest visual impact within ₹{result.budget.toLocaleString()}
            </p>
          </div>

          <div className="text-left sm:text-right">
            <div className="text-xs text-stone-500">Total Makeover Estimate</div>
            <div className="text-3xl font-serif font-bold text-[#355E4C] tabular-nums">
              ₹{totalAllocated.toLocaleString()}
            </div>
            <div className="text-[11px] text-stone-600">
              (₹{(result.budget - totalAllocated).toLocaleString()} cushion reserved)
            </div>
          </div>
        </div>

        {/* Visual Budget Ratio Bar */}
        <div className="space-y-2">
          <div className="h-3 w-full bg-stone-100 rounded-full overflow-hidden flex">
            {result.budgetBreakdown.map((item, idx) => {
              const percentage = Math.max(5, (item.cost / totalAllocated) * 100);
              const colors = ['bg-[#355E4C]', 'bg-[#B85D38]', 'bg-[#A67C1E]', 'bg-[#2C6975]', 'bg-[#6B5B95]', 'bg-[#88B29C]'];
              return (
                <div
                  key={idx}
                  style={{ width: `${percentage}%` }}
                  className={`${colors[idx % colors.length]} h-full transition-all`}
                  title={`${item.item}: ₹${item.cost.toLocaleString()}`}
                />
              );
            })}
          </div>
        </div>

        {/* Itemized Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-200 text-stone-500 font-semibold uppercase tracking-wider">
                <th className="py-3 px-2">Item</th>
                <th className="py-3 px-2">Category</th>
                <th className="py-3 px-2 text-right">Estimated Cost</th>
                <th className="py-3 px-2">Practical Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {result.budgetBreakdown.map((b, idx) => (
                <tr key={idx} className="hover:bg-stone-50/50">
                  <td className="py-3.5 px-2 font-semibold text-stone-800">{b.item}</td>
                  <td className="py-3.5 px-2 text-stone-600">{b.category}</td>
                  <td className="py-3.5 px-2 font-mono tabular-nums text-right font-semibold text-[#355E4C]">
                    ₹{b.cost.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-2 text-stone-500">{b.note}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-stone-300 font-semibold text-stone-900">
                <td className="py-4 px-2 text-sm" colSpan={2}>
                  Total Estimated Investment
                </td>
                <td className="py-4 px-2 font-mono tabular-nums text-right text-base text-[#355E4C]">
                  ₹{totalAllocated.toLocaleString()}
                </td>
                <td className="py-4 px-2 text-[11px] text-stone-500">
                  Approximately {Math.round((totalAllocated / result.budget) * 100)}% of target budget
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="bg-[#FAF9F5] p-3.5 rounded-xl border border-stone-200/60 flex items-start gap-2.5 text-xs text-stone-500">
          <AlertCircle className="w-4 h-4 text-stone-400 mt-0.5 shrink-0" />
          <span>
            <strong>Disclaimer:</strong> Prices are AI-generated market estimates based on typical retail and online decor rates, not guaranteed price quotes. Specific vendor costs may vary.
          </span>
        </div>
      </section>

      {/* 6. MAKEOVER PLAN (YOUR 7-DAY PLAN) */}
      <section className="space-y-6">
        <div className="space-y-1">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#355E4C]">
            Step-by-Step Roadmap
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#222120] tracking-tight">
            Your 7-Day RoomRevive Plan
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            A balanced daily sequence so you can complete the makeover without stress:
          </p>
        </div>

        <div className="space-y-3">
          {result.makeoverPlan.map((step) => {
            const isCompleted = Boolean(completedDays[step.day]);
            return (
              <div
                key={step.day}
                onClick={() => toggleDayComplete(step.day)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isCompleted
                    ? 'bg-[#EAEFEA]/40 border-[#355E4C]/30 text-stone-600'
                    : 'bg-white border-black/[0.06] hover:border-stone-300 shadow-xs'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold transition-colors ${
                      isCompleted
                        ? 'bg-[#355E4C] text-white'
                        : 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : `D${step.day}`}
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm font-serif font-bold ${
                          isCompleted ? 'line-through text-stone-500' : 'text-[#222120]'
                        }`}
                      >
                        Day {step.day} — {step.title}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center text-xs">
                  <span className="text-stone-500 font-mono">
                    ~{step.timeCommitment}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-md border flex items-center justify-center transition-colors ${
                      isCompleted
                        ? 'bg-[#355E4C] border-[#355E4C] text-white'
                        : 'border-stone-300 bg-white'
                    }`}
                  >
                    {isCompleted && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. DESIGN ALTERNATIVES */}
      {result.alternativeStyles && result.alternativeStyles.length > 0 && (
        <section className="bg-[#FAF9F5] rounded-3xl p-6 sm:p-8 border border-black/[0.06] space-y-6">
          <div className="space-y-1">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#355E4C]">
              Want to explore?
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#222120] tracking-tight">
              Alternative Aesthetics For This Space
            </h2>
            <p className="text-xs text-stone-600">
              Click any style below to quickly regenerate your makeover plan in a different design language:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {result.alternativeStyles.map((alt) => (
              <div
                key={alt.styleId}
                className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-[#355E4C] transition-all"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-serif font-bold text-[#222120]">
                      {alt.name}
                    </span>
                    <span className="text-[11px] font-medium text-stone-500">
                      {alt.tag}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {alt.whyItWorks}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onTryAlternativeStyle(alt.styleId as DesignStyle)}
                  className="w-full py-2.5 px-3 text-xs font-semibold uppercase tracking-wider text-[#355E4C] bg-[#EAEFEA] hover:bg-[#355E4C] hover:text-white rounded-xl transition-all"
                >
                  Try This Style
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FULLSCREEN MODAL */}
      <FullscreenModal
        isOpen={isFullscreen}
        onClose={() => setIsFullscreen(false)}
        beforeImage={beforeImageDisplay}
        afterImage={afterImageDisplay}
        designTitle={result.designName}
        styleName={result.style}
      />
    </div>
  );
};
