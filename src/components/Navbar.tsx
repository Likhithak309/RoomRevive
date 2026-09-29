import React, { useState } from 'react';
import { Menu, X, Sparkles, Bookmark, Bot } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  savedCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, savedCount = 0 }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'gallery', label: 'Design Gallery' },
    { id: 'saved', label: 'My Designs' },
  ];

  const handleNavClick = (viewId: string) => {
    onNavigate(viewId);
    setMobileMenuOpen(false);
  };

  const toggleN8nChat = () => {
    const btn = document.querySelector('.chat-window-toggle, .chat-button, button[aria-label*="chat"], .chat-toggle') as HTMLElement | null;
    if (btn) {
      btn.click();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-black/[0.06] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-[#355E4C] flex items-center justify-center text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
              <Sparkles className="w-4 h-4 text-[#E2EBE4]" />
            </div>
            <span className="text-2xl font-serif font-bold tracking-tight text-[#222120]">
              RoomRevive
            </span>
          </button>

          {/* Zone 2: Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            {navLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-1 transition-colors duration-150 whitespace-nowrap focus:outline-none ${
                    isActive
                      ? 'text-[#222120] font-semibold'
                      : 'hover:text-[#222120] text-stone-600'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {link.label}
                    {link.id === 'saved' && savedCount > 0 && (
                      <span className="text-[11px] font-mono text-[#355E4C] bg-[#EAEFEA] px-1.5 py-0.2 rounded-md font-semibold">
                        {savedCount}
                      </span>
                    )}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#355E4C] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleN8nChat}
              className="hidden lg:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-stone-700 hover:text-stone-900 bg-stone-100/80 hover:bg-stone-200/80 rounded-xl transition-all border border-stone-200 focus:outline-none"
              title="Chat with RoomRevive AI Assistant"
            >
              <Bot className="w-3.5 h-3.5 text-[#355E4C]" />
              <span>Ask AI</span>
              <span className="text-[10px] font-mono uppercase bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-semibold">n8n</span>
            </button>

            <button
              onClick={() => handleNavClick('upload')}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#355E4C] rounded-xl hover:bg-[#2A4B3D] active:scale-[0.98] transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#355E4C]/30"
            >
              <span>Try RoomRevive</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-stone-700 hover:text-stone-900 hover:bg-black/5 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-black/[0.06] bg-[#FAF9F5] px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-150">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 text-base font-medium rounded-lg text-left transition-colors ${
                currentView === link.id
                  ? 'bg-stone-200/50 text-[#222120] font-semibold'
                  : 'text-stone-700 hover:bg-stone-100 hover:text-[#222120]'
              }`}
            >
              <span>{link.label}</span>
              {link.id === 'saved' && savedCount > 0 && (
                <span className="text-xs font-mono text-[#355E4C] bg-[#EAEFEA] px-2 py-0.5 rounded-full font-semibold">
                  {savedCount}
                </span>
              )}
            </button>
          ))}
          <div className="pt-2 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                toggleN8nChat();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-xl transition-all shadow-xs"
            >
              <Bot className="w-4 h-4 text-[#355E4C]" />
              <span>Ask RoomRevive AI (n8n)</span>
            </button>

            <button
              onClick={() => handleNavClick('upload')}
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold uppercase tracking-wider text-white bg-[#355E4C] rounded-xl hover:bg-[#2A4B3D] transition-all shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Revive My Room</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
