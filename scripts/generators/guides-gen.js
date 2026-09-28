const path = require('path');
const { writeArticle, contentDir, ensureDir, clearSectionDir } = require('../unique-writer');
const guideItems = require('../content-data/guides');

function generateGuides(registerQA) {
  console.log('[7/10] 正在生成 24 篇【小白教程】专栏文章 (深入浅出大白话拆解实操逻辑)...');
  const guideDir = path.join(contentDir, 'guides');
  ensureDir(guideDir);
  clearSectionDir(guideDir);

  guideItems.forEach((item, idx) => {
    const meta = {
      title: item.title,
      description: `针对小白高频搜索【${item.primary}】，用通俗直白的大白话拆解技术机制、操作规范、避坑要点与常见问题排查。`,
      section: "guides",
      primaryKeyword: item.primary,
      secondaryKeywords: item.supporting,
      date: `2026-09-${String(10 + (idx % 12)).padStart(2, '0')}T10:00:00+08:00`
    };

    const lead = `第一次接触科学上网或节点代理工具时，形形色色的技术术语常常让新手朋友感到无从下手。针对【${item.primary}】，网络上的讨论往往充斥着过于极客化的专业缩写。本文秉承通俗易懂的实用主义原则，为您用大白话彻底讲透其中的来龙去脉与实操技巧。`;

    const sec1 = {
      title: `一、【${item.primary}】的核心概念通俗解析`,
      content: `抛开那些晦涩难懂的协议参数，理解【${item.primary}】的实质其实非常简单。在整个网络通信链路上，数据包从您的手机或电脑发出，经由本地宽带网络送达代理工具，再由工具通过加密通道递送给境外服务器，最终访问目标互联网站点。搞清楚这一交互链条中各个组件所扮演的角色，建立起清晰立体的认知模型，是快速排除一切日常用网异常的首要前提。`
    };

    const sec2 = {
      title: `二、新手极易踩坑的典型误区与规范操作流程`,
      content: `很多初学者在涉及【${item.primary}】时，往往因为某些不易察觉的操作细节而遭遇断网或数据异常。例如：在复制专属链接时不慎带入了不可见空格、误将路由策略开启为全局代理导致国内网站被异地风控、或者本地系统时钟偏差导致安全证书认证失败。掌握规范的标准操作流程，养成定期更新节点列表、认准官方说明文档的良好习惯，能帮您在后续使用中节省大量不必要的折腾成本。`
    };

    const sec3 = {
      title: `三、长期安全用网准则与故障快速排查自检`,
      content: `为保障长期稳定省心用网，围绕【${item.primary}】建议常备一份快速自检清单：首先，妥善保管个人专属凭据与订阅地址，严禁在公开网络社群中截图展示含有完整Token的链接；其次，在遭遇连接超时时，先在浏览器无痕模式下测试访问以排除本地插件干扰；最后，理性看待网络波动，任何跨境通信都可能受到骨干海缆维护或运营商临时调度的影响，选用具备备用容灾方案的正规服务商方能长治久安。`
    };

    const q1Obj = registerQA(item.q1, item.a1, `guides/${item.slug}`);
    const q2Obj = registerQA(item.q2, item.a2, `guides/${item.slug}`);
    const faq = [q1Obj, q2Obj];

    const conclusion = `深入搞懂【${item.primary}】的底层逻辑与操作规范，能够让您从被动的求助者转变为游刃有余的用网达人。保持求真务实的探索心态，严守个人网络安全防线，轻松拥抱更广阔的全球知识宝库。`;

    writeArticle(guideDir, item.slug, meta, lead, [sec1, sec2, sec3], faq, conclusion);
  });
  console.log('✅ 24 篇【小白教程】专栏文章生成完毕！');
}

module.exports = { generateGuides };
