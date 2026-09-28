import React, { useState } from 'react';
import { Sparkles, SlidersHorizontal, ArrowRight, Eye, Check } from 'lucide-react';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { RoomImages } from '../assets/images';

interface GalleryViewProps {
  onSelectInspiration: (sampleRoomType: string, sampleStyle: string) => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({ onSelectInspiration }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStyle, setSelectedStyle] = useState<string>('All');

  const categories = ['All', 'Bedrooms', 'Study Rooms', 'Living Rooms', 'Gaming Rooms', 'Small Spaces'];
  const styles = ['All', 'Japandi', 'Scandinavian', 'Minimal', 'Modern', 'Cozy'];

  const galleryItems = [
    {
      id: 'gal-1',
      title: 'Warm Japandi Compact Bedroom',
      category: 'Bedrooms',
      style: 'Japandi',
      budget: '₹22,500',
      beforeImg: RoomImages.heroBefore,
      afterImg: RoomImages.heroAfter,
      description: 'Preserved core laminate desk and bed frame. Added 2700K paper pendant, organic linen duvet, fluted wood wall accents, and fiddle leaf fig.',
      preserved: 'Bed frame, Study desk',
      optimization: 'High (+40% perceived space)',
    },
    {
      id: 'gal-2',
      title: 'Minimalist Study & Productivity Nook',
      category: 'Study Rooms',
      style: 'Minimal',
      budget: '₹14,800',
      beforeImg: RoomImages.heroBefore,
      afterImg: RoomImages.galleryStudy,
      description: 'Transformed a cluttered home office with a walnut floating desk, hidden cable tray, warm brass task lamp, and acoustic slat panels.',
      preserved: 'Ergonomic chair',
      optimization: 'Exceptional (Zero surface clutter)',
    },
    {
      id: 'gal-3',
      title: 'Nordic Scandinavian Living Room',
      category: 'Living Rooms',
      style: 'Scandinavian',
      budget: '₹34,000',
      beforeImg: RoomImages.heroBefore,
      afterImg: RoomImages.galleryLiving,
      description: 'Cream bouclé sofa, low oak coffee table, sheer morning sunlight drapes, and organic ceramic vessels.',
      preserved: 'Solid oak media console',
      optimization: 'High (Optimal conversational layout)',
    },
    {
      id: 'gal-4',
      title: 'Cozy Modern Studio & Gaming Lounge',
      category: 'Gaming Rooms',
      style: 'Cozy',
      budget: '₹28,500',
      beforeImg: RoomImages.heroBefore,
      afterImg: RoomImages.galleryGaming,
      description: 'Replaced harsh multicolor LEDs with warm amber backlighting, felt acoustic wall panels, and textured wool throws.',
      preserved: 'Dual monitor setup & desktop tower',
      optimization: 'Optimal (Acoustic and glare management)',
    },
    {
      id: 'gal-5',
      title: 'Airy Studio Apartment Small Space',
      category: 'Small Spaces',
      style: 'Modern',
      budget: '₹18,000',
      beforeImg: RoomImages.heroBefore,
      afterImg: RoomImages.galleryLiving,
      description: 'Clever zone delineation using an area rug, slim vertical shelving, and warm neutral paint tones.',
      preserved: 'Modular sofa',
      optimization: 'Exceptional (Multi-zone utility)',
    },
  ];

  const filteredItems = galleryItems.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesStyle = selectedStyle === 'All' || item.style === selectedStyle;
    return matchesCategory && matchesStyle;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-in fade-in duration-200">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#355E4C]">
          <span>Curated Real-World Makeovers</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#222120] tracking-tight">
          Design Gallery
        </h1>
        <p className="text-sm sm:text-base text-stone-600">
          Explore interactive before/after transformations created for students, renters, and homeowners.
        </p>
      </div>

      {/* Filter Tabs (Interactive Functional Buttons) */}
      <div className="space-y-4">
        {/* Category Filters */}
        <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-medium rounded-xl whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#355E4C] text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200 hover:border-stone-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Style Filters */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto text-xs text-stone-500 pb-1">
          <span className="font-semibold text-stone-700 shrink-0">Style Filter:</span>
          {styles.map((sty) => (
            <button
              key={sty}
              onClick={() => setSelectedStyle(sty)}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                selectedStyle === sty
                  ? 'bg-stone-200 text-stone-900 font-semibold'
                  : 'hover:text-stone-900'
              }`}
            >
              {sty}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Makeover Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-5 sm:p-6 border border-black/[0.08] shadow-sm space-y-4 hover:shadow-md transition-shadow"
          >
            {/* Interactive Slider in Card */}
            <div className="relative">
              <BeforeAfterSlider
                beforeImage={item.beforeImg}
                afterImage={item.afterImg}
                beforeLabel="Before"
                afterLabel={item.style}
                aspectRatio="aspect-[16/10]"
              />
            </div>

            {/* Details */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#222120]">
                    {item.title}
                  </h3>
                  <div className="text-xs text-stone-500 mt-0.5">
                    <span>{item.category}</span>
                    <span className="mx-1.5" aria-hidden="true">·</span>
                    <span>{item.style} Style</span>
                    <span className="mx-1.5" aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums font-semibold text-[#355E4C]">{item.budget}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectInspiration(item.category === 'All' ? 'Bedroom' : item.category.slice(0, -1), item.style)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#355E4C] bg-[#EAEFEA] hover:bg-[#355E4C] hover:text-white rounded-xl transition-all shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Try Style</span>
                </button>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                {item.description}
              </p>

              <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between text-[11px] text-stone-500 gap-2">
                <span>Preserved: <strong className="text-stone-700">{item.preserved}</strong></span>
                <span>Space Optimization: <strong className="text-stone-700">{item.optimization}</strong></span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 space-y-3">
          <p className="text-sm text-stone-600">No rooms match the selected combination.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedStyle('All');
            }}
            className="text-xs font-semibold text-[#355E4C] underline"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
