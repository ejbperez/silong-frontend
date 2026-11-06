"use client";

import Link from "next/link";
import { Bell, List, SignOut, UserCircle, X } from "@phosphor-icons/react";
import { Menu } from "@mantine/core";
import { useTenantPortal } from "../TenantPortalProvider";

export function TenantHeader({ title, menuOpen, onMenuToggle }: { title: string; menuOpen: boolean; onMenuToggle: () => void }) {
  const { tenant } = useTenantPortal();
  const initials = `${tenant.firstName[0]}${tenant.lastName[0]}`;
  return <header className="tenantHeader">
    <div className="tenantHeaderTitle"><button type="button" className="tenantMobileMenu" aria-label={menuOpen ? "Close tenant navigation" : "Open tenant navigation"} aria-expanded={menuOpen} onClick={onMenuToggle}>{menuOpen ? <X size={22} /> : <List size={22} />}</button><div><p className="tenantBreadcrumb">Tenant portal</p><h1>{title}</h1></div></div>
    <div className="tenantHeaderActions"><button type="button" className="tenantIconButton" aria-label="Notifications"><Bell size={21} /></button><Menu shadow="md" width={190} position="bottom-end"><Menu.Target><button type="button" className="tenantProfileButton" aria-label="Open profile menu"><span className="tenantAvatar">{initials}</span><span className="tenantProfileName">{tenant.firstName} {tenant.lastName}</span></button></Menu.Target><Menu.Dropdown><Menu.Label>Demo account</Menu.Label><Menu.Item component={Link} href="/tenant/profile" leftSection={<UserCircle size={17} />}>My profile</Menu.Item><Menu.Item leftSection={<SignOut size={17} />} onClick={() => undefined}>Log out</Menu.Item></Menu.Dropdown></Menu></div>
  </header>;
}
