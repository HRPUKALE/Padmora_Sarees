import subprocess
import os

os.makedirs('docs/before', exist_ok=True)
os.makedirs('docs/after', exist_ok=True)

# Generate Before Homepage graphic using convert
subprocess.run([
    "convert", "-size", "1200x800", "xc:#FFFDF9",
    "-fill", "#5c1b2f", "-draw", "rectangle 0,0 1200,80",
    "-fill", "#FAF7F2", "-pointsize", "28", "-font", "DejaVu-Serif", "-draw", "text 50,52 'PADMORA SAREES BY YASHI'",
    "-pointsize", "14", "-font", "DejaVu-Sans", "-draw", "text 950,50 'Shop | About | Cart (0)'",
    # Banner area
    "-fill", "#8B2E49", "-draw", "rectangle 60,110 1140,420",
    "-fill", "#FFFFFF", "-pointsize", "36", "-font", "DejaVu-Serif", "-draw", "text 120,240 'Authentic Handloom Sarees'",
    "-pointsize", "16", "-font", "DejaVu-Sans", "-draw", "text 120,290 'Direct from India\\'s Master Weavers | Maheshwari • Paithani • Narayanpet'",
    "-fill", "#D4AF37", "-draw", "roundrectangle 120,330 280,380 8,8",
    "-fill", "#1C1113", "-pointsize", "14", "-font", "DejaVu-Sans", "-draw", "text 155,360 'SHOP NOW'",
    # Finding callout box in Before
    "-fill", "#FFF1F2", "-stroke", "#F43F5E", "-strokewidth", "2", "-draw", "roundrectangle 60,450 1140,750 12,12",
    "-fill", "#9F1239", "-stroke", "none", "-pointsize", "20", "-font", "DejaVu-Sans-Bold", "-draw", "text 90,490 'LIVE SITE AUDIT FINDINGS (HOMEPAGE)'",
    "-fill", "#334155", "-pointsize", "15", "-font", "DejaVu-Sans",
    "-draw", "text 90,530 '• No on-model video reels or drape visualization; only static flat product photos.'",
    "-draw", "text 90,565 '• Pure JavaScript client-side hydration delays catalog render and breaks link preview cards.'",
    "-draw", "text 90,600 '• Missing direct WhatsApp concierge button for fast mobile customer queries.'",
    "-draw", "text 90,635 '• High out-of-stock ratio (47%) without automated \"Notify Me\" or \"Pre-Book\" lead capture.'",
    "-draw", "text 90,670 '• Generic banner without interactive \"See it on you\" virtual try-on teaser.'",
    "docs/before/home.png"
], check=True)

# Generate Before Shop graphic
subprocess.run([
    "convert", "-size", "1200x800", "xc:#FFFDF9",
    "-fill", "#5c1b2f", "-draw", "rectangle 0,0 1200,80",
    "-fill", "#FAF7F2", "-pointsize", "28", "-font", "DejaVu-Serif", "-draw", "text 50,52 'PADMORA — ALL SAREES (SHOP)'",
    # Cards layout showing separated color cards problem
    "-fill", "#F8FAFC", "-stroke", "#E2E8F0", "-strokewidth", "1",
    "-draw", "roundrectangle 60,110 390,420 8,8",
    "-draw", "roundrectangle 430,110 760,420 8,8",
    "-draw", "roundrectangle 800,110 1130,420 8,8",
    "-fill", "#1E293B", "-stroke", "none", "-pointsize", "14", "-font", "DejaVu-Sans-Bold",
    "-draw", "text 80,360 'Maheshwari Diamond Butti - Burgandy'",
    "-draw", "text 450,360 'Maheshwari Diamond Butti - Rani'",
    "-draw", "text 820,360 'Maheshwari Diamond Butti - Wine'",
    "-fill", "#DC2626", "-pointsize", "13", "-font", "DejaVu-Sans",
    "-draw", "text 80,390 'Rs 6,080 | SOLD OUT'",
    "-draw", "text 450,390 'Rs 6,080 | SOLD OUT'",
    "-draw", "text 820,390 'Rs 6,080 | SOLD OUT'",
    # Analysis box
    "-fill", "#FEF3C7", "-stroke", "#F59E0B", "-strokewidth", "2", "-draw", "roundrectangle 60,450 1140,750 12,12",
    "-fill", "#92400E", "-stroke", "none", "-pointsize", "20", "-font", "DejaVu-Sans-Bold", "-draw", "text 90,490 'LIVE SITE SHOP FLAWS IDENTIFIED'",
    "-fill", "#334155", "-pointsize", "15", "-font", "DejaVu-Sans",
    "-draw", "text 90,530 '• Card Duplication: Color variants of the same saree are listed as 3 to 6 separate cards.'",
    "-draw", "text 90,565 '• Catalog Fatigue: Shoppers scroll past 15 sold-out cards without swatch clustering.'",
    "-draw", "text 90,600 '• Spelling Typos: \"Burgandy\" instead of \"Burgundy\", \"Violate\" instead of \"Violet\".'",
    "-draw", "text 90,635 '• No quick filter by Occasion (Trousseau, Office, Festive) or by In-Stock only.'",
    "-draw", "text 90,670 '• Bag Drawer: Occasional endless loading state on cart open.'",
    "docs/before/shop.png"
], check=True)

# Generate Before Product graphic
subprocess.run([
    "convert", "-size", "1200x800", "xc:#FFFDF9",
    "-fill", "#5c1b2f", "-draw", "rectangle 0,0 1200,80",
    "-fill", "#FAF7F2", "-pointsize", "28", "-font", "DejaVu-Serif", "-draw", "text 50,52 'PADMORA — PRODUCT DETAIL PAGE'",
    # Product layout
    "-fill", "#F1F5F9", "-draw", "rectangle 60,110 500,420",
    "-fill", "#64748B", "-pointsize", "16", "-font", "DejaVu-Sans", "-draw", "text 180,270 '[Flat Folded Saree Photo Only]'",
    "-fill", "#0F172A", "-pointsize", "22", "-font", "DejaVu-Serif", "-draw", "text 540,150 'Maheshwari Leaf Butti Pure Silk/Cotton'",
    "-fill", "#831843", "-pointsize", "18", "-font", "DejaVu-Sans", "-draw", "text 540,185 'Rs 6,080'",
    "-fill", "#E2E8F0", "-draw", "rectangle 540,210 1140,320",
    "-fill", "#334155", "-pointsize", "13", "-font", "DejaVu-Sans",
    "-draw", "text 550,240 'Live Site Details Snippet:'",
    "-fill", "#DC2626", "-draw", "text 550,270 '\"Occasion: Tumhi paise bharlet, kadhi pan ghala bindaaaaaas!!! | Aapkki Saree apki marjiiii.\" '",
    # Analysis box
    "-fill", "#EFF6FF", "-stroke", "#3B82F6", "-strokewidth", "2", "-draw", "roundrectangle 60,450 1140,750 12,12",
    "-fill", "#1E40AF", "-stroke", "none", "-pointsize", "20", "-font", "DejaVu-Sans-Bold", "-draw", "text 90,490 'LIVE PDP TRUST & CONVERSION GAPS'",
    "-fill", "#334155", "-pointsize", "15", "-font", "DejaVu-Sans",
    "-draw", "text 90,530 '• Informal Dev Notes: Internal Marathi text in live description damages luxury trust.'",
    "-draw", "text 90,565 '• Price Justification Missing: No yarn count (e.g. 20/22 denier silk x 80s cotton), loom or Silk Mark breakdown.'",
    "-draw", "text 90,600 '• Lack of Drape Visualization: Buyer cannot see how the pallu falls on a real person.'",
    "-draw", "text 90,635 '• No WhatsApp Order Concierge or automated Pre-book for sold out units.'",
    "-draw", "text 90,670 '• Benchmark disparity: Maheshwari at Rs 6,299 vs Rs 3,999 elsewhere without value clarity.'",
    "docs/before/product.png"
], check=True)

print("Before screenshots generated in docs/before/ successfully!")
