import { Card } from "@/components/ui/card";
import { GraduationCap, Calendar, Award, ExternalLink, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

const educationData = [
  {
    degree: "Higher Secondary Certificate (HSC), Science (Higher Mathematics)",
    institution: "Tamirul Millat Kamil Madrasha",
    session: "2022 - 2024",
    board: "Bangladesh Madrasah Education Board",
    link: "https://www.tmt.edu.bd/",
  },
];

const Education = () => {
  const { t } = useTranslation();

  return (
    <section id="education" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--accent)/0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--gradient-end)/0.06),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--section-edu)/0.05),transparent_50%)]" />

      <div className="absolute inset-0 animate-shimmer" />
      <div className="section-overlay section-noise" />
      <div className="section-overlay section-grid" />

      <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-primary opacity-15 blur-[100px] animate-hero-orb-1" />
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-accent opacity-15 blur-[80px] animate-hero-orb-2" />
      <div className="absolute top-1/2 right-1/3 w-40 h-40 rounded-full bg-purple-600 opacity-10 blur-[70px] animate-hero-orb-3" />

      <div className="hidden md:block absolute top-10 left-5 w-20 h-20 rounded-full bg-indigo-500/20 animate-bounce-slow" />
      <div className="hidden md:block absolute bottom-10 right-10 w-32 h-32 rounded-full bg-purple-500/15 animate-bounce-slower" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <GraduationCap className="h-4 w-4" />
            {t("education.title")}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text-rich">{t("education.title")}</span>
          </h2>
          <p className="text-muted-foreground text-lg">{t("education.subtitle")}</p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary via-accent to-primary opacity-20 hidden md:block" />

          <div className="space-y-12">
            {educationData.map((edu, index) => (
              <div key={edu.institution} className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background hidden md:block z-10 shadow-[0_0_20px_hsl(var(--primary)/0.5)]" />

                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="md:text-right md:pr-12">
                    <Card className="group p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(0,0,0,0.15)] glass border-border/50 hover:border-primary/50 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-accent/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                      <div className="flex items-center gap-3 mb-4 justify-end">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-accent text-white transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-lg">
                          <GraduationCap className="h-6 w-6" />
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span className="font-medium">{edu.session}</span>
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold mb-3 gradient-text">{edu.degree}</h3>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-primary font-semibold justify-end">
                          <Award className="h-5 w-5" />
                          <span>{edu.institution}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground justify-end">
                          <MapPin className="h-4 w-4" />
                          <span>{edu.board}</span>
                        </div>

                        <div className="flex justify-end pt-4">
                          <a
                            href={edu.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shimmer-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                          >
                            <ExternalLink className="h-4 w-4" />
                            Visit College
                          </a>
                        </div>
                      </div>
                    </Card>
                  </div>
                  <div className="hidden md:block md:col-start-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="gradient-divider-wave absolute bottom-0 left-10 right-10" />
    </section>
  );
};

export default Education;
