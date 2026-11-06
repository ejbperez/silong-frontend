import type { Metadata } from "next";
import { RegistrationForm } from "@/features/auth/components/RegistrationForm";
export const metadata: Metadata = { title: "Landlord registration | Silong", description: "Create your Silong landlord account." };
export default function LandlordRegisterPage() { return <div><p className="eyebrow">Landlord account</p><h2 className="authHeading">Make room for someone’s next chapter</h2><p className="authSubtitle">Create your account to prepare your space for future listing. Property details and verification come later.</p><RegistrationForm role="landlord" /></div>; }
