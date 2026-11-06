import type { TenantProfileUpdate } from "./types";

export type TenantProfileErrors = Partial<Record<keyof TenantProfileUpdate, string>>;
const mobilePattern = /^[0-9+()\-\s]{7,20}$/;

export function validateTenantProfile(values: TenantProfileUpdate): TenantProfileErrors {
  const errors: TenantProfileErrors = {};
  if (!values.firstName.trim()) errors.firstName = "Enter your first name.";
  if (!values.lastName.trim()) errors.lastName = "Enter your last name.";
  if (!values.mobileNumber.trim()) errors.mobileNumber = "Enter your mobile number.";
  else if (!mobilePattern.test(values.mobileNumber.trim())) errors.mobileNumber = "Enter a valid mobile number.";
  return errors;
}

export function validatePasswordChange(values: { currentPassword: string; newPassword: string; confirmPassword: string }) {
  const errors: Partial<Record<keyof typeof values, string>> = {};
  if (!values.currentPassword) errors.currentPassword = "Enter your current password.";
  if (!values.newPassword) errors.newPassword = "Enter a new password.";
  else if (values.newPassword.length < 8) errors.newPassword = "Use at least 8 characters.";
  if (!values.confirmPassword) errors.confirmPassword = "Confirm your new password.";
  else if (values.newPassword !== values.confirmPassword) errors.confirmPassword = "Passwords do not match.";
  return errors;
}
