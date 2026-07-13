export function Footer() {
  return (
    <footer className="relative px-6 pb-10 pt-16 text-white/70">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/15 pt-8 text-sm sm:flex-row">
        <p>Experience the weather, not just the forecast.</p>
        <p className="text-white/50">© {new Date().getFullYear()} Smart Weather Assistant</p>
      </div>
    </footer>
  );
}
