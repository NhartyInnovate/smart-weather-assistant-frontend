import { motion } from "framer-motion";
import { Search, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";

interface Props {
  onSearch: (city: string) => void;
  disabled?: boolean;
}

export function SearchBar({ onSearch, disabled }: Props) {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSearch(trimmed);
  };

  const isButtonDisabled = disabled || value.trim().length === 0;

  return (
    <motion.form
      onSubmit={submit}
      className="flex w-full max-w-xl flex-col gap-3 sm:flex-row"
      role="search"
      aria-label="Search weather by city"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative flex-1">
        <motion.div
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/50 transition-colors"
          animate={{
            color: isFocused ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.5)",
            scale: isFocused ? 1.05 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          <Search size={18} aria-hidden />
        </motion.div>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Enter a city name..."
          aria-label="City name"
          disabled={disabled}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-12 py-4 text-base text-white placeholder:text-white/45 shadow-lg backdrop-blur-xl outline-none transition-all duration-300 focus:border-white/40 focus:bg-white/10 focus:ring-4 focus:ring-white/5 disabled:opacity-50"
        />
        {value && !disabled && (
          <button
            type="button"
            onClick={() => setValue("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-white/40 hover:text-white transition-colors text-xs"
            aria-label="Clear search query"
          >
            ✕
          </button>
        )}
      </div>
      <motion.button
        type="submit"
        disabled={isButtonDisabled}
        whileHover={{ scale: isButtonDisabled ? 1 : 1.02 }}
        whileTap={{ scale: isButtonDisabled ? 1 : 0.98 }}
        className="relative flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-white px-8 py-4 text-base font-semibold text-slate-900 shadow-xl transition-all duration-300 hover:bg-slate-100 disabled:opacity-40 disabled:hover:scale-100 disabled:bg-white"
      >
        {disabled ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            <span>Searching</span>
          </>
        ) : (
          <span>Search</span>
        )}
      </motion.button>
    </motion.form>
  );
}
