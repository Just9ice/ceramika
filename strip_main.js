const cloudinary = require('cloudinary').v2;
require('dotenv').config({ path: '.env.local' });

cloudinary.config({
  cloud_name: "dpsufnobu",
  api_key: "977678752395666",
  api_secret: "C0l1R1COgFsw-rxZ-oqdJWkravg"
});

async function run() {
  console.log("Fetching images in 'products' folder...");
  
  let nextCursor = null;
  let totalRenamed = 0;

  do {
    const options = {
      type: 'upload',
      prefix: 'products/',
      max_results: 500,
    };
    if (nextCursor) options.next_cursor = nextCursor;

    const result = await cloudinary.api.resources(options);
    nextCursor = result.next_cursor;

    for (const resource of result.resources) {
      const publicId = resource.public_id; // e.g. "products/PRSCE11CROSEASTMRFM2_main"
      
      if (publicId.endsWith('_main')) {
        const newPublicId = publicId.replace(/_main$/, '');
        try {
          console.log(`Renaming: ${publicId} -> ${newPublicId}`);
          await cloudinary.uploader.rename(publicId, newPublicId, { overwrite: true });
          totalRenamed++;
        } catch (err) {
          console.error(`Failed to rename ${publicId}:`, err.message);
        }
      }
    }
  } while (nextCursor);

  console.log(`\nFinished! Successfully renamed ${totalRenamed} images to remove the '_main' suffix.`);
}

run().catch(console.error);
