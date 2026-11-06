import type { LoginCredentials, RegistrationData } from "./types";

export type AuthField = keyof LoginCredentials | keyof RegistrationData;
export type FieldErrors = Partial<Record<AuthField, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobilePattern = /^[0-9+()\-\s]{7,20}$/;

export function validateLogin(values: LoginCredentials): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.email.trim()) errors.email = "Enter your email address.";
  else if (!emailPattern.test(values.email.trim())) errors.email = "Enter a valid email address.";
  if (!values.password) errors.password = "Enter your password.";
  return errors;
}

export function validateEmail(values: Pick<RegistrationData, "email">): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.email.trim()) errors.email = "Enter your email address.";
  else if (!emailPattern.test(values.email.trim())) errors.email = "Enter a valid email address.";
  return errors;
}

export function validateRegistration(values: RegistrationData): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.firstName.trim()) errors.firstName = "Enter your first name.";
  if (!values.lastName.trim()) errors.lastName = "Enter your last name.";
  Object.assign(errors, validateEmail(values));
  if (!values.mobileNumber.trim()) errors.mobileNumber = "Enter your mobile number.";
  else if (!mobilePattern.test(values.mobileNumber.trim())) errors.mobileNumber = "Enter a valid mobile number.";
  if (!values.password) errors.password = "Create a password.";
  else if (values.password.length < 8) errors.password = "Use at least 8 characters.";
  if (!values.confirmPassword) errors.confirmPassword = "Confirm your password.";
  else if (values.password !== values.confirmPassword) errors.confirmPassword = "Passwords do not match.";
  if (!values.acceptedTerms) errors.acceptedTerms = "Accept the terms to continue.";
  return errors;
}
