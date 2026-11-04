// 為分頁內容加上標題，列印時顯示
document$.subscribe(() => {
  document.querySelectorAll(".tabbed-set").forEach((set) => {
    const labels = set.querySelectorAll(".tabbed-labels > label");
    set.querySelectorAll(".tabbed-block").forEach((block, i) => {
      if (labels[i]) block.dataset.printLabel = labels[i].textContent.trim();
    });
  });
});
// 列印前展開所有摺疊區
window.addEventListener("beforeprint", () =>
  document.querySelectorAll("details").forEach((d) => (d.open = true)));

// 列印分頁（少留空白）：每個 h2／h3 標題與其後第一段內容綁在一起，
// 避免標題孤零零留在頁底；其餘內容照常接續
document$.subscribe(() => {
  document.querySelectorAll(".md-typeset h2, .md-typeset h3").forEach((h) => {
    if (h.parentElement.classList.contains("print-keep-head")) return;
    const head = document.createElement("div");
    head.className = "print-keep-head";
    h.parentElement.insertBefore(head, h);
    head.appendChild(h);
    const next = head.nextElementSibling;
    if (next && !/^H[1-3]$|^HR$|^SECTION$/.test(next.tagName) && next.offsetHeight < 260) head.appendChild(next);
  });
});
