import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

const certifications = [
  {
    title: "Programming for Everybody (Getting Started with Python)",
    platform: "Coursera",
    instructors: "University of Michigan",
    duration: "Self-paced",
    date: "2022",
    url: "https://www.coursera.org/learn/python",
    reference: "",
  },
  {
    title: "Learn Core Python, Numpy and Pandas",
    platform: "Udemy",
    instructors: "Vishal Kumar Singh",
    duration: "3 total hours",
    date: "2022",
    url: "https://ude.my/UC-32b0267e-654d-45ac-b835-2fedf4d6a7b6",
    reference: "0004",
  },
  {
    title: "Complete Machine Learning & Data Science Bootcamp 2022",
    platform: "Udemy",
    instructors: "Andrei Neagoie & Daniel Bourke",
    duration: "44 hours",
    date: "2022",
    url: "https://www.udemy.com/certificate/UC-e088f93e-d62e-4aa5-a148-090eb4158da0/",
    reference: "0004",
  },
];

const colors = [
  "from-indigo-500 via-purple-500 to-pink-500",
  "from-green-500 via-emerald-500 to-teal-400",
  "from-amber-500 via-yellow-500 to-orange-400",
];

const Certifications = () => {
  const { t } = useTranslation();

  const bubbles = useMemo(
    () =>
      [...Array(8)].map((_, i) => ({
        size: Math.floor(Math.random() * 40) + 15,
        top: Math.floor(Math.random() * 100),
        left: Math.floor(Math.random() * 100),
        duration: (Math.random() * 10 + 5).toFixed(2),
        delay: (Math.random() * 5).toFixed(2),
        opacity: Math.random() * 0.2 + 0.03,
        color: colors[i % colors.length],
      })),
    []
  );

  return (
    <section id="certifications" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,hsl(var(--gradient-end)/0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--accent)/0.12),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.1),transparent_50%)]" />

      <div className="absolute inset-0 animate-shimmer" />
      <div className="section-overlay section-noise" />
      <div className="section-overlay section-grid" />

      <div className="absolute top-1/4 left-1/4 w-56 h-56 rounded-full bg-accent opacity-18 blur-[75px] animate-hero-orb-2" />
      <div className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-primary opacity-18 blur-[85px] animate-hero-orb-1" />

      <div className="absolute inset-0 pointer-events-none z-0 hidden md:block">
        {bubbles.map((b, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-gradient-to-r ${b.color} animate-bubble`}
            style={{
              width: `${b.size}px`,
              height: `${b.size}px`,
              top: `${b.top}%`,
              left: `${b.left}%`,
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
              opacity: b.opacity,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-sm font-medium mb-6">
            <Award className="h-4 w-4" />
            {t("certifications.title")}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text-rich">{t("certifications.title")}</span>
          </h2>
          <p className="text-muted-foreground">{t("certifications.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <Card
              key={index}
              className="p-6 transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-2 hover:shadow-[0_30px_70px_hsl(var(--foreground)/0.12)] glass border-border/50 hover:border-amber-500/50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-500/5 text-amber-500 flex-shrink-0">
                  <Award className="h-6 w-6" />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 gradient-text">{cert.title}</h3>

                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-sm text-accent font-medium">{cert.platform}</span>
                    <span className="text-sm text-muted-foreground">• {cert.instructors}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <span>{cert.duration}</span>
                    <span>•</span>
                    <span>{cert.date}</span>
                  </div>

                  {cert.reference && (
                    <p className="text-xs text-muted-foreground mb-3">{t("certifications.reference")}: {cert.reference}</p>
                  )}

                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="gap-2 transition-[transform,border-color,background-image,color] duration-300 hover:scale-105 border-border/50 hover:border-amber-500/50 hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:text-white"
                  >
                    <a href={cert.url} target="_blank" rel="noopener noreferrer">
                      {t("certifications.viewCertificate")}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="gradient-divider-wave absolute bottom-0 left-10 right-10" />
    </section>
  );
};

export default Certifications;
