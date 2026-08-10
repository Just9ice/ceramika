/**
 * smart_copy_v2.js
 * 
 * Updated copy map using the actual Cloudinary public_ids (with _main suffix)
 * from the tile images uploaded from public/tile/
 */

const cloudinary = require('cloudinary').v2;
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

cloudinary.config({
  cloud_name: "dpsufnobu",
  api_key: "977678752395666",
  api_secret: "C0l1R1COgFsw-rxZ-oqdJWkravg"
});

// Key = target SKU (missing image)
// Value = existing Cloudinary public_id to copy from (source)
const COPY_MAP = {
  // ── LOMBARDA ─────────────────────────────────────────────────────────
  "PRSCE61LMBRWH1A":       "products/PRSCE61LMBRWH1A_main",
  "PRSCE61LMBRGRG2A":      "products/PRSCE61LMBRGRGPL2A_main",
  "PRSCE61LMBRWHPL2A":     "products/PRSCE61LMBRWHPL2A_main",
  "PRSCE61LMBRGRGPL2A":    "products/PRSCE61LMBRGRGPL2A_main",
  "PRSCE26LMBRWH1A":       "products/PRSCE61LMBRWH1A_main",
  "PRSCE26LMBRGRG1A":      "products/PRSCE61LMBRGRGPL2A_main",
  "PRSCE66LMBRWH1A":       "products/PRSCE61LMBRWH1A_main",
  "PRSCK44IVRYHILLMT1A":   "products/PRSCE61LMBRWH1A_main",  // Ivory Hills → use Lombarda White

  // ── HALO ─────────────────────────────────────────────────────────────
  "PRSCE61HALOWHTMT2A":    "products/PRSCE61HALOWHTMT2A_main",
  "PRSCE61HALOWHTPL2A":    "products/PRSCE61HALOWHTPL2A_main",
  "PRSCK61HALOWHTPL2A":    "products/PRSCE61HALOWHTPL2A_main",
  "PRSCK61HALOWHTMT2A":    "products/PRSCK61HALOWHTMT2A_main",
  "PRSCE61HALOINMT2A":     "products/PRSCE61HALOWHTMT2A_main",  // Halo Ivory → Halo White

  // ── HONOLULU ─────────────────────────────────────────────────────────
  // No Honolulu images exist — fallback to Halo White (similar neutral tone)
  "PRSCE61HNLKINV2A":      "products/PRSCE61HALOWHTMT2A_main",
  "PRSCE61HNLKSND2A":      "products/PRSCE61LMBRWH1A_main",
  "PRSCE61HNLKINPL2A":     "products/PRSCE61HALOWHTPL2A_main",
  "PRSCE61HNLKSNDPL2A":    "products/PRSCE61LMBRWHPL2A_main",
  "PRSCE44HNLKINMT1A":     "products/PRSCE61HALOWHTMT2A_main",
  "PRSCE44HNLKINPL1A":     "products/PRSCE61HALOWHTPL2A_main",
  "PRSCE44HNLKSNDMT1A":    "products/PRSCE61LMBRWH1A_main",
  "PRSCE44HNLKSNDPL1A":    "products/PRSCE61LMBRWHPL2A_main",

  // ── ISCHIA ───────────────────────────────────────────────────────────
  // Ischia is a stone-look — use Lombarda White as placeholder
  "PRSCE61ISCHIALGHT2A":   "products/PRSCE61LMBRWH1A_main",
  "PRSCE61ISCHIASND2A":    "products/PRSCE61LMBRGRGPL2A_main",
  "PRSCE61ISCHIALGHTPL2A": "products/PRSCE61LMBRWHPL2A_main",
  "PRSCE61ISCHIASNDPL2A":  "products/PRSCE61LMBRGRGPL2A_main",

  // ── KOBI ─────────────────────────────────────────────────────────────
  // Kobi is a stone-look — map to closest neutral tones available
  "PRSCE61KOBIANT1A":      "products/PRSCE61LMBRGRGPL2A_main",  // Antracita → Greige
  "PRSCE61KOBICRMT2A":     "products/PRSCE61LMBRWH1A_main",
  "PRSCE61KOBIGRGMT2A":    "products/PRSCE61LMBRGRGPL2A_main",
  "PRSCE61KOBIGRYMT2A":    "products/PRSCE61LMBRGRGPL2A_main",
  "PRSCE61KOBIIVRMT2A":    "products/PRSCE61LMBRWH1A_main",
  "PRSCE61KOBIIVRPL2A":    "products/PRSCE61LMBRWHPL2A_main",
  "PRSCE61KOBICRMPL2A":    "products/PRSCE61LMBRWHPL2A_main",
  "PRSCE66KOBICRMT2A":     "products/PRSCE61LMBRWH1A_main",
  "PRSCE66KOBIGRGMT2A":    "products/PRSCE61LMBRGRGPL2A_main",
  "PRSCE66KOBIGRYMT2A":    "products/PRSCE61LMBRGRGPL2A_main",
  "PRSCE66KOBIIVRMT2A":    "products/PRSCE61LMBRWH1A_main",
  "PRSCE44KOBIIVRMT1A":    "products/PRSCE61LMBRWH1A_main",
  "PRSCE44KOBICRMMT1A":    "products/PRSCE61LMBRWH1A_main",
  "PRSCE44KOBIGRYMT1A":    "products/PRSCE61LMBRGRGPL2A_main",

  // ── MILOS WHITE ──────────────────────────────────────────────────────
  "PRSCE61MILOSWHTMT2A":   "products/PRSCE61LMBRWH1A_main",
  "PRSCE61MILOSWHTPL2A":   "products/PRSCE61LMBRWHPL2A_main",
  "PRSCE61MILOSWHTPL2A-2": "products/PRSCE61LMBRWHPL2A_main",
  "PRSCE44MILOSWHTMT1A":   "products/PRSCE61LMBRWH1A_main",
  "PRSCE44MILOSWHTPL1A":   "products/PRSCE61LMBRWHPL2A_main",

  // ── ORIENTAL WHITE ───────────────────────────────────────────────────
  "PRSCE61ORNTWHT2A":      "products/PRSCE61LMBRWH1A_main",
  "PRSCK61ORNTWHTPL2A":    "products/PRSCE61LMBRWHPL2A_main",
  "PRSCE61ORNTWHTPL2A":    "products/PRSCE61LMBRWHPL2A_main",

  // ── SOUL / ALMA ──────────────────────────────────────────────────────
  "PRSCE61ALMAWHTMT2A":    "products/PRSCE61LMBRWH1A_main",
  "PRSCK61ALMAWHTMT2A":    "products/PRSCE61LMBRWH1A_main",
  "PRSCE61ALMAWHTPL2A":    "products/PRSCE61LMBRWHPL2A_main",
  "PRSCE61ALMAIVRMT2A":    "products/PRSCE61LMBRWH1A_main",
  "PRSCE61ALMAIVRPL2A":    "products/PRSCE61LMBRWHPL2A_main",
  "PRSCE44ALMAWHTMT1A":    "products/PRSCE61LMBRWH1A_main",
  "PRSCE44ALMAWHTPL1A":    "products/PRSCE61LMBRWHPL2A_main",

  // ── TENDER ───────────────────────────────────────────────────────────
  "PRSCE61TNDRCRMT2A":     "products/PRSCE61LMBRWH1A_main",
  "PRSCE61TNDRGRYMT2A":    "products/PRSCE61LMBRGRGPL2A_main",
  "PRSCE61TNDRCRMPL2A":    "products/PRSCE61LMBRWHPL2A_main",

  // ── CROSS LIGHT ──────────────────────────────────────────────────────
  "PRSCE61CRSLGHTMT2A":    "products/PRSCE61LMBRWH1A_main",
  "PRSCE61CRSLGHTPL2A":    "products/PRSCE61LMBRWHPL2A_main",

  // ── PRESTIGE (already exist, map just in case) ───────────────────────
  "PRSCE11PRESTGSNDPL2A":  "products/PRSCE61LMBRGRGPL2A_main",
  "PRSCE11PRESTGWHTMT2A":  "products/PRSCE61LMBRWH1A_main",
  "PRSCE11PRESTGWHTPL2A":  "products/PRSCE61LMBRWHPL2A_main",

  // ── BRICK ────────────────────────────────────────────────────────────
  "PRSCE72BRICKBLA1A":     "products/PRSCE61LMBRWH1A_main",
  "PRSCE72BRICKGRA1A":     "products/PRSCE61LMBRGRGPL2A_main",

  // ── POOL TILES ───────────────────────────────────────────────────────
  "PRSCE47PISCGRS1A":      "products/PRSCE61LMBRGRGPL2A_main",
  "PRSCE47PISCAZU1A":      "products/PRSCE61HALOWHTMT2A_main",
};

async function main() {
  console.log("Fetching existing Cloudinary images...\n");
  const existingIds = new Set();
  let nextCursor = null;
  do {
    const opts = { type: 'upload', prefix: 'products/', max_results: 500 };
    if (nextCursor) opts.next_cursor = nextCursor;
    const result = await cloudinary.api.resources(opts);
    nextCursor = result.next_cursor;
    for (const r of result.resources) existingIds.add(r.public_id);
  } while (nextCursor);

  console.log(`Found ${existingIds.size} existing images in products/ folder\n`);

  let copied = 0, skipped = 0, failed = 0;
  const errors = [];

  for (const [targetSku, sourcePath] of Object.entries(COPY_MAP)) {
    const targetPath = `products/${targetSku}`;
    if (existingIds.has(targetPath)) {
      console.log(`  ✓ Already exists: ${targetSku}`);
      skipped++;
      continue;
    }
    if (!existingIds.has(sourcePath)) {
      console.log(`  ⚠️  Source not found: ${sourcePath} (for ${targetSku})`);
      errors.push({ targetSku, sourcePath, reason: 'source_not_found' });
      failed++;
      continue;
    }
    try {
      const imageUrl = `https://res.cloudinary.com/dpsufnobu/image/upload/${sourcePath}`;
      await cloudinary.uploader.upload(imageUrl, {
        public_id: targetPath,
        overwrite: false,
        resource_type: 'image'
      });
      console.log(`  ✅ Copied: ${sourcePath} → ${targetPath}`);
      copied++;
    } catch (err) {
      if (err.http_code === 409 || (err.error && err.error.http_code === 409)) {
        console.log(`  ✓ Already exists (409): ${targetSku}`);
        skipped++;
      } else {
        console.error(`  ❌ Failed: ${targetSku} — ${err.message}`);
        errors.push({ targetSku, sourcePath, reason: err.message });
        failed++;
      }
    }
  }

  console.log(`\n🎉 Done!`);
  console.log(`  ✅ Copied:  ${copied}`);
  console.log(`  ⏭  Skipped: ${skipped}`);
  console.log(`  ❌ Failed:  ${failed}`);
  if (errors.length > 0) {
    fs.writeFileSync('copy_errors_v2.json', JSON.stringify(errors, null, 2));
    console.log(`\n  Errors saved to copy_errors_v2.json`);
  }
}

main().catch(console.error);
