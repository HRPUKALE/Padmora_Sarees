import urllib.request
import re
import json

def fetch_url(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    with urllib.request.urlopen(req) as resp:
        return resp.read().decode('utf-8', errors='ignore')

try:
    api_js = fetch_url('https://www.padmorasarees.com/js/api.js')
    print("API.JS size:", len(api_js))
    # Look for API endpoints or urls
    urls = re.findall(r'https?://[^\s\'"<>]+', api_js)
    print("URLs in api.js:", set(urls[:15]))
    
    # Check shop page HTML
    shop_html = fetch_url('https://www.padmorasarees.com/shop')
    print("Shop HTML size:", len(shop_html))
    scripts = re.findall(r'<script[^>]*>(.*?)</script>', shop_html, re.DOTALL)
    for s in scripts:
        if 'fetch' in s or 'supabase' in s or 'products' in s:
            print("Inline script snippet:", s[:300])

    src_scripts = re.findall(r'<script[^>]*src="([^"]+)"', shop_html)
    print("Script sources in shop:", src_scripts)

except Exception as e:
    print("Error:", e)
