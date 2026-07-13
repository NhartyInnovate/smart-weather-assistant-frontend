import { motion } from "framer-motion";
import { Activity, Palette, Sparkles } from "lucide-react";

const FEATURES = [
  {
    icon: Activity,
    title: "Live Weather",
    body: "Real-time conditions pulled the moment you search, so you're always current.",
  },
  {
    icon: Palette,
    title: "Dynamic Themes",
    body: "The interface transforms to match the sky above — sun, storm, snow or fog.",
  },
  {
    icon: Sparkles,
    title: "Smart Recommendations",
    body: "Personal, actionable advice tailored to what the weather is actually doing.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative px-6 py-24 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.35em] text-white/70">Features</p>
          <h2 className="mt-3 text-4xl font-light tracking-tight sm:text-5xl">
            Weather, reimagined.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-3xl border border-white/15 bg-white/10 p-8 backdrop-blur-xl"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
                <f.icon aria-hidden />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
