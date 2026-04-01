import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { LogOut, Save, ArrowLeft, Plus, Trash2, User, GraduationCap, Briefcase, Zap, Activity } from "lucide-react";

interface ContentItem {
  id: string;
  section_key: string;
  content: string;
}

interface SectionDef {
  key: string;
  label: string;
  default: string;
  type?: "input" | "textarea";
}

const profileSections: SectionDef[] = [
  { key: "hero_name_first", label: "First Name", default: "Idhayaraja" },
  { key: "hero_name_last", label: "Last Name", default: "Krishna Kumar" },
  { key: "hero_tagline", label: "Tagline", default: "HR Professional" },
  { key: "hero_description", label: "Hero Description", default: "BSc Human Resources Management undergraduate passionate about employee engagement, recruitment, and building strong organizational culture.", type: "textarea" },
  { key: "about_text", label: "About Text", default: "I am an HR Management undergraduate with a solid foundation in human resources principles.", type: "textarea" },
  { key: "phone", label: "Phone", default: "077 4998574" },
  { key: "email", label: "Email", default: "illayarajahk@gmail.com" },
  { key: "location", label: "Location", default: "Lunugala" },
  { key: "linkedin_url", label: "LinkedIn URL", default: "https://linkedin.com/in/illayarajahkrishnak" },
];

interface SkillItem { name: string; detail: string; level: number; }
interface ExperienceItem { role: string; company: string; period: string; type: string; tasks: string; }
interface CertItem { name: string; org: string; }
interface LeadershipItem { title: string; desc: string; }

const defaultSkills: SkillItem[] = [
  { name: "Languages", detail: "Tamil, Sinhala, English", level: 85 },
  { name: "MS Office", detail: "Word & PowerPoint", level: 75 },
  { name: "Team Leadership", detail: "Leading & motivating teams", level: 80 },
  { name: "Collaboration", detail: "Cross-functional teamwork", level: 90 },
  { name: "Mobile Photography", detail: "Visual content creation", level: 70 },
];

const defaultExperience: ExperienceItem[] = [
  { role: "E-Commerce Associate", company: "Glomark, Thalawathugoda", period: "2023 – 2024", type: "Part-time", tasks: "Supported e-commerce operations and customer service\nAssisted with inventory management and order processing" },
  { role: "Administrative Assistant (Intern)", company: "Maixes Company", period: "2019 – 2020", type: "Internship", tasks: "Assisted with administrative operations and daily workflows\nSupported internal and external communication channels\nManaged documentation, filing, and data entry" },
];

const defaultCerts: CertItem[] = [
  { name: "WhatsApp API", org: "Wati Academy" },
  { name: "Digital Marketing", org: "HubSpot" },
  { name: "Sales Management", org: "HubSpot" },
  { name: "Content Marketing", org: "HubSpot" },
  { name: "English Mastery", org: "Alpha International Campus" },
  { name: "Agile Project Management", org: "HP LIFE" },
];

const defaultLeadership: LeadershipItem[] = [
  { title: "Volleyball Player", desc: "National & School level" },
  { title: "Team Leader", desc: "Volleyball Team Captain" },
  { title: "Director", desc: "Rotaract Club" },
  { title: "Member", desc: "Leo Club & Sports Council" },
];

type Tab = "profile" | "skills" | "experience" | "education" | "activities";

const AdminDashboard = () => {
  const [contents, setContents] = useState<Record<string, string>>({});
  const [skills, setSkills] = useState<SkillItem[]>(defaultSkills);
  const [experience, setExperience] = useState<ExperienceItem[]>(defaultExperience);
  const [certs, setCerts] = useState<CertItem[]>(defaultCerts);
  const [leadership, setLeadership] = useState<LeadershipItem[]>(defaultLeadership);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    loadContent();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { navigate("/admin"); return; }
    const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", session.user.id).eq("role", "admin");
    if (!roles || roles.length === 0) { await supabase.auth.signOut(); navigate("/admin"); }
  };

  const loadContent = async () => {
    const { data } = await supabase.from("portfolio_content").select("*");
    const contentMap: Record<string, string> = {};
    profileSections.forEach(s => { contentMap[s.key] = s.default; });

    if (data) {
      data.forEach((item: ContentItem) => {
        contentMap[item.section_key] = item.content;
      });
      // Load JSON sections
      if (contentMap["skills_json"]) try { setSkills(JSON.parse(contentMap["skills_json"])); } catch {}
      if (contentMap["experience_json"]) try { setExperience(JSON.parse(contentMap["experience_json"])); } catch {}
      if (contentMap["certs_json"]) try { setCerts(JSON.parse(contentMap["certs_json"])); } catch {}
      if (contentMap["leadership_json"]) try { setLeadership(JSON.parse(contentMap["leadership_json"])); } catch {}
    }
    setContents(contentMap);
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);

    const allSections: { key: string; value: string }[] = [
      ...profileSections.map(s => ({ key: s.key, value: contents[s.key] || s.default })),
      { key: "skills_json", value: JSON.stringify(skills) },
      { key: "experience_json", value: JSON.stringify(experience) },
      { key: "certs_json", value: JSON.stringify(certs) },
      { key: "leadership_json", value: JSON.stringify(leadership) },
    ];

    for (const section of allSections) {
      const { error } = await supabase
        .from("portfolio_content")
        .upsert({ section_key: section.key, content: section.value }, { onConflict: "section_key" });
      if (error) {
        toast.error(`Failed to save ${section.key}: ${error.message}`);
        setSaving(false);
        return;
      }
    }
    toast.success("All changes saved!");
    setSaving(false);
  };

  const handleLogout = async () => { await supabase.auth.signOut(); navigate("/admin"); };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground font-alt">Loading...</div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: typeof User }[] = [
    { id: "profile", label: "Profile", icon: User },
    { id: "skills", label: "Skills", icon: Zap },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "activities", label: "Activities", icon: Activity },
  ];

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

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto py-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-alt tracking-wider uppercase transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <tab.icon size={14} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto space-y-6">

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-lg font-heading font-semibold text-foreground mb-6">Profile & Contact</h2>
              <div className="space-y-5">
                {profileSections.map((section) => (
                  <div key={section.key} className="space-y-2">
                    <Label className="text-xs font-alt uppercase tracking-wider text-muted-foreground">{section.label}</Label>
                    {section.type === "textarea" ? (
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
          )}

          {/* Skills Tab */}
          {activeTab === "skills" && (
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-heading font-semibold text-foreground">Skills</h2>
                <Button size="sm" variant="outline" onClick={() => setSkills([...skills, { name: "", detail: "", level: 50 }])}>
                  <Plus size={14} /> Add Skill
                </Button>
              </div>
              <div className="space-y-6">
                {skills.map((skill, i) => (
                  <div key={i} className="p-4 rounded-xl bg-secondary/30 border border-border space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-alt text-muted-foreground uppercase tracking-wider">Skill {i + 1}</span>
                      <Button size="sm" variant="ghost" className="text-destructive h-7 w-7 p-0" onClick={() => setSkills(skills.filter((_, j) => j !== i))}>
                        <Trash2 size={14} />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-[10px] font-alt uppercase text-muted-foreground">Name</Label>
                        <Input value={skill.name} onChange={e => { const s = [...skills]; s[i].name = e.target.value; setSkills(s); }} className="bg-secondary/50 border-border h-9 text-sm" />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[10px] font-alt uppercase text-muted-foreground">Detail</Label>
                        <Input value={skill.detail} onChange={e => { const s = [...skills]; s[i].detail = e.target.value; setSkills(s); }} className="bg-secondary/50 border-border h-9 text-sm" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] font-alt uppercase text-muted-foreground">Level: {skill.level}%</Label>
                      <input
                        type="range" min="0" max="100" value={skill.level}
                        onChange={e => { const s = [...skills]; s[i].level = Number(e.target.value); setSkills(s); }}
                        className="w-full h-2 rounded-full appearance-none bg-secondary cursor-pointer accent-primary"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experience Tab */}
          {activeTab === "experience" && (
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-heading font-semibold text-foreground">Work Experience</h2>
                <Button size="sm" variant="outline" onClick={() => setExperience([...experience, { role: "", company: "", period: "", type: "Full-time", tasks: "" }])}>
                  <Plus size={14} /> Add Experience
                </Button>
              </div>
              <div className="space-y-6">
                {experience.map((exp, i) => (
                  <div key={i} className="p-4 rounded-xl bg-secondary/30 border border-border space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-alt text-muted-foreground uppercase tracking-wider">Experience {i + 1}</span>
                      <Button size="sm" variant="ghost" className="text-destructive h-7 w-7 p-0" onClick={() => setExperience(experience.filter((_, j) => j !== i))}>
                        <Trash2 size={14} />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-[10px] font-alt uppercase text-muted-foreground">Role</Label>
                        <Input value={exp.role} onChange={e => { const x = [...experience]; x[i].role = e.target.value; setExperience(x); }} className="bg-secondary/50 border-border h-9 text-sm" />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[10px] font-alt uppercase text-muted-foreground">Company</Label>
                        <Input value={exp.company} onChange={e => { const x = [...experience]; x[i].company = e.target.value; setExperience(x); }} className="bg-secondary/50 border-border h-9 text-sm" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-[10px] font-alt uppercase text-muted-foreground">Period</Label>
                        <Input value={exp.period} onChange={e => { const x = [...experience]; x[i].period = e.target.value; setExperience(x); }} className="bg-secondary/50 border-border h-9 text-sm" placeholder="2023 – 2024" />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[10px] font-alt uppercase text-muted-foreground">Type</Label>
                        <Input value={exp.type} onChange={e => { const x = [...experience]; x[i].type = e.target.value; setExperience(x); }} className="bg-secondary/50 border-border h-9 text-sm" placeholder="Full-time / Internship" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] font-alt uppercase text-muted-foreground">Tasks (one per line)</Label>
                      <Textarea value={exp.tasks} onChange={e => { const x = [...experience]; x[i].tasks = e.target.value; setExperience(x); }} className="bg-secondary/50 border-border min-h-[80px] text-sm" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education Tab */}
          {activeTab === "education" && (
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-heading font-semibold text-foreground">Certifications</h2>
                <Button size="sm" variant="outline" onClick={() => setCerts([...certs, { name: "", org: "" }])}>
                  <Plus size={14} /> Add Certificate
                </Button>
              </div>
              <div className="space-y-4">
                {certs.map((cert, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex-1 grid grid-cols-2 gap-3">
                      <Input value={cert.name} onChange={e => { const c = [...certs]; c[i].name = e.target.value; setCerts(c); }} placeholder="Certificate name" className="bg-secondary/50 border-border h-9 text-sm" />
                      <Input value={cert.org} onChange={e => { const c = [...certs]; c[i].org = e.target.value; setCerts(c); }} placeholder="Organization" className="bg-secondary/50 border-border h-9 text-sm" />
                    </div>
                    <Button size="sm" variant="ghost" className="text-destructive h-7 w-7 p-0 shrink-0" onClick={() => setCerts(certs.filter((_, j) => j !== i))}>
                      <Trash2 size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Activities Tab */}
          {activeTab === "activities" && (
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-heading font-semibold text-foreground">Leadership & Activities</h2>
                <Button size="sm" variant="outline" onClick={() => setLeadership([...leadership, { title: "", desc: "" }])}>
                  <Plus size={14} /> Add Role
                </Button>
              </div>
              <div className="space-y-4">
                {leadership.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex-1 grid grid-cols-2 gap-3">
                      <Input value={item.title} onChange={e => { const l = [...leadership]; l[i].title = e.target.value; setLeadership(l); }} placeholder="Title" className="bg-secondary/50 border-border h-9 text-sm" />
                      <Input value={item.desc} onChange={e => { const l = [...leadership]; l[i].desc = e.target.value; setLeadership(l); }} placeholder="Description" className="bg-secondary/50 border-border h-9 text-sm" />
                    </div>
                    <Button size="sm" variant="ghost" className="text-destructive h-7 w-7 p-0 shrink-0" onClick={() => setLeadership(leadership.filter((_, j) => j !== i))}>
                      <Trash2 size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
