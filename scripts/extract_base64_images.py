from pathlib import Path
import base64
import hashlib
import re

DATA_URI_RE = re.compile(
    r"data:image/(?P<fmt>png|jpeg|jpg|webp|gif);base64,(?P<data>[A-Za-z0-9+/=]+)",
    re.I,
)

TEXT_FILES = []
for pattern in ("*.html", "*.html.template"):
    TEXT_FILES.extend(Path(".").rglob(pattern))

def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()

def existing_asset_hashes():
    result = {}
    assets = Path("assets")
    if not assets.exists():
        return result
    for path in assets.rglob("*"):
        if not path.is_file():
            continue
        try:
            data = path.read_bytes()
        except OSError:
            continue
        result.setdefault(sha256(data), path)
    return result

def choose_new_path(fmt: str, contexts: list[str], digest: str) -> Path:
    joined = " ".join(contexts).lower()
    ext = "jpg" if fmt.lower() in ("jpeg", "jpg") else fmt.lower()
    if "gaeo" in joined and ext == "png":
        return Path("assets/gaeo-logo.png")
    if ("алексей яковлев" in joined or "alexey yakovlev" in joined or 'class="portrait"' in joined) and ext == "jpg":
        return Path("assets/alexey-yakovlev-home.jpg")
    return Path(f"assets/inline-image-{digest[:10]}.{ext}")

def main():
    asset_hashes = existing_asset_hashes()
    unique = {}
    file_texts = {}

    for path in TEXT_FILES:
        text = path.read_text(encoding="utf-8")
        file_texts[path] = text
        for match in DATA_URI_RE.finditer(text):
            payload = match.group("data")
            data = base64.b64decode(payload)
            digest = sha256(data)
            ctx = text[max(0, match.start() - 220): min(len(text), match.end() + 220)]
            ctx = re.sub(DATA_URI_RE, "[INLINE_IMAGE]", ctx)
            info = unique.setdefault(
                digest,
                {
                    "fmt": match.group("fmt"),
                    "data": data,
                    "uri": match.group(0),
                    "contexts": [],
                    "count": 0,
                },
            )
            info["count"] += 1
            if len(info["contexts"]) < 4:
                info["contexts"].append(ctx)

    if not unique:
        raise SystemExit("No base64 image data URIs found.")

    replacements = {}
    created = []
    reused = []

    for digest, info in unique.items():
        if digest in asset_hashes:
            target = asset_hashes[digest]
            reused.append((digest[:10], str(target), info["count"]))
        else:
            target = choose_new_path(info["fmt"], info["contexts"], digest)
            target.parent.mkdir(parents=True, exist_ok=True)
            if target.exists() and sha256(target.read_bytes()) != digest:
                target = target.with_name(target.stem + "-" + digest[:8] + target.suffix)
            target.write_bytes(info["data"])
            created.append((digest[:10], str(target), len(info["data"]), info["count"]))
            asset_hashes[digest] = target
        replacements[info["uri"]] = "/" + str(target).replace("\\", "/")

    changed = []
    for path, text in file_texts.items():
        original = text
        for old, new in replacements.items():
            text = text.replace(old, new)
        if text != original:
            path.write_text(text, encoding="utf-8")
            changed.append(str(path))

    leftovers = []
    for path in TEXT_FILES:
        text = path.read_text(encoding="utf-8")
        if DATA_URI_RE.search(text) or "data:image" in text.lower():
            leftovers.append(str(path))
    if leftovers:
        raise RuntimeError("Base64/data:image references remain in: " + ", ".join(leftovers))

    print(f"Unique inline images: {len(unique)}")
    print(f"Changed files: {len(changed)}")
    for item in created:
        print("CREATED", item)
    for item in reused:
        print("REUSED", item)
    for path in changed:
        print("UPDATED", path)

if __name__ == "__main__":
    main()
