module.exports = [
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
    a2: "会触发前端WebSocket断开重连，导致长文本生成进度直接中断并报错。高频深度使用建议优先挑选抗丢包与长连接冗余能力较强的高质量IEPL内网专线节点。"
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
];;