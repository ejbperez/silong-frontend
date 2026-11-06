import type { Property } from "@/types/property";

const images = {
  room: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=85",
  roomLight: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85",
  home: "https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=1200&q=85",
  bed: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=85",
  kitchen: "https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=1200&q=85",
  exterior: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
};

export const properties: Property[] = [
  {
    id: "p-1", slug: "the-olive-house-bgc", name: "The Olive House", city: "Taguig City", barangay: "Fort Bonifacio", address: "32nd Street, Fort Bonifacio, Taguig City",
    description: "A bright, thoughtfully managed home close to work, restaurants, and the green spaces of BGC.", image: images.home, images: [images.home, images.room, images.kitchen, images.exterior], monthlyFrom: 8500, featured: true, recentlyAdded: false, distanceLabel: "8 min from Uptown Mall", amenities: ["Wi-Fi", "Air conditioning", "Shared kitchen", "Laundry area", "24/7 security"], houseRules: ["No smoking indoors", "Visitors until 10:00 PM", "Quiet hours after 10:00 PM"], landlord: { name: "Mara Santos", initials: "MS", responseRate: 98, verified: true },
    rooms: [
      { id: "r-1", name: "Private room with ensuite", type: "Private room", price: 12500, capacity: 1, availableUnits: 1, genderPolicy: "Any gender", furnished: true, description: "A furnished room with a private bathroom and generous natural light." },
      { id: "r-2", name: "Shared room", type: "Shared room", price: 8500, capacity: 2, availableUnits: 1, genderPolicy: "Any gender", furnished: true, description: "Comfortable shared living with two individual beds and storage." },
    ],
  },
  {
    id: "p-2", slug: "acacia-corner-kembo", name: "Acacia Corner", city: "Taguig City", barangay: "Pembo", address: "Acacia Avenue, Pembo, Taguig City",
    description: "A calm and affordable space for students and young professionals, with everything you need nearby.", image: images.roomLight, images: [images.roomLight, images.bed, images.kitchen, images.home], monthlyFrom: 5500, featured: true, recentlyAdded: true, distanceLabel: "12 min from Market! Market!", amenities: ["Wi-Fi", "Study area", "Shared kitchen", "Water included", "CCTV"], houseRules: ["No pets", "No smoking indoors", "Visitors must register"], landlord: { name: "Joel Ramirez", initials: "JR", responseRate: 95, verified: true },
    rooms: [
      { id: "r-3", name: "Furnished private room", type: "Private room", price: 9000, capacity: 1, availableUnits: 1, genderPolicy: "Any gender", furnished: true, description: "A quiet private room with a desk, wardrobe, and shared bathroom." },
      { id: "r-4", name: "Two-person bedspace", type: "Bedspace", price: 5500, capacity: 2, availableUnits: 2, genderPolicy: "Female only", furnished: true, description: "One bed in a clean, airy room shared with one other resident." },
    ],
  },
  {
    id: "p-3", slug: "narra-nook-west-rembo", name: "Narra Nook", city: "Taguig City", barangay: "West Rembo", address: "Narra Road, West Rembo, Taguig City",
    description: "A welcoming boarding house with practical rooms and an easy commute to BGC and nearby campuses.", image: images.bed, images: [images.bed, images.room, images.exterior, images.kitchen], monthlyFrom: 4200, featured: false, recentlyAdded: true, distanceLabel: "15 min from BGC", amenities: ["Wi-Fi", "Common lounge", "Laundry area", "Motorcycle parking"], houseRules: ["Quiet hours after 9:00 PM", "No overnight guests", "Keep shared spaces tidy"], landlord: { name: "Lina Bautista", initials: "LB", responseRate: 92, verified: true },
    rooms: [{ id: "r-5", name: "Shared bedspace", type: "Bedspace", price: 4200, capacity: 4, availableUnits: 2, genderPolicy: "Male only", furnished: true, description: "An affordable bedspace with individual cabinets and a shared study nook." }],
  },
  {
    id: "p-4", slug: "sampaguita-residence-ususan", name: "Sampaguita Residence", city: "Taguig City", barangay: "Ususan", address: "Riverside Street, Ususan, Taguig City",
    description: "A small, peaceful residence with a home-like atmosphere and flexible room options.", image: images.exterior, images: [images.exterior, images.roomLight, images.kitchen, images.bed], monthlyFrom: 7000, featured: false, recentlyAdded: false, distanceLabel: "10 min from Venice Grand Canal", amenities: ["Wi-Fi", "Air conditioning", "Kitchen access", "Gate security"], houseRules: ["No smoking", "No pets", "Visitors until 9:00 PM"], landlord: { name: "Ramon Villanueva", initials: "RV", responseRate: 89, verified: true },
    rooms: [{ id: "r-6", name: "Private room", type: "Private room", price: 7000, capacity: 1, availableUnits: 1, genderPolicy: "Any gender", furnished: false, description: "A private, unfurnished room ready for you to make your own." }],
  },
];

export const getProperty = (slug: string) => properties.find((property) => property.slug === slug);
