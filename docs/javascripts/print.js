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
