import Link from "next/link";
import { HouseSimple } from "@phosphor-icons/react/dist/ssr";

export function Logo({ light = false }: { light?: boolean }) { return <Link className={`logo ${light ? "logoLight" : ""}`} href="/" aria-label="Silong home"><span className="logoMark"><HouseSimple size={22} weight="fill" /></span><span>silong</span></Link>; }
