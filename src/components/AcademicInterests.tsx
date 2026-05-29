import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Brain, Dna, GraduationCap, Microscope, Leaf, Database, ArrowRight, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigationMemory } from "@/context/NavigationMemory";
import { saveHomeState } from "@/lib/homeState";

const interests = [
  { title: "Artificial Intelligence & Machine Learning", icon: Brain, link: "/projects/ai-ml.html" },
  { title: "Agriculture & AI", icon: Leaf, link: "/projects/agriculture-ai.html" },
  { title: "Bioinformatics and Healthcare Technology", icon: Dna, link: "/projects/bioinformatics-healthcare.html" },
  { title: "Data Science & Big Data Analytics", icon: Database, link: "/projects/data-science-analytics.html" },
  { title: "AI-based Protein Structure Prediction", icon: Microscope, link: "/projects/ai-protein-structure.html" },
  { title: "Personalized Learning Systems", icon: GraduationCap, link: "/projects/personalized-learning.html" },
];

const cardGradients = [
  "from-blue-600 to-purple-600",
  "from-emerald-500 to-teal-600",
  "from-cyan-500 to-blue-600",
  "from-amber-500 to-orange-600",
  "from-violet-600 to-purple-600",
  "from-rose-500 to-pink-600",
];

const AcademicInterests = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setSourceSection } = useNavigationMemory();

  return (
    <section id="interests" className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--primary)/0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--accent)/0.12),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--gradient-start)/0.1),transparent_50%)]" />

      <div className="absolute inset-0 animate-shimmer" />
      <div className="section-overlay section-noise" />
      <div className="section-overlay section-grid" />

      <div className="absolute top-1/3 right-1/3 w-60 h-60 rounded-full bg-accent opacity-18 blur-[75px] animate-hero-orb-3" />
      <div className="absolute bottom-1/4 left-1/4 w-52 h-52 rounded-full bg-primary opacity-18 blur-[65px] animate-hero-orb-1" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-500 text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            {t("interests.title")}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text-rich">{t("interests.title")}</span>
          </h2>
          <p className="text-muted-foreground">{t("interests.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interests.map((interest, index) => {
            const Icon = interest.icon;
            return (
              <Card
                key={index}
                className="group p-6 transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-3 hover:shadow-[0_30px_60px_hsl(var(--foreground)/0.12)] glass border-border/50 hover:border-transparent relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-2xl group-hover:scale-150 transition-transform duration-700" />

                <div className="flex flex-col items-center gap-4 relative z-10">
                  <div className={`p-4 rounded-full bg-gradient-to-br ${cardGradients[index]} text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                    <Icon className="h-8 w-8" />
                  </div>

                  <h3 className="text-lg font-semibold text-center gradient-header">{interest.title}</h3>

                  {interest.link && (
                    <Button
                      asChild
                      variant="ghost"
                      className="mt-2 gap-2 shimmer-btn rounded-xl px-5"
                    >
                      <a href={interest.link} onClick={(e) => { e.preventDefault(); saveHomeState("interests"); setSourceSection("interests"); navigate(interest.link.replace(".html", ""), { state: { fromHome: true, scrollY: window.scrollY, section: "interests" } }); }}>
                        {t("interests.seeMore")}
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </a>
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="gradient-divider-wave absolute bottom-0 left-10 right-10" />
    </section>
  );
};

export default AcademicInterests;
