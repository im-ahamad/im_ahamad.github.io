import { useEffect } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { withScrollMotion } from "@/hoc/withMotion";

import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import AcademicInterests from "@/components/AcademicInterests";
import BackgroundAnimation from "@/components/BackgroundAnimation";

import { useLocation } from "react-router-dom";
import { getHomeState } from "@/lib/homeState";

const AnimatedHeroSection = withScrollMotion(Hero);
const AnimatedEducationSection = withScrollMotion(Education);
const AnimatedSkillsSection = withScrollMotion(Skills);
const AnimatedCertificationsSection = withScrollMotion(Certifications);
const AnimatedAcademicInterestsSection = withScrollMotion(AcademicInterests);
const AnimatedProjectsSection = withScrollMotion(Projects);

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.location.hash) return;

    const locY = location.state?.scrollY;
    if (locY && locY > 0) {
      document.documentElement.scrollTop = locY;
      return;
    }

    const saved = getHomeState();
    if (!saved) return;
    if (saved.scrollY > 0) {
      document.documentElement.scrollTop = saved.scrollY;
    }
  }, []);

  return (
    <main className="min-h-screen">
      <NavBar />
      <div className="fixed inset-0 pointer-events-none">
        <BackgroundAnimation />
      </div>

      <AnimatedHeroSection />
      <AnimatedEducationSection />
      <AnimatedSkillsSection />
      <AnimatedCertificationsSection />
      <AnimatedAcademicInterestsSection />
      <AnimatedProjectsSection />

      <Footer />
    </main>
  );
};

export default Index;
