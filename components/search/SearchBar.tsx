"use client";

import { Button, TextInput } from "@mantine/core";
import { MagnifyingGlass, MapPin } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SearchBar({ compact = false, initialValue = "" }: { compact?: boolean; initialValue?: string }) { const router = useRouter(); const [location, setLocation] = useState(initialValue); const submit = (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); const query = location.trim() ? `?location=${encodeURIComponent(location.trim())}` : ""; router.push(`/properties${query}`); }; return <form className={`searchBar ${compact ? "searchBarCompact" : ""}`} onSubmit={submit} role="search"><TextInput aria-label="Search by location" label={!compact ? "Where do you want to stay?" : undefined} placeholder="Search a barangay or landmark" value={location} onChange={(event) => setLocation(event.currentTarget.value)} leftSection={<MapPin size={20} />} className="searchInput" /><Button type="submit" size={compact ? "sm" : "md"} leftSection={<MagnifyingGlass size={18} />}>Search</Button></form>; }
