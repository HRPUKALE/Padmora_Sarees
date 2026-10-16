import urllib.request
import json

def fetch_json(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    try:
        with urllib.request.urlopen(req) as resp:
            return resp.read().decode('utf-8')
    except Exception as e:
        return f"Error: {e}"

for endpoint in ['/api/products', '/api/collections', '/api/fabrics', '/api/occasions', '/api/reels', '/api/categories']:
    data = fetch_json('https://www.padmorasarees.com' + endpoint)
    print(endpoint, "Len:", len(data), "Preview:", data[:120])
