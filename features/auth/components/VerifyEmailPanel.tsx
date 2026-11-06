"use client";

import Link from "next/link";
import { useState } from "react";
import { Alert, Button } from "@mantine/core";
import { EnvelopeSimple, Info } from "@phosphor-icons/react";
import { resendVerificationEmail } from "../service";

export function VerifyEmailPanel() {
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  async function resend() {
    setLoading(true);
    const result = await resendVerificationEmail("hello@example.com");
    setFeedback(result.message);
    setLoading(false);
  }

  return <div className="authVerify"><div className="authIllustration"><EnvelopeSimple size={48} weight="duotone" /></div><p>We’re checking your inbox for</p><strong className="authEmail">hello@example.com</strong><p className="authMuted">This is a frontend preview. Email delivery and verification will be connected in a future phase.</p>{feedback && <Alert color="blue" icon={<Info size={18} />} aria-live="polite">{feedback}</Alert>}<Button color="silong" fullWidth loading={loading} onClick={resend}>Resend verification email</Button><Link className="authSecondaryLink" href="/login">Change email</Link><p className="authFooterText"><Link href="/">← Back to Silong</Link></p></div>;
}
