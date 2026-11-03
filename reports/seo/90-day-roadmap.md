# Tawfiq: Validated 90-Day Organic SEO Execution Roadmap

**Document Version:** 2.0.0 (Validated & Risk-Adjusted)  
**Target Domain:** https://www.tawfiq.in/  
**Application Target:** https://originaltawfiq.vercel.app  
**Lead Strategist:** Chief SEO Strategist & Technical Growth Director  
**Audit Date:** November 3, 2026  
**Status:** Validated Execution Plan  

---

## Executive Overview: Realistic, Evidence-Based Growth

This roadmap replaces speculative ranking promises with an engineering-grounded, prioritized execution schedule. Search engine optimization is an empirical discipline; search engines do not offer guaranteed rankings, and traffic volume depends on crawl frequency, technical indexation, backlink acquisition, and user engagement signals.

```
       Phase 1 (Days 1-30)              Phase 2 (Days 31-60)              Phase 3 (Days 61-90)
┌──────────────────────────────┐  ┌──────────────────────────────┐  ┌──────────────────────────────┐
│ The Qaza Foundation & Tool   │  │ Ethical Comparison Hub &     │  │ Educational Scale &          │
│                              │  │ Fiqh Academy Expansion       │  │ Technical Optimization       │
│ • Standalone /qaza-calculator│  │ • /compare/ad-free-muslim-app│  │ • Templated City Prayer times│
│ • Static pre-rendering (SSG) │  │ • /compare/muslim-pro-alt    │  │ • /ai-guidance interactive   │
│ • 2 core fiqh guides         │  │ • /academy/wudu-guide        │  │ • Core Web Vitals audit      │
│ • WebApplication schema      │  │ • FAQPage & Review schemas   │  │ • PWA conversion A/B test    │
└──────────────────────────────┘  └──────────────────────────────┘  └──────────────────────────────┘
```

---

## Phase 1: Days 1–30 — Technical Architecture & Dedicated Qaza Calculator Launch

### Objective:
Extract Tawfiq's core calculation intellectual property from its current client-side hash modal (`#qaza-calculator`) into a dedicated, crawlable, pre-rendered public landing page (`/qaza-calculator`), establishing immediate relevance for high-demand South Asian and global English search queries.

### Action Items & Deliverables:

1. **Routing & Pre-Rendering Infrastructure (Engineering):**
   - Configure a clean, dedicated route in `src/App.jsx` for `/qaza-calculator`.
   - Implement static HTML pre-rendering at build time so search crawlers receive complete interactive form HTML, headings, and schema markup without requiring JavaScript execution.
   - **Crucial Routing Rule:** Do not touch or repurpose existing legacy redirects (`/download`, `/quran`, `/tafsir`, `/prayer-tracker`). Keep those redirects pointing to their established homepage anchors to preserve existing link equity.
   - Add `https://www.tawfiq.in/qaza-calculator` to `public/sitemap.xml`.

2. **Launch Dedicated Standalone URL: `/qaza-calculator`:**
   - **Target Keywords:** `qaza namaz calculator`, `missed prayer calculator`, `qaza umri calculator`.
   - **Page Components:**
     - Full interactive calculation engine rendered directly in the initial viewport (puberty baseline, menses deduction, multi-phase habit breakdown, scholar modifiers, and dynamic daily pace horizon slider).
     - **Original Editorial Copy (1,500+ words):** Deep theological and mathematical explanation of missed prayer calculations across the 4 Sunni Madhhabs. Explaining *Bulugh* calculation, menses deduction math, and gentle habit psychology. (This ensures the page is independently valuable and does not duplicate homepage teaser copy).
   - **Structured Data:** Deploy `WebApplication` schema with properties for application category, operating system, and free price tier, alongside `HowTo` schema.

3. **Publish 2 Foundational Fiqh Guides:**
   - `/guides/how-to-calculate-missed-prayers`: Direct, featured-snippet-optimized answer in the first 120 words, followed by practical step-by-step calculation scenarios and an embedded link to the calculator.
   - `/guides/qaza-calculator-women-menstruation`: Scholarly guide detailing the jurisprudence of *Haidh* and *Nifas* calculation, answering frequent questions from female searchers.

4. **Search Verification & Crawling:**
   - Verify IndexNow webhook script executes after production build.
   - Submit `/qaza-calculator` directly via Google Search Console and Bing Webmaster Tools URL Inspection tools.

### Phase 1 Targets (Benchmark Scenarios):
- **Conservative Scenario:** 3,000 - 5,000 monthly impressions; Page 2-3 indexation on Qaza terms in India.
- **Base Scenario:** 8,000 - 15,000 monthly impressions; Top 10 ranking for `qaza namaz calculator` in India; 150 - 300 PWA launches.
- **Growth Scenario:** 25,000+ monthly impressions; Top 5 ranking in India; 500+ PWA launches.

---

## Phase 2: Days 31–60 — Ethical Comparison Hub & Academy Topic Expansion

### Objective:
Capture commercial-intent searchers actively seeking ad-free and privacy-friendly alternatives to *Muslim Pro*, while establishing topical authority in prayer jurisprudence and purification.

### Action Items & Deliverables:

1. **Launch Ethical Comparison Hub:**
   - `/compare/ad-free-muslim-apps`: In-depth, objective review of modern ad-free Islamic apps (Pillars, Just Pray, Tawfiq). Transparent breakdown of features, business models, and privacy architectures.
   - `/compare/muslim-pro-alternative`: Fact-based teardown of why users transition to ad-free platforms. Emphasizing zero video ads in worship, zero location tracking, and 100% free lifetime access.
   - **Structured Data:** Implement `ItemPage` and `Table` markup.

2. **Academy Topic Content Deployment:**
   - `/academy/wudu-guide`: High-quality step-by-step visual purification guide targeting `step by step wudu guide with pictures`.
   - `/guides/how-many-rakats-in-qaza-namaz`: Concise reference table outlining Fard and Witr obligations across daily prayers.
   - `/resources/qaza-namaz-tracker-sheet`: Clean, printable PDF tracking grid with embedded QR code syncing directly to Tawfiq's PWA.

3. **Rich Results Schema Stacking:**
   - Deploy `FAQPage` JSON-LD across all comparison and guide pages to capture Google's accordion dropdowns in search results.
   - Add `BreadcrumbList` schema to establish clear topical hierarchy (`Home > Academy > Guides`).

4. **Community Backlink Acquisition (Digital PR):**
   - Share open-source, ad-free case studies on relevant communities: Reddit (`/r/islam`, `/r/muslimtechnet`), Hacker News, and Dev.to.
   - Direct outreach to independent Islamic lifestyle and productivity blogs (ProductiveMuslim community, Halal lifestyle newsletters).

### Phase 2 Targets (Benchmark Scenarios):
- **Conservative Scenario:** 20,000 - 30,000 monthly impressions; 600 - 1,000 organic clicks.
- **Base Scenario:** 40,000 - 60,000 monthly impressions; 1,500 - 2,500 organic clicks; 600 - 1,000 PWA installs.
- **Growth Scenario:** 80,000+ monthly impressions; 4,000+ organic clicks; 1,800+ PWA installs.

---

## Phase 3: Days 61–90 — Programmatic Expansion, AI Guidance Hub & CRO

### Objective:
Scale organic footprint into city-level local prayer queries, launch Tawfiq's multi-madhhab AI guidance hub, and optimize the web-to-PWA installation funnel.

### Action Items & Deliverables:

1. **Programmatic City Prayer Times Architecture (Proof-of-Concept):**
   - Build static templated landing pages for key diaspora cities with high search volume:
     - London (`/prayer-times/uk/london`)
     - Birmingham (`/prayer-times/uk/birmingham`)
     - New York (`/prayer-times/us/new-york`)
     - Toronto (`/prayer-times/ca/toronto`)
     - Mumbai (`/prayer-times/in/mumbai`)
     - Hyderabad (`/prayer-times/in/hyderabad`)
   - Pre-render astronomical prayer times with dynamic countdown timers and Qibla compass coordinates.

2. **Launch Islamic AI Guidance Hub (`/ai-guidance`):**
   - Dedicated landing page demonstrating Tawfiq's multi-madhhab comparative engine.
   - Target terms: `islamic ai assistant free`, `scholarly islamic ai 4 madhhabs`, `ask islamic questions ai`.
   - Showcase verified citations across Hanafi, Maliki, Shafi'i, and Hanbali schools.

3. **Conversion Rate Optimization (CRO) Sprint:**
   - Test non-intrusive PWA install prompts triggered after a user completes a calculation or tracks a prayer.
   - Optimize the Hero section QR-code desktop-to-mobile bridge for maximum scan rates.

4. **Technical Performance & Core Web Vitals Audit:**
   - Audit Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS) across all newly launched pages to maintain 95+ PageSpeed scores.

### Phase 3 Targets (Benchmark Scenarios):
- **Conservative Scenario:** 70,000 - 100,000 monthly impressions; 2,500 - 4,000 organic visits.
- **Base Scenario:** 120,000 - 180,000 monthly impressions; 5,000 - 8,500 organic visits; 2,000 - 3,500 PWA installs.
- **Growth Scenario:** 250,000+ monthly impressions; 12,000+ organic visits; 5,000+ PWA installs.

---

## 4. Engineering Feasibility & Risk Management

| Risk Factor | Probability | Impact | Mitigation Strategy |
| :--- | :---: | :---: | :--- |
| **Client-Side Rendering (SPA) Crawling Delays** | High | High | Implement build-time static HTML pre-rendering (SSG) for all `/guides/*`, `/compare/*`, and `/qaza-calculator` pages so search engines index complete text and schema immediately. |
| **Accidental Collision with Legacy Redirects** | Medium | Critical | Strictly maintain existing redirects in `App.jsx` (`/download`, `/quran`, `/tafsir`, `/prayer-tracker`). Assign new SEO pages to unique, un-redirected paths. |
| **Scholarly / Fiqh Discrepancies** | Medium | High | Ground all calculation formulas, puberty age ranges, and menses deduction rules in cited, mainstream Sunni jurisprudence (Hanafi, Shafi'i, Maliki, Hanbali). Avoid unsupported fatwas. |
| **Duplicate Content Penalty with Homepage** | Low | Medium | Ensure `/qaza-calculator` contains 1,500+ words of original, in-depth educational documentation that does not appear on the homepage. |
