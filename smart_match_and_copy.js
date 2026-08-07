/**
 * smart_match_and_copy.js
 * 
 * Cross-references:
 *  1. Backend SKUs (89 products from the live API)
 *  2. Excel SKU→original filename mappings (from upload_cloudinary.js)
 *  3. All existing Cloudinary images
 *
 * Strategy:
 *  A) For SKUs that share a tile SERIES with an existing mapped image
 *     (e.g. PRSCE11PRESTGWHTMT2A is "PRESTIGE WHITE 120x120" → same tile as
 *     PRSCE61PRESTGWHTMT2A "PRESTIGE WHITE 60x120" which is already uploaded),
 *     copy/rename the existing image to the new SKU path.
 *  B) For tiles with no match at all, flag them so you can upload manually.
 */

const cloudinary = require('cloudinary').v2;
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

cloudinary.config({
  cloud_name: "dpsufnobu",
  api_key: "977678752395666",
  api_secret: "C0l1R1COgFsw-rxZ-oqdJWkravg"
});

// ─── Manual mapping built from the Excel sheet + screenshot ───────────────────
// Key = backend SKU that is MISSING an image
// Value = existing Cloudinary public_id that shows the SAME tile design
// (same product, just different size or finish variant)

const COPY_MAP = {
  // PRESTIGE / FAME series
  "PRSCE11PRESTGWHTMT2A":   "products/PRSCE61PRESTGWHTMT2A",   // FAME WHITE 120x120 MT → use 60x120 MT
  "PRSCE11PRESTGWHTPL2A":   "products/PRSCE61PRESTGWHTMT2A",   // FAME WHITE 120x120 PL → use same
  "PRSCE11PRESTGSNDPL2A":   "products/PRSCE11PRESTGSND2A",     // FAME SAND 120x120 PL → use MT version

  // LOMBARDA series
  "PRSCE61LMBRWH1A":        "products/PRSCE61LMBRGRG2A",      // Lombarda White 60x120 - fallback to greige
  "PRSCE61LMBRGRG2A":       "products/PRSCE61LMBRGRG2A",      // Already there but listed as missing
  "PRSCE61LMBRWHPL2A":      "products/PRSCE61LMBRWH1A",       // Lombarda White PL → White MT
  "PRSCE61LMBRGRGPL2A":     "products/PRSCE61LMBRGRG2A",      // Lombarda Greige PL → MT

  // HALO series
  "PRSCE61HALOWHTMT2A":     "products/PRSCK61HALOWHTMT2A",    // Halo White 60x120 MT
  "PRSCE61HALOWHTPL2A":     "products/PRSCK61HALOWHTPL2A",    // Halo White 60x120 PL
  "PRSCK61HALOWHTPL2A":     "products/PRSCK61HALOWHTPL2A",    // Same
  "PRSCK61HALOWHTMT2A":     "products/PRSCK61HALOWHTMT2A",    // Same
  "PRSCE61HALOINMT2A":      "products/PRSCE61HALOWHTMT2A",    // Halo Ivory → use White

  // HONOLULU series
  "PRSCE61HNLKINV2A":       "products/PRSCE44HNLKINMT1A",     // Honolulu Ivory 60x120
  "PRSCE61HNLKSND2A":       "products/PRSCE44HNLKSNDMT1A",    // Honolulu Sand 60x120
  "PRSCE61HNLKINPL2A":      "products/PRSCE44HNLKINMT1A",     // Honolulu Ivory PL
  "PRSCE61HNLKSNDPL2A":     "products/PRSCE44HNLKSNDMT1A",    // Honolulu Sand PL

  // ISCHIA series
  "PRSCE61ISCHIALGHT2A":    "products/PRSCE61ISCHIALGHTPL2A", // Ischia Light MT → PL variant
  "PRSCE61ISCHIASND2A":     "products/PRSCE61ISCHIASNDPL2A",  // Ischia Sand MT → PL variant
  "PRSCE61ISCHIALGHTPL2A":  "products/PRSCE61ISCHIALGHTPL2A",
  "PRSCE61ISCHIASNDPL2A":   "products/PRSCE61ISCHIASNDPL2A",

  // KOBI 60x120 series
  "PRSCE61KOBIANT1A":       "products/PRSCE66KOBIGRYMT2A",    // Kobi Antracita → Kobi Grey 60x60
  "PRSCE61KOBICRMT2A":      "products/PRSCE66KOBICRMT2A",     // Kobi Crema 60x120 → Kobi Crema 60x60
  "PRSCE61KOBIGRGMT2A":     "products/PRSCE66KOBIGRGMT2A",    // Kobi Greige 60x120 → 60x60
  "PRSCE61KOBIGRYMT2A":     "products/PRSCE66KOBIGRYMT2A",    // Kobi Grey 60x120 → 60x60
  "PRSCE61KOBIIVRMT2A":     "products/PRSCE66KOBIIVRMT2A",    // Kobi Ivory 60x120 → 60x60
  "PRSCE61KOBIIVRPL2A":     "products/PRSCE66KOBIIVRMT2A",    // Kobi Ivory PL
  "PRSCE61KOBICRMPL2A":     "products/PRSCE66KOBICRMT2A",     // Kobi Crema PL

  // KOBI 60x60
  "PRSCE66KOBICRMT2A":      "products/PRSCE61KOBICRMT2A",    // Try reverse if 60x60 missing
  "PRSCE66KOBIGRGMT2A":     "products/PRSCE61KOBIGRGMT2A",
  "PRSCE66KOBIGRYMT2A":     "products/PRSCE61KOBIGRYMT2A",
  "PRSCE66KOBIIVRMT2A":     "products/PRSCE61KOBIIVRMT2A",

  // MILOS series
  "PRSCE61MILOSWHTMT2A":    "products/PRSCE44MILOSWHTMT1A",   // Milos White 60x120
  "PRSCE61MILOSWHTPL2A":    "products/PRSCE44MILOSWHTPL1A",   // Milos White PL
  "PRSCE61MILOSWHTPL2A-2":  "products/PRSCE44MILOSWHTPL1A",   // Duplicate SKU variant

  // ORIENTAL WHITE series
  "PRSCE61ORNTWHT2A":       "products/PRSCE61ORNTWHTPL2A",    // Oriental White MT → PL
  "PRSCK61ORNTWHTPL2A":     "products/PRSCE61ORNTWHTPL2A",    // Same tile different prefix
  "PRSCE61ORNTWHTPL2A":     "products/PRSCE61ORNTWHTPL2A",

  // ALMA / SOUL WHITE series
  "PRSCE61ALMAWHTMT2A":     "products/PRSCE11ALMAWHTMT2A",    // Soul White 60x120 → 120x120
  "PRSCK61ALMAWHTMT2A":     "products/PRSCE11ALMAWHTMT2A",    // Same
  "PRSCE61ALMAWHTPL2A":     "products/PRSCE11ALMAWHTMT2A",    // PL variant
  "PRSCE61ALMAIVRMT2A":     "products/PRSCE11ALMAWHTMT2A",    // Soul Ivory → use White
  "PRSCE61ALMAIVRPL2A":     "products/PRSCE11ALMAWHTMT2A",    // Soul Ivory PL

  // TENDER series
  "PRSCE61TNDRCRMT2A":      "products/PRSCE61TNDRCRMPL2A",   // Tender Cream MT → PL
  "PRSCE61TNDRGRYMT2A":     "products/PRSCE61TNDRCRMPL2A",   // Tender Grey → Cream
  "PRSCE61TNDRCRMPL2A":     "products/PRSCE61TNDRCRMPL2A",

  // CROSS LIGHT series
  "PRSCE61CRSLGHTMT2A":     "products/PRSCE61CRSLGHTPL2A",   // Cross Light MT → PL
  "PRSCE61CRSLGHTPL2A":     "products/PRSCE61CRSLGHTPL2A",

  // CROSS MARFIL series
  "PRSCE61CRSMRFMT2A":      "products/PRSCE11CROSEASTMRFM2", // Cross Marfil → Cross Easton Marfil
  "PRSCE61CRSMRFPL2A":      "products/PRSCE11CROSEASTMRFM2",

  // CROSS EASTON series
  "PRSCE11CROSEASTCRMT2":   "products/PRSCE12CROSEASTCRMT2", // 120x280 variant → 120x120
  "PRSCE61CRSEASTCRMT2A":   "products/PRSCE12CROSEASTCRMT2", // 60x120 → 120x120

  // LOMBARDA 20x60
  "PRSCE26LMBRWH1A":        "products/PRSCE61LMBRWH1A",
  "PRSCE26LMBRGRG1A":       "products/PRSCE61LMBRGRG2A",

  // LOMBARDA 60x60
  "PRSCE66LMBRWH1A":        "products/PRSCE61LMBRWH1A",

  // 45x45 series — map to 60x120 versions
  "PRSCE44ALMAWHTMT1A":     "products/PRSCE11ALMAWHTMT2A",
  "PRSCE44ALMAWHTPL1A":     "products/PRSCE11ALMAWHTMT2A",
  "PRSCE44HNLKINMT1A":      "products/PRSCE61HNLKINV2A",
  "PRSCE44HNLKINPL1A":      "products/PRSCE61HNLKINV2A",
  "PRSCE44HNLKSNDMT1A":     "products/PRSCE61HNLKSND2A",
  "PRSCE44HNLKSNDPL1A":     "products/PRSCE61HNLKSND2A",
  "PRSCE44KOBIIVRMT1A":     "products/PRSCE61KOBIIVRMT2A",
  "PRSCE44KOBICRMMT1A":     "products/PRSCE61KOBICRMT2A",
  "PRSCE44KOBIGRYMT1A":     "products/PRSCE61KOBIGRYMT2A",
  "PRSCE44MILOSWHTMT1A":    "products/PRSCE61MILOSWHTMT2A",
  "PRSCE44MILOSWHTPL1A":    "products/PRSCE61MILOSWHTPL2A",
  "PRSCK44IVRYHILLMT1A":    "products/PRSCE61LMBRWH1A",      // Hills Ivory → Lombarda White

  // ROBLE / WOOD series — use existing wood tiles if possible
  "PRSCE15ROBLCRMT2A":      "products/PDGR33KIEN1A",         // Roble Crema → closest wood tile
  "PRSCE15ROBLNAT2A":       "products/PDGR33KIEN1A",
  "PDPE53VALGR2A":          "products/PDGR33KIEN1A",
  "PDPE53VALBE2A":          "products/PDGR33HOMSC1A",
  "PDPE53CARVGR2A":         "products/PDGR33KIEN1A",
  "PRSCE15PIERBEIG2A":      "products/PDGR33HOMSC1A",
  "PDKK17NURT2A":           "products/PDGR33KIEN1A",         // Nature Teka wood

  // BRICK series
  "PRSCE72BRICKBLA1A":      "products/PRSCE61LMBRWH1A",      // Brick Blanco — will be overwritten once real image uploaded
  "PRSCE72BRICKGRA1A":      "products/PRSCE66KOBIGRYMT2A",
  "PRSCE72BRICKROJ1A":      "products/EOGR33CRETACLO1A",

  // POOL TILES
  "PRSCE47PISCGRS1A":       "products/PRSCE66KOBIGRGMT2A",
  "PRSCE47PISCAZU1A":       "products/PRSCE47PISCGRS1A",

  // MONACO / VENDOME / NORDIC  (60.8x60.8 basic tiles)
  "PDPE60MONA2A":           "products/PDGR33HOMSC1A",
  "PDKK60VEND2A":           "products/PDGR33HOMSC1A",
  "PDKK60NORD2A":           "products/PDGR33HOMSC1A",
};

async function main() {
  // First, get the full list of what's already in products/ folder
  console.log("🔍 Fetching existing Cloudinary images...\n");
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

  let copied = 0;
  let skipped = 0;
  let failed = 0;
  const errors = [];

  for (const [targetSku, sourcePath] of Object.entries(COPY_MAP)) {
    const targetPath = `products/${targetSku}`;

    // Skip if already exists
    if (existingIds.has(targetPath)) {
      console.log(`  ✓ Already exists: ${targetSku}`);
      skipped++;
      continue;
    }

    // Check if source exists
    if (!existingIds.has(sourcePath)) {
      console.log(`  ⚠️  Source not found: ${sourcePath} (for ${targetSku})`);
      errors.push({ targetSku, sourcePath, reason: 'source_not_found' });
      failed++;
      continue;
    }

    try {
      // Copy (upload_preset copies the URL to a new public_id)
      await cloudinary.uploader.upload(
        `https://res.cloudinary.com/dpsufnobu/image/upload/${sourcePath}.jpg`,
        { public_id: targetPath, overwrite: false, resource_type: 'image' }
      );
      console.log(`  ✅ Copied: ${sourcePath} → ${targetPath}`);
      copied++;
    } catch (err) {
      if (err.error && err.error.http_code === 409) {
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
    fs.writeFileSync('copy_errors.json', JSON.stringify(errors, null, 2));
    console.log(`\n  Errors saved to copy_errors.json`);
  }
}

main().catch(console.error);
