import { Card } from "@/components/ui/card";
import { GraduationCap, Calendar, Award, ExternalLink } from "lucide-react";
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
    <section id="education" className="py-20 px-4 relative overflow-hidden">

      {/* Animations consolidated in index.css */}

      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      {/* Floating bubbles - hidden on mobile for better performance */}
      <div className="hidden md:block absolute top-10 left-5 w-20 h-20 rounded-full bg-indigo-900 opacity-20 animate-bounce-slow"></div>
      <div className="hidden md:block absolute bottom-10 right-10 w-32 h-32 rounded-full bg-purple-900 opacity-15 animate-bounce-slower"></div>
      <div className="hidden md:block absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-yellow-800/50 opacity-25 animate-bounce-slow"></div>
      <div className="hidden md:block absolute bottom-1/3 left-1/3 w-24 h-24 rounded-full bg-green-900/40 opacity-20 animate-bounce-slower"></div>
      <div className="hidden md:block absolute top-20 right-20 w-12 h-12 rounded-full bg-blue-800/30 opacity-30 animate-bounce-slow"></div>
      <div className="hidden md:block absolute top-1/3 left-10 w-28 h-28 rounded-full bg-pink-900/25 opacity-18 animate-bounce-slower"></div>
      <div className="hidden md:block absolute bottom-20 left-20 w-18 h-18 rounded-full bg-teal-900/35 opacity-22 animate-bounce-slow"></div>
      <div className="hidden md:block absolute top-2/3 right-1/3 w-22 h-22 rounded-full bg-orange-900/20 opacity-28 animate-bounce-slower"></div>
      <div className="hidden md:block absolute bottom-1/4 right-5 w-14 h-14 rounded-full bg-cyan-900/40 opacity-25 animate-bounce-slow"></div>
      <div className="hidden md:block absolute top-40 left-1/4 w-26 h-26 rounded-full bg-violet-900/30 opacity-20 animate-bounce-slower"></div>
      <div className="hidden md:block absolute bottom-40 right-1/2 w-16 h-16 rounded-full bg-emerald-900/35 opacity-30 animate-bounce-slow"></div>
      <div className="hidden md:block absolute top-3/4 left-2/3 w-20 h-20 rounded-full bg-rose-900/25 opacity-24 animate-bounce-slower"></div>

      <div className="container mx-auto max-w-6xl relative z-10">

        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">{t("education.title")}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("education.subtitle")}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">

          {/* Center line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary via-accent to-primary opacity-20 hidden md:block" />

          <div className="space-y-12">
            {educationData.map((edu, index) => (

              <div
                key={edu.institution}
                className="relative animate-slide-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >

                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background hidden md:block z-10" />

                <div className="grid md:grid-cols-2 gap-8 items-center">

                  {/* Content card */}
                  <div className="md:text-right md:pr-12">

                    <Card className="group p-8 transition-all duration-500 hover:scale-[1.05] hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(0,0,0,0.2)] hover:border-accent/60 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-2">

                      <div className="flex items-center gap-3 mb-4 justify-end">

                        <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                          <GraduationCap className="h-6 w-6" />
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span className="font-medium">{edu.session}</span>
                        </div>

                      </div>

                      <h3 className="text-2xl font-bold mb-3 gradient-text">
                        {edu.degree}
                      </h3>

                      <div className="space-y-2">

                        <div className="flex items-center gap-2 text-primary font-semibold justify-end">
                          <Award className="h-5 w-5" />
                          <span>{edu.institution}</span>
                        </div>

                        <p className="text-sm text-muted-foreground">
                          {edu.board}
                        </p>

                        {/* College Website Link */}
                        <div className="flex justify-end pt-3">
                          <a
                            href={edu.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-accent hover:text-primary transition-all hover:scale-110"
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
    </section>
  );
};

export default Education;