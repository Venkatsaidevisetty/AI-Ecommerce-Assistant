"""
Downloads one real, category/brand-matched photo per product and stores it
locally in the repo, so images are permanent (no external dependency).

Run this ONCE on your own machine (needs normal internet access):

    cd scripts
    pip install requests
    python download_product_images.py

It will:
  1. Read backend/src/main/resources/products.json
  2. For each product, download a real photo matched by category+brand
     from a free, no-signup keyword photo service (LoremFlickr)
  3. Save it to frontend/public/images/products/<slug>.jpg
  4. Rewrite products.json so imageUrl points to the local file

After running, the images are real files in your repo — commit them to git
and they'll always work, on GitHub or anywhere else, with no dependency on
any external service at runtime.

NOTE on licensing: LoremFlickr pulls from Flickr's public photo pool under
mixed licenses. Fine for a portfolio/demo project. If you later want
production-safe, clearly-licensed images, swap the DOWNLOAD_URL below for
the Unsplash or Pexels API (needs a free API key) — ask Claude to wire that
in if you want it.
"""

import json
import re
import time
from pathlib import Path

import requests

ROOT = Path(__file__).resolve().parent.parent
PRODUCTS_JSON = ROOT / "backend" / "src" / "main" / "resources" / "products.json"
IMAGES_DIR = ROOT / "frontend" / "public" / "images" / "products"


def slugify(name: str) -> str:
    slug = name.lower()
    slug = re.sub(r"[^a-z0-9]+", "-", slug)
    return slug.strip("-")


def download_url(category: str, brand: str, seed: int) -> str:
    # keyword match on category + brand, "lock" makes it deterministic
    # (same product always gets the same photo, not a random one each time)
    tag = f"{category},{brand}".lower().replace(" ", "")
    return f"https://loremflickr.com/500/400/{tag}?lock={seed}"


def main():
    IMAGES_DIR.mkdir(parents=True, exist_ok=True)
    products = json.loads(PRODUCTS_JSON.read_text())

    for i, product in enumerate(products):
        slug = slugify(product["name"])
        filename = f"{slug}.jpg"
        filepath = IMAGES_DIR / filename

        url = download_url(product.get("category", "product"), product.get("brand", ""), seed=i)

        print(f"[{i+1}/{len(products)}] {product['name']} -> {filename}")
        try:
            resp = requests.get(url, timeout=15)
            resp.raise_for_status()
            filepath.write_bytes(resp.content)
        except Exception as e:
            print(f"  FAILED ({e}), skipping — you can re-run the script later to retry missing ones")
            continue

        product["imageUrl"] = f"/images/products/{filename}"
        time.sleep(0.2)  # be polite to the free service

    PRODUCTS_JSON.write_text(json.dumps(products, indent=2))
    print(f"\nDone. Images saved to {IMAGES_DIR}")
    print("products.json updated with local image paths.")
    print("\nNext steps:")
    print("  1. Delete your existing MongoDB 'products' collection (or drop the DB)")
    print("     so ProductLoader reseeds with the new imageUrl values on next backend start.")
    print("  2. git add frontend/public/images/products products.json && git commit")


if __name__ == "__main__":
    main()
