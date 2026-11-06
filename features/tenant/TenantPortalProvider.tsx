"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { mockFavorites, mockReservations, mockTenant } from "./data/tenantMockData";
import type { Favorite, Reservation, Tenant, TenantProfileUpdate } from "./types";

interface TenantPortalContextValue {
  tenant: Tenant;
  favorites: Favorite[];
  reservations: Reservation[];
  removeFavorite: (propertyId: string) => void;
  cancelReservation: (reservationId: string, reason?: string) => void;
  updateProfile: (payload: TenantProfileUpdate) => void;
}

const TenantPortalContext = createContext<TenantPortalContextValue | null>(null);

export function TenantPortalProvider({ children }: { children: React.ReactNode }) {
  const [tenant, setTenant] = useState(mockTenant);
  const [favorites, setFavorites] = useState(mockFavorites);
  const [reservations, setReservations] = useState(mockReservations);

  const value = useMemo<TenantPortalContextValue>(() => ({
    tenant,
    favorites,
    reservations,
    removeFavorite: (propertyId) => setFavorites((current) => current.filter((favorite) => favorite.propertyId !== propertyId)),
    cancelReservation: (reservationId, reason) => setReservations((current) => current.map((reservation) => (
      reservation.id === reservationId && (reservation.status === "pending" || reservation.status === "approved")
        ? { ...reservation, status: "cancelled", cancellationReason: reason, activity: [...reservation.activity, { status: "cancelled", label: "Request cancelled", date: new Date().toISOString(), note: "Cancelled by the tenant." }] }
        : reservation
    ))),
    updateProfile: (payload) => setTenant((current) => ({ ...current, ...payload })),
  }), [tenant, favorites, reservations]);

  return <TenantPortalContext.Provider value={value}>{children}</TenantPortalContext.Provider>;
}

export function useTenantPortal() {
  const context = useContext(TenantPortalContext);
  if (!context) throw new Error("useTenantPortal must be used inside TenantPortalProvider");
  return context;
}
