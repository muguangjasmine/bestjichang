const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, '../content');
const paraMap = new Map(); // normalizedText -> { count, files: [], text }

function scanDir(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.md') && !entry.name.startsWith('_')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      // strip frontmatter
      const body = content.replace(/^---[\s\S]*?---/, '');
      // split into paragraphs by double newlines
      const paras = body.split(/\n\s*\n/);
      const seenInThisFile = new Set();
      paras.forEach(p => {
        // clean markdown syntax, headers, tables, etc.
        const clean = p.replace(/^#+\s+/gm, '').replace(/\|[^\n]+\|/g, '').replace(/[-*]\s+/g, '').trim();
        // only examine long paragraphs (e.g. >= 60 Chinese characters)
        if (clean.length >= 60 && !seenInThisFile.has(clean)) {
          seenInThisFile.add(clean);
          if (!paraMap.has(clean)) {
            paraMap.set(clean, { count: 0, files: [], text: clean.slice(0, 100) + '...' });
          }
          const item = paraMap.get(clean);
          item.count++;
          item.files.push(path.relative(contentDir, fullPath));
        }
      });
    }
  }
}

scanDir(contentDir);

const duplicates = [];
for (const [key, val] of paraMap.entries()) {
  if (val.count >= 5) {
    duplicates.push(val);
  }
}

duplicates.sort((a, b) => b.count - a.count);

console.log('====================================================');
console.log(`扫描完成！发现重复段落（>=5篇）共 ${duplicates.length} 组：`);
console.log(`其中重复 >= 10 篇的文章段落组数: ${duplicates.filter(d => d.count >= 10).length}`);
console.log('====================================================\n');

duplicates.forEach((d, idx) => {
  console.log(`[Group ${idx + 1}] 出现次数: ${d.count} 篇`);
  console.log(`内容摘要: ${d.text}`);
  console.log(`涉及文件 (前3个): ${d.files.slice(0, 3).join(', ')}`);
  console.log('----------------------------------------------------');
});
