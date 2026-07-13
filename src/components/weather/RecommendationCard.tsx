import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

export function RecommendationCard({ advice }: { advice: string }) {
  return (
    <motion.aside
      initial={{ opacity: 0, scale: 0.98, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -2 }}
      className="relative mx-auto mt-6 flex w-full max-w-2xl overflow-hidden items-start gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-white backdrop-blur-3xl"
      aria-label="Smart recommendation"
    >
      {/* Top micro-highlight glass line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-400/10 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.1)]">
        {/* Ambient glow backing the bulb */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-amber-400/20 blur-sm"
          animate={{ scale: [0.9, 1.2, 0.9], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          animate={{ rotate: [0, -5, 5, -5, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Lightbulb size={20} className="relative z-10 text-amber-300" aria-hidden />
        </motion.div>
      </div>

      <div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">
          Smart Insight
        </p>
        <p className="mt-1 text-sm leading-relaxed text-white/90 font-light">{advice}</p>
      </div>
    </motion.aside>
  );
}
