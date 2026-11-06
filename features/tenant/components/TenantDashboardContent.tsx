"use client";

import Link from "next/link";
import { ArrowRight, MagnifyingGlass } from "@phosphor-icons/react";
import { Button } from "@mantine/core";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { properties } from "@/data/properties";
import { useTenantPortal } from "../TenantPortalProvider";
import { ReservationCard } from "./ReservationCard";
import { TenantStats } from "./TenantStats";

export function TenantDashboardContent() {
  const { tenant, favorites, reservations } = useTenantPortal();
  const statistics = {
    totalFavorites: favorites.length,
    pendingRequests: reservations.filter((reservation) => reservation.status === "pending").length,
    approvedRequests: reservations.filter((reservation) => reservation.status === "approved").length,
    declinedRequests: reservations.filter((reservation) => reservation.status === "declined").length,
  };
  const recentReservations = reservations.slice(0, 3);
  const recommended = properties.filter((property) => !favorites.some((favorite) => favorite.propertyId === property.id)).slice(0, 3);

  return <div className="tenantDashboard"><section className="tenantWelcome"><div><p className="sectionKicker">Welcome home</p><h2>Good to see you, {tenant.firstName}.</h2><p>Keep track of your saved places and reservation requests in one thoughtful space.</p></div><Button component={Link} href="/properties" color="silong" leftSection={<MagnifyingGlass size={18} />}>Find a place</Button></section><TenantStats statistics={statistics} /><section className="tenantDashboardSection"><div className="tenantSectionHeading"><div><p className="sectionKicker">Keep an eye on things</p><h2>Recent activity</h2></div><Link className="tenantTextLink" href="/tenant/reservations">View all <ArrowRight size={16} /></Link></div>{recentReservations.length ? <div className="tenantReservationList">{recentReservations.map((reservation) => <ReservationCard key={reservation.id} reservation={reservation} />)}</div> : <div className="tenantDashboardEmpty"><p>No reservation activity yet.</p><Link href="/properties">Browse available places</Link></div>}</section><section className="tenantDashboardSection"><div className="tenantSectionHeading"><div><p className="sectionKicker">A few ideas for you</p><h2>Recommended places</h2></div><Link className="tenantTextLink" href="/properties">Explore all <ArrowRight size={16} /></Link></div>{recommended.length ? <div className="propertyGrid">{recommended.map((property) => <PropertyCard key={property.id} property={property} />)}</div> : <div className="tenantDashboardEmpty"><p>You have saved every available recommendation.</p><Link href="/properties">Explore all places</Link></div>}</section></div>;
}
