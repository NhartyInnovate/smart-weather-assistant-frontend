import { motion } from "framer-motion";

const ITEMS = [
  {
    quote: "It's the first weather app I actually enjoy opening in the morning.",
    name: "Amara O.",
    role: "Designer",
  },
  {
    quote: "The theme transitions are pure magic. Feels like weather with a soul.",
    name: "Kenji T.",
    role: "Product Lead",
  },
  {
    quote: "The recommendations are strangely thoughtful. Small thing, big difference.",
    name: "Sofía R.",
    role: "Traveler",
  },
];

export function Testimonials() {
  return (
    <section className="relative px-6 py-24 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.35em] text-white/70">Loved by</p>
          <h2 className="mt-3 text-4xl font-light tracking-tight sm:text-5xl">
            People who look up.
          </h2>
        </div>

        <div className="mt-12 hidden gap-6 md:grid md:grid-cols-3">
          {ITEMS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-3xl border border-white/15 bg-white/10 p-7 backdrop-blur-xl"
            >
              <blockquote className="text-base leading-relaxed text-white/90">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-5 text-sm">
                <span className="font-semibold">{t.name}</span>{" "}
                <span className="text-white/60">· {t.role}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <div className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:hidden">
          {ITEMS.map((t) => (
            <figure
              key={t.name}
              className="min-w-[85%] shrink-0 snap-center rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl"
            >
              <blockquote className="text-base text-white/90">"{t.quote}"</blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold">{t.name}</span>{" "}
                <span className="text-white/60">· {t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
