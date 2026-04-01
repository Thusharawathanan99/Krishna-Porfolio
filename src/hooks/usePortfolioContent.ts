import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

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

export function usePortfolioContent() {
  const [content, setContent] = useState<Record<string, string>>(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("portfolio_content")
        .select("section_key, content");

      if (data && data.length > 0) {
        const merged = { ...defaultContent };
        data.forEach((item) => {
          merged[item.section_key] = item.content;
        });
        setContent(merged);
      }
      setLoading(false);
    };
    load();
  }, []);

  return { content, loading };
}
