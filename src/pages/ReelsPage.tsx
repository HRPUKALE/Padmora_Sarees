import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Play,
  Volume2,
  VolumeX,
  ShoppingBag,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  ChevronUp,
  ChevronDown,
  ArrowRight
} from 'lucide-react';
import { SAREES_DATA, HERO_SAREE_IDS } from '../data/sareesData';

export const ReelsPage: React.FC = () => {
  const reelSarees = SAREES_DATA.filter(s => HERO_SAREE_IDS.includes(s.id));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [copied, setCopied] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const currentSaree = reelSarees[currentIndex] || reelSarees[0];
  const isSoldOut = currentSaree.stockStatus === 'Sold out';

  // Handle active video playback
  useEffect(() => {
    videoRefs.current.forEach((vid, idx) => {
      if (vid) {
        if (idx === currentIndex) {
          vid.currentTime = 0;
          vid.play().catch(() => {});
        } else {
          vid.pause();
        }
      }
    });
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < reelSarees.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0); // loop back
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setCurrentIndex(reelSarees.length - 1);
    }
  };

  const deepLink = `https://www.padmorasarees.com/product?id=${currentSaree.id}&utm_source=instagram&utm_medium=reel&utm_campaign=${currentSaree.slug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(deepLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-stone-950 text-white flex flex-col items-center justify-center p-3 sm:p-6 select-none">
      {/* Top Header */}
      <div className="w-full max-w-md flex items-center justify-between pb-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-serif-marcellus text-lg text-white font-semibold">Sarees in Motion</span>
          <span className="text-[11px] text-[#D4AF37] font-medium bg-[#D4AF37]/15 px-2 py-0.5 rounded-full">
            {currentIndex + 1} of {reelSarees.length}
          </span>
        </div>
        <Link to="/shop" className="text-stone-300 hover:text-white flex items-center gap-1 text-xs">
          <span>Exit to Shop</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Main Full-Screen Vertical Reel Stage (9:16) */}
      <div className="relative w-full max-w-[340px] sm:max-w-[370px] h-[72vh] max-h-[640px] aspect-9-16 bg-stone-900 rounded-2xl overflow-hidden shadow-2xl border border-white/15 flex flex-col justify-between">
        {/* HTML5 Video Players Stack */}
        {reelSarees.map((saree, idx) => (
          <video
            key={saree.id}
            ref={el => {
              videoRefs.current[idx] = el;
            }}
            src={saree.reelVideoUrl || `/reels/${saree.slug}.mp4`}
            poster={saree.reelPoster || saree.aiModelPhotos?.[0] || ''}
            loop
            playsInline
            muted={isMuted}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'
            }`}
          />
        ))}

        {/* Top HUD Controls */}
        <div className="relative z-20 p-4 flex items-center justify-between bg-gradient-to-b from-black/80 via-black/30 to-transparent">
          <div className="flex items-center gap-2">
            <span className="bg-black/60 text-[#D4AF37] text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-sm backdrop-blur-md flex items-center gap-1 border border-white/10">
              <Sparkles className="w-3 h-3" />
              <span>10s Photoreal Drape Reel</span>
            </span>
          </div>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition-colors border border-white/10"
            aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Right Vertical Navigation Controls */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-black/60 hover:bg-[#4A1525] text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-95 border border-white/15 shadow-lg"
            aria-label="Previous reel"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-black/60 hover:bg-[#4A1525] text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-95 border border-white/15 shadow-lg"
            aria-label="Next reel"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom Live Code-Driven Overlay */}
        <div className="relative z-20 p-4 sm:p-5 bg-gradient-to-t from-black/95 via-black/75 to-transparent space-y-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-[#E5C378] font-medium">
              <span>{currentSaree.weave} Handloom</span>
              <span aria-hidden="true">·</span>
              <span>{currentSaree.weaverRegion || 'Madhya Pradesh'}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">Rs {currentSaree.price.toLocaleString('en-IN')}</span>
            </div>

            <h2 className="font-serif-marcellus text-xl text-white font-semibold leading-tight line-clamp-1">
              {currentSaree.name}
            </h2>

            <p className="text-[11px] text-stone-300 leading-snug">
              {currentSaree.fiberContent || 'Pure silk warp and combed cotton weft with metallic zari.'}
            </p>
          </div>

          {/* Primary CTA Row */}
          <div className="space-y-2 pt-1">
            <Link
              to={currentSaree.productUrl}
              className="w-full py-3 px-4 rounded-xl bg-[#D4AF37] text-[#1C1113] hover:bg-[#E5C378] active:scale-98 transition-all font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{isSoldOut ? 'Pre-Book Piece (Sold Out)' : 'Shop This Saree Now'}</span>
            </Link>

            {/* Deep link copy & Live site link */}
            <div className="flex items-center gap-2 text-[11px] pt-1">
              <button
                onClick={handleCopyLink}
                className="flex-1 py-1.5 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-stone-200 transition-colors flex items-center justify-center gap-1.5 backdrop-blur-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied Instagram UTM Link!' : 'Copy Trackable Reel Deep Link'}</span>
              </button>

              <a
                href={currentSaree.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-stone-200 transition-colors flex items-center justify-center backdrop-blur-xs"
                title="View original on live store"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Reel selector dots */}
      <div className="flex items-center gap-1.5 pt-4">
        {reelSarees.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all ${
              idx === currentIndex ? 'w-6 bg-[#D4AF37]' : 'w-1.5 bg-stone-700 hover:bg-stone-500'
            }`}
            aria-label={`Jump to reel ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
