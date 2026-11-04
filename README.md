# HKDSE 旅遊與款待 筆記

以 [MkDocs Material](https://squidfunk.github.io/mkdocs-material/) 製作的 THS 溫習筆記網站。

```bash
pip install mkdocs-material
mkdocs serve   # 本機預覽 http://127.0.0.1:8000
```

筆記放在 `docs/`，新增章節後在 `mkdocs.yml` 的 `nav` 加上連結。

## 列印

- 網站側欄的「**列印全部筆記**」頁會合併所有章節，加上封面和目錄；用瀏覽器按 `Ctrl+P`（Mac：`⌘+P`）列印或另存 PDF
- 列印時選 **A4**，並勾選「**背景圖形**」以保留顏色
- 單一章節頁面亦可直接列印，已自動隱藏選單、展開答案
