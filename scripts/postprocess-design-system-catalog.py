from __future__ import annotations

import sys
import json
from pathlib import Path

from pypdf import PdfReader, PdfWriter
from pypdf.constants import PageLabelStyle
from pypdf.generic import NameObject, TextStringObject


def main() -> None:
    source = Path(sys.argv[1]).resolve()
    destination = Path(sys.argv[2]).resolve()
    mode = sys.argv[3] if len(sys.argv) > 3 else "final"
    reader = PdfReader(source)
    writer = PdfWriter()
    writer.clone_document_from_reader(reader)
    writer.add_metadata(
        {
            "/Title": "کاتالوگ سیستم طراحی ام‌رسالت",
            "/Subject": "MResalat Design System",
            "/Author": "MResalat System",
            "/Creator": "MResalat catalog-book · Chromium + pypdf",
            "/Keywords": "MResalat, Design System, Persian, RTL, fa-IR",
        }
    )
    writer.root_object[NameObject("/Lang")] = TextStringObject("fa-IR")
    writer.set_page_label(0, 0, prefix="Cover")
    if len(reader.pages) > 1:
        writer.set_page_label(1, len(reader.pages) - 1, style=PageLabelStyle.DECIMAL, start=1)
    if mode == "prototype":
        labels = ["جلد", "رنگ و توکن‌ها", "اجزای پایه", "دستیار هوشمند", "دامنه ام‌بازار", "نمونه ماتریس ۶۹ مسیر"]
        for page_index, label in enumerate(labels[: len(reader.pages)]):
            writer.add_outline_item(label, page_index)
    elif len(sys.argv) > 4 and Path(sys.argv[4]).exists():
        outline = json.loads(Path(sys.argv[4]).read_text(encoding="utf-8"))
        for item in outline:
            writer.add_outline_item(item["title"], int(item["pageIndex"]))
    destination.parent.mkdir(parents=True, exist_ok=True)
    with destination.open("wb") as stream:
        writer.write(stream)


if __name__ == "__main__":
    main()
