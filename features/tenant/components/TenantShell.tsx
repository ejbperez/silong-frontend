"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { TenantHeader } from "./TenantHeader";
import { TenantSidebar } from "./TenantSidebar";

export function TenantShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const section = pathname.split("/").filter(Boolean).pop()?.replace(/-/g, " ") ?? "dashboard";
  const title = section.charAt(0).toUpperCase() + section.slice(1);
  return <div className="tenantShell"><aside className="tenantDesktopSidebar"><Logo /><TenantSidebar /></aside><div className="tenantMain"><TenantHeader title={title} menuOpen={menuOpen} onMenuToggle={() => setMenuOpen((open) => !open)} /><div className={`tenantMobileSidebar ${menuOpen ? "tenantMobileSidebarOpen" : ""}`}><div className="tenantMobileBrand"><Logo light /></div><TenantSidebar onNavigate={() => setMenuOpen(false)} /></div><main className="tenantContent">{children}</main></div></div>;
}
