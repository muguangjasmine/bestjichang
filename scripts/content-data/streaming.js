module.exports = [
  {
    slug: "netflix-4k-full-catalog-airports",
    title: "Netflix 4K奈飞全区解锁机场推荐：自制剧与版权剧辨别",
    primary: "Netflix解锁机场",
    supporting: ["奈飞4K专线", "Netflix原生节点", "流媒体解锁机场"],
    q1: "为什么我的Netflix账号只能看到自制剧（如怪奇物语），搜不到绝命毒师等外购版权剧？",
    a1: "这是因为当前连接的节点IP被Netflix识别为非原生机房代理IP，因此官方仅向该IP开放无地域版权限制的全球自制内容；切换至标有‘NF全解锁/原生住宅IP’的节点即可正常浏览当地全部版权影片。",
    q2: "在观看Netflix 4K超高清画质时，对网络节点的带宽与抖动有何硬性指标要求？",
    a2: "Netflix官方推荐持续稳定下行带宽不低于25Mbps，同时端到端丢包率必须低于1%，且不能有频繁的TCP重传，否则客户端播放器会自动降低清晰度至1080P甚至720P。"
  },
  {
    slug: "youtube-premium-4k-airports",
    title: "YouTube 4K/8K极速播放节点精选：Connection Speed实测",
    primary: "YouTube 4K机场",
    supporting: ["油管4K流畅播放", "大带宽流媒体节点", "YouTube Premium梯子"],
    q1: "在YouTube右键‘详细统计信息’（Stats for nerds）中，Connection Speed达到多少算优秀？",
    a1: "播放4K/60帧超高清视频时，Connection Speed若能持续保持在充沛带宽水准（如60,000 Kbps以上），即可获得较为流畅平稳的观影体验；若带宽不足则易在高峰期发生画质降阶或缓冲转圈。",
    q2: "购买跨区低价YouTube Premium会员时，节点操作有哪些关键注意事项？",
    a2: "绑定支付方式（如信用卡）时，所选节点的地理位置必须与打算享受低价的账单地区完全一致，并且建议在全程开启纯净无痕浏览器环境下操作，防止因IP指纹冲突导致支付被拒。"
  },
  {
    slug: "disney-plus-star-unlock-airports",
    title: "Disney+与Star专区解锁指南：解决Error 83报错技巧",
    primary: "Disney+解锁机场",
    supporting: ["迪士尼流媒体节点", "Disney+ Error 83修复", "流媒体专线推荐"],
    q1: "打开Disney+ App时屏幕提示‘Error 83’无法登录，通常是什么原因引起的？",
    a1: "Error 83是Disney+针对不兼容设备或高风险机房代理IP的标准拦截代码。最常见的诱因是节点IP已被迪士尼风控拉黑，或是设备端IPv6地址发生泄漏暴露了真实地理位置。",
    q2: "Disney+美区、港区与新加坡区的片库内容有何主要差异？",
    a2: "美区偏重合家欢漫威与星战系列；而港区、台区和新加坡区包含了面向成人的Star专区（包含大量R级电影与日韩美剧），并提供极高品质的官方中文字幕与配音，观影体验更加丰富。"
  },
  {
    slug: "tiktok-overseas-creator-airports",
    title: "TikTok海外创作者与直播专线：防黑屏与0播放实操指南",
    primary: "TikTok运营机场",
    supporting: ["TikTok防黑屏", "海外短视频专线", "TikTok直播节点"],
    q1: "新手做TikTok短视频运营发布作品遭遇‘0播放’，节点方面最常见的致命问题是什么？",
    a1: "最常见问题是使用了大量创作者公用的廉价机房IP，该IP在平台算法中已被标记为黑产或垃圾农场；此外手机拔卡、修改系统语言时区及关闭本地定位等底层环境也必须同步合规达标。",
    q2: "TikTok海外专场直播带货对网络节点提出了哪些极苛刻的带宽要求？",
    a2: "直播推流属于高码率上行通信，要求上行带宽稳定不低于15Mbps，且连续推流数小时内丢包率必须绝对为零，必须通过配置独享静态IP或专属企业跨境直播专线才能确保不被强行掐断。"
  },
  {
    slug: "hbo-max-streaming-airports",
    title: "HBO Max（Max）美区原生流媒体解锁：4K杜比视界体验",
    primary: "HBO Max机场",
    supporting: ["Max解锁节点", "华纳流媒体梯子", "美区流媒体推荐"],
    q1: "访问华纳旗下的Max（原HBO Max）服务时，为什么国内双币信用卡经常绑卡失败？",
    a1: "Max不仅深度核验出口IP是否为美国原生住宅IP，还会严格校验支付信用卡的BIN码是否属于美国本土发卡行。建议配合美区PayPal或在美区Apple ID内通过App Store内购礼品卡完成订购。",
    q2: "使用电视盒子（Apple TV / Fire TV）观看Max时，如何确保开启最高杜比视界规格？",
    a2: "电视端对网络抖动更为敏感，需在软路由或客户端中为Max域名配置直通低延迟美国专线，并确保HDMI线材支持HDMI 2.1协议，以便完整点亮Dolby Vision与Dolby Atmos标识。"
  },
  {
    slug: "apple-tv-plus-streaming-airports",
    title: "Apple TV+高码率流媒体加速：软路由与电视盒子配置心得",
    primary: "Apple TV+加速",
    supporting: ["Apple TV流媒体节点", "tvOS代理分流", "高码率视频加速"],
    q1: "Apple TV+的4K视频画质码率为何被公认为行业天花板？对网络有何挑战？",
    a1: "Apple TV+视频平均动态码率高达40Mbps以上（峰值甚至突破60Mbps），是普通平台视频码率的两到三倍。如果网络节点带宽储备不足或存在微小抖动，极易发生频繁缓冲或降码现象。",
    q2: "在tvOS系统中使用Stash或Surge等客户端时，分流规则应该如何优化以防本地应用受影响？",
    a2: "由于Apple生态服务众多（包括iCloud备份、App Store下载），分流规则中必须精准区分AppleCDN（直连以跑满国内千兆宽带）与AppleTV流媒体域名（走境外节点加速解锁）。"
  },
  {
    slug: "spotify-music-streaming-airports",
    title: "Spotify跨区畅听与家庭组会员：防14天区域限制技巧",
    primary: "Spotify加速节点",
    supporting: ["Spotify跨区梯子", "网易云替代流媒体", "音乐流媒体节点"],
    q1: "免费版Spotify用户在境外连续使用时，为何经常提示‘离家超过14天需在当地登录’？",
    a1: "这是Spotify针对免费账户设立的风控规则。免费账户每隔14天必须在与注册国别相同的IP环境下完成一次登录刷新；若已升级为Premium付费会员，则完全免除该14天地域限制。"
    ,
    q2: "加入跨区Spotify家庭组时，如何顺利通过地址验证并正常播放？",
    a2: "接受家庭组邀请并在网页端填报住址时，当前连接的代理节点必须与家庭组组长账户所在国家保持严格一致；验证成功后，日常听歌时并不强制要求必须挂载该国节点。"
  },
  {
    slug: "bbc-iplayer-uk-airports",
    title: "英国BBC iPlayer流媒体解锁：英区电视牌照与纯净IP指南",
    primary: "BBC iPlayer机场",
    supporting: ["英国流媒体节点", "BBC专属梯子", "英剧原生解锁"],
    q1: "在访问英国BBC iPlayer时，弹窗询问‘Do you have a TV licence?’该如何应对？",
    a1: "该弹窗为英国法律规定的合规提示，直接点击‘I have a TV licence’即可继续；真正决定能否正常播放的核心瓶颈在于当前节点IP是否通过了BBC严苛的英国本地住宅IP白名单过滤。",
    q2: "由于地理跨度极大，中国大陆直连英国节点的物理延迟通常在多少范围属于正常？",
    a2: "经由欧亚欧陆光缆直达伦敦的往返物理延迟通常在140ms至180ms之间属于正常物理极限；只要网络丢包率为零且持续带宽充足，依然能非常流畅地观看BBC 1080P全高清内容。"
  },
  {
    slug: "bilibili-taiwan-hongkong-airports",
    title: "哔哩哔哩港澳台番剧解锁专线：低延迟大带宽解锁技巧",
    primary: "B站港澳台节点",
    supporting: ["Bilibili出海番剧", "仅限港澳台地区", "哔哩哔哩加速专线"],
    q1: "Bilibili标有‘仅限港澳台地区’的限定番剧，其核心解锁机制具体是怎样的？",
    a1: "B站客户端仅在向视频服务器请求播放鉴权（PlayURL）的握手瞬间校验出口IP地域。一旦鉴权通过拿到视频流地址，后续几十兆的视频分片实际可走直连通道拉取，兼顾极速与解锁。",
    q2: "观看港澳台限定番剧时，为什么优先推荐选择台湾专线节点？",
    a2: "部分版权方将优质独家内容仅分发授权给台湾地区（标记为‘仅限台湾地区’）；挑选台湾内网专线节点不仅延迟低（通常40ms左右），而且能够实现港澳台全库所有番剧的无死角通解。"
  },
  {
    slug: "japan-abema-dmm-tv-airports",
    title: "日本Abema与DMM TV解锁专线：日漫与体育直播无死角指南",
    primary: "日本流媒体机场",
    supporting: ["Abema TV节点", "DMM TV解锁", "日本原生节点"],
    q1: "观看日本Abema TV直播时，提示‘This service is not available in your region’如何解决？",
    a1: "Abema部署了日本业内最严格的机房IP风控，主流云厂商（如AWS、Linode、Oracle）的所有公网IP均被无差别封杀。必须选用接入了日本本地民用宽带（如OCN、软银或J:COM）的原生节点。",
    q2: "日本专线节点在晚高峰观看世界杯或热门格斗大赛直播时，抗卡顿的核心指标是什么？",
    a2: "大型直播属于无缓存即时下发流，核心指标是网络吞吐的‘最低瞬时抖动’与持续大带宽保障。必须依托上海至东京直连的IEPL内网海缆，确保晚高峰不出现任何关键镜头掉帧转圈。"
  }
];
