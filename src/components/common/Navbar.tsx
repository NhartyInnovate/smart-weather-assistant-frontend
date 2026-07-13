import { CloudSun } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-slate-950/10 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:py-5">
        <a href="#top" className="flex items-center gap-2 text-white">
          <CloudSun aria-hidden />
          <span className="text-sm font-semibold tracking-wide">Smart Weather</span>
        </a>
        <nav aria-label="Primary" className="hidden gap-8 text-sm text-white/80 sm:flex">
          <a href="#features" className="transition hover:text-white">
            Features
          </a>
          <a href="#how" className="transition hover:text-white">
            How it works
          </a>
          <a href="#search" className="transition hover:text-white">
            Search
          </a>
        </nav>
      </div>
    </header>
  );
}
