import Image from "next/image";
import Link from "next/link";
import { Stay } from "@/lib/types";

export default function StayCard({ stay }: { stay: Stay }) {
  return (
    <Link
      href={`/stays/${stay.slug}`}
      className="group rounded-xl overflow-hidden border border-black/10 dark:border-white/15 hover:shadow-lg transition-shadow bg-white dark:bg-black"
    >
      <div className="relative aspect-[16/10]">
        <Image
          src={stay.photos[0]}
          alt={stay.name}
          fill
          className="object-cover group-hover:scale-[1.02] transition-transform"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/70 text-white text-xs px-2 py-1">
          <span>{stay.type}</span>
          {stay.allowLargeDogs ? (
            <span className="opacity-90">• Large dogs ok</span>
          ) : (
            <span className="opacity-90">• Small/medium</span>
          )}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-semibold truncate">{stay.name}</h3>
          <div className="text-sm text-foreground/70">⭐ {stay.rating.toFixed(1)}</div>
        </div>
        <p className="text-sm text-foreground/70 truncate">
          {stay.city}, {stay.state}
        </p>
        <div className="mt-2 flex items-baseline gap-1">
          <div className="font-semibold">₹{stay.pricePerNight.toLocaleString("en-IN")}</div>
          <div className="text-sm text-foreground/70">/ night</div>
        </div>
        <div className="mt-1 text-xs text-foreground/60">Pet fee ₹{stay.petFeePerNight.toLocaleString("en-IN")}/night</div>
      </div>
    </Link>
  );
}