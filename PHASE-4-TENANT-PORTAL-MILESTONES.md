# Silong Phase 4 Tenant Portal Milestones

> **Implementation note:** Complete one milestone at a time. Run the listed verification checks and review the result before starting the next milestone.

**Goal:** Build a polished, frontend-only tenant portal that reuses Silong’s existing marketplace data and remains ready for future Laravel API integration.

**Architecture:** Add a shared tenant portal layout under an App Router route group, keep tenant types and mock records in `features/tenant`, and expose frontend-only behavior through a tenant service plus React session provider. The provider owns temporary in-session changes such as favorite removal, profile edits, and reservation cancellation; no localStorage, tokens, database, or API calls are used.

**Tech Stack:** Next.js App Router, TypeScript, Mantine UI, Phosphor Icons, existing Silong theme, existing global styles, and current mock property data.

**Spec:** User-provided “Codex Prompt — Phase 4: Tenant Portal (Silong)”.

## Global Constraints

- Do not implement Laravel API integration.
- Do not implement actual authentication, authorization, tokens, or database persistence.
- Do not use localStorage as a replacement for backend persistence.
- Reuse `data/properties.ts` and existing property interfaces; do not duplicate the property dataset.
- Preserve the existing public marketplace and authentication routes.
- Use only these reservation statuses: `pending`, `approved`, `declined`, and `cancelled`.
- A pending or approved reservation may be cancelled in the mock UI; declined and cancelled reservations cannot be cancelled again.
- Clearly label behavior as frontend-only or demo behavior where it could otherwise imply backend functionality.
- Keep the Silong palette, Manrope headings, Inter interface text, responsive layouts, semantic landmarks, and keyboard focus states.

## Target Route Structure

```text
app/
  (tenant)/
    tenant/
      layout.tsx
      dashboard/page.tsx
      favorites/page.tsx
      reservations/page.tsx
      reservations/[id]/page.tsx
      profile/page.tsx
      settings/page.tsx
```

## Target Feature Structure

```text
features/tenant/
  components/
    TenantShell.tsx
    TenantSidebar.tsx
    TenantHeader.tsx
    TenantStats.tsx
    FavoritePropertyCard.tsx
    ReservationCard.tsx
    ReservationTimeline.tsx
    TenantEmptyState.tsx
  data/
    tenantMockData.ts
  service.ts
  types.ts
  validation.ts
  TenantPortalProvider.tsx
```

## Milestone 1: Tenant Domain Types and Mock Services

**Purpose:** Establish the stable data contract before building screens.

**Files:**

- Create: `features/tenant/types.ts`
- Create: `features/tenant/data/tenantMockData.ts`
- Create: `features/tenant/service.ts`
- Create: `features/tenant/validation.ts`
- Modify only if necessary: `types/property.ts`

**Required types:**

```ts
export type ReservationStatus =
  | "pending"
  | "approved"
  | "declined"
  | "cancelled";

export interface Favorite {
  propertyId: string;
  savedAt: string;
}

export interface ReservationActivity {
  status: ReservationStatus;
  label: string;
  date: string;
  note?: string;
}
```

Add `Tenant`, `Reservation`, and `DashboardStatistics` interfaces with the fields required by the prompt. Reservation records must demonstrate all four statuses and reference existing property IDs and room data.

**Required service signatures:**

```ts
getTenantDashboard(): Promise<DashboardStatistics>;
getTenantFavorites(): Promise<Favorite[]>;
removeFavorite(propertyId: string): Promise<{ success: boolean; message: string }>;
getTenantReservations(): Promise<Reservation[]>;
getReservationById(reservationId: string): Promise<Reservation | null>;
cancelReservation(reservationId: string, reason?: string): Promise<{ success: boolean; message: string }>;
updateTenantProfile(payload: TenantProfileUpdate): Promise<{ success: boolean; message: string }>;
```

Statistics must be derived from mock records rather than hardcoded. Service responses must clearly describe that changes are temporary frontend-session behavior.

**Verification:** Run `npm.cmd run lint` and confirm TypeScript type-checking through `npm.cmd run build` before continuing.

**Commit boundary:** `feat: add tenant portal domain models`

## Milestone 2: Tenant Portal Shell and Responsive Navigation

**Purpose:** Make every tenant route share the same functional navigation foundation.

**Files:**

- Create: `app/(tenant)/layout.tsx`
- Create: `features/tenant/TenantPortalProvider.tsx`
- Create: `features/tenant/components/TenantShell.tsx`
- Create: `features/tenant/components/TenantSidebar.tsx`
- Create: `features/tenant/components/TenantHeader.tsx`
- Create: `features/tenant/components/TenantEmptyState.tsx`
- Modify: `app/globals.css`

Implement:

- Desktop sidebar links for dashboard, favorites, reservations, profile, settings, and marketplace.
- Mobile drawer or collapsible navigation with a minimum 44px touch target.
- Current-route indication using `usePathname` in client navigation components.
- Header title, breadcrumb or section context, notification placeholder, avatar, profile menu, and UI-only logout action.
- A visible demo-mode label so the portal does not imply real authorization.
- `TenantPortalProvider` wrapping the route group and exposing temporary tenant state.

**Verification:** Confirm all six target route shells can render without duplicate layout markup. Test keyboard access to every sidebar and header control at desktop and mobile widths.

**Commit boundary:** `feat: add tenant portal shell`

## Milestone 3: Dashboard

**Purpose:** Provide the tenant’s overview using derived mock data.

**Files:**

- Create: `app/(tenant)/tenant/dashboard/page.tsx`
- Create: `features/tenant/components/TenantStats.tsx`
- Create: `features/tenant/components/ReservationCard.tsx`
- Create: `features/tenant/components/FavoritePropertyCard.tsx`
- Modify: `features/tenant/TenantPortalProvider.tsx` only if dashboard state access requires it

Implement:

- Welcome section using the mock tenant name.
- Browse-properties shortcut linking to `/properties`.
- Four statistics: favorites, pending, approved, and declined requests.
- Recent reservation activity with property, room, date, status, and details link.
- Recommended properties from the existing `data/properties.ts` dataset.
- Loading and empty states for recent activity and recommendations.

**Verification:** Confirm each statistic changes when the mock reservation or favorite records change. Confirm recommendation cards link to valid `/properties/[slug]` pages.

**Commit boundary:** `feat: add tenant dashboard`

## Milestone 4: Favorites and Temporary Session Updates

**Purpose:** Allow the tenant to review and remove saved properties without persistence claims.

**Files:**

- Create: `app/(tenant)/tenant/favorites/page.tsx`
- Modify: `features/tenant/TenantPortalProvider.tsx`
- Modify: `features/tenant/components/FavoritePropertyCard.tsx`
- Modify: `features/tenant/components/TenantEmptyState.tsx`

Implement:

- Resolve favorite IDs against the existing property dataset.
- Display image, name, location, price, room details, and detail-page link.
- Remove a favorite immediately from provider state.
- Show a temporary-session message after removal.
- Show an empty state with a link to `/properties`.
- Add image fallback and meaningful alternative text through the existing image conventions.

**Verification:** Remove a favorite, navigate to dashboard, and confirm the count and list update in the same session. Confirm no property dataset is duplicated.

**Commit boundary:** `feat: add tenant favorites`

## Milestone 5: Reservation List and Status Filtering

**Purpose:** Display the tenant’s request history and make the four-status workflow usable.

**Files:**

- Create: `app/(tenant)/tenant/reservations/page.tsx`
- Modify: `features/tenant/components/ReservationCard.tsx`
- Create or modify: `features/tenant/components/ReservationStatusBadge.tsx`

Implement:

- Summary counts for all four statuses.
- Filters for All, Pending, Approved, Declined, and Cancelled.
- Responsive reservation cards rather than a fixed-width table on small screens.
- Reference number, property image/name/location, room, monthly price, dates, occupants, request date, status, and details link.
- Empty state when a selected filter has no records.
- Clear copy that approval is not a finalized rental arrangement.

**Verification:** Select every status filter and confirm only matching records are visible. Confirm all four statuses are represented in the mock data and rendered with accessible text, not color alone.

**Commit boundary:** `feat: add tenant reservation list`

## Milestone 6: Reservation Details and Cancellation

**Purpose:** Provide a complete request view with supported activity and safe cancellation.

**Files:**

- Create: `app/(tenant)/tenant/reservations/[id]/page.tsx`
- Create: `features/tenant/components/ReservationTimeline.tsx`
- Modify: `features/tenant/TenantPortalProvider.tsx`
- Modify: `features/tenant/service.ts`
- Modify: `app/not-found.tsx` only if a tenant-specific not-found presentation is needed

Implement:

- Load by reservation ID and render `notFound()` for unknown IDs.
- Show property and room information, dates, occupants, message, reference, and landlord response.
- Render only timeline events present in the record.
- Allow cancellation for pending and approved statuses only.
- Show a Mantine confirmation modal before cancellation.
- Capture an optional cancellation reason.
- Update provider state and display a frontend-only success message.
- Disable actions for declined and cancelled statuses.

**Verification:** Test one record for each status, both cancellable statuses, an invalid ID, modal keyboard controls, and post-cancellation status/count updates.

**Commit boundary:** `feat: add tenant reservation details`

## Milestone 7: Tenant Profile

**Purpose:** Add validated, temporary profile editing.

**Files:**

- Create: `app/(tenant)/tenant/profile/page.tsx`
- Create: `features/tenant/components/TenantProfileForm.tsx`
- Modify: `features/tenant/validation.ts`
- Modify: `features/tenant/TenantPortalProvider.tsx`

Implement:

- Avatar and local preview-only image selection.
- Editable first name, last name, and phone number.
- Read-only email, role, and creation date.
- Save, cancel/reset, validation errors, success feedback, and error feedback.
- Explicitly state that profile changes are temporary and not persisted.

**Verification:** Test required fields, invalid phone input, save feedback, reset behavior, and profile display after navigation within the same session.

**Commit boundary:** `feat: add tenant profile form`

## Milestone 8: Tenant Settings

**Purpose:** Complete the tenant portal’s frontend-only account controls.

**Files:**

- Create: `app/(tenant)/tenant/settings/page.tsx`
- Create: `features/tenant/components/TenantSettingsForm.tsx`
- Modify: `features/tenant/validation.ts`

Implement:

- Change-password UI with current password, new password, and confirmation validation.
- Email and reservation-update notification toggles.
- Basic security information.
- UI-only logout action.
- Account deletion placeholder with explanatory text and no destructive behavior.
- Clear messaging that settings are not connected to a backend.

**Verification:** Test password mismatch and minimum length errors, toggle keyboard behavior, and confirm logout/account deletion do not claim to complete backend actions.

**Commit boundary:** `feat: add tenant settings UI`

## Milestone 9: Full Regression and Responsive Review

**Purpose:** Verify Phase 4 without regressing Phase 1–3.

**Verification commands:**

```bash
npm.cmd run lint
npm.cmd run build
```

Verify HTTP responses for:

```text
/
/properties
/properties/the-olive-house-bgc
/login
/register
/tenant/dashboard
/tenant/favorites
/tenant/reservations
/tenant/reservations/<valid-id>
/tenant/profile
/tenant/settings
```

Also verify:

- Invalid reservation IDs render a not-found experience.
- Public marketplace navigation still works.
- Login and registration routes still work.
- Favorites and reservations update within the same mock session.
- Desktop, tablet, and mobile layouts do not horizontally scroll.
- Focus states, labels, headings, button/link distinction, and status text remain accessible.
- No Laravel, authentication, token, database, payment, or portal work outside Phase 4 was introduced.

**Commit boundary:** `chore: verify tenant portal phase`

## Completion Criteria

Phase 4 is ready for review when all milestones are checked, lint and production build pass, all target routes render, all four reservation statuses are functional, invalid IDs have a not-found experience, temporary state changes work during the current session, and the public marketplace/authentication routes remain intact.

The next phase after review is Phase 5: Landlord Portal. Do not begin it until the tenant portal has been visually reviewed and accepted.
