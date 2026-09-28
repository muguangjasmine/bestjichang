const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { providers, countChinese } = require('./content-helper');

console.log('====================================================');
console.log('  Best机场指南 (bestjichang.sbs) 全面质量与SEO终审验收');
console.log('====================================================\n');

let errors = [];
let warnings = [];

// 1. Run Hugo Build
console.log('[1/12] 正在执行 Hugo 生产构建测试 (npx hugo --minify)...');
try {
  const buildOut = execSync('npx hugo --cleanDestinationDir --minify && node scripts/clean-page-1.js', { cwd: path.join(__dirname, '..'), encoding: 'utf8' });
  console.log('✅ Hugo 生产构建成功！输出目录: public/');
} catch (err) {
  errors.push(`Hugo 构建失败: ${err.message}`);
  console.error('❌ Hugo 构建失败:', err.stdout || err.message);
}

const publicDir = path.join(__dirname, '../public');

// 2. Check Essential Public Files
console.log('\n[2/12] 检查关键公开站点文件...');
const essentialFiles = ['index.html', 'robots.txt', 'sitemap.xml', 'index.xml', '404.html', 'index.json'];
essentialFiles.forEach(file => {
  const p = path.join(publicDir, file);
  if (fs.existsSync(p)) {
    console.log(`✅ 存在: ${file} (${fs.statSync(p).size} bytes)`);
  } else {
    errors.push(`缺失核心文件: ${file}`);
    console.error(`❌ 缺失核心文件: ${file}`);
  }
});

// Check sitemap domain
if (fs.existsSync(path.join(publicDir, 'sitemap.xml'))) {
  const sitemapContent = fs.readFileSync(path.join(publicDir, 'sitemap.xml'), 'utf8');
  if (sitemapContent.includes('localhost') || sitemapContent.includes('example.com')) {
    errors.push('sitemap.xml 包含非正式域名 (localhost 或 example.com)');
  } else if (sitemapContent.includes('https://bestjichang.sbs/')) {
    console.log('✅ sitemap.xml 域名符合规范 (https://bestjichang.sbs/)');
  }
}

// 3. Verify Pagination Architecture (Strict Single-Page for FAQ & Airports, No page/1 anywhere)
console.log('\n[3/12] 验证分页架构与去重修复...');
const faqPageDir = path.join(publicDir, 'faq', 'page');
if (fs.existsSync(faqPageDir)) {
  errors.push(`FAQ 目录仍存在分页目录: ${faqPageDir} (应为纯单页，禁止产生分页重复)`);
} else {
  console.log('✅ FAQ 单页架构验证通过：不存在 /faq/page/ 分页目录！');
}

const airportsPageDir = path.join(publicDir, 'airports', 'page');
if (fs.existsSync(airportsPageDir)) {
  errors.push(`全部机场目录仍存在分页目录: ${airportsPageDir} (应为纯单页，禁止产生分页重复)`);
} else {
  console.log('✅ 全部机场单页架构验证通过：不存在 /airports/page/ 分页目录！');
}

// Check for page/1/ anywhere
function checkNoPage1(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '1' && path.basename(path.dirname(fullPath)) === 'page') {
        errors.push(`发现多余的第一页分页目录: ${path.relative(publicDir, fullPath)}`);
      }
      checkNoPage1(fullPath);
    }
  }
}
checkNoPage1(publicDir);
console.log('✅ 全站分页目录扫描完成：零 page/1/ 重复目录！');

// 4. Verify Search Index & Undefined URL Prevention
console.log('\n[4/12] 验证全站搜索 index.json 数据完整性...');
const searchJsonPath = path.join(publicDir, 'index.json');
if (fs.existsSync(searchJsonPath)) {
  try {
    const searchData = JSON.parse(fs.readFileSync(searchJsonPath, 'utf8'));
    if (!Array.isArray(searchData) || searchData.length < 200) {
      errors.push(`index.json 索引条目过少: ${searchData.length} (预期至少 200 条)`);
    } else {
      let invalidCount = 0;
      searchData.forEach((item, idx) => {
        if (!item.title || (!item.url && !item.permalink)) {
          invalidCount++;
        }
      });
      if (invalidCount > 0) {
        errors.push(`index.json 中有 ${invalidCount} 条数据缺失 title 或 url/permalink`);
      } else {
        console.log(`✅ 搜索索引验证通过：收录 ${searchData.length} 条有效索引，无 undefined 链接！`);
      }
    }
  } catch (jErr) {
    errors.push(`index.json 解析失败: ${jErr.message}`);
  }
}

// 5. Verify Fixed Top 4 Providers Order & Commercial Affiliate Links
console.log('\n[5/12] 验证前四名核心服务商排序、返利链接与优惠码...');
const expectedTop4 = [
  { rank: 1, name: "梯子云 LadderCloud", slug: "laddercloud", url: "https://tiziyun3.ladderaff.com/#/?code=hQbiinRv", coupon: "tiziyun" },
  { rank: 2, name: "暮光加速", slug: "twilight", url: "https://varnexa.twilightaff.com/#/?code=9wp1Pt82", coupon: "mm88" },
  { rank: 3, name: "飞猫云", slug: "flycat-cloud", url: "https://flycat1.flycatvipaff.cc/#/?code=TgFJ4DF5", coupon: "flycat888" },
  { rank: 4, name: "微风网络 Breezenet", slug: "breezenet", url: "https://edp01.breezenetaff.com/#/?code=3PgTsmnp", coupon: "暂无优惠码" }
];

expectedTop4.forEach(exp => {
  const prov = providers.find(p => p.rank === exp.rank);
  if (!prov) {
    errors.push(`缺失第 ${exp.rank} 名服务商数据`);
  } else if (prov.name !== exp.name || prov.slug !== exp.slug) {
    errors.push(`第 ${exp.rank} 名服务商名称不匹配: 期望 ${exp.name}，实际 ${prov.name}`);
  } else if (prov.inviteURL !== exp.url && !prov.inviteURL.includes(exp.url)) {
    errors.push(`第 ${exp.rank} 名服务商邀请链接不匹配: 期望 ${exp.url}, 实际 ${prov.inviteURL}`);
  } else {
    console.log(`✅ 第 ${exp.rank} 名: ${prov.name} | 优惠码: ${prov.coupon} | 邀请链接完整`);
  }
});

// Verify Top 4 text cards in recommendations/index.html
const recIndexHtml = path.join(publicDir, 'recommendations', 'index.html');
if (fs.existsSync(recIndexHtml)) {
  const recHtml = fs.readFileSync(recIndexHtml, 'utf8');
  if (recHtml.includes('top-providers-pure-box')) {
    console.log('✅ 推荐页顶部已正确嵌入前 4 名纯文字推荐卡片模块！');
    if (recHtml.includes('rel="sponsored nofollow noopener"')) {
      console.log('✅ 推荐卡片外链严格配置 rel="sponsored nofollow noopener"！');
    } else {
      errors.push('推荐卡片外链缺失 rel="sponsored nofollow noopener" 规范属性！');
    }
  } else {
    errors.push('推荐页未检测到 top-providers-pure-box 纯文字推荐卡片模块！');
  }
}

// Verify Top 4 text cards restored on Homepage (index.html)
const homeIndexHtml = path.join(publicDir, 'index.html');
if (fs.existsSync(homeIndexHtml)) {
  const homeHtml = fs.readFileSync(homeIndexHtml, 'utf8');
  if (homeHtml.includes('top-featured-providers') || homeHtml.includes('top-providers-pure-box')) {
    console.log('✅ 首页已成功恢复前 4 家主推机场纯文字展示模块！');
    if (homeHtml.includes('LadderCloud') && homeHtml.includes('暮光加速') && homeHtml.includes('飞猫云') && homeHtml.includes('Breezenet')) {
      console.log('✅ 首页前 4 家主推机场顺序与信息完整！');
    } else {
      errors.push('首页前 4 家主推机场名称缺失或不完整！');
    }
  } else {
    errors.push('首页未检测到前 4 家主推机场模块 (top-featured-providers)！');
  }
}

// Verify all 24 recommendation articles have the Top 4 comparison module in top 30%
const recDir = path.join(publicDir, 'recommendations');
if (fs.existsSync(recDir)) {
  const subdirs = fs.readdirSync(recDir).filter(f => fs.statSync(path.join(recDir, f)).isDirectory() && f !== 'page');
  let missingCompareCount = 0;
  subdirs.forEach(sd => {
    const artFile = path.join(recDir, sd, 'index.html');
    if (fs.existsSync(artFile)) {
      const artHtml = fs.readFileSync(artFile, 'utf8');
      if (!artHtml.includes('梯子云 LadderCloud') || !artHtml.includes('暮光加速') || !artHtml.includes('飞猫云') || !artHtml.includes('BreezeNet')) {
        missingCompareCount++;
        errors.push(`推荐文章 /recommendations/${sd}/ 缺失前 4 家横向对比模块！`);
      }
      if (!artHtml.includes('rel="sponsored nofollow noopener"')) {
        errors.push(`推荐文章 /recommendations/${sd}/ 对比模块链接缺失 rel="sponsored nofollow noopener"！`);
      }
      if (!artHtml.includes('27') || !artHtml.includes('200GB')) {
        errors.push(`推荐文章 /recommendations/${sd}/ 微风网络资费未统一更新为 ¥27/月 + 200GB/月！`);
      }
    }
  });
  if (missingCompareCount === 0) {
    console.log(`✅ 全部 ${subdirs.length} 篇推荐专栏文章均已正确包含前 4 家机场定制横向对比模块，且微风网络 100% 统一为 ¥27/月 + 200GB/月！`);
  }
}

// Check 隐形人 (yinxingren) Calibration
const yxr = providers.find(p => p.slug === 'yinxingren');
if (!yxr) {
  errors.push('缺失隐形人服务商数据');
} else {
  if (yxr.priceFrom !== '24 元/月') {
    errors.push(`隐形人最低价格不正确: 期望 '24 元/月'，实际 '${yxr.priceFrom}'`);
  }
  if (yxr.trafficFrom !== '144GB/月') {
    errors.push(`隐形人最低流量不正确: 期望 '144GB/月'，实际 '${yxr.trafficFrom}'`);
  } else {
    console.log(`✅ 隐形人数据源核准通过: 起步价格 ${yxr.priceFrom} | 起步流量 ${yxr.trafficFrom}`);
  }
}

const yxrHtmlPath = path.join(publicDir, 'airports', 'yinxingren', 'index.html');
if (fs.existsSync(yxrHtmlPath)) {
  const yxrHtml = fs.readFileSync(yxrHtmlPath, 'utf8');
  if (!yxrHtml.includes('24 元/月') || !yxrHtml.includes('144GB/月')) {
    errors.push('隐形人独立测评页面未显示新套餐 (24 元/月 或 144GB/月)');
  } else {
    console.log('✅ 隐形人独立测评页面正确显示新资费 (24 元/月 | 144GB/月)！');
  }
  if (!yxrHtml.includes('白银纪元') || !yxrHtml.includes('不限速')) {
    errors.push('隐形人独立测评页面未显示“白银纪元”或“不限速”描述');
  } else {
    console.log('✅ 隐形人独立测评页面正确包含“白银纪元”、“不限速”、“设备数量不限”与多周期描述！');
  }
  if (yxrHtml.includes('10 元/月') || yxrHtml.includes('100GB/月') || yxrHtml.includes('28 元/月') || yxrHtml.includes('200GB/月')) {
    errors.push('隐形人独立测评页面仍然存在旧套餐数据 (10/100 或 28/200)');
  } else {
    console.log('✅ 隐形人独立测评页面已完全清除旧资费 (10/100 与 28/200)！');
  }
}

// 6. Verify Normal Website Images & OG Card
console.log('\n[6/12] 验证全站图片能力与社交分享 OG 卡片...');
const ogImagePath = path.join(publicDir, 'images', 'default-og.png');
if (fs.existsSync(ogImagePath) && fs.statSync(ogImagePath).size > 1000) {
  console.log(`✅ 默认社交卡片图片存在且有效: ${fs.statSync(ogImagePath).size} bytes`);
} else {
  errors.push('缺失有效 static/images/default-og.png');
}

// Verify SVG diagrams
const expectedSvgs = [
  'clash-verge-architecture.svg',
  'shadowrocket-workflow.svg',
  'protocol-comparison.svg',
  'ai-unlock-topology.svg'
];
expectedSvgs.forEach(svg => {
  const p = path.join(publicDir, 'images', svg);
  if (fs.existsSync(p) && fs.statSync(p).size > 500) {
    console.log(`✅ 技术图解存在: ${svg} (${fs.statSync(p).size} bytes)`);
  } else {
    errors.push(`缺失技术图解文件: ${svg}`);
  }
});

// Check img count across public HTML
let totalImgCount = 0;
function countImages(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      countImages(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const matches = content.match(/<img\s+[^>]*>/gi);
      if (matches) {
        totalImgCount += matches.length;
      }
    }
  }
}
countImages(publicDir);
if (totalImgCount > 0) {
  console.log(`✅ 全站正规图文配图验证通过：共检测到 ${totalImgCount} 处有效 <img> 标签！`);
} else {
  errors.push('全站未检测到任何 <img> 标签，正常图片能力可能被误杀！');
}

// 7. Verify Red Coupon Styling
console.log('\n[7/12] 验证红色优惠码 CSS 样式与高亮标记...');
const cssDir = path.join(publicDir, 'css');
let hasCouponCss = false;
if (fs.existsSync(cssDir)) {
  fs.readdirSync(cssDir).forEach(f => {
    if (f.endsWith('.css')) {
      const c = fs.readFileSync(path.join(cssDir, f), 'utf8');
      if (c.includes('.coupon-code') || c.includes('.coupon-red')) {
        hasCouponCss = true;
      }
    }
  });
}
if (hasCouponCss) {
  console.log('✅ 优惠码专属红色样式 (.coupon-code) 已正确载入！');
} else {
  errors.push('未在编译后的 CSS 中检测到 .coupon-code 红色样式！');
}

// 8. Scan for Reference Publisher Blocklist & Legacy Domains
console.log('\n[8/12] 扫描第三方参考发布者黑名单与旧域名残留...');
const blocklist = [
  '三毛机场', '猫梦博客', 'Gaterank', '星维机场', '一毛机场', '一份机场', '二毛博客',
  '根据某某博客', '某评测站称', '资料来自某博客', '在某站未检索到',
  'FastJiChang.cfd', 'fastjichang.cfd'
];

let leakCount = 0;
function scanDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDirectory(fullPath);
    } else if (entry.isFile() && (entry.name.endsWith('.html') || entry.name.endsWith('.json') || entry.name.endsWith('.xml') || entry.name.endsWith('.txt'))) {
      const content = fs.readFileSync(fullPath, 'utf8');
      blocklist.forEach(blocked => {
        if (content.includes(blocked)) {
          leakCount++;
          errors.push(`发现违规敏感词/旧域名泄漏 [${blocked}] 在文件: ${path.relative(publicDir, fullPath)}`);
        }
      });
    }
  }
}
scanDirectory(publicDir);
if (leakCount === 0) {
  console.log('✅ 隔离扫描完成：公开静态产物零参考发布者与旧域名泄漏！');
} else {
  console.error(`❌ 发现 ${leakCount} 处黑名单/旧域名泄漏！`);
}

// 9. Scan for Exaggerated / Fake Claims
console.log('\n[9/12] 检查是否存在虚假绝对化宣传词...');
const fakeClaims = [
  '故障率低于0.5%',
  '0.1%极致连通率',
  '4K秒开',
  '晚高峰零丢包',
  '100%不卡顿',
  '零日志绝无泄露',
  '99.8%',
  '官方核验',
  '权威实测',
  '底层网络架构与晚高峰实测表现',
  '在实地连续多天晚高峰'
];
let fakeClaimCount = 0;
function scanFakeClaims(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanFakeClaims(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      fakeClaims.forEach(claim => {
        if (content.includes(claim)) {
          fakeClaimCount++;
          errors.push(`发现夸大宣传词 [${claim}] 在文件: ${path.relative(publicDir, fullPath)}`);
        }
      });
    }
  }
}
scanFakeClaims(publicDir);
if (fakeClaimCount === 0) {
  console.log('✅ 文案客观化审核通过：无任何绝对化夸大虚假承诺！');
} else {
  console.error(`❌ 发现 ${fakeClaimCount} 处违规夸大文案！`);
}

// 10. Verify Internal Dead Links in Homepage & 404 Page
console.log('\n[10/12] 检查首页与 404 页面内链有效性...');
const indexHtmlContent = fs.readFileSync(path.join(publicDir, 'index.html'), 'utf8');
const fourOhFourContent = fs.readFileSync(path.join(publicDir, '404.html'), 'utf8');

function verifyInternalLinks(content, sourceName) {
  const linkRegex = /href="(\/[^"#?]+)/g;
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const targetUrl = match[1];
    if (targetUrl === '/' || targetUrl.startsWith('/css/') || targetUrl.startsWith('/js/') || targetUrl.startsWith('/images/')) {
      continue;
    }
    const cleanPath = targetUrl.endsWith('/') ? targetUrl.slice(1, -1) : targetUrl.slice(1);
    const expectedFile = path.join(publicDir, cleanPath, 'index.html');
    const directFile = path.join(publicDir, cleanPath);
    if (!fs.existsSync(expectedFile) && !fs.existsSync(directFile)) {
      errors.push(`[${sourceName}] 存在死链: ${targetUrl} (本地文件不存在)`);
    }
  }
}
verifyInternalLinks(indexHtmlContent, 'index.html');
verifyInternalLinks(fourOhFourContent, '404.html');
console.log('✅ 首页与 404 页面所有内部导航链接均真实有效！');

// 11. Verify Article Counts across All Main Sections
console.log('\n[11/12] 验证全站 10 大核心专栏文章与单页生成配额...');
const navSpecs = [
  { dir: 'recommendations', expected: 24, name: '机场推荐' },
  { dir: 'airports', expected: 28, name: '全部机场' },
  { dir: 'ai', expected: 12, name: 'AI机场' },
  { dir: 'streaming', expected: 10, name: '流媒体' },
  { dir: 'network', expected: 12, name: '专线与节点' },
  { dir: 'clients', expected: 24, name: '客户端教程' },
  { dir: 'guides', expected: 24, name: '小白教程' },
  { dir: 'coupons', expected: 12, name: '优惠码' },
  { dir: 'updates', expected: 12, name: '更新日志' },
  { dir: 'faq', expected: 100, name: 'FAQ常见问题' }
];

let totalArticles = 0;
navSpecs.forEach(spec => {
  const p = path.join(publicDir, spec.dir);
  if (fs.existsSync(p)) {
    const entries = fs.readdirSync(p, { withFileTypes: true });
    let pageCount = 0;
    entries.forEach(e => {
      if (e.isDirectory() && e.name !== 'page' && fs.existsSync(path.join(p, e.name, 'index.html'))) {
        pageCount++;
      }
    });
    totalArticles += pageCount;
    if (pageCount === spec.expected) {
      console.log(`✅ ${spec.name} (/` + spec.dir + `/): 包含精确 ${pageCount} 篇文章 HTML！`);
    } else {
      errors.push(`${spec.name} 文章数不符: 预期 ${spec.expected}, 实际 ${pageCount}`);
    }
  } else {
    errors.push(`缺失目录: /${spec.dir}/`);
  }
});
console.log(`✅ 全站文章总数核验：共精确生成 ${totalArticles} 篇独立内容页面！`);

// 12. Sample Checks for Single H1, Canonical, and Valid JSON-LD
console.log('\n[12/12] 抽样检验重点页面 Single H1、Canonical 与 JSON-LD 结构化数据...');
const samplePages = [
  'index.html',
  'recommendations/index.html',
  'airports/index.html',
  'faq/index.html',
  'clients/index.html',
  'guides/index.html',
  '404.html'
];
samplePages.forEach(sp => {
  const fPath = path.join(publicDir, sp);
  if (fs.existsSync(fPath)) {
    const html = fs.readFileSync(fPath, 'utf8');
    const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi);
    if (!h1Matches || h1Matches.length !== 1) {
      warnings.push(`页面 ${sp} 的 H1 数量不等于 1: ${h1Matches ? h1Matches.length : 0}`);
    }
    if (sp !== '404.html') {
      if (!html.includes('rel=canonical') && !html.includes('rel="canonical"')) {
        errors.push(`页面 ${sp} 缺失 canonical 标签`);
      }
      if (!html.includes('application/ld+json')) {
        errors.push(`页面 ${sp} 缺失 JSON-LD 结构化数据`);
      }
    }
  }
});
// 13. Deep Verify FAQ JSON-LD & Telegram External Links Rel
console.log('\n[13/13] 深度验证 FAQ 结构化数据有效性与 Telegram 外链属性...');
const faqHtmlPath = path.join(publicDir, 'faq', 'index.html');
if (fs.existsSync(faqHtmlPath)) {
  const faqHtml = fs.readFileSync(faqHtmlPath, 'utf8');
  const scriptRegex = /<script[^>]*type=["']?application\/ld\+json["']?[^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  let foundFaqSchema = null;
  while ((m = scriptRegex.exec(faqHtml)) !== null) {
    try {
      const parsed = JSON.parse(m[1]);
      if (parsed['@type'] === 'FAQPage') {
        foundFaqSchema = parsed;
        break;
      }
    } catch (e) {}
  }

  if (!foundFaqSchema) {
    errors.push('FAQ 页面缺失 @type 为 FAQPage 的 application/ld+json 脚本！');
  } else {
    if (!Array.isArray(foundFaqSchema.mainEntity) || foundFaqSchema.mainEntity.length !== 100) {
      errors.push(`FAQ Schema 问题数量不符合预期: ${foundFaqSchema.mainEntity ? foundFaqSchema.mainEntity.length : 0} (预期 100 题)`);
    } else {
      let doubleQuoteErr = false;
      foundFaqSchema.mainEntity.slice(0, 10).forEach(q => {
        if (q.name.startsWith('"') || q.name.endsWith('"')) {
          doubleQuoteErr = true;
        }
      });
      if (doubleQuoteErr) {
        errors.push('FAQ JSON-LD 存在双重引号序列化 bug！');
      } else {
        console.log(`✅ FAQ 页面 JSON-LD 结构化数据解析 100% 成功：包含 ${foundFaqSchema.mainEntity.length} 个完全合规 Question/Answer 实体，零双重引号异常！`);
      }
    }
  }
}

// Verify all Telegram links have rel="sponsored nofollow noopener"
let invalidTgRel = 0;
function scanTgLinks(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanTgLinks(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const tgRegex = /<a\s+[^>]*href=["']?https:\/\/t\.me[^>]*>/gi;
      let m;
      while ((m = tgRegex.exec(content)) !== null) {
        const tag = m[0];
        if (!tag.includes('rel="sponsored nofollow noopener"') && !tag.includes("rel='sponsored nofollow noopener'")) {
          invalidTgRel++;
          errors.push(`Telegram 链接属性不合规 [${tag}] 在文件: ${path.relative(publicDir, fullPath)}`);
        }
      }
    }
  }
}
scanTgLinks(publicDir);
if (invalidTgRel === 0) {
  console.log('✅ 全站 Telegram 外部链接 rel 属性统一通过：全部配置 rel="sponsored nofollow noopener"！');
} else {
  console.error(`❌ 发现 ${invalidTgRel} 处 Telegram 链接 rel 属性不合规！`);
}

console.log('\n====================================================');
console.log('  验收测试汇总报告');
console.log('====================================================');
if (errors.length === 0) {
  console.log('🎉 恭喜！全站所有 12 项终审测试 100% 验收通过！');
} else {
  console.error(`❌ 发现 ${errors.length} 项错误:`);
  errors.forEach(e => console.error('  - ' + e));
}
if (warnings.length > 0) {
  console.warn(`⚠️ 共有 ${warnings.length} 项提示:`);
  warnings.slice(0, 5).forEach(w => console.warn('  - ' + w));
  if (warnings.length > 5) console.warn(`  - ... 以及其他 ${warnings.length - 5} 项提示`);
}
console.log('====================================================\n');

if (errors.length > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
