import { createFileRoute } from "@tanstack/react-router";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { WeatherBackground } from "@/components/weather/WeatherBackground";
import { Navbar } from "@/components/common/Navbar";
import { Hero } from "@/sections/Hero";
import { Features } from "@/sections/Features";
import { HowItWorks } from "@/sections/HowItWorks";
import { Testimonials } from "@/sections/Testimonials";
import { WeatherSearch } from "@/sections/WeatherSearch";
import { Footer } from "@/sections/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aero Weather — Intelligent Atmospheric Feed" },
      {
        name: "description",
        content:
          "A premium weather experience with live conditions, dynamic themes and smart recommendations.",
      },
      { property: "og:title", content: "Aero Weather" },
      {
        property: "og:description",
        content: "Experience the weather, not just the forecast.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen">
        <WeatherBackground />
        <Navbar />
        <main>
          <Hero />
          <Features />
          <HowItWorks />
          <Testimonials />
          <WeatherSearch />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
