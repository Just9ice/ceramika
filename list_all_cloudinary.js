const cloudinary = require('cloudinary').v2;
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

cloudinary.config({
  cloud_name: "dpsufnobu",
  api_key: "977678752395666",
  api_secret: "C0l1R1COgFsw-rxZ-oqdJWkravg"
});

async function listAll() {
  console.log("Fetching ALL images from Cloudinary (all folders)...\n");
  const allImages = [];
  let nextCursor = null;

  do {
    const opts = { type: 'upload', max_results: 500, resource_type: 'image' };
    if (nextCursor) opts.next_cursor = nextCursor;
    const result = await cloudinary.api.resources(opts);
    nextCursor = result.next_cursor;
    for (const r of result.resources) {
      allImages.push({ public_id: r.public_id, url: r.secure_url });
    }
  } while (nextCursor);

  console.log(`Total images on Cloudinary: ${allImages.length}\n`);
  fs.writeFileSync('all_cloudinary_images.json', JSON.stringify(allImages, null, 2));
  console.log('Saved to all_cloudinary_images.json');

  // Group by folder
  const byFolder = {};
  for (const img of allImages) {
    const parts = img.public_id.split('/');
    const folder = parts.length > 1 ? parts[0] : 'root';
    if (!byFolder[folder]) byFolder[folder] = [];
    byFolder[folder].push(img.public_id);
  }
  console.log('\n📂 Images per folder:');
  for (const [folder, imgs] of Object.entries(byFolder)) {
    console.log(`  ${folder}: ${imgs.length} images`);
  }
}

listAll().catch(console.error);
