# Padmora Sarees by Yashi — Heritage Handloom & AI Pitch Demo

A high-fidelity concept pitch demo designed for **Padmora Sarees by Yashi** ([padmorasarees.com](https://www.padmorasarees.com/)), an authentic Indian handloom D2C brand specializing in Maheshwari, Paithani, Banarasi, and Narayanpet sarees.

---

## 🌟 Pitch Goals & Key Upgrades

1. **Photorealistic On-Model AI Drape Photography**: High-end editorial portraits of Indian women wearing the exact sarees across authentic Indian settings (Jaipur havelis, stone courtyards).
2. **"Sarees in Motion" 10-Second Vertical Reels (9:16)**: Cinematic vertical reels with smooth pans, zari zoom, and fabric flow to demonstrate authentic pleats and fall.
3. **Frictionless Instagram Conversion Flow**: Full-screen reels with deep links (`utm_source=instagram&utm_medium=reel`), code-driven overlays, and instant "Shop Now" / "Pre-Book" actions.
4. **Grouped Variant Architecture**: Color variations of the same saree design are unified into a single card with live interactive shade swatches (eliminating 20+ duplicate catalog cards).
5. **Pre-Book & Waitlist Capture**: Captures customer phone numbers on 27 currently sold-out items with automated WhatsApp notifications before new loom batches launch.
6. **Transparent Price Justification & Provenance**: Discloses yarn count (e.g. 20/22 denier silk warp × 80s cotton weft), artisan weaving days, and Silk Mark certifications to justify luxury pricing.
7. **Comprehensive /pitch Report**: Executive audit findings, verified price benchmarks, effort-vs-impact roadmap, and 1-click printable PDF view.

---

## 🚀 Running the App Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Build for production (Vercel, Netlify, Cloud Run)
npm run build
```

---

## 🎨 How to Regenerate Assets

### 1. Re-extract live catalog data:
```bash
python3 extract_sarees.py
```
Fetches from `https://www.padmorasarees.com/api/products` and generates `data/sarees.json`.

### 2. Download original catalog photos:
```bash
python3 download_images.py
```
Saves product photos to `/public/sarees/{slug}/`.

### 3. Generate 10-second vertical 9:16 video reels:
```bash
python3 generate_reels.py
```
Uses FFmpeg with smooth Ken Burns zoompan filters to generate 1080x1920 MP4 video reels and poster frames in `/public/reels/`.

### 4. Regenerate before/after audit comparisons:
```bash
python3 generate_before_svg.py
```
Creates vector audit screenshots in `/docs/before/` and `/public/docs/before/`.

---

## 📂 Project Architecture

```
├── data/
│   └── sarees.json            # 57 extracted live sarees with variants & URLs
├── docs/
│   ├── before/                # Live site audit screenshots & findings
│   └── instagram.md           # Instagram ManyChat & caption playbook
├── public/
│   ├── reels/                 # 10s vertical 9:16 MP4 reels & poster JPGs
│   └── sarees/                # Downloaded live product stills
├── src/
│   ├── assets/images/         # Photorealistic AI on-model editorial portraits
│   ├── components/            # Header, Footer, CartDrawer, ProductCard, ReelModal, NotifyModal
│   ├── context/               # CartContext with persistence and drawer control
│   ├── data/                  # sareesData.ts with enriched loom facts and price breakdowns
│   ├── pages/
│   │   ├── HomePage.tsx       # Hero, reel rail, weave tiles, try-on teaser
│   │   ├── ShopPage.tsx       # Color-grouped filterable catalog
│   │   ├── ProductPage.tsx    # Technical facts, cost breakdown, 10s reel, WhatsApp CTA
│   │   ├── ReelsPage.tsx      # Full-screen vertical 9:16 player with deep links
│   │   ├── TryOnPage.tsx      # Virtual drape simulator with model presets
│   │   └── PitchPage.tsx      # Founder pitch, benchmark table, and print view
│   ├── types/                 # Saree and variant interfaces
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
```

---

## ⚖️ Ethics & Attribution
- All AI-generated visual previews and motion reels carry visible "AI-Generated Preview" indicators.
- Saree product photographs are utilized strictly for concept evaluation and pitch demonstration purposes.
- Not the official live store of Padmora Sarees by Yashi.
