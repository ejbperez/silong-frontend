import type { Property } from "@/types/property";

export type ReservationStatus = "pending" | "approved" | "declined" | "cancelled";

export interface Tenant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  role: "tenant";
  avatarUrl?: string;
  createdAt: string;
}

export interface Favorite {
  propertyId: Property["id"];
  savedAt: string;
}

export interface ReservationActivity {
  status: ReservationStatus;
  label: string;
  date: string;
  note?: string;
}

export interface Reservation {
  id: string;
  reference: string;
  propertyId: Property["id"];
  roomId: string;
  roomName: string;
  tenantId: Tenant["id"];
  moveInDate: string;
  moveOutDate?: string;
  occupants: number;
  monthlyPrice: number;
  tenantMessage: string;
  requestedAt: string;
  status: ReservationStatus;
  landlordResponse?: string;
  landlordRespondedAt?: string;
  cancellationReason?: string;
  activity: ReservationActivity[];
}

export interface DashboardStatistics {
  totalFavorites: number;
  pendingRequests: number;
  approvedRequests: number;
  declinedRequests: number;
}

export interface TenantProfileUpdate {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  avatarUrl?: string;
}

export interface TenantServiceResult {
  success: boolean;
  message: string;
}
