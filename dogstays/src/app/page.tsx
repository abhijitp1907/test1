import SearchBar from "@/components/SearchBar";
import StayCard from "@/components/StayCard";
import { stays } from "@/lib/data/stays";

export default function Home() {
  const featured = stays.filter((s) => s.featured).slice(0, 6);

  return (
    <div>
      <section className="bg-[radial-gradient(50%_50%_at_50%_0%,rgba(0,0,0,.06),rgba(0,0,0,0))] dark:bg-[radial-gradient(50%_50%_at_50%_0%,rgba(255,255,255,.12),rgba(255,255,255,0))]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight max-w-3xl">
            Book pet-friendly stays across India
          </h1>
          <p className="mt-3 text-foreground/70 max-w-2xl">
            Hotels, homestays, and resorts that welcome dogs. Find places with pet policies that actually work for you.
          </p>
          <div className="mt-6">
            <SearchBar />
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-xl font-semibold">Featured stays</h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((stay) => (
            <StayCard key={stay.id} stay={stay} />
          ))}
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-xl font-semibold">How it works</h2>
        <ol className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-foreground/80">
          <li className="rounded-xl border border-black/10 dark:border-white/15 p-4">
            1. Search by city or state and find stays with clear pet policies.
          </li>
          <li className="rounded-xl border border-black/10 dark:border-white/15 p-4">
            2. Read details like pet fees, size limits, and amenities.
          </li>
          <li className="rounded-xl border border-black/10 dark:border-white/15 p-4">
            3. Book instantly with a simple form. Receive instant confirmation.
          </li>
        </ol>
      </section>
    </div>
  );
}
