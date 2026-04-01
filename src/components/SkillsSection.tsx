import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, FileText, Users, Camera, Handshake, Zap } from "lucide-react";

const skills = [
  { icon: Globe, name: "Languages", detail: "Tamil, Sinhala, English", level: 85, color: "from-amber-400 to-orange-500" },
  { icon: FileText, name: "MS Office", detail: "Word & PowerPoint", level: 75, color: "from-amber-400 to-yellow-500" },
  { icon: Users, name: "Team Leadership", detail: "Leading & motivating teams", level: 80, color: "from-orange-400 to-amber-500" },
  { icon: Handshake, name: "Collaboration", detail: "Cross-functional teamwork", level: 90, color: "from-yellow-400 to-amber-500" },
  { icon: Camera, name: "Mobile Photography", detail: "Visual content creation", level: 70, color: "from-amber-500 to-orange-400" },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-alt tracking-[0.2em] uppercase mb-6">
              <Zap size={12} />
              Skills
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold">
              My <span className="text-gradient-gold">Skills</span>
            </h2>
          </motion.div>

          <div className="grid gap-5">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.12 * i }}
                className="glass-card-hover rounded-2xl p-6 group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                    <skill.icon size={20} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-alt text-sm font-semibold text-foreground">{skill.name}</h3>
                    <p className="text-xs text-muted-foreground font-body">{skill.detail}</p>
                  </div>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="text-lg font-heading font-bold text-primary"
                  >
                    {skill.level}%
                  </motion.span>
                </div>
                <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1.4, delay: 0.3 + i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="h-full rounded-full relative"
                    style={{ background: "var(--gradient-gold)" }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/30" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
