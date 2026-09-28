const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Helper to write a valid RGB PNG file using built-in zlib
function createGradientPNG(width, height, filePath) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const body = Buffer.concat([typeBuf, data]);

    // CRC32
    let crc = 0 ^ (-1);
    for (let i = 0; i < body.length; i++) {
      crc = (crc >>> 8) ^ table[(crc ^ body[i]) & 0xFF];
    }
    crc = (crc ^ (-1)) >>> 0;
    const crcBuf = Buffer.alloc(4);
    crcBuf.writeUInt32BE(crc, 0);
    return Buffer.concat([len, body, crcBuf]);
  }

  // Precompute CRC table
  const table = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      if (c & 1) c = 0xedb88320 ^ (c >>> 1);
      else c = c >>> 1;
    }
    table[n] = c;
  }

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // color type 2 (RGB)
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace
  const ihdrChunk = makeChunk('IHDR', ihdr);

  // Scanlines: width * 3 bytes RGB + 1 filter byte per line
  const rawData = Buffer.alloc(height * (1 + width * 3));
  let offset = 0;
  for (let y = 0; y < height; y++) {
    rawData[offset++] = 0; // filter type 0 (None)
    const ratioY = y / height;
    for (let x = 0; x < width; x++) {
      const ratioX = x / width;
      // Blue-Indigo modern gradient
      const r = Math.floor(15 + ratioX * 25 + ratioY * 20);
      const g = Math.floor(23 + ratioX * 70 + ratioY * 50);
      const b = Math.floor(42 + ratioX * 180 + ratioY * 120);
      rawData[offset++] = Math.min(255, r);
      rawData[offset++] = Math.min(255, g);
      rawData[offset++] = Math.min(255, b);
    }
  }

  const compressedData = zlib.deflateSync(rawData);
  const idatChunk = makeChunk('IDAT', compressedData);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  const pngBuffer = Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
  fs.writeFileSync(filePath, pngBuffer);
  console.log(`Generated PNG: ${filePath} (${width}x${height}, ${pngBuffer.length} bytes)`);
}

const imagesDir = path.join(__dirname, '../static/images');
const diagDir = path.join(imagesDir, 'diagrams');
if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });
if (!fs.existsSync(diagDir)) fs.mkdirSync(diagDir, { recursive: true });

// 1. Generate default social share image (1200x630 standard for Twitter/Facebook/Google)
createGradientPNG(1200, 630, path.join(imagesDir, 'default-og.png'));

// 2. Generate crisp SVG diagrams for technical articles
const diagrams = [
  {
    name: 'clash-verge-architecture.svg',
    title: 'Clash Verge Rev 核心分流架构与TUN模式流量处理流向',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" width="100%" height="auto">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
    <linearGradient id="primary" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#2563eb"/>
    </linearGradient>
    <linearGradient id="green" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>
  </defs>
  <rect width="800" height="400" rx="12" fill="url(#bg)"/>
  <text x="400" y="45" fill="#f8fafc" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">Clash Verge Rev 核心分流架构与TUN模式处理拓扑</text>
  
  <!-- Step 1: App Traffic -->
  <rect x="50" y="100" width="180" height="90" rx="8" fill="#334155" stroke="#475569" stroke-width="2"/>
  <text x="140" y="135" fill="#e2e8f0" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">本地设备 / 应用程序</text>
  <text x="140" y="160" fill="#94a3b8" font-size="12" text-anchor="middle" font-family="sans-serif">TCP/UDP 全局/局部网络请求</text>
  
  <!-- Arrow 1 -->
  <path d="M 230 145 L 290 145" stroke="#38bdf8" stroke-width="3" fill="none" marker-end="url(#arrow)"/>
  
  <!-- Step 2: Mihomo Core / TUN -->
  <rect x="300" y="80" width="200" height="130" rx="8" fill="url(#primary)"/>
  <text x="400" y="120" fill="#ffffff" font-size="15" font-weight="bold" text-anchor="middle" font-family="sans-serif">Mihomo (Clash Meta) 内核</text>
  <text x="400" y="145" fill="#dbeafe" font-size="12" text-anchor="middle" font-family="sans-serif">TUN虚拟网卡 / 规则分流引擎</text>
  <text x="400" y="175" fill="#93c5fd" font-size="11" text-anchor="middle" font-family="sans-serif">GEOIP / GEOSITE 域名IP规则匹配</text>
  
  <!-- Arrow 2 Up (Direct) -->
  <path d="M 500 120 L 570 120" stroke="#10b981" stroke-width="3" fill="none"/>
  
  <!-- Target 1: Domestic Direct -->
  <rect x="580" y="85" width="170" height="70" rx="8" fill="#064e3b" stroke="#059669" stroke-width="2"/>
  <text x="665" y="115" fill="#a7f3d0" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">Direct (直连目标)</text>
  <text x="665" y="138" fill="#6ee7b7" font-size="11" text-anchor="middle" font-family="sans-serif">国内主流站点 / 本地网银秒开</text>
  
  <!-- Target 2: Proxy Tunnel -->
  <path d="M 500 170 L 570 240" stroke="#f59e0b" stroke-width="3" fill="none"/>
  <rect x="580" y="210" width="170" height="70" rx="8" fill="#78350f" stroke="#d97706" stroke-width="2"/>
  <text x="665" y="240" fill="#fde68a" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">Proxy (加密代理目标)</text>
  <text x="665" y="263" fill="#fcd34d" font-size="11" text-anchor="middle" font-family="sans-serif">海外学术/AI/流媒体目标专线</text>
  
  <!-- Bottom Legend -->
  <rect x="50" y="320" width="700" height="50" rx="6" fill="#1e293b" stroke="#334155"/>
  <text x="400" y="350" fill="#94a3b8" font-size="12" text-anchor="middle" font-family="sans-serif">💡 建议日常保持开启 Rule（规则模式），兼顾低延迟无感用网与流量高效节省</text>
</svg>`
  },
  {
    name: 'shadowrocket-workflow.svg',
    title: 'Shadowrocket iOS 小火箭从订阅导入到按需分流流程图',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 380" width="100%" height="auto">
  <rect width="800" height="380" rx="12" fill="#0b132b"/>
  <text x="400" y="45" fill="#ffffff" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">Shadowrocket (小火箭) iOS 规范配置与分流决策流</text>
  
  <!-- Step 1 -->
  <rect x="60" y="100" width="150" height="100" rx="8" fill="#1c2541" stroke="#48cae4" stroke-width="2"/>
  <text x="135" y="135" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">1. 订阅拉取</text>
  <text x="135" y="160" fill="#90e0ef" font-size="12" text-anchor="middle" font-family="sans-serif">类型选 Subscribe</text>
  <text x="135" y="180" fill="#ade8f4" font-size="11" text-anchor="middle" font-family="sans-serif">粘贴 URL 自动解析</text>
  
  <!-- Line -->
  <line x1="210" y1="150" x2="270" y2="150" stroke="#00b4d8" stroke-width="3"/>
  
  <!-- Step 2 -->
  <rect x="270" y="100" width="150" height="100" rx="8" fill="#1c2541" stroke="#0096c7" stroke-width="2"/>
  <text x="345" y="135" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">2. 节点连通测速</text>
  <text x="345" y="160" fill="#90e0ef" font-size="12" text-anchor="middle" font-family="sans-serif">Ping 连通性检测</text>
  <text x="345" y="180" fill="#ade8f4" font-size="11" text-anchor="middle" font-family="sans-serif">选择稳定低延迟节点</text>
  
  <!-- Line -->
  <line x1="420" y1="150" x2="480" y2="150" stroke="#0077b6" stroke-width="3"/>
  
  <!-- Step 3 -->
  <rect x="480" y="100" width="150" height="100" rx="8" fill="#1c2541" stroke="#023e8a" stroke-width="2"/>
  <text x="555" y="135" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">3. 全局路由策略</text>
  <text x="555" y="160" fill="#caf0f8" font-size="12" text-anchor="middle" font-family="sans-serif">务必勾选‘配置’模式</text>
  <text x="555" y="180" fill="#ade8f4" font-size="11" text-anchor="middle" font-family="sans-serif">自动规则防时区漂移</text>
  
  <!-- Note -->
  <rect x="60" y="240" width="680" height="90" rx="8" fill="#1c2541" stroke="#3a0ca3"/>
  <text x="400" y="275" fill="#f72585" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">⚡ 避坑要点：严禁开启全局代理（Proxy）访问国内金融与常用应用</text>
  <text x="400" y="305" fill="#e2e8f0" font-size="12" text-anchor="middle" font-family="sans-serif">选择‘配置模式’可确保本地应用不被误限速，微信/外卖直接本地直连，海外目标自动走专线。</text>
</svg>`
  },
  {
    name: 'protocol-comparison.svg',
    title: 'IEPL/IPLC 物理内网专线 vs BGP 中转 vs 普通直连架构对比',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 420" width="100%" height="auto">
  <rect width="800" height="420" rx="12" fill="#0f172a"/>
  <text x="400" y="45" fill="#ffffff" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">底层线路网络拓扑对比：IEPL专线 vs BGP中转 vs 公网直连</text>
  
  <!-- Mode 1: IEPL -->
  <rect x="50" y="80" width="700" height="85" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
  <text x="80" y="115" fill="#34d399" font-size="15" font-weight="bold" font-family="sans-serif">1. IEPL / IPLC 纯物理专线</text>
  <text x="80" y="140" fill="#94a3b8" font-size="12" font-family="sans-serif">【用户本地】 &rarr; 境内内网入口 &rarr; [企业物理专线直接穿境，不过公网出入口] &rarr; 境外出口服务器（晚高峰丢包趋零）</text>
  
  <!-- Mode 2: BGP Tunnel -->
  <rect x="50" y="185" width="700" height="85" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
  <text x="80" y="220" fill="#60a5fa" font-size="15" font-weight="bold" font-family="sans-serif">2. BGP 优质隧道中转</text>
  <text x="80" y="245" fill="#94a3b8" font-size="12" font-family="sans-serif">【用户本地】 &rarr; 三网智能入口路由 &rarr; 加密隧道协议跨境 &rarr; 境外优质机房（性价比高，三网适应性优良）</text>
  
  <!-- Mode 3: Direct -->
  <rect x="50" y="290" width="700" height="85" rx="8" fill="#1e293b" stroke="#f43f5e" stroke-width="2"/>
  <text x="80" y="325" fill="#fb7185" font-size="15" font-weight="bold" font-family="sans-serif">3. 普通公网直连（低价广播）</text>
  <text x="80" y="350" fill="#94a3b8" font-size="12" font-family="sans-serif">【用户本地】 &rarr; 直连公网国际海缆出口（晚高峰极易拥堵、丢包率剧增甚至频繁断流）</text>
</svg>`
  },
  {
    name: 'ai-unlock-topology.svg',
    title: 'ChatGPT / Claude 纯净原生商业住宅 IP 访问与防封号拓扑图',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 380" width="100%" height="auto">
  <rect width="800" height="380" rx="12" fill="#090d16"/>
  <text x="400" y="45" fill="#ffffff" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">AI 工具 (ChatGPT / Claude) 防风控纯净 IP 访问拓扑</text>
  
  <!-- Client -->
  <rect x="60" y="110" width="160" height="90" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
  <text x="140" y="145" fill="#f8fafc" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">客户端专用策略组</text>
  <text x="140" y="170" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="sans-serif">锁定特定美国/日本专线</text>
  
  <line x1="220" y1="155" x2="300" y2="155" stroke="#38bdf8" stroke-width="3"/>
  
  <!-- Clean Node -->
  <rect x="300" y="90" width="200" height="130" rx="8" fill="#14532d" stroke="#22c55e" stroke-width="2"/>
  <text x="400" y="130" fill="#bbf7d0" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">原生住宅/双ISP出口</text>
  <text x="400" y="155" fill="#86efac" font-size="12" text-anchor="middle" font-family="sans-serif">Fraud Score 欺诈分 &lt; 15</text>
  <text x="400" y="180" fill="#4ade80" font-size="11" text-anchor="middle" font-family="sans-serif">严禁动态漂移跳 IP</text>
  
  <line x1="500" y1="155" x2="580" y2="155" stroke="#22c55e" stroke-width="3"/>
  
  <!-- Target AI Cloud -->
  <rect x="580" y="110" width="160" height="90" rx="8" fill="#312e81" stroke="#818cf8" stroke-width="2"/>
  <text x="660" y="145" fill="#e0e7ff" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">OpenAI / Claude</text>
  <text x="660" y="170" fill="#a5b4fc" font-size="11" text-anchor="middle" font-family="sans-serif">Cloudflare 质检绿标通过</text>
  
  <rect x="60" y="260" width="680" height="70" rx="8" fill="#1e1e2f" stroke="#4f46e5"/>
  <text x="400" y="300" fill="#c7d2fe" font-size="13" text-anchor="middle" font-family="sans-serif">🔒 铁律：访问 ChatGPT 禁止使用香港节点（官方未开放）；保持会话 IP 固定可有效预防封号</text>
</svg>`
  }
];

diagrams.forEach(diag => {
  const p = path.join(diagDir, diag.name);
  const pRoot = path.join(imagesDir, diag.name);
  fs.writeFileSync(p, diag.svg, 'utf8');
  fs.writeFileSync(pRoot, diag.svg, 'utf8');
  console.log(`Generated Diagram SVG: ${pRoot}`);
});

console.log('✅ All images and diagrams generated successfully!');
