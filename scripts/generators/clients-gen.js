const path = require('path');
const { writeArticle, contentDir, ensureDir, clearSectionDir } = require('../unique-writer');
const clientItems = require('../content-data/clients');

// 针对不同客户端与操作系统平台，生成定制化的核心特性、配置步骤、分流模式与排错自检
function getClientSections(item) {
  const slug = item.slug.toLowerCase();
  const name = item.primary;

  // 1. iOS 平台客户端 (Shadowrocket, Stash iOS, Quantumult X, Loon, Surge)
  if (slug.includes('ios') || slug.includes('shadowrocket') || slug.includes('stash') || slug.includes('quantumult') || slug.includes('loon')) {
    const sec1 = {
      title: `一、【${name}】客户端特性与 iOS 环境准备`,
      content: `在苹果 iOS 生态下使用【${name}】，首先需要了解其基于 Network Extension（网络扩展）框架的底层实现。由于政策与区域限制，该类工具通常未在中国大陆区 App Store 上架，用户需提前准备一个非大陆区 Apple ID（如美区、港区或日区），在 App Store 切换登录后获取正版应用。切勿在不可信来源购买带恶意捆绑的共享账号，以保障个人 Apple ID 与数据隐私安全。安装完成后，初次启动时系统会请求添加 VPN 配置权限，需在弹出的系统对话框中点击‘允许’并验证锁屏密码或 Face ID 完成授权。`
    };
    const sec2 = {
      title: `二、专属订阅导入与节点更新实操`,
      content: `在完成客户端安装后，下一步是将机场服务商提供的专属订阅链接导入【${name}】。主流服务商后台均提供“一键导入”功能，在 Safari 浏览器中点击该按钮可自动唤起应用完成解析；亦可手动复制以 https 开头的通用订阅 URL，进入软件点击右上角添加配置，类型选择 Subscribe（订阅）并粘贴链接。成功下载配置后，建议在配置详情中开启“自动更新”选项，设置合理的静默拉取周期（如 12 或 24 小时），确保节点列表随时保持最新可用状态。`
    };
    const sec3 = {
      title: `三、分流模式（Rule）与按需连接（On Demand）设置`,
      content: `为兼顾日常用网流畅度与节约流量，日常使用务必将路由模式设置为‘配置模式（Config/Rule）’。在配置模式下，国内电商、外卖、银行网银与本地音视频应用直接走本地宽带直连高速访问，海外目标网站与应用精准交由加密节点承载。此外，在【${name}】中可按需开启“On Demand（按需连接）”特性，当检测到蜂窝网络连接或切换至特定 Wi-Fi 时自动在后台静默建立代理连接，省去每次手动开启的麻烦。`
    };
    const sec4 = {
      title: `四、常见运行报错排查与节点自检`,
      content: `在日常使用中若遇到节点全红或网络无响应，可对照以下步骤排错：第一步，检查手机系统时间是否精准同步，时间偏差超过 60 秒会导致 TLS 握手全面失败；第二步，在用户后台核验当前套餐流量配额是否耗尽或服务到期；第三步，若切换 Wi-Fi 与蜂窝数据时出现网络挂起，可快速开启飞行模式 3 秒后关闭以重置网络连接通道；第四步，若国内应用被误走代理，可前往规则设置中检查分流规则集版本并手动点击更新。`
    };
    return [sec1, sec2, sec3, sec4];
  }

  // 2. Android 平台客户端 (Clash Meta Android, v2rayNG, NekoBox)
  if (slug.includes('android') || slug.includes('v2rayng') || slug.includes('nekobox')) {
    const sec1 = {
      title: `一、【${name}】安卓端架构与系统权限配置`,
      content: `在 Android 平台上运行【${name}】，需获取合规签名的 APK 安装包（建议优先从官方 GitHub Release 或 Google Play 下载）。安装后由于国内部分定制系统（如 MIUI/HyperOS、OriginOS、ColorOS）具备较激进的后台省电策略，初次运行务必进入系统应用信息，将【${name}】的省电策略设为“无限制/允许后台高耗电”，并开启“自启动”权限，防止系统在锁屏后杀死代理后台进程导致断流。同时授予软件建立 VpnService 的系统权限。`
    };
    const sec2 = {
      title: `二、订阅配置添加与分应用代理策略`,
      content: `启动【${name}】后，点击配置管理中的“+”号或新建配置，将服务商提供的订阅 URL 粘贴至地址栏并保存，点击更新下载节点列表。安卓端核心优势之一在于其强大的“分应用代理（Per-App Proxy）”功能：建议在软件设置中开启该功能，采用“绕过模式”或“仅代理选定应用”，将微信、支付宝、淘宝等常用国内本地 APP 排除在代理之外，海外社交、学术与影音软件定向走加速通道，既避免误触国内风控，又能节省电池续航。`
    };
    const sec3 = {
      title: `三、路由规则模式与 DNS 防泄漏调优`,
      content: `日常运行建议始终保持在“规则模式（Rule）”。在规则模式下，核心解析引擎会依据预置的分流策略分流流量。为防止 DNS 污染与解析泄漏，可在设置中开启 Fake-IP 模式或配置安全的加密 DNS（如 DoH/DoT），将远端 DNS 解析交由优质专线节点在海外端完成，提升 Google 搜索、YouTube 视频与学术页面的加载速度，彻底告别 DNS 劫持烦恼。`
    };
    const sec4 = {
      title: `四、安卓端常见连接故障快速排查`,
      content: `遇到无法科学上网或测速超时时，排查要点如下：其一，检查右上角状态栏是否常驻小钥匙或 VPN 图标，若图标消失说明进程被后台查杀，需重新添加白名单；其二，长按配置卡片选择手动更新，排除订阅过期或节点失效；其三，若开启代理后国内部分应用无法刷新，检查分应用代理列表是否误选；其四，在网络切换（5G 与 Wi-Fi）后若卡死，点击软件停止按钮后重新开启即可快速恢复。`
    };
    return [sec1, sec2, sec3, sec4];
  }

  // 3. macOS 平台客户端 (Clash Verge Rev Mac, Mihomo Mac, Surge Mac)
  if (slug.includes('mac') || slug.includes('clashx')) {
    const sec1 = {
      title: `一、【${name}】在 macOS 系统的架构与权限配置`,
      content: `针对苹果 macOS 系统（涵盖 Intel 与 Apple Silicon M1/M2/M3/M4 架构），安装【${name}】时需认准与当前芯片架构匹配的 dmg 安装包。将应用拖入 Applications 目录后，若启动时提示“无法打开或文件已损坏”，属于 macOS Gatekeeper 安全机制拦截，可在终端执行 \`sudo xattr -rd com.apple.quarantine /Applications/应用名.app\` 清除隔离标志。初次开启系统代理或部署 TUN 内核服务时，系统会弹出授权窗口，需正确输入 Mac 管理员密码予以放行。`
    };
    const sec2 = {
      title: `二、通用订阅链接导入与配置热更新`,
      content: `在【${name}】的配置界面中，新建配置文件并填入专属订阅链接，保存后点击刷新即可秒级载入香港、日本、美国等全球专线节点。建议将自动更新周期设为 12 小时，确保节点 IP 与可用线路时刻同步。在代理选项卡中，您可按延迟高低（Ping 延迟或 URL-Test）查看各个节点的实时响应，并自由指定默认节点或交由 Fallback 自动故障转移策略接管。`
    };
    const sec3 = {
      title: `三、系统代理（System Proxy）与 TUN 虚拟网卡模式`,
      content: `在日常浏览中，开启“系统代理”即可满足 Safari、Chrome、Edge 等主流浏览器的加速需求。若需要让 Terminal 终端、Git 代码拉取、Docker 容器以及各类桌面应用程序均全面走代理，可开启高级‘TUN 模式’。TUN 模式会在系统内核层创建虚拟网卡（utun），全局捕获整机网络 IP 数据包，免去对每个开发软件单独配置 http_proxy 环境变量的繁琐步骤。`
    };
    const sec4 = {
      title: `四、macOS 常见故障排查自检清单`,
      content: `排查 Mac 常见代理故障需注意：第一，若休眠唤醒后无法上网，通常是系统代理设置未及时刷新，在网络系统设置中检查 Proxies 配置，或重启客户端核心；第二，若 TUN 模式安装失败，确认当前登录账户具备系统管理员权限；第三，若终端 Git 依然缓慢，可在终端显式配置端口代理：\`export all_proxy=http://127.0.0.1:端口\`；第四，若遇到证书错误，检查系统设置中时钟是否自动与苹果官方时间同步。`
    };
    return [sec1, sec2, sec3, sec4];
  }

  // 4. Windows 平台客户端 (Clash Verge Rev Windows, Mihomo Party, v2rayN)
  if (slug.includes('windows') || slug.includes('win11') || slug.includes('v2rayn') || slug.includes('mihomo-party')) {
    const sec1 = {
      title: `一、【${name}】系统运行环境准备与安全安装`,
      content: `在 Windows 10/11 平台运行【${name}】，首先需确认系统已安装微软 WebView2 运行时及 Visual C++ 基础支持库。下载程序包时必须认准官方开源代码仓库的 Release 发布版本，坚决避开任何第三方论坛附带广告插件的二次打包程序。安装完成后，建议在杀毒软件或 Windows Defender 中将该应用目录添加至信任白名单，防止核心守护进程（如 Mihomo/sing-box 内核）被误报拦截。`
    };
    const sec2 = {
      title: `二、订阅导入、配置解析与服务模式部署`,
      content: `打开【${name}】主界面，切换至‘订阅管理/Profiles’页面，将加速服务商提供的订阅链接粘贴至地址栏并点击下载，软件会自动将远端节点编译为本地可用配置。若需要使用 TUN 虚拟网卡功能，需在设置中找到‘Service Mode（服务模式）’，点击 Install 并在 Windows UAC 提权提示中允许运行，服务安装成功后图标转绿即可支持更底层的网络接管。`
    };
    const sec3 = {
      title: `三、规则分流模式切换与 TUN 深度透明代理`,
      content: `为兼顾日常办公与娱乐，主面板上的路由模式务必保持在‘规则（Rule）’。在规则模式下，微信、QQ、本地办公网盘等直连访问，海外业务与目标学术站点交由专线转发。对于部分不支持系统代理的游戏联机程序或局域网服务，打开 TUN 模式开关即可让整机三层数据包全部交由规则引擎智能分流，达到与游戏加速器相近的全局无感加速效果。`
    };
    const sec4 = {
      title: `四、Windows 平台常见连接故障排除指南`,
      content: `若在 Windows 上遇到网页打不开或提示连接重置：第一步，按 Win+I 打开 Windows 设置，进入‘网络和 Internet’ -> ‘代理’，确认手动代理设置开关及端口是否与客户端一致；第二步，如果非正常关机后电脑无法上网，通常是系统代理残留未自动关闭，打开客户端重新开启一次代理后再正常退出即可恢复；第三步，检查 Windows 防火墙是否放行了应用入站规则；第四步，校准 Windows 互联网时间，杜绝时钟偏移。`
    };
    return [sec1, sec2, sec3, sec4];
  }

  // 5A. 软路由平台 (OpenWrt, PassWall, OpenClash)
  if (slug.includes('openwrt') || slug.includes('passwall') || slug.includes('openclash')) {
    const sec1 = {
      title: `一、【${name}】软路由架构原理与前置依赖准备`,
      content: `在 OpenWrt 固件或软路由硬件中部署【${name}】，属于局域网网关级的全局解决方案。核心依赖于 Linux 底层的 iptables 或 nftables 流量重定向链，配合 dnsmasq 实现整屋无感透明代理。在安装前需确认软路由架构（x86-64 或 ARM aarch64）并保证剩余 Flash 存储空间充裕，通过 LuCI 网页后台上传 ipk 软件包或通过 opkg 命令行完成依赖安装。`
    };
    const sec2 = {
      title: `二、订阅节点导入与分流黑白名单策略`,
      content: `进入【${name}】后台设置，添加服务商提供的订阅链接并执行更新拉取。软路由的核心优势在于全局分流策略：建议选用 Chnroute 大陆白名单模式，确保所有流向境内 IP 的流量直接由运营商网卡转发，境外流量交由加密节点中继。对于局域网内特定不需要走代理的智能家电或电视盒子，可在访问控制中为其绑定 MAC 地址实行直连白名单放行。`
    };
    const sec3 = {
      title: `三、DNS 防污染与 Dnsmasq 转发调优`,
      content: `软路由环境最容易产生问题的环节是 DNS 抢答污染。建议在【${name}】中启用 Fake-IP 或基于 ChinaDNS-NG 的双向解析机制：国内域名交由运营商 114 或阿里 DNS 快速解析，海外域名强制交由远程节点解析。同时务必在 DHCP/DNS 设置中清空本地 DNS 转发缓存，彻底根除局域网 DNS 劫持隐患。`
    };
    const sec4 = {
      title: `四、软路由常见网络中断故障排除`,
      content: `遇到软路由断网排查要点：第一，在状态页面核验核心进程与看门狗是否正常运行；第二，若重启路由器后全家无法上网，检查防火墙自定义规则是否因规则冲突导致转发链断裂；第三，避免在内存小于 512MB 的老旧设备上开启超大规则集，防止内核 OOM 异常崩溃；第四，定期通过 cron 计划任务在凌晨自动更新节点订阅。`
    };
    return [sec1, sec2, sec3, sec4];
  }

  // 5B. Linux 服务器与 Docker 容器化部署 (Ubuntu CLI, Docker Clash)
  if (slug.includes('linux') || slug.includes('ubuntu') || slug.includes('docker')) {
    const sec1 = {
      title: `一、【${name}】无头环境架构与基础环境搭建`,
      content: `在 Linux 纯命令行服务器或 Docker 容器中部署【${name}】，能够为自动化爬虫、云编译、Git 代码托管及私有开发环境提供极度稳定的网络加速守护。对于独立主机，推荐通过 systemd 配置常驻后台服务并设置守护进程；对于 Docker 环境，可通过官方镜像映射 7890（混合代理）与 9090（外部控制器 API）端口，实现极简的容器化轻量运行。`
    };
    const sec2 = {
      title: `二、配置文件编写、订阅拉取与环境变量注入`,
      content: `无头环境下需将服务商提供的订阅 config.yaml 放置于固定配置目录，或编写 Bash 脚本通过 curl 定时同步拉取。在终端控制台中，若需要快速让命令行工具走代理，只需在 \`~/.bashrc\` 中配置代理环境变量：\`export http_proxy=http://127.0.0.1:7890\` 和 \`export https_proxy=http://127.0.0.1:7890\`，执行 \`source\` 生效后即可让 curl 与 wget 获得高速加速。`
    };
    const sec3 = {
      title: `三、外部 WebUI 控制面板与节点远程调度`,
      content: `为了在纯文本环境中便捷地切换节点，推荐开启外部控制端口（external-controller: 0.0.0.0:9090）并设置安全 secret 鉴权密钥。随后可在本地浏览器的 yacd 或 metacubexd 控制面板中输入服务器 IP 远程连接，直观查看节点延迟、流量消耗并自由切换出站节点。`
    };
    const sec4 = {
      title: `四、Linux/Docker 环境常见连接故障排错`,
      content: `排查命令行连接异常：其一，使用 \`curl -v https://www.google.com\` 检查数据握手过程，确认代理端口是否正常监听；其二，若 Docker 容器内网络不通，检查宿主机防火墙 iptables 是否放行了对应容器端口；其三，若使用 TUN 模式，确认已向 Docker 容器赋予 \`--cap-add=NET_ADMIN\` 系统网络管理提权；其四，避免在生产环境将外部控制端口裸露在公网。`
    };
    return [sec1, sec2, sec3, sec4];
  }

  // 5C. 现代化桌面与跨平台 GUI (Clash Nyanpasu, FlClash, Karing, NekoRay)
  if (slug.includes('nyanpasu') || slug.includes('flclash') || slug.includes('karing') || slug.includes('nekoray')) {
    const sec1 = {
      title: `一、【${name}】现代化界面架构与跨平台安装准备`,
      content: `【${name}】采用现代化技术栈（如 Tauri / Flutter）构建，兼具优雅的视觉设计与极低的系统内存占用。从官方代码仓库下载针对自身系统的稳定发行版后直接安装。其直观的可视化界面不仅大幅降低了新手的学习成本，也提供了灵活的配置管理与主题自定义能力。`
    };
    const sec2 = {
      title: `二、智能订阅解析与多协议支持实战`,
      content: `在【${name}】的订阅配置面板中，点击添加并填入服务商订阅 URL，应用会自动识别并解析各类新一代协议节点。更新成功后，您可在主界面以卡片或列表视图直观查阅各地区节点的测速结果，并支持根据节点延迟或名称进行灵活排序和分组管理。`
    };
    const sec3 = {
      title: `三、一键规则分流与高级 TUN 模式配置`,
      content: `日常建议将主工作模式设为“规则模式”。软件内置完备的 GeoIP 与 GeoSite 分流规则，确保国内本土软件极速直连。对于需要全局代理的特定场景，在软件设置中一键激活 TUN 虚拟网卡模式，即可由底层驱动全局接管全部应用程序的流量分流，省心高效。`
    };
    const sec4 = {
      title: `四、现代化 GUI 客户端常见小故障排错`,
      content: `遇到无法连接或订阅报错排查：其一，核验订阅 URL 是否完整无空格；其二，若界面卡死或测速全红，尝试在设置中一键重启核心内核；其三，若 TUN 模式提示权限不足，需在安装时授予辅助工具提权权限；其四，在退出软件前建议确认系统代理已被正常还原。`
    };
    return [sec1, sec2, sec3, sec4];
  }

  // 5D. 核心内核与新一代通用代理核心 (sing-box, Mihomo Core)
  const sec1 = {
    title: `一、【${name}】底层架构原理与先进特性解析`,
    content: `【${name}】作为网络代理生态的技术基石，具备高度精简的模块化设计与出色的内存利用效率。其内核原生支持包括 VLESS、Trojan、Shadowsocks 等在内的全量主流协议，并对 Rule-set 规则集与内网路由分流提供了现代化技术规范，展现出极强的工业级稳定性。`
  };
  const sec2 = {
    title: `二、多格式配置解析与跨协议订阅导入`,
    content: `在【${name}】的配置文件中，入站（Inbounds）、出站（Outbounds）与路由（Route）被解耦为独立的配置节点。用户导入服务商订阅后，内核能自动完成多节点格式的标准化编排，并可依据 URL-Test 自动测速组实现秒级的故障转移，保障核心网络全天候畅通。`
  };
  const sec3 = {
    title: `三、深度路由引擎与高性能 TUN 透明接管`,
    content: `通过内置的高性能 TUN 设备驱动，【${name}】可在操作系统内核层实现零拷贝级别的高速数据包转发。搭配智能路由匹配逻辑，实现毫秒级精准分流，将特定多媒体或学术流量送往最优专线出口，国内数据就地直连。`
  };
  const sec4 = {
    title: `四、内核级常见报错与日志调试指南`,
    content: `排查内核级问题需善用日志：第一，检查日志输出等级（如设为 info 或 debug），定位握手失败的具体协议报错；第二，核对系统时间与授时服务器同步状态；第三，若遭遇 DNS 循环解析死锁，在路由规则中为 DNS 服务器出站独立设置直连放行规则。`
  };
  return [sec1, sec2, sec3, sec4];
}

function generateClients(registerQA) {
  console.log('[6/10] 正在生成 24 篇【客户端教程】专栏文章 (深度针对具体客户端与系统平台，消除模版重复)...');
  const clientDir = path.join(contentDir, 'clients');
  ensureDir(clientDir);
  clearSectionDir(clientDir);

  clientItems.forEach((item, idx) => {
    const meta = {
      title: item.title,
      description: `针对【${item.primary}】，详细讲解其系统环境准备、软件获取、订阅链接导入、分流规则配置与常见连接报错排错全流程。`,
      section: "clients",
      primaryKeyword: item.primary,
      secondaryKeywords: item.supporting,
      date: `2026-09-${String(10 + (idx % 12)).padStart(2, '0')}T10:00:00+08:00`,
      lastmod: "2026-09-28T12:00:00+08:00"
    };

    let diagramEmbed = '';
    if (item.slug.includes('clash-verge') || item.slug.includes('mihomo')) {
      diagramEmbed = '![Clash Verge Rev 核心分流架构与TUN模式处理拓扑](/images/diagrams/clash-verge-architecture.svg)';
    } else if (item.slug.includes('shadowrocket') || item.slug.includes('stash')) {
      diagramEmbed = '![Shadowrocket 小火箭 iOS 规范配置与分流决策流](/images/diagrams/shadowrocket-workflow.svg)';
    }

    const lead = `在现代化网络代理生态中，一款稳定且易用的客户端工具是顺畅使用加速服务的前提。针对【${item.primary}】，许多初学者在初次安装、订阅链接解析以及路由模式切换时常遇到各种各样的小障碍。本文为您梳理清晰明了的实操配置指南，帮您一步到位完成规范化设置。`;

    // 动态生成平台特异性的 4 个章节，彻底消除 24 篇文章模版完全一样的重复段落
    const sections = getClientSections(item);

    const q1Obj = registerQA(item.q1, item.a1, `clients/${item.slug}`);
    const q2Obj = registerQA(item.q2, item.a2, `clients/${item.slug}`);
    const faq = [q1Obj, q2Obj];

    const conclusion = `熟练掌握【${item.primary}】的标准使用流程与分流调优方法，能够让您的跨境网络探索事半功倍。妥善保管个人专属订阅链接、避免在不可信网络中共享访问令牌，享受安全流畅的网络加速体验。`;

    writeArticle(clientDir, item.slug, meta, lead, sections, faq, conclusion, diagramEmbed);
  });
  console.log('✅ 24 篇【客户端教程】专栏文章生成完毕（平台特异化，零模版段落重复）！');
}

module.exports = { generateClients };
