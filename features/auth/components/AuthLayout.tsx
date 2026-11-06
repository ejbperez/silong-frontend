import Link from "next/link";
import { House, ShieldCheck, Sparkle } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/brand/Logo";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="authShell">
      <aside className="authBrandPanel">
        <Link href="/" aria-label="Silong home"><Logo light /></Link>
        <div className="authBrandCopy">
          <p className="eyebrow">A better place to begin</p>
          <h1>Find shelter. Feel at home.</h1>
          <p>Join a welcoming community finding comfortable and affordable places to stay across the Philippines.</p>
        </div>
        <div className="authTrustList">
          <span><House size={19} weight="duotone" /> Spaces that feel like home</span>
          <span><ShieldCheck size={19} weight="duotone" /> A thoughtful rental experience</span>
          <span><Sparkle size={19} weight="duotone" /> Made for your next chapter</span>
        </div>
      </aside>
      <section className="authMain">
        <Link className="authBackLink" href="/">← Back to Silong</Link>
        <div className="authContent">{children}</div>
      </section>
    </main>
  );
}
