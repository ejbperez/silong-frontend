import { Suspense } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PropertySearch } from "@/features/properties/PropertySearch";

export const metadata = { title: "Find a place | Silong", description: "Browse boarding houses, rooms, and bedspaces in Taguig City." };

export default function PropertiesPage() { return <><Header /><main className="listingPage"><Suspense fallback={<div className="listingLoading container">Loading places…</div>}><PropertySearch /></Suspense></main><Footer /></>; }
