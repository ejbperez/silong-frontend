import type { Metadata } from "next";
import { TenantPageIntro } from "@/features/tenant/components/TenantPageIntro";
export const metadata: Metadata = { title: "My reservations | Silong", description: "Your Silong reservation requests." };
export default function TenantReservationsPage() { return <TenantPageIntro eyebrow="Your requests" title="My reservations" description="Your reservation requests will appear here as the reservations milestone is completed." />; }
