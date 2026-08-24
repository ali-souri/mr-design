# MResalat System component inventory

This list reflects the exported React components in `mresalat/` for v0.4.

## Foundations

- `BrandLogo` — official MResalat asset; full, compact and light-surface treatments.
- `MResalatIcon` — semantic Lucide mapping; 16, 20, 24 and 32 sizes.
- `ThemeToggle` — light, dark and system preference with persistence.

## Core

- `Button` — primary, secondary and danger actions.
- `Badge` — info, success, warning, danger and neutral labels.
- `Alert` — info, success, warning and danger feedback.

## Navigation

- `AppShell` — desktop header and floating mobile bottom navigation.

## AI

- `AssistantShell` — hero, context and compact assistant density.
- `SmartAssistant3D` — original humanoid android with independent `complete` / `portrait` framing, local gaze, a matching static fallback and eight explicit emotion states.
- `SmartAssistantAvatar` — optimized static portrait of the same character at 32, 40, 48, 64 and 96 pixels.
- `SmartAssistantCanvas` — lazy React Three Fiber scene with adaptive cameras, emotional gestures, smooth constrained eye/head tracking, neutral reset and reduced-motion handling.
- `Assistant3DDemo` — interactive mode, emotion, pointer-tracking and avatar-size documentation for the 3D assistant.

## RAG / Trust

- `SourceCitation` — expandable official-knowledge or live-data evidence.
- `TrustLegend` — official, live, AI-explanation and recommendation semantics.
- `UncertainAnswer` — insufficient-evidence and clarification pattern.
- `HumanHandoff` — context-preserving support transfer.

## Journeys

- `ProcessReviewWizard` — compact, standard and featured horizontal process review.
- `ServicePageTemplate` — typed service/advisor page composition.

## Secure

- `SecureActionFlow` — L3 explain, confirm, step-up, result and receipt states.

## Templates

- `SegmentExperience` — config-driven home, services and journey pages for six composition modes.

## Motion

- `ParallaxLayer` — restrained pointer depth, enhanced for young mode and disabled by reduced motion.

## Marketplace

- `MarketplaceContext`, `MBazarSearch`, `MBazarCategoryCard` — shared M-Bazar discovery context and entry points.
- `MBazarProductCard`, `MBazarProductQuickView`, `PriceDisplay`, `PurchaseModeBadge` — product discovery, pricing, eligibility wording and functional cart actions.
- `QuantityControl`, `MBazarCartItemRow`, `MBazarCartSellerGroup`, `MBazarCartSummary` — accessible quantity, seller grouping, validation and deterministic totals.
- `DeliveryAddressCard`, `DeliveryMethodCard`, `PaymentModeSelector` — guided delivery and first-class cash/installment payment choices.
- `InstallmentEligibilityPanel`, `InstallmentPlanCard` — four deterministic eligibility states and card-based demo plan comparison.
- `CheckoutConfirmation`, `CheckoutSuccess` — explicit review, mock step-up authentication and branch-specific results.
- `InstallmentRequestCard` — request context, progress, latest update and next action.

## Documentation

- `CodeExample` — expandable representative TSX with copy feedback.
- `GridLayoutDemo` — toggleable 12-column desktop / 4-column mobile grid overlay.
