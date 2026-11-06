import type { Metadata } from "next";
import { TenantReservationsContent } from "@/features/tenant/components/TenantReservationsContent";
export const metadata: Metadata = { title: "My reservations | Silong", description: "Your Silong reservation requests." };
export default function TenantReservationsPage() { return <TenantReservationsContent />; }
