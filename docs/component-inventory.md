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
- `SmartAssistant3D` — original humanoid android with independent `complete` / `portrait` framing, transparent composition, local gaze, a matching static fallback and nine explicit emotion states, including greeting.
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
- `SegmentHero`, `SegmentActionCard`, `SegmentProcedureCard` — formal, youth and organizational entry patterns driven by one typed experience configuration.
- `OtpInput` — five-digit, mobile-friendly one-time-code input with auto-advance, backspace and localized paste handling.
- `SegmentStatusPanel` — request facts, semantic vertical progress and next-action guidance across all three Phase 1 segments.
- `SegmentSupportPanel` — calm individual, friendly youth and compact professional organization guidance.
- `ChildInfoPanel`, `AddOwnerPanel` — route-level dialog/sheet patterns with initial focus, keyboard containment and Escape dismissal.
- `SegmentAIEntry` — shared Persian AI-first query entry with deterministic typed answers, suggestions, source semantics, clarification and handoff states.
- `ActiveJourneyCard` — reusable current-step, progress and next-action summary for personalized segment homes.

## Secure

- `SecureActionFlow` — L3 explain, confirm, step-up, result and receipt states.

## Templates

- `SegmentExperience` — config-driven home, services and journey pages for six composition modes.
- `SegmentHomeShell` — Phase 2 composition shell for deliberately distinct individual, youth and organization dashboards.
- `SegmentPhaseTwoPage` — route-level Phase 2 experience spanning individual services and journeys, youth goals and rewards, and organization programs, personnel and reports.
- `UserContextSwitcher` — accessible desktop dropdown/mobile sheet for changing role context inside one identity, with focus restoration and live announcement.
- `PermissionState` / `PermissionAction` — user-readable allowed, view-only, approval, step-up and unavailable treatments.
- `ApprovalRequestCard` — reusable pending/approved/rejected review pattern with request source and decision impact.
- `NextBestAction` — deterministic priority surface for approvals, expiry warnings and active journeys.
- `ChildSelector` — parent sub-context selection for fictional children without changing the parent context.
- `CrossServiceContextMarker` — compact continuity marker for youth-goal and organization-credit journeys into another service.
- `PhaseThreeExperience` — relationship-aware parent/youth, manager/employee, personnel and allocation demo surfaces.

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
- `MBazarOrderCard`, `MBazarOrderStatus`, `MBazarOrderProgress` — customer-readable status, next action and semantic fulfillment milestones.
- `MBazarFulfillmentGroup` — independent seller parcel state inside one logical order.
- `MBazarFavoriteCard` — saved-price snapshot compared with current price, availability and installment state.
- `MBazarAddressCard`, `MBazarReviewCard`, `MBazarRatingInput` — shared checkout address management and accessible delivered-purchase review flow.
- `MBazarSupportCaseCard` — order-linked issue status and next action.
- `MBazarProfileGroup`, `MBazarAccountNav` — task-oriented buyer account navigation.
- `MBazarSellerHeader` — buyer-facing seller identity, marketplace-source facts and separate seller reputation semantics.

## Documentation

- `CodeExample` — expandable representative TSX with copy feedback.
- `GridLayoutDemo` — toggleable 12-column desktop / 4-column mobile grid overlay.
