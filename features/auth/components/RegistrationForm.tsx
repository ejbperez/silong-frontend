"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Alert, Button, Checkbox, PasswordInput, SimpleGrid, Stack, TextInput } from "@mantine/core";
import { CheckCircle, Info } from "@phosphor-icons/react";
import { registerLandlord, registerTenant } from "../service";
import type { RegistrationData, UserRole } from "../types";
import { validateRegistration, type FieldErrors } from "../validation";

const initialValues: RegistrationData = { firstName: "", lastName: "", email: "", mobileNumber: "", password: "", confirmPassword: "", acceptedTerms: false };

export function RegistrationForm({ role }: { role: Exclude<UserRole, "admin"> }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const isLandlord = role === "landlord";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateRegistration(values);
    setErrors(nextErrors);
    setFeedback("");
    if (Object.keys(nextErrors).length) return;
    setLoading(true);
    const result = await (isLandlord ? registerLandlord(values) : registerTenant(values));
    setFeedback(result.message);
    setComplete(result.success);
    setLoading(false);
  }

  const update = (field: keyof RegistrationData, value: string | boolean) => setValues((current) => ({ ...current, [field]: value }));

  if (complete) return <div className="authSuccess"><Alert color="green" icon={<CheckCircle size={20} />} title="Ready for the next step" aria-live="polite">{feedback}</Alert><Button component={Link} href="/login" color="silong" fullWidth>Continue to login</Button></div>;

  return <form className="authForm" onSubmit={handleSubmit} noValidate>
    <Stack gap="md">
      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        <TextInput label="First name" placeholder="Juan" value={values.firstName} error={errors.firstName} onChange={(event) => update("firstName", event.currentTarget.value)} required />
        <TextInput label="Last name" placeholder="Dela Cruz" value={values.lastName} error={errors.lastName} onChange={(event) => update("lastName", event.currentTarget.value)} required />
      </SimpleGrid>
      <TextInput label="Email address" placeholder="you@example.com" type="email" value={values.email} error={errors.email} onChange={(event) => update("email", event.currentTarget.value)} required />
      <TextInput label="Mobile number" placeholder="09XX XXX XXXX" type="tel" value={values.mobileNumber} error={errors.mobileNumber} onChange={(event) => update("mobileNumber", event.currentTarget.value)} required />
      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        <PasswordInput label="Password" placeholder="At least 8 characters" value={values.password} error={errors.password} onChange={(event) => update("password", event.currentTarget.value)} required />
        <PasswordInput label="Confirm password" placeholder="Repeat your password" value={values.confirmPassword} error={errors.confirmPassword} onChange={(event) => update("confirmPassword", event.currentTarget.value)} required />
      </SimpleGrid>
      <Checkbox label={<span>I agree to the <a href="#terms">Terms and Conditions</a> and <a href="#privacy">Privacy Policy</a>.</span>} checked={values.acceptedTerms} error={errors.acceptedTerms} onChange={(event) => update("acceptedTerms", event.currentTarget.checked)} />
      {feedback && <Alert color="blue" icon={<Info size={18} />} aria-live="polite">{feedback}</Alert>}
      <Button type="submit" color="silong" fullWidth loading={loading}>{isLandlord ? "Create landlord account" : "Create tenant account"}</Button>
      <p className="authFooterText">Already have an account? <Link href="/login">Log in</Link></p>
    </Stack>
  </form>;
}
