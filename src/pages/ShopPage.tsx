import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Sparkles, RotateCcw, Search, Check } from 'lucide-react';
import { SAREES_DATA } from '../data/sareesData';
import { ProductCard } from '../components/ProductCard';
import { ReelModal } from '../components/ReelModal';
import { NotifyModal } from '../components/NotifyModal';
import { Saree } from '../types/saree';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialWeave = searchParams.get('weave') || 'All';

  const [selectedWeave, setSelectedWeave] = useState<string>(initialWeave);
  const [selectedOccasion, setSelectedOccasion] = useState<string>('All');
  const [selectedColor, setSelectedColor] = useState<string>('All');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'in-stock'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [activeReelSaree, setActiveReelSaree] = useState<Saree | null>(null);
  const [notifySaree, setNotifySaree] = useState<{ saree: Saree; color: string } | null>(null);

  // Weave list
  const weaves = ['All', 'Maheshwari', 'Paithani', 'Banarasi', 'Narayanpet'];
  const occasions = ['All', 'Wedding', 'Festive', 'Everyday Luxury'];
  const colors = ['All', 'Teal', 'Red', 'Yellow', 'Green', 'Maroon', 'Blue', 'Pink', 'Lavender'];

  // Filter logic
  const filteredSarees = useMemo(() => {
    return SAREES_DATA.filter(saree => {
      // Weave match
      if (selectedWeave !== 'All' && saree.weave.toLowerCase() !== selectedWeave.toLowerCase()) {
        return false;
      }
      // Occasion match
      if (selectedOccasion !== 'All') {
        const occ = (saree.occasion || '').toLowerCase();
        if (!occ.includes(selectedOccasion.toLowerCase())) return false;
      }
      // Color match
      if (selectedColor !== 'All') {
        const col = (saree.colour || '').toLowerCase();
        const hasVariantColor = saree.variants?.some(v =>
          (v.colorName || v.swatch || '').toLowerCase().includes(selectedColor.toLowerCase())
        );
        if (!col.includes(selectedColor.toLowerCase()) && !hasVariantColor) return false;
      }
      // In stock only
      if (inStockOnly && saree.stockStatus === 'Sold out') {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = saree.name.toLowerCase().includes(q);
        const matchWeave = saree.weave.toLowerCase().includes(q);
        const matchDesc = (saree.fiberContent || '').toLowerCase().includes(q);
        if (!matchName && !matchWeave && !matchDesc) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'in-stock') {
        const aRank = a.stockStatus === 'In stock' ? 2 : a.stockStatus === 'Low stock' ? 1 : 0;
        const bRank = b.stockStatus === 'In stock' ? 2 : b.stockStatus === 'Low stock' ? 1 : 0;
        return bRank - aRank;
      }
      return 0; // featured default
    });
  }, [selectedWeave, selectedOccasion, selectedColor, inStockOnly, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedWeave('All');
    setSelectedOccasion('All');
    setSelectedColor('All');
    setInStockOnly(false);
    setSearchQuery('');
    setSortBy('featured');
    setSearchParams({});
  };

  const hasActiveFilters =
    selectedWeave !== 'All' ||
    selectedOccasion !== 'All' ||
    selectedColor !== 'All' ||
    inStockOnly ||
    searchQuery.trim() !== '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title & Grouping Advantage Banner */}
      <div className="border-b border-[#E8DEC8] pb-6 space-y-3">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8B2E49]">
              <span>Handloom Catalog</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#C59B27]">Variant-Clustered Architecture</span>
            </div>
            <h1 className="font-serif-marcellus text-3xl sm:text-4xl text-[#3B0F1E] mt-1">
              Handcrafted Sarees
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Unlike the live store where every colour variation creates duplicate cards, our designs are unified into single cards with interactive shade swatches and live stock statuses.
            </p>
          </div>

          <div className="text-right text-xs text-slate-500">
            Showing <strong className="text-[#3B0F1E] tabular-nums font-semibold">{filteredSarees.length}</strong> of{' '}
            <span className="tabular-nums">{SAREES_DATA.length} pieces</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="bg-[#FAF6F0] p-4 rounded-xl border border-[#E8DEC8] space-y-4">
        {/* Top controls: Search + Weaves Segments + Sort */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Weave Segmented Buttons (Interactive Buttons per Constitution) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {weaves.map(weave => (
              <button
                key={weave}
                onClick={() => setSelectedWeave(weave)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  selectedWeave === weave
                    ? 'bg-[#4A1525] text-white shadow-xs font-semibold'
                    : 'bg-white text-slate-700 hover:bg-[#F2ECE1] border border-[#E8DEC8]'
                }`}
              >
                {weave}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="flex-1 max-w-sm relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by weave, motif, or color..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 border border-[#D5C9B3] rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#8B2E49]"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-slate-500 whitespace-nowrap">Sort:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="text-xs bg-white border border-[#D5C9B3] rounded-lg px-3 py-2 text-[#3B0F1E] font-medium focus:outline-none focus:ring-1 focus:ring-[#8B2E49]"
            >
              <option value="featured">Featured Handlooms</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="in-stock">In-Stock First</option>
            </select>
          </div>
        </div>

        {/* Secondary filters: Occasion, Color, In-Stock Toggle, Reset */}
        <div className="pt-3 border-t border-[#E8DEC8] flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            {/* Occasion Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Occasion:</span>
              <select
                value={selectedOccasion}
                onChange={e => setSelectedOccasion(e.target.value)}
                className="bg-white border border-[#D5C9B3] rounded px-2 py-1 text-slate-700"
              >
                {occasions.map(o => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>

            {/* Color Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Color:</span>
              <select
                value={selectedColor}
                onChange={e => setSelectedColor(e.target.value)}
                className="bg-white border border-[#D5C9B3] rounded px-2 py-1 text-slate-700"
              >
                {colors.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* In-stock toggle */}
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={e => setInStockOnly(e.target.checked)}
                className="rounded border-[#D5C9B3] text-[#4A1525] focus:ring-0"
              />
              <span className="text-slate-700 font-medium">In Stock Only (Hide Sold Out)</span>
            </label>
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-xs text-[#8B2E49] hover:text-[#3B0F1E] font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Catalog Grid */}
      {filteredSarees.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-[#E8DEC8] space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#FAF6F0] flex items-center justify-center mx-auto text-[#8B2E49]">
            <Filter className="w-5 h-5 opacity-40" />
          </div>
          <h3 className="font-serif-marcellus text-lg text-[#3B0F1E]">No Matching Handlooms Found</h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Try loosening your filters or resetting to view our full collection of Maheshwari, Paithani, and Narayanpet sarees.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-[#4A1525] text-white rounded-lg text-xs font-semibold hover:bg-[#3B0F1E] transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {filteredSarees.map(saree => (
            <ProductCard
              key={saree.id}
              saree={saree}
              onOpenNotifyModal={(s, col) => setNotifySaree({ saree: s, color: col })}
              onPlayReel={s => setActiveReelSaree(s)}
            />
          ))}
        </div>
      )}

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
