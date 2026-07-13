import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

export function RecommendationCard({ advice }: { advice: string }) {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="mx-auto mt-6 flex w-full max-w-2xl items-start gap-4 rounded-3xl border border-white/20 bg-white/10 p-6 text-white backdrop-blur-2xl"
      aria-label="Smart recommendation"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-300/25 text-amber-200">
        <Lightbulb size={20} aria-hidden />
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-white/60">Smart recommendation</p>
        <p className="mt-1 text-base leading-relaxed text-white/95">{advice}</p>
      </div>
    </motion.aside>
  );
}
