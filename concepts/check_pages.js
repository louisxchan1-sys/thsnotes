// 用法：node concepts/check_pages.js http://localhost:8766/print_page/
// 以 A4 列印寬度量度每個概念（h2 至下一個 h2）高度，列出超過一頁者
const { chromium } = require('playwright');
(async () => {
  const url = process.argv[2];
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 688, height: 1000 } }); // 182mm 內容寬度 ≈ 688px
  await p.emulateMedia({ media: 'print' });
  await p.goto(url, { waitUntil: 'networkidle' });
  await p.waitForTimeout(1500);
  const res = await p.evaluate(() => {
    const out = [];
    const hs = [...document.querySelectorAll('#print-site-page .md-typeset h2, #print-site-page h2')];
    const uniq = [...new Set(hs)];
    uniq.forEach((h, i) => {
      const top = h.getBoundingClientRect().top + window.scrollY;
      let end = null;
      let el = h.nextElementSibling;
      while (el && el.tagName !== 'H2') { const r = el.getBoundingClientRect(); end = r.bottom + window.scrollY; el = el.nextElementSibling; }
      out.push({ t: h.textContent.replace('¶','').trim(), h: Math.round((end ?? top) - top) });
    });
    return out;
  });
  const limit = 1015; // 269mm 可用高度 ≈ 1016px
  let over = 0;
  for (const r of res) { const flag = r.h > limit; if (flag) over++; console.log((flag ? 'OVER ' : '     ') + String(r.h).padStart(5) + '  ' + r.t); }
  console.log(`共 ${res.length} 個概念，超頁 ${over} 個`);
  await b.close();
})();
