import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Sprout, BarChart3, Leaf, CloudSun, Droplet, Thermometer } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const projectsData = [
  {
    id: 1,
    icon: Sprout,
    title: "AI-Based Crop Recommendation System",
    tags: ["Python", "Scikit-Learn", "Streamlit"],
    overview:
      "Recommends the most suitable crop for a given region using soil, rainfall, and climate data.",
    problem:
      "Farmers often rely on experience rather than data, leading to inefficient crop selection and reduced yield.",
    implementation: [
      "Collected open soil and weather datasets",
      "Trained classification model using Scikit-Learn",
      "Built web interface with Streamlit for crop suggestions",
      "Visualized predictions and confidence scores",
    ],
    impact:
      "Helps farmers make data-driven decisions for higher yield and efficient land utilization.",
    color: "from-green-500 to-emerald-600",
  },
  {
    id: 2,
    icon: BarChart3,
    title: "Crop Yield Prediction using Machine Learning",
    tags: ["Python", "Pandas", "Scikit-Learn", "Plotly"],
    overview:
      "Predicts expected crop yield using rainfall, fertilizer usage, and cultivation area data.",
    problem:
      "Accurate yield forecasting is essential for planning and food supply stability.",
    implementation: [
      "Used historical agricultural datasets",
      "Applied regression models for yield prediction",
      "Visualized yield trends with Plotly charts",
      "Built an interactive dashboard for exploration",
    ],
    impact:
      "Enables early yield estimation and supports agricultural decision-making.",
    color: "from-amber-500 to-yellow-600",
  },
  {
    id: 3,
    icon: Leaf,
    title: "Crop Disease Detection using Deep Learning",
    tags: ["TensorFlow", "Keras", "Flask"],
    overview:
      "Identifies plant leaf diseases using a CNN model trained on image datasets.",
    problem:
      "Manual crop disease diagnosis is time-consuming and often inaccurate.",
    implementation: [
      "Trained CNN model using PlantVillage dataset",
      "Preprocessed images for consistent accuracy",
      "Developed Flask web app for real-time predictions",
      "Displayed confidence and suggested treatments",
    ],
    impact:
      "Allows farmers to detect crop diseases early and take quick preventive action.",
    color: "from-red-500 to-rose-600",
  },
  {
    id: 4,
    icon: CloudSun,
    title: "Climate-Aware Crop Planning Dashboard",
    tags: ["Python", "Prophet", "Plotly", "Streamlit"],
    overview:
      "Analyzes weather patterns and forecasts suitable planting periods for major crops.",
    problem:
      "Climate variability causes uncertainty in planting schedules and yield outcomes.",
    implementation: [
      "Collected multi-year weather and yield data",
      "Applied Prophet model for seasonal forecasting",
      "Created visual insights with Plotly charts",
      "Built interactive dashboard for climate-smart planning",
    ],
    impact:
      "Helps optimize crop schedules and reduce losses due to weather fluctuations.",
    color: "from-sky-500 to-blue-600",
  },
  {
    id: 5,
    icon: Droplet,
    title: "AI-Driven Smart Fertilizer Management System",
    tags: ["Python", "Scikit-Learn", "Flask"],
    overview:
      "Predicts ideal fertilizer type and quantity based on soil nutrients and crop type.",
    problem:
      "Overuse of fertilizers harms soil health and increases farming costs.",
    implementation: [
      "Used open soil nutrient datasets",
      "Trained Random Forest model for fertilizer recommendations",
      "Developed simple Flask interface for farmers",
      "Displayed predictions and sustainability metrics",
    ],
    impact:
      "Supports sustainable farming by optimizing fertilizer usage through AI insights.",
    color: "from-lime-500 to-green-600",
  },
  {
    id: 6,
    icon: Thermometer,
    title: "AI-Based Soil Moisture Prediction System",
    tags: ["Python", "IoT", "XGBoost", "FastAPI"],
    overview:
      "Forecasts soil moisture levels to automate and optimize irrigation schedules.",
    problem:
      "Inaccurate irrigation leads to water wastage or crop stress due to under-watering.",
    implementation: [
      "Integrated real-time sensor data via IoT protocols",
      "Developed moisture forecasting model using XGBoost",
      "Created an automated trigger system for smart irrigation",
      "Built an API for real-time monitoring and control",
    ],
    impact:
      "Reduces water consumption and ensures optimal plant hydration through precision AI.",
    color: "from-indigo-500 to-blue-600",
  },
];

const Projects = () => {
  const { t } = useTranslation();

  return (
    <section id="projects" className="py-12 md:py-20 px-4 relative bg-muted/30 overflow-hidden">

      {/* Mesh gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--primary)/0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--accent)/0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--gradient-start)/0.05),transparent_50%)]" />

      {/* Glow orbs */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-primary opacity-8 blur-[110px] animate-hero-orb-3" />
      <div className="absolute bottom-1/4 left-1/4 w-60 h-60 rounded-full bg-accent opacity-8 blur-[90px] animate-hero-orb-1" />
      <div className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full bg-cyan-400 opacity-8 blur-[80px] animate-hero-orb-2" />

      {/* Floating bubbles */}
      <div className="hidden md:block absolute top-10 left-5 w-20 h-20 rounded-full bg-indigo-900 opacity-20 animate-bounce-slow"></div>
      <div className="hidden md:block absolute bottom-10 right-10 w-32 h-32 rounded-full bg-purple-900 opacity-15 animate-bounce-slower"></div>
      <div className="hidden md:block absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-yellow-800/50 opacity-25 animate-bounce-slow"></div>
      <div className="hidden md:block absolute bottom-1/3 left-1/3 w-24 h-24 rounded-full bg-green-900/40 opacity-20 animate-bounce-slower"></div>

      {/* Additional bubbles */}
      <div className="hidden md:block absolute top-20 right-20 w-12 h-12 rounded-full bg-blue-800/30 opacity-30 animate-bounce-slow"></div>
      <div className="hidden md:block absolute top-1/3 left-10 w-28 h-28 rounded-full bg-pink-900/25 opacity-18 animate-bounce-slower"></div>
      <div className="hidden md:block absolute bottom-20 left-20 w-18 h-18 rounded-full bg-teal-900/35 opacity-22 animate-bounce-slow"></div>
      <div className="hidden md:block absolute top-2/3 right-1/3 w-22 h-22 rounded-full bg-orange-900/20 opacity-28 animate-bounce-slower"></div>
      <div className="hidden md:block absolute bottom-1/4 right-5 w-14 h-14 rounded-full bg-cyan-900/40 opacity-25 animate-bounce-slow"></div>
      <div className="hidden md:block absolute top-40 left-1/4 w-26 h-26 rounded-full bg-violet-900/30 opacity-20 animate-bounce-slower"></div>
      <div className="hidden md:block absolute bottom-40 right-1/2 w-16 h-16 rounded-full bg-emerald-900/35 opacity-30 animate-bounce-slow"></div>
      <div className="hidden md:block absolute top-3/4 left-2/3 w-20 h-20 rounded-full bg-rose-900/25 opacity-24 animate-bounce-slower"></div>
      <div className="hidden md:block absolute top-1/4 right-10 w-15 h-15 rounded-full bg-lime-900/40 opacity-26 animate-bounce-slow"></div>
      <div className="hidden md:block absolute bottom-2/3 left-1/4 w-30 h-30 rounded-full bg-sky-900/20 opacity-19 animate-bounce-slower"></div>
      <div className="hidden md:block absolute top-60 right-2/3 w-13 h-13 rounded-full bg-fuchsia-900/35 opacity-27 animate-bounce-slow"></div>
      <div className="hidden md:block absolute bottom-1/2 left-10 w-19 h-19 rounded-full bg-amber-900/30 opacity-23 animate-bounce-slower"></div>

      {/* Header */}
      <div className="container mx-auto max-w-7xl relative z-10 text-center mb-10 md:mb-16 animate-fade-in">
        <h2 className="text-2xl md:text-5xl font-bold mb-3 md:mb-4">
          <span className="gradient-text">{t("projects.title")}</span>
        </h2>
        <p className="text-muted-foreground text-sm md:text-base">{t("projects.subtitle")}</p>
      </div>

      {/* Grid */}
      <div className="container mx-auto max-w-7xl relative z-10 grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projectsData.map((project, index) => {
          const Icon = project.icon;
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
            >
              <Card className="p-4 md:p-6 h-full flex flex-col rounded-2xl border border-gray-200/20 dark:border-gray-700/20 shadow-xl hover:shadow-2xl hover:scale-105 transform transition-all duration-300 bg-white/10 dark:bg-gray-900/30 backdrop-blur-lg cursor-default">

                <div className={`flex items-center justify-center w-14 md:w-16 h-14 md:h-16 mb-3 md:mb-4 rounded-full bg-gradient-to-br ${project.color} shadow-lg transform transition-all duration-500 hover:scale-110`}>
                  <Icon className="w-7 md:w-8 h-7 md:h-8 text-white" strokeWidth={1.5} />
                </div>

                <h3 className="text-lg md:text-xl font-bold mb-2 gradient-header">
                  {project.title}
                </h3>

                <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                  {project.tags.map((tag, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="bg-gray-200/20 dark:bg-gray-700/20 text-gray-900 dark:text-white text-xs md:text-sm hover:bg-blue-500 hover:text-white transition-colors duration-200 cursor-pointer"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <p className="text-gray-800 dark:text-gray-200 text-xs md:text-sm mb-2 md:mb-3">{project.overview}</p>

                <p className="text-gray-700 dark:text-gray-300 text-xs md:text-sm mb-2 md:mb-3">
                  <span className="font-semibold">💡 Problem: </span>
                  {project.problem}
                </p>

                <div className="text-gray-700 dark:text-gray-300 text-xs md:text-sm mb-2 md:mb-3 flex-1">
                  <span className="font-semibold">⚙️ Implementation:</span>
                  <ul className="list-disc ml-4 md:ml-5 mt-1 space-y-1">
                    {project.implementation.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <p className="text-gray-700 dark:text-gray-300 text-xs md:text-sm">
                  <span className="font-semibold">🚀 Impact: </span>
                  {project.impact}
                </p>

                <a
                  href={project.id === 1 ? "/projects/crop-recommendation.html" : project.id === 2 ? "/projects/crop-yield-prediction.html" : project.id === 3 ? "/projects/crop-disease-detection.html" : project.id === 4 ? "/projects/climate-crop-planning.html" : project.id === 5 ? "/projects/smart-fertilizer-management.html" : project.id === 6 ? "/projects/soil-moisture-prediction.html" : "#"}
                  className="mt-4 inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg hover:shadow-green-500/30 hover:scale-105 transform transition-all duration-300"
                >
                  View Project
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>

              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;