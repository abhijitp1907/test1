import Image from "next/image";
import { notFound } from "next/navigation";
import { getStayBySlugOrId } from "@/lib/data/stays";
import BookingForm from "@/components/BookingForm";

export default async function StayDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const stay = getStayBySlugOrId(slug);
  if (!stay) return notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-4 gap-2">
            <div className="relative col-span-4 sm:col-span-2 aspect-[4/3] rounded-xl overflow-hidden">
              <Image src={stay.photos[0]} alt={stay.name} fill className="object-cover" />
            </div>
            {stay.photos.slice(1, 5).map((src, idx) => (
              <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image src={src} alt={`${stay.name} photo ${idx + 2}`} fill className="object-cover" />
              </div>
            ))}
          </div>

          <h1 className="mt-6 text-2xl font-semibold">{stay.name}</h1>
          <p className="text-foreground/70">{stay.city}, {stay.state}</p>

          <div className="mt-4 inline-flex items-center gap-2 text-sm">
            <span className="rounded-full bg-black/10 dark:bg-white/10 px-2 py-1">{stay.type}</span>
            <span className="rounded-full bg-black/10 dark:bg-white/10 px-2 py-1">⭐ {stay.rating.toFixed(1)} ({stay.reviewCount})</span>
            <span className="rounded-full bg-black/10 dark:bg-white/10 px-2 py-1">{stay.allowLargeDogs ? "Large dogs allowed" : "Small/medium only"}</span>
          </div>

          <p className="mt-6 leading-relaxed max-w-2xl">{stay.description}</p>

          <h2 className="mt-8 font-semibold">Amenities</h2>
          <ul className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-foreground/80">
            {stay.amenities.map((a) => (
              <li key={a} className="flex items-center gap-2">• {a}</li>
            ))}
          </ul>

          <h2 className="mt-8 font-semibold">Pet policy</h2>
          <p className="mt-2 text-foreground/80 max-w-2xl">{stay.petPolicy}</p>
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-24 rounded-xl border border-black/10 dark:border-white/15 p-4">
            <div className="flex items-baseline gap-2">
              <div className="text-2xl font-semibold">₹{stay.pricePerNight.toLocaleString("en-IN")}</div>
              <div className="text-foreground/70">/ night</div>
            </div>
            <div className="text-sm text-foreground/70">Pet fee ₹{stay.petFeePerNight.toLocaleString("en-IN")}/night</div>

            <div className="mt-4">
              <BookingForm staySlug={stay.slug} />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}