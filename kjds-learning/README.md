# 跨境电商 · 从零到上架 · 学习中心

一个纯静态、可交互的学习网站，把之前 `跨境电商学习资料/` 里的所有 md 转成了图文并茂、可交互的形式。

## 🚀 如何使用

**方式 1（最简单）**：直接双击 `index.html`，会在默认浏览器打开。

**方式 2（推荐，功能完整）**：在这个目录下起一个本地 HTTP 服务器，然后在浏览器打开 http://localhost:8000
```bash
cd 跨境电商学习资料/site
python3 -m http.server 8000
```

**方式 3（发布到线上）**：这是纯静态站点，可以直接上传到 GitHub Pages、Vercel、Netlify、Cloudflare Pages 等任何静态托管平台。

## 📂 结构

```
site/
├── index.html          首页 + 学习地图
├── basics.html         01 基础认知
├── compliance.html     02 合规与公司
├── operations.html     03 共性运营（8 大模块）
├── platforms.html      04 平台专题
├── independent.html    05 独立站
├── listing.html        06 Listing 专题
├── tools.html          07 交互工具（10 个）
├── resources.html      08 资源与清单
└── assets/
    ├── styles.css      全站样式（15KB）
    ├── common.js       导航/tab/清单持久化（5KB）
    └── tools.js        10 个交互工具（46KB）
```

## 🧰 10 个交互工具

所有工具进度和填写都会自动保存在**你本地浏览器的 localStorage**，不上传任何数据。

1. **模式适配测试** · 5 道题告诉你最适合哪种起步方式
2. **术语查询** · 45 个术语，支持搜索和分类筛选
3. **选品打分器** · 12 项打分，实时输出建议
4. **利润计算器** · 10 个变量算清单件净利
5. **平台对比** · 7 大平台 5 维度打分
6. **90 天路线** · 12 周任务可打勾，进度保存
7. **Listing 诊断** · 数据症状 → 具体动作清单
8. **Search Term 生成器** · 自动去重 + 250 字节控制
9. **五点卖点生成器** · BAB 结构自动组合
10. **AI Prompt 生成器** · 一键生成 6 种平台的 Listing 提示词

## ✅ 内置的清单页面

多个页面里的检查清单支持勾选和进度追踪：
- 合规最小闭环清单（compliance.html）
- Listing 上线前自查清单（listing.html）
- 90 天路线打勾（tools.html）
- 第一周执行清单 + 合规准备清单（resources.html）

## 📱 兼容性

- 完全响应式设计，PC / Pad / 手机都能用
- 支持所有现代浏览器（Chrome / Safari / Edge / Firefox）
- 无外部依赖，完全离线可用
- 数据保存在浏览器本地，不上传服务器

## 📝 内容更新

网站内容与 `跨境电商学习资料/` 里的 md 一一对应，如需修改内容，可以：
1. 直接改对应 HTML（快，但要重复步骤）
2. 或改 md 后重新导出（需自建流程）

政策数字（费率、时效、税率）请以官方最新文件为准。
