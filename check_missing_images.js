const cloudinary = require('cloudinary').v2;
require('dotenv').config({ path: '.env.local' });

cloudinary.config({
  cloud_name: "dpsufnobu",
  api_key: "977678752395666",
  api_secret: "C0l1R1COgFsw-rxZ-oqdJWkravg"
});

// All 89 SKUs from the live backend
const backendSkus = [
  "PRSCE11CROSEASTMRFM2","PRSCE12CROSEASTCRMT2","PRSCE11CROSEASTCRMT2","PRSCE11BIANCOSIBGRG2",
  "PRSCE11ALMAWHTMT2A","PRSCEPRESTGPRLMT2A","PRSCE61PRESTGWHTMT2A","PRSCE11PRESTGSND2A",
  "PRSCE11PRESTGSNDPL2A","PRSCE11PRESTGWHTMT2A","PRSCE11PRESTGWHTPL2A","PRSCE61LMBRWH1A",
  "PRSCE61HALOWHTMT2A","PRSCE61HNLKINV2A","PRSCE61HNLKSND2A","PRSCE61ISCHIALGHT2A",
  "PRSCE61ISCHIASND2A","PRSCE61KOBIANT1A","PRSCE61KOBICRMT2A","PRSCE61KOBIGRGMT2A",
  "PRSCE61KOBIGRYMT2A","PRSCE61KOBIIVRMT2A","PRSCE61LMBRGRG2A","PRSCE61MILOSWHTMT2A",
  "PRSCE61ORNTWHT2A","PRSCE61TNDRCRMT2A","PRSCE61TNDRGRYMT2A","PRSCE61CRSLGHTMT2A",
  "PRSCK61HALOWHTPL2A","PRSCE61HALOWHTPL2A","PRSCE61MILOSWHTPL2A","PRSCE61MILOSWHTPL2A-2",
  "PRSCK61ORNTWHTPL2A","PRSCE61ORNTWHTPL2A","PRSCE61TNDRCRMPL2A","PRSCK61ALMAWHTMT2A",
  "PRSCE61ALMAWHTMT2A","PRSCE61ALMAWHTPL2A","PRSCK61HALOWHTMT2A","PRSCE61ALMAIVRMT2A",
  "PRSCE61ALMAIVRPL2A","PRSCE61HNLKINPL2A","PRSCE61HNLKSNDPL2A","PRSCE61ISCHIALGHTPL2A",
  "PRSCE61ISCHIASNDPL2A","PRSCE61KOBIIVRPL2A","PRSCE61KOBICRMPL2A","PRSCE61LMBRWHPL2A",
  "PRSCE61LMBRGRGPL2A","PRSCE61CRSLGHTPL2A","PRSCE61CRSMRFPL2A","GRE33PAVALB1A",
  "PDKK17NURT2A","PRSCE15ROBLCRMT2A","PRSCE15ROBLNAT2A","PDPE53VALGR2A",
  "PDPE53VALBE2A","PDPE53CARVGR2A","PRSCE15PIERBEIG2A","PRSCE72BRICKBLA1A",
  "PRSCE72BRICKGRA1A","PRSCE72BRICKROJ1A","PRSCE66KOBICRMT2A","PRSCE66KOBIGRGMT2A",
  "PRSCE66KOBIGRYMT2A","PRSCE66KOBIIVRMT2A","PRSCE26LMBRWH1A","PRSCE44ALMAWHTMT1A",
  "PRSCE44ALMAWHTPL1A","PRSCE61CRSMRFMT2A","PRSCE61CRSEASTCRMT2A","PRSCE61HALOINMT2A",
  "PRSCE47PISCGRS1A","PRSCE47PISCAZU1A","PRSCE26LMBRGRG1A","PRSCE44HNLKINMT1A",
  "PRSCE44HNLKINPL1A","PRSCE44HNLKSNDMT1A","PRSCE44HNLKSNDPL1A","PRSCE44KOBIIVRMT1A",
  "PRSCE44KOBICRMMT1A","PRSCE44KOBIGRYMT1A","PRSCE44MILOSWHTMT1A","PRSCE44MILOSWHTPL1A",
  "PDPE60MONA2A","PDKK60VEND2A","PDKK60NORD2A","PRSCE66LMBRWH1A","PRSCK44IVRYHILLMT1A"
];

async function check() {
  console.log("Fetching all images in Cloudinary 'products' folder...\n");

  const cloudinaryImages = new Set();
  let nextCursor = null;
  do {
    const opts = { type: 'upload', prefix: 'products/', max_results: 500 };
    if (nextCursor) opts.next_cursor = nextCursor;
    const result = await cloudinary.api.resources(opts);
    nextCursor = result.next_cursor;
    for (const r of result.resources) {
      cloudinaryImages.add(r.public_id.replace('products/', ''));
    }
  } while (nextCursor);

  console.log(`✅ ${cloudinaryImages.size} images on Cloudinary\n`);

  const missing = backendSkus.filter(sku => !cloudinaryImages.has(sku));

  if (missing.length === 0) {
    console.log("✅ All 89 products have matching images on Cloudinary!");
  } else {
    console.log(`❌ ${missing.length} SKUs are missing images:\n`);
    missing.forEach(sku => console.log(`  MISSING: ${sku}`));

    // Save list
    const fs = require('fs');
    fs.writeFileSync('missing_images.json', JSON.stringify(missing, null, 2));
    console.log('\n📄 Saved to missing_images.json');
  }
}

check().catch(console.error);
