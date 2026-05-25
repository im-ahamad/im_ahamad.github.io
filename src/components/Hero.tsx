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

      {/* CSS Effects - animations moved to index.css */}

      {/* Background & Glows */}
      <div className="absolute inset-0 gradient-tech opacity-10" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl opacity-20 animate-pulse" />

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

            {/* Photo Button */}

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

          {/* Phone - hidden for privacy */}

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