import { CheckCircle, Clock, XCircle } from "@phosphor-icons/react";
import type { ReservationActivity } from "../types";

function formatDate(value: string) {
  const [year, month, day] = value.slice(0, 10).split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" });
}

export function ReservationTimeline({ activity }: { activity: ReservationActivity[] }) {
  return <ol className="tenantTimeline">{activity.map((event, index) => { const Icon = event.status === "declined" ? XCircle : event.status === "pending" ? Clock : CheckCircle; return <li className="tenantTimelineItem" key={`${event.status}-${event.date}-${index}`}><span className={`tenantTimelineIcon tenantTimelineIcon-${event.status}`}><Icon size={18} weight="duotone" /></span><div><strong>{event.label}</strong><time dateTime={event.date}>{formatDate(event.date)}</time>{event.note && <p>{event.note}</p>}</div></li>; })}</ol>;
}
