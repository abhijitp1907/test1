import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-black/10 dark:border-white/15 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black font-bold">🐶</span>
          <span className="font-semibold tracking-tight text-lg">DogStays India</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm">
          <Link href="/search" className="hover:underline">Search</Link>
          <a href="#features" className="hover:underline">Features</a>
          <a href="#how-it-works" className="hover:underline">How it works</a>
          <a href="#" className="rounded-full border border-black/15 dark:border-white/20 px-3 py-1.5 hover:bg-black/5 dark:hover:bg-white/10">List your stay</a>
        </nav>
      </div>
    </header>
  );
}