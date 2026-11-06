export type UserRole = "tenant" | "landlord" | "admin";

export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  role: UserRole;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
}

export type TenantRegistrationData = RegistrationData;
export type LandlordRegistrationData = RegistrationData;

export interface AuthResult {
  success: boolean;
  message: string;
}
