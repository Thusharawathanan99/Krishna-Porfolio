import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EducationSection from "@/components/EducationSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import ContactSection from "@/components/ContactSection";
import { usePortfolioContent } from "@/hooks/usePortfolioContent";

const Index = () => {
  const { content, skills, experience, certs, leadership } = usePortfolioContent();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection content={content} />
      <AboutSection content={content} />
      <EducationSection certs={certs} />
      <ExperienceSection experience={experience} />
      <SkillsSection skills={skills} />
      <ActivitiesSection leadership={leadership} />
      <ContactSection content={content} />
    </div>
  );
};

export default Index;
