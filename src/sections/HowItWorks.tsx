import { motion } from "framer-motion";
import { Search, CloudSun, Sparkles } from "lucide-react";

const STEPS = [
  { icon: Search, title: "Search", body: "Type any city — anywhere in the world." },
  { icon: CloudSun, title: "Fetch Weather", body: "We pull the latest live conditions." },
  { icon: Sparkles, title: "Receive Smart Advice", body: "Get a thoughtful recommendation." },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative px-6 py-24 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.35em] text-white/70">How it works</p>
          <h2 className="mt-3 text-4xl font-light tracking-tight sm:text-5xl">
            Three steps to clarity.
          </h2>
        </div>
        <ol className="mt-12 grid gap-6 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative rounded-3xl border border-white/15 bg-white/10 p-8 backdrop-blur-xl"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-white/60">0{i + 1}</span>
                <div className="h-px flex-1 bg-white/15" />
              </div>
              <div className="mt-6 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
                <s.icon aria-hidden />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">{s.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
