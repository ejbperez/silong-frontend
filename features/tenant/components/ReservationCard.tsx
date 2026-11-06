import Link from "next/link";
import { ArrowRight, CalendarBlank, MapPin } from "@phosphor-icons/react";
import { ResilientImage } from "@/components/media/ResilientImage";
import { properties } from "@/data/properties";
import type { Reservation } from "../types";

import { TenantStatusBadge } from "./TenantStatusBadge";

export function ReservationCard({ reservation }: { reservation: Reservation }) {
  const property = properties.find((item) => item.id === reservation.propertyId);
  if (!property) return null;
  return <article className="tenantReservationCard"><div className="tenantReservationImage"><ResilientImage src={property.image} alt={`${property.name} accommodation`} fill sizes="(max-width: 700px) 100vw, 220px" unoptimized /></div><div className="tenantReservationBody"><div className="tenantReservationTop"><TenantStatusBadge status={reservation.status} /><span className="tenantReservationReference">{reservation.reference}</span></div><h3>{property.name}</h3><p className="tenantReservationLocation"><MapPin size={15} /> {property.barangay}, {property.city}</p><div className="tenantReservationMeta"><span>{reservation.roomName}</span><span><CalendarBlank size={15} /> Move-in {reservation.moveInDate}</span></div><Link className="tenantInlineLink" href={`/tenant/reservations/${reservation.id}`}>View request <ArrowRight size={16} /></Link></div></article>;
}
