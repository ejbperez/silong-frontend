import type { Metadata } from "next";
import { VerifyEmailPanel } from "@/features/auth/components/VerifyEmailPanel";
export const metadata: Metadata = { title: "Verify your email | Silong", description: "Continue setting up your Silong account." };
export default function VerifyEmailPage() { return <div><p className="eyebrow">One more step</p><h2 className="authHeading">Check your email</h2><p className="authSubtitle">Confirm your email to continue setting up your Silong account.</p><VerifyEmailPanel /></div>; }
