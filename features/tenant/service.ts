import { properties } from "@/data/properties";
import { mockFavorites, mockReservations } from "./data/tenantMockData";
import type { DashboardStatistics, Reservation, TenantProfileUpdate, TenantServiceResult } from "./types";

const temporaryResult = (message: string): Promise<TenantServiceResult> => Promise.resolve({ success: true, message });

export function getTenantDashboard(): Promise<DashboardStatistics> {
  return Promise.resolve({
    totalFavorites: mockFavorites.length,
    pendingRequests: mockReservations.filter((reservation) => reservation.status === "pending").length,
    approvedRequests: mockReservations.filter((reservation) => reservation.status === "approved").length,
    declinedRequests: mockReservations.filter((reservation) => reservation.status === "declined").length,
  });
}

export function getTenantFavorites() {
  return Promise.resolve(mockFavorites.map((favorite) => ({ ...favorite })));
}

export function removeFavorite(propertyId: string): Promise<TenantServiceResult> {
  const exists = mockFavorites.some((favorite) => favorite.propertyId === propertyId && properties.some((property) => property.id === propertyId));
  return temporaryResult(exists ? "Favorite removed for this frontend session." : "That favorite could not be found.");
}

export function getTenantReservations() {
  return Promise.resolve(mockReservations.map((reservation) => ({ ...reservation, activity: reservation.activity.map((event) => ({ ...event })) })));
}

export function getReservationById(reservationId: string): Promise<Reservation | null> {
  const reservation = mockReservations.find((item) => item.id === reservationId);
  return Promise.resolve(reservation ? { ...reservation, activity: reservation.activity.map((event) => ({ ...event })) } : null);
}

export function cancelReservation(reservationId: string, reason?: string): Promise<TenantServiceResult> {
  const reservation = mockReservations.find((item) => item.id === reservationId);
  if (!reservation) return temporaryResult("That reservation could not be found.");
  if (reservation.status !== "pending" && reservation.status !== "approved") return temporaryResult("Only pending or approved requests can be cancelled.");
  void reason;
  return temporaryResult("Cancellation recorded for this frontend session.");
}

export function updateTenantProfile(payload: TenantProfileUpdate): Promise<TenantServiceResult> {
  void payload;
  return temporaryResult("Profile changes are ready for this frontend session only.");
}
