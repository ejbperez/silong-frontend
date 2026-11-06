import type { Metadata } from "next";
import { TenantProfileContent } from "@/features/tenant/components/TenantProfileContent";
export const metadata: Metadata = { title: "My profile | Silong", description: "Manage your Silong tenant profile." };
export default function TenantProfilePage() { return <TenantProfileContent />; }
