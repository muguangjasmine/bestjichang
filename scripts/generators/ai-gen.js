const path = require('path');
const { writeArticle, contentDir, ensureDir, clearSectionDir } = require('../unique-writer');
const aiItems = require('../content-data/ai');

function generateAI(registerQA) {
  console.log('[3/10] 正在生成 12 篇【AI机场与原生节点】专栏文章 (针对具体AI工具与IP防风控)...');
  const aiDir = path.join(contentDir, 'ai');
  ensureDir(aiDir);
  clearSectionDir(aiDir);

  aiItems.forEach((item, idx) => {
    const meta = {
      title: item.title,
      description: `针对【${item.primary}】，系统剖析AI平台的风控审查机制、原生纯净IP选型要点、防封号分流规则与连接排错全攻略。`,
      section: "ai",
      primaryKeyword: item.primary,
      secondaryKeywords: item.supporting,
      date: `2026-09-${String(10 + (idx % 12)).padStart(2, '0')}T10:00:00+08:00`
    };

    const diagramEmbed = idx % 3 === 0 ? '![AI 工具防风控纯净 IP 访问拓扑](/images/diagrams/ai-unlock-topology.svg)' : '';

    const lead = `生成式人工智能工具已经深入渗透至科研、编程开发与日常办公等诸多生产力领域。针对【${item.primary}】，全球头部AI平台普遍部署了极度严密的IP信誉画像与反欺诈风控盾。普通数据中心机房IP极易触发“Access Denied”拦截甚至导致账号受限。本文围绕核心合规区域、纯净原生出口以及规则锁定的完整实操策略，为您提供系统性解决方案。`;

    const sec1 = {
      title: `一、【${item.primary}】所对应的平台风控体系与访问特征`,
      content: `评估加速服务是否满足【${item.primary}】的高强度调用诉求，必须先透彻理解目标AI服务背后的安全防御模型。以OpenAI、Anthropic及Google为代表的前沿AI平台，深度融合了高阶WAF云盾，对来访客户端的ASN自治系统编号、商业住宅属性标识、TCP指纹以及会话并发频次实施全天候实时审计。大量广播数据中心IP由于历史上有黑产滥用记录，往往被列入高风险名单；而具备正规商业宽带标识的原生双ISP出口节点，能够顺利通过平台的信誉度初筛。`
    };

    const sec2 = {
      title: `二、合规地区选取与防止IP漂移策略`,
      content: `在选定支持【${item.primary}】的加速服务时，地域维度的精准性至关重要。例如香港由于特定合规限制，目前完全不在ChatGPT与Gemini的直连支持版图内，强行通过香港节点发起请求会立即提示不支持该区域；而美国西海岸（如洛杉矶、圣何塞）、日本以及英国等地区的原生节点则是受官方支持的优选区域。此外，在代理客户端中务必针对该AI工具建立专属分流策略组，固定由特定几条低延迟专线承载，严禁开启随机测速自动漂移，保持出口IP地域的一致性是预防账号受限的核心关键。`
    };

    const sec3 = {
      title: `三、购买前核验清单与长效稳定使用建议`,
      content: `在为【${item.primary}】选购专用节点套餐时，建议重点核对以下要点：首先，向服务商官方确认节点是否标明支持该AI工具的日常交互与API调用；其次，优先选用月付方案在自己的客户端上连续验证高频对话时的连接保持能力；再次，在绑定海外银行卡或充值订阅会员时，务必在浏览器纯净无痕窗口下操作以彻底规避本地缓存与历史Cookie冲突；最后，妥善保管个人访问凭证，确保生产力工具全天候稳健运行。`
    };

    const q1Obj = registerQA(item.q1, item.a1, `ai/${item.slug}`);
    const q2Obj = registerQA(item.q2, item.a2, `ai/${item.slug}`);
    const faq = [q1Obj, q2Obj];

    const conclusion = `深入理解【${item.primary}】的IP质量标准与平台风控准则，能够为您的前沿AI生产力资产筑牢坚实的连接底座。选用纯净合规区域节点、杜绝IP频繁跳动，方能在人工智能时代从容高效探索。`;

    writeArticle(aiDir, item.slug, meta, lead, [sec1, sec2, sec3], faq, conclusion, diagramEmbed);
  });
  console.log('✅ 12 篇【AI机场与原生节点】专栏文章生成完毕！');
}

module.exports = { generateAI };
