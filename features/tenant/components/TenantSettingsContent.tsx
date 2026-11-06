"use client";

import { useState, type FormEvent } from "react";
import { Alert, Button, PasswordInput, Stack, Switch } from "@mantine/core";
import { CheckCircle, Info, SignOut, Trash } from "@phosphor-icons/react";
import { validatePasswordChange } from "../validation";

export function TenantSettingsContent() {
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof passwords, string>>>({});
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [reservationNotifications, setReservationNotifications] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [feedbackColor, setFeedbackColor] = useState<"green" | "blue">("green");

  function handlePasswordSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validatePasswordChange(passwords);
    setErrors(nextErrors);
    setFeedback("");
    if (Object.keys(nextErrors).length) return;
    setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setFeedbackColor("green");
    setFeedback("Password changes are prepared for this frontend session only.");
  }

  function showInfo(message: string) {
    setFeedbackColor("blue");
    setFeedback(message);
  }

  return <div className="tenantSettingsPage"><div className="tenantPageIntro"><p className="sectionKicker">Account preferences</p><h2>Settings</h2><p>Manage your notifications and account access.</p></div><div className="tenantSessionNotice">These settings are frontend-only previews and are not permanently saved.</div><section className="tenantSettingsCard"><div className="tenantSettingsCardHeader"><div><h3>Preferences</h3><p>Choose which updates you want to see in this session.</p></div></div><div className="tenantPreferenceList"><Switch label="Email notifications" description="Receive general updates from Silong." checked={emailNotifications} onChange={(event) => setEmailNotifications(event.currentTarget.checked)} /><Switch label="Reservation updates" description="See when a landlord responds to your request." checked={reservationNotifications} onChange={(event) => setReservationNotifications(event.currentTarget.checked)} /></div></section><section className="tenantSettingsCard"><div className="tenantSettingsCardHeader"><div><h3>Password</h3><p>Update your password in this frontend preview.</p></div></div><form onSubmit={handlePasswordSubmit} noValidate><Stack gap="md"><PasswordInput label="Current password" value={passwords.currentPassword} error={errors.currentPassword} onChange={(event) => setPasswords({ ...passwords, currentPassword: event.currentTarget.value })} required /><PasswordInput label="New password" description="Use at least 8 characters." value={passwords.newPassword} error={errors.newPassword} onChange={(event) => setPasswords({ ...passwords, newPassword: event.currentTarget.value })} required /><PasswordInput label="Confirm new password" value={passwords.confirmPassword} error={errors.confirmPassword} onChange={(event) => setPasswords({ ...passwords, confirmPassword: event.currentTarget.value })} required /><Button type="submit" color="silong" className="tenantSettingsButton">Update password</Button></Stack></form></section><section className="tenantSettingsCard tenantSettingsActionsCard"><div className="tenantSettingsCardHeader"><div><h3>Account actions</h3><p>Account actions will be connected in a future phase.</p></div></div><div className="tenantDangerActions"><Button variant="light" color="silong" leftSection={<SignOut size={17} />} onClick={() => showInfo("Logout will be connected when authentication is implemented.")}>Log out</Button><Button variant="subtle" color="red" leftSection={<Trash size={17} />} onClick={() => showInfo("Account deletion will be connected in a future phase.")}>Delete account</Button></div></section>{feedback && <Alert color={feedbackColor} icon={feedbackColor === "green" ? <CheckCircle size={18} /> : <Info size={18} />} aria-live="polite">{feedback}</Alert>}</div>;
}
