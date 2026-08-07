const fs = require('fs'); 
const data = JSON.parse(fs.readFileSync('all_cloudinary_images.json')); 
const keywords = ['KOBI', 'LOMBARDA', 'MILOS', 'TENDER', 'ISCHIA', 'HONOLULU', 'BRICK']; 
for (const kw of keywords) { 
  const matches = data.filter(d => d.public_id.toUpperCase().includes(kw)); 
  console.log(`Matches for ${kw}: ${matches.length}`); 
  if (matches.length > 0) console.log(matches.map(m => m.public_id).join('\n')); 
}
