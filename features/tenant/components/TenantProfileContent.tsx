"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import { Alert, Button, SimpleGrid, Stack, TextInput } from "@mantine/core";
import { Camera, CheckCircle, UserCircle } from "@phosphor-icons/react";
import { useTenantPortal } from "../TenantPortalProvider";
import { validateTenantProfile, type TenantProfileErrors } from "../validation";
import type { TenantProfileUpdate } from "../types";

function formatDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-PH", { month: "long", day: "numeric", year: "numeric" });
}

export function TenantProfileContent() {
  const { tenant, updateProfile } = useTenantPortal();
  const initialValues: TenantProfileUpdate = { firstName: tenant.firstName, lastName: tenant.lastName, mobileNumber: tenant.mobileNumber, avatarUrl: tenant.avatarUrl };
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<TenantProfileErrors>({});
  const [feedback, setFeedback] = useState("");

  useEffect(() => () => { if (values.avatarUrl?.startsWith("blob:")) URL.revokeObjectURL(values.avatarUrl); }, [values.avatarUrl]);

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    if (!file) return;
    setValues((current) => ({ ...current, avatarUrl: URL.createObjectURL(file) }));
    setFeedback("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateTenantProfile(values);
    setErrors(nextErrors);
    setFeedback("");
    if (Object.keys(nextErrors).length) return;
    updateProfile(values);
    setFeedback("Your profile changes are available for this frontend session only.");
  }

  function resetForm() {
    setValues({ firstName: tenant.firstName, lastName: tenant.lastName, mobileNumber: tenant.mobileNumber, avatarUrl: tenant.avatarUrl });
    setErrors({});
    setFeedback("");
  }

  const initials = `${tenant.firstName[0]}${tenant.lastName[0]}`;
  return <div className="tenantProfilePage"><div className="tenantPageIntro"><p className="sectionKicker">About you</p><h2>My profile</h2><p>Keep your contact information up to date so landlords know how to reach you.</p></div><div className="tenantSessionNotice">Profile changes are temporary in this frontend demo and are not permanently saved.</div><form className="tenantProfileForm" onSubmit={handleSubmit} noValidate><section className="tenantProfileCard"><div className="tenantProfileCardHeader"><div><h3>Profile information</h3><p>These details help personalize your Silong experience.</p></div><div className="tenantProfileAvatarWrap">{values.avatarUrl ? <Image src={values.avatarUrl} alt="Profile preview" width={78} height={78} unoptimized className="tenantProfileAvatarImage" /> : <span className="tenantProfileAvatarFallback">{initials || <UserCircle size={32} />}</span>}<label className="tenantAvatarUpload" htmlFor="profile-photo"><Camera size={16} /> Change photo</label><input id="profile-photo" type="file" accept="image/png,image/jpeg,image/webp" onChange={handleImageChange} /></div></div><Stack gap="md"><SimpleGrid cols={{ base: 1, sm: 2 }}><TextInput label="First name" value={values.firstName} error={errors.firstName} onChange={(event) => setValues({ ...values, firstName: event.currentTarget.value })} required /><TextInput label="Last name" value={values.lastName} error={errors.lastName} onChange={(event) => setValues({ ...values, lastName: event.currentTarget.value })} required /></SimpleGrid><TextInput label="Mobile number" type="tel" value={values.mobileNumber} error={errors.mobileNumber} onChange={(event) => setValues({ ...values, mobileNumber: event.currentTarget.value })} required /><SimpleGrid cols={{ base: 1, sm: 2 }}><TextInput label="Email address" value={tenant.email} readOnly description="Email cannot be changed in the frontend demo." /><TextInput label="Account role" value="Tenant" readOnly /></SimpleGrid><TextInput label="Member since" value={formatDate(tenant.createdAt)} readOnly /></Stack></section>{feedback && <Alert color="green" icon={<CheckCircle size={18} />} aria-live="polite">{feedback}</Alert>}<div className="tenantProfileActions"><Button type="button" variant="default" onClick={resetForm}>Cancel changes</Button><Button type="submit" color="silong">Save changes</Button></div></form></div>;
}
