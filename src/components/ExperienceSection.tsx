import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, ArrowUpRight } from "lucide-react";
import type { ExperienceData } from "@/hooks/usePortfolioContent";

const defaultExperience: ExperienceData[] = [
  { role: "E-Commerce Associate", company: "Glomark, Thalawathugoda", period: "2023 – 2024", type: "Part-time", tasks: "Supported e-commerce operations and customer service\nAssisted with inventory management and order processing" },
  { role: "Administrative Assistant (Intern)", company: "Maixes Company", period: "2019 – 2020", type: "Internship", tasks: "Assisted with administrative operations and daily workflows\nSupported internal and external communication channels\nManaged documentation, filing, and data entry" },
];

interface Props { experience?: ExperienceData[]; }

const ExperienceSection = ({ experience = defaultExperience }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="section-padding relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-alt tracking-[0.2em] uppercase mb-6">
              <Briefcase size={12} />
              Experience
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold">
              Work <span className="text-gradient-gold">Experience</span>
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />

            {experience.map((exp, i) => {
              const tasks = exp.tasks.split("\n").filter(t => t.trim());
              return (
                <motion.div
                  key={exp.company + i}
                  initial={{ opacity: 0, x: -40 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.2 }}
                  className="relative pl-14 mb-10 last:mb-0"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.4 + i * 0.2, type: "spring" }}
                    className="absolute left-2.5 top-3 w-[14px] h-[14px] rounded-full border-2 border-primary bg-background z-10"
                  >
                    <div className="absolute inset-1 rounded-full bg-primary" />
                  </motion.div>

                  <div className="glass-card-hover rounded-2xl p-7 group">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="text-[10px] px-3 py-1 rounded-full border border-primary/30 text-primary font-alt tracking-wider uppercase">
                        {exp.type}
                      </span>
                      <span className="text-xs text-primary/70 font-alt ml-auto">{exp.period}</span>
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-foreground mb-1 flex items-center gap-2">
                      {exp.role}
                      <ArrowUpRight size={16} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-primary/70 text-sm font-alt mb-5">{exp.company}</p>
                    <ul className="space-y-2.5">
                      {tasks.map((task, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground font-body">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mt-2 shrink-0" />
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
