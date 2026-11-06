import type { AuthResult, LoginCredentials, RegistrationData } from "./types";

const frontendOnly = (message: string): Promise<AuthResult> =>
  Promise.resolve({ success: true, message });

export function login(credentials: LoginCredentials): Promise<AuthResult> {
  void credentials;
  return frontendOnly("The login connection will be added in a future phase.");
}

export function registerTenant(data: RegistrationData): Promise<AuthResult> {
  void data;
  return frontendOnly("Your registration form is ready. Account creation will be connected in a future phase.");
}

export function registerLandlord(data: RegistrationData): Promise<AuthResult> {
  void data;
  return frontendOnly("Your landlord registration form is ready. Account creation will be connected in a future phase.");
}

export function forgotPassword(email: string): Promise<AuthResult> {
  void email;
  return frontendOnly("The password reset flow is ready. Email delivery will be connected in a future phase.");
}

export function resendVerificationEmail(email: string): Promise<AuthResult> {
  void email;
  return frontendOnly("The verification email flow is ready. Email delivery will be connected in a future phase.");
}

export function logout(): Promise<void> {
  return Promise.resolve();
}
