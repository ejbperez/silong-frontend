import Link from "next/link";
import { ArrowRight, Briefcase, House } from "@phosphor-icons/react/dist/ssr";

export function RegistrationTypeCard({ role, title, description, href }: { role: "tenant" | "landlord"; title: string; description: string; href: string }) {
  return (
    <Link className="authRoleCard" href={href}>
      <span className="authRoleIcon">{role === "tenant" ? <House size={26} weight="duotone" /> : <Briefcase size={26} weight="duotone" />}</span>
      <span className="authRoleText"><strong>{title}</strong><span>{description}</span></span>
      <ArrowRight size={21} aria-hidden="true" />
    </Link>
  );
}
