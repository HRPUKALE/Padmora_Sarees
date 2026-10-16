import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Sparkles, Bell, ArrowRight } from 'lucide-react';
import { Saree, SareeVariant } from '../types/saree';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  saree: Saree;
  onOpenNotifyModal?: (saree: Saree, color: string) => void;
  onPlayReel?: (saree: Saree) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ saree, onOpenNotifyModal, onPlayReel }) => {
  const { addToCart } = useCart();
  
  // Default variant state
  const hasVariants = saree.variants && saree.variants.length > 0;
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  const currentVariant: SareeVariant | null = hasVariants ? saree.variants[selectedVariantIndex] : null;
  const activeColor = currentVariant?.colorName || saree.colour || 'Classic';
  const activeStock = currentVariant ? currentVariant.stock : saree.stock;
  const isSoldOut = activeStock <= 0;
  const isLowStock = activeStock > 0 && activeStock <= 2;

  // Active image: if current variant has images, use it; otherwise fallback
  const primaryImg =
    currentVariant?.images?.[0] ||
    saree.localImages?.[0] ||
    saree.imageUrls?.[0] ||
    saree.aiModelPhotos?.[0] ||
    '';

  const onModelImg = saree.aiModelPhotos?.[0];

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group bg-white rounded-xl border border-[#E8DEC8] overflow-hidden flex flex-col justify-between transition-all duration-200 hover:shadow-md hover:border-[#D4AF37]/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Sizing Constrained Image Container */}
      <div className="relative w-full h-56 sm:h-64 md:h-72 overflow-hidden bg-[#F7F3EB]">
        <Link to={saree.productUrl} className="block w-full h-full">
          <img
            src={isHovered && onModelImg ? onModelImg : primaryImg}
            alt={saree.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        </Link>

        {/* Small AI Preview Tag if showing AI drape photo */}
        {(isHovered && onModelImg) && (
          <div className="absolute top-2 left-2 bg-black/75 backdrop-blur-xs text-[#FAF5EF] text-[10px] font-medium px-2 py-0.5 rounded-sm flex items-center gap-1 z-10">
            <Sparkles className="w-2.5 h-2.5 text-[#D4AF37]" />
            <span>AI Drape</span>
          </div>
        )}

        {/* Stock status badge */}
        <div className="absolute top-2 right-2 z-10">
          {isSoldOut ? (
            <span className="bg-[#4A1525] text-white text-[10px] font-semibold px-2 py-0.5 rounded-sm shadow-xs">
              Sold Out
            </span>
          ) : isLowStock ? (
            <span className="bg-[#D4AF37] text-[#1E1B1B] text-[10px] font-bold px-1.5 py-0.5 rounded-sm shadow-xs">
              Only {activeStock} left
            </span>
          ) : null}
        </div>

        {/* Reel Play Floating Button */}
        {saree.reelVideoUrl && (
          <button
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              if (onPlayReel) onPlayReel(saree);
            }}
            className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-black/65 hover:bg-[#4A1525] text-white flex items-center justify-center backdrop-blur-xs transition-colors shadow-md z-10"
            aria-label="Play 10s Drape Reel"
            title="Watch in motion"
          >
            <Play className="w-3 h-3 fill-current ml-0.5 text-[#D4AF37]" />
          </button>
        )}
      </div>

      {/* Card Details */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2 bg-[#FCF9F2]">
        <div>
          {/* Metadata Row */}
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-medium text-[#7A5B63] mb-1">
            <span className="text-[#8B2E49] font-semibold">{saree.weave}</span>
            <span aria-hidden="true">·</span>
            <span>{saree.loomType || 'Handloom'}</span>
            <span aria-hidden="true">·</span>
            <span>6.3m</span>
          </div>

          {/* Product Title */}
          <Link to={saree.productUrl}>
            <h3 className="font-serif-marcellus text-sm sm:text-base text-[#3B0F1E] group-hover:text-[#7A2740] transition-colors line-clamp-1 leading-snug">
              {saree.name}
            </h3>
          </Link>

          {/* Price & MRP Baseline */}
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-serif-marcellus text-base sm:text-lg font-bold text-[#3B0F1E] tabular-nums">
              Rs {saree.price.toLocaleString('en-IN')}
            </span>
            {saree.mrp > saree.price && (
              <span className="text-[11px] text-slate-400 line-through tabular-nums">
                Rs {saree.mrp.toLocaleString('en-IN')}
              </span>
            )}
            <span className="text-[10px] text-emerald-800 font-medium hidden sm:inline">Blouse included</span>
          </div>

          {/* Grouped Color Swatches */}
          {hasVariants && saree.variants.length > 1 && (
            <div className="mt-2 pt-1.5 border-t border-[#E8DEC8]/60 flex items-center gap-1.5">
              <span className="text-[10px] text-slate-500">Shades:</span>
              <div className="flex items-center gap-1 flex-wrap">
                {saree.variants.slice(0, 4).map((v, idx) => {
                  const isSelected = idx === selectedVariantIndex;
                  return (
                    <button
                      key={v.variantId || idx}
                      onClick={() => setSelectedVariantIndex(idx)}
                      className={`text-[10px] px-1.5 py-0.5 rounded border transition-all ${
                        isSelected
                          ? 'border-[#4A1525] bg-[#4A1525] text-white font-semibold'
                          : 'border-[#D5C9B3] bg-white text-[#5A484C] hover:border-[#4A1525]'
                      }`}
                      title={`${v.colorName} (${v.stock > 0 ? `${v.stock} in stock` : 'Sold out'})`}
                    >
                      {v.colorName}
                    </button>
                  );
                })}
                {saree.variants.length > 4 && (
                  <span className="text-[10px] text-slate-400">+{saree.variants.length - 4}</span>
                )}
              </div>
            </div>
          )}

          {/* Stock narrative */}
          <div className="mt-1.5 text-[10px] text-slate-500">
            {isSoldOut ? (
              <span className="text-[#8B2E49] font-medium">Sold out in {activeColor} · Pre-book open</span>
            ) : (
              <span>Loom: <strong className="text-[#3B0F1E] font-medium">{saree.weaverRegion || 'Madhya Pradesh'}</strong></span>
            )}
          </div>
        </div>

        {/* Action Button Row */}
        <div className="pt-2 border-t border-[#E8DEC8] flex items-center gap-2">
          {isSoldOut ? (
            <button
              onClick={() => onOpenNotifyModal && onOpenNotifyModal(saree, activeColor)}
              className="flex-1 py-1.5 sm:py-2 px-2.5 rounded-lg border border-[#4A1525] text-[#4A1525] hover:bg-[#4A1525] hover:text-white transition-colors text-[11px] font-semibold flex items-center justify-center gap-1"
            >
              <Bell className="w-3 h-3" />
              <span>Pre-Book</span>
            </button>
          ) : (
            <button
              onClick={() => addToCart(saree, activeColor)}
              className="flex-1 py-1.5 sm:py-2 px-2.5 rounded-lg bg-[#4A1525] text-[#FAF5EF] hover:bg-[#3B0F1E] active:scale-98 transition-all text-[11px] font-semibold tracking-wide"
            >
              Add to Bag
            </button>
          )}

          <Link
            to={saree.productUrl}
            className="p-1.5 sm:p-2 rounded-lg border border-[#D5C9B3] hover:border-[#4A1525] text-[#4A1525] hover:bg-white transition-colors"
            title="View Details"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
