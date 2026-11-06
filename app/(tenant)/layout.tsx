import { Suspense } from "react";
import { TenantPortalProvider } from "@/features/tenant/TenantPortalProvider";
import { TenantShell } from "@/features/tenant/components/TenantShell";

export default function TenantLayout({ children }: { children: React.ReactNode }) {
  return <TenantPortalProvider><Suspense fallback={<div className="tenantShell"><main className="tenantContent">Loading tenant portal…</main></div>}><TenantShell>{children}</TenantShell></Suspense></TenantPortalProvider>;
}
