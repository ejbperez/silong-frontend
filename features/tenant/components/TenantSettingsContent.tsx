"use client";

import { useState, type FormEvent } from "react";
import { Alert, Button, PasswordInput, Stack, Switch } from "@mantine/core";
import { CheckCircle, Info, LockKey, SignOut, Trash } from "@phosphor-icons/react";
import { validatePasswordChange } from "../validation";

export function TenantSettingsContent() {
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [passwordErrors, setPasswordErrors] = useState<Partial<Record<keyof typeof passwords, string>>>({});
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [reservationNotifications, setReservationNotifications] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [feedbackColor, setFeedbackColor] = useState<"green" | "blue">("green");

  function handlePasswordSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const errors = validatePasswordChange(passwords);
    setPasswordErrors(errors);
    setFeedback("");
    if (Object.keys(errors).length) return;
    setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setFeedbackColor("green");
    setFeedback("Password changes are prepared for this frontend session only.");
  }

  function showInfo(message: string) {
    setFeedbackColor("blue");
    setFeedback(message);
  }

  return <div className="tenantSettingsPage"><div className="tenantPageIntro"><p className="sectionKicker">Account preferences</p><h2>Settings</h2><p>Manage your preferences and account options in one place.</p></div><div className="tenantSessionNotice">These controls are frontend-only previews. No password, notification preference, or account action is connected to a backend yet.</div><section className="tenantSettingsCard"><div className="tenantSettingsCardHeader"><span className="tenantSettingsIcon"><LockKey size={21} weight="duotone" /></span><div><h3>Change password</h3><p>Use a strong password to keep your account secure.</p></div></div><form onSubmit={handlePasswordSubmit} noValidate><Stack gap="md"><PasswordInput label="Current password" value={passwords.currentPassword} error={passwordErrors.currentPassword} onChange={(event) => setPasswords({ ...passwords, currentPassword: event.currentTarget.value })} required /><PasswordInput label="New password" description="Use at least 8 characters." value={passwords.newPassword} error={passwordErrors.newPassword} onChange={(event) => setPasswords({ ...passwords, newPassword: event.currentTarget.value })} required /><PasswordInput label="Confirm new password" value={passwords.confirmPassword} error={passwordErrors.confirmPassword} onChange={(event) => setPasswords({ ...passwords, confirmPassword: event.currentTarget.value })} required /><Button type="submit" color="silong" className="tenantSettingsButton">Update password</Button></Stack></form></section><section className="tenantSettingsCard"><div className="tenantSettingsCardHeader"><span className="tenantSettingsIcon"><Info size={21} weight="duotone" /></span><div><h3>Notifications</h3><p>Choose which updates you would like to preview in this session.</p></div></div><div className="tenantPreferenceList"><Switch label="Email notifications" description="Receive general updates from Silong." checked={emailNotifications} onChange={(event) => setEmailNotifications(event.currentTarget.checked)} /><Switch label="Reservation updates" description="See updates when a landlord responds to a request." checked={reservationNotifications} onChange={(event) => setReservationNotifications(event.currentTarget.checked)} /></div></section><section className="tenantSettingsCard"><div className="tenantSettingsCardHeader"><span className="tenantSettingsIcon"><LockKey size={21} weight="duotone" /></span><div><h3>Security</h3><p>Your account security information.</p></div></div><div className="tenantSecurityRows"><div><span>Account role</span><strong>Tenant</strong></div><div><span>Authentication</span><strong>Frontend demo mode</strong></div><div><span>Data storage</span><strong>Not connected</strong></div></div></section><section className="tenantSettingsCard tenantSettingsDanger"><div className="tenantSettingsCardHeader"><span className="tenantSettingsIcon"><SignOut size={21} weight="duotone" /></span><div><h3>Account actions</h3><p>These actions are placeholders until the account backend is connected.</p></div></div><div className="tenantDangerActions"><Button variant="light" color="silong" leftSection={<SignOut size={17} />} onClick={() => showInfo("Logout will be connected when authentication is implemented.")}>Log out</Button><Button variant="subtle" color="red" leftSection={<Trash size={17} />} onClick={() => showInfo("Account deletion will be connected in a future phase.")}>Delete account</Button></div></section>{feedback && <Alert color={feedbackColor} icon={feedbackColor === "green" ? <CheckCircle size={18} /> : <Info size={18} />} aria-live="polite">{feedback}</Alert>}</div>;
}
