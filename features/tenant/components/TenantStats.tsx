import { ClipboardText, Heart, Hourglass, SealCheck } from "@phosphor-icons/react";

export function TenantStats({ statistics }: { statistics: { totalFavorites: number; pendingRequests: number; approvedRequests: number; declinedRequests: number } }) {
  const items = [
    { label: "Total favorites", value: statistics.totalFavorites, icon: Heart, tone: "terracotta" },
    { label: "Pending requests", value: statistics.pendingRequests, icon: Hourglass, tone: "brown" },
    { label: "Approved requests", value: statistics.approvedRequests, icon: SealCheck, tone: "sage" },
    { label: "Declined requests", value: statistics.declinedRequests, icon: ClipboardText, tone: "muted" },
  ];
  return <div className="tenantStats" aria-label="Tenant account statistics">{items.map(({ label, value, icon: Icon, tone }) => <article className="tenantStatCard" key={label}><span className={`tenantStatIcon tenantStatIcon-${tone}`}><Icon size={21} weight="duotone" /></span><div><strong>{value}</strong><span>{label}</span></div></article>)}</div>;
}
