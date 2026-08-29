# کاتالوگ فارسی سیستم طراحی ام‌رسالت

این انتشار یک کتاب A4 فارسی و RTL است که مستقیماً از رجیستری‌ها، توکن‌ها، موجودی اجزا و مسیرهای ممیزی‌شدهٔ مخزن ساخته می‌شود. مسیر تعاملی منبع در `/design-system-catalog` قرار دارد و خروجی نهایی در `output/pdf/MResalat_Design_System_Catalog_FA.pdf` تولید می‌شود.

## ساختار انتشار

- ۱۳۱ صفحه: جلد، پیش‌گفتار، ۲۴ فصل و ۵ پیوست
- ۱۲ دامنهٔ محصول و تمام ۶۹ مسیر ممیزی‌شده
- تمام ۹۶ جزء ثبت‌شده در `component-inventory.ts`
- ۱۷ هویت خدمت با تفکیک دارایی رسمی و fallback طراحی‌شده
- نمونه‌های روشن، تیره، موبایل، دسکتاپ، دستیار هوشمند، RAG/Trust، ریسک L0–L3 و ام‌بازار

رجیستری ثابت صفحات در `mresalat/catalog-book/FullCatalogBook.tsx` هم ترتیب چاپ و هم بوکمارک‌های PDF را تعیین می‌کند. endpoint مسیر `/design-system-catalog/outline` همین رجیستری را برای post-process خروجی می‌خواند.

## بازتولید

سرور توسعه را در پورت ۳۰۰۰ اجرا کنید و سپس یکی از دستورهای زیر را به‌کار ببرید:

```powershell
npm run catalog:capture
npm run catalog:prototype
npm run catalog:pdf
```

`catalog:capture` تصاویر deterministic را از همین اپلیکیشن محلی می‌سازد. `catalog:prototype` نمونهٔ شش‌صفحه‌ای نماینده و `catalog:pdf` نسخهٔ کامل را تولید می‌کند. برای جلوگیری از capture دوباره می‌توان نوشت:

```powershell
npm run catalog:pdf -- --skip-captures
```

اگر Python bundled به‌صورت خودکار پیدا نشد، مسیر آن را با متغیر `CATALOG_PYTHON` مشخص کنید. پردازش نهایی با `pypdf` زبان `fa-IR`، metadata، page label و outline را اضافه می‌کند.

## کنترل کیفیت

```powershell
pdftoppm -png -r 150 output/pdf/MResalat_Design_System_Catalog_FA.pdf tmp/pdfs/catalog-book/final-render/page
python scripts/preflight-design-system-catalog.py output/pdf/MResalat_Design_System_Catalog_FA.pdf tmp/pdfs/catalog-book/final-render tmp/pdfs/catalog-book/final-preflight.json
```

preflight اندازهٔ A4، شمار صفحات، متن قابل جست‌وجو، صفحات خالی، لینک‌ها، outline، page label، metadata، زبان، فونت‌های embedded و رشته‌های داخلی ناخواسته را بررسی و شیت‌های تماس تمام صفحات را تولید می‌کند.

فایل‌های capture، PDF و رندرهای QA عمداً در Git نادیده گرفته می‌شوند؛ منبع React/CSS، اسکریپت‌های export/post-process/preflight و این راهنما باید version-controlled باقی بمانند.
