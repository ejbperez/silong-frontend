"use client";

import Link from "next/link";
import { useState } from "react";
import { Alert, Button, Group, Modal, Textarea } from "@mantine/core";
import { ArrowLeft, CalendarBlank, ChatCircleText, MapPin, UsersThree } from "@phosphor-icons/react";
import { ResilientImage } from "@/components/media/ResilientImage";
import { properties } from "@/data/properties";
import { cancelReservation as cancelReservationService } from "../service";
import { useTenantPortal } from "../TenantPortalProvider";
import { ReservationTimeline } from "./ReservationTimeline";
import { TenantStatusBadge } from "./TenantStatusBadge";

function formatDate(value?: string) {
  if (!value) return "Not provided";
  const [year, month, day] = value.slice(0, 10).split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" });
}

export function TenantReservationDetailsContent({ reservationId }: { reservationId: string }) {
  const { reservations, cancelReservation } = useTenantPortal();
  const reservation = reservations.find((item) => item.id === reservationId);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [feedback, setFeedback] = useState("");
  if (!reservation) return <Alert color="red">This reservation is no longer available in the current session.</Alert>;
  const currentReservation = reservation;
  const property = properties.find((item) => item.id === reservation.propertyId);
  if (!property) return <Alert color="red">The property connected to this reservation could not be found.</Alert>;
  const canCancel = reservation.status === "pending" || reservation.status === "approved";

  async function confirmCancellation() {
    const result = await cancelReservationService(currentReservation.id, reason.trim() || undefined);
    if (result.success) {
      cancelReservation(currentReservation.id, reason.trim() || undefined);
      setConfirmOpen(false);
      setFeedback("This request was cancelled for the current frontend session.");
      setReason("");
    } else {
      setFeedback(result.message);
    }
  }

  return <div className="tenantReservationDetailsPage"><Link className="tenantBackLink" href="/tenant/reservations"><ArrowLeft size={16} /> Back to reservations</Link><div className="tenantDetailsHeader"><div><p className="sectionKicker">Request details</p><h2>{property.name}</h2><p className="tenantDetailReference">{reservation.reference}</p></div><TenantStatusBadge status={reservation.status} /></div>{feedback && <Alert color={reservation.status === "cancelled" ? "green" : "red"} onClose={() => setFeedback("")} withCloseButton>{feedback}</Alert>}<div className="tenantDetailsLayout"><div className="tenantDetailsMain"><div className="tenantDetailsProperty"><div className="tenantDetailsImage"><ResilientImage src={property.image} alt={`${property.name} accommodation`} fill sizes="(max-width: 800px) 100vw, 420px" unoptimized /></div><div><h3>{property.name}</h3><p><MapPin size={16} /> {property.address}</p><strong>₱{reservation.monthlyPrice.toLocaleString()} <small>/ month</small></strong></div></div><div className="tenantDetailsFacts"><span><CalendarBlank size={18} /><b>Move-in</b>{formatDate(reservation.moveInDate)}</span><span><CalendarBlank size={18} /><b>Move-out</b>{formatDate(reservation.moveOutDate)}</span><span><UsersThree size={18} /><b>Occupants</b>{reservation.occupants}</span></div><section className="tenantDetailsSection"><h3>Room details</h3><p>{reservation.roomName}</p><p className="tenantMuted">The landlord will confirm final arrangements separately. Approval does not finalize a rental agreement.</p></section><section className="tenantDetailsSection"><h3><ChatCircleText size={20} /> Your message</h3><p className="tenantMessage">{reservation.tenantMessage}</p></section>{reservation.landlordResponse && <section className="tenantDetailsSection"><h3>Landlord response</h3><p className="tenantMessage">{reservation.landlordResponse}</p>{reservation.landlordRespondedAt && <small className="tenantMuted">Responded {formatDate(reservation.landlordRespondedAt)}</small>}</section>}<section className="tenantDetailsSection"><h3>Activity</h3><ReservationTimeline activity={reservation.activity} /></section></div><aside className="tenantDetailsAside"><h3>Request actions</h3>{canCancel ? <><p className="tenantMuted">You can cancel this {reservation.status} request. This change is temporary in the demo session.</p><Button color="red" variant="light" fullWidth onClick={() => setConfirmOpen(true)}>Cancel request</Button></> : <p className="tenantMuted">No further actions are available for a {reservation.status} request.</p>}</aside></div><Modal opened={confirmOpen} onClose={() => setConfirmOpen(false)} title="Cancel this request?" centered><p className="tenantModalCopy">This will mark the request as cancelled in the current frontend session.</p><Textarea label="Cancellation reason (optional)" placeholder="Tell us why you are cancelling" value={reason} onChange={(event) => setReason(event.currentTarget.value)} autosize minRows={3} /><Group justify="flex-end" mt="lg"><Button variant="default" onClick={() => setConfirmOpen(false)}>Keep request</Button><Button color="red" onClick={confirmCancellation}>Confirm cancellation</Button></Group></Modal></div>;
}
