# MResalat System

MResalat System v0.4 is a code-first, Persian-first experience system for MResalat. It combines ten audience segments with readable typography, ecosystem examples, coded design-system documentation, and an accessible humanoid 3D assistant with complete and portrait modes.

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
npm run build
```

## Routes

- `/` — general member home
- `/segments` — index for all ten audience experiences
- `/examples` — ten compact ecosystem service examples
- `/segments/[segment]/home` — audience home
- `/segments/[segment]/services` — audience services/advisor view
- `/segments/[segment]/journey` — process-review journey
- `/loan`, `/seller`, `/rag`, `/secure` — canonical service, seller, trustworthy RAG, and L3 secure-flow screens
- `/showcase` — coded design-system reference with examples, code panels, grid specification, and 3D state controls
- `/qa` — link index for the 36 review routes

Segment slugs are `general`, `new-member`, `loan-applicant`, `prospective-seller`, `active-seller`, `organization-manager`, `organization-employee`, `parent`, `young-user`, and `care-seeker`.

## Architecture

Reusable code lives under `mresalat/`: `core` contains brand, icons, theme, primitives and the inventory; `ai` contains assistant, trust, and lazy React Three Fiber patterns; `journeys` contains the service template and process wizard; `templates` composes the segment experiences; `domains/segments.ts` and `domains/ecosystem.ts` provide typed configuration; `showcase` contains reusable documentation controls; `secure` contains sensitive flows; and `motion` contains reduced-motion-safe parallax.

Semantic design tokens and responsive composition are centralized in `app/globals.css`. The local IRANSansX FaNum family is loaded from `public/fonts` at weights 400, 500, 600, and 700. The official logo asset is stored at `public/brand/mresalat-logo.svg`. Functional icons use `lucide-react` through the typed `MResalatIcon` wrapper.

The definitive React component list is maintained in `mresalat/core/component-inventory.ts` and mirrored in `docs/component-inventory.md`.

Risk levels remain explicit: L0 public knowledge, L1 authenticated reads, L2 controlled/reversible actions, and L3 sensitive actions. This release contains no real bank APIs, authentication, or analytics vendor.
