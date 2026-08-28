from __future__ import annotations

import json
import math
import sys
from pathlib import Path

from PIL import Image, ImageDraw
from pypdf import PdfReader


def count_outline_items(items: list[object]) -> int:
    count = 0
    for item in items:
        if isinstance(item, list):
            count += count_outline_items(item)
        else:
            count += 1
    return count


def collect_fonts(reader: PdfReader) -> list[dict[str, object]]:
    fonts: dict[str, dict[str, object]] = {}
    for page in reader.pages:
        resources = page.get("/Resources") or {}
        for font_ref in (resources.get("/Font") or {}).values():
            font = font_ref.get_object()
            base_font = str(font.get("/BaseFont", "unknown"))
            subtype = str(font.get("/Subtype", "unknown"))
            descriptor = font.get("/FontDescriptor")
            if subtype == "/Type0":
                descendants = font.get("/DescendantFonts") or []
                if descendants:
                    descriptor = descendants[0].get_object().get("/FontDescriptor")
            descriptor = descriptor.get_object() if descriptor else {}
            embedded = any(descriptor.get(key) is not None for key in ("/FontFile", "/FontFile2", "/FontFile3"))
            fonts[f"{base_font}:{subtype}"] = {
                "name": base_font,
                "subtype": subtype,
                "embedded": embedded,
            }
    return sorted(fonts.values(), key=lambda item: str(item["name"]))


def make_contact_sheets(render_dir: Path, output_dir: Path, per_sheet: int = 20) -> list[str]:
    pages = sorted(
        render_dir.glob("page-*.png"),
        key=lambda path: int(path.stem.rsplit("-", 1)[-1]),
    )
    output_dir.mkdir(parents=True, exist_ok=True)
    outputs: list[str] = []
    for sheet_index in range(math.ceil(len(pages) / per_sheet)):
        batch = pages[sheet_index * per_sheet : (sheet_index + 1) * per_sheet]
        thumbs: list[tuple[Path, Image.Image]] = []
        for page in batch:
            image = Image.open(page).convert("RGB")
            image.thumbnail((240, 340))
            thumbs.append((page, image.copy()))
            image.close()
        columns = 4
        rows = math.ceil(len(thumbs) / columns)
        sheet = Image.new("RGB", (columns * 260, rows * 380), "#dce4ec")
        draw = ImageDraw.Draw(sheet)
        for index, (path, thumb) in enumerate(thumbs):
            x = (index % columns) * 260 + 10
            y = (index // columns) * 380 + 26
            sheet.paste(thumb, (x + (240 - thumb.width) // 2, y))
            draw.text((x, 7 + (index // columns) * 380), path.stem, fill="#10233f")
        target = output_dir / f"contact-sheet-{sheet_index + 1:02d}.png"
        sheet.save(target, optimize=True)
        outputs.append(str(target))
    return outputs


def main() -> None:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    pdf_path = Path(sys.argv[1]).resolve()
    render_dir = Path(sys.argv[2]).resolve()
    report_path = Path(sys.argv[3]).resolve()
    reader = PdfReader(pdf_path)
    sizes = []
    texts: list[str] = []
    link_annotations = 0
    for page in reader.pages:
        width = float(page.mediabox.width)
        height = float(page.mediabox.height)
        sizes.append((round(width, 2), round(height, 2)))
        texts.append(page.extract_text() or "")
        for annotation_ref in page.get("/Annots") or []:
            annotation = annotation_ref.get_object()
            if str(annotation.get("/Subtype")) == "/Link":
                link_annotations += 1
    page_labels = list(reader.page_labels)
    forbidden_markers = ("localhost:", "file:///", r"C:\Users")
    report = {
        "pdf": str(pdf_path),
        "pages": len(reader.pages),
        "fileSize": pdf_path.stat().st_size,
        "pageSizes": sorted(set(sizes)),
        "a4Portrait": all(abs(width - 595.28) < 1 and abs(height - 841.89) < 1 for width, height in sizes),
        "metadata": dict(reader.metadata or {}),
        "language": reader.trailer["/Root"].get("/Lang"),
        "textCharacters": sum(len(text) for text in texts),
        "emptyTextPages": [index + 1 for index, text in enumerate(texts) if not text.strip()],
        "outlineItems": count_outline_items(reader.outline),
        "pageLabels": {
            "count": len(page_labels),
            "first": page_labels[0] if page_labels else None,
            "last": page_labels[-1] if page_labels else None,
        },
        "linkAnnotations": link_annotations,
        "forbiddenMarkers": [marker for marker in forbidden_markers if any(marker in text for text in texts)],
        "fonts": collect_fonts(reader),
        "contactSheets": make_contact_sheets(render_dir, report_path.parent / "contact-sheets"),
    }
    report_path.parent.mkdir(parents=True, exist_ok=True)
    report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(report, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
