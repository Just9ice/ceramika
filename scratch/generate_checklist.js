const fs = require('fs');

async function generateList() {
  // 1. Fetch products from backend to get the names
  const res = await fetch('https://ceramika-backend.onrender.com/api/v1/products');
  const data = await res.json();
  const products = data.data;

  // 2. Read the errors from the copy script
  const errors = JSON.parse(fs.readFileSync('copy_errors.json', 'utf-8'));
  const missingSkus = errors.map(e => e.targetSku);

  // 3. Match them up
  const missingProducts = products.filter(p => missingSkus.includes(p.sku));
  
  // 4. Group by series (extract first word of name)
  const grouped = {};
  missingProducts.forEach(p => {
    const series = p.name.split(' ')[0]; // e.g., "LOMBARDA", "KOBI", "HALO"
    if (!grouped[series]) grouped[series] = [];
    grouped[series].push(p);
  });

  // 5. Generate Markdown
  let md = "# Missing Tile Images Checklist\n\n";
  md += "Here is the final list of the 56 products that still need photos. I've grouped them by tile series to make it easier for you to find them in your folders.\n\n";
  md += "> [!TIP]\n> Just save the images in a folder on your computer using the exact **SKU** as the filename (e.g., `PRSCE61LMBRWH1A.jpg`). When you're ready, I'll upload them all to Cloudinary for you!\n\n";

  for (const [series, items] of Object.entries(grouped)) {
    md += `## ${series} Series\n\n`;
    md += "| SKU | Product Name | Size | Finish |\n";
    md += "| :--- | :--- | :--- | :--- |\n";
    items.forEach(item => {
      // Extract finish (MT or PL) from name or use default
      let finish = "Matte";
      if (item.name.includes(" PL ") || item.name.includes("PULIDO")) finish = "Polished";
      
      md += `| \`${item.sku}\` | ${item.name} | ${item.size} | ${finish} |\n`;
    });
    md += "\n";
  }

  // 6. Write to artifact
  const artifactPath = "C:\\Users\\kechiregis\\.gemini\\antigravity-ide\\brain\\54461522-aa2b-41a7-9288-a7553cfe7b1f\\missing_images_checklist.md";
  fs.writeFileSync(artifactPath, md);
  console.log("Checklist generated!");
}

generateList().catch(console.error);
