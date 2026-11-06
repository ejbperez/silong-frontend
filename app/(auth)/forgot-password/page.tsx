import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/features/auth/components/ForgotPasswordForm";
export const metadata: Metadata = { title: "Forgot password | Silong", description: "Start the Silong password reset flow." };
export default function ForgotPasswordPage() { return <div><p className="eyebrow">Account access</p><h2 className="authHeading">Forgot your password?</h2><p className="authSubtitle">Enter your email and we’ll show you the next step.</p><ForgotPasswordForm /></div>; }
