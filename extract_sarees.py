import urllib.request
import json
import os
import re

def slugify(s):
    s = str(s).lower()
    s = re.sub(r'[^a-z0-9]+', '-', s).strip('-')
    return s or 'saree'

url = 'https://www.padmorasarees.com/api/products'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode('utf-8'))

raw_products = data.get('products', [])
print(f"Total raw products: {len(raw_products)}")

# Create directories
os.makedirs('data', exist_ok=True)
os.makedirs('public/sarees', exist_ok=True)
os.makedirs('docs/before', exist_ok=True)
os.makedirs('docs/after', exist_ok=True)

processed_sarees = []
for p in raw_products:
    p_id = p.get('id')
    name = p.get('name', '').strip()
    fabric = p.get('fabric', 'Handloom')
    price = p.get('price', 0)
    mrp = p.get('mrp', price)
    stock = p.get('stock', 0)
    status = p.get('status', 'active')
    weaver_name = p.get('weaverName', '')
    weaver_region = p.get('weaverRegion', '')
    loom_type = p.get('loomType', 'Handloom')
    occasion = p.get('occasion', '')
    swatch = p.get('swatch', '')

    # Determine stock status
    if stock <= 0:
        stock_status = "Sold out"
    elif stock <= 2:
        stock_status = "Low stock"
    else:
        stock_status = "In stock"

    # Color extraction
    color = swatch.title() if swatch else ""
    # Check if color is in title
    variants = p.get('variants', [])
    variant_list = []
    image_urls = []

    for v in variants:
        v_color = v.get('colorName') or v.get('swatch') or color
        v_stock = v.get('stock', 0)
        v_price = v.get('price', price)
        v_media = v.get('media', [])
        v_imgs = [m.get('url') for m in v_media if m.get('type') == 'image' and m.get('url')]
        image_urls.extend(v_imgs)
        variant_list.append({
            "variantId": v.get('id'),
            "colorName": v_color,
            "swatch": v.get('swatch', ''),
            "price": v_price,
            "stock": v_stock,
            "images": v_imgs
        })

    # Slug
    slug = f"{slugify(name)}-{p_id}"

    processed_sarees.append({
        "id": p_id,
        "name": name,
        "slug": slug,
        "weave": fabric,
        "colour": color or (variant_list[0]['colorName'] if variant_list else "Classic"),
        "price": price,
        "mrp": mrp,
        "stock": stock,
        "stockStatus": stock_status,
        "weaverName": weaver_name or "Master Weaver",
        "weaverRegion": weaver_region or "Maheshwar / Chanderi",
        "loomType": loom_type or "Traditional Handloom",
        "occasion": occasion,
        "productUrl": f"/product/{slug}",
        "liveUrl": f"https://www.padmorasarees.com/product/{slug}",
        "imageUrls": list(dict.fromkeys(image_urls)), # unique
        "variants": variant_list,
        "badge": p.get('badge', '')
    })

with open('data/sarees.json', 'w') as f:
    json.dump(processed_sarees, f, indent=2)

print(f"Successfully generated data/sarees.json with {len(processed_sarees)} sarees.")
for s in processed_sarees[:5]:
    print(f"- ID {s['id']}: {s['name']} | Weave: {s['weave']} | Colour: {s['colour']} | Price: Rs {s['price']} | Stock: {s['stockStatus']} | Images: {len(s['imageUrls'])}")
