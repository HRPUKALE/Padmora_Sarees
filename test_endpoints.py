import urllib.request
import json

def test_endpoint(ep):
    try:
        req = urllib.request.Request('https://www.padmorasarees.com' + ep, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp:
            data = resp.read().decode('utf-8')
            print(ep, "-> Status OK, length:", len(data), data[:100])
    except Exception as e:
        print(ep, "-> Error:", e)

test_endpoint('/api/products/1')
test_endpoint('/api/product?id=1')
test_endpoint('/api/products?id=1')
test_endpoint('/about')
test_endpoint('/our-weaves')
test_endpoint('/faq')
test_endpoint('/policies')
test_endpoint('/contact')
