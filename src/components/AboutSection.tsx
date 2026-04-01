import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Users, MessageSquare } from "lucide-react";

const interests = [
  { icon: Target, title: "Employee Engagement", desc: "Creating meaningful workplace experiences" },
  { icon: Users, title: "Recruitment", desc: "Finding the right talent for organizations" },
  { icon: MessageSquare, title: "Organizational Culture", desc: "Building strong, positive work environments" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 line-accent">
            About <span className="text-gradient-gold">Me</span>
          </h2>
          <p className="text-muted-foreground font-body text-lg leading-relaxed mt-8 mb-12">
            I am an HR Management undergraduate with a solid foundation in human resources principles. 
            With hands-on experience in administration, teamwork, and communication, I am driven by a 
            passion for creating impactful employee experiences and fostering thriving organizational cultures. 
            I bring a unique blend of academic knowledge and practical exposure to every challenge.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {interests.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="glass-card rounded-xl p-6 group cursor-default"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon size={22} className="text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground font-body">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
