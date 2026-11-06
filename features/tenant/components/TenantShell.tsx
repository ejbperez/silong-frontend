"use client";

import { useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { TenantHeader } from "./TenantHeader";
import { TenantSidebar } from "./TenantSidebar";

export function TenantShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return <div className="tenantShell"><aside className="tenantDesktopSidebar"><Logo /><TenantSidebar /></aside><div className="tenantMain"><TenantHeader title="Tenant portal" menuOpen={menuOpen} onMenuToggle={() => setMenuOpen((open) => !open)} /><div className={`tenantMobileSidebar ${menuOpen ? "tenantMobileSidebarOpen" : ""}`}><div className="tenantMobileBrand"><Logo light /></div><TenantSidebar onNavigate={() => setMenuOpen(false)} /></div><main className="tenantContent">{children}</main></div></div>;
}
