import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Sprout, BarChart3, Leaf, CloudSun, Droplet, Thermometer, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const projectsData = [
  {
    id: 1,
    icon: Sprout,
    title: "AI-Based Crop Recommendation System",
    tags: ["Python", "Scikit-Learn", "Streamlit"],
    overview: "Recommends the most suitable crop for a given region using soil, rainfall, and climate data.",
    problem: "Farmers often rely on experience rather than data, leading to inefficient crop selection and reduced yield.",
    implementation: [
      "Collected open soil and weather datasets",
      "Trained classification model using Scikit-Learn",
      "Built web interface with Streamlit for crop suggestions",
      "Visualized predictions and confidence scores",
    ],
    impact: "Helps farmers make data-driven decisions for higher yield and efficient land utilization.",
    color: "from-green-500 to-emerald-600",
    href: "/projects/crop-recommendation.html",
  },
  {
    id: 2,
    icon: BarChart3,
    title: "Crop Yield Prediction using Machine Learning",
    tags: ["Python", "Pandas", "Scikit-Learn", "Plotly"],
    overview: "Predicts expected crop yield using rainfall, fertilizer usage, and cultivation area data.",
    problem: "Accurate yield forecasting is essential for planning and food supply stability.",
    implementation: [
      "Used historical agricultural datasets",
      "Applied regression models for yield prediction",
      "Visualized yield trends with Plotly charts",
      "Built an interactive dashboard for exploration",
    ],
    impact: "Enables early yield estimation and supports agricultural decision-making.",
    color: "from-amber-500 to-yellow-600",
    href: "/projects/crop-yield-prediction.html",
  },
  {
    id: 3,
    icon: Leaf,
    title: "Crop Disease Detection using Deep Learning",
    tags: ["TensorFlow", "Keras", "Flask"],
    overview: "Identifies plant leaf diseases using a CNN model trained on image datasets.",
    problem: "Manual crop disease diagnosis is time-consuming and often inaccurate.",
    implementation: [
      "Trained CNN model using PlantVillage dataset",
      "Preprocessed images for consistent accuracy",
      "Developed Flask web app for real-time predictions",
      "Displayed confidence and suggested treatments",
    ],
    impact: "Allows farmers to detect crop diseases early and take quick preventive action.",
    color: "from-red-500 to-rose-600",
    href: "/projects/crop-disease-detection.html",
  },
  {
    id: 4,
    icon: CloudSun,
    title: "Climate-Aware Crop Planning Dashboard",
    tags: ["Python", "Prophet", "Plotly", "Streamlit"],
    overview: "Analyzes weather patterns and forecasts suitable planting periods for major crops.",
    problem: "Climate variability causes uncertainty in planting schedules and yield outcomes.",
    implementation: [
      "Collected multi-year weather and yield data",
      "Applied Prophet model for seasonal forecasting",
      "Created visual insights with Plotly charts",
      "Built interactive dashboard for climate-smart planning",
    ],
    impact: "Helps optimize crop schedules and reduce losses due to weather fluctuations.",
    color: "from-sky-500 to-blue-600",
    href: "/projects/climate-crop-planning.html",
  },
  {
    id: 5,
    icon: Droplet,
    title: "AI-Driven Smart Fertilizer Management System",
    tags: ["Python", "Scikit-Learn", "Flask"],
    overview: "Predicts ideal fertilizer type and quantity based on soil nutrients and crop type.",
    problem: "Overuse of fertilizers harms soil health and increases farming costs.",
    implementation: [
      "Used open soil nutrient datasets",
      "Trained Random Forest model for fertilizer recommendations",
      "Developed simple Flask interface for farmers",
      "Displayed predictions and sustainability metrics",
    ],
    impact: "Supports sustainable farming by optimizing fertilizer usage through AI insights.",
    color: "from-lime-500 to-green-600",
    href: "/projects/smart-fertilizer-management.html",
  },
  {
    id: 6,
    icon: Thermometer,
    title: "AI-Based Soil Moisture Prediction System",
    tags: ["Python", "IoT", "XGBoost", "FastAPI"],
    overview: "Forecasts soil moisture levels to automate and optimize irrigation schedules.",
    problem: "Inaccurate irrigation leads to water wastage or crop stress due to under-watering.",
    implementation: [
      "Integrated real-time sensor data via IoT protocols",
      "Developed moisture forecasting model using XGBoost",
      "Created an automated trigger system for smart irrigation",
      "Built an API for real-time monitoring and control",
    ],
    impact: "Reduces water consumption and ensures optimal plant hydration through precision AI.",
    color: "from-indigo-500 to-blue-600",
    href: "/projects/soil-moisture-prediction.html",
  },
];

const Projects = () => {
  const { t } = useTranslation();

  return (
    <section id="projects" className="py-12 md:py-24 px-4 relative overflow-hidden scroll-mt-14">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--primary)/0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--accent)/0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--gradient-start)/0.05),transparent_50%)]" />

      <div className="absolute inset-0 animate-shimmer" />
      <div className="section-overlay section-noise" />
      <div className="section-overlay section-grid" />

      <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-primary opacity-12 blur-[110px] animate-hero-orb-3" />
      <div className="absolute bottom-1/4 left-1/4 w-60 h-60 rounded-full bg-accent opacity-12 blur-[90px] animate-hero-orb-1" />

      <div className="container mx-auto max-w-7xl relative z-10 text-center mb-10 md:mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 text-sm font-medium mb-6">
          {t("projects.title")}
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
          <span className="gradient-text-rich">{t("projects.title")}</span>
        </h2>
        <p className="text-muted-foreground text-sm md:text-base">{t("projects.subtitle")}</p>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10 grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projectsData.map((project, index) => {
          const Icon = project.icon;
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
            >
              <Card className="group p-4 md:p-6 h-full flex flex-col rounded-2xl transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_70px_rgba(0,0,0,0.15)] glass border-border/50 hover:border-transparent relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className={`flex items-center justify-center w-14 md:w-16 h-14 md:h-16 mb-3 md:mb-4 rounded-2xl bg-gradient-to-br ${project.color} shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                  <Icon className="w-7 md:w-8 h-7 md:h-8 text-white" strokeWidth={1.5} />
                </div>

                <h3 className="text-lg md:text-xl font-bold mb-2 gradient-text">{project.title}</h3>

                <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                  {project.tags.map((tag, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="text-xs md:text-sm bg-secondary/50 border-border/30 hover:bg-primary hover:text-white transition-all duration-200 cursor-pointer"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <p className="text-muted-foreground text-xs md:text-sm mb-2 md:mb-3">{project.overview}</p>

                <p className="text-foreground/80 text-xs md:text-sm mb-2 md:mb-3">
                  <span className="font-semibold">Problem: </span>
                  {project.problem}
                </p>

                <div className="text-foreground/80 text-xs md:text-sm mb-2 md:mb-3 flex-1">
                  <span className="font-semibold">Implementation:</span>
                  <ul className="list-disc ml-4 md:ml-5 mt-1 space-y-1">
                    {project.implementation.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <p className="text-foreground/80 text-xs md:text-sm">
                  <span className="font-semibold">Impact: </span>
                  {project.impact}
                </p>

                <a
                  href={project.href}
                  className="shimmer-btn mt-4 inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-semibold rounded-xl"
                >
                  View Project
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="gradient-divider-wave absolute bottom-0 left-10 right-10" />
    </section>
  );
};

export default Projects;
