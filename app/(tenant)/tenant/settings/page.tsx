import type { Metadata } from "next";
import { TenantPageIntro } from "@/features/tenant/components/TenantPageIntro";
export const metadata: Metadata = { title: "Settings | Silong", description: "Manage your Silong tenant settings." };
export default function TenantSettingsPage() { return <TenantPageIntro eyebrow="Account preferences" title="Settings" description="Your account settings will appear here as the settings milestone is completed." />; }
