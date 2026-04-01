import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";

const contacts = [
  { icon: Phone, label: "Phone", value: "077 4998574", href: "tel:0774998574" },
  { icon: Mail, label: "Email", value: "illayarajahk@gmail.com", href: "mailto:illayarajahk@gmail.com" },
  { icon: MapPin, label: "Location", value: "Lunugala", href: "#" },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/illayarajahkrishnak", href: "https://linkedin.com/in/illayarajahkrishnak" },
];

const references = [
  { name: "Mr. Chrishankar Janathanan", role: "Senior Lecturer" },
  { name: "Mr. Terence Kahapola Arachchi", role: "Dean" },
];

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-heading font-bold mb-12 line-accent"
          >
            Get In <span className="text-gradient-gold">Touch</span>
          </motion.h2>

          <div className="grid sm:grid-cols-2 gap-5 mb-16">
            {contacts.map((c, i) => (
              <motion.a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 * i }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="glass-card rounded-xl p-6 flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <c.icon size={22} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-body uppercase tracking-wider">{c.label}</p>
                  <p className="text-sm text-foreground font-body mt-1">{c.value}</p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* References */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <h3 className="text-2xl font-heading font-semibold mb-6 text-foreground">References</h3>
            <div className="grid sm:grid-cols-2 gap-5">
              {references.map((r, i) => (
                <div key={i} className="glass-card rounded-xl p-6">
                  <p className="font-heading font-semibold text-foreground">{r.name}</p>
                  <p className="text-sm text-muted-foreground font-body mt-1">{r.role}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-24 border-t border-border pt-8">
        <p className="text-center text-sm text-muted-foreground font-body">
          © 2025 Idhayaraja Krishna Kumar. All rights reserved.
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
