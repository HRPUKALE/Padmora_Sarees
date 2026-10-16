import json

with open('data/sarees.json') as f:
    raw_sarees = json.load(f)

# The 5 hero sarees mapping
hero_enrichments = {
    1: {
        "fiberContent": "50% Pure Mulberry Silk Warp × 50% Combed Cotton Weft (20/22 denier)",
        "length": "6.3 metres (including 80 cm running unstitched blouse piece)",
        "weight": "380 grams (featherweight, breathable drape)",
        "certification": ["Handloom Mark Certified", "Geographical Indication (GI) Protected Weave"],
        "priceJustification": {
            "rawMaterials": 2400,
            "artisanWeavingDays": 4,
            "weaverWages": 2100,
            "finishingAndInspection": 580,
            "brandMarkup": 1000,
            "narrative": "Woven over 4 full working days on a traditional pit loom in Maheshwar. Unlike powerloom imitations using polyester yarn, this uses certified pure mulberry silk warp with combed cotton weft, yielding weightless drape with a subtle golden sheen."
        },
        "aiModelPhotos": [
            "/images/hero_saree_maheshwari_chintamani_1792143902762.jpg"
        ],
        "reelVideoUrl": "/reels/maheshwari-leaf-butti-pure-silk-cotton-chintamani-1.mp4",
        "reelPoster": "/reels/maheshwari-leaf-butti-pure-silk-cotton-chintamani-1_poster.jpg"
    },
    3: {
        "fiberContent": "100% Pure Mulberry Katan Silk (High-Twist Warp & Weft)",
        "length": "6.5 metres (with 90 cm brocade unstitched blouse piece)",
        "weight": "620 grams (regal heirloom fall)",
        "certification": ["Silk Mark Certified Pure Silk", "Varanasi Handloom Guild Verified"],
        "priceJustification": {
            "rawMaterials": 4200,
            "artisanWeavingDays": 7,
            "weaverWages": 3200,
            "finishingAndInspection": 750,
            "brandMarkup": 900,
            "narrative": "Crafted in Varanasi using pure katan silk yarn. Many online stores sell art-silk/viscose blends under Rs 4,000; Padmora provides 100% certified pure silk tested under flame and laboratory burn test."
        },
        "aiModelPhotos": [
            "/images/hero_saree_banarasi_butter_yellow_1792143902062.jpg"
        ],
        "reelVideoUrl": "/reels/banarasi-small-border-pure-silk-butter-yellow-3.mp4",
        "reelPoster": "/reels/banarasi-small-border-pure-silk-butter-yellow-3_poster.jpg"
    },
    10: {
        "fiberContent": "Pure Silk Warp × Combed Cotton Weft with Fine Metallic Zari (Khat Checks)",
        "length": "6.3 metres (with 80 cm running blouse piece)",
        "weight": "410 grams",
        "certification": ["Handloom Mark Certified", "GI Tag Protected"],
        "priceJustification": {
            "rawMaterials": 2600,
            "artisanWeavingDays": 5,
            "weaverWages": 2300,
            "finishingAndInspection": 599,
            "brandMarkup": 800,
            "narrative": "The grid of zari checks (khat) requires precise warp-tension adjustments that take 25% longer to weave than plain body weaves. This accounts for the Rs 6,299 price vs standard Maheshwari pieces."
        },
        "aiModelPhotos": [
            "/images/hero_saree_maheshwari_bottle_green_1792143903757.jpg"
        ],
        "reelVideoUrl": "/reels/maheshwari-zari-checks-pure-silk-cotton-bottle-green-10.mp4",
        "reelPoster": "/reels/maheshwari-zari-checks-pure-silk-cotton-bottle-green-10_poster.jpg"
    },
    27: {
        "fiberContent": "100% Pure Mulberry Silk with Gold Zari Pallu (Muniya Border & Peacock Motifs)",
        "length": "6.3 metres (with 80 cm Paithani border blouse piece)",
        "weight": "740 grams (opulent bridal weight)",
        "certification": ["Silk Mark Certified", "Yeola/Paithan Heritage Handloom Assurance"],
        "priceJustification": {
            "rawMaterials": 8500,
            "artisanWeavingDays": 14,
            "weaverWages": 6800,
            "finishingAndInspection": 1620,
            "brandMarkup": 2000,
            "narrative": "Genuine Paithani weaving uses the tapestry technique where motifs are hand-interlocked without floats on the reverse. A powerloom copy sells for Rs 3,500; this Rs 18,920 price delivers 14 artisan days of master tapestry weaving."
        },
        "aiModelPhotos": [
            "/images/hero_saree_paithani_chintamani_1792143903868.jpg"
        ],
        "reelVideoUrl": "/reels/paithani-chintamani-27.mp4",
        "reelPoster": "/reels/paithani-chintamani-27_poster.jpg"
    },
    36: {
        "fiberContent": "80% Organic Mercerized Cotton × 20% Mulberry Silk with Contrast Temple Border",
        "length": "6.2 metres (with 80 cm contrast blouse piece)",
        "weight": "490 grams (crisp all-day pleats)",
        "certification": ["Handloom Mark Certified", "Direct Telangana Weaver Co-op"],
        "priceJustification": {
            "rawMaterials": 850,
            "artisanWeavingDays": 2,
            "weaverWages": 850,
            "finishingAndInspection": 200,
            "brandMarkup": 200,
            "narrative": "At Rs 2,100, this Narayanpet offers exceptional everyday handloom value. Sourced directly from weaver clusters in Telangana with zero middlemen margins, passing the value directly to the consumer."
        },
        "aiModelPhotos": [
            "/images/hero_saree_narayanpet_maroon_1792143904375.jpg"
        ],
        "reelVideoUrl": "/reels/narayanpet-temple-border-solid-maroon-36.mp4",
        "reelPoster": "/reels/narayanpet-temple-border-solid-maroon-36_poster.jpg"
    }
}

enriched = []
for s in raw_sarees:
    s_id = s['id']
    item = dict(s)
    weave = s.get('weave', '')
    
    # If in hero enrichments, apply
    if s_id in hero_enrichments:
        item.update(hero_enrichments[s_id])
    else:
        # Default smart specifications and weave-matched on-model drape photo
        if 'Maheshwari' in weave:
            item['fiberContent'] = "50% Silk Warp × 50% Cotton Weft (Handloom)"
            item['length'] = "6.3m (with 80cm blouse piece)"
            item['certification'] = ["Handloom Mark Verified"]
            item['aiModelPhotos'] = ["/images/hero_saree_maheshwari_bottle_green_1792143903757.jpg" if 'green' in s['name'].lower() else "/images/hero_saree_maheshwari_chintamani_1792143902762.jpg"]
            item['reelVideoUrl'] = "/reels/maheshwari-leaf-butti-pure-silk-cotton-chintamani-1.mp4"
            item['reelPoster'] = "/reels/maheshwari-leaf-butti-pure-silk-cotton-chintamani-1_poster.jpg"
        elif 'Banarasi' in weave:
            item['fiberContent'] = "Pure Silk / Katan Handloom"
            item['length'] = "6.5m (with 90cm blouse piece)"
            item['certification'] = ["Silk Mark Certified"]
            item['aiModelPhotos'] = ["/images/hero_saree_banarasi_butter_yellow_1792143902062.jpg"]
            item['reelVideoUrl'] = "/reels/banarasi-small-border-pure-silk-butter-yellow-3.mp4"
            item['reelPoster'] = "/reels/banarasi-small-border-pure-silk-butter-yellow-3_poster.jpg"
        elif 'Paithani' in weave:
            item['fiberContent'] = "Pure Silk with Rich Zari Pallu"
            item['length'] = "6.3m (with 80cm blouse piece)"
            item['certification'] = ["Silk Mark Certified"]
            item['aiModelPhotos'] = ["/images/hero_saree_paithani_chintamani_1792143903868.jpg"]
            item['reelVideoUrl'] = "/reels/paithani-chintamani-27.mp4"
            item['reelPoster'] = "/reels/paithani-chintamani-27_poster.jpg"
        else: # Narayanpet
            item['fiberContent'] = "Cotton-Silk Blend Handloom with Temple Border"
            item['length'] = "6.2m (with 80cm blouse piece)"
            item['certification'] = ["Handloom Mark Verified"]
            item['aiModelPhotos'] = ["/images/hero_saree_narayanpet_maroon_1792143904375.jpg"]
            item['reelVideoUrl'] = "/reels/narayanpet-temple-border-solid-maroon-36.mp4"
            item['reelPoster'] = "/reels/narayanpet-temple-border-solid-maroon-36_poster.jpg"

    enriched.append(item)

ts_content = f"""// Generated catalog data for Padmora Sarees by Yashi Pitch Demo
import {{ Saree }} from '../types/saree';

export const SAREES_DATA: Saree[] = {json.dumps(enriched, indent=2)};

export const HERO_SAREE_IDS = [1, 3, 10, 27, 36];

export const WEAVE_CATEGORIES = [
  {{
    slug: 'maheshwari',
    name: 'Maheshwari Sarees',
    region: 'Maheshwar, Madhya Pradesh',
    description: 'Reversible zari borders and gossamer silk-cotton body created during Queen Ahilyabai Holkar’s reign.',
    count: 22,
    startingPrice: 6080,
    accentColor: '#3d1620'
  }},
  {{
    slug: 'paithani',
    name: 'Paithani Sarees',
    region: 'Yeola & Paithan, Maharashtra',
    description: 'The royal heirloom of Maharashtra adorned with oblique square borders and signature peacock pallus.',
    count: 5,
    startingPrice: 18920,
    accentColor: '#12394a'
  }},
  {{
    slug: 'banarasi',
    name: 'Banarasi Sarees',
    region: 'Varanasi, Uttar Pradesh',
    description: 'Pure katan silk with intricate gold and silver zari brocades woven on centuries-old jacquards.',
    count: 5,
    startingPrice: 3690,
    accentColor: '#4f1a26'
  }},
  {{
    slug: 'narayanpet',
    name: 'Narayanpet Sarees',
    region: 'Narayanpet, Telangana',
    description: 'Crisp cotton-silk with distinct temple border motifs (shikhar) engineered for flawless daily pleats.',
    count: 25,
    startingPrice: 2100,
    accentColor: '#422416'
  }}
];
"""

with open('src/data/sareesData.ts', 'w') as f:
    f.write(ts_content)

print(f"Generated src/data/sareesData.ts with {len(enriched)} sarees successfully!")
