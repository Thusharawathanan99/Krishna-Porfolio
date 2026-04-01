import { useEffect, useState } from "react";

const defaultContent: Record<string, string> = {
  hero_name_first: "Idhayaraja",
  hero_name_last: "Krishna Kumar",
  hero_tagline: "HR Professional",
  hero_description: "BSc Human Resources Management undergraduate passionate about employee engagement, recruitment, and building strong organizational culture.",
  about_text: "I am an HR Management undergraduate with a solid foundation in human resources principles. With hands-on experience in administration, teamwork, and communication, I am driven by a passion for creating impactful employee experiences and fostering thriving organizational cultures. I bring a unique blend of academic knowledge and practical exposure to every challenge.",
  phone: "077 4998574",
  email: "illayarajahk@gmail.com",
  location: "Lunugala",
  linkedin_url: "https://linkedin.com/in/illayarajahkrishnak",
};

export interface SkillData { name: string; detail: string; level: number; }
export interface ExperienceData { role: string; company: string; period: string; type: string; tasks: string; }
export interface CertData { name: string; org: string; }
export interface LeadershipData { title: string; desc: string; }

const defaultSkills: SkillData[] = [
  { name: "Languages", detail: "Tamil, Sinhala, English", level: 85 },
  { name: "MS Office", detail: "Word & PowerPoint", level: 75 },
  { name: "Team Leadership", detail: "Leading & motivating teams", level: 80 },
  { name: "Collaboration", detail: "Cross-functional teamwork", level: 90 },
  { name: "Mobile Photography", detail: "Visual content creation", level: 70 },
];

const defaultExperience: ExperienceData[] = [
  { role: "E-Commerce Associate", company: "Glomark, Thalawathugoda", period: "2023 – 2024", type: "Part-time", tasks: "Supported e-commerce operations and customer service\nAssisted with inventory management and order processing" },
  { role: "Administrative Assistant (Intern)", company: "Maixes Company", period: "2019 – 2020", type: "Internship", tasks: "Assisted with administrative operations and daily workflows\nSupported internal and external communication channels\nManaged documentation, filing, and data entry" },
];

const defaultCerts: CertData[] = [
  { name: "WhatsApp API", org: "Wati Academy" },
  { name: "Digital Marketing", org: "HubSpot" },
  { name: "Sales Management", org: "HubSpot" },
  { name: "Content Marketing", org: "HubSpot" },
  { name: "English Mastery", org: "Alpha International Campus" },
  { name: "Agile Project Management", org: "HP LIFE" },
];

const defaultLeadership: LeadershipData[] = [
  { title: "Volleyball Player", desc: "National & School level" },
  { title: "Team Leader", desc: "Volleyball Team Captain" },
  { title: "Director", desc: "Rotaract Club" },
  { title: "Member", desc: "Leo Club & Sports Council" },
];

export function usePortfolioContent() {
  const [content, setContent] = useState<Record<string, string>>(defaultContent);
  const [skills, setSkills] = useState<SkillData[]>(defaultSkills);
  const [experience, setExperience] = useState<ExperienceData[]>(defaultExperience);
  const [certs, setCerts] = useState<CertData[]>(defaultCerts);
  const [leadership, setLeadership] = useState<LeadershipData[]>(defaultLeadership);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedData = localStorage.getItem('portfolio_data');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed.content) setContent(parsed.content);
        if (parsed.skills) setSkills(parsed.skills);
        if (parsed.experience) setExperience(parsed.experience);
        if (parsed.certs) setCerts(parsed.certs);
        if (parsed.leadership) setLeadership(parsed.leadership);
      }
    } catch (e) {
      console.error("Error loading portfolio data from LocalStorage:", e);
    }
    setLoading(false);
  }, []);

  return { content, skills, experience, certs, leadership, loading };
}
