# MResalat System

MResalat System v0.4 is a code-first, Persian-first experience system for MResalat. It combines ten audience segments with readable typography, 69 audited interactive product examples, coded design-system documentation, and an accessible humanoid 3D assistant with complete and portrait modes.

## Local development

```powershell
cd "C:\Users\hwis\Documents\ChatGPT\MResalat System"
npm install
npm run dev
```

Open `http://localhost:3000`. Validation commands:

```powershell
npm run lint
npx tsc --noEmit
npm run test:mascot
npm run test:catalog
npm run test:examples
npm run build
```

## Routes

- `/` — general member home
- `/segments` — index for all ten audience experiences
- `/examples` — interactive product gallery for all 69 audited service paths across 12 domains
- `/catalog` — audit traceability, evidence status, risk, safe-stop policy, and design-system mapping
- `/segments/[segment]/home` — audience home
- `/segments/[segment]/services` — audience services/advisor view
- `/segments/[segment]/journey` — process-review journey
- `/loan`, `/seller`, `/rag`, `/secure` — canonical service, seller, trustworthy RAG, and L3 secure-flow screens
- `/showcase` — coded design-system reference with examples, code panels, grid specification, and 3D state controls
- `/qa` — link index for the 36 review routes

Segment slugs are `general`, `new-member`, `loan-applicant`, `prospective-seller`, `active-seller`, `organization-manager`, `organization-employee`, `parent`, `young-user`, and `care-seeker`.

## Architecture

Reusable code lives under `mresalat/`: `core` contains brand, icons, theme, primitives and the inventory; `ai` contains assistant, trust, and lazy React Three Fiber patterns; `journeys` contains the service template and process wizard; `templates` composes the segment experiences; `domains` contains the audited catalog; `examples` contains shared product scaffolding plus membership, support, learning, finance, contributions, health, insurance, auxiliary, Rahyar, banking, and communication compositions; `mbazar` remains the reference marketplace implementation; `secure` contains sensitive flows; and `motion` contains reduced-motion-safe parallax.

## Catalog and product examples

`/catalog` and `/examples` serve different purposes. `/catalog` is the audit/design-system coverage layer: it preserves bilingual evidence, observed status, risk, safe stopping point, provenance, and component mappings. `/examples` is the browsable product layer: it contains the actual forms, tabs, filters, lists, wizards, dialogs, gates, and explicit unavailable states users can interact with.

The typed route map is maintained in `mresalat/examples/product/example-route-registry.ts`. Every one of the 69 catalog records links to one unique `/examples/...` route. The 11 M-Bazar records reuse the existing storefront, categories, favorites, orders, installments, addresses, reviews, cart, checkout, seller, and digital-category routes instead of duplicating them.

Domain entry routes are `/examples/membership`, `/examples/mhami`, `/examples/mbazar`, `/examples/learning`, `/examples/mhesam`, `/examples/heavenly-resalat`, `/examples/msalamat`, `/examples/mbime`, `/examples/auxiliary`, `/examples/rahyar`, `/examples/banking`, and `/examples/communication`. Each audited child has an explicit thin App Router page backed by its domain composition; hub services such as M-Hesam credit, M-Salamat, M-Bime, Heavenly Resalat, Rahyar, and the Virtual Counter use the domain entry itself as their product route.

All fixtures are mock/demo data. No real name, national ID, phone, account, balance, transaction, address, coordinate, contact, message, appointment, health record, or insurance record is used. L2 and L3 experiences end at their audited review, OTP, login, permission, upload, submission, or payment boundary. Source provenance remains `MResalat_Bilingual_Service_Catalog_2026-08-28.docx`, audited 2026-08-28.

Semantic design tokens and responsive composition are centralized in `app/globals.css`. The local IRANSansX FaNum family is loaded from `public/fonts` at weights 400, 500, 600, and 700. The official logo asset is stored at `public/brand/mresalat-logo.svg`. Functional icons use `lucide-react` through the typed `MResalatIcon` wrapper.

The definitive React component list is maintained in `mresalat/core/component-inventory.ts` and mirrored in `docs/component-inventory.md`.

Risk levels remain explicit: L0 public knowledge, L1 authenticated reads, L2 controlled/reversible actions, and L3 sensitive actions. This release contains no real bank APIs, authentication, or analytics vendor.
