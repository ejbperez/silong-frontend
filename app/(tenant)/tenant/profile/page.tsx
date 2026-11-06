import type { Metadata } from "next";
import { TenantPageIntro } from "@/features/tenant/components/TenantPageIntro";
export const metadata: Metadata = { title: "My profile | Silong", description: "Manage your Silong tenant profile." };
export default function TenantProfilePage() { return <TenantPageIntro eyebrow="About you" title="My profile" description="Your profile controls will appear here as the profile milestone is completed." />; }
