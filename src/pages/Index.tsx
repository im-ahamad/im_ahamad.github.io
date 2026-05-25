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

const AnimatedHeroSection = withScrollMotion(Hero);
const AnimatedEducationSection = withScrollMotion(Education);
const AnimatedSkillsSection = withScrollMotion(Skills);
const AnimatedCertificationsSection = withScrollMotion(Certifications);
const AnimatedAcademicInterestsSection = withScrollMotion(AcademicInterests);
const AnimatedProjectsSection = withScrollMotion(Projects);

const Index = () => {
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
