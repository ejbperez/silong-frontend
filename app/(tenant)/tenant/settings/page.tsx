import type { Metadata } from "next";
import { TenantSettingsContent } from "@/features/tenant/components/TenantSettingsContent";
export const metadata: Metadata = { title: "Settings | Silong", description: "Manage your Silong tenant settings." };
export default function TenantSettingsPage() { return <TenantSettingsContent />; }
