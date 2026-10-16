import React, { useState, useRef, useEffect } from 'react';
import { X, Volume2, VolumeX, ShoppingBag, ExternalLink, Copy, Check, Sparkles } from 'lucide-react';
import { Saree } from '../types/saree';
import { Link } from 'react-router-dom';

interface ReelModalProps {
  saree: Saree | null;
  onClose: () => void;
}

export const ReelModal: React.FC<ReelModalProps> = ({ saree, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  }, [saree]);

  if (!saree) return null;

  const isSoldOut = saree.stockStatus === 'Sold out';
  const reelSrc = saree.reelVideoUrl || `/reels/${saree.slug}.mp4`;
  const posterSrc = saree.reelPoster || saree.aiModelPhotos?.[0] || saree.localImages?.[0] || '';

  const deepLink = `https://www.padmorasarees.com/product?id=${saree.id}&utm_source=instagram&utm_medium=reel&utm_campaign=${saree.slug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(deepLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Reel Container 9:16 Aspect Ratio */}
      <div className="relative z-10 w-full max-w-[340px] sm:max-w-[380px] h-[80vh] max-h-[640px] aspect-9-16 bg-stone-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between border border-white/20">
        {/* HTML5 Video Element */}
        <video
          ref={videoRef}
          src={reelSrc}
          poster={posterSrc}
          loop
          playsInline
          muted={isMuted}
          autoPlay
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Top Controls Bar */}
        <div className="relative z-20 p-3.5 flex items-center justify-between bg-gradient-to-b from-black/80 via-black/40 to-transparent">
          <div className="flex items-center gap-2">
            <span className="bg-black/60 text-[#D4AF37] text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-sm backdrop-blur-xs flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>AI Motion Reel</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleSound}
              className="p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-xs transition-colors"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-xs transition-colors"
              aria-label="Close reel player"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Code-driven Overlay */}
        <div className="relative z-20 p-4 bg-gradient-to-t from-black/95 via-black/75 to-transparent space-y-3">
          <div className="text-white space-y-1">
            <div className="flex items-center gap-2 text-xs text-[#E5C378]">
              <span>{saree.weave}</span>
              <span aria-hidden="true">·</span>
              <span>{saree.colour}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">Rs {saree.price.toLocaleString('en-IN')}</span>
            </div>
            <h3 className="font-serif-marcellus text-lg text-white font-semibold leading-tight line-clamp-1">
              {saree.name}
            </h3>
            <p className="text-[11px] text-stone-300">
              {saree.fiberContent || 'Handwoven with pure silk warp and master zari borders.'}
            </p>
          </div>

          {/* Primary Action Button */}
          <div className="space-y-2 pt-1">
            <Link
              to={saree.productUrl}
              onClick={onClose}
              className="w-full py-2.5 px-4 rounded-lg bg-[#D4AF37] text-[#1C1113] hover:bg-[#E5C378] active:scale-98 transition-all font-semibold text-xs flex items-center justify-center gap-2 shadow-md"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{isSoldOut ? 'Pre-Book This Saree' : 'Shop This Saree Now'}</span>
            </Link>

            {/* Deep link & Live site links */}
            <div className="flex items-center gap-2 pt-1 text-[11px]">
              <button
                onClick={handleCopyLink}
                className="flex-1 py-1.5 px-2 rounded bg-white/10 hover:bg-white/20 text-stone-200 transition-colors flex items-center justify-center gap-1.5"
                title="Copy trackable Instagram deep link"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied UTM Link!' : 'Copy Reel Deep Link'}</span>
              </button>

              <a
                href={saree.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-stone-200 transition-colors flex items-center justify-center"
                title="View original on live padmorasarees.com"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
