import { motion } from "framer-motion";
import { ArrowDown } from "@phosphor-icons/react";

export function Hero() {
  const scroll = () => {
    const el = document.getElementById("search");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center px-6 pt-24 text-white"
    >
      <div className="mx-auto max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-[0.35em] text-white/70 font-semibold"
        >
          Aero Weather
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 text-5xl font-light leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          Experience the weather,
          <br />
          <span className="font-semibold">not just the forecast.</span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm text-white/80"
        >
          <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur">
            Real-time Weather
          </span>
          <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur">
            Dynamic Themes
          </span>
          <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur">
            Smart Recommendations
          </span>
        </motion.div>
        <motion.button
          onClick={scroll}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-slate-900 shadow-2xl transition hover:scale-[1.03] hover:bg-white/90"
        >
          Try It Now
          <ArrowDown size={18} weight="bold" aria-hidden />
        </motion.button>
      </div>
    </section>
  );
}
