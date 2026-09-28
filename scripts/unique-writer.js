const fs = require('fs');
const path = require('path');
const { providers, countChinese, ensureDir } = require('./content-helper');

const contentDir = path.join(__dirname, '../content');

// Helper to write article cleanly without duplicate boilerplate padding
function writeArticle(dir, slug, meta, lead, sections, faq, conclusion, imageEmbed = '') {
  let md = `---
title: "${meta.title}"
description: "${meta.description}"
date: ${meta.date || "2026-09-20T10:00:00+08:00"}
${meta.lastmod ? `lastmod: ${meta.lastmod}\n` : ''}author: "Best机场评测组"
section: "${meta.section}"
cluster: "${meta.cluster || ''}"
primaryKeyword: "${meta.primaryKeyword}"
secondaryKeywords: ${JSON.stringify(meta.secondaryKeywords || [])}
${meta.aliases ? `aliases: ${JSON.stringify(meta.aliases)}\n` : ''}${meta.directAnswer ? `directAnswer: "${meta.directAnswer.replace(/"/g, '\\"')}"\n` : ''}draft: false
toc: true
---

${lead}

${imageEmbed ? `${imageEmbed}\n\n` : ''}`;

  sections.forEach(sec => {
    md += `## ${sec.title}\n\n${sec.content}\n\n`;
  });

  if (faq && faq.length > 0) {
    md += `## 常见疑问解答\n\n`;
    faq.forEach(f => {
      md += `### ${f.q}\n\n${f.a}\n\n`;
    });
  }

  md += `## 总结与选购自检建议\n\n${conclusion}\n`;

  fs.writeFileSync(path.join(dir, `${slug}.md`), md, 'utf8');
}

function clearSectionDir(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    if (f.endsWith('.md') && !f.startsWith('_')) {
      fs.unlinkSync(path.join(dir, f));
    }
  });
}

module.exports = { writeArticle, contentDir, providers, countChinese, ensureDir, clearSectionDir };
