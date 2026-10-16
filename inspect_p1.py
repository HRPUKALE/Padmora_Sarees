import urllib.request
import json

req = urllib.request.Request('https://www.padmorasarees.com/api/products/1', headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode('utf-8'))

print(json.dumps(data, indent=2))
