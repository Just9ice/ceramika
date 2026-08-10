const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

cloudinary.config({
  cloud_name: "dpsufnobu",
  api_key: "977678752395666",
  api_secret: "C0l1R1COgFsw-rxZ-oqdJWkravg"
});

const map = {
  "halo_white_mt.jpg": "products/PRSCE61HALOWHTMT2A_main",
  "halo_white_mt-2.jpg": "products/PRSCE61HALOWHTMT2A_alt",
  "halo_white_mt_matte.jpg": "products/PRSCK61HALOWHTMT2A_main",
  "halo_white_mt_matte-2.jpg": "products/PRSCK61HALOWHTMT2A_alt",
  "halo_white_pl.jpg": "products/PRSCE61HALOWHTPL2A_main",
  "halo_white_pl-2.jpg": "products/PRSCE61HALOWHTPL2A_alt",
  "lombarda_greige_pl.jpg": "products/PRSCE61LMBRGRGPL2A_main",
  "lombarda_greige_pl-2.jpg": "products/PRSCE61LMBRGRGPL2A_alt",
  "lombarda_white_mt.jpg": "products/PRSCE61LMBRWH1A_main",
  "lombarda_white_mt-2.jpg": "products/PRSCE61LMBRWH1A_alt",
  "lombarda_white_pl.jpg": "products/PRSCE61LMBRWHPL2A_main",
  "lombarda_white_pl-2.jpg": "products/PRSCE61LMBRWHPL2A_alt"
};

async function upload() {
  const tileDir = path.join(__dirname, 'public', 'tile');
  const files = fs.readdirSync(tileDir);
  for (const file of files) {
    if (map[file]) {
      console.log(`Uploading ${file} as ${map[file]}...`);
      try {
        const res = await cloudinary.uploader.upload(path.join(tileDir, file), {
          public_id: map[file],
          overwrite: true
        });
        console.log(`Success: ${res.secure_url}`);
      } catch (err) {
        console.error(`Error uploading ${file}:`, err);
      }
    }
  }
}

upload().catch(console.error);
