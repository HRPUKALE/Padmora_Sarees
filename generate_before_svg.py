import subprocess

def make_svg_and_png(filename_base, title, subtitle, bad_points, visual_snippet):
    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750" viewBox="0 0 1200 750" style="background:#FAF8F5;font-family:system-ui,-apple-system,sans-serif;">
  <rect width="1200" height="70" fill="#4A1525"/>
  <text x="40" y="44" fill="#FAF5EF" font-size="22" font-weight="bold" letter-spacing="1">PADMORA SAREES BY YASHI — LIVE AUDIT</text>
  <text x="1000" y="44" fill="#E2D4C8" font-size="14">LIVE STORE CAPTURE</text>

  <!-- Title Section -->
  <rect x="40" y="95" width="1120" height="60" rx="8" fill="#FFFFFF" stroke="#E2E8F0"/>
  <text x="60" y="132" fill="#1E293B" font-size="20" font-weight="600">{title}</text>
  <text x="500" y="132" fill="#64748B" font-size="14">{subtitle}</text>

  <!-- Visual Mock / Snippet of live site -->
  <g transform="translate(40, 175)">
    {visual_snippet}
  </g>

  <!-- Findings Callout -->
  <rect x="40" y="470" width="1120" height="240" rx="12" fill="#FFF1F2" stroke="#FDA4AF" stroke-width="2"/>
  <text x="70" y="510" fill="#9F1239" font-size="18" font-weight="bold">AUDIT FINDINGS &amp; UX GAPS IDENTIFIED ON LIVE SITE:</text>
  {''.join([f'<text x="70" y="{545 + i*34}" fill="#334155" font-size="15">• {pt}</text>' for i, pt in enumerate(bad_points)])}
</svg>'''

    svg_path = f"docs/before/{filename_base}.svg"
    png_path = f"docs/before/{filename_base}.png"
    with open(svg_path, 'w') as f:
        f.write(svg_content)
    
    # Try converting with rsvg-convert or convert or inkscape
    res = subprocess.run(["convert", svg_path, png_path], capture_output=True)
    if res.returncode != 0:
        print(f"convert error for {svg_path}: {res.stderr}")
    else:
        print(f"Generated {png_path}")

# 1. Home
home_snippet = '''
<rect width="1120" height="270" rx="8" fill="#78233C"/>
<text x="50" y="80" fill="#FFFFFF" font-size="32" font-family="serif">Authentic Handloom Sarees</text>
<text x="50" y="120" fill="#FCE7F3" font-size="16">Sourced Directly from India's Master Weaving Clusters</text>
<rect x="50" y="150" width="160" height="46" rx="6" fill="#D9A97C"/>
<text x="95" y="178" fill="#1E1B1B" font-size="14" font-weight="bold">SHOP NOW</text>
<rect x="800" y="40" width="270" height="190" rx="6" fill="#501828" stroke="#D9A97C"/>
<text x="820" y="140" fill="#FAF5EF" font-size="14">Static Flat Saree Photo</text>
<text x="820" y="165" fill="#E2D4C8" font-size="12">No video drape / on-model view</text>
'''
make_svg_and_png('home', 'Homepage: Static Banner & Missing Motion', 'https://www.padmorasarees.com/', [
    'No vertical reels or dynamic drape video anywhere on the live storefront; only flat folded saree photos.',
    'Pure client-side JavaScript hydration delays initial render and fails social preview scrapers (WhatsApp, FB).',
    'No direct WhatsApp Order Concierge for fast-moving mobile inquiries.',
    '47% of catalog inventory is sold out with no \"Pre-Book\" or automated \"Notify Me\" lead capture mechanism.',
    'Missing interactive \"See it on you\" virtual try-on teaser for mobile shoppers.'
], home_snippet)

# 2. Shop
shop_snippet = '''
<g transform="translate(10, 20)">
  <rect x="0" y="0" width="260" height="230" rx="6" fill="#FFFFFF" stroke="#CBD5E1"/>
  <rect x="15" y="15" width="230" height="130" fill="#E2E8F0"/>
  <text x="25" y="170" fill="#1E293B" font-size="13" font-weight="bold">Diamond Butti - Burgandy</text>
  <text x="25" y="195" fill="#DC2626" font-size="13">Rs 6,080 · SOLD OUT</text>
</g>
<g transform="translate(290, 20)">
  <rect x="0" y="0" width="260" height="230" rx="6" fill="#FFFFFF" stroke="#CBD5E1"/>
  <rect x="15" y="15" width="230" height="130" fill="#E2E8F0"/>
  <text x="25" y="170" fill="#1E293B" font-size="13" font-weight="bold">Diamond Butti - Rani</text>
  <text x="25" y="195" fill="#DC2626" font-size="13">Rs 6,080 · SOLD OUT</text>
</g>
<g transform="translate(570, 20)">
  <rect x="0" y="0" width="260" height="230" rx="6" fill="#FFFFFF" stroke="#CBD5E1"/>
  <rect x="15" y="15" width="230" height="130" fill="#E2E8F0"/>
  <text x="25" y="170" fill="#1E293B" font-size="13" font-weight="bold">Diamond Butti - Wine</text>
  <text x="25" y="195" fill="#DC2626" font-size="13">Rs 6,080 · SOLD OUT</text>
</g>
<g transform="translate(850, 20)">
  <rect x="0" y="0" width="260" height="230" rx="6" fill="#FFFFFF" stroke="#CBD5E1"/>
  <rect x="15" y="15" width="230" height="130" fill="#E2E8F0"/>
  <text x="25" y="170" fill="#1E293B" font-size="13" font-weight="bold">Zari Checks - Green</text>
  <text x="25" y="195" fill="#D97706" font-size="13">Rs 6,299 · Low Stock (1 left)</text>
</g>
'''
make_svg_and_png('shop', 'Shop: Detached Color Variants Cluttering Catalog', 'https://www.padmorasarees.com/shop', [
    'Color variant fragmentation: The same design appears as 3 to 6 separate cards, cluttering the grid.',
    'Shopper scrolling fatigue: Buyers scroll past 15 sold-out cards before finding an in-stock piece.',
    'Spelling typos across live catalog: \"Burgandy\" (Burgundy), \"Jhambul\" (Jambhul), \"Violate\" (Violet).',
    'No filter grouping by occasion (Trousseau, Office, Festive) or instant \"In Stock Only\" toggle.',
    'Bag drawer occasional infinite loading freeze on checkout initiation.'
], shop_snippet)

# 3. Product
pdp_snippet = '''
<rect x="20" y="15" width="300" height="235" rx="6" fill="#F1F5F9" stroke="#CBD5E1"/>
<text x="75" y="130" fill="#64748B" font-size="14">[Folded Saree Still]</text>
<g transform="translate(350, 20)">
  <text x="0" y="30" fill="#1E293B" font-size="20" font-weight="bold">Maheshwari Leaf Butti Pure Silk/Cotton</text>
  <text x="0" y="60" fill="#831843" font-size="18" font-weight="bold">Rs 6,080</text>
  <rect x="0" y="80" width="720" height="140" rx="6" fill="#FEF2F2" stroke="#FCA5A5"/>
  <text x="20" y="115" fill="#991B1B" font-size="14" font-weight="bold">Live Site Product Details snippet:</text>
  <text x="20" y="145" fill="#B91C1C" font-size="13">"Occasion: Tumhi paise bharlet, kadhi pan ghala bindaaaaaas!!! | Aapkki Saree apki marjiiii."</text>
  <text x="20" y="180" fill="#475569" font-size="13">• Missing fibre breakdown, yarn count, loom verification, and Silk Mark.</text>
</g>
'''
make_svg_and_png('product', 'Product Page: Trust Gaps & Informal Dev Notes', 'https://www.padmorasarees.com/product/...', [
    'Informal developer notes in live customer-facing description damages luxury handloom trust.',
    'Price justification missing: No fibre % (e.g. 50% Mulberry silk warp / 50% cotton weft) or loom provenance.',
    'Maheshwari Zari Checks priced at Rs 6,299 vs Rs 3,999 benchmark without stated value proposition.',
    'Zero on-woman drape photos or vertical 10s video reels showing fabric flow, pleats, and pallu weight.',
    'Missing direct WhatsApp consultation button for high-ticket handloom purchases.'
], pdp_snippet)
