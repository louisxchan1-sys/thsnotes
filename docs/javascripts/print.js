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

// 列印分頁：把每個小節（h2／h3 至下一個標題）包成一組，
// 剩餘版面不足以放下整組時，整組移到新一頁
document$.subscribe(() => {
  const parents = new Set();
  document.querySelectorAll(".md-typeset h2, .md-typeset h3").forEach((h) => parents.add(h.parentElement));
  parents.forEach((parent) => {
    let group = null;
    Array.from(parent.children).forEach((el) => {
      const tag = el.tagName;
      if (tag === "H1" || tag === "HR" || tag === "SECTION") { group = null; return; }
      if (tag === "H2" || tag === "H3") {
        group = document.createElement("div");
        group.className = "print-keep print-keep--" + tag.toLowerCase();
        parent.insertBefore(group, el);
      }
      if (group) group.appendChild(el);
    });
  });
  // 量度時展開分頁標籤內容（列印時全部展開）
  document.body.classList.add("print-measure");
  const tall = (el) => el.offsetHeight > 880;
  // 整組高過約一頁：不強制整組，只保持「標題＋第一段內容」同頁
  document.querySelectorAll(".print-keep").forEach((g) => {
    if (!tall(g)) return;
    g.classList.add("print-keep--long");
    const head = document.createElement("div");
    head.className = "print-keep-head";
    g.insertBefore(head, g.firstElementChild);
    head.appendChild(head.nextElementSibling);
    const first = head.nextElementSibling;
    if (first && first.offsetHeight < 300) head.appendChild(first);
  });
  document.body.classList.remove("print-measure");
});
