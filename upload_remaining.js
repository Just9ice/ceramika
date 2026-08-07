const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
require('dotenv').config({ path: '.env.local' });

cloudinary.config({
  cloud_name: "dpsufnobu",
  api_key: "977678752395666",
  api_secret: "C0l1R1COgFsw-rxZ-oqdJWkravg"
});

const publicDir = path.join(__dirname, 'public');

// Exclude core site assets like logos that shouldn't be pushed as "shop images"
const excludeList = ['Logo.png', 'ceramika-premium-logo.png', 'file.svg', 'globe.svg', 'next.svg', 'vercel.svg', 'window.svg'];

async function run() {
  const publicFiles = fs.readdirSync(publicDir).filter(f => !excludeList.includes(f) && (f.endsWith('.jpg') || f.endsWith('.png')));
  
  let uploadedCount = 0;

  for (const file of publicFiles) {
    const localPath = path.join(publicDir, file);
    const publicId = path.parse(file).name; // Use existing filename without extension

    try {
      console.log(`Uploading ${file}...`);
      
      const result = await cloudinary.uploader.upload(localPath, {
        public_id: publicId,
        overwrite: true,
        folder: "products_unmapped" // Put them in a separate folder for clarity
      });
      
      console.log(`Success: ${result.secure_url}`);
      uploadedCount++;
      
      // Delete the local file after successful upload
      fs.unlinkSync(localPath);
      console.log(`Deleted local file: ${file}`);
    } catch (error) {
      console.error(`Failed to process ${file}:`, error.message);
    }
  }

  console.log(`\nFinished processing! Uploaded ${uploadedCount} remaining images to Cloudinary and removed them locally.`);
}

run().catch(console.error);
