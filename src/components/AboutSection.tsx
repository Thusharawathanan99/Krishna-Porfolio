import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Users, MessageSquare, Sparkles } from "lucide-react";

const interests = [
  { icon: Target, title: "Employee Engagement", desc: "Creating meaningful workplace experiences that drive performance" },
  { icon: Users, title: "Recruitment", desc: "Finding and attracting the right talent for organizations" },
  { icon: MessageSquare, title: "Organizational Culture", desc: "Building strong, positive and inclusive work environments" },
];

interface AboutProps {
  content: Record<string, string>;
}

const AboutSection = ({ content }: AboutProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-alt tracking-[0.2em] uppercase mb-6">
                <Sparkles size={12} />
                About Me
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold leading-tight">
                Passionate <br />
                <span className="text-gradient-gold">HR Professional</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <p className="text-muted-foreground font-body text-base leading-[1.8] mb-8">
                {content.about_text}
              </p>
              <div className="h-px bg-gradient-to-r from-primary/30 via-primary/10 to-transparent mb-8" />
              <div className="grid gap-4">
                {interests.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.12 }}
                    className="glass-card-hover rounded-xl p-5 flex items-start gap-4 group cursor-default"
                  >
                    <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-all duration-300">
                      <item.icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-alt text-sm font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="text-xs text-muted-foreground font-body leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
