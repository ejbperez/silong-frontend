export function TenantPageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <div className="tenantPageIntro"><p className="sectionKicker">{eyebrow}</p><h2>{title}</h2><p>{description}</p></div>;
}
