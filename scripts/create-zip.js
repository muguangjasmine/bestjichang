const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectDir = path.resolve(__dirname, '..');
const parentDir = path.resolve(projectDir, '..');
const desktopDir = 'C:\\Users\\USER\\Desktop';

const zipOnDesktop = path.join(desktopDir, 'bestjichang.sbs.zip');
const zipInParent = path.join(parentDir, 'bestjichang.sbs.zip');

console.log('Project Directory:', projectDir);

if (fs.existsSync(zipOnDesktop)) fs.unlinkSync(zipOnDesktop);
if (fs.existsSync(zipInParent)) fs.unlinkSync(zipInParent);

console.log('Archiving project files...');
execSync('tar.exe -a -c -f C:/Users/USER/Desktop/bestjichang.sbs.zip --exclude=node_modules --exclude=.git --exclude=.hugo_build.lock --exclude=*.zip *', {
  cwd: projectDir,
  stdio: 'inherit'
});

const brainArtifactDir = 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\87c6251f-440c-4aaf-9269-0fad5dbce01a';
const zipInArtifact = path.join(brainArtifactDir, 'bestjichang.sbs.zip');

if (fs.existsSync(zipOnDesktop)) {
  fs.copyFileSync(zipOnDesktop, zipInParent);
  if (fs.existsSync(brainArtifactDir)) {
    fs.copyFileSync(zipOnDesktop, zipInArtifact);
  }
}

const stat = fs.statSync(zipOnDesktop);
const sizeMB = (stat.size / (1024 * 1024)).toFixed(2);
const sizeKB = (stat.size / 1024).toFixed(2);

console.log('====================================================');
console.log('✅ 项目 ZIP 压缩文档已生成完毕！');
console.log(`1. 桌面根目录: ${zipOnDesktop}`);
console.log(`2. 项目上级目录: ${zipInParent}`);
console.log(`3. 任务会话产物: ${zipInArtifact}`);
console.log(`📦 文件大小: ${sizeMB} MB (${sizeKB} KB)`);
console.log('====================================================');
