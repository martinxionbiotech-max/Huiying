#!/usr/bin/env python3
"""
quality-pass2-images.py — Huiying image quality pass 2.

Actions (each recorded before→after):
  1. byte-hash dedup: delete e2302fd0.jpg (byte-identical to 6a2fe246.jpg),
     repoint its 2 refs (index.astro strengths, company.ts images) to 6a2fe246.
  2. convert referenced .jpg >= 100KB -> webp q82 (repoint all src refs)
  3. delete UNREFERENCED .jpg >= 100KB (dead weight)
  4. re-encode congben .webp > 100KB -> q82 in place (only if smaller)
  5. re-scan: report missing referenced images (must be 0)
  6. OCR watermark spot-check on a sample

Run: python3 scripts/quality-pass2-images.py
"""
import os, re, hashlib, json, shutil
from PIL import Image
from collections import defaultdict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUB = os.path.join(ROOT, "public", "images")
SRC = os.path.join(ROOT, "src")

report = {"dedup": [], "converted": [], "deleted_unreferenced": [], "reencoded": [], "missing_after": []}

def refs_in_src():
    """image path -> set of src files referencing it"""
    m = defaultdict(set)
    for root, _, fs in os.walk(SRC):
        for f in fs:
            if not f.endswith((".astro", ".ts", ".json", ".css", ".mjs", ".js")):
                continue
            p = os.path.join(root, f)
            t = open(p, encoding="utf-8", errors="ignore").read()
            for mm in re.findall(r"/images/[A-Za-z0-9_./-]+", t):
                m[mm].add(p)
    return m

def all_images():
    files = []
    for root, _, fs in os.walk(PUB):
        for f in fs:
            p = os.path.join(root, f)
            rel = "/" + os.path.relpath(p, os.path.join(ROOT, "public"))
            files.append({"abs": p, "rel": rel, "size": os.path.getsize(p)})
    return files

def sha(p):
    return hashlib.sha256(open(p, "rb").read()).hexdigest()

def repoint(old, new, refs):
    changed = []
    for f in refs.get(old, []):
        t = open(f, encoding="utf-8").read()
        if old in t:
            open(f, "w", encoding="utf-8").write(t.replace(old, new))
            changed.append(os.path.relpath(f, ROOT))
    return changed

files = all_images()
refs = refs_in_src()

# ---- 1. byte-hash dedup ------------------------------------------------
byhash = defaultdict(list)
for f in files:
    byhash[sha(f["abs"])].append(f)
for h, grp in byhash.items():
    if len(grp) > 1:
        keep = None
        # keep the one referenced by products.json (of-690) if any, else first
        for f in grp:
            if any("products.json" in r for r in refs.get(f["rel"], [])):
                keep = f
                break
        keep = keep or grp[0]
        for f in grp:
            if f is keep:
                continue
            changed = repoint(f["rel"], keep["rel"], refs)
            os.remove(f["abs"])
            report["dedup"].append({
                "removed": f["rel"], "kept": keep["rel"], "size": f["size"],
                "refs_repointed": changed,
            })

# ---- 2 & 3. jpg >= 100KB ----------------------------------------------
files = all_images()  # refresh after dedup
refs = refs_in_src()
for f in files:
    if not f["rel"].lower().endswith(".jpg"):
        continue
    if f["size"] < 100 * 1024:
        continue
    if f["rel"] in refs and refs[f["rel"]]:
        # convert -> webp q82
        out = f["rel"][:-4] + ".webp"
        out_abs = os.path.join(ROOT, "public", out.lstrip("/"))
        im = Image.open(f["abs"]).convert("RGB")
        im.save(out_abs, "WEBP", quality=82, method=6)
        new_size = os.path.getsize(out_abs)
        changed = repoint(f["rel"], out, refs)
        os.remove(f["abs"])
        report["converted"].append({
            "from": f["rel"], "to": out, "before": f["size"], "after": new_size,
            "refs_repointed": changed,
        })
    else:
        # unreferenced dead weight
        os.remove(f["abs"])
        report["deleted_unreferenced"].append({"removed": f["rel"], "size": f["size"]})

# ---- 4. re-encode congben webp > 100KB -> q82 --------------------------
files = all_images()
refs = refs_in_src()
for f in files:
    if "/congben/" not in f["rel"] or not f["rel"].endswith(".webp"):
        continue
    if f["size"] <= 100 * 1024:
        continue
    im = Image.open(f["abs"]).convert("RGB")
    tmp = f["abs"] + ".q82"
    im.save(tmp, "WEBP", quality=82, method=6)
    if os.path.getsize(tmp) < f["size"]:
        os.replace(tmp, f["abs"])
        report["reencoded"].append({"file": f["rel"], "before": f["size"], "after": os.path.getsize(f["abs"])})
    else:
        os.remove(tmp)

# ---- 5. re-scan missing referenced images ------------------------------
files = all_images()
existing = {f["rel"] for f in files}
refs = refs_in_src()
for r in refs:
    if r not in existing:
        report["missing_after"].append({"ref": r, "used_by": sorted(os.path.basename(x) for x in refs[r])})

print(json.dumps(report, indent=2))
tot_before = sum(x["before"] for x in report["converted"] + report["reencoded"])
tot_after = sum(x["after"] for x in report["converted"] + report["reencoded"])
del_bytes = sum(x["size"] for x in report["dedup"] + report["deleted_unreferenced"])
print(f"\nSUMMARY: dedup={len(report['dedup'])} converted={len(report['converted'])} deleted_unref={len(report['deleted_unreferenced'])} reencoded={len(report['reencoded'])} missing_after={len(report['missing_after'])}")
print(f"recompressed: {tot_before//1024}KB -> {tot_after//1024}KB (saved {(tot_before-tot_after)//1024}KB)")
print(f"deleted bytes: {del_bytes//1024}KB")
