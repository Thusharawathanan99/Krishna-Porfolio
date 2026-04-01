import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    role: "E-Commerce Associate",
    company: "Glomark, Thalawathugoda",
    period: "2023 – 2024",
    type: "Part-time",
    tasks: ["Supported e-commerce operations and customer service"],
  },
  {
    role: "Administrative Assistant (Intern)",
    company: "Maixes Company",
    period: "2019 – 2020",
    type: "Internship",
    tasks: [
      "Assisted with administrative operations",
      "Supported internal and external communication",
      "Managed documentation and filing",
    ],
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-heading font-bold mb-12 line-accent"
          >
            Work <span className="text-gradient-gold">Experience</span>
          </motion.h2>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-border md:left-8" />

            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.2 }}
                className="relative pl-16 md:pl-20 mb-12 last:mb-0"
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-6 top-2 w-5 h-5 rounded-full border-2 border-primary bg-background z-10" />

                <div className="glass-card rounded-xl p-6 group hover:glow-gold transition-shadow duration-500">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <Briefcase size={16} className="text-primary" />
                    <span className="text-xs px-3 py-1 rounded-full border border-primary/30 text-primary font-body">
                      {exp.type}
                    </span>
                    <span className="text-xs text-muted-foreground font-body ml-auto">{exp.period}</span>
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-1">{exp.role}</h3>
                  <p className="text-primary/80 text-sm font-body mb-4">{exp.company}</p>
                  <ul className="space-y-2">
                    {exp.tasks.map((task, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground font-body">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 shrink-0" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
