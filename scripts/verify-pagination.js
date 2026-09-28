const fs = require('fs');

['recommendations', 'clients', 'guides'].forEach(sec => {
  console.log(`\n=== Checking ${sec} ===`);
  const p1 = `public/${sec}/index.html`;
  const p2 = `public/${sec}/page/2/index.html`;
  const p3 = `public/${sec}/page/3/index.html`;
  
  if (fs.existsSync(p1)) {
    const h1 = fs.readFileSync(p1, 'utf8');
    console.log(`Page 1 cards: ${h1.split('article-summary-card').length - 1}`);
  }
  if (fs.existsSync(p2)) {
    const h2 = fs.readFileSync(p2, 'utf8');
    console.log(`Page 2 cards: ${h2.split('article-summary-card').length - 1}`);
    console.log(`Page 2 quick index: ${h2.includes('handbook-quick-index')}`);
    console.log(`Page 2 top box: ${h2.includes('top-providers-box')}`);
    const h1Match = h2.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
    console.log(`Page 2 H1: ${h1Match ? h1Match[1].trim() : 'NONE'}`);
    const canMatch = h2.match(/<link\s+rel=["']?canonical["']?\s+href=["']?([^"'>\s]+)/i);
    console.log(`Page 2 Canonical: ${canMatch ? canMatch[1] : 'NONE'}`);
  }
  console.log(`Page 3 exists: ${fs.existsSync(p3)}`);
});
