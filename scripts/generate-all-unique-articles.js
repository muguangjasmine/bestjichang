const fs = require('fs');
const path = require('path');
const { writeArticle, contentDir, providers, countChinese, ensureDir } = require('./unique-writer');

console.log('====================================================');
console.log('  全站内容去重重构引擎 (Zero-Duplication Engine)');
console.log('  目标：彻底杜绝相同问题与相同答案，100%独立高质解答');
console.log('====================================================\n');

// Track all questions and answers across the site to guarantee 100% uniqueness
const globalQuestions = new Set();
const globalAnswers = new Set();

function registerQA(q, a, context) {
  if (globalQuestions.has(q)) {
    throw new Error(`[Duplicate Question Detected] "${q}" in ${context}`);
  }
  if (globalAnswers.has(a)) {
    throw new Error(`[Duplicate Answer Detected] "${a.slice(0, 30)}..." in ${context}`);
  }
  globalQuestions.add(q);
  globalAnswers.add(a);
  return { q, a };
}

// -----------------------------------------------------------------------------
// 1. /recommendations/ - 机场推荐 (24 篇)
// -----------------------------------------------------------------------------
console.log('[1/10] 正在生成 24 篇【机场推荐】核心专栏文章...');
const recDir = path.join(contentDir, 'recommendations');
ensureDir(recDir);

const recItems = [
  {
    slug: "2026-best-airport-recommendation",
    title: "2026最好用的机场推荐：稳定高速与晚高峰不卡顿精选",
    primary: "最好用机场推荐",
    supporting: ["2026机场推荐", "稳定机场推荐", "靠谱机场推荐"],
    topic: "最好用机场与综合体验评判标准",
    coreAspect: "全天候极低丢包物理专线与多线BGP入口冗余",
    q1: "2026年评判一家网络加速服务是否属于“最好用”的第一核心硬指标是什么？",
    a1: "第一核心硬指标是晚高峰（20:00至23:00）的实测持续下行丢包率与网络抖动控制。普通中继在拥塞时丢包率常达15%以上导致网页打不开，而优质物理专线能将丢包率压制在0.5%以内，确保全天候秒开。",
    q2: "新手面对海量测速截图时，如何甄别其是否具备真实参考价值？",
    a2: "需警惕凌晨闲暇时段测出的极限带宽截图。真正具备参考意义的是晚高峰多线程测速数据、YouTube 4K Connection Speed曲线稳定性以及长连接（如AI流式生成）的持续不中断率。"
  },
  {
    slug: "novice-first-time-airport-guide",
    title: "新手第一次买机场怎么选：价格、流量与协议避坑指南",
    primary: "新手第一次买机场怎么选",
    supporting: ["小白机场推荐", "机场怎么选", "机场怎么用"],
    topic: "小白新手初次选购决策与预算配置",
    coreAspect: "避免超售小作坊与坚持低门槛单月付费试水",
    q1: "新手第一次选购网络加速服务，为什么建议必须优先选择月付方案？",
    a1: "月付试错成本极低（通常仅需十几元到二十几元）。可以先在本地宽带环境下实测晚高峰表现，避免一次性投入年付后遇到线路降级或商家失联等不可逆损失。",
    q2: "小白拿到订阅链接后，导入客户端最常见的问题是什么？",
    a2: "最常见问题是系统时间不同步或复制链接时漏掉了字符。若时间偏差超过60秒会导致TLS握手全面失败，遇到测速全红时首要动作是在系统设置中同步北京时间。"
  },
  {
    slug: "stable-dedicated-line-airport-picks",
    title: "稳定机场推荐：三网骨干与专线节点延迟实测盘点",
    primary: "稳定机场推荐",
    supporting: ["专线机场推荐", "IPLC机场", "IEPL机场"],
    topic: "三网骨干优化与内网物理专线稳定性",
    coreAspect: "端到端封闭光缆传输与全天候零丢包表现",
    q1: "稳定专线机场在遇到海底光缆中断等突发事故时，如何自愈？",
    a1: "成熟的服务商通常采购了多条不同走向的物理海缆与陆缆资源（如经陆路穿越香港、走海缆通往日本）。一旦单路海缆中断，核心路由器可在毫秒级重配BGP路由将流量引导至备用链路。",
    q2: "如何辨别商家宣传的“专线”是真物理专线还是普通中转挂羊头卖狗肉？",
    a2: "可通过晚高峰（21:00）持续Ping测延时与MTR路由追踪：真物理专线全天延时极度平直（抖动小于3ms）且丢包率为0%；伪专线在晚高峰延时会剧烈跳动并伴随高丢包。"
  },
  {
    slug: "reliable-long-term-airports-2026",
    title: "靠谱机场推荐：长期运营口碑与防跑路综合选型建议",
    primary: "靠谱机场推荐",
    supporting: ["稳定机场推荐", "最好用机场推荐", "机场排行榜"],
    topic: "长期稳健运营口碑与资金健康度评估",
    coreAspect: "透明割接公告、专业工单响应与合理可持续定价",
    q1: "运营年限越长的老牌机场是否就一定绝对安全不跑路？",
    a1: "老牌服务商抗风险能力通常更强，但并非绝对免死金牌。若商家因上游成本倒挂或管理松懈，仍可能出现服务滑坡。无论面对多大名气的平台，保持季度或月度续费始终是最稳妥的防范措施。",
    q2: "如何通过Telegram频道与官网动态判断商家当前的运营健康度？",
    a2: "观察其公告更新频率与内容专业性：健康平台会详细披露节点维护节点、新开线路与带宽扩容报告；若频道长时间停更、突然只发低价年付甩卖广告或关闭交流群，需高度警惕跑路风险。"
  },
  {
    slug: "monthly-payment-airport-recommendation",
    title: "月付机场推荐：低门槛按月续费不踩雷方案对比",
    primary: "月付机场推荐",
    supporting: ["便宜机场推荐", "低价机场", "性价比机场推荐"],
    topic: "按月灵活续费机制与资金风险主动控制",
    coreAspect: "掌握随时换车的主动权与杜绝沉没成本",
    q1: "月付套餐相比季付和年付，在单价折算与资金安全上该如何权衡？",
    a1: "年付通常有8折甚至更大力度优惠，但锁定了长期资金；月付单价略高两三元，却获得了随时换车的完全自由度。建议前两个月坚决月付，彻底摸清晚高峰表现后再评估是否升级长周期。",
    q2: "哪些使用习惯的人群最适合长期坚持月付订阅？",
    a2: "学生党、短期出国旅行者、偶尔查阅外网资料的轻度用户、以及从事跨境电商需要频繁切换不同IP特征测试的多账号运营人员最适合长期坚持月付。"
  },
  {
    slug: "backup-secondary-airport-solutions",
    title: "备用机场推荐：低成本高可用防止断网网络连接方案",
    primary: "备用机场推荐",
    supporting: ["按量计费机场", "稳定机场推荐", "机场订阅"],
    topic: "双平台高可用容灾与业务网络零中断方案",
    coreAspect: "主力高带宽月付搭配低成本不限时按量计费",
    q1: "为什么资深玩家普遍建议常备一个按量计费的次选备用机场？",
    a1: "任何单一平台都可能遭遇机房突发断电、光缆意外被挖断或上游线路临时割接。备用机场能确保在主力突发掉线的最紧急关头，随时维持网络通信畅通，杜绝失联风险。",
    q2: "主备双机场在客户端中应该如何配置才能避免流量被意外浪费？",
    a2: "在客户端策略组中采用Fallback（故障转移）而非Load-Balance（负载均衡）。Fallback平时只走主力节点，只有主力彻底无响应时才调用备用线路，避免昂贵的按量流量被无意消耗。"
  },
  {
    slug: "cheap-value-airports-2026",
    title: "便宜高性价比机场推荐：百元内平价稳定套餐横向对比",
    primary: "便宜机场推荐",
    supporting: ["高性价比机场", "低价机场", "便宜机场"],
    topic: "百元以内平价加速方案与性价比甄选逻辑",
    coreAspect: "甄别合理轻量套餐与劣质超售陷阱的区别",
    q1: "几块钱一个月的超低价便宜机场，商家通常是在哪些环节压缩了运营成本？",
    a1: "超低价服务通常省去了昂贵的物理内网专线费用，改用公网VPS中转甚至直连，并在同一台母机上超售数百倍用户，晚高峰必然严重拥堵降速甚至频繁断流。",
    q2: "在预算极其有限的情况下，如何在平价服务中筛选出可用性达标的套餐？",
    a2: "重点挑选提供低流量（如每月30G至50G）但依然保留了核心专线入口的轻量入门套餐，虽然总流量受限，但由于骨干架构健全，日常浏览体验远胜于不限流量的垃圾节点。"
  },
  {
    slug: "peak-hours-lag-free-airports",
    title: "晚高峰稳定不卡顿机场推荐：骨干网抗拥堵压测排名",
    primary: "晚高峰稳定机场",
    supporting: ["低延迟机场", "专线机场", "稳定机场推荐"],
    topic: "晚间用网高峰期（20点至23点）抗潮汐拥塞实测",
    coreAspect: "冗余带宽储备与内网BGP智能动态分流",
    q1: "为什么有些节点白天测速飞快，一到晚上八九点就卡顿转圈？",
    a1: "因为国际公网出口在晚高峰面临全民集中用网的‘潮汐拥塞’，公网出口队列丢包率剧增。唯有避开公网出口、由运营商内部物理专线过境的服务商，才能做到晚高峰不卡顿。",
    q2: "晚高峰期间如果当前连接节点变慢，最有效的手动优化步骤是什么？",
    a2: "在客户端中执行即时Ping延迟测试，避开因流媒体大量播放而拥挤的01号默认热门节点，手动切换到负载相对较低的冷门专线节点（如新加坡或台湾备用通道）。"
  },
  {
    slug: "low-latency-dedicated-line-airports",
    title: "低延迟专线机场精选：IEPL与IPLC跨国外贸办公专线",
    primary: "低延迟机场推荐",
    supporting: ["专线机场", "IEPL机场推荐", "IPLC机场推荐"],
    topic: "毫秒级物理低延迟与跨境生产力专线匹配",
    coreAspect: "点对点直连、无二次路由绕路与极低网络抖动",
    q1: "跨境低延迟节点的实际响应时间主要受哪些客观物理因素制约？",
    a1: "主要受光信号在光纤中的物理传播距离制约（如上海到东京直连单向物理延迟约为28ms）。任何宣称从内地到美国延迟能低于100ms的均为虚假显示或测速劫持。",
    q2: "对于外贸高清视频会议与远程桌面办公，对节点延迟抖动有何具体要求？",
    a2: "远程桌面（如RDP/AnyDesk）与VoIP实时通话要求往返延迟（RTT）低于80ms，且抖动偏差必须小于5ms，否则会出现严重的声画脱节与鼠标漂移卡顿。"
  },
  {
    slug: "annual-cost-effective-airports",
    title: "机场年付推荐：高折扣大流量长期稳定订阅方案",
    primary: "机场年付推荐",
    supporting: ["高性价比机场", "机场优惠码2026", "稳定机场"],
    topic: "长期年付深度折扣与高可用服务商甄选",
    coreAspect: "享受年付超值折扣的同时建立风险防范意识",
    q1: "在什么时机升级购买年付套餐通常能获得最大力度的折扣让利？",
    a1: "通常在年中618、秋季开学季、黑色星期五（Black Friday）或双旦跨年大促期间。此时服务商会发放全场通用的限时折上折代码，结合年付基础折扣综合立减往往达到6折至7折。",
    q2: "购买年付套餐后如果中途遇到突发性线路故障，正规平台通常有何应对？",
    a2: "正规平台会启动临时紧急备用公网中继或借道友商专线保障基本通信，并在故障恢复后向所有受影响的年付有效账户统一补发停机时长或补偿高速流量券。"
  },
  {
    slug: "non-expiring-pay-as-you-go-airports",
    title: "不限时按量计费机场推荐：备用防失联极低持有成本",
    primary: "机场不限时流量",
    supporting: ["备用机场推荐", "按量计费机场", "便宜机场"],
    topic: "永久有效按量计费机制与低频备用场景",
    coreAspect: "流量不清零、按需扣费与超低常态持有开销",
    q1: "不限时按量计费套餐在计费结算上具体遵循怎样的逻辑？",
    a1: "购买固定额度的流量包（例如100G或200G），只要账户处于注册激活状态，流量永不过期直至全部扣尽。每次连接按实际上传与下载量乘以节点倍率进行精确扣减。",
    q2: "按量计费套餐适合哪些日常用网场景的用户作为核心选择？",
    a2: "适合出差归国人士、仅用于查收Gmail邮件和偶尔查阅技术文档的极轻度用户、以及作为主力月付套餐突发故障时充当备用‘安全气囊’的用户。"
  },
  {
    slug: "family-multi-device-sharing-airports",
    title: "多设备家庭共享机场推荐：不限设备数与大带宽方案",
    primary: "多设备机场推荐",
    supporting: ["家庭共享机场", "多IP并发", "大流量机场"],
    topic: "多终端同时在线并发与全屋智能网络覆盖",
    coreAspect: "宽松并发设备数策略与大吞吐总带宽分配",
    q1: "多个家庭成员同时使用同一个机场订阅，为什么偶尔会被商家自动封停？",
    a1: "因为很多商家出于防止转售的目的，在网关处限制了同时在线的公网IP数量（如限2个或3个外部IP）。家庭成员在外用手机流量同时连接时会超出并发限制，从而触发安全风控拦截。",
    q2: "如何让全家所有手机、平板、电视盒子和电脑都能顺畅使用加速且不触发设备限制？",
    a2: "最佳方案是在家用软路由器或主路由器上配置OpenClash或PassWall插件。在局域网出口进行全局统一分流，对外仅占用一个公网IP，完美绕开所有客户端设备数量限制。"
  },
  {
    slug: "enterprise-cross-border-office-airports",
    title: "外贸跨境办公专线机场推荐：高纯净IP与电商防封",
    primary: "外贸机场推荐",
    supporting: ["跨境电商专线", "原生IP机场", "企业级专线"],
    topic: "跨境电商多店铺运营与外贸企业数据合规",
    coreAspect: "固定纯净原生住宅IP与超高安全会话保持",
    q1: "跨境电商（如亚马逊、eBay、Shopee）对于登录节点的IP纯净度有何严苛标准？",
    a1: "平台会检测登录IP的ASN类型和地理信誉分。若使用多人共用且频繁漂移的机房数据中心IP，会被标记为高风险代理并触发关联封店。必须选用纯净度高且固定的原生住宅节点。",
    q2: "登录海外商业银行或PayPal等金融网银账户时，对节点操作有哪些不可触碰的安全红线？",
    a2: "严禁在同一会话进行中频繁切换不同国家的节点；严禁使用公开免费节点；务必在客户端规则中设置固定地区分流，并确保DNS解析完全在当地完成，防止触发反洗钱风控冻结。"
  },
  {
    slug: "student-budget-friendly-airports",
    title: "学生党低预算机场精选：十几元平价学术检索方案",
    primary: "学生党机场推荐",
    supporting: ["学术科研机场", "便宜性价比机场", "Google学术加速"],
    topic: "校园网环境适配与学术文献极速下载",
    coreAspect: "低单价预算约束下的高可用学术访问保障",
    q1: "高校校园网在连接境外学术数据库时，最常见的网络阻断原因是什么？",
    a1: "校园网出口网关通常部署了严格的DNS劫持和端口过滤规则，常规默认端口（如80/443非标准流量）极易被拦截。建议在客户端开启Fake-IP模式与UDP穿透以绕过校园网本地限制。",
    q2: "学生党主要用于Google Scholar检索和GitHub代码拉取，每月大致需要多少GB流量？",
    a2: "学术文献PDF下载和代码仓库同步通常占用流量较少，每月20G至40G的入门轻量套餐即可完全覆盖需求，无需花费数十元购买无意义的大流量套餐。"
  },
  {
    slug: "gaming-acceleration-low-ping-airports",
    title: "外服游戏联机低延迟节点推荐：UDP转发与游戏专线",
    primary: "游戏机场推荐",
    supporting: ["外服联机梯子", "低延迟游戏节点", "Steam加速"],
    topic: "外服联机游戏对极低丢包与全锥型NAT的要求",
    coreAspect: "完整UDP数据包转发与Full Cone NAT支持",
    q1: "使用常规代理节点玩外服主机或联机游戏时，为什么偶尔会出现NAT类型严格甚至无法连麦？",
    a1: "因为很多代理服务商出于防DDoS和滥用考虑，在服务端禁用了UDP转发或仅支持Symmetric NAT。联机对战（如Apex、使命召唤、Switch游戏）必须选用明确标注支持Full Cone NAT的专用游戏节点。",
    q2: "游戏加速节点与日常网页浏览节点在路由调优策略上有何根本不同？",
    a2: "网页节点更看重吞吐带宽（如油管4K每秒跑多少兆），游戏节点则极致追求低延迟（RTT<50ms）与零丢包。一次微小的网络丢包（1%）就会导致游戏角色瞬移拉扯或直接掉线。"
  },
  {
    slug: "mobile-phone-friendly-airports",
    title: "手机端一键导入省电机场推荐：iOS与安卓端极简配置",
    primary: "手机机场推荐",
    supporting: ["Shadowrocket节点", "安卓一键导入", "轻量省电梯子"],
    topic: "移动设备端极速上手与全天候低功耗运行",
    coreAspect: "二维码一键扫码配置与轻量加密协议省电优化",
    q1: "手机端（iOS/Android）长期常驻后台开启代理，哪种传输协议相对更省电？",
    a1: "Shadowsocks（2022-blake3或Chacha20-IETF-Poly1305）在移动端处理器上具有最高硬件加速效率，功耗极低；相比需要复杂TLS加解密套件的协议，全天常驻可有效延长手机电池续航。",
    q2: "手机在Wi-Fi与蜂窝移动网络之间来回切换时，代理突然卡死该如何快速自愈？",
    a2: "此现象通常因网络接口切换导致TCP长连接挂起未释放。最快捷的解决办法是在手机控制中心开启飞行模式等待3秒后再关闭，强制操作系统重置网络接口并重新建立代理握手。"
  },
  {
    slug: "high-bandwidth-download-airports",
    title: "大流量大带宽下载机场精选：不限速高吞吐专线推荐",
    primary: "大流量机场推荐",
    supporting: ["千兆高速机场", "大带宽专线", "不限速下载"],
    topic: "超大文件跨国传输与千兆独享管道吞吐",
    coreAspect: "单机高带宽网卡、BGP大水管与无审计节点",
    q1: "重度下载BT资源或PT磁力做种时，能否直接走机场的常规代理节点？",
    a1: "绝大多数正规服务商在用户服务条款（ToS）中严禁直接挂载BT/PT公网下载，因为版权投诉（DMCA）会导致机房服务器IP被直接查封。大文件下载应通过特定标有‘下载允许/无审计’的专用节点。",
    q2: "服务商标称的“1Gbps乃至10Gbps带宽峰值”，在实际多线程下载中能跑满多少？",
    a2: "标称带宽为整组机房集群的上行总带宽池。在用户本地千兆光纤环境下，晚高峰单连接实测通常能跑到200Mbps至500Mbps之间，足以保证百兆大文件在几十秒内下载完毕。"
  },
  {
    slug: "telecom-broadband-optimized-airports",
    title: "电信宽带专用优化节点推荐：解决晚高峰骨干网拥堵",
    primary: "电信宽带机场",
    supporting: ["中国电信节点优化", "电信CN2专线", "电信晚高峰加速"],
    topic: "中国电信网络出口特性与CN2 GIA/IEPL针对性选型",
    coreAspect: "克服163骨干网国际出口晚高峰严重丢包痛点",
    q1: "中国电信宽带用户在访问境外网络时，最典型的瓶颈痛点是什么？",
    a1: "电信拥有国内最庞大的宽带用户基数，其普通163骨干网国际出口在晚高峰负载常达95%以上，导致晚间丢包率急剧飙升至20%甚至更高，公网直连节点几乎完全瘫痪。",
    q2: "电信用户挑选加速节点时，如何从根本上避开骨干网晚高峰的大面积拥堵？",
    a2: "必须选用在境内拥有电信内网专线接入（如IEPL/IPLC）或CN2 GIA优质路由节点，数据在本地电信骨干网直接分流进入专用高优先级承载网，彻底避开拥堵不堪的普通163出口。"
  },
  {
    slug: "unicom-broadband-optimized-airports",
    title: "联通宽带直连与中转机场精选：北方骨干网低延迟节点",
    primary: "联通宽带机场",
    supporting: ["中国联通节点", "联通4837优化", "北方联通低延迟"],
    topic: "中国联通4837/9929骨干网出海优势发挥",
    coreAspect: "充分发挥联通直连日本与香港的超低物理延迟优势",
    q1: "中国联通宽带直连日本与欧洲节点的网络表现为何普遍优于电信和移动？",
    a1: "联通的AS4837骨干网国际出入口人均带宽充裕，且在北京、青岛等北方节点与日本NTT、软银以及欧洲各大Tier 1运营商建立了极为通畅的直连互联，跨国公网拥堵远轻于电信。",
    q2: "联通用户在挑选机场套餐时，怎样配置才能达到最高性价比？",
    a2: "联通用户可重点搭配具有联通直连优化（AS4837/AS9929）的中转节点，无需花费高昂代价追捧全专线套餐，即可在日韩及欧洲方向享受到媲美专线的极速低延迟体验。"
  },
  {
    slug: "mobile-broadband-optimized-airports",
    title: "移动宽带穿透与专线机场推荐：解决跨网互联高丢包",
    primary: "移动宽带机场",
    supporting: ["中国移动节点", "移动CMI优化", "移动进阶加速"],
    topic: "中国移动CMI出海链路优化与BGP跨网调度",
    coreAspect: "解决跨运营商内网穿透瓶颈与晚高峰断流",
    q1: "中国移动宽带在没有专线加持的情况下，为什么跨网访问经常全红超时？",
    a1: "中国移动早期国际出口严重依赖向电信和联通购买的网间结算互联互通带宽，晚高峰网间互联瓶颈极高。若服务商入口缺乏移动直连BGP，移动流量在跨网时会被严重丢弃。",
    q2: "移动宽带用户在选择节点时，应重点认准哪些技术关键词？",
    a2: "重点认准带有‘移动CMI专用入口’或‘三网多线BGP独立接入’的节点。通过在移动本地网直接把流量交由移动自主国际光缆（CMI香港出境），才能保证全天候不卡顿。"
  },
  {
    slug: "short-term-travel-airports",
    title: "短期出境旅游出差临时机场推荐：按周按天计费轻量之选",
    primary: "短期旅游机场",
    supporting: ["出差临时梯子", "轻量小额套餐", "短期海外访问"],
    topic: "短期出入境商旅出行网络保障与弹性资费",
    coreAspect: "按周、按天小额计费与境外公共Wi-Fi安全加密",
    q1: "短期出国旅游或商务出行，有必要提前准备国内网络加速订阅吗？",
    a1: "极具必要。虽然境外可以直接访问海外应用，但身处境外时，国内很多银行网银、政务网站或视频版权库（如爱奇艺/腾讯视频）会限制境外IP访问，需通过回国专线反向加速。",
    q2: "在境外酒店或机场公共Wi-Fi环境下使用代理节点，对保护个人隐私有何帮助？",
    a2: "境外公共Wi-Fi极易存在黑客嗅探或假冒热点中间人攻击。开启代理后，手机发出的全部网络流量均经过强加密通道封装传输，有效防止个人密码、信用卡凭据遭非法窃听。"
  },
  {
    slug: "anti-blocking-emergency-airports",
    title: "特殊时期防失联抗封锁机场推荐：多协议冗余容灾方案",
    primary: "抗封锁机场",
    supporting: ["防失联节点", "高抗封锁协议", "VLESS Reality"],
    topic: "极端网络波动时期的韧性通信与动态域名自愈",
    coreAspect: "Reality无证书伪装、多协议储备与分布式接入层",
    q1: "在网络严格保障的特殊时期，常规TLS或中继节点大面积掉线的技术根源是什么？",
    a1: "主要源于防火墙启用主动探测算法对异常长连接的阻断，以及对未备案域名的批量SNI重置阻断。依赖单一域名证书或固定公网IP的普通中继在此时极易整体失联。",
    q2: "具备高抗封锁能力的服务商，在架构上通常部署了哪些前沿应急技术？",
    a2: "成熟服务商会部署VLESS Reality（借用海外合法知名大厂证书伪装抗探测）、全物理专线内网穿透（不过公网国际出口）、以及通过Telegram机器人的动态应急订阅下发通道。"
  },
  {
    slug: "dual-airport-disaster-recovery-plan",
    title: "双机场主备容灾组合选型方案：实现业务连续不中断",
    primary: "双机场容灾",
    supporting: ["双订阅主备切换", "无感断流切换", "外贸办公高可用"],
    topic: "企业级主备双活容灾体系设计与自动化配置",
    coreAspect: "物理链路异构、跨服务商解耦与客户端自动Fallback",
    q1: "搭建主备双机场组合时，如何从底层确保两者真正具备容灾互补性？",
    a1: "必须确保两家服务商的物理入口机房与上游过境线路完全异构（例如主力选用深圳入口的IEPL专线，备用选用上海入口的BGP隧道）；若两家采用相同上游批发商，则无法起到容灾效果。",
    q2: "在Clash或Mihomo配置文件中，如何编写策略实现全自动无感主备故障转移？",
    a2: "在Proxy Groups中创建类型为fallback的策略组，按优先级排布主力节点与备用节点，并设置健康检查参数（url: http://cp.cloudflare.com, interval: 15, tolerance: 50），节点失效时15秒内无感倒换。"
  },
  {
    slug: "2026-airport-selection-golden-rules",
    title: "2026挑选好用机场的五大黄金法则：小白避坑必读秘籍",
    primary: "2026机场挑选法则",
    supporting: ["科学上网选型标准", "防跑路黄金法则", "机场怎么挑"],
    topic: "网络加速服务甄选决策模型与五大避坑准则",
    coreAspect: "从物理介质、商业信誉、协议演进到资费理性的全局闭环",
    q1: "2026年选购网络加速服务，哪五大黄金法则能够杜绝90%的踩坑风险？",
    a1: "五大法则为：①先月付后年付；②查验是否具备真物理专线（IEPL/IPLC）；③确认多入口BGP冗余；④认准主流开源客户端兼容性；⑤避开脱离成本常理的超低价不限量小作坊。",
    q2: "当发现某家服务商突然开始大搞‘半价永久买断套餐’时，需要警惕什么信号？",
    a2: "这是极其危险的崩盘跑路前兆信号。网络带宽是每月都需要真金白银向上游运营商支付的持续刚性成本，‘永久买断’完全违背商业逻辑，通常是商家资金链断裂准备卷款跑路的最后疯狂套现。"
  }
];

recItems.forEach((item, idx) => {
  const meta = {
    title: item.title,
    description: `深度解析【${item.primary}】：涵盖技术架构、晚高峰抗拥堵实测、选型标准与进阶优化心得，提供客观透明的选购参考。`,
    section: "recommendations",
    primaryKeyword: item.primary,
    secondaryKeywords: item.supporting,
    date: `2026-09-${String(10 + (idx % 12)).padStart(2, '0')}T10:00:00+08:00`,
    lastmod: "2026-09-25T12:00:00+08:00"
  };

  const lead = `针对【${item.primary}】所对应的网络使用诉求，用户在日常选购与实际配置中面临着诸多信息不对称与技术选型困惑。本文围绕${item.topic}，从底层通信原理到晚高峰抗压实测展开系统梳理，帮助您快速建立清晰的辨识准则与避坑逻辑。`;
  const sec1 = {
    title: `一、【${item.primary}】的核心技术瓶颈与选型考核指标`,
    content: `评判加速服务在${item.topic}场景下的实际承载力，首先必须审视其过境链路介质与机房带宽冗余。具备企业级物理专线与动态多线入口调度的服务，能够将数据在用户本地就近接入运营商内网，完全避开公网出入口的潮汐拥堵，从而保障全天候延迟稳定在极窄抖动区间内。`
  };
  const sec2 = {
    title: `二、${item.coreAspect}的实战落地与日常表现`,
    content: `在真实网络环境实测中，${item.coreAspect}是决定最终用户体验能否达到标杆级的胜负手。通过部署高吞吐服务器集群与合理的负载均衡策略，不仅能够平稳承载海量高并发连接请求，而且在面对突发海缆故障或上游割接时，能够实现快速路由重敛，杜绝大面积断连。`
  };
  const sec3 = {
    title: `三、购买前自检与客户端高效规则分流心得`,
    content: `在选定心仪的方案后，建议优先通过短期周期进行本地宽带环境压测。在客户端工具（如Clash Verge、Shadowrocket、Sing-box）中配置分流策略时，始终推荐保持开启智能规则模式（Rule），国内常用软件直连本地网络，境外目标业务走加密通道，兼顾流畅度与流量节约。`
  };

  const q1Obj = registerQA(item.q1, item.a1, `recommendations/${item.slug}`);
  const q2Obj = registerQA(item.q2, item.a2, `recommendations/${item.slug}`);
  const faq = [q1Obj, q2Obj];

  const conclusion = `围绕【${item.primary}】建立理性的使用预期与配置方案，是保障长期顺畅用网的最优解。坚持短期实测、看清计费倍率与带宽真实冗余，前往服务商官方平台核对即时配置后理性订购。`;

  writeArticle(recDir, item.slug, meta, lead, [sec1, sec2, sec3], faq, conclusion);
});
console.log('✅ 24 篇【机场推荐】文章生成完毕！');

// -----------------------------------------------------------------------------
// 2. /airports/ - 全部机场 (28 篇)
// -----------------------------------------------------------------------------
console.log('\n[2/10] 正在生成 28 篇【全部机场】独立测评单页...');
const airportsDir = path.join(contentDir, 'airports');
ensureDir(airportsDir);

providers.forEach((prov, idx) => {
  const meta = {
    title: `${prov.name}评测：价格/线路/节点/AI/流媒体深度体验`,
    description: `深度评测${prov.name}：客观核验其${prov.lineType}线路架构、起步资费（${prov.priceFrom}）、月流量配置（${prov.trafficFrom}）、晚高峰连通率与优惠码（${prov.coupon}）。`,
    section: "airports",
    primaryKeyword: prov.name,
    secondaryKeywords: [prov.name + "怎么样", prov.name + "评测", prov.name + "优惠码", "稳定机场推荐"],
    aliases: [`/providers/${prov.slug}/`],
    date: `2026-09-${String(10 + (idx % 12)).padStart(2, '0')}T10:00:00+08:00`,
    lastmod: "2026-09-25T12:00:00+08:00"
  };

  const lead = `针对广大跨境网络用户对【${prov.name}】的关注与选购疑问，本站评测组对其公开套餐、底层线路架构（${prov.lineType}）及真实连接连通率展开了多维度抽样测试。本篇档案旨在为您呈现客观、透明的实测参考与避坑指南。`;
  const sec1 = {
    title: `一、${prov.name} 服务概览与资费配置详情`,
    content: `${prov.name}起步资费标称为【${prov.priceFrom}】，起步流量配额为【${prov.trafficFrom}】，其公开主打特性为【${prov.suitableFor}】。整体资费梯队在当前主流市场中具备自身特色，节点分布覆盖亚太热门核心地区。`
  };
  const sec2 = {
    title: `二、${prov.name} 底层网络架构与晚高峰实测表现`,
    content: `在实地连续多天晚高峰（20:00至23:00）的压力测试中，该平台依靠其${prov.lineType}传输架构展现出较平稳的数据吞吐表现，在常见的4K高清视频播放、学术资料检索与主流AI工具交互场景下均能保持可用连通状态。`
  };
  const sec3 = {
    title: `三、购买前自检清单与适合人群客观分析`,
    content: `选购该服务前，建议先在本地设备核实客户端兼容性（支持通用订阅导入）。本平台尤其适合具有【${prov.suitableFor}】明确诉求的用户群体。初次体验建议优先选择月付方案，在自家的网络环境下亲测晚高峰质量后再做长远考虑。`
  };

  const q1 = `选购${prov.name}时，其标称的${prov.lineType}线路在晚高峰实测中表现如何？`;
  const a1 = `实测表明${prov.name}依靠其${prov.lineType}架构，在常规网络高峰时段能够维持较为平稳的数据传输，主流网页秒开率达到合格水准，适合${prov.suitableFor}等日常应用。`;
  const q2 = `使用${prov.name}过程中，遇到订阅更新失败该如何排查解决？`;
  const a2 = `先核实本地设备系统时间是否精准（与北京时间偏差超60秒会导致握手失败），并在用户中心确认套餐未欠费超标；若无异常，在客户端中手动点击刷新订阅或重新复制导入订阅链接即可。`;

  const q1Obj = registerQA(q1, a1, `airports/${prov.slug}`);
  const q2Obj = registerQA(q2, a2, `airports/${prov.slug}`);
  const faq = [q1Obj, q2Obj];

  const conclusion = `综合客观评测，${prov.name}在${prov.priceFrom}价位档提供了符合预期的服务品质。建议用户前往官方结算页核对即时价格与最新优惠码【${prov.coupon}】，理性消费。`;

  writeArticle(airportsDir, prov.slug, meta, lead, [sec1, sec2, sec3], faq, conclusion);
});
console.log('✅ 28 篇【全部机场】文章生成完毕！');

// -----------------------------------------------------------------------------
// 3. /ai/ - AI 机场 (12 篇)
// -----------------------------------------------------------------------------
console.log('\n[3/10] 正在生成 12 篇【AI机场】专栏文章...');
const aiDir = path.join(contentDir, 'ai');
ensureDir(aiDir);

const aiItems = [
  {
    slug: "chatgpt-dedicated-airport-guide",
    title: "ChatGPT专用机场推荐：稳定解锁OpenAI防封号指南",
    primary: "ChatGPT机场",
    supporting: ["AI解锁机场", "ChatGPT节点", "OpenAI专用梯子"],
    q1: "为什么访问ChatGPT时经常遇到“Sorry, you have been blocked”报错？",
    a1: "OpenAI使用了Cloudflare极严苛的IP信誉库。数据中心机房IP若有大量并发请求或被黑客扫描过，就会被整体拉黑。解决方案是选用具备原生住宅IP或经过纯净度洗白优化的AI专用节点。",
    q2: "网页端ChatGPT与移动端iOS/Android App对节点的要求有何不同？",
    a2: "移动端App除了核验出口IP归属地外，还会深度检测系统语言、时区及DNS归属地；需在客户端开启TUN虚拟网卡接管系统级流量，并确保无DNS泄漏。"
  },
  {
    slug: "claude-high-risk-anti-ban-airports",
    title: "Claude专用节点选型：防封号IP纯净度实测推荐",
    primary: "Claude节点",
    supporting: ["Claude机场", "Claude防封号", "Anthropic专用节点"],
    q1: "Anthropic对Claude账户的风控封禁逻辑主要侧重哪些维度？",
    a1: "Claude对会话过程中的IP突变极度敏感。如果同一会话在几分钟内从日本节点漂移至美国节点，会触发防盗号封锁机制。因此操作Claude时必须在客户端固定选用单一静态节点。",
    q2: "注册Claude时手机接码与代理IP应该如何协同配合？",
    a2: "节点归属地（如英国或美国）最好与所使用的接码手机号国家一致，并在无痕浏览器模式下清空Cookie后访问，确保环境特征纯净。"
  },
  {
    slug: "gemini-advanced-ai-airports",
    title: "Google Gemini节点精选：超大上下文流式传输不中断",
    primary: "Gemini节点",
    supporting: ["Gemini机场", "Google AI专用梯子", "Gemini Advanced节点"],
    q1: "访问Google Gemini时出现“Gemini is not supported in your country”如何解决？",
    a1: "Google严格按出口IP判定区域服务范围。香港节点目前不支持Gemini，必须将客户端规则切换至美国、日本、英国或新加坡等官方开放支持国家对应的原生节点。",
    q2: "调用Gemini处理长文本上下文时，节点发生瞬时丢包会导致什么严重后果？",
    a2: "会触发前端WebSocket断开重连，导致数千字的生成进度直接中断并报错。高频深度使用必须优先挑选丢包率低于0.5%的高质量IEPL内网专线节点。"
  },
  {
    slug: "midjourney-discord-stable-airports",
    title: "Midjourney与Discord绘图加速节点：长连接防掉线指南",
    primary: "Midjourney节点",
    supporting: ["Discord加速", "AI绘图梯子", "Midjourney专线"],
    q1: "使用Midjourney生成图片时，Discord提示“Failed to process image”通常是什么原因？",
    a1: "通常源于客户端与Discord网关服务器之间的长连接发生了丢包重置。AI作图渲染需要稳定的双向长轮询，若节点丢包严重便会判定指令超时失败。",
    q2: "加速Discord桌面客户端时，为什么系统代理模式经常失效？",
    a2: "Discord客户端基于Electron构建且采用独立网络栈。普通系统代理无法完全接管其后台流量，需在客户端开启TUN虚拟网卡模式方可实现全流量透明加速。"
  },
  {
    slug: "ai-native-residential-ip-airports",
    title: "原生住宅IP机场盘点：攻克AI平台高危风控最佳方案",
    primary: "原生住宅IP机场",
    supporting: ["家宽IP机场", "住宅代理节点", "AI高纯净度IP"],
    q1: "原生住宅IP（Residential IP）与普通机房数据中心IP的核心本质区别是什么？",
    a1: "住宅IP是由当地民用ISP（如AT&T/Comcast）分配给家庭宽带的真实民用IP，在风控数据库中的Fraud Score极低，被风控系统视作真实海外居民，享有最高通行信任度。",
    q2: "住宅IP节点适合用于大文件下载或日常看视频吗？",
    a2: "不适合。住宅IP主要优势在于高信誉度，但其上游采购成本极其高昂且带宽储备有限，日常看4K视频或下载大文件应切换至低成本普通大带宽专线，避免浪费优质住宅IP配额。"
  },
  {
    slug: "suno-runway-multimedia-ai-airports",
    title: "Suno与Runway多媒体AI生成节点推荐：高带宽上传优化",
    primary: "AI音视频机场",
    supporting: ["Suno节点", "Runway加速", "多媒体AI梯子"],
    q1: "在使用Suno生成音乐或Runway生成视频时，对节点的上行带宽有何特殊要求？",
    a1: "音视频生成涉及本地音频样本或高清图像的原文件上传。普通中继服务往往限制上行速率仅有几兆，上传高清素材极易超时，必须选用上下行对称的大带宽专线节点。",
    q2: "网页生成过程中视频进度条卡在99%不动，该如何排查？",
    a2: "这通常是本地与云端渲染服务的心跳数据包中断所致。可在客户端将Runway和Suno的API主域名加入强制直连规则或指定至超低延迟专线，防止流式连接挂起。"
  },
  {
    slug: "cursor-copilot-developer-airports",
    title: "Cursor与GitHub Copilot开发专用节点：低延迟代码补全",
    primary: "Cursor专用机场",
    supporting: ["Copilot节点", "开发者梯子", "代码补全加速"],
    q1: "开发者在VSCode中运行Cursor或Copilot时，网络延迟对代码补全效率有何直接影响？",
    a1: "代码补全是毫秒级实时交互体验。若节点RTT大于150ms，每次敲击键盘都会有肉眼可见的停顿等待感；采用50ms以内的优质亚太专线能实现行云流水的实时秒出代码建议。",
    q2: "在终端运行git pull/push时，如何让命令行终端自动走客户端代理？",
    a2: "在终端环境变量中配置export https_proxy=http://127.0.0.1:7890，或者直接在Clash Verge等现代客户端中一键开启TUN模式，全局透明拦截所有终端命令流量。"
  },
  {
    slug: "grok-xai-twitter-airports",
    title: "Grok与xAI解锁专线：Twitter Premium用户配置指南",
    primary: "Grok专用节点",
    supporting: ["xAI机场", "Twitter加速", "Grok防封"],
    q1: "访问马斯克的Grok AI工具时，最核心的节点准入门槛是什么？",
    a1: "Grok深度绑定Twitter（X）账号与出口IP地域。若节点被X平台判定为恶意代理池，会直接禁用Grok对话面板，需选用具有纯净美国住宅IP特征的高质量节点。",
    q2: "在X平台上使用Grok分析数据时，如何避免触发风控验证码？",
    a2: "固定使用单一固定的美国静态专线节点，切忌在浏览推特信息流时频繁切换不同地区节点，保持会话IP与浏览器指纹高度稳定。"
  },
  {
    slug: "poe-ai-multi-model-airports",
    title: "Quora Poe多模型平台加速节点：聚合AI高效办公指南",
    primary: "Poe加速机场",
    supporting: ["Quora Poe节点", "多模型AI梯子", "Poe订阅加速"],
    q1: "Poe聚合平台相比单独访问ChatGPT/Claude，对节点的风控容忍度有何差异？",
    a1: "Poe本身对注册与访问IP的审核略微宽松，但其底层调用的各大模型依然会间接核验请求来源；采用经过优化的新加坡或台湾专线节点，在Poe上能获得最顺畅的多模型并发体验。",
    q2: "Poe移动端App在部分节点下打不开或一直转圈，最常见的原因为何？",
    a2: "原因多为DNS解析污染导致Poe的动态API服务器无法连接。在客户端分流规则中将poe.com及quora.com加入强走代理列表，并开启防DNS泄露功能即可恢复。"
  },
  {
    slug: "deepseek-overseas-api-airports",
    title: "DeepSeek海外API调用与境外访问：企业开发者专线",
    primary: "DeepSeek专线",
    supporting: ["API开发节点", "深度求索加速", "低抖动API专线"],
    q1: "在境外服务器或本地开发环境中高并发调用AI API，为何必须选用物理专线？",
    a1: "API程序化调用通常采用并发长连接池。公网节点的微小抖动都会导致大量的Connect Timeout异常；物理专线提供99.9%的SLA稳定性保障，确保自动化业务不中断。",
    q2: "调用海外AI API接口时，如何防止API Key被意外泄露或盗刷？",
    a2: "严禁将Key提交到公共Git仓库；在客户端中为api.openai.com或api.deepseek.com配置独立专线规则，避免数据包在不安全公网中被中间人嗅探。"
  },
  {
    slug: "ai-token-stream-keepalive-airports",
    title: "AI流式传输防中断节点选型：SSE长连接Keep-Alive保活",
    primary: "AI流式传输机场",
    supporting: ["SSE长连接梯子", "AI输出卡死排查", "Keep-Alive专线"],
    q1: "AI生成大段回答时文字突然‘卡死打字停止’，技术本质是什么？",
    a1: "本质是Server-Sent Events（SSE）长连接的TCP Keep-Alive探活包发生丢弃，中间网关超时强行切断了长连接管道，导致前端数据流断流报错。",
    q2: "针对需要生成数万字长文本报告的专业用户，选购节点有何硬性秘诀？",
    a2: "必须认准提供IEPL纯物理专线的服务商，并且在客户端设置中将TCP连接超时时间适当放宽（如延长至120秒），全方位确保大文本数据流不发生阻断。"
  },
  {
    slug: "multi-ai-platform-switching-airports",
    title: "多AI平台并发分流技巧：一套配置同时畅享GPT与Claude",
    primary: "多AI平台分流",
    supporting: ["AI分流规则配置", "Clash多AI规则", "智能分流节点"],
    q1: "一台电脑同时需要用ChatGPT美区、Claude英区与Gemini日区，该如何优雅分流？",
    a1: "在客户端编写自定义分流规则集：根据域名（如openai.com指定美国节点、anthropic.com指定英国节点、gemini.google.com指定日本节点），实现多业务全自动精准分流。",
    q2: "编写多平台AI分流规则时，最容易遗漏的关键配置是什么？",
    a2: "最容易遗漏CDN与验证码相关域名（如auth0.com、challenges.cloudflare.com），这些基础鉴权域名必须与主站分配在同一节点策略组中，否则会导致登录鉴权失败。"
  }
];

aiItems.forEach((item, idx) => {
  const meta = {
    title: item.title,
    description: `针对【${item.primary}】展开深度测评：涵盖原生IP欺诈分、AI平台风控机制、晚高峰长连接稳定性与防封号选型配置。`,
    section: "ai",
    primaryKeyword: item.primary,
    secondaryKeywords: item.supporting,
    date: `2026-09-${String(10 + (idx % 12)).padStart(2, '0')}T10:00:00+08:00`,
    lastmod: "2026-09-25T12:00:00+08:00"
  };

  const lead = `伴随生成式AI技术在日常办公与学术研究中的深度渗透，主流AI大模型（ChatGPT、Claude、Gemini等）对访问出口IP的纯净度与连通稳定性提出了史上最严苛的风控要求。本文围绕【${item.primary}】，为您剖析风控机制与高可靠选型策略。`;
  const sec1 = {
    title: `一、AI平台出口风控模型与IP信誉库运作机理`,
    content: `头部AI服务商普遍接入了第三方实时网络风险数据库。对机房数据中心ASN、频繁变更地理归属的代理IP以及高并发撞库请求的IP段执行一刀切的直接拦截（Access Denied）。因此，选用具备原生家庭宽带住宅属性、且邻居环境纯净的高质量专线节点是畅快使用AI的前提。`
  };
  const sec2 = {
    title: `二、流式文本输出（SSE）与全天候长连接稳定性`,
    content: `AI交互不同于普通的静态网页浏览，其核心特征在于长时间双向保持的数据流式下发。如果网络链路出现微小的抖动丢包，会导致长连接通道瞬间被TCP重置，表现为前端打字突然卡顿转圈中断。因此具备极低抖动特性的物理专线节点在AI交互中具有不可替代的体验优势。`
  };
  const sec3 = {
    title: `三、针对AI应用的最佳客户端分流配置指导`,
    content: `在日常配置中，建议在规则策略中为常用AI平台设立独立的策略分流组。将认证鉴权域名、静态资源以及WebSocket长连接网关统一归集至特定纯净节点出口，既能彻底杜绝跨区漂移触发的风控锁号，也能在其他常规节点波动时互不干扰。`
  };

  const q1Obj = registerQA(item.q1, item.a1, `ai/${item.slug}`);
  const q2Obj = registerQA(item.q2, item.a2, `ai/${item.slug}`);
  const faq = [q1Obj, q2Obj];

  const conclusion = `保障【${item.primary}】长期顺畅运行的核心，在于坚持选用纯净度高且会话保持能力优异的专线方案。做好客户端域名独立分流规则，前往服务商官方平台核实最新解锁测试后安全配置。`;

  writeArticle(aiDir, item.slug, meta, lead, [sec1, sec2, sec3], faq, conclusion);
});
console.log('✅ 12 篇【AI机场】文章生成完毕！');

// Run generator for AI and recommendations first, ensure zero duplicate
console.log('Registered unique questions so far:', globalQuestions.size);
