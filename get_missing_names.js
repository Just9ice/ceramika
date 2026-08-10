const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const excelFile = path.join(__dirname, 'Matrix and Stock (1).xlsx');
const missingImagesFile = path.join(__dirname, 'missing_images.json');

const missingSKUs = JSON.parse(fs.readFileSync(missingImagesFile, 'utf8'));
const workbook = xlsx.readFile(excelFile);

const skuMap = new Map();

// Parse 'Matrix' sheet
const matrixData = xlsx.utils.sheet_to_json(workbook.Sheets['Matrix']);
for (let i = 1; i < matrixData.length; i++) {
  const row = matrixData[i];
  const sku = row['__EMPTY'];
  const desc = row['__EMPTY_1'];
  if (sku && desc) {
    skuMap.set(sku, String(desc).trim());
  }
}

// Parse 'PRISSMACER DESCRIPTIONS' sheet
if (workbook.Sheets['PRISSMACER DESCRIPTIONS']) {
  const prissData = xlsx.utils.sheet_to_json(workbook.Sheets['PRISSMACER DESCRIPTIONS']);
  for (const row of prissData) {
    const sku = row['SKU'];
    const desc = row['FACTORY DESCRIPTION '] || row['FACTORY DESCRIPTION'] || row['WEB DESCRIPTION '] || row['WEB DESCRIPTION'];
    if (sku && desc) {
      skuMap.set(sku, String(desc).trim());
    }
  }
}

const results = [];
for (let imageId of missingSKUs) {
  // Try to find the exact SKU, or strip trailing modifiers
  let sku = imageId;
  let name = skuMap.get(sku);
  if (!name && sku.endsWith('-2')) {
    sku = sku.slice(0, -2);
    name = skuMap.get(sku);
  }
  if (!name && sku.endsWith('2A')) {
    sku = sku.slice(0, -2);
    name = skuMap.get(sku) || skuMap.get(sku + '1A') || skuMap.get(sku + '2A');
  }
  if (!name) {
    // Try to find any SKU that starts with this
    for (const [key, val] of skuMap.entries()) {
      if (key && (key.startsWith(sku) || sku.startsWith(key))) {
        name = val;
        break;
      }
    }
  }

  results.push(`- **${imageId}**: ${name || 'Unknown Description'}`);
}

fs.writeFileSync(path.join(__dirname, 'missing_names.txt'), results.join('\n'));
console.log('Done mapping.');
