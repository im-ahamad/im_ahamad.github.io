import { useTranslation } from "react-i18next";
import { Mail, Linkedin, User, MessageCircle, Phone, ArrowDown } from "lucide-react";
import { useEffect, useRef } from "react";
import Typed from "typed.js";

import myPhoto from "@/assets/Ahamad.jpeg";
import wechatQR from "@/assets/WeChat_QR.jpg";
import whatsappQR from "@/assets/WhatsApp_QR.jpg";
import { Button } from "@/components/ui/button";
import { useLoader } from "@/context/LoaderContext";

const Hero = () => {
  const { t } = useTranslation();
  const { show } = useLoader();
  const typedRef = useRef(null);

  const handleExternalNav = (e: React.MouseEvent, url: string, openInNewTab = true) => {
    e.preventDefault();
    show(300);
    setTimeout(() => {
      if (openInNewTab) {
        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = url;
      }
    }, 300);
  };

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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.2),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--accent)/0.16),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--gradient-end)/0.1),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,hsl(var(--gradient-start)/0.12),transparent_60%)]" />

      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary opacity-25 blur-[100px] animate-hero-orb-1" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-accent opacity-25 blur-[90px] animate-hero-orb-2" />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-purple-600 opacity-20 blur-[80px] animate-hero-orb-3" />
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full bg-emerald-500 opacity-18 blur-[85px] animate-hero-orb-4" />
      <div className="absolute bottom-1/2 left-1/4 w-48 h-48 rounded-full bg-cyan-400 opacity-20 blur-[60px] animate-hero-orb-2" />

      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,hsl(var(--foreground)/0.15)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.15)_1px,transparent_1px)] bg-[size:3rem_3rem]" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            {t("hero.badge")}
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <span className="name-gradient">
              {t("hero.title")}
            </span>
          </h1>

          <h2 className="text-2xl md:text-3xl font-semibold animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <span className="bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradientFlow_6s_ease_infinite]">
              <span ref={typedRef} />
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            {t("hero.subtitle")}
          </p>

          <p className="text-base md:text-lg text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            {t("hero.description")}
          </p>

          <div className="flex flex-wrap gap-3 justify-center pt-8 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
            <Button asChild size="lg" className="shimmer-btn gap-2 rounded-xl px-6 group">
              <a href="mailto:anmdahamadullah@gmail.com" onClick={(e) => handleExternalNav(e, "mailto:anmdahamadullah@gmail.com", false)}>
                <Mail className="h-5 w-5" />
                {t("hero.email")}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </Button>

            <Button asChild variant="outline" size="lg" className="gap-2 rounded-xl px-6 border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-[background-color,border-color] duration-300">
              <a href="https://linkedin.com/in/im-ahamad" target="_blank" rel="noreferrer" onClick={(e) => handleExternalNav(e, "https://linkedin.com/in/im-ahamad")}>
                <Linkedin className="h-5 w-5" />
                {t("hero.linkedin")}
              </a>
            </Button>

            <Button asChild variant="outline" size="lg" className="gap-2 rounded-xl px-6 border-border/50 hover:border-accent/50 hover:bg-accent/5 transition-[background-color,border-color] duration-300">
              <a href={myPhoto} target="_blank" rel="noreferrer" onClick={(e) => handleExternalNav(e, myPhoto)}>
                <User className="h-5 w-5" />
                {t("hero.photo")}
              </a>
            </Button>

            <Button asChild variant="outline" size="lg" className="gap-2 rounded-xl px-6 border-border/50 hover:border-purple-500/50 hover:bg-purple-500/5 transition-[background-color,border-color] duration-300">
              <a href={wechatQR} target="_blank" rel="noreferrer" onClick={(e) => handleExternalNav(e, wechatQR)}>
                <MessageCircle className="h-5 w-5" />
                {t("hero.wechat")}
              </a>
            </Button>

            <Button asChild variant="outline" size="lg" className="gap-2 rounded-xl px-6 border-border/50 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-[background-color,border-color] duration-300">
              <a href={whatsappQR} target="_blank" rel="noreferrer" onClick={(e) => handleExternalNav(e, whatsappQR)}>
                <Phone className="h-5 w-5" />
                {t("hero.whatsapp")}
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50 animate-bounce">
        <span className="text-xs tracking-widest uppercase">{t("hero.scroll")}</span>
        <ArrowDown className="h-4 w-4" />
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" className="w-full h-auto">
          <path d="M0 30C360 60 1080 60 1440 30V60H0V30Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
