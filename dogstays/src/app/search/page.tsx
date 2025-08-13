import { stays as allStays } from "@/lib/data/stays";
import StayCard from "@/components/StayCard";

function matchesQuery(s: typeof allStays[number], q: string) {
  if (!q) return true;
  const lq = q.toLowerCase();
  return (
    s.name.toLowerCase().includes(lq) ||
    s.city.toLowerCase().includes(lq) ||
    s.state.toLowerCase().includes(lq)
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const q = (sp.q as string) || "";
  const ratingMin = Number((sp.ratingMin as string) || 0);
  const minPrice = Number((sp.minPrice as string) || 0);
  const maxPrice = Number((sp.maxPrice as string) || Number.MAX_SAFE_INTEGER);

  const results = allStays.filter(
    (s) => matchesQuery(s, q) && s.rating >= ratingMin && s.pricePerNight >= minPrice && s.pricePerNight <= maxPrice
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold">Search results</h1>
      {q && <p className="text-foreground/70">for “{q}”</p>}

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {results.map((stay) => (
          <StayCard key={stay.id} stay={stay} />
        ))}
      </div>

      {results.length === 0 && (
        <p className="mt-8 text-foreground/70">No stays found. Try another location or adjust filters.</p>
      )}
    </div>
  );
}