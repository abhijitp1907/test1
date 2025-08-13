import { NextResponse } from "next/server";
import { BookingRequest, BookingResponse } from "@/lib/types";
import { getStayBySlugOrId } from "@/lib/data/stays";

export async function POST(request: Request) {
  const body = (await request.json()) as BookingRequest;

  // Minimal validation
  if (!body?.staySlug || !body?.checkIn || !body?.checkOut || !body?.guestName || !body?.guestEmail) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const stay = getStayBySlugOrId(body.staySlug);
  if (!stay) {
    return NextResponse.json({ error: "Stay not found" }, { status: 404 });
  }

  // Mock booking id
  const bookingId = `BK-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

  const response: BookingResponse = {
    bookingId,
    status: "confirmed",
    message: `Your booking at ${stay.name} is confirmed!`,
  };

  return NextResponse.json(response);
}