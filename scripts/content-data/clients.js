module.exports = [
  {
    slug: "clash-verge-rev-windows-tutorial",
    title: "Clash Verge Rev Windows 11完整配置教程：内核切换与TUN模式",
    primary: "Clash Verge Rev教程",
    supporting: ["Clash Verge Win11", "Mihomo内核配置", "TUN虚拟网卡设置"],
    q1: "Clash Verge Rev在Windows 11系统下提示‘Service Mode未安装’该如何解决？",
    a1: "点击客户端左侧‘Settings’（设置），找到Clash Core下方的Service Mode（服务模式），点击‘Install’并在弹出的UAC窗口中授予管理员权限；安装成功后图标变绿即可正常开启TUN模式。",
    q2: "如何在Clash Verge Rev中设置订阅自动定时更新以防节点失效断连？",
    a2: "在Profiles（订阅配置）界面右键点击自己的机场订阅卡片，选择‘Edit Info’，在Update Interval（更新周期）输入框中输入24或12（单位小时），软件便会在后台定时静默拉取最新节点。"
  },
  {
    slug: "clash-verge-rev-mac-tutorial",
    title: "Clash Verge Rev macOS配置指南：M系列芯片授权与分流设置",
    primary: "Mac Clash教程",
    supporting: ["Mac科学上网", "Apple Silicon适配", "macOS系统代理设置"],
    q1: "在Mac平台（M1/M2/M3/M4芯片）安装Clash Verge Rev时提示‘文件已损坏’如何处理？",
    a1: "这是macOS Gatekeeper安全机制的拦截。打开终端（Terminal）输入sudo xattr -rd com.apple.quarantine /Applications/Clash\\ Verge.app并回车输入密码，即可彻底清除隔离属性正常打开。",
    q2: "在Mac上开启TUN模式时，系统为什么会频繁弹出要求输入密码的管理员提权？",
    a2: "因为TUN模式需要在macOS内核层创建一个虚拟网卡设备（utun）以全局截获网络流量，这属于系统底层网络接口操作，必须经过一次管理员授权以部署专有守护助手程序。"
  },
  {
    slug: "mihomo-party-complete-guide",
    title: "Mihomo Party桌面客户端保姆级教程：图形化覆写与WebUI实战",
    primary: "Mihomo Party教程",
    supporting: ["Mihomo新一代UI", "Clash图形覆写", "WebUI连接监控"],
    q1: "Mihomo Party相比传统的Clash客户端，其‘图形化覆写（Override）’有何优势？",
    a1: "传统的Clash修改规则需要手动编写复杂的YAML语法且易缩进报错；Mihomo Party提供所见即所得的图形开关，可在不破坏原订阅的前提下，一键给所有机场插入自定义DNS和防泄漏规则。",
    q2: "在Mihomo Party内置的实时连接面板（Connections）中，如何排查异常跑流量的后台程序？",
    a2: "打开Connections面板，点击‘Speed（实时速度）’表头进行降序排列，即可清晰查看到正在以数十兆狂跑流量的具体进程名称（Process Name）与目标访问域名，方便一键强制掐断。"
  },
  {
    slug: "shadowrocket-ios-setup-guide",
    title: "Shadowrocket小火箭iOS安装与订阅导入：扫码导入全流程",
    primary: "Shadowrocket教程",
    supporting: ["小火箭配置指南", "iOS科学上网", "小火箭订阅导入"],
    q1: "中国大陆Apple ID在苹果App Store搜不到Shadowrocket小火箭该怎么下载？",
    a1: "小火箭由于政策原因未在国区上架。需在App Store退出当前国区账号，切换登录一个已在美区或港区购买了该软件的外区Apple ID（可通过购买正规苹果礼品卡自行在官网注册外区号下载）。",
    q2: "拿到机场提供的订阅链接后，在小火箭中通过哪种方式导入最便捷且不易出错？",
    a2: "最便捷的是直接在手机浏览器打开机场后台，点击‘一键导入Shadowrocket’，系统会自动唤起小火箭完成添加；也可直接在小火箭首页点击右上角‘+’号，类型选Subscribe并粘贴URL。"
  },
  {
    slug: "stash-ios-advanced-configuration",
    title: "Stash iOS高级配置指南：Clash在苹果生态的规则与覆写详解",
    primary: "Stash教程",
    supporting: ["Stash配置", "iOS Clash替代", "Stash高级覆写"],
    q1: "Stash被称为‘iOS平台上的Clash’，它能直接识别和使用电脑端Clash的YAML订阅吗？",
    a1: "完全原生兼容。Stash深度兼容标准的Clash/Mihomo规则语法，用户可直接将电脑上的订阅链接导入Stash，无需任何格式转换即可完美继承所有节点、策略组和高级分流分流规则。",
    q2: "在Stash中开启‘On Demand（按需连接）’功能有什么日常便利？",
    a2: "开启按需连接后，Stash会在检测到手机连接蜂窝移动数据或进入特定无代理的外部Wi-Fi时，在后台全自动自动拉起VPN隧道，彻底避免由于系统杀后台导致的断开与手动重连麻烦。"
  },
  {
    slug: "sing-box-universal-cross-platform",
    title: "sing-box全平台配置指南：新一代开源内核JSON语法实战",
    primary: "sing-box教程",
    supporting: ["sing-box通用配置", "新一代代理内核", "Rule-set规则集"],
    q1: "sing-box相比传统Clash内核，在配置文件架构上为何摒弃YAML而采用纯JSON？",
    a1: "JSON具有严格的语法规范和极高的解析效率，消除了YAML缩进空格错位导致的致命崩溃，并且JSON能原生无缝对接各种大型自动化运维编排与程序化校验，运行性能极为剽悍。",
    q2: "sing-box新版引入的‘Rule-set（二进制规则集）’是如何实现百万级分流秒级加载的？",
    a2: "Rule-set将数十万条庞大的域名和IP规则预先编译为二进制.srs格式文件，内核启动时直接以内存映射（mmap）方式极速载入，将内存开销从几百兆断崖式缩减至仅有十几兆。"
  },
  {
    slug: "v2rayn-windows-client-guide",
    title: "v2rayN Windows客户端入门教程：路由规则与系统代理设置",
    primary: "v2rayN教程",
    supporting: ["v2rayN Windows指南", "Xray客户端配置", "绕过大陆路由设置"],
    q1: "v2rayN主界面下方的系统代理开关‘清除系统代理’与‘自动配置系统代理’该如何选择？",
    a1: "需要上网时选择‘自动配置系统代理’，此时右下角托盘图标变为红色，系统流量交由v2rayN接管；退出或断开时务必切换回‘清除系统代理’，否则会导致关闭软件后电脑无法打开任何网页。",
    q2: "在v2rayN中导入订阅后，如何一键批量测试所有节点的真实有效性？",
    a2: "按Ctrl+A全选节点列表，鼠标右键选择‘测试服务延迟’下的‘测试真实连接延迟（可用性）’，软件会向Google发起真实握手测速，自动过滤超时节点并把可用节点按毫秒排序。"
  },
  {
    slug: "clash-for-windows-migration-guide",
    title: "Clash for Windows停更平滑迁移指南：迁移至Clash Verge Rev",
    primary: "CFW迁移教程",
    supporting: ["Clash for Windows替代", "配置无损迁移", "安全内核升级"],
    q1: "为什么强烈建议正在使用旧版Clash for Windows（CFW）的用户尽快迁移换代？",
    a1: "CFW开源作者已正式宣布删库停更，其内置的旧版Electron和Clash开源内核存在未修补的高危安全漏洞，且完全不支持后续新兴的高性能协议（如VLESS Reality、Hysteria2）。",
    q2: "从旧版CFW迁移到Clash Verge Rev，如何做到原有订阅与自定义设置无损平滑迁移？",
    a2: "直接复制原有机场提供的订阅URL，在Clash Verge Rev的Profiles界面点击New添加粘贴即可；新客户端底层自动兼容原有规则集，几秒钟即可完成无缝无痛交接，无需繁琐重新配置。"
  },
  {
    slug: "clash-meta-kernel-features",
    title: "Mihomo（Clash Meta）内核新特性详解：Sniffer与新协议实战",
    primary: "Mihomo内核特性",
    supporting: ["Clash Meta特性", "域名嗅探Sniffer", "Geodata新规则"],
    q1: "Mihomo内核中内置的‘Sniffer（域名嗅探）’功能，核心解决了什么传统代理痛点？",
    a1: "很多流媒体App或局域网设备在发起连接时仅发送裸IP而非域名，传统规则因无法获取域名而导致分流失败；Sniffer能在TLS握手报文中自动嗅探提取出真实SNI域名，实现100%精准分流。",
    q2: "在Mihomo内核中开启‘Geodata Loader: memconservative’对低配置设备有何好处？",
    a2: "该选项专为小内存设备（如低配软路由或老款电视盒子）优化，将庞大的geoip.dat和geosite.dat规则库采用轻量流式载入，避免瞬时内存暴涨导致系统OOM崩溃杀掉进程。"
  },
  {
    slug: "android-clash-meta-setup",
    title: "Clash Meta for Android安卓端配置教程：后台保活与分应用代理",
    primary: "安卓Clash教程",
    supporting: ["Clash Meta安卓配置", "安卓后台保活", "分应用代理设置"],
    q1: "安卓手机（如小米MIUI/华为鸿蒙）使用Clash时，经常锁屏几分钟就自动断网掉线怎么办？",
    a1: "这是被系统激进的电池优化杀掉了后台进程。必须进入手机系统设置，将Clash的省电策略改为‘无限制’，并在多任务切换卡片中给Clash打上锁定白名单锁头，开启自启动权限。",
    q2: "如何在安卓Clash中配置‘分应用代理（Access Control）’仅加速特定海外软件？",
    a2: "进入Clash设置中的Network或Access Control（访问控制），勾选‘仅允许选中的应用走代理’，在应用列表中仅勾选Chrome、Twitter、Telegram等海外App，其他国内应用完全不经过代理。"
  },
  {
    slug: "v2rayng-android-configuration",
    title: "v2rayNG安卓端新手上手指南：自建与机场订阅管理排错",
    primary: "v2rayNG教程",
    supporting: ["安卓v2rayNG配置", "自建节点导入", "安卓代理测速"],
    q1: "在v2rayNG左侧抽屉菜单中，‘分流设置’里的‘绕过局域网及大陆地址’有何必要性？",
    a1: "该设置是保障日常体验的核心开关。开启后，访问国内淘宝、微信和外卖时直接走本地运营商网络，不消耗任何代理流量且网速飞快，只有境外受限网络才自动通过节点加密访问。",
    q2: "在v2rayNG中点击右下角V型图标启动连接后，如何快速判断当前节点是否真正联通？",
    a2: "点击主界面下方的‘测试连接（TrueDelay）’文字区域。如果显示绿色的实测延迟数值（如280ms），则说明TCP握手与HTTP连通正常；若显示Timeout或-1ms则说明当前节点已失效。"
  },
  {
    slug: "surge-ios-mac-high-end-guide",
    title: "Surge高端网络调试工具新手进阶：抓包诊断与多设备网关",
    primary: "Surge教程",
    supporting: ["Surge iOS配置", "Surge Mac网关", "高端网络调试"],
    q1: "售价高昂的Surge在整个代理客户端领域，其不可替代的核心技术护城河在哪里？",
    a1: "在于工业级极其健壮的底层网络栈、毫米级精准的抓包追踪分析工具、以及无与伦比的全局网络策略调度引擎，它能把每一笔TCP连接的TLS证书、DNS解析和传输细节纤毫毕现展示出来。",
    q2: "Surge Mac版本中的‘Enhanced Mode（增强模式）’与‘DHCP网关模式’有何联动威力？",
    a2: "开启增强模式后，Surge能瞬间接管整个macOS所有命令行与后台虚拟机的网络；配合DHCP网关接管，更能让整栋办公室或家庭局域网内的所有手机和Switch直接把Mac当作全能网关加速。"
  },
  {
    slug: "loon-ios-plugin-script-guide",
    title: "Loon iOS客户端插件与脚本入门：兼顾流媒体解锁与广告拦截",
    primary: "Loon教程",
    supporting: ["Loon插件配置", "iOS脚本自动化", "Loon流媒体分流"],
    q1: "Loon客户端独具特色的‘Plugin（插件）’系统，相比手动写规则为用户带来了什么便利？",
    a1: "插件将原本分散的脚本、MitM解密证书、复写重定向与分流规则高度模块化打包成一个单一URL。用户点击安装后即可一键获得指定应用（如YouTube去广告或Spotify歌曲解锁）的完整能力。",
    q2: "在Loon中安装需要解密HTTPS流量的插件时，为什么必须在手机系统设置中信任根证书？",
    a2: "因为HTTPS流量全程端到端加密，要执行重写或修改响应头，客户端必须在本地生成自定义CA证书充当中间人（MitM）；必须在iOS‘关于本机-证书信任设置’中手动开启完全信任方能生效。"
  },
  {
    slug: "quantumult-x-circle-guide",
    title: "Quantumult X（圈X）保姆级上手指南：分流重写与MitM实战",
    primary: "Quantumult X教程",
    supporting: ["圈X配置指南", "QX重写规则", "MitM证书安装"],
    q1: "初次接触Quantumult X（圈X）的新手，最容易在哪个核心界面因概念混淆而卡住？",
    a1: "最容易在右下角悬浮大风车按钮中的‘策略组模式’卡住。圈X区分了‘全部代理’、‘规则分流’和‘直连’，若误点了最右侧的‘全局直连’，哪怕节点全部测速正常也无法打开任何外网。",
    q2: "在圈X的配置文件中，‘分流（filter_remote）’与‘重写（rewrite_remote）’的区别是什么？",
    a2: "分流仅负责决定‘某个域名或IP走哪个节点或直连’；而重写则深入到了应用内部HTTP请求层，负责通过本地或远程JS脚本修改请求内容、去除弹窗广告或自动签到获取积分。"
  },
  {
    slug: "openwrt-soft-router-passwall",
    title: "OpenWrt软路由PassWall插件配置：全局透明网关与防环路指南",
    primary: "PassWall教程",
    supporting: ["软路由透明代理", "OpenWrt科学上网", "国内DNS防环路"],
    q1: "在OpenWrt软路由上部署PassWall作为主网关，如何避免发生致命的‘DNS解析死循环’？",
    a1: "必须采用国内与国外DNS严格分流架构。将国内常用域名强制指定给中国电信/联通本地DNS（如119.29.29.29），将境外解析交由远端节点或通过DoH走加密通道，杜绝环路查询死锁。",
    q2: "PassWall中节点列表里的‘TCP节点’与‘UDP节点’是否必须分别独立指定？",
    a2: "常规网页浏览仅配置TCP节点即可正常工作；但若家庭有玩PlayStation/Switch联机游戏或需要Google Voice网络电话，必须在UDP节点处指定一个支持FullCone NAT的优质低延迟节点。"
  },
  {
    slug: "openwrt-openclash-mastery",
    title: "OpenClash软路由高阶实战：Meta内核切换与旁路由网关调优",
    primary: "OpenClash教程",
    supporting: ["OpenClash旁路由", "Meta内核调优", "软路由千兆加速"],
    q1: "将安装了OpenClash的设备作为‘旁路由网关’时，主路由上的DHCP网关应该如何设置？",
    a1: "将主路由DHCP服务中的‘默认网关（Gateway）’与‘DNS服务器’地址，统统修改为旁路由的内网静态IP地址，即可让所有连入Wi-Fi的家庭设备无感自动将所有流量引导给OpenClash分流。",
    q2: "在OpenClash运行模式中，‘Fake-IP（TUN）’相比‘Redir-Host’在性能上有何决定性优势？",
    a2: "Fake-IP彻底绕过了软路由本地漫长的DNS远端代理解析等待时间，浏览器请求瞬间返回虚拟IP直接建连，不仅大幅降低全屋网页首包等待时间，而且从机制上100%免疫所有DNS污染。"
  },
  {
    slug: "nekoray-desktop-client-guide",
    title: "NekoRay桌面跨平台客户端教程：基于sing-box的高效办公利器",
    primary: "NekoRay教程",
    supporting: ["NekoRay Windows配置", "桌面端代理工具", "sing-box内核客户端"],
    q1: "NekoRay主界面顶部的‘VPN模式（TUN）’与底部的‘系统代理’开关有何本质区别？",
    a1: "系统代理仅修改操作系统注册表中的HTTP/Socks5代理设置，仅对遵循系统代理的浏览器等生效；VPN模式会在网卡列表虚拟出一张TUN网卡，截获整台电脑100%所有软件（含终端与游戏）的全部数据包。",
    q2: "在NekoRay中导入包含数千个节点的复杂机场订阅时，如何实现节点按国家自动分组？",
    a2: "在订阅设置中勾选‘启用自动分组（Group by Country）’选项，软件解析订阅时会自动根据节点名称中的国旗emoji或地区缩写（HK/JP/US/SG），自动生成清晰整洁的折叠国家目录。"
  },
  {
    slug: "karing-cross-platform-client",
    title: "Karing全平台开源客户端上手教程：多端统一交互与极简体验",
    primary: "Karing教程",
    supporting: ["Karing配置", "跨平台开源客户端", "多协议全兼容客户端"],
    q1: "Karing作为近年异军突起的跨平台客户端，其对新手最友好的核心亮点是什么？",
    a1: "全平台（iOS、Android、macOS、Windows）界面交互与逻辑100%高度统一，且iOS版本直接可以在非国区App Store免费下载安装，彻底免去了新手配置多套客户端的繁重学习成本。",
    q2: "在Karing中同时添加了多个机场订阅，如何一键开启自动负载均衡或测速择优？",
    a2: "进入Routing（分流规则）界面，为Outbound指定为‘Url-Test’或‘Load-Balance’分组，并设定定时测速地址；系统会在后台定时向Cloudflare发起探测，时刻将网络交由当前速度最快的节点承载。"
  },
  {
    slug: "flclash-cross-platform-tutorial",
    title: "FlClash现代跨平台客户端配置教程：基于Flutter的美学分流",
    primary: "FlClash教程",
    supporting: ["FlClash跨平台", "Flutter代理客户端", "现代化Clash UI"],
    q1: "FlClash采用Google Flutter引擎开发，在桌面与移动端渲染上有何突出性能特点？",
    a1: "拥有极高帧率的丝滑动画效果和极低的内存占用开销，完全抛弃了基于Electron客户端动辄吃掉数百兆内存的臃肿弊端，即便在老旧轻薄本或老款安卓机上依然运行飞速。",
    q2: "在FlClash中如何进行快速全局快捷键设置以便一键隐藏或唤起主窗口？",
    a2: "在Settings的Shortcuts（快捷键）菜单中，为Toggle Window分配专属组合键（如Ctrl+Alt+C），在办公环境下可随时瞬间唤起节点切换面板或一键将程序隐藏回系统托盘。"
  },
  {
    slug: "clash-nyanpasu-modern-ui",
    title: "Clash Nyanpasu新手实用手册：优雅轻巧的桌面端新选择",
    primary: "Clash Nyanpasu教程",
    supporting: ["Nyanpasu配置", "轻量级Clash客户端", "Tauri内核界面"],
    q1: "Clash Nyanpasu底层采用Rust Tauri框架开发，相比传统客户端带来了哪些直接优势？",
    a1: "安装包体积极为小巧（通常仅需十几兆），后台静默运行时内存占用甚至不足30MB；界面遵循现代Material Design 3设计规范，深浅主题自适应切换，视觉排版优雅大方。",
    q2: "在Clash Nyanpasu中如何快速查看当前节点的数据流量吞吐波形图？",
    a2: "点击左侧导航栏的Overview（总览）页面，顶部常驻实时带宽心跳仪表盘与动态波形折线图，精确细分展示当前秒级上行速率、下行速率以及本地网络会话并发总数。"
  },
  {
    slug: "apple-tv-stash-proxy-setup",
    title: "Apple TV电视盒子Stash代理配置：打造家庭影院4K无损串流",
    primary: "Apple TV代理教程",
    supporting: ["tvOS科学上网", "Apple TV Stash配置", "电视盒子4K流媒体"],
    q1: "在Apple TV（tvOS 17及以上）系统上，如何通过App Store下载并安装Stash？",
    a1: "在Apple TV设置中登录已购买过Stash的外区Apple ID，进入tvOS App Store搜索‘Stash’直接一键安装；由于支持iCloud同步，手机端Stash配置好的所有订阅与规则会自动同步至电视端。",
    q2: "在客厅大屏使用Apple TV观看奈飞与YouTube时，如何用遥控器快速切换节点？",
    a2: "打开tvOS版Stash应用，使用Siri Remote遥控器触控板滑动即可直观浏览全区节点列表，点击任意节点即刻生效，无需频繁跑到电脑前修改软路由或复杂的网关参数。"
  },
  {
    slug: "android-tv-box-proxy-tutorial",
    title: "安卓外贸电视盒子代理配置指南：v2rayNG与Clash遥控器适配",
    primary: "电视盒子机场配置",
    supporting: ["Android TV科学上网", "小米盒子海外流媒体", "遥控器适配教程"],
    q1: "很多为手机设计的代理客户端APK安装到外贸电视盒子后，遥控器光标无法移动怎么办？",
    a1: "这是因为手机App缺乏Android TV专用的遥控器D-Pad焦点导航事件。解决方法是在盒子上安装专门为电视适配的Clash for Android TV专用版，或连接一个USB无线鼠标临时辅助点击导入订阅。",
    q2: "如何让电视盒子开机后自动后台启动代理，避免每次看电视都要手动开软件？",
    a2: "进入客户端设置菜单，开启‘开机自动启动（Auto Start on Boot）’以及‘始终开启VPN（Always-on VPN）’选项；只要电视通电开机，后台即自动完成握手建立安全加速隧道。"
  },
  {
    slug: "linux-ubuntu-clash-command-line",
    title: "Linux Ubuntu/Debian无头服务器Clash配置：命令行守护进程实战",
    primary: "Linux Clash配置",
    supporting: ["Ubuntu科学上网", "Systemd守护进程", "服务器终端代理"],
    q1: "在没有图形界面的Ubuntu Linux服务器上，如何使用Systemd将Clash配置为系统自启服务？",
    a1: "在/etc/systemd/system/创建clash.service单元文件，编写ExecStart=/usr/local/bin/clash -d /etc/clash，执行systemctl daemon-reload与systemctl enable --now clash即可实现开机自启。",
    q2: "在Linux云服务器中，如何让curl、wget与apt-get软件源更新自动走本地Clash代理？",
    a2: "在~/.bashrc末尾添加全局环境变量：export http_proxy=http://127.0.0.1:7890与export https_proxy=http://127.0.0.1:7890，执行source ~/.bashrc生效后所有终端网络请求即自动加速。"
  },
  {
    slug: "docker-clash-core-deployment",
    title: "Docker容器化部署Clash Core与WebUI：打造局域网通用代理网关",
    primary: "Docker部署Clash",
    supporting: ["容器化科学上网", "Docker Compose网关", "Yacd WebUI面板"],
    q1: "使用Docker容器化部署Clash Core相比直接安装在宿主机上，具有哪些核心运维优势？",
    a1: "环境完全容器隔离，不会污染宿主机的系统动态依赖库；升级或更换内核只需修改docker-compose.yml镜像版本标签，单条命令即可完成一键极速回滚与跨物理机无缝迁移。",
    q2: "如何在Docker中挂载Yacd或Metacubexd可视化前端面板，以便局域网随时远程管理？",
    a2: "在docker-compose中暴露9090端口（Clash外部控制器端口），并在同一网桥网络中拉起ghcr.io/metacubex/metacubexd容器，在任何电脑浏览器中输入宿主机IP:9090即可图形化调控节点。"
  }
];
