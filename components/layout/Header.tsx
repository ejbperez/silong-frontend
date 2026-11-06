"use client";

import Link from "next/link";
import { useState } from "react";
import { Button, Group } from "@mantine/core";
import { List, UserCircle, X } from "@phosphor-icons/react";
import { Logo } from "@/components/brand/Logo";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return <header className="siteHeader"><div className="container headerInner"><Logo />
    <nav className="desktopNav" aria-label="Main navigation"><Link href="/properties">Find a place</Link><Link href="#how-it-works">How it works</Link><Link href="#for-landlords">For landlords</Link></nav>
    <Group gap="sm" className="headerActions"><Button component={Link} href="/login" variant="subtle" color="silong" visibleFrom="sm">Log in</Button><Button component={Link} href="/register" variant="outline" color="silong" visibleFrom="sm">Register</Button><Button component={Link} href="/register/landlord" color="silong">List your place</Button></Group>
    <button type="button" className="mobileMenu" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={26} /> : <List size={26} />}</button>
    <nav id="mobile-navigation" className={`mobileNav ${menuOpen ? "mobileNavOpen" : ""}`} aria-label="Mobile navigation"><Link href="/properties" onClick={closeMenu}>Find a place</Link><Link href="/#how-it-works" onClick={closeMenu}>How it works</Link><Link href="/#for-landlords" onClick={closeMenu}>For landlords</Link><Link href="/login" onClick={closeMenu}><UserCircle size={18} /> Log in</Link><Link href="/register" onClick={closeMenu}>Register</Link></nav>
  </div></header>;
}
