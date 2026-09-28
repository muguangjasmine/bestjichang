const path = require('path');
const { writeArticle, contentDir, ensureDir } = require('../unique-writer');

function generateFAQ(registerQA) {
  console.log('[10/10] 正在生成 100 篇【常见问题 FAQ】深度问答文章...');
  const faqDir = path.join(contentDir, 'faq');
  ensureDir(faqDir);

  const c1 = require('../faq-data/cluster1');
  const c2 = require('../faq-data/cluster2');
  const c3 = require('../faq-data/cluster3');
  const c4 = require('../faq-data/cluster4');
  const c5 = require('../faq-data/cluster5');
  const c6 = require('../faq-data/cluster6');
  const c7 = require('../faq-data/cluster7');
  const c8 = require('../faq-data/cluster8');
  const c9 = require('../faq-data/cluster9');

  const allFaqItems = [...c1, ...c2, ...c3, ...c4, ...c5, ...c6, ...c7, ...c8, ...c9];

  allFaqItems.forEach((item, idx) => {
    const primaryKw = item.primary || item.keyword || '最好用机场推荐';
    let clusterName = item.cluster;
    if (clusterName === '梯子口语搜索与风险提示') {
      clusterName = '梯子口语与避坑';
    }

    // Generate concise directAnswer (80 ~ 180 chars) for listing page and JSON-LD schema
    let conciseAnswer = '';
    if (item.directAnswer) {
      conciseAnswer = item.directAnswer.trim();
    } else if (item.lead) {
      // Extract the first clean sentence or two from lead
      const sentences = item.lead.split(/[。！？]/).filter(s => s.trim().length > 10);
      conciseAnswer = sentences.slice(0, 2).join('。') + '。';
    } else if (item.summary) {
      conciseAnswer = item.summary.trim();
    }

    if (conciseAnswer.length > 180) {
      conciseAnswer = conciseAnswer.slice(0, 175) + '...';
    }

    const meta = {
      title: item.title,
      description: `针对高频疑问【${item.title}】，提供清晰透彻的实战解答、排查方案与客户端设置指导，让小白科学上网更轻松。`,
      section: "faq",
      cluster: clusterName,
      primaryKeyword: primaryKw,
      secondaryKeywords: ["Best机场", "常见问题中心", clusterName, primaryKw],
      directAnswer: conciseAnswer,
      date: `2026-09-${String(10 + (idx % 15)).padStart(2, '0')}T10:00:00+08:00`
    };

    let lead = "";
    let sections = [];
    let faq = [];
    let conclusion = "";

    if (item.lead && item.sec1) {
      lead = item.lead;
      sections = [item.sec1, item.sec2, item.sec3].filter(Boolean);
      faq = (item.faqSub || []).map(f => registerQA(f.q, f.a, `faq/${item.slug}`));
      conclusion = item.conclusion || `掌握【${item.title}】的核心逻辑，能帮您在日常用网中少走弯路。遇到问题按自检步骤逐项排查，保障网络长期顺畅。`;
    } else {
      lead = `${item.summary || ''}\n\n${item.directAnswer || ''}`;
      const secParts = (item.deepAnalysis || '').split(/\n(?=###\s+)/);
      sections = secParts.map(part => {
        const match = part.match(/^###\s+([^\n]+)\n+([\s\S]+)$/);
        if (match) {
          return { title: match[1].replace(/^[一二三四五六七八九十]+、\s*/, ''), content: match[2].trim() };
        }
        return { title: "核心原理与实战机制", content: part.trim() };
      }).filter(s => s.content.length > 0);
      faq = (item.qaList || []).map(q => registerQA(q.question, q.answer, `faq/${item.slug}`));
      conclusion = item.summaryConclusion || `理清【${item.title}】的要点，有助于建立更清晰的网络配置认知。建议定期备份订阅配置，按需优化节点策略。`;
    }

    // FAQ items have 0 images
    writeArticle(faqDir, item.slug, meta, lead, sections, faq, conclusion, '');
  });

  console.log(`✅ 100 篇【常见问题 FAQ】文章生成完毕！`);
}

module.exports = { generateFAQ };
