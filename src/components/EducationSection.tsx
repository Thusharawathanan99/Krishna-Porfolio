import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Award } from "lucide-react";

const certificates = [
  "WhatsApp API – Wati Academy",
  "Digital Marketing – HubSpot",
  "Sales Management – HubSpot",
  "Content Marketing – HubSpot",
  "English Mastery – Alpha International Campus",
  "Agile Project Management – HP LIFE",
];

const EducationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-heading font-bold mb-12 line-accent"
          >
            Education & <span className="text-gradient-gold">Certifications</span>
          </motion.h2>

          {/* Degree */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card rounded-xl p-8 mb-8 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-primary rounded-full" />
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <GraduationCap size={26} className="text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-semibold text-foreground">
                  BSc in Human Resources Management
                </h3>
                <p className="text-primary font-body text-sm mt-1">Horizon Campus, Malabe</p>
                <p className="text-muted-foreground font-body text-sm mt-1">Graduating 2026</p>
              </div>
            </div>
          </motion.div>

          {/* School */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="glass-card rounded-xl p-8 mb-8"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-primary/50 rounded-full" />
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-foreground font-body">A/L (Arts Stream)</span>
                <span className="text-muted-foreground text-sm font-body">2019</span>
              </div>
              <div className="h-px bg-border" />
              <div className="flex justify-between items-center">
                <span className="text-foreground font-body">O/L</span>
                <span className="text-muted-foreground text-sm font-body">2016</span>
              </div>
            </div>
          </motion.div>

          {/* Certificates */}
          <motion.h3
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="text-2xl font-heading font-semibold mb-6 flex items-center gap-3"
          >
            <Award size={22} className="text-primary" />
            Professional Certifications
          </motion.h3>

          <div className="grid sm:grid-cols-2 gap-4">
            {certificates.map((cert, i) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                whileHover={{ scale: 1.02, x: 4 }}
                className="glass-card rounded-lg px-5 py-4 flex items-center gap-3 group cursor-default"
              >
                <div className="w-2 h-2 rounded-full bg-primary shrink-0 group-hover:animate-pulse-glow" />
                <span className="text-sm font-body text-foreground">{cert}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
