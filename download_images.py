import urllib.request
import json
import os

with open('data/sarees.json') as f:
    sarees = json.load(f)

download_count = 0
for s in sarees:
    slug = s['slug']
    folder = f"public/sarees/{slug}"
    os.makedirs(folder, exist_ok=True)
    local_images = []
    for idx, img_url in enumerate(s.get('imageUrls', [])):
        ext = 'webp'
        if '.jpg' in img_url.lower(): ext = 'jpg'
        elif '.png' in img_url.lower(): ext = 'png'
        filename = f"image_{idx}.{ext}"
        local_path = os.path.join(folder, filename)
        pub_path = f"/sarees/{slug}/{filename}"
        if not os.path.exists(local_path):
            try:
                req = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0'})
                with urllib.request.urlopen(req, timeout=10) as resp:
                    with open(local_path, 'wb') as out_f:
                        out_f.write(resp.read())
                download_count += 1
            except Exception as e:
                print(f"Error downloading {img_url}: {e}")
        local_images.append(pub_path)
    s['localImages'] = local_images

with open('data/sarees.json', 'w') as f:
    json.dump(sarees, f, indent=2)

print(f"Downloaded {download_count} images into public/sarees/")
