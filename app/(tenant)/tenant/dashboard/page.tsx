import type { Metadata } from "next";
import { TenantPageIntro } from "@/features/tenant/components/TenantPageIntro";
export const metadata: Metadata = { title: "Tenant dashboard | Silong", description: "Your Silong tenant dashboard." };
export default function TenantDashboardPage() { return <TenantPageIntro eyebrow="Welcome home" title="Your dashboard" description="Your tenant overview will appear here as the next Phase 4 milestone is completed." />; }
