import urllib.request
import json

req = urllib.request.Request('https://www.padmorasarees.com/api/products', headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode('utf-8'))

products = data.get('products', [])
print(f"Total products fetched: {len(products)}")
if products:
    p0 = products[0]
    print("Sample Product Keys:", list(p0.keys()))
    print("Sample Product 0:", json.dumps(p0, indent=2)[:800])
    print("\nSample Product Weaves/Fabrics:", set(p.get('fabric') for p in products))
    print("Sample Product Stock statuses/counts:", [(p.get('id'), p.get('name'), p.get('stock'), p.get('is_available'), p.get('price')) for p in products[:10]])
