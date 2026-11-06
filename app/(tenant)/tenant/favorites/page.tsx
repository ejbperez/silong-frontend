import type { Metadata } from "next";
import { TenantPageIntro } from "@/features/tenant/components/TenantPageIntro";
export const metadata: Metadata = { title: "My favorites | Silong", description: "Your saved Silong properties." };
export default function TenantFavoritesPage() { return <TenantPageIntro eyebrow="Saved places" title="My favorites" description="Your saved properties will appear here as the favorites milestone is completed." />; }
