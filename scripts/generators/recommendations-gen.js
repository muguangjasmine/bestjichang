const path = require('path');
const { writeArticle, contentDir, ensureDir, clearSectionDir } = require('../unique-writer');
const recItems = require('../content-data/recommendations');

// 针对 24 篇 recommendation 文章各自的主题，定制4家服务商的专属推荐理由
// 微风网络 BreezeNet 统一保持官方标准资费：¥27/月 + 200GB/月
const providerReasonsBySlug = {
  "2026-best-airport-recommendation": {
    laddercloud: "企业级 IEPL 纯专线与 VLESS 架构，晚高峰抗拥堵冗余充足，全天候极低抖动，是追求综合顶级用网体验的首选。",
    twilight: "20 元/月起步资费亲民，VLESS 专线传输调度平稳，优惠码 mm88 享折上折，适合多设备日常主力。",
    flycat: "IPLC 专线中继，学生版年付 84 元折合仅 7 元/月，超低门槛体验专线网络，兼顾低延迟与高性价比。",
    breezenet: "企业专线传输，节点覆盖港台日美新亚太核心，¥27/月（200GB）起步均衡稳定，多端协议完善省心。"
  },
  "novice-first-time-airport-guide": {
    laddercloud: "支持通用订阅一键导入，新手无需繁杂调试即可上手，提供 25 元单月付费试水，试错成本低。",
    twilight: "月付仅 20 元，无长期捆绑风险，客服与工单响应机制健全，对第一次接触代理工具的小白友好。",
    flycat: "年付 84 元极低预算门槛，适合初次上手不想投入过多预算的学生与小白测试网络。",
    breezenet: "全中文控制台界面直观，配置指南清晰易懂，¥27/月（200GB）单月按需续费，新手上手无压力。"
  },
  "stable-dedicated-line-airport-picks": {
    laddercloud: "端到端封闭 IEPL 物理专线，不经过公网国际出口，晚高峰丢包率近乎为零，专线稳定性行业标杆。",
    twilight: "VLESS 专线多线中继，骨干链路带宽充足，在多运营商调度下维持极高连通率。",
    flycat: "标称 IPLC 专线架构，关键跨境中继具备备用冗余，小流量轻量级专线代表方案。",
    breezenet: "企业级专线中转，节点网络抗波动性能良好，¥27/月（200GB）长期平稳运行口碑扎实。"
  },
  "reliable-long-term-airports-2026": {
    laddercloud: "多年稳健运营，合理商业定价模型拒绝资金倒挂，公告与维护透明，长期使用防跑路标杆平台。",
    twilight: "运营团队持续维护，节点动态扩容及时，月付与年付阶梯设计健康，用户续费率高。",
    flycat: "持续稳定提供平价套餐，轻量化运维成本控制优秀，长期低成本持有安全可靠。",
    breezenet: "老牌企业专线服务架构，工单响应规范，¥27/月（200GB）乘风套餐适合长期稳定续费。"
  },
  "monthly-payment-airport-recommendation": {
    laddercloud: "25 元/月包含 125GB 优质 IEPL 专线流量，单月按需续费，完全掌握主动权，无沉没成本顾虑。",
    twilight: "20 元/月超低起步月付，配合优惠码 mm88 折后低至约 16 元/月，单月性价比极高。",
    flycat: "提供星耀版 25 元/月（150GB）等弹性月付选择，流量单价划算，充值灵活。",
    breezenet: "¥27/月提供 200GB 专线流量，单月灵活续费无捆绑，资费透明无隐形消费。"
  },
  "backup-secondary-airport-solutions": {
    laddercloud: "提供 89 元/年（60GB/年）天梯随行保活方案，常年低成本在线，主力断线时秒级接管紧急业务。",
    twilight: "109 元/年轻量版常备待命，与主力服务商形成异构节点互补，杜绝单点故障失联。",
    flycat: "84 元/年极低持有成本，充当第二防失联容灾备用气囊，轻量备用首选。",
    breezenet: "多协议（SS/VLESS）热备支持，¥27/月（200GB）可轻松配置为客户端 Fallback 备用节点。"
  },
  "cheap-value-airports-2026": {
    laddercloud: "25 元档位提供高规格企业级 IEPL 专线，在同价位中以纯专线品质提供超高质价比。",
    twilight: "20 元/月入门档位，专属优惠码 mm88 享折上折，百元内预算长期持有性价比极佳。",
    flycat: "学生版年付 84 元折合 7 元/月，百元预算即可覆盖全年日常用网，平价性价比天花板。",
    breezenet: "¥27/月提供 200GB 专线配额，流量充足且无虚标超售，扎实平价之选。"
  },
  "peak-hours-lag-free-airports": {
    laddercloud: "晚高峰（20:00~23:00）具备充沛专线冗余带宽，彻底避开公网出口拥堵，视频与交互顺畅无缓冲。",
    twilight: "晚高峰动态 BGP 智能分流，节点负载均衡机制健全，夜间用网高峰期播放稳定。",
    flycat: "IPLC 专线保障跨境核心段传输，避开晚间骨干网拥挤队列，轻度浏览不卡顿。",
    breezenet: "企业专线应对晚高峰流量潮汐，¥27/月提供 200GB 充沛流量，晚间跨网访问平稳可靠。"
  },
  "low-latency-dedicated-line-airports": {
    laddercloud: "点对点直连 IEPL 物理专线，港台日美节点延迟极度平直，抖动控制在毫秒级，生产力办公与对战利器。",
    twilight: "专线直连中继，消除无效公网路由绕路，亚太节点物理低延迟优势显著。",
    flycat: "IPLC 专线缩短跨境物理跳数，Shadowsocks 协议轻量极速握手，延迟表现优异。",
    breezenet: "企业专线低跳数路由设计，亚太方向端到端延迟低，¥27/月（200GB）实时协同流畅。"
  },
  "annual-cost-effective-airports": {
    laddercloud: "89 元/年保活版深度让利，专线品质长期锁定，年付综合使用成本更具优势。",
    twilight: "109 元/年轻量版折合每月不足 10 元，享受稳定专线服务，长期年付用户青睐。",
    flycat: "84 元/年（50GB/月）年付方案最具价格杀伤力，适合轻度用户一次性订阅全年省心。",
    breezenet: "提供 ¥27/月（200GB）月付与年付套餐，包含充裕流量与稳定工单保障，适合长期持有。"
  },
  "non-expiring-pay-as-you-go-airports": {
    laddercloud: "89 元/年超长周期保活方案，极低常态持有开销，适合低频用网与备用保活。",
    twilight: "109 元/年轻量包年，低频用户无需频繁操作，随时可用，经济实惠。",
    flycat: "84 元/年轻量包年方案持有成本极低，常态待命，用网低频人群绝佳匹配。",
    breezenet: "¥27/月（200GB）门槛适中，配合客户端灵活策略组可实现高效流量控制。"
  },
  "family-multi-device-sharing-airports": {
    laddercloud: "宽松并发设备数策略，充沛专线总吞吐带宽可从容支撑全屋智能路由器与多成员同时用网。",
    twilight: "多终端兼容性优良，标准版 40 元/月提供 300GB 充沛流量，适合 3~5 台家庭设备共享。",
    flycat: "进阶版大流量方案性价比高，支持多端配置，全家日常娱乐与轻度查阅兼备。",
    breezenet: "企业专线高并发承载力强，¥27/月提供 200GB 充沛配额，家庭多系统混用体验良好。"
  },
  "enterprise-cross-border-office-airports": {
    laddercloud: "纯净商业出口与极高会话保持率，保障跨境电商后台登录、海外支付与远程桌面安全不封号。",
    twilight: "支持主流 AI 工具（ChatGPT/Claude）与海外办公协同平台原生访问，多线稳定可靠。",
    flycat: "适合外贸团队作为轻量辅助查询与第二容灾备份专线，保障业务通信全天候在线。",
    breezenet: "企业级专线网络架构，数据传输加密性高，¥27/月（200GB）支持跨境多任务处理。"
  },
  "student-budget-friendly-airports": {
    laddercloud: "25 元/月入门即可享受顶级 IEPL 纯专线，Google Scholar 学术文献与 GitHub 代码下载极速顺畅。",
    twilight: "20 元月付结合专属优惠码 mm88，学生党生活费无压力，AI 论文助手调用稳定。",
    flycat: "专门针对学生推出的 84 元/年（50GB/月）方案，每月仅需 7 元，学术科研性价比首选。",
    breezenet: "平价月付 ¥27/月（200GB）无套路，支持通用规则导入，校园网网络环境下连接顺畅。"
  },
  "gaming-acceleration-low-ping-airports": {
    laddercloud: "支持完整 UDP 转发与 Full Cone NAT，端到端专线零丢包，Steam/Apex/主机联机对战首选。",
    twilight: "亚太节点延迟平稳，专线架构减少对战拉扯与瞬移，适合外服网游日常加速。",
    flycat: "IPLC 专线轻量协议响应迅速，日韩服联机延迟优秀，经济型联机优选。",
    breezenet: "企业专线网络抖动控制良好，¥27/月（200GB）联机语音与数据包传输平稳不掉线。"
  },
  "mobile-phone-friendly-airports": {
    laddercloud: "VLESS 协议与 Shadowrocket/Clash Meta 高度兼容，移动端一键扫码导入，全天常驻稳定可靠。",
    twilight: "轻量加密协议在手机端处理器运行功耗低，iOS 与安卓移动网络切换自愈迅速，长效省电。",
    flycat: "Shadowsocks 协议移动端硬件加速性能极佳，老旧手机运行同样轻快，扫码极速配置。",
    breezenet: "支持各大移动端通用订阅格式，¥27/月（200GB）蜂窝网络与 Wi-Fi 切换稳定。"
  },
  "high-bandwidth-download-airports": {
    laddercloud: "单机高带宽网卡与独享 IEPL 专线管道，千兆光纤环境下充分释放下行吞吐，大文件下载迅速。",
    twilight: "旗舰版大流量配置高达 700GB/1.5TB，带宽池充沛，满足重度多媒体下载诉求。",
    flycat: "宇宙版提供每月 1000GB 大容量配额，大带宽不限速传输，高用量下载性价比突出。",
    breezenet: "企业专线承载大流量持续吞吐，¥27/月提供 200GB 流量，下载过程平稳无断流。"
  },
  "telecom-broadband-optimized-airports": {
    laddercloud: "专门部署电信优质专线接入入口，直接绕开 163 骨干网晚高峰国际出口拥堵，电信用户首推。",
    twilight: "多线 BGP 包含电信定向优化中继，有效降低电信晚间丢包率，日常浏览顺畅。",
    flycat: "IPLC 专线过境避开公网拥堵，电信网络下连接稳定，适合平价替代方案。",
    breezenet: "电信入口分流机制合理，¥27/月（200GB）夜间高峰期依然保持平稳响应。"
  },
  "unicom-broadband-optimized-airports": {
    laddercloud: "联通骨干网接入 IEPL 专线，至日本和香港直连物理延迟压低至极限，释放联通低延迟优势。",
    twilight: "联通中继优化节点表现优异，日韩方向延迟平直，与联通网络契合度高。",
    flycat: "联通宽带访问 IPLC 节点路由极简，Shadowsocks 协议带来流畅的网络反馈。",
    breezenet: "联通出口直连优化，北方联通宽带连接亚太迅速，¥27/月（200GB）多线容灾良好。"
  },
  "mobile-broadband-optimized-airports": {
    laddercloud: "独立多线 BGP 移动专线接入，攻克移动宽带跨网穿透与晚高峰丢包瓶颈，移动用户体验平稳。",
    twilight: "配置移动 CMI 友好入口，内网调度降低跨网损耗，南方移动宽带适配良好。",
    flycat: "IPLC 专线缓解移动宽带出海抖动，千兆移动光纤下依然保持快速响应。",
    breezenet: "多线入口智能识别移动流量，避免跨网绕路丢包，¥27/月（200GB）移动用户省心之选。"
  },
  "short-term-travel-airports": {
    laddercloud: "25 元月付与 89 元年付保活方案适合商旅短期出差，出境公共 Wi-Fi 下强加密防窃听。",
    twilight: "20 元月付随用随开，无需长期合约，境内外商旅短期访问自由切换。",
    flycat: "84 元/年极低持有成本，常备作为出行备用梯子，应对临时紧急网络访问。",
    breezenet: "¥27/月开通即享 200GB 专线流量，跨国酒店与机场网络环境下提供安全可靠加密通道。"
  },
  "anti-blocking-emergency-airports": {
    laddercloud: "物理专线端到端封闭传输，完全不过公网国际出口，特殊时期高可用连通率抗封锁标杆。",
    twilight: "VLESS 专线架构与动态域名解析储备，敏感时期具备强大的网络自愈抗封锁能力。",
    flycat: "IPLC 专线中转与多协议冗余，在网络管制收紧时作为高可用第二通道备用。",
    breezenet: "企业专线抗干扰能力强，¥27/月（200GB）支持多协议快速切换，保障用网不中断。"
  },
  "dual-airport-disaster-recovery-plan": {
    laddercloud: "顶级 IEPL 专线作为主力承载核心业务，保证工作与重要沟通零抖动、全天候高可用。",
    twilight: "作为次主力或主备切换第一梯队，VLESS 架构与梯子云形成多运营商链路异构容灾。",
    flycat: "84 元/年轻量 IPLC 方案作为底线级容灾备用气囊，超低持有成本实现零中断保障。",
    breezenet: "企业专线独立机房部署，¥27/月（200GB）作为 Fallback 备用策略节点，实现主备高可用。"
  },
  "2026-airport-selection-golden-rules": {
    laddercloud: "完全契合真物理专线、BGP 入口冗余、主流协议兼容与月付可试水的选型黄金法则，标杆范例。",
    twilight: "遵循低门槛月付、可持续良性运营与透明服务的准则，综合性价比与可靠性兼备。",
    flycat: "符合平价不超售、专线轻量化的理性消费标准，适合注重实用价值与预算约束的用户。",
    breezenet: "符合企业级专线、透明资费与完善协议支持的健康运营标准，¥27/月（200GB）稳定合规。"
  }
};

// 辅助函数：根据文章主题生成差异化的本地网络适配与避坑内容
function getTopicSpecificSec3(item) {
  const t = item.slug;
  if (t.includes('gaming') || t.includes('low-latency')) {
    return {
      title: `四、针对【${item.primary}】的网络调优：三网路由与 NAT 模式配置`,
      content: `在游戏联机与极低延迟场景中，本地运营商与协议配置对最终体验有决定性影响。首先，中国电信用户在直连普通节点时晚高峰易遇丢包，建议优先绑定 IEPL 专线节点；中国联通用户可重点利用其北方出海日本与香港的低物理延迟特性；中国移动用户则需确认服务商入口是否具备移动专用 BGP。此外，在客户端设置中，务必确认开启 Full Cone NAT（全锥型 NAT）支持，并允许 UDP 数据包无障碍双向转发，以彻底避免外服主机对战或语音开黑时遭遇 NAT 严格或声画脱节的问题。`
    };
  } else if (t.includes('streaming') || t.includes('peak-hours') || t.includes('high-bandwidth')) {
    return {
      title: `四、针对【${item.primary}】的带宽释放与分流优化技巧`,
      content: `在高清流媒体观影与大流量下载场景下，网络瓶颈往往出现在本地 DNS 解析与分流模式上。强烈建议在客户端开启‘规则分流模式（Rule）’，确保国内爱优腾等流媒体平台直接走本地宽带顺畅播放，海外目标媒体（如 Netflix、YouTube、Disney+）精准定向至解锁专线节点，既能规避本地版权服务因异地 IP 报错，又能最大限度节约套餐流量。对于电信与移动宽带用户，建议避开默认热门的 01 号节点，手动切换到负载相对较低的备用专线通道以获得更流畅的 4K 播放效果。`
    };
  } else if (t.includes('enterprise') || t.includes('family')) {
    return {
      title: `四、针对【${item.primary}】的多端部署与网络安全防护策略`,
      content: `在跨境办公多店铺运营与全屋多设备共享场景中，防关联与连接稳定性是核心底线。针对外贸与跨境电商，严禁在同一登录会话中随意切换不同国家节点，建议在客户端为特定电商域名配置固定节点分流规则；针对家庭多设备环境，推荐在主软路由器上部署 OpenClash 等插件，对外统一占用单一本地出口，既能完全绕开客户端设备数量限制，也能让智能电视、游戏主机与手机无感享受高速专线加速。`
    };
  } else if (t.includes('telecom') || t.includes('unicom') || t.includes('mobile-broadband')) {
    return {
      title: `四、运营商底层网络特征深度剖析与定向避坑`,
      content: `不同宽带运营商的国际出口资源差异显著。中国电信拥有庞大用户群，其 163 骨干网晚高峰拥堵率极高，因此电信用户必须依赖带专用内网专线（如 IEPL）或优质中继的服务才能避开大面积丢包；中国联通 AS4837/9929 骨干网到日韩延迟表现优异，搭配中转节点即可发挥极佳性价比；中国移动由于网间结算限制，必须认准带有移动 CMI 直连或三网多线 BGP 入口的节点，才能彻底消除跨网调度引发的断流红标。`
    };
  } else {
    return {
      title: `四、本地网络适配与避坑指南：三网运营商差异与分流策略`,
      content: `在实际配置与使用过程中，本地宽带运营商的网络特征往往对最终连接体验产生直接影响。中国电信宽带用户在连接普通节点时，晚高峰阶段国际出口拥塞感知较为明显，因此在【${item.primary}】的选型中，建议优先考虑带有专线入口的方案；中国联通用户可重点核验到香港及日本节点的互联延迟；中国移动用户则建议选择具备多线 BGP 动态分流的服务。此外，在客户端配置层面，建议始终保持开启智能规则分流模式（Rule），国内常用业务直接走本地宽带直连，海外目标业务定向至加速节点，兼顾响应速度与流量节省。`
    };
  }
}

// 辅助函数：根据文章主题生成差异化的选型前自检清单
function getTopicSpecificSec4(item) {
  const t = item.slug;
  if (t.includes('cheap') || t.includes('budget') || t.includes('student') || t.includes('monthly')) {
    return {
      title: `五、针对【${item.primary}】的预算自检清单与防坑准则`,
      content: `在围绕【${item.primary}】追求平价与高性价比时，牢记以下四项自检准则：第一，坚持月付先试。初次使用务必挑选单月或小额方案（如 20 元左右），在自家宽带连续验证数天晚高峰表现再做长期考虑；第二，警惕“半价永久买断”陷阱。网络带宽为持续刚性成本，脱离常理的超低价不限量往往是跑路套现信号；第三，算清流量倍率。部分低价套餐对核心节点设置了 2x 甚至 3x 高倍率，实际可用流量会大打折扣；第四，核对设备限制。确保套餐允许的同时在线设备数满足自身手机与电脑并发需求。`
    };
  } else if (t.includes('backup') || t.includes('dual-airport') || t.includes('anti-blocking')) {
    return {
      title: `五、针对【${item.primary}】的高可用容灾自检清单与实操配置`,
      content: `在搭建【${item.primary}】容灾组合时，建议重点核验以下四项指标：第一，链路异构性。务必确保主力与备用机场采用完全不同的上游机房与过境光缆，防止单路上游故障导致双双瘫痪；第二，客户端 Fallback 策略设置。在策略组中将主力设为首选，备用设为故障转移，并将健康检查间隔设为合理阈值（如 15 秒），确保无感自愈；第三，常备轻量年付。备用机场优先挑选几十元一年的保活套餐或按量计费包，把持有成本压到最低；第四，定期验证备用可用性。建议每月手动检查一次备用订阅更新，确保紧急关头随时可用。`
    };
  } else if (t.includes('gaming') || t.includes('low-latency')) {
    return {
      title: `五、针对【${item.primary}】的游戏与低延迟自检清单`,
      content: `在选拔【${item.primary}】加速节点时，建议对照以下四项专业指标进行实测自检：第一，核查 NAT 类型是否达到 Full Cone，确保联机语音与主机对战不被严格 NAT 限制；第二，实测晚高峰 UDP 丢包率，丢包率持续超过 1% 极易引发瞬移拉扯；第三，就近选择亚太直连专线（如港台日韩），减少物理跳数；第四，配置游戏进程独立分流，避免后台系统下载占用宝贵的加速专线带宽。`
    };
  } else if (t.includes('streaming') || t.includes('peak-hours') || t.includes('high-bandwidth')) {
    return {
      title: `五、针对【${item.primary}】的高清流媒体与大吞吐自检清单`,
      content: `为确保【${item.primary}】下 4K 乃至 8K 影音流畅无卡顿，建议执行以下自检：第一，单线程持续下行带宽需稳定达到 30Mbps 以上，防止播放器被动动态降码；第二，确认节点具备原生流媒体解锁能力，能在第三方检测脚本中全绿通过；第三，开启 Fake-IP 或安全 DoH 解析杜绝 DNS 污染；第四，在电视盒子或软路由端设立独立分流策略，让家庭成员各自观影互不干扰。`
    };
  } else if (t.includes('enterprise') || t.includes('family')) {
    return {
      title: `五、针对【${item.primary}】的团队多端与安全合规自检清单`,
      content: `在多成员或商业跨境场景中部署【${item.primary}】，需严格落实以下自检要点：第一，固定出口 IP 策略，防止跨境电商后台或重要管理系统因 IP 频繁飘移触发风控封禁；第二，核对并发连接上限与路由器兼容性，推荐通过软路由统一分流；第三，隔离访客与核心生产网络；第四，选择支持规范工单响应与 SLA 保障的服务商，确保业务连续性。`
    };
  } else if (t.includes('telecom') || t.includes('unicom') || t.includes('mobile-broadband')) {
    return {
      title: `五、针对【${item.primary}】的本地运营商网络自检清单`,
      content: `结合本地运营商宽带特性优化【${item.primary}】，建议按照以下流程验证：第一，在晚高峰（20:00-23:00）针对省内骨干出口进行连续 Ping 测速，确认是否存在单网丢包；第二，电信用户优先绑定具备独立专线中继的接入点，避开 163 国际出口拥堵；联通用户重点测试日韩直连延迟；移动用户认准带有 CMI 直连或 BGP 入口的节点；第三，客户端保持规则分流，国内服务一律走本地宽带直连。`
    };
  } else {
    return {
      title: `五、针对【${item.primary}】的选型前自检清单与理性消费建议`,
      content: `在正式选定【${item.primary}】方案前，建议对照以下四项自检指标逐一确认：第一，坚持短期试水原则。初次体验优先选择单月付费方案，在自身真实的宽带与移动网络下实测晚高峰；第二，核对客户端跨平台兼容，确认订阅链接可一键导入 Windows、macOS、iOS 及 Android 工具；第三，查看工单与维护响应机制，确认团队具备透明公告与技术答疑通道；第四，理性消费，按需选择契合自身真实用网频次的套餐档位。`
    };
  }
}

function generateRecommendations(registerQA) {
  console.log('[1/10] 正在生成 24 篇【机场推荐】核心深度专栏文章 (含前30%四家机场对比模块，微风网络统一 ¥27/月 + 200GB/月)...');
  const recDir = path.join(contentDir, 'recommendations');
  ensureDir(recDir);
  clearSectionDir(recDir);

  recItems.forEach((item, idx) => {
    const meta = {
      title: item.title,
      description: `针对【${item.primary}】所对应的网络加速需求，系统解析其选型要点、架构特性、运营商适配与购买前核验建议。`,
      section: "recommendations",
      primaryKeyword: item.primary,
      secondaryKeywords: item.supporting,
      date: `2026-09-${String(10 + (idx % 12)).padStart(2, '0')}T10:00:00+08:00`,
      lastmod: "2026-09-28T12:00:00+08:00"
    };

    const lead = `在跨境学术研究、多媒体娱乐及移动互联场景中，针对【${item.primary}】的搜索需求持续保持高关注度。用户在面对繁杂的服务方案时，往往需要清晰理性的辨识准则。本文围绕${item.topic}，从底层网络传输原理、核心指标评判、三网宽带适配到自检清单展开系统梳理，帮助您建立客观理性的选型逻辑。`;

    // 核心痛点分析（第一部分）
    const sec1 = {
      title: `一、【${item.primary}】所应对的核心网络场景与实际痛点`,
      content: `任何网络加速方案的价值，都取决于其是否精准击中了用户的具体业务痛点。在${item.topic}的实际使用中，用户普遍最关切的问题包括：晚高峰阶段骨干网国际出入口的拥塞程度、高并发请求下的链路连通率、跨平台客户端的配置友好度以及单月持有的资费门槛。当前公网环境下，普通直连中转节点在遇上国际出口高峰时段，极易产生较为剧烈的网络抖动甚至频繁出现连接超时；而具备充沛专线带宽或优质多线BGP入口的服务，能够将连接请求快速分流至内网低拥堵链路中，从而在关键用网时刻保持相对平稳的数据传输。针对${item.primary}进行选型，首要步骤是明晰自身主力设备、日常访问目标平台以及对网络延迟的敏感阈值。`
    };

    // 前 30% 核心模块：针对本文主题定制的 4 家主推机场横向对比模块（严格保持前四排序，纯文字，无图片，微风网络统一 ¥27/月 + 200GB/月）
    const r = providerReasonsBySlug[item.slug] || {
      laddercloud: "企业级 IEPL 纯专线，节点覆盖港台新日美，全天候极低抖动与丢包，综合素质行业标杆。",
      twilight: "VLESS 专线传输，节点覆盖主流核心区域，20 元起步资费亲民，综合性价比极高。",
      flycat: "IPLC 专线传输，学生版年付低至 84 元，平价轻量首选，适合学生党与备用网络。",
      breezenet: "企业专线传输，节点覆盖亚太核心，¥27/月（200GB/月）起步资费均衡，多平台支持成熟稳定。"
    };

    const secCompare = {
      title: `二、针对【${item.primary}】重点推荐的4家标杆服务商横向速览`,
      content: `为了帮您在【${item.primary}】选型时节省反复对比的时间，本站依据骨干网络介质、晚高峰网络调度与长期运维口碑，客观汇总以下 4 家标杆服务商。排序严格依据骨干架构与全天候综合可用性排列，纯文字对比，不含宣传诱导图片：

| 推荐顺位 | 服务商名称 | 针对【${item.primary}】核心推荐理由 | 参考资费与流量 | 线路架构与协议 | 专属优惠码 | 官方注册直达 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **NO.1 首选** | [梯子云 LadderCloud](/airports/laddercloud/) | ${r.laddercloud} | 25 元/月（125GB/月起） | 企业级 IEPL 纯专线<br>VLESS | <code class="coupon-code coupon-red">tiziyun</code> | <a href="https://tiziyun3.ladderaff.com/#/?code=hQbiinRv" target="_blank" rel="sponsored nofollow noopener">直达官网选购 ↗</a> |
| **NO.2 精选** | [暮光加速](/airports/twilight/) | ${r.twilight} | 20 元/月（120GB/月起） | VLESS 专线传输<br>VLESS / Trojan | <code class="coupon-code coupon-red">mm88</code> | <a href="https://varnexa.twilightaff.com/#/?code=9wp1Pt82" target="_blank" rel="sponsored nofollow noopener">直达官网选购 ↗</a> |
| **NO.3 平价** | [飞猫云](/airports/flycat-cloud/) | ${r.flycat} | 84 元/年（折合 7 元/月） | IPLC 专线（资料称）<br>Shadowsocks / Trojan | <code class="coupon-code coupon-red">flycat888</code> | <a href="https://flycat1.flycatvipaff.cc/#/?code=TgFJ4DF5" target="_blank" rel="sponsored nofollow noopener">直达官网选购 ↗</a> |
| **NO.4 稳健** | [微风网络 BreezeNet](/airports/breezenet/) | ${r.breezenet} | ¥27/月（200GB/月） | 企业级专线传输<br>Shadowsocks / VLESS | 暂无优惠码（注册即享） | <a href="https://edp01.breezenetaff.com/#/?code=3PgTsmnp" target="_blank" rel="sponsored nofollow noopener">直达官网选购 ↗</a> |

### 4家标杆服务商选购建议要点

- **[梯子云 LadderCloud](/airports/laddercloud/)**：${r.laddercloud} 起步资费为 25 元/月（125GB），并提供 89 元/年天梯保活方案。采用企业级 IEPL 纯专线，节点覆盖香港、台湾、新加坡、日本与美国，适合对网络稳定度有极高要求的用户。结账输入专属优惠码 <code class="coupon-code coupon-red">tiziyun</code> 可享优惠。<a href="https://tiziyun3.ladderaff.com/#/?code=hQbiinRv" target="_blank" rel="sponsored nofollow noopener">直达梯子云官网选购 ↗</a>
- **[暮光加速](/airports/twilight/)**：${r.twilight} 资费为 20 元/月起（120GB），年付轻量版 109 元/年。采用 VLESS 专线架构，支持 VLESS 与 Trojan 双协议，配合专属优惠码 <code class="coupon-code coupon-red">mm88</code> 享 8 折后低至约 16 元/月，是高性价比的多设备日常首选。<a href="https://varnexa.twilightaff.com/#/?code=9wp1Pt82" target="_blank" rel="sponsored nofollow noopener">直达暮光加速官网选购 ↗</a>
- **[飞猫云](/airports/flycat-cloud/)**：${r.flycat} 提供学生版年付 84 元（50GB/月，折合仅 7 元/月）及月付 25 元（150GB）等灵活套餐。采用 IPLC 专线架构，Shadowsocks 与 Trojan 协议轻量适配，使用优惠码 <code class="coupon-code coupon-red">flycat888</code> 适合学生党与预算敏感型用户。<a href="https://flycat1.flycatvipaff.cc/#/?code=TgFJ4DF5" target="_blank" rel="sponsored nofollow noopener">直达飞猫云官网选购 ↗</a>
- **[微风网络 BreezeNet](/airports/breezenet/)**：${r.breezenet} 参考起步价格为 ¥27/月（200GB/月），企业专线传输，节点覆盖港日美新等亚太核心区域，支持 Shadowsocks 与 VLESS，注册即可享当期官方优惠，适合追求稳健用网的用户。<a href="https://edp01.breezenetaff.com/#/?code=3PgTsmnp" target="_blank" rel="sponsored nofollow noopener">直达微风网络官网选购 ↗</a>`
    };

    // 技术架构考核指标（第三部分）
    const sec2 = {
      title: `三、技术架构考核指标：${item.coreAspect}`,
      content: `深入评估一家服务商在${item.primary}维度的技术底蕴，必须重点关注其在【${item.coreAspect}】方面的实际资源投入与运维能力。其一，是入口节点的网络覆盖度与智能调度机制。优秀的平台通常在中国电信、中国联通与中国移动三网核心骨干枢纽均部署有独立接入点，并依靠BGP Anycast技术实现就近接入，避免跨运营商绕路带来的额外物理延迟。其二，是跨境中继链路的物理介质。无论是物理IEPL纯专线、IPLC还是基于企业级隧道的加密传输，链路的冗余带宽配比直接决定了在突发大规模用网时的承载上限。行业常态表明，正规平台会保持至少30%以上的上行冗余储备，以平抑晚高峰阶段的流量峰值冲击。其三，是节点出口的真实纯净度。针对学术与特定生产力场景，具备原生双ISP商业出口、较低威胁评分的节点能大幅降低访问被拒或验证码死循环的概率。`
    };

    // 本地网络适配（第四部分，根据主题动态定制）
    const sec3 = getTopicSpecificSec3(item);

    // 选型前自检清单（第五部分，根据主题动态定制）
    const sec4 = getTopicSpecificSec4(item);

    const q1Obj = registerQA(item.q1, item.a1, `recommendations/${item.slug}`);
    const q2Obj = registerQA(item.q2, item.a2, `recommendations/${item.slug}`);
    const faq = [q1Obj, q2Obj];

    const conclusion = `综合客观分析，围绕【${item.primary}】建立清晰理性的选型标准，是获得长久省心用网体验的必由之路。建议用户在做最终决策前，先根据自身实际业务场景列出核心需求优先级，前往各服务商官方结算页仔细核实即时价格、节点覆盖以及套餐条款，坚持短期试用验证，安全合理选购。`;

    writeArticle(recDir, item.slug, meta, lead, [sec1, secCompare, sec2, sec3, sec4], faq, conclusion);
  });
  console.log('✅ 24 篇【机场推荐】核心专栏文章生成完毕（微风网络统一 ¥27/月 + 200GB/月）！');
}

module.exports = { generateRecommendations };
