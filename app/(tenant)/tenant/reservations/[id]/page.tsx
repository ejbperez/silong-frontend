import type { Metadata } from "next";
import { TenantPageIntro } from "@/features/tenant/components/TenantPageIntro";
export const metadata: Metadata = { title: "Reservation details | Silong", description: "View your Silong reservation request." };
export default function TenantReservationDetailsPage() { return <TenantPageIntro eyebrow="Request details" title="Reservation details" description="Detailed reservation information will appear here as the reservations milestone is completed." />; }
