# Product Specification — Enterprise Permission Management

> Portfolio reconstruction. This document separates confirmed product behavior from illustrative demo behavior and unverified edge cases.

## Problem

Back Office users from different operational teams previously shared the same permission configuration despite different responsibilities. The platform supports trading accounts, orders, financial operations, FIX API, symbols, groups, and other sensitive administrative functions.

## Confirmed business rules

| ID | Rule |
| --- | --- |
| BR-01 | The platform supports predefined role templates and custom roles. |
| BR-02 | Each user is assigned exactly one role. |
| BR-03 | Permissions can be configured at the module/action level. |
| BR-04 | View and Edit are independently configurable. |
| BR-05 | A user can have individually customized permissions. |
| BR-06 | Individual customization settings are not erased when a role's defaults change. |
| BR-07 | Selecting a parent permission checkbox selects all its children. |
| BR-08 | Deselecting a parent permission checkbox deselects all its children. |
| BR-09 | A parent checkbox is indeterminate when some, but not all, children are selected. |
| BR-10 | The original role-setting UI displayed a notice that permission changes update after five minutes; actual timing is not independently verified. |

## Core user flows

1. **Role configuration:** Managers → Role Default Setting → Select role → Edit permission tree → Save.
2. **Create user:** Managers → Add User → Enter user details → Select department and role → Optional customization → Save.
3. **Individual customization:** Managers → Edit User → Enable Customize → Adjust permission tree → Save.

## Acceptance criteria — confirmed interaction rules

**AC-01 Parent select**  
Given a module has child actions, when an administrator selects the parent checkbox, then all child actions are selected.

**AC-02 Parent deselect**  
Given a module has child actions, when an administrator deselects the parent checkbox, then all child actions are deselected.

**AC-03 Partial selection**  
Given some but not all child actions are selected, the parent checkbox displays an indeterminate state.

**AC-04 Single role**  
Given a manager is assigned a role, the manager has exactly one assigned role.

**AC-05 Customization preservation**  
Given a user has saved individual customization settings, when the role defaults are updated, those saved customization settings are not cleared.

## Open questions / edge cases (not verified)

- How effective permissions are resolved after a role update when user customization exists.
- Whether Edit-only permissions are executable without View.
- Whether API endpoints independently enforce authorization for every protected operation.
- Exact scope and timing of permission propagation.
- Deleting a role with assigned users; protecting the last permission administrator.
- Audit history, change impact previews, and notification behavior.

## Reconstructed demo conventions (not production claims)

- Fictional names, departments, role labels, role-to-user assignments, and initial permission presets.
- Search, filter, confirmation dialogs, and navigation details refined for the portfolio demo.
- No real production accounts, credentials, or proprietary backend logic.

## Outcome

The permission management feature was launched to production. No unverified numerical KPI or security reduction is claimed.
