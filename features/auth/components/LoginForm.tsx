"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Alert, Button, Checkbox, PasswordInput, Stack, TextInput } from "@mantine/core";
import { Info } from "@phosphor-icons/react";
import { login } from "../service";
import type { LoginCredentials } from "../types";
import { validateLogin, type FieldErrors } from "../validation";

const initialValues: LoginCredentials = { email: "", password: "", rememberMe: false };

export function LoginForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateLogin(values);
    setErrors(nextErrors);
    setFeedback("");
    if (Object.keys(nextErrors).length) return;
    setLoading(true);
    const result = await login(values);
    setFeedback(result.message);
    setLoading(false);
  }

  return <form className="authForm" onSubmit={handleSubmit} noValidate>
    <Stack gap="md">
      <TextInput label="Email address" placeholder="you@example.com" type="email" value={values.email} error={errors.email} onChange={(event) => setValues({ ...values, email: event.currentTarget.value })} required />
      <PasswordInput label="Password" placeholder="Your password" value={values.password} error={errors.password} onChange={(event) => setValues({ ...values, password: event.currentTarget.value })} required />
      <div className="authFormRow"><Checkbox label="Remember me" checked={values.rememberMe} onChange={(event) => setValues({ ...values, rememberMe: event.currentTarget.checked })} /><Link href="/forgot-password">Forgot password?</Link></div>
      {feedback && <Alert color="blue" icon={<Info size={18} />} aria-live="polite">{feedback}</Alert>}
      <Button type="submit" color="silong" fullWidth loading={loading}>Log in</Button>
      <p className="authFooterText">New to Silong? <Link href="/register">Create an account</Link></p>
    </Stack>
  </form>;
}
