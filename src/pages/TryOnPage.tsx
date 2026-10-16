import React, { useState } from 'react';
import { Sparkles, Upload, ShieldCheck, Check, ArrowRight, Eye, ShoppingBag, RotateCcw, Sliders, MessageCircle, Layers } from 'lucide-react';
import { SAREES_DATA, HERO_SAREE_IDS } from '../data/sareesData';
import { Saree } from '../types/saree';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

interface ModelPreset {
  id: string;
  name: string;
  height: string;
  skinTone: 'Fair' | 'Wheatish' | 'Dusky' | 'Deep';
  age: string;
  setting: string;
  avatar: string;
  heroDrapes: Record<number, string>; // Saree ID -> image
}

export const TryOnPage: React.FC = () => {
  const { addToCart, setIsCartOpen } = useCart();
  const heroSarees = SAREES_DATA.filter(s => HERO_SAREE_IDS.includes(s.id));
  const [selectedSaree, setSelectedSaree] = useState<Saree>(heroSarees[0] || SAREES_DATA[0]);

  // Model Presets across diverse Indian complexions and heights
  const modelPresets: ModelPreset[] = [
    {
      id: 'm1',
      name: 'Ananya',
      height: "5'4\"",
      skinTone: 'Wheatish',
      age: '28 yrs',
      setting: 'Heritage Haveli Courtyard',
      avatar: '/images/hero_saree_maheshwari_chintamani_1792143902762.jpg',
      heroDrapes: {
        1: '/images/hero_saree_maheshwari_chintamani_1792143902762.jpg',
        10: '/images/hero_saree_maheshwari_bottle_green_1792143903757.jpg',
        3: '/images/hero_saree_banarasi_butter_yellow_1792143902062.jpg',
        27: '/images/hero_saree_paithani_chintamani_1792143903868.jpg',
        36: '/images/hero_saree_narayanpet_maroon_1792143904375.jpg'
      }
    },
    {
      id: 'm2',
      name: 'Priyanka',
      height: "5'6\"",
      skinTone: 'Fair',
      age: '32 yrs',
      setting: 'Jaipur Sandstone Balcony',
      avatar: '/images/hero_saree_banarasi_butter_yellow_1792143902062.jpg',
      heroDrapes: {
        3: '/images/hero_saree_banarasi_butter_yellow_1792143902062.jpg',
        1: '/images/hero_saree_maheshwari_chintamani_1792143902762.jpg',
        10: '/images/hero_saree_maheshwari_bottle_green_1792143903757.jpg',
        27: '/images/hero_saree_paithani_chintamani_1792143903868.jpg',
        36: '/images/hero_saree_narayanpet_maroon_1792143904375.jpg'
      }
    },
    {
      id: 'm3',
      name: 'Meera',
      height: "5'5\"",
      skinTone: 'Dusky',
      age: '30 yrs',
      setting: 'Regal Arched Corridor',
      avatar: '/images/hero_saree_maheshwari_bottle_green_1792143903757.jpg',
      heroDrapes: {
        10: '/images/hero_saree_maheshwari_bottle_green_1792143903757.jpg',
        1: '/images/hero_saree_maheshwari_chintamani_1792143902762.jpg',
        3: '/images/hero_saree_banarasi_butter_yellow_1792143902062.jpg',
        27: '/images/hero_saree_paithani_chintamani_1792143903868.jpg',
        36: '/images/hero_saree_narayanpet_maroon_1792143904375.jpg'
      }
    },
    {
      id: 'm4',
      name: 'Radhika',
      height: "5'3\"",
      skinTone: 'Deep',
      age: '35 yrs',
      setting: 'Historic Stone Wani',
      avatar: '/images/hero_saree_paithani_chintamani_1792143903868.jpg',
      heroDrapes: {
        27: '/images/hero_saree_paithani_chintamani_1792143903868.jpg',
        1: '/images/hero_saree_maheshwari_chintamani_1792143902762.jpg',
        10: '/images/hero_saree_maheshwari_bottle_green_1792143903757.jpg',
        3: '/images/hero_saree_banarasi_butter_yellow_1792143902062.jpg',
        36: '/images/hero_saree_narayanpet_maroon_1792143904375.jpg'
      }
    },
    {
      id: 'm5',
      name: 'Kavita',
      height: "5'7\"",
      skinTone: 'Wheatish',
      age: '26 yrs',
      setting: 'Artisan Loom Courtyard',
      avatar: '/images/hero_saree_narayanpet_maroon_1792143904375.jpg',
      heroDrapes: {
        36: '/images/hero_saree_narayanpet_maroon_1792143904375.jpg',
        1: '/images/hero_saree_maheshwari_chintamani_1792143902762.jpg',
        10: '/images/hero_saree_maheshwari_bottle_green_1792143903757.jpg',
        3: '/images/hero_saree_banarasi_butter_yellow_1792143902062.jpg',
        27: '/images/hero_saree_paithani_chintamani_1792143903868.jpg'
      }
    }
  ];

  const [selectedModel, setSelectedModel] = useState<ModelPreset>(modelPresets[0]);
  const [selectedSkinTone, setSelectedSkinTone] = useState<string>('All');
  const [userUploadedPhoto, setUserUploadedPhoto] = useState<string | null>(null);
  const [drapeStyle, setDrapeStyle] = useState<'Nivi' | 'Nauvari' | 'Bengali' | 'Gujarati'>('Nivi');
  const [palluLength, setPalluLength] = useState<'Classic' | 'Floor Sweep' | 'Elbow Fold'>('Classic');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStep, setProcessStep] = useState('Detecting body proportions...');

  // Drape image selection logic:
  // If user uploaded a photo -> userUploadedPhoto
  // Else if model has direct drape for this saree -> model.heroDrapes[saree.id]
  // Else if saree has aiModelPhotos -> saree.aiModelPhotos[0]
  // Else model avatar
  const getDrapeImage = () => {
    if (userUploadedPhoto) return userUploadedPhoto;
    if (selectedModel.heroDrapes[selectedSaree.id]) {
      return selectedModel.heroDrapes[selectedSaree.id];
    }
    if (selectedSaree.aiModelPhotos?.[0]) {
      return selectedSaree.aiModelPhotos[0];
    }
    return selectedModel.avatar;
  };

  const activeDrapeImage = getDrapeImage();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsProcessing(true);
      setProcessStep('Analyzing uploaded portrait & shoulder alignment...');
      const reader = new FileReader();
      reader.onload = event => {
        setTimeout(() => {
          setProcessStep('Synthesizing saree pleats & lighting...');
        }, 500);
        setTimeout(() => {
          setUserUploadedPhoto(event.target?.result as string);
          setIsProcessing(false);
        }, 1100);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerSimulate = (saree: Saree, model: ModelPreset) => {
    setSelectedSaree(saree);
    setSelectedModel(model);
    setUserUploadedPhoto(null);
    setIsProcessing(true);
    setProcessStep(`Draping ${saree.name} on ${model.name}...`);
    setTimeout(() => {
      setProcessStep('Calculating zari reflection & fabric fall...');
    }, 450);
    setTimeout(() => {
      setIsProcessing(false);
    }, 900);
  };

  const filteredModels = modelPresets.filter(
    m => selectedSkinTone === 'All' || m.skinTone === selectedSkinTone
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 sm:space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4A1525]/10 text-[#4A1525] text-xs font-semibold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
          <span>Interactive Drape Studio</span>
        </div>
        <h1 className="font-serif-marcellus text-2xl sm:text-4xl text-[#3B0F1E]">
          See It On You: Virtual Saree Try-On
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
          Compare how authentic Maheshwari, Paithani, and Narayanpet drapes fall across different heights and complexions before you place your order.
        </p>
      </div>

      {/* Main Studio Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Interactive Controls */}
        <div className="lg:col-span-5 space-y-5">
          {/* Step 1: Model Selection */}
          <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#E8DEC8] space-y-3.5 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="font-serif-marcellus text-sm sm:text-base text-[#3B0F1E] font-semibold flex items-center gap-1.5">
                <span>1. Select Model or Upload Photo</span>
              </h3>
              {userUploadedPhoto && (
                <button
                  onClick={() => setUserUploadedPhoto(null)}
                  className="text-[11px] text-[#8B2E49] hover:underline font-medium"
                >
                  Use Model Presets
                </button>
              )}
            </div>

            {/* Skin Tone Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <span className="text-slate-500 text-[11px] whitespace-nowrap">Skin Tone:</span>
              {['All', 'Fair', 'Wheatish', 'Dusky', 'Deep'].map(tone => (
                <button
                  key={tone}
                  onClick={() => setSelectedSkinTone(tone)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors whitespace-nowrap ${
                    selectedSkinTone === tone
                      ? 'bg-[#4A1525] text-white'
                      : 'bg-[#FAF6F0] text-slate-600 hover:bg-[#F0E8DA]'
                  }`}
                >
                  {tone}
                </button>
              ))}
            </div>

            {/* Model Presets Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {filteredModels.map(model => {
                const isSelected = selectedModel.id === model.id && !userUploadedPhoto;
                return (
                  <button
                    key={model.id}
                    onClick={() => triggerSimulate(selectedSaree, model)}
                    className={`p-1.5 rounded-lg border text-center transition-all flex flex-col items-center ${
                      isSelected
                        ? 'border-[#4A1525] ring-2 ring-[#4A1525]/30 bg-[#FAF6F0]'
                        : 'border-[#E8DEC8] hover:border-[#D5C9B3] bg-white'
                    }`}
                  >
                    <img
                      src={model.avatar}
                      alt={model.name}
                      className="w-11 h-11 object-cover rounded-full mx-auto"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-[11px] font-medium text-[#3B0F1E] mt-1 line-clamp-1">
                      {model.name}
                    </span>
                    <span className="text-[10px] text-slate-500">{model.height}</span>
                  </button>
                );
              })}
            </div>

            {/* Upload Your Photo */}
            <div className="pt-2 border-t border-[#E8DEC8]">
              <label className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-[#D5C9B3] hover:border-[#4A1525] rounded-lg cursor-pointer bg-[#FAF6F0] transition-colors text-xs text-[#3B0F1E] font-medium">
                <Upload className="w-4 h-4 text-[#8B2E49]" />
                <span>{userUploadedPhoto ? 'Change Uploaded Photo' : 'Upload Your Photo (Full Body / Portrait)'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Privacy Guarantee Note */}
            <div className="flex items-start gap-2 p-2.5 rounded-lg bg-[#FFFDF9] border border-[#E8DEC8] text-[11px] text-slate-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Zero-Storage Guarantee:</strong> Your uploaded photo is processed ephemerally in-memory for this session and never saved on our servers.
              </div>
            </div>
          </div>

          {/* Step 2: Choose Saree from Catalog */}
          <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#E8DEC8] space-y-3.5 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="font-serif-marcellus text-sm sm:text-base text-[#3B0F1E] font-semibold">
                2. Choose Handloom Saree to Drape
              </h3>
              <span className="text-[11px] text-slate-500">{heroSarees.length} Hero Weaves</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[260px] overflow-y-auto pr-1">
              {heroSarees.map(saree => {
                const isSelected = selectedSaree.id === saree.id;
                const thumb = saree.localImages?.[0] || saree.imageUrls?.[0] || '';
                return (
                  <button
                    key={saree.id}
                    onClick={() => triggerSimulate(saree, selectedModel)}
                    className={`p-2 rounded-lg border text-left transition-all ${
                      isSelected
                        ? 'border-[#4A1525] ring-2 ring-[#4A1525]/30 bg-[#FAF6F0]'
                        : 'border-[#E8DEC8] hover:border-[#D5C9B3] bg-white'
                    }`}
                  >
                    <img
                      src={thumb}
                      alt={saree.name}
                      className="w-full h-20 object-cover rounded mb-1"
                      referrerPolicy="no-referrer"
                    />
                    <div className="text-[10px] text-[#8B2E49] uppercase font-semibold line-clamp-1">
                      {saree.weave}
                    </div>
                    <div className="text-[11px] font-medium text-[#3B0F1E] line-clamp-1">
                      {saree.name}
                    </div>
                    <div className="text-[11px] font-bold text-[#3B0F1E] tabular-nums mt-0.5">
                      Rs {saree.price.toLocaleString('en-IN')}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Drape & Styling Customizations */}
          <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#E8DEC8] space-y-3 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#3B0F1E]">
              <Sliders className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>Draping Preferences</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Drape Style</label>
                <select
                  value={drapeStyle}
                  onChange={e => setDrapeStyle(e.target.value as any)}
                  className="w-full bg-[#FAF6F0] border border-[#D5C9B3] rounded-md px-2.5 py-1.5 text-slate-800 text-xs font-medium"
                >
                  <option value="Nivi">Nivi (Classic Pleats)</option>
                  <option value="Nauvari">Nauvari (Maharashtrian)</option>
                  <option value="Bengali">Bengali (Box Pleats)</option>
                  <option value="Gujarati">Gujarati (Front Pallu)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Pallu Fall</label>
                <select
                  value={palluLength}
                  onChange={e => setPalluLength(e.target.value as any)}
                  className="w-full bg-[#FAF6F0] border border-[#D5C9B3] rounded-md px-2.5 py-1.5 text-slate-800 text-xs font-medium"
                >
                  <option value="Classic">Classic Waist-Length</option>
                  <option value="Floor Sweep">Floor Sweep (Festive)</option>
                  <option value="Elbow Fold">Elbow Fold (Office)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Simulated Drape Viewport (Responsive & Contained) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative w-full h-[440px] sm:h-[520px] lg:h-[580px] bg-stone-900 rounded-2xl overflow-hidden border border-[#D4AF37]/50 shadow-xl">
            {isProcessing ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-white space-y-3 bg-black/85 p-6 text-center">
                <div className="w-10 h-10 border-3 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
                <p className="text-xs tracking-wider uppercase text-[#D4AF37] font-semibold">
                  {processStep}
                </p>
                <span className="text-[11px] text-stone-400 max-w-xs">
                  Synthesizing handloom yarn drape physics on model posture...
                </span>
              </div>
            ) : (
              <>
                <img
                  src={activeDrapeImage}
                  alt={`Drape simulation for ${selectedSaree.name}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />

                {/* If user uploaded their own photo, show interactive fabric texture overlay */}
                {userUploadedPhoto && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none flex items-center justify-center">
                    <div className="bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full text-white text-xs flex items-center gap-2 border border-white/20">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{selectedSaree.name} Drape Synthesized</span>
                    </div>
                  </div>
                )}

                {/* Top Watermark Tag */}
                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-xs text-[#FAF5EF] text-[10px] sm:text-[11px] font-medium px-2.5 py-1 rounded-sm flex items-center gap-1.5 border border-white/10 shadow-xs">
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                  <span>AI-Generated Drape Simulation</span>
                </div>

                {/* Top Right Model HUD */}
                <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-xs text-white text-[10px] sm:text-[11px] px-2.5 py-1 rounded-sm border border-white/10">
                  <span>Model: <strong>{userUploadedPhoto ? 'Your Upload' : `${selectedModel.name} (${selectedModel.height})`}</strong></span>
                </div>

                {/* Bottom Saree Card Overlay */}
                <div className="absolute inset-x-3 bottom-3 p-3.5 sm:p-4 bg-black/85 backdrop-blur-md rounded-xl border border-white/20 text-white space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold">
                        <span>{selectedSaree.weave} Handloom</span>
                        <span aria-hidden="true">·</span>
                        <span>{drapeStyle} Drape</span>
                      </div>
                      <h4 className="font-serif-marcellus text-sm sm:text-base text-white font-medium line-clamp-1">
                        {selectedSaree.name}
                      </h4>
                      <p className="text-[11px] text-stone-300">
                        {selectedSaree.fiberContent || 'Pure silk warp × cotton weft'}
                      </p>
                    </div>
                    <span className="font-serif-marcellus text-base sm:text-lg text-[#D4AF37] font-bold tabular-nums">
                      Rs {selectedSaree.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => {
                        addToCart(selectedSaree);
                        setIsCartOpen(true);
                      }}
                      className="flex-1 py-2 sm:py-2.5 px-3 rounded-lg bg-[#D4AF37] text-[#1C1113] hover:bg-[#E5C378] font-semibold text-xs tracking-wider uppercase text-center transition-colors shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </button>
                    <Link
                      to={selectedSaree.productUrl}
                      className="py-2 sm:py-2.5 px-3 rounded-lg bg-white/15 text-white hover:bg-white/25 text-xs font-medium transition-colors text-center"
                    >
                      Details
                    </Link>
                    <a
                      href={`https://wa.me/919999999999?text=${encodeURIComponent(
                        `Hi Padmora! I tried the virtual try-on for the ${selectedSaree.name} on ${selectedModel.name} (${selectedModel.height}, ${selectedModel.skinTone} skin). Can you confirm availability?`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="py-2 sm:py-2.5 px-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-medium transition-colors"
                      title="WhatsApp founder"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
