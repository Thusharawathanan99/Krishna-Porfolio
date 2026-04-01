import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, FileText, Users, Camera, Handshake } from "lucide-react";

const skills = [
  { icon: Globe, name: "Languages", detail: "Tamil, Sinhala, English", level: 85 },
  { icon: FileText, name: "MS Office", detail: "Word & PowerPoint", level: 75 },
  { icon: Users, name: "Team Leadership", detail: "Leading & motivating teams", level: 80 },
  { icon: Handshake, name: "Collaboration", detail: "Cross-functional teamwork", level: 90 },
  { icon: Camera, name: "Mobile Photography", detail: "Visual content creation", level: 70 },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-heading font-bold mb-12 line-accent"
          >
            My <span className="text-gradient-gold">Skills</span>
          </motion.h2>

          <div className="grid gap-6">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 * i }}
                className="glass-card rounded-xl p-6 group hover:glow-gold transition-shadow duration-500"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <skill.icon size={20} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-semibold text-foreground">{skill.name}</h3>
                    <p className="text-xs text-muted-foreground font-body">{skill.detail}</p>
                  </div>
                  <span className="text-sm text-primary font-body font-semibold">{skill.level}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1.2, delay: 0.3 + i * 0.15, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ background: "var(--gradient-gold)" }}
                  />
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
