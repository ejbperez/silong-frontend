"use client";

import { useMemo, useState } from "react";
import { CalendarBlank, ClipboardText, FunnelSimple, UsersThree } from "@phosphor-icons/react";
import { useTenantPortal } from "../TenantPortalProvider";
import type { Reservation, ReservationStatus } from "../types";
import { ReservationCard } from "./ReservationCard";
import { TenantStatusBadge } from "./TenantStatusBadge";

type Filter = "all" | ReservationStatus;
const filters: { value: Filter; label: string }[] = [{ value: "all", label: "All" }, { value: "pending", label: "Pending" }, { value: "approved", label: "Approved" }, { value: "declined", label: "Declined" }, { value: "cancelled", label: "Cancelled" }];

export function TenantReservationsContent() {
  const { reservations } = useTenantPortal();
  const [filter, setFilter] = useState<Filter>("all");
  const counts = useMemo(() => ({ all: reservations.length, pending: reservations.filter((item) => item.status === "pending").length, approved: reservations.filter((item) => item.status === "approved").length, declined: reservations.filter((item) => item.status === "declined").length, cancelled: reservations.filter((item) => item.status === "cancelled").length }), [reservations]);
  const filteredReservations = filter === "all" ? reservations : reservations.filter((reservation) => reservation.status === filter);

  return <div className="tenantReservationsPage"><div className="tenantPageIntro"><p className="sectionKicker">Your requests</p><h2>My reservations</h2><p>Review your inquiries and keep track of every conversation with a landlord.</p></div><div className="tenantReservationSummary">{filters.map(({ value, label }) => <div className="tenantReservationSummaryItem" key={value}><span>{label}</span><strong>{counts[value]}</strong></div>)}</div><div className="tenantReservationFilters" aria-label="Filter reservations">{filters.map(({ value, label }) => <button type="button" key={value} className={`tenantFilterButton ${filter === value ? "tenantFilterButtonActive" : ""}`} aria-pressed={filter === value} onClick={() => setFilter(value)}><FunnelSimple size={15} />{label}<span>{counts[value]}</span></button>)}</div>{filteredReservations.length ? <div className="tenantReservationList">{filteredReservations.map((reservation) => <ReservationListCard key={reservation.id} reservation={reservation} />)}</div> : <div className="tenantReservationEmpty"><ClipboardText size={34} weight="duotone" /><h3>No {filter === "all" ? "reservation" : filter} requests</h3><p>There are no requests matching this filter yet.</p></div>}</div>;
}

function ReservationListCard({ reservation }: { reservation: Reservation }) {
  return <div className="tenantReservationListCard"><ReservationCard reservation={reservation} /><div className="tenantReservationDetails"><span><TenantStatusBadge status={reservation.status} /></span><span><ClipboardText size={15} /> {reservation.reference}</span><span><CalendarBlank size={15} /> Requested {formatDate(reservation.requestedAt)}</span><span><UsersThree size={15} /> {reservation.occupants} occupant{reservation.occupants === 1 ? "" : "s"}</span><strong>₱{reservation.monthlyPrice.toLocaleString()} <small>/ month</small></strong></div></div>;
}

function formatDate(value: string) {
  const [year, month, day] = value.slice(0, 10).split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" });
}
