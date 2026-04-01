import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Star, Shield, Heart } from "lucide-react";

const leadership = [
  { title: "Volleyball Player", desc: "National & School level", icon: Trophy },
  { title: "Team Leader", desc: "Volleyball Team Captain", icon: Star },
  { title: "Director", desc: "Rotaract Club", icon: Shield },
  { title: "Member", desc: "Leo Club & Sports Council", icon: Heart },
];

const volunteering = [
  "Numba Ha 25 – University Event",
  "Winfield Business Conversation 2025",
  "Bees Bells – Sales Promoter",
  "Agile Project Management Course",
];

const achievements = [
  "National-level Volleyball Participant",
  "Ampaya Pussa Camp 2021",
  "School Prefect (2015–2016)",
];

const ActivitiesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-heading font-bold mb-12 line-accent"
          >
            Leadership & <span className="text-gradient-gold">Activities</span>
          </motion.h2>

          {/* Leadership cards */}
          <div className="grid sm:grid-cols-2 gap-5 mb-16">
            {leadership.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.15 * i }}
                whileHover={{ y: -6 }}
                className="glass-card rounded-xl p-6 flex items-start gap-4 cursor-default"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground font-body">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Volunteering & Achievements side by side */}
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <h3 className="text-xl font-heading font-semibold mb-5 text-foreground">Volunteering</h3>
              <div className="space-y-3">
                {volunteering.map((v, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground font-body">
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    {v}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <h3 className="text-xl font-heading font-semibold mb-5 text-foreground">Achievements</h3>
              <div className="space-y-3">
                {achievements.map((a, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground font-body">
                    <Trophy size={14} className="text-primary shrink-0" />
                    {a}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;
