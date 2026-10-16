import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Header: React.FC = () => {
  const location = useLocation();
  const { totalCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);

  const navLinks = [
    { label: 'Shop', path: '/shop' },
    { label: 'Sarees in Motion', path: '/reels' },
    { label: 'Virtual Try-On', path: '/tryon' },
    { label: 'Pitch & Benchmark', path: '/pitch', isHighlight: true }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FCF9F2]/95 backdrop-blur-md border-b border-[#E8DEC8]">
      {/* Top Heritage Trust Banner (<= 40px) */}
      {!announcementDismissed && (
        <div className="bg-[#4A1525] text-[#FAF5EF] text-xs py-1.5 px-4 flex items-center justify-between text-center border-b border-[#3B0F1E] no-print">
          <div className="mx-auto flex items-center gap-2">
            <span className="text-[#C59B27] tracking-wider uppercase text-[11px] font-medium">Loom-to-You</span>
            <span className="opacity-40" aria-hidden="true">·</span>
            <span>Handloom Certified Heritage Silks</span>
            <span className="opacity-40" aria-hidden="true">·</span>
            <span className="text-[#E5C378]">Free Shipping Across India</span>
          </div>
          <button
            onClick={() => setAnnouncementDismissed(true)}
            className="text-white/60 hover:text-white p-0.5 rounded transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main 3-Zone Navigation Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <Link
          to="/"
          className="flex items-center gap-3 shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B2E49]"
        >
          {/* Padmora Lotus Symbol SVG */}
          <div className="w-10 h-10 rounded-full bg-[#4A1525] text-[#D4AF37] flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M12 2C12 2 10 7 10 11C10 13.21 11.79 15 14 15C16.21 15 18 13.21 18 11C18 7 12 2 12 2ZM12 2C12 2 14 7 14 11C14 13.21 12.21 15 10 15C7.79 15 6 13.21 6 11C6 7 12 2 12 2ZM12 14C9.5 14 7.5 15.5 7.5 17.5C7.5 19.5 9.5 21 12 21C14.5 21 16.5 19.5 16.5 17.5C16.5 15.5 14.5 14 12 14Z" opacity="0.9" />
              <path d="M12 6C12 6 8.5 10 8.5 13C8.5 14.93 10.07 16.5 12 16.5C13.93 16.5 15.5 14.93 15.5 13C15.5 10 12 6 12 6Z" fill="#FAF5EF" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-serif-marcellus text-2xl tracking-wide text-[#3B0F1E] whitespace-nowrap leading-tight">
              Padmora
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#8B2E49] font-medium leading-none">
              Sarees by Yashi
            </span>
          </div>
        </Link>

        {/* Zone 2: 4 Clean Single-Line Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {navLinks.map(link => {
            const isActive = location.pathname === link.path;
            if (link.isHighlight) {
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#4A1525] text-[#FAF5EF]'
                      : 'bg-[#4A1525]/10 text-[#4A1525] hover:bg-[#4A1525] hover:text-[#FAF5EF]'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>{link.label}</span>
                </Link>
              );
            }
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
                  isActive
                    ? 'text-[#4A1525] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#4A1525]'
                    : 'text-[#5A484C] hover:text-[#3B0F1E]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action (Bag Drawer Trigger) + Mobile Menu Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-[#4A1525] text-[#FAF5EF] hover:bg-[#3B0F1E] active:scale-98 transition-all whitespace-nowrap shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B2E49]"
            aria-label={`Shopping bag, ${totalCount} items`}
          >
            <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-medium tracking-wide">Bag</span>
            <span className="bg-[#D4AF37] text-[#1E1B1B] text-[11px] font-bold px-1.5 py-0.5 rounded-full leading-none tabular-nums">
              {totalCount}
            </span>
          </button>

          {/* Mobile Hamburg Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#4A1525] hover:bg-[#EAE0CD] rounded-lg transition-colors focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8DEC8] bg-[#FCF9F2] px-5 py-4 space-y-3 animate-in slide-in-from-top duration-200">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between py-2 text-base font-medium rounded-md px-3 ${
                location.pathname === link.path
                  ? 'bg-[#4A1525] text-white'
                  : 'text-[#4A1525] hover:bg-[#F2EAE0]'
              }`}
            >
              <span>{link.label}</span>
              {link.isHighlight ? (
                <span className="text-xs bg-[#D4AF37] text-black font-semibold px-2 py-0.5 rounded-full">Pitch</span>
              ) : (
                <ArrowUpRight className="w-4 h-4 opacity-50" />
              )}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};
