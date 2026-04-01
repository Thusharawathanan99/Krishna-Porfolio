import { motion } from "framer-motion";
import { ArrowDown, Linkedin, Mail, Phone, MapPin, Download } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.webp";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-[100px]"
          animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/[0.04] blur-[120px]"
          animate={{ x: [0, -50, 0], y: [0, 40, 0], scale: [1.1, 0.9, 1.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/[0.02] blur-[80px]"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{ backgroundImage: 'linear-gradient(hsl(35 100% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(35 100% 50%) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Text */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-4"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-alt tracking-[0.2em] uppercase">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                HR Professional
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <p className="text-muted-foreground font-alt text-sm tracking-[0.3em] uppercase mb-3">Hello, I'm</p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-2 leading-[1.1]"
            >
              <span className="text-foreground">Idhayaraja</span>
            </motion.h1>

            <motion.h1
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-[1.1]"
            >
              <span className="text-gradient-gold text-shadow-glow">Krishna Kumar</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="text-base md:text-lg text-muted-foreground font-body max-w-lg mb-8 leading-relaxed"
            >
              BSc Human Resources Management undergraduate passionate about employee engagement, 
              recruitment, and building strong organizational culture.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="flex gap-8 mb-10"
            >
              {[
                { number: "6+", label: "Certifications" },
                { number: "2+", label: "Years Exp" },
                { number: "5+", label: "Leadership Roles" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-heading font-bold text-gradient-gold">{stat.number}</div>
                  <div className="text-xs text-muted-foreground font-alt tracking-wider uppercase mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Contact pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="flex flex-wrap items-center gap-3"
            >
              {[
                { icon: Phone, text: "077 4998574", href: "tel:0774998574" },
                { icon: Mail, text: "illayarajahk@gmail.com", href: "mailto:illayarajahk@gmail.com" },
                { icon: MapPin, text: "Lunugala", href: "#contact" },
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full glass-card text-xs font-alt text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                >
                  <item.icon size={13} className="text-primary" />
                  <span>{item.text}</span>
                </motion.a>
              ))}
              <motion.a
                href="https://linkedin.com/in/illayarajahkrishnak"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full glass-card text-xs font-alt text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
              >
                <Linkedin size={13} className="text-primary" />
                <span>LinkedIn</span>
              </motion.a>
            </motion.div>
          </div>

          {/* Right - Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 60 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Decorative ring */}
              <motion.div
                className="absolute -inset-4 rounded-full border border-primary/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -inset-8 rounded-full border border-dashed border-primary/10"
                animate={{ rotate: -360 }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Glow behind photo */}
              <div className="absolute inset-0 rounded-full bg-primary/10 blur-[60px] scale-110" />

              {/* Photo */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden photo-glow border-2 border-primary/20">
                <img
                  src={profilePhoto}
                  alt="Idhayaraja Krishna Kumar"
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-6 top-1/4 glass-card rounded-xl px-4 py-3 text-center"
              >
                <div className="text-lg font-heading font-bold text-primary">BSc</div>
                <div className="text-[10px] font-alt text-muted-foreground uppercase tracking-wider">HR Mgmt</div>
              </motion.div>

              <motion.div
                animate={{ y: [8, -8, 8] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-6 bottom-1/4 glass-card rounded-xl px-4 py-3 text-center"
              >
                <div className="text-lg font-heading font-bold text-primary">🏐</div>
                <div className="text-[10px] font-alt text-muted-foreground uppercase tracking-wider">National</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase font-alt">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown size={16} />
          </motion.div>
        </motion.a>
      </div>
    </section>
  );
};

export default HeroSection;
