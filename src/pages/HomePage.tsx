import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Sparkles, ArrowRight, Eye, MessageCircle } from 'lucide-react';
import { SAREES_DATA, WEAVE_CATEGORIES, HERO_SAREE_IDS } from '../data/sareesData';
import { ProductCard } from '../components/ProductCard';
import { ReelModal } from '../components/ReelModal';
import { NotifyModal } from '../components/NotifyModal';
import { Saree } from '../types/saree';

export const HomePage: React.FC = () => {
  const [activeReelSaree, setActiveReelSaree] = useState<Saree | null>(null);
  const [notifySaree, setNotifySaree] = useState<{ saree: Saree; color: string } | null>(null);

  // Hero Sarees that have 10s video reels
  const heroReelSarees = SAREES_DATA.filter(s => HERO_SAREE_IDS.includes(s.id));
  const featuredSarees = SAREES_DATA.slice(0, 8);

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* 1. HERO SECTION WITH ON-MODEL AI DRAPE IMAGE */}
      <section className="relative bg-[#3B0F1E] text-[#FAF5EF] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heritage Copy */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D4AF37] text-xs font-semibold tracking-wider uppercase backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Generation Handloom Storefront</span>
            </div>

            <h1 className="font-serif-marcellus text-2xl sm:text-4xl lg:text-5xl tracking-tight leading-tight text-white max-w-2xl mx-auto lg:mx-0">
              Authentic Indian Handloom Sarees, Sourced Directly from the Loom.
            </h1>

            <p className="text-xs sm:text-base text-[#E5D7D9] leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
              Experience the gossamer drape of Maheshwari silk-cotton, the royal tapestry of Paithani, and the timeless pleats of Narayanpet. Verified yarn provenance, living artisan wages, and photorealistic AI draping.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <Link
                to="/shop"
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-[#D4AF37] text-[#1C1113] hover:bg-[#E5C378] active:scale-98 transition-all font-semibold text-xs tracking-wider uppercase flex items-center gap-2 shadow-md"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/tryon"
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg border border-white/30 text-white hover:bg-white/10 transition-colors text-xs font-medium tracking-wide flex items-center gap-2"
              >
                <Eye className="w-4 h-4 text-[#D4AF37]" />
                <span>See It On You</span>
              </Link>
            </div>

            {/* Micro Provenance Counter */}
            <div className="pt-6 border-t border-white/15 grid grid-cols-3 gap-3 sm:gap-6 text-center lg:text-left">
              <div>
                <span className="block font-serif-marcellus text-xl sm:text-2xl font-bold text-[#D4AF37] tabular-nums">4</span>
                <span className="text-[11px] sm:text-xs text-[#E5D7D9]">Weaving Clusters</span>
              </div>
              <div>
                <span className="block font-serif-marcellus text-xl sm:text-2xl font-bold text-[#D4AF37] tabular-nums">100%</span>
                <span className="text-[11px] sm:text-xs text-[#E5D7D9]">Loom Provenance</span>
              </div>
              <div>
                <span className="block font-serif-marcellus text-xl sm:text-2xl font-bold text-[#D4AF37] tabular-nums">48 hrs</span>
                <span className="text-[11px] sm:text-xs text-[#E5D7D9]">Express Dispatch</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card (Explicitly Contained Height) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-xs sm:max-w-sm rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-xl bg-stone-900 group">
              <img
                src="/images/hero_saree_maheshwari_chintamani_1792143902762.jpg"
                alt="Editorial portrait of model wearing Maheshwari Pure Silk Cotton Saree in Chintamani"
                className="w-full h-80 sm:h-96 md:h-[420px] object-cover transition-transform duration-500 group-hover:scale-103"
                referrerPolicy="no-referrer"
              />

              {/* Tag */}
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-xs text-[#FAF5EF] text-[10px] sm:text-[11px] font-medium px-2.5 py-1 rounded-sm flex items-center gap-1.5 border border-white/10">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>AI Editorial Preview</span>
              </div>

              {/* Bottom Saree Overlay Card */}
              <div className="absolute inset-x-3 bottom-3 p-3 sm:p-4 bg-black/85 backdrop-blur-md rounded-xl border border-white/15 space-y-1.5">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold">
                      Maheshwari Silk-Cotton
                    </span>
                    <h4 className="font-serif-marcellus text-sm sm:text-base text-white font-medium line-clamp-1">
                      Leaf Butti Chintamani Teal
                    </h4>
                  </div>
                  <span className="font-serif-marcellus text-sm sm:text-base text-[#D4AF37] font-bold tabular-nums">
                    Rs 6,080
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => setActiveReelSaree(SAREES_DATA.find(s => s.id === 1) || null)}
                    className="flex-1 py-1.5 sm:py-2 px-3 rounded-lg bg-[#D4AF37] text-[#1C1113] hover:bg-[#E5C378] text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Watch 10s Reel</span>
                  </button>
                  <Link
                    to="/product/maheshwari-leaf-butti-pure-silk-cotton-chintamani-1"
                    className="py-1.5 sm:py-2 px-3 rounded-lg bg-white/15 text-white hover:bg-white/25 text-[11px] font-medium transition-colors"
                  >
                    Shop Saree
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. "SAREES IN MOTION" REEL RAIL DIRECTLY UNDER HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#8B2E49]">
              <Play className="w-3.5 h-3.5 fill-current text-[#C59B27]" />
              <span>Sarees in Motion</span>
            </div>
            <h2 className="font-serif-marcellus text-xl sm:text-2xl lg:text-3xl text-[#3B0F1E] mt-0.5">
              Watch Every Weave Flow in 10 Seconds
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Tap any vertical reel to witness authentic handloom pallu movement, zari shimmer, and pleat fluidity.
            </p>
          </div>
          <Link
            to="/reels"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#8B2E49] hover:text-[#3B0F1E] transition-colors self-start sm:self-auto"
          >
            <span>View All Vertical Reels</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Horizontal Reel Rail (Strictly Sized) */}
        <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory">
          {heroReelSarees.map(saree => (
            <div
              key={saree.id}
              onClick={() => setActiveReelSaree(saree)}
              className="flex-none w-[130px] sm:w-[160px] md:w-[180px] h-[230px] sm:h-[280px] md:h-[310px] rounded-xl overflow-hidden relative cursor-pointer group shadow-xs hover:shadow-lg transition-all duration-200 border border-[#E8DEC8] snap-start bg-stone-900"
            >
              <img
                src={saree.aiModelPhotos?.[0] || saree.localImages?.[0] || ''}
                alt={saree.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
                loading="lazy"
              />

              {/* Play Badge */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                <div className="w-9 h-9 rounded-full bg-black/60 group-hover:bg-[#4A1525] text-white flex items-center justify-center backdrop-blur-xs transition-transform group-hover:scale-110 shadow-md">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5 text-[#D4AF37]" />
                </div>
              </div>

              {/* Bottom Vignette Info */}
              <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3 bg-gradient-to-t from-black/95 via-black/60 to-transparent text-white space-y-0.5">
                <span className="text-[9px] sm:text-[10px] text-[#D4AF37] font-medium tracking-wide uppercase">
                  {saree.weave}
                </span>
                <h4 className="font-serif-marcellus text-[11px] sm:text-xs text-white line-clamp-1">
                  {saree.name}
                </h4>
                <div className="flex items-center justify-between text-[10px] sm:text-[11px] pt-0.5">
                  <span className="font-semibold tabular-nums text-[#FAF5EF]">
                    Rs {saree.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[9px] text-stone-300">Watch</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SHOP BY WEAVE TILES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8B2E49]">
            Heritage Weaving Traditions
          </span>
          <h2 className="font-serif-marcellus text-2xl sm:text-3xl text-[#3B0F1E]">
            Shop by Signature Handloom Weave
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Each saree honors the distinctive weaving techniques and geographical identity of India’s artisanal centers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {WEAVE_CATEGORIES.map(category => (
            <Link
              key={category.slug}
              to={`/shop?weave=${category.name.replace(' Sarees', '')}`}
              className="group p-5 sm:p-6 rounded-xl border border-[#E8DEC8] bg-[#FAF6F0] hover:bg-[#F5EFE3] hover:border-[#8B2E49] transition-all flex flex-col justify-between space-y-3 hover:shadow-xs"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#8B2E49] font-medium">
                    {category.region}
                  </span>
                  <span className="text-[10px] sm:text-[11px] bg-[#E8DEC8] text-[#3B0F1E] font-semibold px-2 py-0.5 rounded-full tabular-nums">
                    {category.count} pieces
                  </span>
                </div>
                <h3 className="font-serif-marcellus text-lg sm:text-xl text-[#3B0F1E] group-hover:text-[#7A2740] transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {category.description}
                </p>
              </div>

              <div className="pt-2.5 border-t border-[#E8DEC8] flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px]">
                  From <strong className="text-[#3B0F1E] tabular-nums">Rs {category.startingPrice.toLocaleString('en-IN')}</strong>
                </span>
                <span className="text-[#8B2E49] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform text-[11px]">
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. "SEE IT ON YOU" VIRTUAL TRY-ON TEASER BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-[#4A1525] to-[#7A2740] text-white p-6 sm:p-10 relative overflow-hidden shadow-md">
          <div className="relative z-10 max-w-xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#D4AF37] text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Virtual Drape Studio</span>
            </span>
            <h2 className="font-serif-marcellus text-xl sm:text-3xl text-white leading-tight">
              Wondering How the Saree Falls on Your Height and Complexion?
            </h2>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-light">
              Select your height and skin tone, or upload your photo for an instant AI drape simulation. Zero photos stored; 100% ephemeral privacy guarantee.
            </p>
            <div className="pt-2">
              <Link
                to="/tryon"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#D4AF37] text-[#1C1113] hover:bg-[#E5C378] font-semibold text-xs tracking-wider uppercase transition-all shadow-sm"
              >
                <Eye className="w-4 h-4" />
                <span>Launch Virtual Try-On Studio</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CURATED FEATURED SAREES (RESPONSIVE 2-COL ON MOBILE, 3-COL TABLET, 4-COL DESKTOP) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8B2E49]">
              Handloom Highlights
            </span>
            <h2 className="font-serif-marcellus text-xl sm:text-2xl lg:text-3xl text-[#3B0F1E] mt-0.5">
              Curated Pieces from the Loom
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Each design groups color variants with live swatches and loom-to-you transparency.
            </p>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#8B2E49] hover:text-[#3B0F1E] transition-colors self-start sm:self-auto"
          >
            <span>View Full 57-Piece Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Responsive Grid: 2 columns on mobile, 3 on tablet, 4 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {featuredSarees.map(saree => (
            <ProductCard
              key={saree.id}
              saree={saree}
              onOpenNotifyModal={(s, color) => setNotifySaree({ saree: s, color })}
              onPlayReel={s => setActiveReelSaree(s)}
            />
          ))}
        </div>
      </section>

      {/* 6. WHATSAPP CONCIERGE CALLOUT */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-5 sm:p-6 rounded-xl border border-[#D5C9B3] bg-[#FAF6F0] flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-3 sm:gap-4 text-center sm:text-left">
            <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 sm:w-6 h-5 sm:h-6" />
            </div>
            <div>
              <h4 className="font-serif-marcellus text-sm sm:text-base text-[#3B0F1E] font-semibold">
                Need Help Choosing or Custom Blouse Guidance?
              </h4>
              <p className="text-xs text-slate-600">
                Chat with our handloom stylists directly on WhatsApp for drape videos and fabric swatches.
              </p>
            </div>
          </div>
          <a
            href="https://wa.me/919999999999?text=Hello%20Padmora!%20I%20would%20like%20guidance%20on%20choosing%20a%20handloom%20saree."
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 shadow-xs"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </section>

      {/* Modals */}
      <ReelModal saree={activeReelSaree} onClose={() => setActiveReelSaree(null)} />
      <NotifyModal
        saree={notifySaree?.saree || null}
        selectedColor={notifySaree?.color}
        onClose={() => setNotifySaree(null)}
      />
    </div>
  );
};
