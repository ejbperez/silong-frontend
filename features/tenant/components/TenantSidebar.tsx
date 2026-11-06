"use client";

import Link from "next/link";
import { House, Heart, ClipboardText, User, Gear, ArrowSquareOut } from "@phosphor-icons/react";

const links = [
  { href: "/tenant/dashboard", label: "Dashboard", icon: House },
  { href: "/tenant/favorites", label: "My favorites", icon: Heart },
  { href: "/tenant/reservations", label: "My reservations", icon: ClipboardText },
  { href: "/tenant/profile", label: "My profile", icon: User },
  { href: "/tenant/settings", label: "Settings", icon: Gear },
];

export function TenantSidebar({ onNavigate }: { onNavigate?: () => void }) {
  return <nav className="tenantSidebar" aria-label="Tenant portal navigation">
    <div className="tenantNavSection">
      <p className="tenantNavLabel">Your space</p>
      {links.map(({ href, label, icon: Icon }) => <Link key={href} href={href} className="tenantNavLink" onClick={onNavigate}><Icon size={20} weight="duotone" />{label}</Link>)}
    </div>
    <div className="tenantNavBottom"><Link href="/properties" className="tenantNavLink" onClick={onNavigate}><ArrowSquareOut size={20} weight="duotone" />Back to marketplace</Link></div>
  </nav>;
}
