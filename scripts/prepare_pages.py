#!/usr/bin/env python3
from pathlib import Path
import os

base = os.environ.get("NEXT_PUBLIC_BASE_PATH", "").strip()
if base and not base.startswith("/"):
    base = "/" + base
base = base.rstrip("/")

if not base:
    print("No GitHub Pages base path set; nothing to rewrite.")
    raise SystemExit(0)

src = Path("client/src")
extensions = {".js", ".jsx", ".css", ".mjs"}

for path in src.rglob("*"):
    if not path.is_file() or path.suffix.lower() not in extensions:
        continue
    try:
        text = path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        continue

    original = text
    text = text.replace("/images/", f"{base}/images/")
    text = text.replace("/favicon.svg", f"{base}/favicon.svg")

    if text != original:
        path.write_text(text, encoding="utf-8")
        print(f"Rewrote public asset paths in {path}")
