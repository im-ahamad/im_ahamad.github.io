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
  "from-red-500 via-rose-500 to-pink-400",
  "from-sky-500 via-blue-500 to-indigo-400",
];

const Certifications = () => {
  const { t } = useTranslation();

  const bubbles = useMemo(
    () =>
      [...Array(12)].map((_, i) => ({
        size: Math.floor(Math.random() * 50) + 15,
        top: Math.floor(Math.random() * 100),
        left: Math.floor(Math.random() * 100),
        duration: (Math.random() * 10 + 5).toFixed(2),
        delay: (Math.random() * 5).toFixed(2),
        opacity: Math.random() * 0.25 + 0.05,
        color: colors[i % colors.length],
      })),
    []
  );

  return (
    <section id="certifications" className="relative py-20 px-6 bg-muted/30 overflow-hidden">

      {/* Floating Bubbles */}
      <div className="absolute inset-0 pointer-events-none z-0">
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

        {/* Main Header */}
        <div className="text-center mb-12 animate-fade-in">
                <div className="flex items-center justify-center gap-4">
            <div className="p-4 rounded-xl bg-blue-100 text-blue-500 transition-all duration-500 hover:rotate-24 hover:scale-110 hover:shadow-[0_0_25px_rgba(79,70,229,0.6)]">
              <Award className="h-8 w-8" />
            </div>
              <h2 className="text-4xl md:text-5xl font-bold gradient-text">
              {t("certifications.title")}
            </h2>
          </div>
          <p className="text-muted-foreground mt-4">{t("certifications.subtitle")}</p>
        </div>

        {/* Certification Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <Card
              key={index}
              className="p-6 transform transition-all duration-500 hover:scale-[1.05] hover:shadow-[0_30px_70px_rgba(0,0,0,0.15)] hover:shadow-accent/30 cursor-default"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4 mb-4">

                <div className="p-3 rounded-lg bg-accent/10 text-accent flex-shrink-0 icon-glow">
                  <Award className="h-6 w-6" />
                </div>

                <div className="flex-1">
                  {/* Item Title: Glow effect applied here */}
                  <h3 className="text-lg font-semibold mb-2 cert-title-glow">{cert.title}</h3>

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
                    <p className="text-xs text-muted-foreground mb-3">Reference: {cert.reference}</p>
                  )}

                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/30 hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:text-white"
                  >
                    <a href={cert.url} target="_blank" rel="noopener noreferrer">
                      View Certificate
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;