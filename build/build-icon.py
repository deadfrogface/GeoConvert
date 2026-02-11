"""
Creates build/icon.ico from the same design as icon.svg (drawn with Pillow).
Sizes: 16, 32, 48, 256. Run from project root: python build/build-icon.py
Requires: pip install Pillow
"""
import sys
from pathlib import Path
from PIL import Image, ImageDraw

script_dir = Path(__file__).resolve().parent
ico_path = script_dir / "icon.ico"
sizes = [(16, 16), (32, 32), (48, 48), (256, 256)]

# Design in 64x64 logical units (matches icon.svg)
def draw_icon(size):
    w, h = size
    scale = w / 64
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    # Dark blue circle
    margin = max(1, int(scale))
    draw.ellipse([margin, margin, w - margin, h - margin], fill="#1a237e", outline="#0d1542", width=max(1, int(scale * 0.5)))
    # Grid: latitude (horizontal) and longitude (vertical), subtle white
    line_w = max(1, round(0.6 * scale))
    def line(x1, y1, x2, y2, opacity=0.4):
        draw.line([(x1 * scale, y1 * scale), (x2 * scale, y2 * scale)], fill=(255, 255, 255, int(255 * opacity)), width=line_w)
    line(8, 16, 56, 16)
    line(8, 32, 56, 32, 0.5)
    line(8, 48, 56, 48)
    line(16, 10, 16, 54)
    line(32, 10, 32, 54, 0.5)
    line(48, 10, 48, 54)
    # Location pin (teardrop): polygon approximating the SVG path
    # M32 16 C25 16 20 22 20 29 C20 36 32 48 32 48 C32 48 44 36 44 29 C44 22 39 16 32 16 Z
    pin = [
        (32, 16), (25, 16), (20, 22), (20, 29), (20, 36), (32, 48), (32, 48), (44, 36), (44, 29), (44, 22), (39, 16), (32, 16)
    ]
    pin_px = [(int(p[0] * scale), int(p[1] * scale)) for p in pin]
    draw.polygon(pin_px, fill="white", outline="white")
    return img

def main():
    # Build at 256 then Pillow will resize for other sizes when saving ICO
    img = draw_icon((256, 256))
    img.save(ico_path, format="ICO", sizes=sizes)
    print("Created", ico_path, "with sizes", [f"{a}x{b}" for a, b in sizes])

if __name__ == "__main__":
    main()
