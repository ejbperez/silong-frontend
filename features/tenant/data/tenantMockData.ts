import type { Favorite, Reservation, Tenant } from "../types";

export const mockTenant: Tenant = {
  id: "tenant-1",
  firstName: "Mika",
  lastName: "Reyes",
  email: "mika.reyes@example.com",
  mobileNumber: "0917 555 0142",
  role: "tenant",
  createdAt: "2026-01-15",
};

export const mockFavorites: Favorite[] = [
  { propertyId: "p-1", savedAt: "2026-10-28" },
  { propertyId: "p-3", savedAt: "2026-10-30" },
];

export const mockReservations: Reservation[] = [
  {
    id: "reservation-1001", reference: "SIL-2026-1001", propertyId: "p-1", roomId: "r-1", roomName: "Private room with ensuite", tenantId: mockTenant.id,
    moveInDate: "2026-12-01", occupants: 1, monthlyPrice: 12500, tenantMessage: "I work nearby and would love to learn more about the house rules and viewing schedule.", requestedAt: "2026-11-01T09:30:00+08:00", status: "pending",
    activity: [{ status: "pending", label: "Request submitted", date: "2026-11-01T09:30:00+08:00", note: "Waiting for the landlord to review your inquiry." }],
  },
  {
    id: "reservation-1002", reference: "SIL-2026-1002", propertyId: "p-2", roomId: "r-4", roomName: "Two-person bedspace", tenantId: mockTenant.id,
    moveInDate: "2026-11-15", moveOutDate: "2027-05-15", occupants: 1, monthlyPrice: 5500, tenantMessage: "I am looking for a quiet bedspace close to BGC for the next six months.", requestedAt: "2026-10-20T14:10:00+08:00", status: "approved", landlordResponse: "Your request has been accepted. Please coordinate a viewing before making any rental commitment.", landlordRespondedAt: "2026-10-21T10:45:00+08:00",
    activity: [{ status: "pending", label: "Request submitted", date: "2026-10-20T14:10:00+08:00" }, { status: "approved", label: "Request approved", date: "2026-10-21T10:45:00+08:00", note: "Approval is not a finalized rental arrangement." }],
  },
  {
    id: "reservation-1003", reference: "SIL-2026-1003", propertyId: "p-3", roomId: "r-5", roomName: "Shared bedspace", tenantId: mockTenant.id,
    moveInDate: "2026-11-20", occupants: 1, monthlyPrice: 4200, tenantMessage: "Could you let me know if the room has a dedicated study area?", requestedAt: "2026-10-12T16:20:00+08:00", status: "declined", landlordResponse: "This bedspace is currently reserved for a different move-in schedule.", landlordRespondedAt: "2026-10-13T08:15:00+08:00",
    activity: [{ status: "pending", label: "Request submitted", date: "2026-10-12T16:20:00+08:00" }, { status: "declined", label: "Request declined", date: "2026-10-13T08:15:00+08:00", note: "The landlord provided a response to your inquiry." }],
  },
  {
    id: "reservation-1004", reference: "SIL-2026-1004", propertyId: "p-4", roomId: "r-6", roomName: "Private room", tenantId: mockTenant.id,
    moveInDate: "2026-11-10", occupants: 1, monthlyPrice: 7000, tenantMessage: "I would like to ask about the commute to Venice Grand Canal Mall.", requestedAt: "2026-10-05T11:00:00+08:00", status: "cancelled", cancellationReason: "Found another place closer to work.",
    activity: [{ status: "pending", label: "Request submitted", date: "2026-10-05T11:00:00+08:00" }, { status: "cancelled", label: "Request cancelled", date: "2026-10-06T09:20:00+08:00", note: "Cancelled by the tenant." }],
  },
];
