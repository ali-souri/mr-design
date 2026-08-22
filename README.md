# MResalat System

MResalat System is the code-first, Persian-first experience system for MResalat. Version 0.1 validates reusable patterns through five canonical screens before expanding the component surface.

## Routes

- `/` — general home and Hero Assistant
- `/loan` — reusable service journey template for M-Moshaver
- `/seller` — active seller operations home with Compact Assistant
- `/rag` — trustworthy RAG answer, evidence, uncertainty and human handoff
- `/secure` — L3 temporary card-lock flow with confirmation, step-up and receipt
- `/showcase` — internal visual review surface

## Architecture

Reusable code lives under `mresalat/`: `core` for primitives and analytics, `ai` for assistant and trust patterns, `journeys` for service templates, `secure` for sensitive flows, and `domains` for typed contracts and mock data. Visual tokens are centralized as CSS custom properties in `app/globals.css`.

Risk levels are explicit: L0 public knowledge, L1 authenticated reads, L2 controlled/reversible actions, and L3 sensitive actions. Version 0.1 contains no real bank APIs, authentication, or analytics vendor.

## Development

```bash
npm run dev
npm run lint
npm run build
```
