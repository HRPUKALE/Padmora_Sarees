import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, HeartHandshake, Truck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2D0D17] text-[#FAF5EF] pt-16 pb-12 border-t border-[#4A1525]">
      {/* 4 Trust Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start space-y-2">
            <HeartHandshake className="w-6 h-6 text-[#D4AF37]" />
            <h4 className="font-semibold text-sm text-[#FAF5EF]">Loom-to-You Direct</h4>
            <p className="text-xs text-[#E5D7D9] leading-relaxed">
              Ethically sourced with zero middlemen from weaver clusters in Maheshwar, Yeola, and Narayanpet.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start space-y-2">
            <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />
            <h4 className="font-semibold text-sm text-[#FAF5EF]">Certified Authenticity</h4>
            <p className="text-xs text-[#E5D7D9] leading-relaxed">
              Silk Mark & Handloom Mark certified silks with transparent yarn-count disclosures.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start space-y-2">
            <Truck className="w-6 h-6 text-[#D4AF37]" />
            <h4 className="font-semibold text-sm text-[#FAF5EF]">Express Dispatch</h4>
            <p className="text-xs text-[#E5D7D9] leading-relaxed">
              Safely packed in breathable muslin saree bags, dispatched within 48 hours with door-to-door tracking.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start space-y-2">
            <Sparkles className="w-6 h-6 text-[#D4AF37]" />
            <h4 className="font-semibold text-sm text-[#FAF5EF]">Artisanal Previews</h4>
            <p className="text-xs text-[#E5D7D9] leading-relaxed">
              High-fidelity editorial drape previews and vertical motion reels to see true drape before you buy.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#D4AF37] text-[#2D0D17] flex items-center justify-center font-bold font-serif-marcellus">
              P
            </div>
            <div>
              <h3 className="font-serif-marcellus text-xl tracking-wide text-white">Padmora</h3>
              <p className="text-[10px] tracking-widest uppercase text-[#D4AF37]">Sarees by Yashi</p>
            </div>
          </div>
          <p className="text-xs text-[#E5D7D9] leading-relaxed">
            Preserving centuries of Indian handloom heritage through honest provenance, fair artisan compensation, and modern drape technology.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-3">Our Handloom Weaves</h4>
          <ul className="space-y-2 text-xs text-[#E5D7D9]">
            <li><Link to="/shop?weave=Maheshwari" className="hover:text-white transition-colors">Maheshwari Silk-Cotton</Link></li>
            <li><Link to="/shop?weave=Paithani" className="hover:text-white transition-colors">Pure Silk Paithani</Link></li>
            <li><Link to="/shop?weave=Banarasi" className="hover:text-white transition-colors">Banarasi Katan Silk</Link></li>
            <li><Link to="/shop?weave=Narayanpet" className="hover:text-white transition-colors">Narayanpet Temple Border</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-3">Demo Navigation</h4>
          <ul className="space-y-2 text-xs text-[#E5D7D9]">
            <li><Link to="/shop" className="hover:text-white transition-colors">Full Catalog (Color Grouped)</Link></li>
            <li><Link to="/reels" className="hover:text-white transition-colors">Sarees in Motion (10s Vertical Reels)</Link></li>
            <li><Link to="/tryon" className="hover:text-white transition-colors">Virtual Drape Try-On Studio</Link></li>
            <li><Link to="/pitch" className="text-[#E5C378] font-semibold hover:underline">Founder Pitch & Benchmark Report</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-3">Ethical Pitch Disclosure</h4>
          <div className="bg-[#3D1421] p-3 rounded-lg border border-[#5C1B2F] text-xs text-[#E5D7D9] space-y-2">
            <p className="font-medium text-white">Concept Demo for Padmora</p>
            <p className="text-[11px] leading-relaxed opacity-90">
              This application is an independent concept demonstration engineered to showcase next-generation conversion improvements for Padmora Sarees by Yashi. Not the live production store. All AI media tagged.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-[#E5D7D9] gap-4">
        <div>
          © {new Date().getFullYear()} Padmora Sarees by Yashi Pitch Demo. All rights reserved.
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span>Heritage Handloom Initiative</span>
          <span>·</span>
          <Link to="/pitch" className="text-[#D4AF37] hover:underline">View Benchmark Pitch</Link>
        </div>
      </div>
    </footer>
  );
};
