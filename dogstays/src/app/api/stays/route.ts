import { NextResponse } from "next/server";
import { stays } from "@/lib/data/stays";

function parseBoolean(value: string | null): boolean | undefined {
  if (value == null) return undefined;
  if (["1", "true", "yes"].includes(value.toLowerCase())) return true;
  if (["0", "false", "no"].includes(value.toLowerCase())) return false;
  return undefined;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const q = searchParams.get("q")?.toLowerCase() || "";
  const minPrice = Number(searchParams.get("minPrice") || 0);
  const maxPrice = Number(searchParams.get("maxPrice") || Number.MAX_SAFE_INTEGER);
  const ratingMin = Number(searchParams.get("ratingMin") || 0);
  const allowLarge = parseBoolean(searchParams.get("allowLarge"));
  const type = searchParams.get("type");
  const amenity = searchParams.getAll("amenity");
  const featured = parseBoolean(searchParams.get("featured"));

  let filtered = stays.filter((s) => {
    const matchesQuery = q
      ? s.name.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q) ||
        s.state.toLowerCase().includes(q)
      : true;
    const matchesPrice = s.pricePerNight >= minPrice && s.pricePerNight <= maxPrice;
    const matchesRating = s.rating >= ratingMin;
    const matchesLarge = allowLarge === undefined ? true : s.allowLargeDogs === allowLarge;
    const matchesType = type ? s.type.toLowerCase() === type.toLowerCase() : true;
    const matchesFeatured = featured === undefined ? true : Boolean(s.featured) === featured;
    const matchesAmenity = amenity.length === 0 ? true : amenity.every((a) => s.amenities.includes(a));
    return (
      matchesQuery &&
      matchesPrice &&
      matchesRating &&
      matchesLarge &&
      matchesType &&
      matchesFeatured &&
      matchesAmenity
    );
  });

  const limit = Number(searchParams.get("limit") || 50);
  const offset = Number(searchParams.get("offset") || 0);
  const total = filtered.length;
  filtered = filtered.slice(offset, offset + limit);

  return NextResponse.json({ total, stays: filtered });
}