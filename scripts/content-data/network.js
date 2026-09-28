module.exports = [
  {
    slug: "iepl-dedicated-line-technical-breakdown",
    title: "IEPL专线原理通俗科普：国际以太网私网专线为何晚高峰不卡",
    primary: "IEPL专线机场",
    supporting: ["IEPL物理专线", "国际私网专线", "专线机场推荐"],
    q1: "IEPL（International Ethernet Private Line）在物理层面的通信结构到底是怎样的？",
    a1: "IEPL依托跨国电信运营商的二层以太网物理专网传输。境内机房与境外机房之间通过运营商封闭的专用光纤电路直接打通，数据传输完全不进入公网路由网关，天然避开骨干网过滤与拥堵。",
    q2: "在日常网页浏览与流媒体体验上，IEPL相比传统公网中转有何代差级优势？",
    a2: "最核心优势在于更平稳的抖动控制和更低丢包表现。公网中转在高峰期易受骨干网拥塞影响，而专线依托物理专用光纤传输，高峰期受外部公网波动干扰较小，流媒体加载与网页响应更为平稳可靠。"
  },
  {
    slug: "iplc-dedicated-line-deep-dive",
    title: "IPLC专线深度解析：点对点物理电路与无墙特征全剖析",
    primary: "IPLC专线机场",
    supporting: ["IPLC内网专线", "点对点跨国专线", "无墙专线科普"],
    q1: "IPLC（International Private Leased Circuit）为何被技术界公认为真正的‘完全无墙’？",
    a1: "因为IPLC在物理层面上属于点对点的端到端纯租用电路（如深圳到香港）。通信链路完全运行在运营商内网通道中，物理上不经过国家的公网国际出口路由器和防火墙设备。",
    q2: "既然IPLC性能卓越，为什么当前主流高端服务商更多转向部署IEPL？",
    a2: "主要源于成本与扩容弹性。传统IPLC属于基于TDM时分复用的固定电路，开通周期长且带宽单价极其昂贵；IEPL基于以太网封装，具备更灵活的动态带宽扩容调度能力，性价比更为合理。"
  },
  {
    slug: "bgp-multi-line-transit-explained",
    title: "BGP多线中转架构解析：三网动态路由调度与公网隧道机制",
    primary: "BGP中转机场",
    supporting: ["BGP多线接入", "BGP隧道", "三网智能路由"],
    q1: "常说的‘BGP多线入口机房’，是如何解决国内电信、联通、移动跨网互联瓶颈的？",
    a1: "BGP机房同时向中国电信、中国联通、中国移动广播自治系统路由。无论用户本地使用何种宽带，其网络数据均在本地省份直接进入对应的运营商骨干直达机房，消除了跨网结算拥塞。",
    q2: "BGP公网隧道中转与物理内网专线（IEPL）的核心本质区别是什么？",
    a2: "区别在于过境段。BGP隧道仅在国内入口做多线聚合，过境时依然将加密数据打包由公网国际出口发送；而内网专线从国内机房进入后，过境全程由封闭物理光缆承担，不走公网出口。"
  },
  {
    slug: "vless-reality-protocol-principles",
    title: "VLESS Reality协议原理：无证书伪装与消除中间人特征",
    primary: "VLESS Reality机场",
    supporting: ["Xray新协议", "Reality抗封锁", "无证书伪装节点"],
    q1: "VLESS Reality协议为何不需要节点搭建者自己购买海外域名和申请TLS证书？",
    a1: "Reality采用了‘借鸡生蛋’的SNI借用技术。它借用海外知名大厂（如苹果、微软、雅虎）真实合法的现有TLS证书作为伪装外壳，客户端握手时直接借壳认证，消除了自签名或免费证书的特征。",
    q2: "Reality协议是如何防御审查防火墙的主动嗅探（Active Probing）探测的？",
    a2: "当审查系统向Reality节点发送非法的探测数据包时，服务端并不会报错关闭连接，而是原封不动地将流量代理转发给所借用的真实大厂目标网站，使探测方误以为这是一个真实的境外正规服务器。"
  },
  {
    slug: "hysteria2-udp-protocol-breakthrough",
    title: "Hysteria2协议深度剖析：基于UDP Brutal的恶劣网络暴风提速",
    primary: "Hysteria2机场",
    supporting: ["歇斯底里二代", "UDP拥塞控制", "恶劣网络加速"],
    q1: "Hysteria2（歇斯底里2代）在拥塞控制算法上为何能颠覆传统TCP协议？",
    a1: "传统TCP在遇到1%微小丢包时就会触发拥塞窗口减半，导致速度断崖式下跌。Hysteria2基于QUIC协议开发了定制的Brutal拥塞控制算法，无视丢包依然保持持续高速发包，强行跑满可用物理带宽。",
    q2: "在哪些特定的本地网络环境下，使用Hysteria2协议能获得最惊艳的提速体验？",
    a2: "在晚高峰骨干网丢包率极高的中国移动宽带、校园网Wi-Fi、长城宽带或偏远偏僻地区的弱网环境下，Hysteria2能够将原本仅有几兆的卡顿速度直接拉升到百兆以上畅看4K。"
  },
  {
    slug: "ss-shadowsocks-modern-architecture",
    title: "Shadowsocks 2022现代架构解析：AEAD加密与Rust重构优势",
    primary: "SS协议机场",
    supporting: ["Shadowsocks-rust", "SS2022协议", "轻量对称加密"],
    q1: "相比早期的流加密算法，现代Shadowsocks为何必须全面强制采用AEAD加密？",
    a1: "早期的OTA或流加密算法容易遭受密文重放攻击与主动探测修改；AEAD（如AEAD-Chacha20-Poly1305与AES-256-GCM）同时提供了强数据加密与完整性消息认证，彻底封堵了重放漏洞。",
    q2: "现代机场服务端为何大面积迁移至Shadowsocks-rust重构内核？",
    a2: "Rust语言具有零开销抽象与内存安全特性。相比早期Python版，Shadowsocks-rust在处理数万人并发连接时CPU和内存开销极低，高并发下网络丢包与系统调用上下文切换大幅缩减。"
  },
  {
    slug: "trojan-protocol-tls-camouflage",
    title: "Trojan协议底层机制科普：伪装成合法HTTPS流量的标准范式",
    primary: "Trojan机场",
    supporting: ["Trojan协议节点", "HTTPS流量伪装", "Trojan-Go进阶"],
    q1: "Trojan协议在通信特征上是如何做到混淆在常规互联网大潮中的？",
    a1: "Trojan完全摒弃了自定义加密特征，而是直接采用全球互联网通用的TLS 1.3协议。在外层审查流量监测看来，它与普通网民正常访问一家境外正规HTTPS电商或技术博客完全没有任何区别。",
    q2: "如果有人在未授权的情况下直接用浏览器访问Trojan节点的服务端地址，会看到什么？",
    a2: "服务端会直接将该非认证请求重定向转发给一个预先部署的真实海外Web页面（如一个精美的静态个人博客或企业展示页），呈现完美的无害假象，杜绝被识别为代理工具。"
  },
  {
    slug: "node-latency-vs-real-speed",
    title: "节点延迟与实际下载速度解密：Ping值低为什么看4K依然转圈",
    primary: "机场延迟与速度",
    supporting: ["Ping与带宽差异", "4K卡顿原因", "TCP单线程吞吐"],
    q1: "为什么客户端测速显示节点Ping只有30ms，但打开YouTube看4K视频却疯狂转圈？",
    a1: "Ping反映的仅仅是一个ICMP或TCP小包往返物理距离（时延指标）；而看视频考验的是大并发下的持续下行吞吐带宽（水管粗细）与丢包率。小包Ping通不代表有足够带宽承载高码率超清视频。",
    q2: "导致跨国高延迟节点（如美国200ms）在单线程下载中无法跑满千兆带宽的理论公式是什么？",
    a2: "由BDP（带宽时延乘积）与TCP滑动窗口机制决定：单线程吞吐上限等于TCP接收窗口大小除以往返时延（RTT）。在200ms延迟下，单线程必须依赖极大的Window Size或多线程并发才能拉满速度。"
  },
  {
    slug: "node-billing-multiplier-mechanism",
    title: "节点计费倍率机制大揭秘：0.5x、1.0x与2.0x的猫腻与防坑",
    primary: "机场节点倍率",
    supporting: ["流量倍率计算", "高倍率避坑", "0.5x节点技巧"],
    q1: "节点名称后标注的‘1.0x / 2.0x / 0.5x’到底是如何直接影响套餐流量扣费的？",
    a1: "倍率是实际扣费系数：在1.0x节点消耗1G流量，账户扣除1G；在2.0x高级专线节点消耗1G流量，账户将被扣除2G；而在0.5x冷门轻量节点消耗1G，账户仅扣除500M流量。",
    q2: "在日常使用中，如何防范误选了3.0x或5.0x高倍率节点导致流量几天内被快速扣光？",
    a2: "下载大容量系统安装包、Steam游戏更新或高频看4K视频时，必须在客户端中看清倍率标签，优先选用1.0x或0.5x常规节点；仅在紧急处理金融或高安全业务时偶尔调用高倍率冷门专线。"
  },
  {
    slug: "anycast-routing-acceleration-explained",
    title: "Anycast任播路由加速解析：全球分布式边缘接入的黑科技",
    primary: "Anycast加速机场",
    supporting: ["Anycast任播专线", "就近接入网络", "BGP Anycast架构"],
    q1: "Anycast（任播）技术在网络加速节点的域名解析与数据路由中扮演什么角色？",
    a1: "Anycast让全球数百个不同机房的服务器共享同一个公网IP地址。当用户发起连接时，BGP路由算法会全自动将数据包引导至地理与网络拓扑上距离用户最近的机房入口，实现极速连接。",
    q2: "Anycast架构在应对大流量DDoS攻击或区域单点光缆故障时具备哪些天然容灾优势？",
    a2: "攻击流量或海量访问会被自动稀释分散到全球各大边缘数据中心分别就近消化清洗，避免单一机房网卡被直接打爆；某一区域机房发生故障时，BGP路由瞬间撤销并将用户无缝引流至次近机房。"
  },
  {
    slug: "residential-ip-vs-datacenter-ip",
    title: "原生住宅IP与机房IP差异全对比：风控模型与IP欺诈分识别",
    primary: "原生住宅IP对比",
    supporting: ["机房IP区别", "IP欺诈分查询", "住宅代理科普"],
    q1: "全球各大安全风控数据库（如IPinfo、MaxMind、Scamalytics）是如何精准区分住宅IP与机房IP的？",
    a1: "风控数据库通过查询该IP所归属的自治系统（ASN）组织注册属性。如果ASN类型标记为Hosting/DataCenter则判定为机房托管IP；如果标记为ISP/Residential则认证为正规民用住宅宽带IP。",
    q2: "普通用户日常如何自主免费查询当前所连接节点的真实IP类型与Fraud Score（欺诈分）？",
    a2: "打开浏览器访问scamalytics.com或whoer.net，查看IP欺诈分报告：Fraud Score分值越低（如0-15分）代表IP越纯净可信；分值若高于50分则极易在各大海外平台遭遇人机验证甚至封号。"
  },
  {
    slug: "dns-leak-and-poisoning-prevention",
    title: "DNS泄漏与DNS污染深度防范：Fake-IP与DoH防劫持技术实践",
    primary: "DNS防泄漏",
    supporting: ["DNS污染解决", "Fake-IP机制", "DoH加密解析"],
    q1: "所谓‘DNS污染’（DNS Poisoning）在网络通信层面是如何篡改我们访问的域名的？",
    a1: "当本地向公网发送明文UDP 53端口的DNS查询请求时，旁路审查系统会抢在真实的权威根域名服务器返回前，伪造一个错误的虚假IP地址（如127.0.0.1）抢先应答，导致浏览器指向死胡同。",
    q2: "现代客户端（如Clash Meta）的‘Fake-IP’增强模式是如何彻底终结DNS污染的？",
    a2: "Fake-IP模式下，客户端在本地直接给所有域名虚拟分配一个内网假IP（如198.18.0.x）立即应答浏览器；真实的域名解析交由境外远程专线节点在完全无污染的环境下完成，杜绝一切本地劫持。"
  }
];
