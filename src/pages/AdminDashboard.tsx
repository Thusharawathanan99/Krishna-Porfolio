import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { LogOut, Save, ArrowLeft } from "lucide-react";

interface ContentItem {
  id: string;
  section_key: string;
  content: string;
}

const defaultSections = [
  { key: "hero_name_first", label: "First Name", default: "Idhayaraja" },
  { key: "hero_name_last", label: "Last Name", default: "Krishna Kumar" },
  { key: "hero_tagline", label: "Tagline", default: "HR Professional" },
  { key: "hero_description", label: "Hero Description", default: "BSc Human Resources Management undergraduate passionate about employee engagement, recruitment, and building strong organizational culture." },
  { key: "about_text", label: "About Text", default: "I am an HR Management undergraduate with a solid foundation in human resources principles. With hands-on experience in administration, teamwork, and communication, I am driven by a passion for creating impactful employee experiences and fostering thriving organizational cultures." },
  { key: "phone", label: "Phone", default: "077 4998574" },
  { key: "email", label: "Email", default: "illayarajahk@gmail.com" },
  { key: "location", label: "Location", default: "Lunugala" },
  { key: "linkedin_url", label: "LinkedIn URL", default: "https://linkedin.com/in/illayarajahkrishnak" },
];

const AdminDashboard = () => {
  const [contents, setContents] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    loadContent();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin");
      return;
    }

    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin");

    if (!roles || roles.length === 0) {
      await supabase.auth.signOut();
      navigate("/admin");
    }
  };

  const loadContent = async () => {
    const { data } = await supabase
      .from("portfolio_content")
      .select("*");

    const contentMap: Record<string, string> = {};
    defaultSections.forEach(s => { contentMap[s.key] = s.default; });
    
    if (data) {
      data.forEach((item: ContentItem) => {
        contentMap[item.section_key] = item.content;
      });
    }

    setContents(contentMap);
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);

    for (const section of defaultSections) {
      const value = contents[section.key] || section.default;

      const { error } = await supabase
        .from("portfolio_content")
        .upsert(
          { section_key: section.key, content: value },
          { onConflict: "section_key" }
        );

      if (error) {
        toast.error(`Failed to save ${section.label}: ${error.message}`);
        setSaving(false);
        return;
      }
    }

    toast.success("All changes saved!");
    setSaving(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground font-alt">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 glass-card border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft size={18} />
            </a>
            <h1 className="text-lg font-heading font-bold text-gradient-gold">Admin Panel</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={handleSave} disabled={saving} size="sm">
              <Save size={14} />
              {saving ? "Saving..." : "Save All"}
            </Button>
            <Button onClick={handleLogout} variant="ghost" size="sm">
              <LogOut size={14} />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-heading font-semibold text-foreground mb-6">Edit Portfolio Content</h2>
            <div className="space-y-5">
              {defaultSections.map((section) => (
                <div key={section.key} className="space-y-2">
                  <Label className="text-xs font-alt uppercase tracking-wider text-muted-foreground">
                    {section.label}
                  </Label>
                  {section.key.includes("description") || section.key.includes("text") ? (
                    <Textarea
                      value={contents[section.key] || ""}
                      onChange={(e) => setContents(prev => ({ ...prev, [section.key]: e.target.value }))}
                      className="bg-secondary/50 border-border min-h-[100px]"
                    />
                  ) : (
                    <Input
                      value={contents[section.key] || ""}
                      onChange={(e) => setContents(prev => ({ ...prev, [section.key]: e.target.value }))}
                      className="bg-secondary/50 border-border"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
