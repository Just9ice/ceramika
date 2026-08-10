const fs = require('fs');
const path = require('path');

const missingSKUs = JSON.parse(fs.readFileSync('missing_images.json', 'utf8'));
const jsFile = fs.readFileSync('smart_match_and_copy.js', 'utf8');

const map = {};
const lines = jsFile.split('\n');
for (const line of lines) {
  const match = line.match(/"([^"]+)":\s*"[^"]+",\s*\/\/\s*(.*)/);
  if (match) {
    const sku = match[1];
    let name = match[2];
    name = name.split('→')[0].trim();
    map[sku] = name;
  }
}

// Heuristic fallback for PRSCE
function decodeSKU(sku) {
  if (map[sku]) return map[sku];
  if (sku.startsWith('PRS')) {
    let size = sku.substring(4, 6);
    let sizeStr = size === '11' ? '120x120' : size === '61' ? '60x120' : size === '66' ? '60x60' : size === '44' ? '45x45' : size === '15' ? '15x90' : '';
    let namePart = sku.substring(6).replace(/(MT|PL|1A|2A|\-2)$/g, '');
    return namePart + ' ' + sizeStr;
  }
  return sku;
}

let md = '# Missing Cloudinary Images with Guessed Names\n\nHere are the missing images mapped to their actual product names so you can search for them:\n\n';

for (const sku of missingSKUs) {
  let name = decodeSKU(sku);
  // Clean up some known abbreviations
  name = name.replace(/WHT/g, 'White')
             .replace(/CRMT|CRM/g, 'Cream')
             .replace(/GRGMT|GRG/g, 'Greige')
             .replace(/GRYMT|GRY/g, 'Grey')
             .replace(/IVRMT|IVR/g, 'Ivory')
             .replace(/SND/g, 'Sand')
             .replace(/LGHT/g, 'Light')
             .replace(/ANT/g, 'Antracita')
             .replace(/LMBR/g, 'Lombarda')
             .replace(/PRESTG/g, 'Prestige')
             .replace(/HNLK/g, 'Honolulu')
             .replace(/CRSLGHT/g, 'Cross Light')
             .replace(/CRSMRF/g, 'Cross Marfil')
             .replace(/ORNT/g, 'Oriental')
             .replace(/TNDR/g, 'Tender')
             .replace(/ALMA/g, 'Soul/Alma')
             .replace(/CROSEAST/g, 'Cross Easton')
             .replace(/PISC/g, 'Piscina');
  
  if (map[sku]) {
    name = map[sku]; // override with comment exact if available
  }
  
  md += `- **${sku}**: ${name}\n`;
}

fs.writeFileSync('C:/Users/kechiregis/.gemini/antigravity-ide/brain/5fc71ba8-832e-4e63-a2d5-1c9a818421ad/missing_cloudinary_images.md', md);
console.log('Done!');
