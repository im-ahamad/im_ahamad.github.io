import { useTranslation } from "react-i18next";
import { Brain, Dna, GraduationCap, Microscope, Leaf, Database } from "lucide-react";
import { Card } from "@/components/ui/card";

const interests = [
  { title: "Artificial Intelligence & Machine Learning", icon: Brain },
  { title: "Agriculture", icon: Leaf },
  { title: "Bioinformatics and Healthcare Technology", icon: Dna },
  { title: "Data Science & Big Data Analytics", icon: Database },
  { title: "AI-based Protein Structure Prediction", icon: Microscope },
  { title: "Personalized Learning Systems", icon: GraduationCap },
];

const AcademicInterests = () => {
  const { t } = useTranslation();

  return (
    <section id="interests" className="relative py-20 px-4 bg-muted/30 overflow-hidden">
      {/* Animations consolidated in index.css */}

      {/* Floating Bubbles */}
      <div className="absolute top-10 left-5 w-20 h-20 bg-indigo-900 rounded-full opacity-20 animate-bounce-slow"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-900 rounded-full opacity-15 animate-bounce-slower"></div>
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-yellow-800/50 rounded-full opacity-25 animate-bounce-slow"></div>
      <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-green-900/40 rounded-full opacity-20 animate-bounce-slower"></div>

      {/* Additional floating bubbles */}
      <div className="hidden md:block absolute top-20 right-20 w-12 h-12 rounded-full bg-blue-800/30 opacity-30 animate-bounce-slow"></div>
      <div className="hidden md:block absolute top-1/3 left-10 w-28 h-28 rounded-full bg-pink-900/25 opacity-18 animate-bounce-slower"></div>
      <div className="hidden md:block absolute bottom-20 left-20 w-18 h-18 rounded-full bg-teal-900/35 opacity-22 animate-bounce-slow"></div>
      <div className="hidden md:block absolute top-2/3 right-1/3 w-22 h-22 rounded-full bg-orange-900/20 opacity-28 animate-bounce-slower"></div>
      <div className="hidden md:block absolute bottom-1/4 right-5 w-14 h-14 rounded-full bg-cyan-900/40 opacity-25 animate-bounce-slow"></div>
      <div className="hidden md:block absolute top-40 left-1/4 w-26 h-26 rounded-full bg-violet-900/30 opacity-20 animate-bounce-slower"></div>
      <div className="hidden md:block absolute bottom-40 right-1/2 w-16 h-16 rounded-full bg-emerald-900/35 opacity-30 animate-bounce-slow"></div>
      <div className="hidden md:block absolute top-3/4 left-2/3 w-20 h-20 rounded-full bg-rose-900/25 opacity-24 animate-bounce-slower"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {/* aykhane blue hoiche Skills style gradient */}
            <span className="gradient-text">{t("interests.title")}</span>
          </h2>
          <p className="text-muted-foreground">{t("interests.subtitle")}</p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {interests.map((interest, index) => {
            const Icon = interest.icon;
            return (
              <Card
                key={index}
                className="p-6 transform transition-all duration-500 hover:scale-[1.05] hover:shadow-xl hover:shadow-indigo-900/40 cursor-default text-center border-blue-50/50 bg-card/50 backdrop-blur-sm"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col items-center gap-4">
                  {/* Icon with hover effect */}
                  <div className="p-4 rounded-full bg-gradient-to-tr from-indigo-900 via-purple-800 to-green-800 text-white transition-all duration-500 hover:scale-110 hover:rotate-6">
                    <Icon className="h-8 w-8" />
                  </div>
                  {/* Item Title: Keeps the glow effect you liked */}
                  <h3 className="text-lg font-semibold gradient-header">{interest.title}</h3>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AcademicInterests;