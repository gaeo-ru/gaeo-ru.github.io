from pathlib import Path
from PIL import Image, ImageOps
import io
import re

MAX_CONTENT_WIDTH = 1200
MAX_BIO_WIDTH = 1000
TARGET_BYTES = 180 * 1024
JPEG_QUALITIES = (90, 88, 86, 84, 82, 80, 78, 76, 74, 72)

def resize_to_width(im, max_width):
    if im.width <= max_width:
        return im, False
    height = round(im.height * max_width / im.width)
    return im.resize((max_width, height), Image.Resampling.LANCZOS), True

def encode_jpeg(im, quality):
    if im.mode not in ("RGB", "L"):
        im = im.convert("RGB")
    out = io.BytesIO()
    im.save(out, "JPEG", quality=quality, optimize=True, progressive=True, subsampling=0)
    return out.getvalue()

def optimize_jpeg(path, max_width):
    original = path.read_bytes()
    with Image.open(io.BytesIO(original)) as src:
        im = ImageOps.exif_transpose(src).convert("RGB")
        im, resized = resize_to_width(im, max_width)
        if not resized and len(original) <= TARGET_BYTES:
            return None
        best = None
        for quality in JPEG_QUALITIES:
            data = encode_jpeg(im, quality)
            best = (data, quality, im.size)
            if len(data) <= TARGET_BYTES:
                break
        data, quality, size = best
        if len(data) >= len(original) and not resized:
            return None
        path.write_bytes(data)
        return len(original), len(data), size, quality

def build_visible_logo():
    source = Path("assets/gaeo-icon-512.png")
    target = Path("assets/gaeo-logo-128.png")
    with Image.open(source) as src:
        im = src.convert("RGBA") if "A" in src.getbands() else src.convert("RGB")
        im = im.resize((128, 128), Image.Resampling.LANCZOS)
        out = io.BytesIO()
        im.save(out, "PNG", optimize=True, compress_level=9)
        target.write_bytes(out.getvalue())
    return target

def dimensions():
    result = {}
    for p in Path("assets").rglob("*"):
        if not p.is_file() or p.suffix.lower() not in {".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"}:
            continue
        try:
            with Image.open(p) as im:
                result["/" + p.as_posix()] = (im.width, im.height)
        except Exception:
            pass
    return result

ATTR_RE = lambda name: re.compile(rf'\s+{name}=(?:"[^"]*"|\'[^\']*\'|[^\s>]+)', re.I)
IMG_RE = re.compile(r"<img\b[^>]*>", re.I | re.S)
SRC_RE = re.compile(r'\bsrc=["\']([^"\']+)["\']', re.I)

def set_attr(tag, name, value):
    pat = ATTR_RE(name)
    attr = f' {name}="{value}"'
    if pat.search(tag):
        return pat.sub(attr, tag, count=1)
    return tag[:-1] + attr + ">"

def in_open_element(text, pos, element):
    start = text.rfind(f"<{element}", 0, pos)
    end = text.rfind(f"</{element}>", 0, pos)
    return start > end

def is_hero_image(text, pos):
    before = text[max(0, pos - 700):pos].lower()
    return (
        'class="portrait"' in before
        or "class='portrait'" in before
        or 'inner-hero__media' in before
    )

def update_html(dim_map):
    changed = []
    stats = {"local": 0, "eager": 0, "lazy": 0, "hero_high": 0}

    files = sorted(list(Path(".").rglob("*.html")) + list(Path(".").rglob("*.html.template")))
    for path in files:
        text = path.read_text(encoding="utf-8")
        original = text
        pieces = []
        last = 0

        for m in IMG_RE.finditer(text):
            pieces.append(text[last:m.start()])
            tag = m.group(0)
            sm = SRC_RE.search(tag)
            src = sm.group(1) if sm else ""

            if src == "/assets/gaeo-icon-512.png":
                tag = tag.replace(src, "/assets/gaeo-logo-128.png")
                src = "/assets/gaeo-logo-128.png"

            if src.startswith("/assets/") and src in dim_map:
                stats["local"] += 1
                w, h = dim_map[src]
                tag = set_attr(tag, "width", str(w))
                tag = set_attr(tag, "height", str(h))
                tag = set_attr(tag, "decoding", "async")

                header = in_open_element(text, m.start(), "header")
                hero = is_hero_image(text, m.start())
                if header or hero:
                    tag = set_attr(tag, "loading", "eager")
                    stats["eager"] += 1
                else:
                    tag = set_attr(tag, "loading", "lazy")
                    stats["lazy"] += 1

                if hero:
                    tag = set_attr(tag, "fetchpriority", "high")
                    stats["hero_high"] += 1

            pieces.append(tag)
            last = m.end()

        pieces.append(text[last:])
        new_text = "".join(pieces)
        if new_text != original:
            path.write_text(new_text, encoding="utf-8")
            changed.append(str(path))

    return changed, stats

def verify(dim_map):
    problems = []
    local_count = 0
    for path in sorted(list(Path(".").rglob("*.html")) + list(Path(".").rglob("*.html.template"))):
        text = path.read_text(encoding="utf-8")
        for tag in IMG_RE.findall(text):
            sm = SRC_RE.search(tag)
            src = sm.group(1) if sm else ""
            if not src.startswith("/assets/"):
                continue
            local_count += 1
            if src not in dim_map:
                problems.append((str(path), src, "missing asset"))
                continue
            for attr in ("alt", "width", "height", "loading", "decoding"):
                if not re.search(rf'\b{attr}=["\'][^"\']*["\']', tag, re.I):
                    problems.append((str(path), src, "missing " + attr))
            if src == "/assets/gaeo-icon-512.png":
                problems.append((str(path), src, "visible 512px logo still used"))

    oversize = []
    for p in list(Path("assets/articles").glob("*.jpg")) + list(Path("assets/cases").glob("*.jpg")):
        if p.stat().st_size > 180 * 1024:
            oversize.append((str(p), p.stat().st_size))

    if problems:
        raise RuntimeError("HTML image verification failed: " + repr(problems[:30]))
    if oversize:
        raise RuntimeError("Content JPGs above 180 KB: " + repr(oversize))
    return local_count

def main():
    optimised = []
    candidates = list(Path("assets/articles").glob("*.jpg")) + list(Path("assets/cases").glob("*.jpg"))
    for p in sorted(candidates):
        result = optimize_jpeg(p, MAX_CONTENT_WIDTH)
        if result:
            optimised.append((str(p),) + result)

    bio = Path("assets/alexey-yakovlev-biography.jpg")
    result = optimize_jpeg(bio, MAX_BIO_WIDTH)
    if result:
        optimised.append((str(bio),) + result)

    logo = build_visible_logo()
    dim_map = dimensions()
    changed, stats = update_html(dim_map)
    dim_map = dimensions()
    local_count = verify(dim_map)

    print("OPTIMIZED FILES")
    for row in optimised:
        path, before, after, size, quality = row
        print(f"{path}\t{before}->{after}\t{size[0]}x{size[1]}\tq={quality}")
    print(f"VISIBLE LOGO\t{logo}\t{logo.stat().st_size} bytes")
    print(f"HTML FILES CHANGED\t{len(changed)}")
    print(f"LOCAL IMG TAGS VERIFIED\t{local_count}")
    print("LOAD STRATEGY\t" + "\t".join(f"{k}={v}" for k,v in stats.items()))
    print("VERIFICATION\tPASS")

if __name__ == "__main__":
    main()
