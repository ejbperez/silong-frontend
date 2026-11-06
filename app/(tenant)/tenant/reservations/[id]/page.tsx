import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getReservationById } from "@/features/tenant/service";
import { TenantReservationDetailsContent } from "@/features/tenant/components/TenantReservationDetailsContent";
export const metadata: Metadata = { title: "Reservation details | Silong", description: "View your Silong reservation request." };
export default async function TenantReservationDetailsPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; const reservation = await getReservationById(id); if (!reservation) notFound(); return <TenantReservationDetailsContent reservationId={id} />; }
