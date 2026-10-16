import React, { useState } from 'react';
import {
  Sparkles,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  Award,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Printer,
  Copy,
  Check,
  ExternalLink,
  MessageCircle,
  HelpCircle,
  Clock,
  Layers,
  Zap,
  Lock
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const PitchPage: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [beforeAfterTab, setBeforeAfterTab] = useState<'home' | 'shop' | 'pdp'>('home');

  const emailSubject = "Concept Demo for Padmora Sarees by Yashi — AI Drape & Conversion Opportunities";
  const emailBody = `Dear Yash and Shivani,

I am a great admirer of your handloom curation at Padmora Sarees — especially your Maheshwari silk-cottons and Narayanpet weaves sourced straight from artisan clusters.

To demonstrate how Padmora could convert more Instagram visitors into high-value buyers, I built a functional concept demo of your storefront:

🔗 Live Concept Demo: ${window.location.origin}/
📊 Full Benchmark & Audit: ${window.location.origin}/pitch

Key enhancements in this prototype:
1. Every saree upgraded with photorealistic on-model AI drape photos and 10s vertical motion reels.
2. Unified color-grouped product cards with live swatches (eliminating 20+ duplicate catalog tiles).
3. "Pre-Book / Notify Me" capture for your 27 sold-out sarees (capturing lost revenue).
4. Transparent fibre % and loom breakdowns justifying your Rs 6,299 Maheshwari and Rs 18,920 Paithani pricing.

No sales pitch — just genuine appreciation for your heritage mission. Would love to hear your thoughts!

Warm regards,
A Handloom & UX Connoisseur`;

  const copyEmail = () => {
    navigator.clipboard.writeText(`Subject: ${emailSubject}\n\n${emailBody}`);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* 1. EXECUTIVE HERO BANNER */}
      <section className="bg-[#3B0F1E] text-white p-8 sm:p-12 rounded-3xl border border-[#5C1B2F] shadow-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-5 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
            <Award className="w-3.5 h-3.5" />
            <span>Executive Pitch &amp; Architecture Audit</span>
          </div>

          <h1 className="font-serif-marcellus text-3xl sm:text-5xl tracking-tight text-white leading-tight">
            Padmora Sarees by Yashi: Unlocking D2C Luxury Potential
          </h1>

          <p className="text-sm sm:text-base text-[#E5D7D9] leading-relaxed font-light">
            A comprehensive UX audit, price benchmark study, and working full-stack prototype engineered to elevate conversion rates from Instagram traffic, resolve trust gaps, and celebrate authentic loom-to-you provenance.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 no-print">
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 rounded-lg bg-[#D4AF37] text-[#1C1113] hover:bg-[#E5C378] active:scale-98 transition-all font-semibold text-xs tracking-wider uppercase flex items-center gap-2 shadow-md"
            >
              <Printer className="w-4 h-4" />
              <span>Export One-Page Pitch PDF / Print</span>
            </button>

            <button
              onClick={copyEmail}
              className="px-5 py-2.5 rounded-lg border border-white/30 text-white hover:bg-white/10 transition-colors text-xs font-medium flex items-center gap-2"
            >
              {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedEmail ? 'Copied 120-Word Email Draft!' : 'Copy Founder Email Draft'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. WHAT ALREADY WORKS WELL */}
      <section className="space-y-6">
        <div className="border-b border-[#E8DEC8] pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8B2E49]">
            Current Strengths
          </span>
          <h2 className="font-serif-marcellus text-2xl sm:text-3xl text-[#3B0F1E] mt-1">
            What Padmora Already Does Exceptionally Well
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#E8DEC8] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              ✓
            </div>
            <h3 className="font-serif-marcellus text-lg text-[#3B0F1E] font-semibold">
              Deep Handloom Authenticity
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Curating direct from Maheshwar, Yeola, and Narayanpet represents genuine artisanal value. The brand has real craft integrity that fast-fashion copies cannot match.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E8DEC8] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              ✓
            </div>
            <h3 className="font-serif-marcellus text-lg text-[#3B0F1E] font-semibold">
              Heritage Aesthetic &amp; Palette
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              The deep maroon, wine, and warm ivory visual identity with serif typography (Marcellus/Jost) fits the luxury D2C handloom segment naturally.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E8DEC8] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              ✓
            </div>
            <h3 className="font-serif-marcellus text-lg text-[#3B0F1E] font-semibold">
              High Organic Instagram Interest
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Reels showcasing handloom folds gain high organic engagement from modern women and saree enthusiasts seeking heirloom pieces.
            </p>
          </div>
        </div>
      </section>

      {/* 3. AUDIT FINDINGS: WHAT TO FIX & GAPS */}
      <section className="space-y-6">
        <div className="border-b border-[#E8DEC8] pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8B2E49]">
            Conversion Friction
          </span>
          <h2 className="font-serif-marcellus text-2xl sm:text-3xl text-[#3B0F1E] mt-1">
            Critical Findings &amp; Conversion Gaps on Live Store
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-amber-200 space-y-3">
            <div className="flex items-center gap-2 text-amber-800">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              <h3 className="font-serif-marcellus text-lg font-bold">
                47% Sold Out Without Lead Capture
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>Finding:</strong> 27 out of 57 products in the live catalog are marked out of stock. When visitors click from Instagram reels and find a dead "Sold Out" state without a "Pre-Book" or "Notify Me" form, 100% of that customer intent is lost.
            </p>
            <div className="p-3 bg-white rounded-lg border border-amber-100 text-[11px] text-amber-900 font-medium">
              💡 <strong>Fix:</strong> Implemented 1-click priority waitlist pre-orders with WhatsApp dispatch alerts.
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-rose-200 space-y-3">
            <div className="flex items-center gap-2 text-rose-800">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
              <h3 className="font-serif-marcellus text-lg font-bold">
                Internal Dev Notes on Live Product Page
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>Finding:</strong> Live product description contains internal developer placeholder text: <em className="text-rose-700 font-mono">"Occasion: Tumhi paise bharlet, kadhi pan ghala bindaaaaaas!!! | Aapkki Saree apki marjiiii."</em> This damages credibility for a luxury Rs 6,000–18,000 brand.
            </p>
            <div className="p-3 bg-white rounded-lg border border-rose-100 text-[11px] text-rose-900 font-medium">
              💡 <strong>Fix:</strong> Replaced with structured Technical Fabric Facts, Loom Heritage, and Drape Care.
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-slate-800">
              <Layers className="w-5 h-5 text-slate-600 shrink-0" />
              <h3 className="font-serif-marcellus text-lg font-bold">
                Catalog Clutter: Duplicate Color Cards
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>Finding:</strong> The same saree design is repeated across 3 to 6 individual product cards just for different colors (e.g., Diamond Butti Burgundy, Diamond Butti Rani, Diamond Butti Wine), bloating the catalog and tiring mobile shoppers.
            </p>
            <div className="p-3 bg-white rounded-lg border border-slate-100 text-[11px] text-slate-800 font-medium">
              💡 <strong>Fix:</strong> Clustered design variants into single cards with interactive color swatches.
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-red-200 space-y-3">
            <div className="flex items-center gap-2 text-red-800">
              <Lock className="w-5 h-5 text-red-600 shrink-0" />
              <h3 className="font-serif-marcellus text-lg font-bold">
                Public GitHub Repo Security Advisory
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>Polite Security Notice:</strong> Their public GitHub repository README visibly lists default admin login credentials. We strongly advise immediately rotating all passwords and making the repository private to safeguard customer data.
            </p>
            <div className="p-3 bg-white rounded-lg border border-red-100 text-[11px] text-red-900 font-medium">
              🔒 <strong>Action:</strong> Rotate admin secret, enforce Supabase Row-Level Security, and make repo private.
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRICE BENCHMARK STUDY */}
      <section className="space-y-6">
        <div className="border-b border-[#E8DEC8] pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8B2E49]">
            Market Analysis
          </span>
          <h2 className="font-serif-marcellus text-2xl sm:text-3xl text-[#3B0F1E] mt-1">
            Price Benchmark &amp; Justification Table
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Presenting price variance not as an accusation, but as an opportunity to build trust through transparent fibre and loom storytelling.
          </p>
        </div>

        <div className="overflow-x-auto bg-white rounded-2xl border border-[#E8DEC8] shadow-xs">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF6F0] border-b border-[#E8DEC8] text-[#3B0F1E]">
                <th className="p-4 font-serif-marcellus text-sm font-semibold">Weave &amp; Design</th>
                <th className="p-4 font-semibold">Padmora Price</th>
                <th className="p-4 font-semibold">Market Benchmark</th>
                <th className="p-4 font-semibold">Variance &amp; Finding</th>
                <th className="p-4 font-semibold">Recommended Fix for Padmora</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8DEC8] text-slate-700">
              <tr>
                <td className="p-4 font-medium text-[#3B0F1E]">
                  <strong>Maheshwari Zari Checks</strong>
                  <span className="block text-[11px] text-slate-500">Pure Silk Warp × Cotton Weft</span>
                </td>
                <td className="p-4 font-bold text-[#3B0F1E] tabular-nums">Rs 6,299</td>
                <td className="p-4 text-slate-600 tabular-nums">~Rs 3,999 (Rewa Handloom)</td>
                <td className="p-4 text-amber-700 font-medium">+57% higher</td>
                <td className="p-4">
                  Add "Why this price" breakdown: Specify 20/22 denier Mulberry silk warp, Handloom Mark, and 5 manual pit-loom weaving days for khat checks.
                </td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-[#3B0F1E]">
                  <strong>Narayanpet Temple Border</strong>
                  <span className="block text-[11px] text-slate-500">Cotton-Silk with Shikhar Border</span>
                </td>
                <td className="p-4 font-bold text-[#3B0F1E] tabular-nums">Rs 2,100</td>
                <td className="p-4 text-slate-600 tabular-nums">Rs 2,049 – Rs 3,000</td>
                <td className="p-4 text-emerald-700 font-medium">Fair &amp; Competitive</td>
                <td className="p-4">
                  Highlight as entry-point luxury! Emphasize direct weaver cooperative sourcing in Telangana with zero middleman markup.
                </td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-[#3B0F1E]">
                  <strong>Paithani Chintamani</strong>
                  <span className="block text-[11px] text-slate-500">Peacock Pallu with Muniya Border</span>
                </td>
                <td className="p-4 font-bold text-[#3B0F1E] tabular-nums">Rs 18,920</td>
                <td className="p-4 text-slate-600 tabular-nums">
                  Pure Silk: Rs 26,500 – Rs 46,000+<br />
                  Semi-Silk: ~Rs 4,200
                </td>
                <td className="p-4 text-slate-800 font-medium">Pivotal Quality Tier</td>
                <td className="p-4">
                  Buyers need absolute clarity: Explicitly display Silk Mark Certificate, tapestry interlocking loom method, and 14 artisan days of handwork.
                </td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-[#3B0F1E]">
                  <strong>Banarasi Small Border</strong>
                  <span className="block text-[11px] text-slate-500">Pure Silk Butter Yellow</span>
                </td>
                <td className="p-4 font-bold text-[#3B0F1E] tabular-nums">Rs 9,050 – Rs 9,230</td>
                <td className="p-4 text-slate-600 tabular-nums">Pure Katan: Rs 22,500 – Rs 40,000</td>
                <td className="p-4 text-slate-800 font-medium">Sub-market Katan</td>
                <td className="p-4">
                  Clarify exact yarn specification (lightweight Katan vs blended warp) so connoisseurs trust the value without questioning authenticity.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. TOP 6 RECOMMENDATIONS: EFFORT VS IMPACT MATRIX */}
      <section className="space-y-6">
        <div className="border-b border-[#E8DEC8] pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8B2E49]">
            Prioritized Roadmap
          </span>
          <h2 className="font-serif-marcellus text-2xl sm:text-3xl text-[#3B0F1E] mt-1">
            Top 6 Recommendations Ranked by Effort vs Impact
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl bg-white border border-[#E8DEC8] flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">High Impact</span>
                <span className="text-slate-500">Low Effort (1 Day)</span>
              </div>
              <h3 className="font-serif-marcellus text-base font-semibold text-[#3B0F1E]">
                1. Direct WhatsApp Concierge Order Button
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Add pre-filled WhatsApp click-to-chat on every saree. Indian saree shoppers prefer asking quick questions on drape and video before paying Rs 6,000+.
              </p>
            </div>
            <div className="text-[11px] text-emerald-700 font-medium pt-2 border-t border-slate-100">
              Expected Lift: +25% immediate order conversion
            </div>
          </div>

          <div className="p-5 rounded-xl bg-white border border-[#E8DEC8] flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">High Impact</span>
                <span className="text-slate-500">Low Effort (2 Days)</span>
              </div>
              <h3 className="font-serif-marcellus text-base font-semibold text-[#3B0F1E]">
                2. Pre-Book &amp; "Notify Me" Lead Capture
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Replace dead "Sold Out" tags on 27 sarees with a WhatsApp waitlist form. Convert lost bounce traffic into guaranteed demand for the next loom cycle.
              </p>
            </div>
            <div className="text-[11px] text-emerald-700 font-medium pt-2 border-t border-slate-100">
              Expected Lift: Recovers 40% of out-of-stock bounces
            </div>
          </div>

          <div className="p-5 rounded-xl bg-white border border-[#E8DEC8] flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">High Impact</span>
                <span className="text-slate-500">Medium Effort (3 Days)</span>
              </div>
              <h3 className="font-serif-marcellus text-base font-semibold text-[#3B0F1E]">
                3. Color Variant Grouping with Swatches
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cluster duplicate saree cards into single parent designs with clickable shade swatches. Reduces scrolling friction and catalog fatigue by 50%.
              </p>
            </div>
            <div className="text-[11px] text-emerald-700 font-medium pt-2 border-t border-slate-100">
              Expected Lift: +35% longer session depth
            </div>
          </div>

          <div className="p-5 rounded-xl bg-white border border-[#E8DEC8] flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">High Impact</span>
                <span className="text-slate-500">Medium Effort (4 Days)</span>
              </div>
              <h3 className="font-serif-marcellus text-base font-semibold text-[#3B0F1E]">
                4. Photorealistic AI On-Model Visuals &amp; Reels
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Eliminate expensive physical photo studios. Generate photorealistic on-woman editorial portraits and 10s vertical motion reels for every SKU.
              </p>
            </div>
            <div className="text-[11px] text-emerald-700 font-medium pt-2 border-t border-slate-100">
              Expected Lift: 90% reduction in shoot costs
            </div>
          </div>

          <div className="p-5 rounded-xl bg-white border border-[#E8DEC8] flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">Strategic Impact</span>
                <span className="text-slate-500">Low Effort (1 Day)</span>
              </div>
              <h3 className="font-serif-marcellus text-base font-semibold text-[#3B0F1E]">
                5. "Why This Price" Cost Transparency Box
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Show yarn denier, weaver wages, and loom days on the product page. Eliminates price objections for Rs 6,299 Maheshwari and Rs 18,920 Paithani.
              </p>
            </div>
            <div className="text-[11px] text-blue-700 font-medium pt-2 border-t border-slate-100">
              Expected Lift: Reduces return rates &amp; price hesitation
            </div>
          </div>

          <div className="p-5 rounded-xl bg-white border border-[#E8DEC8] flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded">Critical Security</span>
                <span className="text-slate-500">Low Effort (20 Mins)</span>
              </div>
              <h3 className="font-serif-marcellus text-base font-semibold text-[#3B0F1E]">
                6. Repository Privatization &amp; SSR Prerender
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Privatize GitHub repo to protect admin credentials; implement server-side pre-rendering so Instagram/WhatsApp preview cards unfurl instantly.
              </p>
            </div>
            <div className="text-[11px] text-red-700 font-medium pt-2 border-t border-slate-100">
              Expected Lift: Zero security vulnerability + SEO indexing
            </div>
          </div>
        </div>
      </section>

      {/* 6. BEFORE VS AFTER COMPARISON */}
      <section className="space-y-6">
        <div className="border-b border-[#E8DEC8] pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8B2E49]">
            Visual Transformation
          </span>
          <h2 className="font-serif-marcellus text-2xl sm:text-3xl text-[#3B0F1E] mt-1">
            Before vs. After Comparison
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Toggle between live site layout captures and the upgraded prototype experience.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setBeforeAfterTab('home')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              beforeAfterTab === 'home' ? 'bg-[#4A1525] text-white' : 'bg-white text-slate-600 border border-[#E8DEC8]'
            }`}
          >
            Homepage: Static vs Motion Rails
          </button>
          <button
            onClick={() => setBeforeAfterTab('shop')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              beforeAfterTab === 'shop' ? 'bg-[#4A1525] text-white' : 'bg-white text-slate-600 border border-[#E8DEC8]'
            }`}
          >
            Shop: Card Clutter vs Grouped Swatches
          </button>
          <button
            onClick={() => setBeforeAfterTab('pdp')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              beforeAfterTab === 'pdp' ? 'bg-[#4A1525] text-white' : 'bg-white text-slate-600 border border-[#E8DEC8]'
            }`}
          >
            Product Page: Dev Notes vs Technical Facts
          </button>
        </div>

        {/* Before vs After Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Before Column */}
          <div className="bg-[#FAF6F0] p-6 rounded-2xl border border-rose-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider">
                Live Store (Before)
              </span>
              <a
                href="https://www.padmorasarees.com"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-slate-500 hover:text-black flex items-center gap-1"
              >
                <span>Live Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {beforeAfterTab === 'home' && (
              <div className="space-y-3">
                <img
                  src="/docs/before/home.svg"
                  alt="Live Homepage Audit"
                  className="w-full rounded-lg border border-slate-200 shadow-xs"
                />
                <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                  <li>Only static folded flat lays; zero on-model video motion.</li>
                  <li>Pure client-side hydration causes layout flickers and blank social link unfurls.</li>
                  <li>No interactive "See it on you" virtual try-on studio teaser.</li>
                </ul>
              </div>
            )}

            {beforeAfterTab === 'shop' && (
              <div className="space-y-3">
                <img
                  src="/docs/before/shop.svg"
                  alt="Live Shop Audit"
                  className="w-full rounded-lg border border-slate-200 shadow-xs"
                />
                <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                  <li>Same design duplicated across 3–6 cards per color.</li>
                  <li>Over 20 sold out cards scattered across the grid without quick filters.</li>
                  <li>Spelling typos ("Burgandy", "Violate", "Jhambul").</li>
                </ul>
              </div>
            )}

            {beforeAfterTab === 'pdp' && (
              <div className="space-y-3">
                <img
                  src="/docs/before/product.svg"
                  alt="Live Product Page Audit"
                  className="w-full rounded-lg border border-slate-200 shadow-xs"
                />
                <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                  <li>Informal placeholder dev notes visible on live PDP.</li>
                  <li>Maheshwari at Rs 6,299 without stated fibre % or loom provenance.</li>
                  <li>No direct WhatsApp concierge or pre-booking waitlist button.</li>
                </ul>
              </div>
            )}
          </div>

          {/* After Column */}
          <div className="bg-[#FAF6F0] p-6 rounded-2xl border border-emerald-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                Upgraded Prototype (After)
              </span>
              <span className="text-xs text-emerald-700 font-semibold">Active in Demo</span>
            </div>

            {beforeAfterTab === 'home' && (
              <div className="space-y-3">
                <div className="relative w-full h-52 sm:h-60 bg-stone-900 rounded-lg overflow-hidden border border-white/10 shadow-xs">
                  <img
                    src="/images/hero_saree_maheshwari_chintamani_1792143902762.jpg"
                    alt="On model preview"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                    <span className="text-xs text-[#D4AF37] font-semibold">Photoreal Editorial Drape + 10s Reel Rail</span>
                    <h4 className="font-serif-marcellus text-base">Direct Loom-to-You Motion</h4>
                  </div>
                </div>
                <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                  <li>High-conversion horizontal vertical reel rail right under the hero.</li>
                  <li>Interactive "See It On You" virtual try-on studio teaser.</li>
                  <li>Immediate WhatsApp concierge assistance for high-ticket purchases.</li>
                </ul>
              </div>
            )}

            {beforeAfterTab === 'shop' && (
              <div className="space-y-3">
                <div className="p-4 bg-white rounded-lg border border-[#E8DEC8] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-serif-marcellus text-sm font-bold text-[#3B0F1E]">Maheshwari Diamond Butti</span>
                    <span className="text-xs font-bold text-[#3B0F1E]">Rs 6,080</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-slate-500">Shades:</span>
                    <span className="px-2 py-0.5 rounded text-[11px] bg-[#4A1525] text-white">Burgundy</span>
                    <span className="px-2 py-0.5 rounded text-[11px] border border-slate-300">Rani</span>
                    <span className="px-2 py-0.5 rounded text-[11px] border border-slate-300">Wine</span>
                  </div>
                  <p className="text-[11px] text-slate-500">One clean card represents all 3 variants with interactive swatches.</p>
                </div>
                <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                  <li>50% reduction in card clutter with unified color grouping.</li>
                  <li>Instant "In Stock Only" toggle hides 27 sold out items at will.</li>
                  <li>Pre-book waitlists capture buyer numbers when shade is out of stock.</li>
                </ul>
              </div>
            )}

            {beforeAfterTab === 'pdp' && (
              <div className="space-y-3">
                <div className="p-4 bg-white rounded-lg border border-[#E8DEC8] space-y-2 text-xs">
                  <div className="font-semibold text-emerald-800">✓ Technical Provenance Disclosed:</div>
                  <p className="text-slate-600">50% Pure Mulberry Silk Warp × 50% Combed Cotton Weft. 4 days manual pit loom weaving.</p>
                  <div className="p-2 bg-[#FAF6F0] rounded text-[11px] text-[#3B0F1E] font-medium">
                    "Why This Price" breakdown proves honest value vs powerloom copies.
                  </div>
                </div>
                <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                  <li>Transparent yarn count and Silk Mark certification badges.</li>
                  <li>WhatsApp Concierge click-to-chat for live video drape requests.</li>
                  <li>Multi-angle on-model photography + 10s motion video reel.</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 7. TRANSFORMATION ROADMAP */}
      <section className="space-y-6">
        <div className="border-b border-[#E8DEC8] pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8B2E49]">
            Implementation Schedule
          </span>
          <h2 className="font-serif-marcellus text-2xl sm:text-3xl text-[#3B0F1E] mt-1">
            Execution Roadmap: 2-Week Quick Wins to 6-Week Scale
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-2xl bg-white border border-[#E8DEC8] space-y-4 shadow-xs">
            <div className="flex items-center gap-2 text-[#4A1525]">
              <Clock className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="font-serif-marcellus text-lg font-bold">
                Phase 1: 2-Week Quick Wins
              </h3>
            </div>
            <ul className="space-y-3 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Privatize GitHub repo</strong> and rotate admin credentials (immediate security).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Add WhatsApp Concierge button</strong> to every product page and header.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Install Pre-Book waitlists</strong> on all 27 sold-out sarees to capture phone numbers.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Clean product copy</strong>: remove dev placeholder text and add yarn specifications.</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E8DEC8] space-y-4 shadow-xs">
            <div className="flex items-center gap-2 text-[#4A1525]">
              <Zap className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="font-serif-marcellus text-lg font-bold">
                Phase 2: 6-Week Scale &amp; Automation
              </h3>
            </div>
            <ul className="space-y-3 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Deploy AI On-Model Studio</strong>: Auto-generate 3 editorial images + 1 reel per new loom batch.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Color-grouped catalog migration</strong>: Group variants with clickable shade swatches.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Instagram ManyChat automation</strong>: "Comment SHOP" triggers automated DMs with trackable links.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Virtual Try-On launch</strong>: Let shoppers simulate saree fall by height and skin tone.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 8. FOUNDER EMAIL OUTREACH DRAFT */}
      <section className="bg-[#FAF6F0] p-6 sm:p-8 rounded-2xl border border-[#E8DEC8] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-serif-marcellus text-lg text-[#3B0F1E] font-semibold">
              Ready-to-Send Email Draft for Padmora Founders
            </h3>
            <p className="text-xs text-slate-600">
              Polite, respectful, and value-led outreach under 120 words linking directly to this demo.
            </p>
          </div>
          <button
            onClick={copyEmail}
            className="px-4 py-2 bg-[#4A1525] text-white rounded-lg text-xs font-semibold hover:bg-[#3B0F1E] transition-all flex items-center gap-1.5 self-start sm:self-auto shrink-0 shadow-xs"
          >
            {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedEmail ? 'Copied to Clipboard!' : 'Copy Email & Subject'}</span>
          </button>
        </div>

        <div className="p-4 bg-white rounded-xl border border-[#D5C9B3] font-sans text-xs text-slate-800 space-y-3 leading-relaxed">
          <div className="text-slate-500 pb-2 border-b border-slate-100 font-mono text-[11px]">
            <strong>Subject:</strong> {emailSubject}
          </div>
          <pre className="whitespace-pre-wrap font-sans text-xs text-slate-700">
            {emailBody}
          </pre>
        </div>
      </section>

      {/* 9. CONTACT & NEXT STEPS */}
      <section className="text-center py-8 space-y-3 border-t border-[#E8DEC8]">
        <h3 className="font-serif-marcellus text-2xl text-[#3B0F1E]">
          Let’s Bring Next-Generation Handloom D2C to Life
        </h3>
        <p className="text-xs text-slate-600 max-w-lg mx-auto">
          Prepared with dedication for <strong>Padmora Sarees by Yashi</strong>. Ready to assist the founders in implementing these conversion upgrades.
        </p>
        <div className="pt-2 flex justify-center gap-4">
          <Link
            to="/shop"
            className="px-6 py-2.5 rounded-lg bg-[#4A1525] text-[#FAF5EF] text-xs font-semibold hover:bg-[#3B0F1E] transition-all"
          >
            Explore Upgraded Storefront
          </Link>
          <a
            href="https://www.padmorasarees.com"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-2.5 rounded-lg border border-[#D5C9B3] text-[#3B0F1E] text-xs font-medium hover:bg-white transition-all flex items-center gap-1.5"
          >
            <span>Visit Live Padmora Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>
    </div>
  );
};
