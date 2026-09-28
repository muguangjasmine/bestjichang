const fs = require('fs');
const path = require('path');
const { contentDir, ensureDir } = require('./unique-writer');

const { generateRecommendations } = require('./generators/recommendations-gen');
const { generateAirports } = require('./generators/airports-gen');
const { generateAI } = require('./generators/ai-gen');
const { generateStreaming } = require('./generators/streaming-gen');
const { generateNetwork } = require('./generators/network-gen');
const { generateClients } = require('./generators/clients-gen');
const { generateGuides } = require('./generators/guides-gen');
const { generateCoupons } = require('./generators/coupons-gen');
const { generateUpdates } = require('./generators/updates-gen');
const { generateFAQ } = require('./generators/faq-gen');

console.log('====================================================');
console.log('  全站内容去重与规范生成引擎 (Zero-Duplication Engine)');
console.log('  目标：彻底杜绝相同问题与相同答案，100%独立高质解答');
console.log('====================================================\n');

// 0. Remove legacy folders if they exist
const legacyDirs = ['jichang-tuijian', 'best-for', 'xinshou', 'fix', 'reviews', 'providers'];
legacyDirs.forEach(dirName => {
  const p = path.join(contentDir, dirName);
  if (fs.existsSync(p)) {
    fs.rmSync(p, { recursive: true, force: true });
    console.log(`🧹 已清理旧目录: content/${dirName}`);
  }
});

// Helper for writing _index.md
function writeSectionIndex(secName, title, description, content) {
  const dir = path.join(contentDir, secName);
  ensureDir(dir);
  const p = path.join(dir, '_index.md');
  const md = `---
title: "${title}"
description: "${description}"
date: 2026-09-20T10:00:00+08:00
draft: false
toc: true
---

${content}
`;
  fs.writeFileSync(p, md, 'utf8');
}

// Track all questions and answers across the site to guarantee 100% uniqueness
const globalQuestions = new Set();
const globalAnswers = new Set();

function registerQA(q, a, context) {
  const cleanQ = q.trim();
  const cleanA = a.trim();
  if (globalQuestions.has(cleanQ)) {
    throw new Error(`[Duplicate Question Detected] "${cleanQ}" in ${context}`);
  }
  if (globalAnswers.has(cleanA)) {
    throw new Error(`[Duplicate Answer Detected] "${cleanA.slice(0, 30)}..." in ${context}`);
  }
  globalQuestions.add(cleanQ);
  globalAnswers.add(cleanA);
  return { q: cleanQ, a: cleanA };
}

// Write section indexes
writeSectionIndex('recommendations', '2026最佳机场推荐专区', '面向新手小白提供2026最佳机场推荐榜单与选购指南。涵盖稳定专线、便宜性价比月付方案与避坑评测。', `欢迎来到 Best机场 核心推荐专区。本栏目围绕晚高峰稳定性、三网骨干网络适配、大流量多媒体与客户端配置难度展开多维度实测，为您严选标杆级网络加速服务商。所有推荐均坚持独立技术核验，提供带最后核验日期的参考依据。`);
writeSectionIndex('airports', '全部28家机场资料库与对比大全', '全网收录28家主流网络加速服务商，严格按照固定核验顺序排列，提供横向对比与独立评测单页。', `本专栏收录当前市场活跃的 28 家主流网络加速机场。每家服务商均提供独立规范测评档案，详细核验套餐价格、IEPL/IPLC专线架构、流媒体与AI解锁状态、专属优惠码及购买前自检清单。数据实时保持跟踪核验。`);
writeSectionIndex('ai', 'AI加速与原生解锁专区', '面向ChatGPT、Claude、Gemini、Midjourney与Cursor开发者，提供高纯净度原生住宅IP与低延迟专线方案。', `生成式人工智能对出口节点的风控判定极为严苛。本栏目围绕IP纯净度、欺诈分评分、住宅宽带属性及长文本流式传输稳定性展开持续实测，为您甄选能全天候顺畅交互AI大模型的优质专线服务。`);
writeSectionIndex('streaming', '流媒体4K解锁与海外追剧专区', '支持Netflix奈飞全区、Disney+、YouTube Premium、TikTok海外直播与HBO Max超清播放专线推荐。', `超高清跨国视频播放对单连接带宽与网络抖动提出了极高要求。本专栏精选具备充裕上行带宽、低延迟BGP专线与原生住宅IP的优质服务商，实测4K高码率稳定播放，告别频繁转圈。`);
writeSectionIndex('network', '专线网络与节点协议技术专区', '通俗拆解IEPL、IPLC、BGP多线、VLESS Reality、Hysteria2等底层通信技术与协议原理。', `深入了解加速网络底层运作原理，能帮助用户建立独立理性的辨识能力。本栏目系统科普骨干网架构、传输加密协议、节点倍率机制与网络防污染技术，不做技术门外汉。`);
writeSectionIndex('clients', '全平台客户端下载与订阅配置专区', '汇集Clash Verge Rev、Mihomo Party、Shadowrocket、Stash、sing-box等全平台图文保姆级教程。', `好的网络服务离不开趁手的工具客户端。本栏目覆盖Windows、macOS、iOS、Android、Linux及软路由设备，提供从软件安全获取、订阅导入、分流模式切换到进阶TUN虚拟网卡的完整实战操作指南。`);
writeSectionIndex('guides', '小白从零入门与科学上网避坑专区', '零基础起步，概念拆解、基础配置、报错自检与安全上网意识培养保姆级指南。', `第一次接触科学上网不必感到畏惧。本栏目专为真正的小白新手设计，不堆砌晦涩难懂的黑话，手把手教会你如何正确认识订阅、配置规则、排除常见错误，轻松跨入全球互联网大门。`);
writeSectionIndex('coupons', '最新机场优惠码与省钱折扣专区', '全网严选优质网络加速服务专属优惠码，涵盖年付折扣、开学季立减与折上折选购技巧。', `买好机场更要买得划算。本专栏实时跟踪收录各大正规服务商的官方最新优惠活动与专属立减代码，深入解析淡旺季促销规律与折上折叠加策略，助您以最省钱的姿势开启高速网络。`);
writeSectionIndex('updates', '网络维护与版本更新动态专区', '客观记录全网主流节点网络割接、资费调整历史、客户端核心功能升级与季度压测报告。', `追踪技术前沿，掌握网络动态。本栏目定期更新全球国际海缆维护状态、AI平台风控模型迭代规律、新协议普及进展以及全网晚高峰稳定性压力测试报告，为您提供透明可信的动态参考。`);
writeSectionIndex('faq', '2026 Best机场常见问题 FAQ 知识中心', '100题完整收录，9大专题覆盖，深入解答小白科学上网所有困惑。', `本知识中心专为第一次接触科学上网与节点客户端的小白用户打造，覆盖机场推荐选型、Clash客户端高级配置、SS与Trojan核心协议、术语避坑、亚太及欧美节点选择、套餐流量与优惠码、多设备跨平台导入以及运维排错与退款隐私等 9 大专题。所有 100 个问题答案均提供即时简洁解答与深入解析，方便直接阅读或全局检索。`);

// Run all 10 generators
generateRecommendations(registerQA);
generateAirports(registerQA);
generateAI(registerQA);
generateStreaming(registerQA);
generateNetwork(registerQA);
generateClients(registerQA);
generateGuides(registerQA);
generateCoupons(registerQA);
generateUpdates(registerQA);
generateFAQ(registerQA);

console.log('\n====================================================');
console.log(`  全站总去重问答统计:`);
console.log(`  - 唯一提问总数 (Global Unique Questions): ${globalQuestions.size} 个`);
console.log(`  - 唯一解答总数 (Global Unique Answers): ${globalAnswers.size} 个`);
console.log('  - 重复率 (Duplicate Rate): 0.00%');
console.log('====================================================\n');
