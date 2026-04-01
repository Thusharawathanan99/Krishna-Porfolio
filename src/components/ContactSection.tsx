import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, MapPin, Linkedin, Send } from "lucide-react";

const references = [
  { name: "Mr. Chrishankar Janathanan", role: "Senior Lecturer" },
  { name: "Mr. Terence Kahapola Arachchi", role: "Dean" },
];

const defaultContent: Record<string, string> = {
  phone: "077 4998574",
  email: "illayarajahk@gmail.com",
  location: "Lunugala",
  linkedin_url: "https://linkedin.com/in/illayarajahkrishnak",
  hero_name_first: "Idhayaraja",
  hero_name_last: "Krishna Kumar",
};

interface ContactProps {
  content?: Record<string, string>;
}

const ContactSection = ({ content = defaultContent }: ContactProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contacts = [
    { icon: Phone, label: "Phone", value: content.phone, href: `tel:${content.phone?.replace(/\s/g, '')}` },
    { icon: Mail, label: "Email", value: content.email, href: `mailto:${content.email}` },
    { icon: MapPin, label: "Location", value: content.location, href: "#" },
    { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/illayarajahkrishnak", href: content.linkedin_url },
  ];

  return (
    <section id="contact" className="section-padding relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-alt tracking-[0.2em] uppercase mb-6">
              <Send size={12} />
              Contact
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold">
              Get In <span className="text-gradient-gold">Touch</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4 mb-16">
            {contacts.map((c, i) => (
              <motion.a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.12 * i }}
                className="glass-card-hover rounded-2xl p-6 flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                  <c.icon size={22} className="text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-muted-foreground font-alt uppercase tracking-[0.2em]">{c.label}</p>
                  <p className="text-sm text-foreground font-alt mt-1 truncate group-hover:text-primary transition-colors">{c.value}</p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* References */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <h3 className="text-2xl font-heading font-semibold mb-6 text-foreground flex items-center gap-2">
              <div className="w-1 h-6 rounded-full bg-primary" />
              References
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {references.map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="glass-card-hover rounded-2xl p-6"
                >
                  <p className="font-alt font-semibold text-foreground text-sm">{r.name}</p>
                  <p className="text-xs text-muted-foreground font-body mt-1">{r.role}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
        className="mt-28 border-t border-border pt-8"
      >
        <p className="text-center text-xs text-muted-foreground font-alt tracking-wider">
          © 2025 {content.hero_name_first} {content.hero_name_last} · All rights reserved
        </p>
      </motion.div>
    </section>
  );
};

export default ContactSection;
