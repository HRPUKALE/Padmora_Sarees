import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Play,
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  Truck,
  MessageCircle,
  Bell,
  CheckCircle2,
  HelpCircle,
  ChevronRight,
  Info,
  Scale
} from 'lucide-react';
import { SAREES_DATA } from '../data/sareesData';
import { useCart } from '../context/CartContext';
import { ReelModal } from '../components/ReelModal';
import { NotifyModal } from '../components/NotifyModal';
import { ProductCard } from '../components/ProductCard';

export const ProductPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Find saree by slug or id
  const saree = SAREES_DATA.find(s => s.slug === slug || String(s.id) === slug) || SAREES_DATA[0];

  const { addToCart, setIsCartOpen } = useCart();
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [activeMediaIdx, setActiveMediaIdx] = useState(0);
  const [activeReelModal, setActiveReelModal] = useState(false);
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'facts' | 'price' | 'weaver' | 'care'>('facts');

  const currentVariant = saree.variants?.[selectedVariantIdx] || null;
  const activeColor = currentVariant?.colorName || saree.colour || 'Classic';
  const activeStock = currentVariant ? currentVariant.stock : saree.stock;
  const isSoldOut = activeStock <= 0;
  const isLowStock = activeStock > 0 && activeStock <= 2;

  // Build full media gallery:
  // 1. Primary product flat lay photo
  // 2. AI on-woman editorial portraits
  // 3. Variant images
  const mediaList: { type: 'image' | 'video'; url: string; label: string; isAi?: boolean }[] = [];

  // Add on-model AI photos first if available
  if (saree.aiModelPhotos && saree.aiModelPhotos.length > 0) {
    saree.aiModelPhotos.forEach((img, i) => {
      mediaList.push({
        type: 'image',
        url: img,
        label: `On-Model Editorial Drape ${i + 1}`,
        isAi: true
      });
    });
  }

  // Add reel thumbnail/video
  if (saree.reelVideoUrl) {
    mediaList.push({
      type: 'video',
      url: saree.reelVideoUrl,
      label: '10s Motion Drape Reel',
      isAi: true
    });
  }

  // Add flat lays / live images
  const liveImgs = saree.localImages?.length ? saree.localImages : saree.imageUrls || [];
  liveImgs.forEach((img, i) => {
    mediaList.push({
      type: 'image',
      url: img,
      label: `Loom Product Still ${i + 1}`
    });
  });

  const activeMedia = mediaList[activeMediaIdx] || mediaList[0];

  const handleInstantBuy = () => {
    addToCart(saree, activeColor);
    setIsCartOpen(true);
  };

  // Recommendations
  const relatedSarees = SAREES_DATA.filter(s => s.id !== saree.id && s.weave === saree.weave).slice(0, 3);

  const whatsappMessage = encodeURIComponent(
    `Hello Padmora! I am looking at the "${saree.name}" in ${activeColor} (Rs ${saree.price}). Can you share a live video of the pallu and drape on WhatsApp?`
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-[#3B0F1E]">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 opacity-40" />
        <Link to="/shop" className="hover:text-[#3B0F1E]">Shop</Link>
        <ChevronRight className="w-3.5 h-3.5 opacity-40" />
        <Link to={`/shop?weave=${saree.weave}`} className="hover:text-[#3B0F1E]">{saree.weave}</Link>
        <ChevronRight className="w-3.5 h-3.5 opacity-40" />
        <span className="text-[#3B0F1E] font-medium truncate max-w-[200px]">{saree.name}</span>
      </nav>

      {/* Main 2-Column Contiguous Purchase Module PDP */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column: Visual Media Gallery (Sticky) */}
        <div className="lg:col-span-7 space-y-3 sm:space-y-4">
          {/* Main Visual Display Frame with Strict Height Constraint */}
          <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[540px] bg-[#FAF6F0] rounded-2xl overflow-hidden border border-[#E8DEC8] shadow-xs">
            {activeMedia?.type === 'video' ? (
              <div className="relative w-full h-full bg-black flex items-center justify-center">
                <video
                  src={activeMedia.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setActiveReelModal(true)}
                  className="absolute bottom-4 right-4 px-3.5 py-1.5 bg-black/75 hover:bg-[#4A1525] text-white rounded-lg text-xs font-medium flex items-center gap-1.5 backdrop-blur-xs transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-current text-[#D4AF37]" />
                  <span>Full-Screen Reel</span>
                </button>
              </div>
            ) : (
              <img
                src={activeMedia?.url}
                alt={`${saree.name} - ${activeMedia?.label}`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            )}

            {/* AI tag */}
            {activeMedia?.isAi && (
              <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-xs text-[#FAF5EF] text-[10px] sm:text-[11px] font-medium px-2.5 py-1 rounded-sm flex items-center gap-1.5 shadow-xs border border-white/10">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>AI-Generated Preview</span>
              </div>
            )}

            {/* Direct Reel Quick Trigger */}
            {saree.reelVideoUrl && activeMedia?.type !== 'video' && (
              <button
                onClick={() => setActiveReelModal(true)}
                className="absolute bottom-3 right-3 px-3.5 py-2 rounded-xl bg-black/70 hover:bg-[#4A1525] text-white text-xs font-semibold backdrop-blur-md flex items-center gap-1.5 shadow-md transition-transform active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-current text-[#D4AF37]" />
                <span>Watch 10s Drape Reel</span>
              </button>
            )}
          </div>

          {/* Thumbnails Row */}
          <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
            {mediaList.map((m, idx) => {
              const isSelected = idx === activeMediaIdx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveMediaIdx(idx)}
                  className={`relative flex-none w-16 sm:w-20 h-20 sm:h-24 rounded-lg overflow-hidden border-2 transition-all ${
                    isSelected ? 'border-[#4A1525] ring-2 ring-[#4A1525]/20' : 'border-[#E8DEC8] opacity-75 hover:opacity-100'
                  }`}
                  aria-label={m.label}
                >
                  {m.type === 'video' ? (
                    <div className="w-full h-full bg-stone-900 flex flex-col items-center justify-center text-white p-1">
                      <Play className="w-4 h-4 text-[#D4AF37]" />
                      <span className="text-[9px] uppercase font-bold mt-1">Reel</span>
                    </div>
                  ) : (
                    <img
                      src={m.url}
                      alt={m.label}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  {m.isAi && (
                    <span className="absolute bottom-0 inset-x-0 bg-black/70 text-[8px] text-[#D4AF37] font-semibold text-center py-0.5">
                      AI
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="lg:col-span-5 space-y-6 bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DEC8] shadow-xs">
          <div>
            {/* Weave & Loom Metadata */}
            <div className="flex items-center gap-2 text-xs text-[#8B2E49] font-medium mb-1.5">
              <span>{saree.weave} Handloom</span>
              <span aria-hidden="true">·</span>
              <span>{saree.weaverRegion || 'Madhya Pradesh'}</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-700 font-semibold">100% Authentic</span>
            </div>

            <h1 className="font-serif-marcellus text-2xl sm:text-3xl text-[#3B0F1E] leading-tight">
              {saree.name}
            </h1>

            {/* Price Row */}
            <div className="mt-3 flex items-baseline gap-3">
              <span className="font-serif-marcellus text-2xl sm:text-3xl font-bold text-[#3B0F1E] tabular-nums">
                Rs {saree.price.toLocaleString('en-IN')}
              </span>
              {saree.mrp > saree.price && (
                <span className="text-sm text-slate-400 line-through tabular-nums">
                  Rs {saree.mrp.toLocaleString('en-IN')}
                </span>
              )}
              <span className="text-xs text-slate-500 font-medium">Inclusive of all taxes &amp; shipping</span>
            </div>
          </div>

          {/* Color Variants Swatches */}
          {saree.variants && saree.variants.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-[#E8DEC8]">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#3B0F1E]">Select Shade:</span>
                <span className="text-slate-500">{activeColor}</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {saree.variants.map((v, idx) => {
                  const isSelected = idx === selectedVariantIdx;
                  return (
                    <button
                      key={v.variantId || idx}
                      onClick={() => {
                        setSelectedVariantIdx(idx);
                        // If variant has specific image, switch to it
                        if (v.images?.[0]) {
                          const targetIdx = mediaList.findIndex(m => m.url === v.images[0]);
                          if (targetIdx >= 0) setActiveMediaIdx(targetIdx);
                        }
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        isSelected
                          ? 'bg-[#4A1525] text-white border-[#4A1525] shadow-xs'
                          : 'bg-[#FAF6F0] text-slate-700 border-[#D5C9B3] hover:border-[#4A1525]'
                      }`}
                    >
                      {v.colorName} {v.stock <= 0 && '(Sold Out)'}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Stock Availability Indicator */}
          <div className="p-3.5 rounded-xl bg-[#FAF6F0] border border-[#E8DEC8] text-xs space-y-1">
            {isSoldOut ? (
              <div className="flex items-start gap-2 text-[#8B2E49]">
                <Bell className="w-4 h-4 text-[#8B2E49] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-sm font-serif-marcellus">Sold Out in {activeColor}</strong>
                  <p className="text-slate-600 mt-0.5">
                    Handloom batches take 4 to 7 working days. Pre-book to reserve your piece from the next loom run.
                  </p>
                </div>
              </div>
            ) : isLowStock ? (
              <div className="flex items-start gap-2 text-[#9A6B1F]">
                <Info className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#3B0F1E]">Only {activeStock} left in {activeColor}</strong>
                  <p className="text-slate-600 mt-0.5">
                    This piece is handwoven on a traditional pit loom. Not mass-produced.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Ready for 48-hour loom dispatch with Silk Mark guarantee.</span>
              </div>
            )}
          </div>

          {/* Primary Action Buttons */}
          <div className="space-y-2.5 pt-2">
            {isSoldOut ? (
              <button
                onClick={() => setShowNotifyModal(true)}
                className="w-full py-3.5 px-6 rounded-xl bg-[#4A1525] text-[#FAF5EF] hover:bg-[#3B0F1E] active:scale-98 transition-all font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md"
              >
                <Bell className="w-4 h-4 text-[#D4AF37]" />
                <span>Pre-Book Piece from Next Loom Batch</span>
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => addToCart(saree, activeColor)}
                  className="py-3 px-4 rounded-xl border border-[#4A1525] text-[#4A1525] hover:bg-[#FAF6F0] active:scale-98 transition-all font-semibold text-xs tracking-wider uppercase"
                >
                  Add to Bag
                </button>
                <button
                  onClick={handleInstantBuy}
                  className="py-3 px-4 rounded-xl bg-[#4A1525] text-[#FAF5EF] hover:bg-[#3B0F1E] active:scale-98 transition-all font-semibold text-xs tracking-wider uppercase shadow-md"
                >
                  Buy Now
                </button>
              </div>
            )}

            {/* Direct WhatsApp Concierge Order Button */}
            <a
              href={`https://wa.me/919999999999?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask Founder for Live Drape Video on WhatsApp</span>
            </a>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-4 border-t border-[#E8DEC8] grid grid-cols-2 gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Silk Mark Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Free Delivery in 48h</span>
            </div>
            <div className="flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Fair Living Wage</span>
            </div>
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Transparent Pricing</span>
            </div>
          </div>
        </div>
      </div>

      {/* Structured Specification Tabs */}
      <div className="bg-white rounded-2xl border border-[#E8DEC8] p-6 sm:p-8 space-y-6">
        {/* Tab Buttons (Interactive Buttons per Constitution) */}
        <div className="flex items-center gap-2 border-b border-[#E8DEC8] pb-3 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('facts')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'facts' ? 'bg-[#4A1525] text-white' : 'text-slate-600 hover:text-black'
            }`}
          >
            Fabric Facts &amp; Technical Specs
          </button>
          <button
            onClick={() => setActiveTab('price')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'price' ? 'bg-[#4A1525] text-white' : 'text-slate-600 hover:text-black'
            }`}
          >
            Why This Price? (Cost Breakdown)
          </button>
          <button
            onClick={() => setActiveTab('weaver')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'weaver' ? 'bg-[#4A1525] text-white' : 'text-slate-600 hover:text-black'
            }`}
          >
            Artisan &amp; Weaving Cluster
          </button>
          <button
            onClick={() => setActiveTab('care')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'care' ? 'bg-[#4A1525] text-white' : 'text-slate-600 hover:text-black'
            }`}
          >
            Drape &amp; Care Guide
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'facts' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700">
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Fiber Composition:</span>
                <span className="font-semibold text-[#3B0F1E]">{saree.fiberContent || '50% Mulberry Silk × 50% Cotton'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Loom Technology:</span>
                <span className="font-semibold text-[#3B0F1E]">{saree.loomType || 'Traditional Handloom Pit Loom'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Total Saree Length:</span>
                <span className="font-semibold text-[#3B0F1E]">{saree.length || '6.3 metres (with 80cm blouse piece)'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Weight &amp; Drape Feel:</span>
                <span className="font-semibold text-[#3B0F1E]">{saree.weight || '390g — light, breathable fall'}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Zari Specification:</span>
                <span className="font-semibold text-[#3B0F1E]">Tested Golden Metallic Thread (Non-tarnishing)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Geographical Origin:</span>
                <span className="font-semibold text-[#3B0F1E]">{saree.weaverRegion || 'Madhya Pradesh'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Certification Badges:</span>
                <span className="font-semibold text-emerald-800">
                  {saree.certification?.join(' · ') || 'Handloom Mark Certified'}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Packaging:</span>
                <span className="font-semibold text-[#3B0F1E]">Breathable Muslin Cloth Saree Pouch</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'price' && (
          <div className="space-y-4 text-xs text-slate-700">
            <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E8DEC8] space-y-2">
              <h4 className="font-serif-marcellus text-base text-[#3B0F1E] font-semibold">
                Transparent Cost &amp; Living Wage Audit
              </h4>
              <p className="leading-relaxed">
                {saree.priceJustification?.narrative ||
                  'Unlike mass-manufactured powerloom sarees that simulate handloom motifs in synthetic polyester in under 40 minutes, this authentic handloom piece represents days of dedicated manual labor by master artisans.'}
              </p>
            </div>

            {saree.priceJustification && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                <div className="p-3 rounded-lg border border-[#E8DEC8] bg-white">
                  <span className="block text-slate-500 text-[11px]">Raw Silk &amp; Zari</span>
                  <span className="font-serif-marcellus text-lg font-bold text-[#3B0F1E] tabular-nums">
                    Rs {saree.priceJustification.rawMaterials.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="p-3 rounded-lg border border-[#E8DEC8] bg-white">
                  <span className="block text-slate-500 text-[11px]">Weaver Direct Wages</span>
                  <span className="font-serif-marcellus text-lg font-bold text-[#3B0F1E] tabular-nums">
                    Rs {saree.priceJustification.weaverWages.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-emerald-700">({saree.priceJustification.artisanWeavingDays} working days)</span>
                </div>
                <div className="p-3 rounded-lg border border-[#E8DEC8] bg-white">
                  <span className="block text-slate-500 text-[11px]">Finishing &amp; Muslin Bag</span>
                  <span className="font-serif-marcellus text-lg font-bold text-[#3B0F1E] tabular-nums">
                    Rs {saree.priceJustification.finishingAndInspection.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="p-3 rounded-lg border border-[#E8DEC8] bg-white">
                  <span className="block text-slate-500 text-[11px]">Brand Operations</span>
                  <span className="font-serif-marcellus text-lg font-bold text-[#3B0F1E] tabular-nums">
                    Rs {saree.priceJustification.brandMarkup.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'weaver' && (
          <div className="space-y-4 text-xs text-slate-700">
            <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E8DEC8] space-y-2">
              <h4 className="font-serif-marcellus text-base text-[#3B0F1E] font-semibold">
                Master Weaver Attribution &amp; Cluster Heritage
              </h4>
              <p className="leading-relaxed">
                Handcrafted in the heritage cluster of <strong>{saree.weaverRegion || 'Maheshwar, Madhya Pradesh'}</strong>. Padmora works directly with weaver societies and family looms, ensuring 100% of weaving wages go directly to the artisan household without commission broker deduction.
              </p>
              <div className="pt-2 text-slate-600">
                <span>Loom Classification: </span>
                <strong className="text-[#3B0F1E]">{saree.loomType || 'Traditional Pit Loom'}</strong>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'care' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
            <div className="p-4 rounded-lg bg-[#FAF6F0] border border-[#E8DEC8] space-y-2">
              <h5 className="font-semibold text-[#3B0F1E]">Drape &amp; Styling Guide</h5>
              <ul className="space-y-1.5 list-disc list-inside text-slate-600">
                <li>Best draped in traditional Nivi style or pleated over the left forearm.</li>
                <li>Pair with contrasting raw silk or brocade unstitched blouse piece (included).</li>
                <li>Iron with low heat or silk setting with protective cotton press-cloth.</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-[#FAF6F0] border border-[#E8DEC8] space-y-2">
              <h5 className="font-semibold text-[#3B0F1E]">Washing &amp; Preservation</h5>
              <ul className="space-y-1.5 list-disc list-inside text-slate-600">
                <li>Dry clean only for the first two washes to protect pure silk and metallic zari sheen.</li>
                <li>Store folded in the complimentary breathable muslin pouch.</li>
                <li>Refold every 3 months along different crease lines to preserve warp longevity.</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Related Handlooms in Same Weave */}
      {relatedSarees.length > 0 && (
        <section className="space-y-6 pt-6 border-t border-[#E8DEC8]">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8B2E49]">
                More from this Loom
              </span>
              <h2 className="font-serif-marcellus text-2xl text-[#3B0F1E] mt-0.5">
                Similar {saree.weave} Handlooms
              </h2>
            </div>
            <Link to={`/shop?weave=${saree.weave}`} className="text-xs font-semibold text-[#8B2E49] hover:underline">
              View all {saree.weave} sarees
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedSarees.map(rel => (
              <ProductCard key={rel.id} saree={rel} />
            ))}
          </div>
        </section>
      )}

      {/* Modals */}
      <ReelModal saree={activeReelModal ? saree : null} onClose={() => setActiveReelModal(false)} />
      <NotifyModal
        saree={showNotifyModal ? saree : null}
        selectedColor={activeColor}
        onClose={() => setShowNotifyModal(false)}
      />
    </div>
  );
};
