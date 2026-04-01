import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Star, Shield, Heart, Award, Activity } from "lucide-react";

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
    <section id="activities" className="section-padding relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-alt tracking-[0.2em] uppercase mb-6">
              <Activity size={12} />
              Activities
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold">
              Leadership & <span className="text-gradient-gold">Activities</span>
            </h2>
          </motion.div>

          {/* Leadership cards */}
          <div className="grid sm:grid-cols-2 gap-4 mb-16">
            {leadership.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.12 * i }}
                className="glass-card-hover rounded-2xl p-6 flex items-start gap-4 cursor-default group"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-all duration-300">
                  <item.icon size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-alt text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-xs text-muted-foreground font-body mt-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Volunteering & Achievements */}
          <div className="grid md:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <h3 className="text-xl font-heading font-semibold mb-6 text-foreground flex items-center gap-2">
                <div className="w-1 h-6 rounded-full bg-primary" />
                Volunteering
              </h3>
              <div className="space-y-3">
                {volunteering.map((v, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + i * 0.08 }}
                    className="flex items-center gap-3 text-sm text-muted-foreground font-body py-2 px-3 rounded-lg hover:bg-secondary/30 transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    {v}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <h3 className="text-xl font-heading font-semibold mb-6 text-foreground flex items-center gap-2">
                <div className="w-1 h-6 rounded-full bg-primary" />
                Achievements
              </h3>
              <div className="space-y-3">
                {achievements.map((a, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.7 + i * 0.08 }}
                    className="flex items-center gap-3 text-sm text-muted-foreground font-body py-2 px-3 rounded-lg hover:bg-secondary/30 transition-colors"
                  >
                    <Trophy size={14} className="text-primary shrink-0" />
                    {a}
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

export default ActivitiesSection;
