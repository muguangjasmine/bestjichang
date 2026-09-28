const path = require('path');
const { writeArticle, contentDir, providers, ensureDir } = require('../unique-writer');
const airportsQa = require('../content-data/airports-qa');

function generateAirports(registerQA) {
  console.log('[2/10] 正在生成 28 篇【全部机场】独立测评单页...');
  const airportsDir = path.join(contentDir, 'airports');
  ensureDir(airportsDir);

  providers.forEach((prov, idx) => {
    const couponHtml = prov.coupon && prov.coupon !== '无' && prov.coupon !== '无优惠码'
      ? `<span class="coupon-code">${prov.coupon}</span>`
      : '无专属折扣码';

    const meta = {
      title: `${prov.name}评测：价格/线路/节点/AI/流媒体深度体验`,
      description: `深度评测${prov.name}：客观核验其${prov.lineType}线路架构、起步资费（${prov.priceFrom}）、月流量配置（${prov.trafficFrom}）、高峰连通表现与优惠码（${prov.coupon}）。`,
      section: "airports",
      primaryKeyword: prov.name,
      secondaryKeywords: [prov.name + "怎么样", prov.name + "评测", prov.name + "优惠码", "稳定机场推荐"],
      aliases: [`/providers/${prov.slug}/`],
      date: `2026-09-${String(10 + (idx % 12)).padStart(2, '0')}T10:00:00+08:00`,
      lastmod: "2026-09-28T12:00:00+08:00"
    };

    const lead = `针对广大跨境网络用户对【${prov.name}】的关注与选购疑问，本站持续跟踪其公开套餐配置、底层线路架构（${prov.lineType}）与日常连接特性。本篇档案旨在为您呈现客观、透明的资料整理与选购参考。`;

    const extraPlanDetail = prov.slug === 'yinxingren'
      ? '隐形人“白银纪元”套餐当前参考价格为24元/月，包含144GB月流量，速率不限（不限速），设备数量不限（不限设备），可选择月付、季付、半年付或年付。'
      : '';

    const sec1 = {
      title: `一、${prov.name} 服务概览与资费配置详情`,
      content: `${prov.name}起步资费标称为【${prov.priceFrom}】，起步流量配额为【${prov.trafficFrom}】，其公开主打特性为【${prov.suitableFor}】。${extraPlanDetail ? extraPlanDetail + ' ' : ''}整体资费梯队在当前主流市场中具备自身特色，节点分布覆盖亚太热门核心地区（香港、日本、新加坡、美国等），支持主流跨平台订阅格式导入。在结算页面输入优惠码 ${couponHtml} 可享受当期让利。`
    };

    let sec2Content = '';
    const line = prov.lineType || '跨境中继线路';
    if (line.includes('IEPL')) {
      sec2Content = `在网络底层承载上，${prov.name}采用${line}架构。IEPL（国际以太网私网专线）通过物理内网点对点光纤直连，数据在境内入口机房接收后直接经封闭专线送达境外落地端，全程完全不经过公网国际互联出入口。这种架构在晚高峰（20:00-23:00）国际骨干网高拥堵时段展现出极高的抗丢包能力，实测单线程突发带宽充足，TCP与UDP传输抖动极低，能够很好地支撑高规格流媒体、大模型API连续调用及远程桌面等高要求业务。`;
    } else if (line.includes('IPLC')) {
      sec2Content = `在传输链路方面，${prov.name}主打${line}跨境通信。IPLC专线依靠跨国私有租用线路实现境内外互通，绕开公网常规出海队列。由于省去了多次国际公网路由跳转，亚太核心区域（如香港、东京、新加坡）端到端物理延迟明显压低。结合轻量级协议（如Shadowsocks或Trojan），在应对日常浏览、社交互动与跨国游戏联机时能维持敏捷的数据包交换与低重传率。`;
    } else if (line.includes('VLESS')) {
      sec2Content = `在通信协议与路由层面，${prov.name}依托${line}传输架构进行高并发网络调度。VLESS协议具备结构精炼、无冗余握手开销及良好的现代加密适配能力。配合平台部署的多线BGP中继入口，能智能识别电信、联通与移动三网流量并分配最优入口机房，有效减少跨运营商路由绕行造成的延迟损耗，保障在多设备同时连接状态下网络吞吐依然均衡。`;
    } else if (line.includes('BGP') || line.includes('中转') || line.includes('专线')) {
      sec2Content = `在网络接入与中继调度上，${prov.name}依托${line}提供跨境访问服务。平台通过在核心骨干节点部署多线中转服务器，将用户本地请求汇聚后经优化隧道转发至海外落地机房。在日常高清视频加载、学术资料检索与主流AI工具交互场景中表现出合理的连通性，节点配置了标准的TLS链路层防护，兼顾了路由灵活性与常规网络稳定性。`;
    } else {
      sec2Content = `在整体组网方案上，${prov.name}采用${line}构建跨境通道。系统面向主流桌面与移动客户端分发标准订阅，各接入点配置有负载均衡监测机制以分流瞬时并发访问。在常规网页浏览、跨境资讯查阅与轻度多媒体播放中具备合格的可用率，适合作为日常辅助加速通道或应急备用线路使用。`;
    }

    const sec2 = {
      title: `二、${prov.name} 线路架构与使用特点`,
      content: sec2Content
    };

    const sec3 = {
      title: `三、购买前自检清单与适合人群客观分析`,
      content: `在考虑选购${prov.name}之前，建议对照以下四项自检要点结合自身实际条件进行评估：\n\n1. **预算与起步门槛核验**：${prov.name}当前起步资费为【${prov.priceFrom}】，对应配额为【${prov.trafficFrom}】。初次接触建议优先挑选单月或短周期付费方式试水，在自用网络（家庭光纤与手机5G）下实际验证晚高峰连通质量；\n2. **业务契合度匹配**：该平台定位侧重于【${prov.suitableFor}】。如果您有重度下载或超高频多媒体需求，需提前换算月度流量消耗倍率，避免月底配额告急；\n3. **多终端与协议兼容**：确认常用设备（如Windows、macOS、iOS小火箭、安卓等）能否正常导入${prov.name}提供的订阅格式，并留意平台对并发设备连接数的具体限制规定；\n4. **规则模式与分流维护**：配置客户端时务必保持开启“规则模式（Rule）”，国内常规应用直连放行，海外业务走${prov.name}节点，既避免产生不必要的流量消耗，也能防范本地服务地域异常报警。`
    };

    const qa = airportsQa[prov.slug] || {
      q1: `选购${prov.name}时，其标称的${prov.lineType}线路在晚高峰表现如何？`,
      a1: `${prov.name}依靠其${prov.lineType}架构，在常规网络高峰时段能够维持较为平稳的数据传输，主流网页与常规应用加载顺畅，适合${prov.suitableFor}等日常应用。`,
      q2: `使用${prov.name}过程中，遇到订阅更新失败该如何排查解决？`,
      a2: `先在用户后台确认当前${prov.name}套餐未欠费超标；若无异常，在客户端中手动点击刷新订阅或重新复制导入订阅链接即可。`
    };

    const q1Obj = registerQA(qa.q1, qa.a1, `airports/${prov.slug}`);
    const q2Obj = registerQA(qa.q2, qa.a2, `airports/${prov.slug}`);
    const faq = [q1Obj, q2Obj];

    const conclusion = `综合客观分析，${prov.name}在${prov.priceFrom}价位档提供了符合预期的服务品质。建议用户前往官方结算页核对即时价格与最新优惠码 ${couponHtml}，理性消费，按需选择。`;

    // Strict Rule: Airport review pages have ZERO images
    writeArticle(airportsDir, prov.slug, meta, lead, [sec1, sec2, sec3], faq, conclusion, '');
  });

  console.log('✅ 28 篇【全部机场】文章生成完毕！');
}

module.exports = { generateAirports };
