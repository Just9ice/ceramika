const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const cloudinary = require('cloudinary').v2;
require('dotenv').config({ path: '.env.local' });

// Configure cloudinary
cloudinary.config({
  cloud_name: "dpsufnobu",
  api_key: "977678752395666",
  api_secret: "C0l1R1COgFsw-rxZ-oqdJWkravg"
});

const publicDir = path.join(__dirname, 'public');

function normalize(str) {
  if (!str) return '';
  return str.toString()
    .toLowerCase()
    .replace(/[_,\-]/g, ' ')
    .replace(/\b(120x120|120x280x0,6|60x120|33x33|17x52|15x31\.6|7x28|45x45|60x60|20x60|47x47|60\.8x60\.8|mt|br|pl|2a|1a|rectified|porcelain|wall|floor|brick|tile|matt|shine|glossy|anti-slip|base|piscina|int)\b/g, '')
    .replace(/\s+/g, '')
    .trim();
}

async function run() {
  const excelFile = path.join(__dirname, 'Matrix and Stock (1).xlsx');
  console.log(`Reading ${excelFile}...`);
  const workbook = xlsx.readFile(excelFile);
  
  // Combine all items
  const items = [];
  
  // Parse 'Matrix' sheet
  const matrixData = xlsx.utils.sheet_to_json(workbook.Sheets['Matrix']);
  for (let i = 1; i < matrixData.length; i++) {
    const row = matrixData[i];
    const sku = row['__EMPTY'];
    const desc = row['__EMPTY_1'];
    if (sku && desc) {
      items.push({ sku, desc: String(desc).trim() });
    }
  }

  // Parse 'PRISSMACER DESCRIPTIONS' sheet
  if (workbook.Sheets['PRISSMACER DESCRIPTIONS']) {
    const prissData = xlsx.utils.sheet_to_json(workbook.Sheets['PRISSMACER DESCRIPTIONS']);
    for (const row of prissData) {
      const sku = row['SKU'];
      const desc = row['FACTORY DESCRIPTION '] || row['FACTORY DESCRIPTION'] || row['WEB DESCRIPTION '] || row['WEB DESCRIPTION'];
      if (sku && desc) {
        // If it already exists in items, maybe update it? Let's just push it, the loop will handle duplicates
        items.push({ sku, desc: String(desc).trim() });
      }
    }
  }

  const publicFiles = fs.readdirSync(publicDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
  let uploadedCount = 0;
  let deletedCount = 0;
  const processedFiles = new Set(); // to avoid uploading the same file multiple times

  for (const item of items) {
    const { sku, desc } = item;
    const normDesc = normalize(desc);
    if (normDesc.length < 4) continue;
    
    for (const file of publicFiles) {
      if (processedFiles.has(file)) continue;

      const normFile = normalize(path.parse(file).name.replace(/_2$/, '').replace(/2$/, '').replace(/_porcelanico$/, ''));
      if (normFile.length < 4) continue;

      let isMatch = false;
      let suffix = '_main';
      
      if (file.toLowerCase().includes('ambiente')) {
        const envNorm = normalize(path.parse(file).name.replace(/^ambiente_/i, '').replace(/_2$/, '').replace(/2$/, ''));
        if (envNorm.includes(normDesc) || normDesc.includes(envNorm)) {
          isMatch = true;
          suffix = file.includes('_2') || file.includes('2.jpg') ? '_env2' : '_env';
        }
      } else if (normFile.includes(normDesc) || normDesc.includes(normFile)) {
        isMatch = true;
        if (file.endsWith('_2.jpg') || file.endsWith('2.jpg') || file.endsWith('_2.png') || file.endsWith('2.png')) {
          suffix = '_alt';
        }
      }

      if (isMatch) {
        const localPath = path.join(publicDir, file);
        if (!fs.existsSync(localPath)) continue;
        
        try {
          console.log(`Matched ${file} to ${sku} (${desc})`);
          console.log(`Uploading ${localPath} as ${sku}${suffix}...`);
          
          const result = await cloudinary.uploader.upload(localPath, {
            public_id: `${sku}${suffix}`,
            overwrite: true,
            folder: "products"
          });
          
          console.log(`Success: ${result.secure_url}`);
          uploadedCount++;
          processedFiles.add(file);
          
          fs.unlinkSync(localPath);
          console.log(`Deleted local file: ${file}`);
          deletedCount++;
        } catch (error) {
          console.error(`Failed to process ${file}:`, error.message);
        }
      }
    }
  }

  console.log(`\nFinished processing! Uploaded ${uploadedCount} images and deleted ${deletedCount} local files.`);
}

run().catch(console.error);
