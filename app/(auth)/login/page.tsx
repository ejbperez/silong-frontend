import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/components/LoginForm";
export const metadata: Metadata = { title: "Log in | Silong", description: "Log in to your Silong account." };
export default function LoginPage() { return <div><p className="eyebrow">Welcome back</p><h2 className="authHeading">Log in to Silong</h2><p className="authSubtitle">Find your next place to feel at home.</p><LoginForm /></div>; }
