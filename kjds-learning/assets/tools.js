/* ================== Interactive Learning Tools ================== */

/* ---- 1. 模式适配测试 ---- */
window.initModeQuiz = function(){
  const root = document.getElementById("mode-quiz");
  if(!root) return;
  const questions = [
    {q:"你可投入的启动资金？",opts:[
      {t:"1 万以内",s:{shopee:3,temu:3,tiktok:2,amazon:0,dtc:0}},
      {t:"1–3 万",s:{shopee:2,temu:2,tiktok:3,amazon:1,dtc:1}},
      {t:"3–8 万",s:{shopee:1,temu:1,tiktok:2,amazon:3,dtc:2}},
      {t:"8 万以上",s:{shopee:0,temu:1,tiktok:2,amazon:3,dtc:3}},
    ]},
    {q:"你可投入的时间？",opts:[
      {t:"兼职（每天 2–3h）",s:{shopee:3,temu:3,tiktok:1,amazon:0,dtc:0}},
      {t:"全职（每天 8h+）",s:{shopee:2,temu:2,tiktok:3,amazon:3,dtc:3}},
    ]},
    {q:"你的核心资源是？",opts:[
      {t:"我有工厂/一手货源",s:{shopee:1,temu:3,tiktok:2,amazon:2,dtc:2}},
      {t:"我会做内容/短视频",s:{shopee:1,temu:0,tiktok:3,amazon:1,dtc:3}},
      {t:"我懂精细化运营/数据",s:{shopee:2,temu:1,tiktok:2,amazon:3,dtc:2}},
      {t:"暂时都不擅长",s:{shopee:3,temu:2,tiktok:1,amazon:1,dtc:0}},
    ]},
    {q:"你的目标是？",opts:[
      {t:"快速验证/赚点外快",s:{shopee:3,temu:3,tiktok:2,amazon:1,dtc:0}},
      {t:"当作严肃的创业主业",s:{shopee:1,temu:1,tiktok:2,amazon:3,dtc:2}},
      {t:"做长期品牌",s:{shopee:0,temu:0,tiktok:2,amazon:2,dtc:3}},
    ]},
    {q:"你的英语和跨文化能力？",opts:[
      {t:"英语基本不会",s:{shopee:3,temu:3,tiktok:1,amazon:1,dtc:0}},
      {t:"能看懂能写基本沟通",s:{shopee:2,temu:2,tiktok:2,amazon:3,dtc:2}},
      {t:"英语流利，有海外经验",s:{shopee:1,temu:1,tiktok:2,amazon:2,dtc:3}},
    ]},
  ];
  const modes = {
    shopee:{name:"Shopee 东南亚起步",tag:"低门槛快速上手",desc:"启动资金低、平台流量友好、门槛最低。适合兼职、验证阶段、无海外经验者。缺点是客单价低、利润薄。",href:"platforms.html#shopee"},
    temu:{name:"Temu/SHEIN 全托管供货",tag:"工厂型玩家最快出海",desc:"卖家只负责供货，平台管销售/物流/售后。适合工厂或一级供应链。利润薄，靠规模。",href:"platforms.html#temu"},
    tiktok:{name:"TikTok Shop 内容电商",tag:"增长最快的红利",desc:"内容驱动、爆发力强。需要短视频/直播能力。适合内容型团队和有审美的年轻人。",href:"platforms.html#tiktok"},
    amazon:{name:"Amazon 精品 FBA",tag:"严肃创业首选",desc:"高客单、高利润、买家质量高。规则严、需要 3–8 万启动资金、需要精细化运营和 6 个月耐心。",href:"platforms.html#amazon"},
    dtc:{name:"Shopify 独立站 DTC",tag:"长期品牌路径",desc:"完全自有品牌、用户数据、复购。需要 2–5 万预算、内容能力、能接受 3–6 个月不盈利。",href:"independent.html"}
  };

  let state = questions.map(()=>-1);

  function render(){
    root.innerHTML = questions.map((q,qi)=>`
      <div class="q-block">
        <div class="q-title">Q${qi+1}. ${q.q}</div>
        <div class="q-options">
          ${q.opts.map((o,oi)=>`<div class="q-opt ${state[qi]===oi?"selected":""}" data-q="${qi}" data-o="${oi}">${o.t}</div>`).join("")}
        </div>
      </div>
    `).join("") + `<div id="mq-result" style="margin-top:8px"></div>`;

    root.querySelectorAll(".q-opt").forEach(el=>{
      el.addEventListener("click",()=>{
        const qi = +el.dataset.q, oi = +el.dataset.o;
        state[qi] = oi;
        render();
      });
    });

    if(state.every(x=>x>=0)){
      const totals = {shopee:0,temu:0,tiktok:0,amazon:0,dtc:0};
      state.forEach((oi,qi)=>{
        const s = questions[qi].opts[oi].s;
        Object.keys(s).forEach(k=>totals[k]+=s[k]);
      });
      const sorted = Object.entries(totals).sort((a,b)=>b[1]-a[1]);
      const top = sorted[0], second = sorted[1];
      const m1 = modes[top[0]], m2 = modes[second[0]];
      document.getElementById("mq-result").innerHTML = `
        <div class="result-card">
          <div style="font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;opacity:.8;margin-bottom:6px">你的最佳起点</div>
          <h4>🎯 ${m1.name}<span style="opacity:.7;margin-left:8px;font-size:13px">· ${m1.tag}</span></h4>
          <p>${m1.desc}</p>
          <a href="${m1.href}" class="btn btn-ghost btn-sm" style="margin-top:8px">查看详细指南 →</a>
        </div>
        <div style="background:#f6f7fb;border:1px solid var(--border);border-radius:12px;padding:16px;margin-top:12px">
          <div style="font-size:12px;color:var(--text-3);font-weight:700;letter-spacing:.06em;text-transform:uppercase">备选方案</div>
          <div style="margin-top:6px"><b>${m2.name}</b> · <span style="color:var(--text-2);font-size:13px">${m2.tag}</span></div>
          <div style="color:var(--text-2);font-size:13px;margin-top:4px">${m2.desc}</div>
        </div>
      `;
    }
  }
  render();
};

/* ---- 2. 术语查询 ---- */
window.initGlossary = function(){
  const root = document.getElementById("glossary-panel");
  if(!root) return;
  const terms = [
    ["SKU","Stock Keeping Unit 库存最小单位。同款不同色/尺码算不同 SKU。","交易"],
    ["SPU","Standard Product Unit 标准产品单元，一个 SPU 对应多个 SKU。","交易"],
    ["FBA","Fulfillment by Amazon，亚马逊代仓代发。","履约"],
    ["FBM","Fulfillment by Merchant，卖家自发货。","履约"],
    ["3PL","Third-Party Logistics，第三方海外仓。","履约"],
    ["头程","国内 → 海外仓/清关点的运输。","物流"],
    ["尾程","海外仓 → 消费者。","物流"],
    ["Dropshipping","一件代发，供应商直发消费者。","履约"],
    ["全托管","卖家只供货，平台负责销售/物流/售后。","模式"],
    ["Listing","商品详情页。","运营"],
    ["A+/EBC","亚马逊品牌详情页升级模块。","运营"],
    ["BSR","Best Sellers Rank 类目销售排名。","运营"],
    ["CTR","Click Through Rate 点击率。","广告"],
    ["CVR","Conversion Rate 转化率。","广告"],
    ["CPC","Cost Per Click 单次点击成本。","广告"],
    ["ROAS","Return on Ad Spend 广告花费回报率。","广告"],
    ["ACoS","Advertising Cost of Sales 亚马逊广告销售占比。目标 < 毛利率。","广告"],
    ["TACoS","Total ACoS 总广告销售占比。","广告"],
    ["Buy Box","亚马逊购物车，多卖家竞争同 Listing 时的默认卖家。","运营"],
    ["HS Code","海关编码，决定关税税率。","合规"],
    ["DDP","Delivered Duty Paid 完税交货，卖家付关税。","物流"],
    ["DDU/DAP","未完税交货，买家/卖家自理清关和关税。","物流"],
    ["De Minimis","低值免税起征额。美国原 800 美元，2025 起对中国商品已取消。","合规"],
    ["VAT","欧盟增值税，跨境卖家需注册申报。","合规"],
    ["IOSS","欧盟低值货物一站式申报（≤ 150 欧元）。","合规"],
    ["EORI","欧盟进口商识别号。","合规"],
    ["9610","跨境电商 B2C 直购出口海关代码。","合规"],
    ["9710","跨境电商 B2B 直接出口海关代码。","合规"],
    ["9810","跨境电商海外仓出口海关代码。","合规"],
    ["1210","保税跨境电商代码。","合规"],
    ["0110","一般贸易海关代码。","合规"],
    ["ODR","Order Defect Rate 亚马逊订单缺陷率，>1% 有停号风险。","账号健康"],
    ["Brand Registry","亚马逊品牌备案，需要目标国 R 商标。","合规"],
    ["Vine","亚马逊官方付费拉评价计划。","运营"],
    ["GDPR","欧盟通用数据保护条例。","合规"],
    ["GPSR","欧盟通用产品安全法规，2024.12 起需欧代信息。","合规"],
    ["PSP","Payment Service Provider 支付服务商。","财务"],
    ["结汇","把外币兑换为人民币。","财务"],
    ["出口退税","一般贸易出口凭报关单可退增值税。","财务"],
    ["LTV","Life Time Value 用户终身价值。","数据"],
    ["CAC","Customer Acquisition Cost 用户获取成本。","数据"],
    ["AOV","Average Order Value 平均客单价。","数据"],
    ["UGC","User Generated Content 用户生成内容。","内容"],
    ["KOL/KOC","意见领袖/素人达人。","内容"],
    ["Affiliate","联盟营销。","内容"],
    ["PDP/PLP","Product Detail Page / Product List Page。","建站"],
  ];
  const cats = Array.from(new Set(terms.map(t=>t[2])));

  root.innerHTML = `
    <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:14px">
      <input type="text" id="g-search" class="input" placeholder="🔍 搜索术语，如 FBA / VAT / 头程" style="max-width:340px" />
      <div id="g-cats" style="display:flex;gap:6px;flex-wrap:wrap"></div>
    </div>
    <div id="g-list"></div>
  `;

  let filterCat = "";
  const catBar = document.getElementById("g-cats");
  catBar.innerHTML = `<span class="pill" data-cat="" style="cursor:pointer;background:var(--brand);color:#fff">全部</span>` +
    cats.map(c=>`<span class="pill" data-cat="${c}" style="cursor:pointer">${c}</span>`).join("");
  catBar.querySelectorAll(".pill").forEach(p=>{
    p.addEventListener("click",()=>{
      filterCat = p.dataset.cat;
      catBar.querySelectorAll(".pill").forEach(x=>{
        const on = x.dataset.cat === filterCat;
        x.style.background = on ? "var(--brand)" : "var(--surface-3)";
        x.style.color = on ? "#fff" : "var(--text-2)";
      });
      render();
    });
  });

  const list = document.getElementById("g-list");
  const search = document.getElementById("g-search");
  function render(){
    const q = (search.value||"").toLowerCase().trim();
    const rows = terms.filter(t=>{
      const catOk = !filterCat || t[2]===filterCat;
      const qOk = !q || t[0].toLowerCase().includes(q) || t[1].toLowerCase().includes(q);
      return catOk && qOk;
    });
    if(!rows.length){ list.innerHTML = `<div style="padding:24px;text-align:center;color:var(--text-3)">没找到匹配的术语</div>`; return; }
    list.innerHTML = `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(min(280px,100%),1fr));gap:12px">
      ${rows.map(t=>`
        <div style="background:#fff;border:1px solid var(--border);border-radius:10px;padding:14px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
            <b style="color:var(--brand);font-size:15px">${t[0]}</b>
            <span class="pill">${t[2]}</span>
          </div>
          <div style="font-size:13px;color:var(--text-2);line-height:1.6">${t[1]}</div>
        </div>
      `).join("")}
    </div>`;
  }
  search.addEventListener("input", render);
  render();
};

/* ---- 3. 选品打分器 ---- */
window.initScoreCard = function(){
  const root = document.getElementById("score-card");
  if(!root) return;
  const questions = [
    "目标市场月搜索量 ≥ 5000",
    "类目 Top100 评价数中位数 < 1000（易切入）",
    "售价 ≥ 3 × 到岸成本",
    "单件重量 < 500g，体积可控",
    "不带电/液/磁/刀刃（非敏感货）",
    "无 CE/FCC/FDA/UL 等强制认证（或已搞定）",
    "无明显专利/商标风险",
    "使用场景明确、拍图/拍视频可视化强",
    "有复购潜力或交叉销售",
    "能拿到 30 天内的稳定供货",
    "全年销售平稳 或 能踩到季节高点",
    "你自己/家人愿意用它"
  ];
  let scores = questions.map(()=>3);
  function render(){
    root.innerHTML = `
      <div style="display:grid;gap:12px">
        ${questions.map((q,i)=>`
          <div style="background:#fff;border:1px solid var(--border);border-radius:10px;padding:12px 16px">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:8px">
              <span style="font-size:13px;flex:1"><b style="color:var(--brand)">Q${i+1}.</b> ${q}</span>
              <span style="font-weight:800;font-size:16px;color:var(--brand)">${scores[i]}</span>
            </div>
            <input type="range" min="1" max="5" value="${scores[i]}" data-i="${i}" style="width:100%">
            <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text-3);margin-top:2px">
              <span>差</span><span>一般</span><span>优秀</span>
            </div>
          </div>`).join("")}
      </div>
      <div id="sc-result" style="margin-top:16px"></div>`;
    root.querySelectorAll("input[type=range]").forEach(r=>{
      r.addEventListener("input",()=>{ scores[+r.dataset.i] = +r.value; render(); });
    });
    const total = scores.reduce((a,b)=>a+b,0);
    const max = questions.length * 5;
    const pct = Math.round(total/max*100);
    let level, color, advice;
    if(total >= 50){ level="强推 ✅"; color="var(--success)"; advice="强烈建议上架！小单 100–200 件测试，主图和文案打磨到位。"; }
    else if(total >= 42){ level="可上架 🟡"; color="var(--warn)"; advice="值得测试，注意补齐低分项。首单量控制在 50–100 件。"; }
    else if(total >= 30){ level="观望 ⚠️"; color="#f97316"; advice="风险偏高。找 1–2 家备份供应商或另找方向。"; }
    else{ level="放弃 ❌"; color="var(--danger)"; advice="总分过低，换品。别把资金压在低分品上。"; }
    document.getElementById("sc-result").innerHTML = `
      <div class="result-card" style="background:linear-gradient(135deg,${color},#0f172a)">
        <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:10px">
          <div>
            <div style="font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;opacity:.8">当前得分</div>
            <div style="font-size:36px;font-weight:900;line-height:1">${total} <span style="font-size:16px;opacity:.7">/ ${max}</span></div>
          </div>
          <div style="text-align:right">
            <div style="font-size:12px;opacity:.8">通过率</div>
            <div style="font-size:20px;font-weight:800">${pct}%</div>
          </div>
        </div>
        <div style="height:6px;background:rgba(255,255,255,.2);border-radius:3px;overflow:hidden;margin-bottom:12px">
          <div style="height:100%;background:#fff;width:${pct}%;transition:width .3s"></div>
        </div>
        <div style="font-size:15px;font-weight:700">${level}</div>
        <p>${advice}</p>
      </div>`;
  }
  render();
};

/* ---- 4. 利润计算器 ---- */
window.initProfitCalc = function(){
  const root = document.getElementById("profit-calc");
  if(!root) return;
  root.innerHTML = `
    <div class="grid grid-2" style="gap:16px">
      <div>
        <label class="label">售价（USD）</label>
        <input class="input" type="number" id="pc-price" value="25">
        <label class="label" style="margin-top:12px">平台佣金率（%）</label>
        <input class="input" type="number" id="pc-fee" value="15">
        <label class="label" style="margin-top:12px">FBA / 平台履约费（USD）</label>
        <input class="input" type="number" id="pc-fba" value="6">
        <label class="label" style="margin-top:12px">支付/收款费率（%）</label>
        <input class="input" type="number" id="pc-pay" value="0.5">
        <label class="label" style="margin-top:12px">广告花费占比 TACoS（%）</label>
        <input class="input" type="number" id="pc-ads" value="20">
      </div>
      <div>
        <label class="label">头程运费/件（USD）</label>
        <input class="input" type="number" id="pc-freight" value="1.2">
        <label class="label" style="margin-top:12px">产品到岸成本（USD）</label>
        <input class="input" type="number" id="pc-cost" value="4.5">
        <label class="label" style="margin-top:12px">退货 & 售后损耗率（%）</label>
        <input class="input" type="number" id="pc-return" value="3">
        <label class="label" style="margin-top:12px">汇损率（%）</label>
        <input class="input" type="number" id="pc-fx" value="0.5">
        <label class="label" style="margin-top:12px">运营/人工分摊（USD）</label>
        <input class="input" type="number" id="pc-op" value="1.0">
      </div>
    </div>
    <div id="pc-result" style="margin-top:20px"></div>`;

  function calc(){
    const g = (id)=>+document.getElementById(id).value || 0;
    const price = g("pc-price");
    const feePct = g("pc-fee")/100;
    const fba = g("pc-fba");
    const payPct = g("pc-pay")/100;
    const adsPct = g("pc-ads")/100;
    const freight = g("pc-freight");
    const cost = g("pc-cost");
    const retPct = g("pc-return")/100;
    const fxPct = g("pc-fx")/100;
    const op = g("pc-op");

    const fee = price*feePct;
    const pay = price*payPct;
    const ads = price*adsPct;
    const ret = price*retPct;
    const fx = price*fxPct;
    const totalCost = fee+fba+pay+ads+freight+cost+ret+fx+op;
    const net = price - totalCost;
    const margin = net/price*100;
    let level="健康",color="var(--success)";
    if(margin<0){ level="亏损，放弃";color="var(--danger)";}
    else if(margin<8){ level="偏低，慎做";color="var(--warn)";}
    else if(margin<15){ level="可做，需优化";color="#f97316";}
    else if(margin<25){ level="良好";color="var(--success)";}
    else{ level="优秀";color="var(--success)";}
    document.getElementById("pc-result").innerHTML = `
      <div class="formula">
<span class="k">售价</span>                                <span class="v">$${price.toFixed(2)}</span>
<span class="op">-</span> 平台佣金 (${(feePct*100).toFixed(1)}%)                <span class="v">-$${fee.toFixed(2)}</span>
<span class="op">-</span> FBA / 履约费                          <span class="v">-$${fba.toFixed(2)}</span>
<span class="op">-</span> 支付通道费 (${(payPct*100).toFixed(1)}%)              <span class="v">-$${pay.toFixed(2)}</span>
<span class="op">-</span> 广告费 (TACoS ${(adsPct*100).toFixed(0)}%)             <span class="v">-$${ads.toFixed(2)}</span>
<span class="op">-</span> 头程分摊                              <span class="v">-$${freight.toFixed(2)}</span>
<span class="op">-</span> 到岸成本                              <span class="v">-$${cost.toFixed(2)}</span>
<span class="op">-</span> 退货损耗 (${(retPct*100).toFixed(1)}%)                <span class="v">-$${ret.toFixed(2)}</span>
<span class="op">-</span> 汇损 (${(fxPct*100).toFixed(1)}%)                    <span class="v">-$${fx.toFixed(2)}</span>
<span class="op">-</span> 运营/人工分摊                         <span class="v">-$${op.toFixed(2)}</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
<span class="k">= 单件净利</span>                            <span class="v" style="color:${color}">$${net.toFixed(2)} (${margin.toFixed(1)}%)</span>
      </div>
      <div class="result-card" style="background:linear-gradient(135deg,${color},#0f172a)">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div>
            <div style="font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;opacity:.8">评估结论</div>
            <h4 style="margin:4px 0 0">${level}</h4>
          </div>
          <div style="font-size:32px;font-weight:900">${margin.toFixed(1)}%</div>
        </div>
        <p style="margin-top:8px">建议：净利率 &lt; 10% 的品慎做，除非有明确起量路径；负毛利立刻换品或调价。</p>
      </div>`;
  }
  root.querySelectorAll("input").forEach(el=>el.addEventListener("input",calc));
  calc();
};

/* ---- 5. 平台选型向导（对比表 + 高亮推荐） ---- */
window.initPlatformCompare = function(){
  const root = document.getElementById("platform-compare");
  if(!root) return;
  const rows = [
    {name:"Amazon 亚马逊",market:"美/欧/日/加/澳/中东",mode:"B2C 精品",budget:"3–8 万",price:"高",stars:{beginner:2,speed:2,profit:5,scale:5,brand:5},pros:"高利润、高客单、买家质量高",cons:"规则严、封号高发、备货压力大",fit:"严肃创业者 / 精品",href:"platforms.html#amazon"},
    {name:"Shopee 虾皮",market:"东南亚 + 巴西",mode:"B2C 铺货",budget:"3千–1万",price:"低",stars:{beginner:5,speed:5,profit:2,scale:3,brand:2},pros:"门槛最低、上手快",cons:"客单低、利润薄、竞争卷",fit:"兼职 / 新手起步",href:"platforms.html#shopee"},
    {name:"TikTok Shop",market:"美/英/东南亚",mode:"内容电商",budget:"5千–3万",price:"中",stars:{beginner:3,speed:4,profit:3,scale:5,brand:4},pros:"增长最快、内容红利、直播",cons:"素材内卷、波动大、需内容团队",fit:"有内容能力的团队",href:"platforms.html#tiktok"},
    {name:"Temu 全托管",market:"全球",mode:"全托管供货",budget:"1–3 万",price:"极低",stars:{beginner:5,speed:5,profit:2,scale:5,brand:1},pros:"零运营门槛、出单快",cons:"利润薄、无自有用户",fit:"工厂 / 一级供应链",href:"platforms.html#temu"},
    {name:"eBay",market:"美/英/德/澳",mode:"B2C",budget:"5千–2万",price:"中",stars:{beginner:3,speed:3,profit:3,scale:2,brand:3},pros:"利基品类（汽配/收藏/工业）强",cons:"整体增长弱、规则老",fit:"特色品类 / 二手",href:"platforms.html#others"},
    {name:"Etsy",market:"美/欧",mode:"手工/工艺",budget:"3千–1万",price:"中",stars:{beginner:3,speed:3,profit:4,scale:2,brand:4},pros:"高利润、审美买家、无广告依赖",cons:"品类限制严、中国主体注册难",fit:"手工艺 / 定制",href:"platforms.html#others"},
    {name:"独立站 Shopify",market:"全球（自选）",mode:"DTC 品牌",budget:"2–5 万+",price:"任意",stars:{beginner:2,speed:1,profit:5,scale:5,brand:5},pros:"完全自有品牌、无平台绑架",cons:"冷启动难、烧广告、需要长期投入",fit:"品牌型创业",href:"independent.html"},
  ];
  const dims = [
    ["beginner","新手友好"],["speed","起量速度"],["profit","利润潜力"],["scale","天花板"],["brand","品牌价值"]
  ];
  function star(n){ return "★".repeat(n) + "☆".repeat(5-n); }
  root.innerHTML = `
    <div class="table-responsive" style="overflow-x:auto">
    <table class="content-table" style="width:100%;border-collapse:collapse;font-size:13px;min-width:920px">
      <thead>
        <tr style="background:#0f172a;color:#fff">
          <th style="padding:12px;text-align:left">平台</th>
          <th style="padding:12px;text-align:left">主战场</th>
          <th style="padding:12px;text-align:left">模式</th>
          <th style="padding:12px;text-align:left">启动资金</th>
          ${dims.map(d=>`<th style="padding:12px;text-align:center">${d[1]}</th>`).join("")}
          <th style="padding:12px;text-align:left">适合谁</th>
        </tr>
      </thead>
      <tbody>
        ${rows.map(r=>`
          <tr style="border-bottom:1px solid var(--border);background:#fff">
            <td style="padding:12px"><a href="${r.href}" style="color:var(--brand);font-weight:700">${r.name}</a>
              <div style="color:var(--text-3);font-size:11px;margin-top:2px">${r.pros}</div></td>
            <td style="padding:12px;color:var(--text-2)">${r.market}</td>
            <td style="padding:12px">${r.mode}</td>
            <td style="padding:12px"><span class="pill">${r.budget}</span></td>
            ${dims.map(d=>`<td style="padding:12px;text-align:center;color:#f59e0b;font-size:14px;letter-spacing:1px">${star(r.stars[d[0]])}</td>`).join("")}
            <td style="padding:12px;color:var(--text-2)">${r.fit}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
    </div>`;
};

/* ---- 6. 90 天路线（时间线可打勾） ---- */
window.init90Days = function(){
  const root = document.getElementById("day-90");
  if(!root) return;
  const weeks = [
    {w:"Week 1",title:"认知打底",tasks:["读完基础认知 4 篇","写下一句话学习目标","以买家身份下 3 单实测"]},
    {w:"Week 2",title:"合规准备",tasks:["完成公司注册申请","开对公户 + 记账代理签约","签约第三方跨境收款"]},
    {w:"Week 3",title:"共性技能",tasks:["精读 03 共性运营全部 8 篇","3 个候选品打分表评估","供应商询价 3 家 + 到岸成本核算"]},
    {w:"Week 4",title:"上架建站",tasks:["平台账号开出 / 独立站上线","主图 3 版 + 视频 1 条 + 详情页文案","首批库存 50–200 件到位"]},
    {w:"Week 5",title:"广告冷启",tasks:["Amazon SP 自动/手动 10–30 USD/日","独立站 Meta/TikTok Sales 30–100 USD/日","每 3 天优化一次广告"]},
    {w:"Week 6",title:"素材迭代",tasks:["出 5–10 条新广告素材","主图 A/B 测试跑数据","优化详情页转化率"]},
    {w:"Week 7",title:"拉评价",tasks:["Vine（如已备案）+ 官方 Request Review","独立站配 Judge.me/Loox 自动催评","目标首月 15–30 条评价"]},
    {w:"Week 8",title:"月度复盘",tasks:["完成首份单品利润表","决定留品/优化/砍品","爆品补货（提前 45 天）"]},
    {w:"Week 9-10",title:"数据放大",tasks:["关键词长尾扩到中位","广告预算按 20% 幅度递增","加邮件营销 / 达人分销"]},
    {w:"Week 11",title:"拓 SKU",tasks:["主打 SKU 加 2–3 个变体","延伸周边组合销售","加'相关推荐'提升 AOV"]},
    {w:"Week 12",title:"季度大复盘",tasks:["90 天完整 P&L","决定加码 / 稳定 / 换方向","制定下一 90 天目标"]},
  ];
  const key = "day90-progress";
  const saved = JSON.parse(localStorage.getItem(key) || "{}");
  root.innerHTML = `
    <div style="margin-bottom:16px">
      <div class="progress-bar"><div class="progress-fill" id="d90-fill"></div></div>
      <div id="d90-text" style="font-size:13px;color:var(--text-2)"></div>
    </div>
    <div class="timeline">
      ${weeks.map((w,wi)=>`
        <div class="timeline-item">
          <div class="timeline-week">${w.w}</div>
          <div class="timeline-title">${w.title}</div>
          <div style="background:#fff;border:1px solid var(--border);border-radius:10px;padding:12px 16px;margin-top:8px">
            ${w.tasks.map((t,ti)=>{
              const id = `d90-${wi}-${ti}`;
              const checked = saved[id]?"checked":"";
              return `<div class="checklist-item ${checked?"checked":""}" style="border-bottom:1px solid #f0f2f8">
                <input type="checkbox" id="${id}" ${checked}>
                <label for="${id}">${t}</label>
              </div>`;
            }).join("")}
          </div>
        </div>
      `).join("")}
    </div>`;
  const boxes = root.querySelectorAll("input[type=checkbox]");
  const total = boxes.length;
  function refresh(){
    const done = Array.from(boxes).filter(b=>b.checked).length;
    const pct = Math.round(done/total*100);
    document.getElementById("d90-fill").style.width = pct + "%";
    document.getElementById("d90-text").textContent = `已完成 ${done} / ${total} 项（${pct}%）`;
  }
  boxes.forEach(b=>{
    b.addEventListener("change",()=>{
      saved[b.id] = b.checked;
      localStorage.setItem(key, JSON.stringify(saved));
      const item = b.closest(".checklist-item");
      if(item) item.classList.toggle("checked", b.checked);
      refresh();
    });
  });
  refresh();
};

/* ---- 7. Listing 诊断向导 ---- */
window.initListingDiag = function(){
  const root = document.getElementById("listing-diag");
  if(!root) return;
  const flow = {
    start:{
      q:"你 Listing 的主要问题是？",
      opts:[
        {t:"曝光很少（少于 100/天）",next:"exposure"},
        {t:"曝光够但 CTR 低（<0.3%）",next:"ctr"},
        {t:"点击多但不下单（CVR 低）",next:"cvr"},
        {t:"广告花钱但没利润（ACoS 高）",next:"acos"},
        {t:"数据都还行但排名不涨",next:"rank"},
      ]
    },
    exposure:{title:"曝光不足 · 拉新问题",items:[
      "关键词覆盖不足：用 Helium 10 Cerebro 反查 Top 竞品词，你 Listing 覆盖了几个？→ 补齐 Search Term / 属性字段",
      "广告预算太低：广告后台看每日预算是否被打完 → 加 20–50% 预算",
      "广告出价太低：低于建议 CPC 30% 以上 → 提高竞价或改精准匹配",
      "类目错了：换到有搜索量的子类目（改后重开广告）",
      "新品期尚未结束：亚马逊新品期 30–90 天，耐心 + 加 Vine",
      "主关键词选错：Helium 10 换主词，重写标题"
    ]},
    ctr:{title:"CTR 低 · 主图 80% 责任",items:[
      "主图问题（最优先）：手机缩略图能看清吗？→ 出 3 版主图 A/B",
      "标题问题：前 60 字符是否有'具体规格数字'（32 inch / 10 lbs / 2-Pack）",
      "价格锚点：加 List Price 打折显示、加 Coupon",
      "评分低于 4.2 → 先补评价再优化其他",
      "FBM 无 Prime 标（亚马逊） → 考虑转 FBA 或 SFP"
    ]},
    cvr:{title:"CVR 低 · 信任 & 详情问题",items:[
      "评价数 < 15 条 → Vine + 系统催评",
      "副图少于 5 张 → 补齐 7 张（卖点/场景/尺寸/对比/包装/承诺）",
      "没有视频 → 补 15–30s 主视频",
      "缺 A+ / 品牌故事 → 补齐（需已备案）",
      "五点/详情没打消顾虑 → 把 Q&A / 差评关键词回填到五点",
      "价格太高 → 短期降价 10–15% 测 CVR 是否 +30%",
      "变体过多（>10）让人纠结 → 精简变体",
      "物流时效 >10 天 → 转海外仓 / FBA",
      "独立站 Landing 慢（>5s） → 删非必要 App、压图"
    ]},
    acos:{title:"ACoS 高 · 广告漏洞",items:[
      "无转化关键词吃预算 → 加否定关键词或降竞价",
      "出价过高 → 降 20% 观察 3 天",
      "广告类型选错 → 加自动 + 手动广泛拉词",
      "Listing 本身 CVR 差 → 先优化 Listing，再回来看广告",
      "SKU 定价太低（<3× 到岸）→ 广告永远打不平，调价或砍品"
    ]},
    rank:{title:"排名不涨 · 权重问题",items:[
      "CVR 低于类目均值 → 优先提升 CVR",
      "评价数少于类目 Top 100 中位 → 主动催评 / 老客户返视频",
      "核心词密度不够 → 自然出现 5–7 次（标题+描述+属性+ST）",
      "类目属性字段漏填 → 100% 填全",
      "缺站外流量 → TikTok/IG 达人给 Listing 引流",
      "Session 时长短（独立站） → 加视频/FAQ 增强吸引力"
    ]}
  };
  let cur = "start";
  function render(){
    if(cur==="start"){
      const node = flow.start;
      root.innerHTML = `
        <div style="margin-bottom:12px;color:var(--text-2);font-size:14px">${node.q}</div>
        <div style="display:grid;gap:8px">
          ${node.opts.map(o=>`<button class="q-opt" style="text-align:left;padding:14px 16px;font-size:14px" data-next="${o.next}">${o.t}</button>`).join("")}
        </div>`;
      root.querySelectorAll("button").forEach(b=>{
        b.addEventListener("click",()=>{ cur=b.dataset.next; render(); });
      });
    } else {
      const node = flow[cur];
      root.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
          <h4 style="margin:0;color:var(--brand);font-size:18px">${node.title}</h4>
          <button class="btn btn-outline btn-sm" id="diag-back">← 返回</button>
        </div>
        <div style="background:#fff;border:1px solid var(--border);border-radius:10px;padding:6px 16px">
          ${node.items.map((it,i)=>`
            <div style="display:flex;gap:12px;padding:12px 0;border-bottom:1px solid var(--border);align-items:flex-start">
              <div style="width:26px;height:26px;flex-shrink:0;border-radius:50%;background:var(--brand-soft);color:var(--brand);font-weight:800;font-size:12px;display:grid;place-items:center">${i+1}</div>
              <div style="font-size:14px;line-height:1.6">${it}</div>
            </div>`).join("")}
        </div>
        <div class="alert alert-info" style="margin-top:14px">
          <b>操作原则</b>：一次只改一个变量，给数据 7–14 天再看，用 Excel 记录每次改动和结果，形成你自己的诊断经验库。
        </div>`;
      document.getElementById("diag-back").addEventListener("click",()=>{ cur="start"; render(); });
    }
  }
  render();
};

/* ---- 8. Search Term 关键词生成器 ---- */
window.initSTBuilder = function(){
  const root = document.getElementById("st-builder");
  if(!root) return;
  root.innerHTML = `
    <div class="grid grid-2">
      <div>
        <label class="label">品类核心词（英文，逗号分隔）</label>
        <textarea class="textarea" id="st-core" rows="2" placeholder="cat scratcher, cat scratching post"></textarea>
        <label class="label" style="margin-top:12px">同义词/别名</label>
        <textarea class="textarea" id="st-syn" rows="2" placeholder="scratcher pole, kitten scratching tree"></textarea>
        <label class="label" style="margin-top:12px">使用场景</label>
        <textarea class="textarea" id="st-scene" rows="2" placeholder="furniture protection, indoor, apartment"></textarea>
      </div>
      <div>
        <label class="label">目标人群</label>
        <textarea class="textarea" id="st-user" rows="2" placeholder="large cats, adult felines, senior cats, kittens"></textarea>
        <label class="label" style="margin-top:12px">规格/材质</label>
        <textarea class="textarea" id="st-spec" rows="2" placeholder="32 inch tall, sisal rope, natural"></textarea>
        <label class="label" style="margin-top:12px">已用在标题的词（会被排除）</label>
        <textarea class="textarea" id="st-title" rows="2" placeholder="AURORA, cat scratcher post"></textarea>
      </div>
    </div>
    <div style="margin-top:16px;display:flex;gap:10px">
      <button class="btn btn-primary" id="st-gen">生成 Search Term</button>
      <button class="btn btn-outline" id="st-copy">复制</button>
    </div>
    <div id="st-out" style="margin-top:14px"></div>`;

  function tokens(s){
    return (s||"").split(/[,，\n]/).map(x=>x.trim().toLowerCase()).filter(Boolean);
  }
  document.getElementById("st-gen").addEventListener("click",()=>{
    const core = tokens(document.getElementById("st-core").value);
    const syn = tokens(document.getElementById("st-syn").value);
    const scene = tokens(document.getElementById("st-scene").value);
    const user = tokens(document.getElementById("st-user").value);
    const spec = tokens(document.getElementById("st-spec").value);
    const titleWords = new Set(tokens(document.getElementById("st-title").value).flatMap(w=>w.split(/\s+/)));

    let all = [...syn, ...scene, ...user, ...spec, ...core];
    // Split into single words + phrases, dedupe, and exclude title words
    let words = new Set();
    all.forEach(term=>{
      words.add(term);
      term.split(/\s+/).forEach(w=>words.add(w));
    });
    let filtered = [...words].filter(w => !titleWords.has(w));
    // Cap by bytes (250 for Amazon)
    let out = "", parts=[];
    for(const w of filtered){
      const next = (out ? out+" ":"") + w;
      if(new Blob([next]).size > 250) break;
      out = next; parts.push(w);
    }
    const bytes = new Blob([out]).size;
    document.getElementById("st-out").innerHTML = `
      <div style="background:#fff;border:1px solid var(--border);border-radius:10px;padding:14px">
        <div style="display:flex;justify-content:space-between;margin-bottom:8px">
          <b style="font-size:13px;color:var(--brand)">生成结果</b>
          <span class="pill" style="background:${bytes>240?'var(--danger)':'var(--success)'};color:#fff">${bytes} / 250 字节</span>
        </div>
        <div id="st-value" style="font-family:'SF Mono',monospace;font-size:13px;line-height:1.8;color:var(--text);background:var(--surface-3);padding:10px;border-radius:6px;word-wrap:break-word">${out || '<i style="color:var(--text-3)">请填入至少一个字段后生成</i>'}</div>
        <div style="margin-top:10px;font-size:12px;color:var(--text-3)">
          用法：粘贴到 Amazon 后台的 Search Term 字段。全小写、空格分隔、无标点、不重复标题词。
        </div>
      </div>`;
  });
  document.getElementById("st-copy").addEventListener("click",()=>{
    const el = document.getElementById("st-value");
    if(!el) return;
    navigator.clipboard.writeText(el.innerText).then(()=>{
      const b = document.getElementById("st-copy");
      const orig = b.textContent;
      b.textContent = "已复制 ✓";
      setTimeout(()=>b.textContent=orig,1500);
    });
  });
};

/* ---- 9. 五点卖点生成器 ---- */
window.initBulletBuilder = function(){
  const root = document.getElementById("bullet-builder");
  if(!root) return;
  const slots = [
    ["核心价值 / 主痛点解决","SAVES YOUR SOFA","Natural sisal wrap redirects claws from furniture","Works for cats up to 20 lbs, kittens to seniors"],
    ["材质 / 工艺 / 品质","ROCK-STEADY 12\" BASE","Extra-wide MDF base with 4 non-slip pads","Handles hyperactive kittens without tipping"],
    ["使用场景 / 目标人群","32-INCH TALL FOR FULL STRETCH","Vet-recommended height for full back extension","Promotes healthier muscles and joints"],
    ["差异化 / 与竞品比","3× LONGER LIFESPAN","Densely woven 5mm sisal (not the loose 3mm most brands use)","3× more scratches before fraying in tear tests"],
    ["品牌承诺 / 售后","HASSLE-FREE 12-MONTH GUARANTEE","If it wobbles, tears, or your cat ignores it — we replace or refund","No return needed. Trusted by 50,000+ pet parents"],
  ];
  root.innerHTML = `
    <div style="display:grid;gap:14px">
      ${slots.map((s,i)=>`
        <div style="background:#fff;border:1px solid var(--border);border-radius:10px;padding:14px">
          <div style="display:flex;justify-content:space-between;margin-bottom:8px;align-items:center">
            <b style="font-size:13px">Bullet ${i+1} · ${s[0]}</b>
            <span class="pill">BAB 结构</span>
          </div>
          <div class="grid grid-3" style="gap:8px">
            <div>
              <label class="label" style="font-size:11px">大写钩子（3–5 词）</label>
              <input class="input" data-i="${i}" data-f="hook" value="${s[1]}">
            </div>
            <div>
              <label class="label" style="font-size:11px">Attribute（属性/功能）</label>
              <input class="input" data-i="${i}" data-f="attr" value="${s[2]}">
            </div>
            <div>
              <label class="label" style="font-size:11px">Benefit（顾客好处）</label>
              <input class="input" data-i="${i}" data-f="benefit" value="${s[3]}">
            </div>
          </div>
        </div>
      `).join("")}
    </div>
    <div style="margin-top:16px;display:flex;gap:10px">
      <button class="btn btn-primary" id="bl-gen">生成完整五点</button>
      <button class="btn btn-outline" id="bl-copy">复制</button>
    </div>
    <div id="bl-out" style="margin-top:14px"></div>`;

  function build(){
    const inputs = root.querySelectorAll("input");
    const data = {};
    inputs.forEach(el=>{
      const i = +el.dataset.i, f = el.dataset.f;
      if(!data[i]) data[i] = {};
      data[i][f] = el.value.trim();
    });
    const bullets = Object.values(data).map(b => `✅ ${b.hook} — ${b.attr}. ${b.benefit}.`);
    document.getElementById("bl-out").innerHTML = `
      <div style="background:#fff;border:1px solid var(--border);border-radius:10px;padding:14px">
        <b style="font-size:13px;color:var(--brand)">生成的五点（可复制粘贴到 Amazon 后台）</b>
        <pre id="bl-value" style="background:var(--surface-3);padding:14px;border-radius:8px;font-family:'SF Mono',monospace;font-size:13px;line-height:1.7;color:var(--text);white-space:pre-wrap;margin-top:10px">${bullets.join("\n\n")}</pre>
      </div>`;
  }
  document.getElementById("bl-gen").addEventListener("click",build);
  document.getElementById("bl-copy").addEventListener("click",()=>{
    const el = document.getElementById("bl-value");
    if(!el) { build(); return; }
    navigator.clipboard.writeText(el.innerText);
    const b = document.getElementById("bl-copy");
    b.textContent = "已复制 ✓";
    setTimeout(()=>b.textContent="复制",1500);
  });
  build();
};

/* ---- 10. AI Listing Prompt 生成器 ---- */
window.initPromptGen = function(){
  const root = document.getElementById("prompt-gen");
  if(!root) return;
  root.innerHTML = `
    <div class="grid grid-2">
      <div>
        <label class="label">目标平台</label>
        <select class="select" id="pg-plat">
          <option>Amazon US</option>
          <option>Amazon EU</option>
          <option>Amazon JP</option>
          <option>Shopee (东南亚)</option>
          <option>TikTok Shop US</option>
          <option>Shopify 独立站</option>
          <option>Etsy</option>
        </select>
        <label class="label" style="margin-top:12px">产品品类</label>
        <input class="input" id="pg-cat" value="Cat Scratching Post">
        <label class="label" style="margin-top:12px">产品名 / 型号</label>
        <input class="input" id="pg-name" value="AURORA 32-inch Sisal Cat Scratcher">
        <label class="label" style="margin-top:12px">目标客户</label>
        <input class="input" id="pg-target" value="cat owners with adult indoor cats 5-25 lbs">
      </div>
      <div>
        <label class="label">关键差异化点（用 ; 分隔）</label>
        <textarea class="textarea" id="pg-diff" rows="2">12" anti-slip base; 5mm dense sisal; 32" tall</textarea>
        <label class="label" style="margin-top:12px">材质</label>
        <input class="input" id="pg-mat" value="natural sisal rope, MDF base, non-slip pads">
        <label class="label" style="margin-top:12px">尺寸 & 重量</label>
        <input class="input" id="pg-dim" value='32"H × 12"W × 12"D, 8 lbs'>
        <label class="label" style="margin-top:12px">主要关键词（; 分隔）</label>
        <textarea class="textarea" id="pg-kw" rows="2">cat scratcher post; sisal cat scratching post; tall cat scratcher; large cat scratcher; indoor cat scratcher</textarea>
      </div>
    </div>
    <div style="margin-top:16px;display:flex;gap:10px">
      <button class="btn btn-primary" id="pg-gen">生成 AI Prompt</button>
      <button class="btn btn-outline" id="pg-copy">复制</button>
    </div>
    <div id="pg-out" style="margin-top:14px"></div>`;

  function build(){
    const v = id => document.getElementById(id).value.trim();
    const p = v("pg-plat");
    const isAmazon = p.startsWith("Amazon");
    const prompt =
`You are an experienced ${p} copywriter. Generate a complete listing for the product below. Follow all ${p} guidelines: no promotional words (best/#1/sale), no absolute claims, no competitor brand names.

【Product Category】: ${v("pg-cat")}
【Product Name/Model】: ${v("pg-name")}
【Target Market】: ${p}
【Target Customer】: ${v("pg-target")}
【Key Differentiators】: ${v("pg-diff")}
【Materials】: ${v("pg-mat")}
【Dimensions & Weight】: ${v("pg-dim")}
【Primary Keywords】: ${v("pg-kw")}

Please output:

1. **Title** (${isAmazon?"≤ 150 characters":"per platform limit"}, front-load core keyword, include brand + core keyword + 2 differentiators + spec + target user + 1 long-tail keyword)

2. **5 Bullet Points** (each starts with an ALL-CAPS hook 3-5 words, uses Benefit + Attribute + Benefit structure, 200-300 chars each):
   - Bullet 1: Core problem solved
   - Bullet 2: Material / quality
   - Bullet 3: Usage scenarios / target users
   - Bullet 4: Differentiator vs cheaper alternatives (no brand names)
   - Bullet 5: Warranty / brand promise / customer service

3. **Product Description** (long-form, 1000-2000 chars, 4-6 paragraphs, story-driven: hook → pain → solution → features → social proof → CTA)

${isAmazon ? "4. **Backend Search Terms** (single line, all lowercase, no punctuation, ≤ 250 bytes, no words that already appear in title/bullets, include synonyms, misspellings, occasions)\n\n5. **A+ Content Suggestion**: outline 5 modules with a title and 30-word description for each." : "4. **SEO Meta Title & Meta Description** (Google-optimized).\n\n5. **FAQ Section**: 6-8 questions with 1-3 sentence answers."}`;
    document.getElementById("pg-out").innerHTML = `
      <div style="background:#fff;border:1px solid var(--border);border-radius:10px;padding:14px">
        <div style="display:flex;justify-content:space-between;margin-bottom:8px">
          <b style="font-size:13px;color:var(--brand)">生成的 AI Prompt（复制到 ChatGPT / Claude 使用）</b>
          <span class="pill">${prompt.length} 字符</span>
        </div>
        <pre id="pg-value" style="background:var(--surface-3);padding:14px;border-radius:8px;font-family:'SF Mono',monospace;font-size:12px;line-height:1.6;color:var(--text);white-space:pre-wrap;max-height:400px;overflow-y:auto;margin:0">${prompt}</pre>
      </div>`;
  }
  document.getElementById("pg-gen").addEventListener("click",build);
  document.getElementById("pg-copy").addEventListener("click",()=>{
    const el = document.getElementById("pg-value");
    if(!el){ build(); return; }
    navigator.clipboard.writeText(el.innerText);
    const b = document.getElementById("pg-copy");
    b.textContent="已复制 ✓";
    setTimeout(()=>b.textContent="复制",1500);
  });
  build();
};

/* ---- Init all on page ---- */
document.addEventListener("DOMContentLoaded",()=>{
  ["initModeQuiz","initGlossary","initScoreCard","initProfitCalc","initPlatformCompare","init90Days","initListingDiag","initSTBuilder","initBulletBuilder","initPromptGen"]
    .forEach(fn=>{ try{ window[fn] && window[fn](); }catch(e){ console.error(fn,e); } });
});
