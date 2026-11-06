import type { Metadata } from "next";
import { TenantDashboardContent } from "@/features/tenant/components/TenantDashboardContent";
export const metadata: Metadata = { title: "Tenant dashboard | Silong", description: "Your Silong tenant dashboard." };
export default function TenantDashboardPage() { return <TenantDashboardContent />; }
