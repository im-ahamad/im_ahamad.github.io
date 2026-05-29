import { useTranslation } from "react-i18next";
import { Code, Database, Users, Languages, Brain } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useMemo, useState, useCallback } from "react";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { useNavigationMemory } from "@/context/NavigationMemory";

const skillsData = [
  {
    category: "Programming Languages",
    icon: Code,
    skills: ["C / C++", "Python", "JavaScript(JS)", "TypeScript(TS)"],
  },
  {
    category: "Frameworks & Libraries",
    icon: Code,
    skills: [
      "TensorFlow", "Keras", "NumPy", "Pandas", "Scikit-Learn",
      "React.js", "Next.js", "Vite.js", "Three.js", "Flask",
      "Unity", "WebGL", "Plotly", "Node.js"
    ],
  },
  {
    category: "Databases & Tools",
    icon: Database,
    skills: [
      "PostgreSQL", "MongoDB", "Firebase", "Git", "GitHub",
      "ESP32", "Arduino", "Raspberry Pi", "MQTT", "HTTP", "LoRaWAN"
    ],
  },
  {
    category: "Language Skills",
    icon: Languages,
    skills: [
      "Bangla (Native)", "English (Fluent)",
      "Urdu / Hindi (Fluent)", "Chinese (Beginner)"
    ],
  },
  {
    category: "Soft Skills",
    icon: Users,
    skills: [
      "Leadership", "Communication", "Adaptability",
      "Teamwork", "Problem-Solving", "Project Management", "Time Management"
    ],
  },
];

const skillLinks: Record<string, string> = {
  "C / C++": "https://en.cppreference.com/",
  "Python": "https://www.python.org/",
  "JavaScript(JS)": "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  "TypeScript(TS)": "https://www.typescriptlang.org/",
  "TensorFlow": "https://www.tensorflow.org/",
  "Keras": "https://keras.io/",
  "NumPy": "https://numpy.org/",
  "Pandas": "https://pandas.pydata.org/",
  "Scikit-Learn": "https://scikit-learn.org/",
  "React.js": "https://react.dev/",
  "Next.js": "https://nextjs.org/",
  "Vite.js": "https://vitejs.dev/",
  "Three.js": "https://threejs.org/",
  "Flask": "https://flask.palletsprojects.com/",
  "Unity": "https://unity.com/",
  "WebGL": "https://get.webgl.org/",
  "Plotly": "https://plotly.com/",
  "PostgreSQL": "https://www.postgresql.org/",
  "MongoDB": "https://www.mongodb.com/",
  "Firebase": "https://firebase.google.com/",
  "Git": "https://git-scm.com/",
  "GitHub": "https://github.com/",
  "ESP32": "https://www.espressif.com/en/products/som/esp32",
  "Arduino": "https://www.arduino.cc/",
  "Raspberry Pi": "https://www.raspberrypi.org/",
  "MQTT": "https://mqtt.org/",
  "HTTP": "https://developer.mozilla.org/en-US/docs/Web/HTTP",
  "LoRaWAN": "https://lora-alliance.org/about-lorawan/",
  "Node.js": "https://nodejs.org/",
};

const Skills = () => {
  const { t } = useTranslation();
  const { getSectionState, saveSectionState } = useNavigationMemory();
  const routeKey = useMemo(() => window.location.pathname + window.location.hash, []);
  const savedExpanded = getSectionState(routeKey, "skillsExpandedCategory") as string | null | undefined;
  const [expandedCategory, setExpandedCategory] = useState<string | null>(savedExpanded ?? null);

  const toggleCategory = useCallback((categoryName: string) => {
    setExpandedCategory(prev => {
      const next = prev === categoryName ? null : categoryName;
      saveSectionState(routeKey, "skillsExpandedCategory", next);
      return next;
    });
  }, [routeKey, saveSectionState]);

  const bubbles = useMemo(() => {
    const colors = [
      "from-indigo-500 via-purple-500 to-pink-500",
      "from-green-500 via-emerald-500 to-teal-400",
      "from-amber-500 via-yellow-500 to-orange-400",
      "from-red-500 via-rose-500 to-pink-400",
      "from-sky-500 via-blue-500 to-indigo-400",
    ];
    return [...Array(15)].map((_, i) => ({
      id: i,
      size: Math.floor(Math.random() * 40) + 15,
      top: Math.floor(Math.random() * 100),
      left: Math.floor(Math.random() * 100),
      duration: (Math.random() * 10 + 5).toFixed(2),
      delay: (Math.random() * 5).toFixed(2),
      opacity: Math.random() * 0.2 + 0.03,
      color: colors[i % colors.length],
    }));
  }, []);

  return (
    <section id="skills" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--gradient-start)/0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--accent)/0.12),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.1),transparent_50%)]" />

      <div className="absolute inset-0 animate-shimmer" />
      <div className="section-overlay section-noise" />
      <div className="section-overlay section-grid" />

      <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-accent opacity-20 blur-[85px] animate-hero-orb-2" />
      <div className="absolute bottom-1/3 left-1/4 w-56 h-56 rounded-full bg-primary opacity-20 blur-[75px] animate-hero-orb-1" />

      <div className="absolute inset-0 pointer-events-none z-0 hidden md:block">
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className={`absolute rounded-full bg-gradient-to-r ${bubble.color} animate-bubble`}
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              top: `${bubble.top}%`,
              left: `${bubble.left}%`,
              animationDuration: `${bubble.duration}s`,
              animationDelay: `${bubble.delay}s`,
              opacity: bubble.opacity,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm font-medium mb-6">
            <Brain className="h-4 w-4" />
            {t("skills.title")}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text-rich">{t("skills.title")}</span>
          </h2>
          <p className="text-muted-foreground">{t("skills.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillsData.map((category, index) => {
            const Icon = category.icon;
            const isSoft = category.category === "Soft Skills";

            return (
              <Card
                key={category.category}
                className={`group p-7 transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-2 hover:shadow-[0_30px_70px_hsl(var(--foreground)/0.12)] glass border-border/50 hover:border-accent/50 ${isSoft ? "md:col-span-2" : ""}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`flex items-center gap-4 mb-6 ${isSoft ? "justify-center" : ""}`}>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 text-accent transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold gradient-text">{category.category}</h3>
                </div>

                <div className={`flex flex-wrap gap-3 ${isSoft ? "justify-center" : ""}`}>
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="text-sm px-4 py-1.5 transition-[transform,background-color,color,box-shadow] duration-300 cursor-default font-medium border border-border/30 hover:-translate-y-1 hover:scale-105 hover:bg-primary hover:text-white hover:shadow-[0_10px_25px_hsl(var(--primary)/0.3)]"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>

                {!isSoft && category.category !== "Language Skills" && (
                  <div className="mt-6">
                    <button
                      onClick={() => toggleCategory(category.category)}
                      className="inline-flex items-center gap-1 px-2 py-1.5 text-xs font-semibold text-accent hover:text-white bg-accent/10 hover:bg-accent rounded-md transition-[background-color,color,transform] duration-200 hover:scale-105"
                    >
                      <ExternalLink className="h-3 w-3" />
                      {t("skills.visitWebsite")}
                      {expandedCategory === category.category ? (
                        <ChevronUp className="h-3 w-3" />
                      ) : (
                        <ChevronDown className="h-3 w-3" />
                      )}
                    </button>

                    {expandedCategory === category.category && (
                      <div className="mt-4 pt-4 border-t border-border/20">
                        <div className={`flex flex-wrap gap-2 ${isSoft ? "justify-center" : ""}`}>
                          {category.skills.map((skill) => {
                            const link = skillLinks[skill];
                            return link ? (
                              <a
                                key={`link-${skill}`}
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-accent hover:text-white bg-accent/10 hover:bg-accent rounded-sm transition-[background-color,color,transform] duration-200 hover:scale-105"
                                title={`Visit ${skill} official website`}
                              >
                                {skill}
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      <div className="gradient-divider-wave absolute bottom-0 left-10 right-10" />
    </section>
  );
};

export default Skills;
