"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Alert, Button, Stack, TextInput } from "@mantine/core";
import { Info } from "@phosphor-icons/react";
import { forgotPassword } from "../service";
import { validateEmail, type FieldErrors } from "../validation";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<FieldErrors>({});
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateEmail({ email });
    setError(nextErrors);
    setFeedback("");
    if (Object.keys(nextErrors).length) return;
    setLoading(true);
    const result = await forgotPassword(email);
    setFeedback(result.message);
    setLoading(false);
  }

  return <form className="authForm" onSubmit={handleSubmit} noValidate><Stack gap="md"><TextInput label="Email address" placeholder="you@example.com" type="email" value={email} error={error.email} onChange={(event) => setEmail(event.currentTarget.value)} required />{feedback && <Alert color="blue" icon={<Info size={18} />} aria-live="polite">{feedback}</Alert>}<Button type="submit" color="silong" fullWidth loading={loading}>Continue</Button><p className="authFooterText"><Link href="/login">← Back to login</Link></p></Stack></form>;
}
