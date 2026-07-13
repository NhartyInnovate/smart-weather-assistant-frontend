import { Search } from "lucide-react";
import { useState, type FormEvent } from "react";

interface Props {
  onSearch: (city: string) => void;
  disabled?: boolean;
}

export function SearchBar({ onSearch, disabled }: Props) {
  const [value, setValue] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSearch(trimmed);
  };

  return (
    <form
      onSubmit={submit}
      className="flex w-full max-w-xl flex-col gap-3 sm:flex-row"
      role="search"
      aria-label="Search weather by city"
    >
      <div className="relative flex-1">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/60"
          size={18}
          aria-hidden
        />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter a city name..."
          aria-label="City name"
          disabled={disabled}
          className="w-full rounded-2xl border border-white/20 bg-white/10 px-12 py-4 text-base text-white placeholder:text-white/50 shadow-lg backdrop-blur-xl outline-none transition focus:border-white/60 focus:bg-white/15 disabled:opacity-60"
        />
      </div>
      <button
        type="submit"
        disabled={disabled || value.trim().length === 0}
        className="rounded-2xl bg-white px-8 py-4 text-base font-semibold text-slate-900 shadow-lg transition hover:scale-[1.02] hover:bg-white/90 disabled:opacity-50 disabled:hover:scale-100"
      >
        Search
      </button>
    </form>
  );
}
