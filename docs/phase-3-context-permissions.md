# Phase 3 context, relationship, and permission model

Phase 3 keeps one fictional identity while changing the active role in which that identity acts. The UI preference key is `mresalat.context.v1`; it stores only the demo user key, context ID/type, and selected fictional child ID. Invalid values fall back to the fixture default.

## Context fixtures

- Multi-role user: personal, parent, organization employee, seller.
- Manager user: personal, organization manager.
- Relationships: parent-child (`view` or `manage`), organization member (`employee` or `manager`), and seller owner/operator.
- Permissions are derived by `getContextPermissions(context.type, relationships)` rather than component booleans.

## Permission matrix

| Action | Personal | Parent | Youth | Employee | Manager | Seller |
| --- | --- | --- | --- | --- | --- | --- |
| View own data | yes | yes | yes | yes | yes | yes |
| View child goal | no | yes | own goal | no | no | no |
| View permitted child activity | no | yes | own activity | no | no | no |
| Approve child reward | no | yes with manage authority | request only | no | no | no |
| Change allowance | no | step-up / approval | parent request | no | no | no |
| View own employee benefit | no | no | no | yes | program summary only | no |
| View organization personnel | no | no | no | no | yes | no |
| Allocate organization credit | no | no | no | no | yes + mock step-up | no |
| Manage seller products | no | no | no | no | no | yes |
| View seller orders | no | no | no | no | no | yes |

## User-readable permission states

`allowed`, `view-only`, `approval-required`, `parent-approval-required`, `organization-approval-required`, `step-up-auth-required`, and `unavailable` are UI states—not production IAM decisions. Known unavailable actions are disabled or labeled before interaction.

## Demo boundaries

All people, organizations, amounts, activities, benefits, relationships, approvals, and journey states are deterministic fictional fixtures. The demo does not expose national identifiers, banking identifiers, real child activity, HR-sensitive data, or real financial execution.

