"use client";

import { useState } from "react";
import { BookingRequest, BookingResponse } from "@/lib/types";

export default function BookingForm({ staySlug }: { staySlug: string }) {
  const today = new Date().toISOString().slice(0, 10);
  const [checkIn, setCheckIn] = useState<string>(today);
  const [checkOut, setCheckOut] = useState<string>("");
  const [numAdults, setNumAdults] = useState<number>(2);
  const [numChildren, setNumChildren] = useState<number>(0);
  const [numPets, setNumPets] = useState<number>(1);
  const [guestName, setGuestName] = useState<string>("");
  const [guestEmail, setGuestEmail] = useState<string>("");
  const [guestPhone, setGuestPhone] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    const payload: BookingRequest = {
      staySlug,
      checkIn,
      checkOut,
      numAdults,
      numChildren,
      numPets,
      guestName,
      guestEmail,
      guestPhone,
    };
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to book");
      const data: BookingResponse = await res.json();
      setStatus("success");
      setMessage(`Booking confirmed! ID: ${data.bookingId}`);
    } catch (err) {
      setStatus("error");
      const message = err instanceof Error ? err.message : "Something went wrong";
      setMessage(message);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-foreground/70">Check in</label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/15 bg-background px-3 py-2 outline-none focus:ring-2 ring-black/20 dark:ring-white/20"
          />
        </div>
        <div>
          <label className="text-xs text-foreground/70">Check out</label>
          <input
            type="date"
            value={checkOut}
            min={checkIn}
            onChange={(e) => setCheckOut(e.target.value)}
            className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/15 bg-background px-3 py-2 outline-none focus:ring-2 ring-black/20 dark:ring-white/20"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="text-xs text-foreground/70">Adults</label>
          <input
            type="number"
            min={1}
            value={numAdults}
            onChange={(e) => setNumAdults(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/15 bg-background px-3 py-2 outline-none focus:ring-2 ring-black/20 dark:ring-white/20"
          />
        </div>
        <div>
          <label className="text-xs text-foreground/70">Children</label>
          <input
            type="number"
            min={0}
            value={numChildren}
            onChange={(e) => setNumChildren(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/15 bg-background px-3 py-2 outline-none focus:ring-2 ring-black/20 dark:ring-white/20"
          />
        </div>
        <div>
          <label className="text-xs text-foreground/70">Pets</label>
          <input
            type="number"
            min={1}
            max={4}
            value={numPets}
            onChange={(e) => setNumPets(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/15 bg-background px-3 py-2 outline-none focus:ring-2 ring-black/20 dark:ring-white/20"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-1">
          <label className="text-xs text-foreground/70">Name</label>
          <input
            type="text"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/15 bg-background px-3 py-2 outline-none focus:ring-2 ring-black/20 dark:ring-white/20"
          />
        </div>
        <div className="sm:col-span-1">
          <label className="text-xs text-foreground/70">Email</label>
          <input
            type="email"
            value={guestEmail}
            onChange={(e) => setGuestEmail(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/15 bg-background px-3 py-2 outline-none focus:ring-2 ring-black/20 dark:ring-white/20"
          />
        </div>
        <div className="sm:col-span-1">
          <label className="text-xs text-foreground/70">Phone</label>
          <input
            type="tel"
            value={guestPhone}
            onChange={(e) => setGuestPhone(e.target.value)}
            className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/15 bg-background px-3 py-2 outline-none focus:ring-2 ring-black/20 dark:ring-white/20"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-lg bg-black text-white dark:bg-white dark:text-black font-medium py-2.5 hover:opacity-90 disabled:opacity-60"
      >
        {status === "loading" ? "Booking..." : "Book now"}
      </button>

      {status !== "idle" && (
        <div
          className={`${status === "success" ? "text-green-600" : status === "error" ? "text-red-600" : ""} text-sm`}
        >
          {message}
        </div>
      )}
    </form>
  );
}