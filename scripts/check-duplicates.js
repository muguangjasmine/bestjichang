const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../content/faq');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
console.log('Total FAQ files:', files.length);

const titles = new Map();
const snippets = new Map();
let duplicateTitles = 0;
let duplicateSnippets = 0;

// Also check similarity between FAQ answers!
const answers = [];

files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const titleMatch = content.match(/title:\s*"([^"]+)"/);
  const title = titleMatch ? titleMatch[1] : '';
  
  if (titles.has(title)) {
    console.log('Duplicate title found:', title, f, titles.get(title));
    duplicateTitles++;
  } else {
    titles.set(title, f);
  }

  const bodyParts = content.split(/^---\r?$/m);
  const body = bodyParts.length >= 3 ? bodyParts.slice(2).join('---').trim() : '';
  const first100 = body.substring(0, 100);
  
  if (snippets.has(first100)) {
    console.log('Duplicate snippet between:', f, 'and', snippets.get(first100));
    duplicateSnippets++;
  } else {
    snippets.set(first100, f);
  }

  answers.push({ file: f, title, body });
});

console.log('Duplicate titles:', duplicateTitles);
console.log('Duplicate snippets:', duplicateSnippets);

const clusterCounts = {};
files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const m = content.match(/cluster:\s*"([^"]+)"/);
  const cluster = m ? m[1] : 'Unknown';
  clusterCounts[cluster] = (clusterCounts[cluster] || 0) + 1;
});
console.log('Cluster counts in content/faq/:', clusterCounts);

