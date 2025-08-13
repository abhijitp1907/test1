"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const popularCities = [
  "Goa",
  "Bengaluru",
  "Mumbai",
  "Jaipur",
  "Manali",
  "New Delhi",
  "Rishikesh",
  "Udaipur",
  "Puducherry",
  "Coorg",
];

export default function SearchBar() {
  const router = useRouter();
  const today = new Date().toISOString().slice(0, 10);
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState<string>(today);
  const [checkOut, setCheckOut] = useState<string>("");
  const [numPets, setNumPets] = useState<number>(1);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set("q", location);
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    if (numPets) params.set("pets", String(numPets));
    router.push(`/search?${params.toString()}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid grid-cols-1 sm:grid-cols-5 gap-2 sm:gap-3 items-end rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-black p-3"
    >
      <div className="sm:col-span-2">
        <label className="text-xs text-foreground/70">Where</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City, state or place"
          className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/15 bg-background px-3 py-2 outline-none focus:ring-2 ring-black/20 dark:ring-white/20"
          list="popular-cities"
        />
        <datalist id="popular-cities">
          {popularCities.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </div>
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
          onChange={(e) => setCheckOut(e.target.value)}
          min={checkIn}
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
      <div className="sm:col-span-1">
        <button
          type="submit"
          className="w-full rounded-lg bg-black text-white dark:bg-white dark:text-black font-medium py-2.5 hover:opacity-90"
        >
          Search
        </button>
      </div>
    </form>
  );
}