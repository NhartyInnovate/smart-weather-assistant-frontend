import { motion } from "framer-motion";
import { CloudOff } from "lucide-react";

interface Props {
  errorType?: string;
  onRetry: () => void;
}

export function ErrorCard({ errorType, onRetry }: Props) {
  let title = "We couldn't reach that city";
  let description =
    "Check spelling, search for a broader region, or try a major global city. The skies are just a keystroke away.";

  if (errorType === "CITY_NOT_FOUND") {
    title = "We couldn't find that city";
    description = "We couldn't find that city. Please check the spelling and try again.";
  } else if (errorType === "TIMEOUT") {
    title = "Search timed out";
    description = "The request took too long. Please check your internet connection and try again.";
  } else if (errorType === "NETWORK_ERROR") {
    title = "Network connection issue";
    description =
      "Unable to connect to the weather service. Please check your network and try again.";
  } else if (errorType === "BACKEND_UNAVAILABLE") {
    title = "Service unavailable";
    description = "Unable to connect to the weather service. Please try again later.";
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto max-w-md overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-3xl"
      role="alert"
      aria-live="assertive"
    >
      {/* Top micro-highlight glass line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      {/* Bobbing animated cloud offline icon */}
      <motion.div
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 text-white/80 shadow-inner"
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <CloudOff className="text-white/80" size={24} aria-hidden />
      </motion.div>

      <h3 className="mt-6 text-xl font-light tracking-tight text-white sm:text-2xl">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-white/60">{description}</p>

      <motion.button
        onClick={onRetry}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="mt-6 w-full rounded-2xl bg-white py-3 text-sm font-semibold text-slate-900 shadow-xl transition-colors hover:bg-slate-100"
      >
        Try another search
      </motion.button>
    </motion.div>
  );
}
