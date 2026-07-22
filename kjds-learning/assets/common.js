// Shared navigation + footer + utilities
(function(){
  const PAGES = [
    {href:"index.html", label:"首页"},
    {href:"basics.html", label:"基础认知"},
    {href:"compliance.html", label:"合规与公司"},
    {href:"operations.html", label:"共性运营"},
    {href:"platforms.html", label:"平台专题"},
    {href:"independent.html", label:"独立站"},
    {href:"listing.html", label:"Listing"},
    {href:"tools.html", label:"交互工具"},
    {href:"resources.html", label:"资源与清单"},
  ];

  function currentFile(){
    const p = window.location.pathname.split("/").pop() || "index.html";
    return p;
  }

  function renderNav(){
    const cur = currentFile();
    const links = PAGES.map(p=>{
      const active = p.href===cur ? "active" : "";
      return `<a href="${p.href}" class="${active}">${p.label}</a>`;
    }).join("");
    const html = `
      <div class="nav-inner">
        <a href="index.html" class="nav-brand">
          <span class="logo">跨</span>
          <span>跨境电商 · 从零到上架</span>
        </a>
        <button class="nav-toggle" aria-label="打开导航" aria-expanded="false" aria-controls="nav-links">
          <span class="bar"></span>
        </button>
        <nav id="nav-links" class="nav-links">${links}</nav>
      </div>`;
    const el = document.getElementById("site-nav");
    if(el){
      el.innerHTML = html;
      const btn = el.querySelector(".nav-toggle");
      const linksEl = el.querySelector(".nav-links");
      if(btn && linksEl){
        btn.addEventListener("click", ()=>{
          const open = linksEl.classList.toggle("open");
          btn.setAttribute("aria-expanded", open ? "true" : "false");
          btn.setAttribute("aria-label", open ? "关闭导航" : "打开导航");
        });
        // Auto-close after tapping a link (in-page anchors too)
        linksEl.addEventListener("click", (e)=>{
          if(e.target.tagName === "A" && linksEl.classList.contains("open")){
            linksEl.classList.remove("open");
            btn.setAttribute("aria-expanded", "false");
            btn.setAttribute("aria-label", "打开导航");
          }
        });
      }
    }
  }

  function renderFooter(){
    const html = `
      <div class="footer-inner">
        <div class="footer-cols">
          <div>
            <h5>跨境电商 · 从零到上架</h5>
            <p style="margin:0;line-height:1.7">一个面向零基础学习者的交互式学习中心。<br>
            共性方法论 + 平台专题 + 可交互工具，一次学透。</p>
          </div>
          <div>
            <h5>核心模块</h5>
            <a href="basics.html">基础认知</a>
            <a href="compliance.html">合规与公司</a>
            <a href="operations.html">共性运营</a>
          </div>
          <div>
            <h5>渠道学习</h5>
            <a href="platforms.html">平台专题</a>
            <a href="independent.html">独立站</a>
            <a href="listing.html">Listing</a>
          </div>
          <div>
            <h5>实用工具</h5>
            <a href="tools.html">交互工具</a>
            <a href="resources.html">资源与清单</a>
          </div>
        </div>
        <div style="border-top:1px solid rgba(255,255,255,.1);padding-top:20px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px">
          <span>© 2026 学习资料整理 · 政策以官方最新文件为准</span>
          <span>Made for learners, not marketers.</span>
        </div>
      </div>`;
    const el = document.getElementById("site-footer");
    if(el) el.innerHTML = html;
  }

  // Simple tabs
  function setupTabs(){
    document.querySelectorAll("[data-tabs]").forEach(root=>{
      const tabs = root.querySelectorAll(".tab");
      const panels = root.querySelectorAll(".tab-panel");
      tabs.forEach(tab=>{
        tab.addEventListener("click",()=>{
          const key = tab.dataset.tab;
          tabs.forEach(t=>t.classList.toggle("active", t.dataset.tab===key));
          panels.forEach(p=>p.classList.toggle("active", p.dataset.panel===key));
        });
      });
    });
  }

  // Persistent checklists (per-page localStorage)
  function setupChecklists(){
    document.querySelectorAll("[data-checklist]").forEach(root=>{
      const key = "cl-" + (root.dataset.checklist || currentFile());
      const saved = JSON.parse(localStorage.getItem(key) || "{}");
      const boxes = root.querySelectorAll("input[type=checkbox]");
      const total = boxes.length;
      const progressFill = root.querySelector(".progress-fill");
      const progressText = root.querySelector(".progress-text");

      function updateProgress(){
        const done = Array.from(boxes).filter(b=>b.checked).length;
        const pct = total? Math.round(done/total*100) : 0;
        if(progressFill) progressFill.style.width = pct + "%";
        if(progressText) progressText.textContent = `已完成 ${done} / ${total}（${pct}%）`;
      }

      boxes.forEach((box,i)=>{
        const id = box.id || (root.dataset.checklist+"-"+i);
        box.id = id;
        if(saved[id]) box.checked = true;
        const item = box.closest(".checklist-item");
        if(item && box.checked) item.classList.add("checked");
        box.addEventListener("change",()=>{
          saved[id] = box.checked;
          localStorage.setItem(key, JSON.stringify(saved));
          if(item) item.classList.toggle("checked", box.checked);
          updateProgress();
        });
      });
      updateProgress();
    });
  }

  // Wrap wide <table>s in a horizontal-scrollable container so mobile
  // doesn't force the whole page to scroll sideways.
  function wrapTables(){
    document.querySelectorAll(".content table, .container table").forEach(tbl=>{
      if(tbl.parentElement && tbl.parentElement.classList.contains("table-wrap")) return;
      const wrap = document.createElement("div");
      wrap.className = "table-wrap";
      tbl.parentNode.insertBefore(wrap, tbl);
      wrap.appendChild(tbl);
    });
  }

  document.addEventListener("DOMContentLoaded", ()=>{
    renderNav();
    renderFooter();
    setupTabs();
    setupChecklists();
    wrapTables();
  });
})();
