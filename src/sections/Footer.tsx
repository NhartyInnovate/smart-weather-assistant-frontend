import { Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative px-6 pb-12 pt-16 text-white/70">
      <div className="mx-auto max-w-4xl border-t border-white/10 pt-8 flex flex-col items-center text-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm font-light tracking-wide text-white/90">
            Built by <span className="font-medium text-white">NKay Labs</span>
          </p>
          <p className="text-xs text-white/50 font-light">AI Engineer • Full Stack Developer</p>
          <div className="mt-2 flex items-center gap-4">
            <a
              href="https://github.com/NhartyInnovate/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white/95 transition-colors duration-200"
              aria-label="GitHub Profile"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/nathaniel-katugwa-497121258/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white/95 transition-colors duration-200"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1.5 pt-2 border-t border-white/5 w-full max-w-md">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
            Powered by
          </p>
          <p className="text-xs text-white/40 font-light leading-relaxed">
            React • TypeScript • FastAPI • Framer Motion • Open-Meteo • Cloudflare • Render
          </p>
        </div>
      </div>
    </footer>
  );
}
