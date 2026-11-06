import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return <><Header /><main className="statusPage"><div className="statusCard"><p className="sectionKicker">404</p><h1>That place is hard to find.</h1><p>The page may have moved, or the property is no longer available on Silong.</p><Link className="statusButton" href="/properties">Browse available places</Link></div></main><Footer /></>;
}
