import type { Metadata } from "next";
import { TenantFavoritesContent } from "@/features/tenant/components/TenantFavoritesContent";
export const metadata: Metadata = { title: "My favorites | Silong", description: "Your saved Silong properties." };
export default function TenantFavoritesPage() { return <TenantFavoritesContent />; }
