import type { ReservationStatus } from "../types";

const labels: Record<ReservationStatus, string> = { pending: "Pending", approved: "Approved", declined: "Declined", cancelled: "Cancelled" };

export function TenantStatusBadge({ status }: { status: ReservationStatus }) {
  return <span className={`tenantStatus tenantStatus-${status}`}>{labels[status]}</span>;
}
