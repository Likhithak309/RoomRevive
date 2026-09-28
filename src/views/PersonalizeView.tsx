import React, { useState } from 'react';
import {
  Sparkles,
  ArrowLeft,
  Check,
  Bed,
  Sofa,
  Briefcase,
  Gamepad2,
  Utensils,
  LayoutGrid,
  Info,
} from 'lucide-react';
import {
  RoomType,
  DesignStyle,
  TransformationGoal,
  ColorPreference,
  RoomPreAnalysis,
} from '../types';
import { ReviveRequestPayload } from '../services/api';

interface PersonalizeViewProps {
  uploadedImage: string;
  preAnalysis: RoomPreAnalysis | null;
  onBack: () => void;
  onSubmit: (payload: ReviveRequestPayload) => void;
}

export const PersonalizeView: React.FC<PersonalizeViewProps> = ({
  uploadedImage,
  preAnalysis,
  onBack,
  onSubmit,
}) => {
  // Pre-fill room type from vision analysis if available
  const initialRoomType = (preAnalysis?.detectedRoomType as RoomType) || 'Bedroom';

  const [roomType, setRoomType] = useState<RoomType>(initialRoomType);
  const [style, setStyle] = useState<DesignStyle>('Japandi');
  const [budgetIndex, setBudgetIndex] = useState<number>(2); // Default to ₹25,000
  const [keptFurniture, setKeptFurniture] = useState<string[]>(['Bed', 'Desk']);
  const [customKept, setCustomKept] = useState<string>('');
  const [goal, setGoal] = useState<TransformationGoal>('Make it cozier');
  const [colorPref, setColorPref] = useState<ColorPreference>('Warm');
  const [customColor, setCustomColor] = useState<string>('');

  const budgetTiers = [
    { value: 5000, label: '₹5,000', descriptor: 'Smart Refresh · Lighting & Soft Decor' },
    { value: 10000, label: '₹10,000', descriptor: 'Essential Makeover · Bedding, Lighting & Accents' },
    { value: 25000, label: '₹25,000', descriptor: 'Complete Revival · Wall paint, Rugs, Storage & Decor' },
    { value: 50000, label: '₹50,000', descriptor: 'Architectural Upgrade · Premium finishes & furniture accents' },
    { value: 100000, label: '₹1,00,000+', descriptor: 'Luxury Transformation · Custom carpentry & designer lighting' },
  ];

  const currentBudget = budgetTiers[budgetIndex].value;

  const roomTypes: { id: RoomType; label: string; icon: React.ReactNode }[] = [
    { id: 'Bedroom', label: 'Bedroom', icon: <Bed className="w-4 h-4" /> },
    { id: 'Living Room', label: 'Living Room', icon: <Sofa className="w-4 h-4" /> },
    { id: 'Study Room', label: 'Study Room', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'Gaming Room', label: 'Gaming Room', icon: <Gamepad2 className="w-4 h-4" /> },
    { id: 'Dining Room', label: 'Dining Room', icon: <Utensils className="w-4 h-4" /> },
    { id: 'Other', label: 'Other', icon: <LayoutGrid className="w-4 h-4" /> },
  ];

  const styles: { id: DesignStyle; name: string; desc: string; previewColor: string }[] = [
    { id: 'Japandi', name: 'Japandi', desc: 'Japanese elegance meets Scandinavian warm minimalism', previewColor: '#E6DEC8' },
    { id: 'Scandinavian', name: 'Scandinavian', desc: 'Light woods, airy neutrals, tactile textiles & hygge', previewColor: '#F0ECE1' },
    { id: 'Minimal', name: 'Minimal', desc: 'Clean architectural lines, zero clutter, breathing room', previewColor: '#EBEBEB' },
    { id: 'Modern', name: 'Modern', desc: 'Polished surfaces, warm neutrals, understated sophistication', previewColor: '#DDD9D2' },
    { id: 'Cozy', name: 'Cozy', desc: 'Warm 2700K lighting, layered throws, deep relaxed comfort', previewColor: '#EBD8C3' },
    { id: 'Bohemian', name: 'Bohemian', desc: 'Organic jute, terracotta ceramics, rattan & greenery', previewColor: '#DFC7AF' },
    { id: 'Industrial', name: 'Industrial', desc: 'Matte dark hardware, reclaimed woods, exposed accents', previewColor: '#C4BCB3' },
    { id: 'Luxury', name: 'Luxury', desc: 'Rich marble veins, velvet touches, warm brushed brass', previewColor: '#D8CBB8' },
  ];

  const commonFurnitureItems = ['Bed', 'Desk', 'Wardrobe', 'Chair', 'Bookshelf', 'Nightstand', 'Sofa'];

  const goals: TransformationGoal[] = [
    'Make it look better',
    'Make it feel bigger',
    'Improve study/work setup',
    'Add more storage',
    'Make it cozier',
    'Create a luxury look',
    'Improve lighting',
  ];

  const colorPreferences: { id: ColorPreference; name: string; hex: string }[] = [
    { id: 'Neutral', name: 'Neutral', hex: '#EAE6DF' },
    { id: 'Warm', name: 'Warm', hex: '#E6D3BE' },
    { id: 'Cool', name: 'Cool', hex: '#D2DBDE' },
    { id: 'Earthy', name: 'Earthy', hex: '#C2BA9F' },
    { id: 'Dark', name: 'Dark & Moody', hex: '#4A4846' },
    { id: 'Bright', name: 'Bright & Airy', hex: '#F7F6F2' },
  ];

  const toggleKeptItem = (item: string) => {
    setKeptFurniture((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      roomType,
      style,
      budget: currentBudget,
      keptFurniture,
      customKept,
      goal,
      colorPref,
      customColor,
      imageBase64: uploadedImage,
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-in fade-in duration-200">
      {/* Top Breadcrumb & Step Info */}
      <div className="flex items-center justify-between border-b border-black/[0.06] pb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Upload</span>
        </button>
        <span className="text-xs font-semibold uppercase tracking-wider text-[#355E4C]">
          Step 02 of 03 · Personalization
        </span>
      </div>

      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#222120] tracking-tight">
          Tailor Your Makeover
        </h1>
        <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto">
          Tell us about your room type, preferred design language, budget target, and the furniture you want to preserve.
        </p>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-12">
        {/* 1. ROOM TYPE */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-base font-serif font-bold text-[#222120]">
              1. Room Type
            </label>
            <span className="text-xs text-stone-500">Select room function</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {roomTypes.map((t) => (
              <button
                type="button"
                key={t.id}
                onClick={() => setRoomType(t.id)}
                className={`p-3.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-2 ${
                  roomType === t.id
                    ? 'border-[#355E4C] bg-[#355E4C]/5 text-[#355E4C] font-semibold shadow-xs'
                    : 'border-stone-200 bg-white hover:border-stone-300 text-stone-700'
                }`}
              >
                <div className={`p-2 rounded-lg ${roomType === t.id ? 'bg-[#355E4C] text-white' : 'bg-stone-100 text-stone-600'}`}>
                  {t.icon}
                </div>
                <span className="text-xs">{t.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* 2. DESIGN STYLE */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-base font-serif font-bold text-[#222120]">
              2. Design Style
            </label>
            <span className="text-xs text-stone-500">Pick one primary aesthetic</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {styles.map((s) => {
              const isSelected = style === s.id;
              return (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => setStyle(s.id)}
                  className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between min-h-[110px] ${
                    isSelected
                      ? 'border-[#355E4C] bg-white shadow-md ring-2 ring-[#355E4C]/20'
                      : 'border-stone-200 bg-white hover:border-stone-300 shadow-xs'
                  }`}
                >
                  {/* Color preview swatch bar */}
                  <div
                    className="w-full h-2 rounded-full mb-3"
                    style={{ backgroundColor: s.previewColor }}
                  />

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-serif font-bold text-[#222120]">
                        {s.name}
                      </span>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-[#355E4C] text-white flex items-center justify-center">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                      )}
                    </div>
                    <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* 3. BUDGET SLIDER */}
        <section className="space-y-4 bg-white p-6 sm:p-8 rounded-3xl border border-black/[0.06] shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <label className="text-base font-serif font-bold text-[#222120]">
                3. Makeover Budget Target
              </label>
              <p className="text-xs text-stone-500 mt-0.5">
                The AI scales decor, lighting, and finishes to stay within your envelope.
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-[#355E4C] tabular-nums">
                {budgetTiers[budgetIndex].label}
              </span>
              <span className="text-xs text-stone-500 block">INR Approximate</span>
            </div>
          </div>

          <div className="pt-4 space-y-4">
            <input
              type="range"
              min={0}
              max={budgetTiers.length - 1}
              step={1}
              value={budgetIndex}
              onChange={(e) => setBudgetIndex(parseInt(e.target.value, 10))}
              className="w-full h-2.5 bg-stone-200 rounded-lg cursor-pointer transition-all"
            />

            <div className="flex justify-between text-xs text-stone-500 font-mono tabular-nums">
              {budgetTiers.map((t, idx) => (
                <button
                  type="button"
                  key={t.value}
                  onClick={() => setBudgetIndex(idx)}
                  className={`hover:text-stone-900 transition-colors ${
                    budgetIndex === idx ? 'font-bold text-[#355E4C]' : ''
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="bg-[#FAF9F5] p-3 rounded-xl border border-stone-200/60 text-xs text-stone-600 flex items-center gap-2">
              <Info className="w-4 h-4 text-[#355E4C] shrink-0" />
              <span>{budgetTiers[budgetIndex].descriptor}</span>
            </div>
          </div>
        </section>

        {/* 4. WHAT SHOULD STAY? */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-base font-serif font-bold text-[#222120]">
              4. What Should Stay?
            </label>
            <span className="text-xs text-stone-500">Furniture you already own and love</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-black/[0.06] shadow-sm space-y-4">
            <p className="text-xs text-stone-600">
              Check the pieces currently in your room that should be kept and integrated:
            </p>

            <div className="flex flex-wrap gap-2.5">
              {commonFurnitureItems.map((item) => {
                const isKept = keptFurniture.includes(item);
                return (
                  <button
                    type="button"
                    key={item}
                    onClick={() => toggleKeptItem(item)}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium border transition-all ${
                      isKept
                        ? 'bg-[#355E4C] border-[#355E4C] text-white shadow-xs'
                        : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    <span>{item}</span>
                    {isKept && <Check className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-2">
              <label className="text-xs font-medium text-stone-700 block mb-1.5">
                Anything else you want to keep?
              </label>
              <input
                type="text"
                value={customKept}
                onChange={(e) => setCustomKept(e.target.value)}
                placeholder="e.g. Vintage leather armchair, brass table lamp, acoustic guitar..."
                className="w-full px-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#355E4C]/20 focus:border-[#355E4C] text-stone-800"
              />
            </div>
          </div>
        </section>

        {/* 5. MAIN GOAL */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-base font-serif font-bold text-[#222120]">
              5. Primary Transformation Goal
            </label>
            <span className="text-xs text-stone-500">What matters most</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {goals.map((g) => (
              <button
                type="button"
                key={g}
                onClick={() => setGoal(g)}
                className={`p-3 rounded-xl border text-xs font-medium text-left transition-all ${
                  goal === g
                    ? 'border-[#355E4C] bg-[#355E4C]/5 text-[#355E4C] font-semibold'
                    : 'border-stone-200 bg-white hover:border-stone-300 text-stone-700'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </section>

        {/* 6. COLOR PREFERENCE */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-base font-serif font-bold text-[#222120]">
              6. Color Preference
            </label>
            <span className="text-xs text-stone-500">Visual atmosphere</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-black/[0.06] shadow-sm space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
              {colorPreferences.map((c) => (
                <button
                  type="button"
                  key={c.id}
                  onClick={() => setColorPref(c.id)}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-2 ${
                    colorPref === c.id
                      ? 'border-[#355E4C] ring-2 ring-[#355E4C]/20 font-semibold'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div
                    className="w-8 h-8 rounded-full border border-black/10 shadow-xs"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className="text-xs text-stone-800">{c.name}</span>
                </button>
              ))}
            </div>

            <div className="pt-2">
              <label className="text-xs font-medium text-stone-700 block mb-1.5">
                Or specify custom favorite colors (optional):
              </label>
              <input
                type="text"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                placeholder="e.g. Sage green accents, warm terracotta, oatmeal beige, brushed brass..."
                className="w-full px-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#355E4C]/20 focus:border-[#355E4C] text-stone-800"
              />
            </div>
          </div>
        </section>

        {/* SUBMIT CTA */}
        <div className="pt-6 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-stone-500 text-center sm:text-left">
            <span>Preserving {keptFurniture.length} items</span>
            <span aria-hidden="true" className="mx-2">·</span>
            <span>Target budget ₹{currentBudget.toLocaleString()}</span>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#355E4C] rounded-xl hover:bg-[#2A4B3D] transition-all shadow-md active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-[#E2EBE4]" />
            <span>✨ Revive My Room</span>
          </button>
        </div>
      </form>
    </div>
  );
};
