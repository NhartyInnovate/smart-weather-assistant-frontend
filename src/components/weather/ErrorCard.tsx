import { motion } from "framer-motion";
import { CloudOff } from "lucide-react";

interface Props {
  onRetry: () => void;
}

export function ErrorCard({ onRetry }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-md rounded-3xl border border-white/20 bg-white/10 p-8 text-center backdrop-blur-xl"
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
        <CloudOff className="text-white" aria-hidden />
      </div>
      <h3 className="mt-4 text-xl font-semibold text-white">We couldn't find that city</h3>
      <p className="mt-2 text-sm text-white/70">
        Try another spelling or a nearby city — the skies are just a search away.
      </p>
      <button
        onClick={onRetry}
        className="mt-6 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:bg-white/90"
      >
        Try again
      </button>
    </motion.div>
  );
}
