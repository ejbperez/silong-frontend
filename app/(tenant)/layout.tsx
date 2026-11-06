import { TenantPortalProvider } from "@/features/tenant/TenantPortalProvider";
import { TenantShell } from "@/features/tenant/components/TenantShell";

export default function TenantLayout({ children }: { children: React.ReactNode }) {
  return <TenantPortalProvider><TenantShell>{children}</TenantShell></TenantPortalProvider>;
}
