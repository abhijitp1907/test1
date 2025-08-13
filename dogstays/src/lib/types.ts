export type StayType = "Hotel" | "Homestay" | "Resort" | "Villa" | "Hostel";

export type Coordinates = {
  lat: number;
  lng: number;
};

export type Stay = {
  id: string;
  slug: string;
  name: string;
  description: string;
  city: string;
  state: string;
  country: "India";
  type: StayType;
  pricePerNight: number;
  currency: "INR";
  petFeePerNight: number;
  allowLargeDogs: boolean;
  maxPets: number;
  petPolicy: string;
  rating: number; // 0..5
  reviewCount: number;
  amenities: string[];
  tags?: string[];
  photos: string[];
  coordinates?: Coordinates;
  featured?: boolean;
};

export type BookingRequest = {
  staySlug: string;
  checkIn: string; // ISO date string
  checkOut: string; // ISO date string
  numAdults: number;
  numChildren: number;
  numPets: number;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
};

export type BookingResponse = {
  bookingId: string;
  status: "confirmed" | "pending";
  message: string;
};