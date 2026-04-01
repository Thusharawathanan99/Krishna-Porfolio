import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Award, BookOpen } from "lucide-react";

const certificates = [
  { name: "WhatsApp API", org: "Wati Academy" },
  { name: "Digital Marketing", org: "HubSpot" },
  { name: "Sales Management", org: "HubSpot" },
  { name: "Content Marketing", org: "HubSpot" },
  { name: "English Mastery", org: "Alpha International Campus" },
  { name: "Agile Project Management", org: "HP LIFE" },
];

const EducationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="section-padding relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-alt tracking-[0.2em] uppercase mb-6">
              <BookOpen size={12} />
              Education
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold">
              Education & <span className="text-gradient-gold">Certifications</span>
            </h2>
          </motion.div>

          {/* Degree card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="glass-card-hover rounded-2xl p-8 mb-6 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full rounded-full" style={{ background: 'var(--gradient-gold)' }} />
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <GraduationCap size={26} className="text-primary" />
              </div>
              <div>
                <div className="text-xs font-alt text-primary tracking-wider uppercase mb-2">2022 – 2026</div>
                <h3 className="text-xl font-heading font-semibold text-foreground">
                  BSc in Human Resources Management
                </h3>
                <p className="text-muted-foreground font-body text-sm mt-2">Horizon Campus, Malabe</p>
              </div>
            </div>
          </motion.div>

          {/* School education */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="glass-card-hover rounded-2xl p-8 mb-14"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-foreground font-alt text-sm font-medium">A/L (Arts Stream)</span>
                </div>
                <span className="text-xs text-primary font-alt tracking-wider">2019</span>
              </div>
              <div className="h-px bg-border" />
              <div className="flex justify-between items-center">
                <span className="text-foreground font-alt text-sm font-medium">O/L</span>
                <span className="text-xs text-primary font-alt tracking-wider">2016</span>
              </div>
            </div>
          </motion.div>

          {/* Certificates */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3 mb-8"
          >
            <Award size={20} className="text-primary" />
            <h3 className="text-2xl font-heading font-semibold text-foreground">Professional Certifications</h3>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certificates.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                className="glass-card-hover rounded-xl px-5 py-4 cursor-default group"
              >
                <h4 className="text-sm font-alt font-medium text-foreground mb-1 group-hover:text-primary transition-colors">{cert.name}</h4>
                <p className="text-xs text-muted-foreground font-body">{cert.org}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
