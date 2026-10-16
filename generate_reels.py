import subprocess
import os

os.makedirs('public/reels', exist_ok=True)

hero_items = [
    {
        "slug": "maheshwari-leaf-butti-pure-silk-cotton-chintamani-1",
        "image": "src/assets/images/hero_saree_maheshwari_chintamani_1792143902762.jpg"
    },
    {
        "slug": "banarasi-small-border-pure-silk-butter-yellow-3",
        "image": "src/assets/images/hero_saree_banarasi_butter_yellow_1792143902062.jpg"
    },
    {
        "slug": "maheshwari-zari-checks-pure-silk-cotton-bottle-green-10",
        "image": "src/assets/images/hero_saree_maheshwari_bottle_green_1792143903757.jpg"
    },
    {
        "slug": "paithani-chintamani-27",
        "image": "src/assets/images/hero_saree_paithani_chintamani_1792143903868.jpg"
    },
    {
        "slug": "narayanpet-temple-border-solid-maroon-36",
        "image": "src/assets/images/hero_saree_narayanpet_maroon_1792143904375.jpg"
    }
]

for item in hero_items:
    slug = item["slug"]
    src_img = item["image"]
    out_mp4 = f"public/reels/{slug}.mp4"
    out_poster = f"public/reels/{slug}_poster.jpg"

    # Create poster image 9:16 aspect ratio (1080x1920)
    cmd_poster = [
        "ffmpeg", "-y", "-i", src_img,
        "-vf", "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920",
        "-q:v", "2", out_poster
    ]
    subprocess.run(cmd_poster, check=True)

    # Create 10-second 1080x1920 vertical reel with gentle cinematic zoom and slow pan
    # zoompan filter: 10s at 25fps = 250 frames
    # zoom in from 1.0 to 1.15 smoothly, then pan slightly down
    filter_complex = (
        "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,"
        "zoompan=z='min(zoom+0.0006,1.15)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)+sin(on/30)*20':d=250:s=1080x1920:fps=25,"
        "format=yuv420p"
    )

    cmd_video = [
        "ffmpeg", "-y", "-loop", "1", "-i", src_img,
        "-vf", filter_complex,
        "-t", "10",
        "-c:v", "libx264", "-preset", "fast", "-crf", "23",
        "-movflags", "+faststart",
        out_mp4
    ]
    print(f"Generating reel for {slug}...")
    subprocess.run(cmd_video, check=True)
    print(f"Reel saved to {out_mp4}")

print("All 5 hero reels generated successfully!")
