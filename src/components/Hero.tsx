import { useTranslation } from "react-i18next";
import { Mail, Linkedin, User } from "lucide-react";
import { useEffect, useRef } from "react";
import Typed from "typed.js";

import myPhoto from "@/assets/Ahamad.jpeg";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const { t } = useTranslation();
  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ["AI Engineer", "AI Developer", "AI Researcher"],
      typeSpeed: 80,
      backSpeed: 60,
      backDelay: 1600,
      loop: true,
    });

    return () => typed.destroy();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--accent)/0.12),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--gradient-end)/0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,hsl(var(--gradient-start)/0.1),transparent_50%)]" />

      {/* Moving glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary opacity-15 blur-[120px] animate-hero-orb-1" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-accent opacity-15 blur-[100px] animate-hero-orb-2" />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-purple-600 opacity-10 blur-[90px] animate-hero-orb-3" />
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full bg-emerald-500 opacity-8 blur-[100px] animate-hero-orb-4" />
      <div className="absolute top-1/3 right-1/2 w-56 h-56 rounded-full bg-rose-500 opacity-8 blur-[80px] animate-hero-orb-1" />
      <div className="absolute bottom-1/2 left-1/4 w-48 h-48 rounded-full bg-cyan-400 opacity-10 blur-[70px] animate-hero-orb-2" />

      {/* Subtle noise overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,hsl(var(--foreground)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.3)_1px,transparent_1px)] bg-[size:3rem_3rem]" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">

          {/* Name Section */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="name-blue-style">
              {t("hero.title").split(" ").slice(0, 2).join(" ")}
            </span>
            <br />
            <span className="name-glow-animation">
              {t("hero.title").split(" ").slice(2).join(" ")}
            </span>
          </h1>

          {/* Typing Role */}
          <h2 className="text-2xl md:text-3xl font-semibold text-primary">
            <span ref={typedRef}></span>
          </h2>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            {t("hero.subtitle")}
          </p>

          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("hero.description")}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 justify-center pt-8">
            <Button
              asChild
              size="lg"
              className="gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/40"
            >
              <a href="mailto:anmdahamadullah@gmail.com">
                <Mail className="h-5 w-5" />
                {t("hero.email")}
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <a href="https://linkedin.com/in/im-ahamad" target="_blank" rel="noreferrer">
                <Linkedin className="h-5 w-5" />
                {t("hero.linkedin")}
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <a href={myPhoto} target="_blank" rel="noreferrer">
                <User className="h-5 w-5" />
                Photo
              </a>
            </Button>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground text-sm">
        ↓ Scroll
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
    </section>
  );
};

export default Hero;