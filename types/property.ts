export type RoomType = "Private room" | "Shared room" | "Bedspace";
export type GenderPolicy = "Any gender" | "Female only" | "Male only";

export interface Landlord {
  name: string;
  initials: string;
  responseRate: number;
  verified: boolean;
}

export interface Room {
  id: string;
  name: string;
  type: RoomType;
  price: number;
  capacity: number;
  availableUnits: number;
  genderPolicy: GenderPolicy;
  furnished: boolean;
  description: string;
}

export interface Property {
  id: string;
  slug: string;
  name: string;
  city: string;
  barangay: string;
  address: string;
  description: string;
  image: string;
  images: string[];
  monthlyFrom: number;
  featured: boolean;
  recentlyAdded: boolean;
  distanceLabel: string;
  amenities: string[];
  houseRules: string[];
  landlord: Landlord;
  rooms: Room[];
}
