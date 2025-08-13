import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 dark:border-white/15 mt-16">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-foreground/70 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} DogStays India. All rights reserved.</p>
        <p>
          Built for dog lovers. <Link className="underline" href="/">Book pet-friendly stays</Link> across India.
        </p>
      </div>
    </footer>
  );
}