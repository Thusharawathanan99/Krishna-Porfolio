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
  const { content, loading } = usePortfolioContent();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection content={content} />
      <AboutSection content={content} />
      <EducationSection />
      <ExperienceSection />
      <SkillsSection />
      <ActivitiesSection />
      <ContactSection content={content} />
    </div>
  );
};

export default Index;
