import type { Metadata } from "next";
import { RegistrationForm } from "@/features/auth/components/RegistrationForm";
export const metadata: Metadata = { title: "Tenant registration | Silong", description: "Create your Silong tenant account." };
export default function TenantRegisterPage() { return <div><p className="eyebrow">Tenant account</p><h2 className="authHeading">Start finding your place</h2><p className="authSubtitle">Create an account to discover comfortable stays around the Philippines.</p><RegistrationForm role="tenant" /></div>; }
