/* Bella Chen Portfolio — shared data, rendering and EN/中文 switch for index.html and case-studies.html. */
(function () {
  'use strict';

  var LANG_KEY = 'bella-portfolio-language';

  // ---- Case studies (single source for both pages) ---------------------------------
  var CASES = [
    { id: 'dnd', area: 'fintech', featured: true,
      title: ['Drag & Drop Pending Orders', '拖曳式掛單'],
      category: ['Trading Platforms', '交易平台'], company: ['ACY Securities', 'ACY Securities'],
      summary: ['Create and adjust pending orders directly on the chart, with clear price feedback and a deliberate confirmation step.', '直接在圖表上建立與調整掛單，提供清楚的價格回饋與明確的確認步驟。'],
      tags: ['Chart Trading', 'Pending Orders', 'Trading UX'],
      img: 'trading/assets/prototype-preview.svg', link: 'trading/case-study.html',
      ai: ['AI prototype · Claude', 'AI 原型 · Claude'], cta: ['Read case study', '閱讀案例'] },
    { id: 'permission', area: 'enterprise', featured: true,
      title: ['Enterprise Permission Studio', '企業權限管理系統'],
      category: ['Enterprise Systems', '企業系統'], company: ['ACY Securities', 'ACY Securities'],
      summary: ['Role templates, role-based access control, permission matrices, and operational governance.', '角色範本、角色權限控管（RBAC）、權限矩陣與後台營運治理。'],
      tags: ['RBAC', 'Permissions', 'Back Office'],
      img: 'permission/assets/managers-preview.svg', link: 'permission/case-study.html',
      ai: ['AI demo · ChatGPT', 'AI Demo · ChatGPT'], cta: ['Read case study', '閱讀案例'] },
    { id: 'fix', area: 'fintech', featured: true,
      title: ['FIX API Management', 'FIX API 管理'],
      category: ['Connectivity', '連線與介接'], company: ['ACY Securities', 'ACY Securities'],
      summary: ['Management flows for API keys, linked accounts, IP access, permissions, and connection status.', 'API Key、綁定帳戶、IP 存取、權限與連線狀態的管理流程。'],
      tags: ['FIX API', 'Access', 'Connectivity'],
      points: [['API access lifecycle', 'Account binding and IP restrictions', 'Status visibility and operational workflows'], ['API 存取的生命週期', '帳戶綁定與 IP 限制', '狀態可視化與營運流程']] },
    { id: 'app', area: 'fintech',
      title: ['Global Trading App', '全球化交易 App'],
      category: ['Mobile FinTech', '行動金融'], company: ['ACY Securities', 'ACY Securities'],
      summary: ['Native UX restructuring, KYC flows, localization, and global mobile trading features.', '原生 App 體驗重構、KYC 流程、在地化與全球行動交易功能。'],
      tags: ['Native App', 'KYC', 'RTL'],
      points: [['Native KYC user journey', 'Localization and right-to-left UX', 'Cross-functional release process'], ['原生 KYC 使用者流程', '在地化與右至左（RTL）介面', '跨團隊上線流程']] },
    { id: 'aichart', area: 'fintech',
      title: ['AI Chart — Chart Analysis Concept', 'AI Chart — 圖表分析概念原型'],
      category: ['AI Prototype', 'AI 原型'], company: ['Independent', '個人專案'],
      summary: ['De-branded reconstruction of an AI chart-analysis prototype I built with AI-assisted coding, on simulated data.', '以 AI 輔助開發打造的 AI 圖表分析原型，去品牌化後以模擬資料重建。'],
      tags: ['AI Prototype', 'Chart', 'Concept'],
      img: 'ai-chart-lens/assets/preview.svg', link: 'ai-chart-lens/prototype.html',
      ai: ['AI prototype · Claude', 'AI 原型 · Claude'], cta: ['View prototype', '查看原型'] },
    { id: 'groups', area: 'consumer', featured: true,
      title: ['Groups — From 0 to 1', 'Groups 從 0 到 1'],
      category: ['Community Platform', '社群平台'], company: ['Gamania / beanfun!', '遊戲橘子 / beanfun!'],
      summary: ['End-to-end planning and delivery of a new Groups feature for a gaming and community ecosystem.', '為遊戲與社群生態系，從零規劃並推出 Groups 群組功能。'],
      tags: ['0→1', 'Community', 'Engagement'],
      points: [['Discovery and feature scope', 'Group participation and member journeys', 'Delivery approach and outcome measurement'], ['需求探索與功能範圍', '群組參與與成員旅程', '交付方式與成效衡量']] },
    { id: 'credit', area: 'consumer',
      title: ['Credit Card Reward Calculator', '信用卡回饋計算器'],
      category: ['Financial Data', '金融資料'], company: ['invosdata', 'invosdata'],
      summary: ['Reward calculation logic and integration of credit-card offer information into a consumer-facing tool.', '回饋計算邏輯，並將信用卡優惠資訊整合進消費者工具。'],
      tags: ['Calculation Logic', 'FinTech', 'Data'],
      points: [['Calculation rules and edge cases', 'Financial data structure and updates', 'User-facing comparison experience'], ['計算規則與邊界情境', '金融資料結構與更新', '面向使用者的比較體驗']] },
    { id: 'crm', area: 'enterprise',
      title: ['Merchant CRM Platform', '商家 CRM 平台'],
      category: ['B2B Data Product', 'B2B 資料產品'], company: ['invosdata', 'invosdata'],
      summary: ['Cloud CRM planning using invoice-derived data to support merchant insights and targeted marketing.', '運用發票資料規劃雲端 CRM，支援商家洞察與精準行銷。'],
      tags: ['CRM', 'B2B SaaS', 'Analytics'],
      points: [['Merchant user needs and workflows', 'Data-driven segmentation concepts', 'Operational CRM experience'], ['商家使用者需求與流程', '數據驅動的分眾概念', 'CRM 營運體驗']] }
  ];

  var FILTERS = [
    { id: 'all', label: ['All', '全部'], test: function () { return true; } },
    { id: 'fintech', label: ['Trading & FinTech', '交易與金融科技'], test: function (c) { return c.area === 'fintech'; } },
    { id: 'enterprise', label: ['Enterprise & Data', '企業與資料'], test: function (c) { return c.area === 'enterprise'; } },
    { id: 'consumer', label: ['Consumer', '消費性產品'], test: function (c) { return c.area === 'consumer'; } },
    { id: 'ai', label: ['Built with AI', '用 AI 打造'], test: function (c) { return !!c.ai; } }
  ];

  // ---- Static text dictionary (English → 繁體中文) ------------------------------------
  var ZH = {
    'Case studies': '案例研究', 'Writing': '文章', 'Capabilities': '能力地圖', 'Experience': '工作經歷', 'Lab': '實驗室', 'Home': '首頁',
    'Systems Product Manager · FinTech & Platforms': '系統型產品經理 · 金融科技與平台',
    'Making complex systems': '讓複雜的系統', 'feel simple.': '變得簡單。',
    'Trading platforms': '交易平台', 'FIX API & connectivity': 'FIX API 與連線介接', 'Permissions / RBAC': '權限管理 / RBAC', 'AI-built prototypes': '用 AI 打造的原型',
    "Hi, I'm Bella. 10+ years across trading systems, API management, financial data and global mobile apps — turning complex requirements into clear, scalable products.": '你好，我是 Bella。十年以上橫跨交易系統、API 管理、金融資料與全球化行動 App 的產品經驗，擅長把複雜需求轉化為清晰、可擴展的產品。',
    'years in product': '年產品經驗', 'domains — FinTech, Enterprise, Consumer, Data': '大領域：金融科技、企業、消費性產品、資料',
    'product case studies': '個產品案例', 'prototypes built with AI': '個用 AI 打造的原型',
    'Featured case studies': '精選案例', 'What I shipped, and why it mattered.': '我做了什麼，以及它為什麼重要。',
    'All case studies (8) →': '全部案例（8）→',
    'Product thinking': '產品思考', 'Decisions behind the systems.': '系統背後的設計決策。',
    'PUBLISHED': '已發布', 'COMING SOON': '即將推出',
    'Designing a Reliable Symbol Management System': '如何設計可靠的 Symbol Management 系統',
    'From symbol lifecycle and trading restrictions to reliable state synchronization across the trading platform.': '從商品生命週期、交易限制，到交易平台的狀態一致性。',
    'How I use AI across the product workflow': '我如何在產品工作流程中運用 AI',
    'Where AI helps, what I never hand over, and how I keep data safe.': 'AI 在哪些環節幫上忙、哪些決定我從不交出去，以及我如何守住資料安全。',
    'Expertise & capability map': '專長與能力地圖', 'Three areas, eighteen capabilities.': '三大領域，十八項能力。',
    'Trading & FinTech': '交易系統與金融科技', 'Enterprise Platforms': '企業級平台', 'Consumer & Data Products': '消費性產品與資料應用',
    'Trading platforms, order flows, FIX API governance and financial operations.': '交易平台、訂單流程、FIX API 管理與金融營運。',
    'Permissions, administration tools, back-office workflows and business rules.': '權限管理、管理工具、後台流程與商業規則。',
    'Mobile experiences, community platforms and analytics-driven features.': '行動體驗、社群平台與數據驅動的功能。',
    'Trading systems': '交易系統', 'API & integrations': 'API 與整合', 'Enterprise & back office': '企業後台', 'Data & analytics': '資料與分析', 'Mobile & UX': '行動產品與體驗', 'Growth & engagement': '成長與互動',
    'Trading configuration': '交易設定', 'Trading account management': '交易帳戶管理', 'Chart trading & order entry': '圖表交易與下單', 'Copy trading': '跟單交易',
    'FIX API management': 'FIX API 管理', 'Permission / RBAC': '權限管理 / RBAC', 'User management': '使用者管理', 'Funds & billing operations': '出入金與帳務',
    'Content operations & moderation': '內容營運與審核', 'Trading reports': '交易報表', 'Trading performance analytics': '交易績效分析', 'Merchant CRM': '商家 CRM',
    'Native trading app': '原生交易 App', 'KYC & identity flows': 'KYC 與身分驗證流程', 'RTL & localization': 'RTL 與在地化',
    'Community features 0→1': '社群功能 0→1', 'Gamification': '遊戲化設計', 'Card comparison & reward logic': '信用卡比較與回饋邏輯',
    'Oct 2024 — Oct 2026': '2024 年 10 月 — 2026 年 10 月', 'Jul 2023 — Jul 2024': '2023 年 7 月 — 2024 年 7 月', 'Mar 2021 — Mar 2023': '2021 年 3 月 — 2023 年 3 月', 'Nov 2015 — Feb 2021': '2015 年 11 月 — 2021 年 2 月',
    'Cross-Industry Projects & Independent Work': '跨產業專案與獨立工作', 'Gamania Digital Entertainment / beanfun!': '遊戲橘子 / beanfun!',
    'Trading Systems & Digital Products — CFD trading platforms, back-office trading configurations, permission management, native trading apps, copy trading, and institutional FIX API workflows.': '交易系統與數位產品：CFD 交易平台、後台交易設定、權限管理、原生交易 App、跟單交易與機構客戶 FIX API 管理流程。',
    'Independent digital projects across SEO, marketing, branding, website and membership system planning, workshops, and community initiatives.': '參與 SEO、數位行銷、品牌規劃、網站與會員系統設計，以及工作坊與社群活動等跨產業數位專案。',
    'Registration and login redesign, community voting and Groups, creator publishing tools, and content moderation workflows.': '註冊登入體驗重構、社群投票與 Groups、創作者發布工具及內容審核流程。',
    'Consumer financial-data products, invoice management, credit-card comparison and rewards, gamification, and merchant CRM workflows.': '消費金融與資料產品、發票管理、信用卡比較與回饋計算、遊戲化互動及商家 CRM 流程。',
    'Small things I build with AI.': '我用 AI 做的小東西。',
    'Side projects outside my day job — designed, built and shipped end-to-end.': '工作之外的個人專案，從設計、開發到上線都自己完成。',
    'Bilingual tech-workplace bingo, live on the web.': '中英雙語的科技職場賓果，已上線可玩。', 'Play it ↗': '來玩 ↗',
    'Story Writer skill': 'Story Writer 技能', 'Claude skill: brief → dev-ready Jira stories.': 'Claude 技能：把需求簡述轉成可開發的 Jira Story。', 'View on GitHub ↗': '在 GitHub 查看 ↗',
    'This portfolio': '這個作品集網站', 'Bilingual site built with AI, iterated in public.': '用 AI 打造的雙語網站，公開持續迭代。', 'Source ↗': '原始碼 ↗',
    "Let's build systems that work better.": '一起打造更好用的系統。',
    'Open to conversations about systems product management, financial technology, and platform products.': '歡迎交流系統型產品管理、金融科技與平台產品相關機會。',
    '© Bella Chen · Designed and built with AI-assisted development': '© Bella Chen · 以 AI 輔助開發設計與建置', 'Source on GitHub ↗': 'GitHub 原始碼 ↗',
    // case-studies.html
    '← Back to home': '← 回到首頁', 'All case studies': '全部案例', 'Eight product stories.': '八個產品故事。',
    'Across three companies and independent work — trading platforms, enterprise systems, consumer and data products.': '橫跨三間公司與個人專案：交易平台、企業系統、消費性與資料產品。',
    'Want the details behind a case?': '想深入了解某個案例？', 'Get in touch →': '聯絡我 →'
  };
  var UI = {
    caseOutline: ['Case outline', '案例大綱'],
    pointsLabel: ['What this case will cover', '案例內容'],
    note: ['Case study outline only. Detailed requirements, decisions and evidence will be added after content review.', '目前為案例大綱，詳細需求、決策與佐證將持續補充。'],
    empty: ['No case studies in this group yet.', '這個分類目前還沒有案例。']
  };

  var lang = 'en';
  var filter = 'all';
  var originals = new WeakMap();
  var page = 'home';
  var priorFocus = null;

  function t(pair) { return pair[lang === 'zh' ? 1 : 0]; }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function $(s) { return document.querySelector(s); }

  var SPARK = '<svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M5 0 C5.4 3.6 6.4 4.6 10 5 C6.4 5.4 5.4 6.4 5 10 C4.6 6.4 3.6 5.4 0 5 C3.6 4.6 4.6 3.6 5 0 Z" fill="currentColor"/></svg>';

  function coverHTML(c) {
    var inner = c.img
      ? '<img src="' + esc(c.img) + '" alt="" loading="lazy">'
      : '<span class="cover-ph"><b>' + esc(t(c.category)) + '</b></span>';
    var badge = c.ai ? '<span class="ai-badge">' + SPARK + esc(t(c.ai)) + '</span>' : '';
    return '<span class="cover">' + inner + badge + '</span>';
  }
  function cta(c) { return c.link ? t(c.cta) : t(UI.caseOutline); }
  function open(c, inner, cls) {
    return c.link
      ? '<a class="' + cls + '" href="' + esc(c.link) + '">' + inner + '</a>'
      : '<button class="' + cls + '" type="button" data-case="' + c.id + '" aria-haspopup="dialog">' + inner + '</button>';
  }

  function renderFeatured() {
    var el = $('#featured'); if (!el) return;
    el.innerHTML = CASES.filter(function (c) { return c.featured; }).map(function (c) {
      return open(c, coverHTML(c) +
        '<span class="case-body"><span class="case-meta">' + esc(t(c.company)) + ' · ' + esc(t(c.category)) + '</span>' +
        '<span class="case-title">' + esc(t(c.title)) + '</span>' +
        '<span class="case-sum">' + esc(t(c.summary)) + '</span>' +
        '<span class="case-go">' + esc(cta(c)) + ' →</span></span>', 'case-card');
    }).join('');
  }

  function renderAll() {
    var grid = $('#allCases'), bar = $('#filters'); if (!grid || !bar) return;
    bar.innerHTML = FILTERS.map(function (f) {
      var on = f.id === filter;
      return '<button type="button" class="filter" data-filter="' + f.id + '" aria-pressed="' + on + '">' + esc(t(f.label)) + ' <span class="n">' + CASES.filter(f.test).length + '</span></button>';
    }).join('');
    var active = FILTERS.filter(function (f) { return f.id === filter; })[0] || FILTERS[0];
    var shown = CASES.filter(active.test);
    grid.innerHTML = shown.length ? shown.map(function (c) {
      return open(c, coverHTML(c) +
        '<span class="case-meta">' + esc(t(c.company)) + ' · ' + esc(t(c.category)) + '</span>' +
        '<span class="case-title">' + esc(t(c.title)) + '</span>' +
        '<span class="case-sum">' + esc(t(c.summary)) + '</span>' +
        '<span class="tags">' + c.tags.map(function (x) { return '<span class="tag">' + esc(x) + '</span>'; }).join('') + '</span>' +
        '<span class="case-go">' + esc(cta(c)) + ' →</span>', 'all-card');
    }).join('') : '<p class="empty">' + esc(t(UI.empty)) + '</p>';
  }

  // ---- Case outline dialog --------------------------------------------------------------
  function openModal(id) {
    var c = CASES.filter(function (x) { return x.id === id; })[0]; if (!c) return;
    priorFocus = document.activeElement;
    $('#modalMeta').textContent = t(c.company) + ' / ' + t(c.category);
    $('#modalTitle').textContent = t(c.title);
    $('#modalSummary').textContent = t(c.summary);
    $('#modalPointsLabel').textContent = t(UI.pointsLabel);
    $('#modalPoints').innerHTML = c.points[lang === 'zh' ? 1 : 0].map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('');
    $('#modalNote').textContent = t(UI.note);
    $('#modal').classList.add('open'); $('#modal').setAttribute('aria-hidden', 'false');
    $('#modalClose').focus();
  }
  function closeModal() {
    $('#modal').classList.remove('open'); $('#modal').setAttribute('aria-hidden', 'true');
    if (priorFocus) priorFocus.focus();
  }

  // ---- Language -----------------------------------------------------------------------
  function translateStatic() {
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT), n, nodes = [];
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(function (node) {
      var p = node.parentElement;
      if (!p || p.closest('script,style,[data-i18n-skip]')) return;
      var orig = originals.has(node) ? originals.get(node) : node.nodeValue;
      originals.set(node, orig);
      var key = orig.trim();
      if (!key) return;
      var out = lang === 'zh' && ZH[key] ? ZH[key] : key;
      node.nodeValue = orig.replace(key, out);
    });
  }
  function setLang(next) {
    lang = next === 'zh' ? 'zh' : 'en';
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
    document.documentElement.lang = lang === 'zh' ? 'zh-Hant' : 'en';
    document.querySelectorAll('[data-site-lang]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.siteLang === lang)); });
    translateStatic();
    renderFeatured(); renderAll();
    if ($('#modal') && $('#modal').classList.contains('open')) closeModal();
  }

  function init(opts) {
    page = (opts && opts.page) || 'home';
    try { lang = localStorage.getItem(LANG_KEY) || 'en'; } catch (e) {}
    document.querySelectorAll('[data-site-lang]').forEach(function (b) { b.addEventListener('click', function () { setLang(b.dataset.siteLang); }); });
    document.addEventListener('click', function (e) {
      var f = e.target.closest('[data-filter]');
      if (f) { filter = f.dataset.filter; renderAll(); return; }
      var c = e.target.closest('[data-case]');
      if (c) { openModal(c.dataset.case); return; }
      if (e.target.id === 'modal' || e.target.closest('#modalClose')) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      var m = $('#modal'); if (!m || !m.classList.contains('open')) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'Tab') { e.preventDefault(); $('#modalClose').focus(); }
    });
    setLang(lang);
  }

  window.Site = { init: init, cases: CASES };
})();
