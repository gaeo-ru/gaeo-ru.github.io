#!/usr/bin/env python3
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets" / "gaeo-icon-512.png"
TARGETS = {
    16: ROOT / "assets" / "favicon-16x16.png",
    32: ROOT / "assets" / "favicon-32x32.png",
    180: ROOT / "assets" / "apple-touch-icon.png",
    192: ROOT / "assets" / "android-chrome-192x192.png",
    512: ROOT / "assets" / "android-chrome-512x512.png",
}

with Image.open(SOURCE) as source:
    image = source.convert("RGBA")
    for size, path in TARGETS.items():
        resized = image.resize((size, size), Image.Resampling.LANCZOS)
        resized.save(path, format="PNG", optimize=True)

    image.save(
        ROOT / "favicon.ico",
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)],
    )

print("Favicons generated from", SOURCE)
