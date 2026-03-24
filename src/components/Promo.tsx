import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Promo() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10vh", "10vh"]);

  const floatingItems = [
    { emoji: "♥", x: "15%", y: "20%", size: "2rem", delay: 0 },
    { emoji: "✿", x: "75%", y: "15%", size: "1.5rem", delay: 0.5 },
    { emoji: "◯", x: "85%", y: "60%", size: "1rem", delay: 1 },
    { emoji: "✦", x: "10%", y: "70%", size: "1.2rem", delay: 1.5 },
    { emoji: "♦", x: "50%", y: "80%", size: "0.9rem", delay: 0.8 },
  ];

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed top-[-10vh] left-0 h-[120vh] w-full">
        <motion.div style={{ y }} className="relative w-full h-full">
          <img
            src="https://cdn.poehali.dev/projects/e50b24b0-a722-4de0-9d04-bf3cec58ef05/files/23ef7dab-37ea-4f29-bcac-46c1b6aa4358.jpg"
            alt="Санкт-Петербург ночью"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(220,20%,10%,0.7)] via-[hsl(210,25%,15%,0.5)] to-[hsl(44,40%,20%,0.6)]" />
        </motion.div>
      </div>

      {/* Floating decorative elements */}
      {floatingItems.map((item, i) => (
        <motion.div
          key={i}
          className="absolute z-10 text-[hsl(44,70%,70%,0.6)] pointer-events-none"
          style={{ left: item.x, top: item.y, fontSize: item.size }}
          animate={{ y: [0, -12, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, delay: item.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          {item.emoji}
        </motion.div>
      ))}

      {/* Lace overlay top */}
      <div className="absolute top-0 left-0 right-0 h-20 z-10 pointer-events-none">
        <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="w-full h-full opacity-20">
          <path d="M0,40 C150,0 300,80 450,40 C600,0 750,80 900,40 C1050,0 1150,60 1200,40 L1200,0 L0,0 Z" fill="hsl(40,40%,90%)" />
        </svg>
      </div>

      {/* Center quote */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-[hsl(44,70%,62%)]" />
            <span className="text-[hsl(44,70%,62%)]">✦</span>
            <div className="h-px w-12 bg-[hsl(44,70%,62%)]" />
          </div>

          <p className="font-serif text-3xl md:text-5xl lg:text-6xl text-white font-light leading-tight italic">
            «Любовь — это когда чужой город
            <br />
            становится твоим домом,
            <br />
            пока ты рядом»
          </p>

          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-12 bg-[hsl(44,70%,62%)]" />
            <span className="text-[hsl(44,70%,62%)]">✦</span>
            <div className="h-px w-12 bg-[hsl(44,70%,62%)]" />
          </div>

          <p className="text-[hsl(44,70%,70%)] uppercase tracking-[0.5em] text-xs mt-6">
            Василий & Мария · 12.09.2026
          </p>
        </motion.div>
      </div>

      {/* Lace overlay bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 z-10 pointer-events-none">
        <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="w-full h-full opacity-20">
          <path d="M0,40 C150,80 300,0 450,40 C600,80 750,0 900,40 C1050,80 1150,20 1200,40 L1200,80 L0,80 Z" fill="hsl(40,40%,90%)" />
        </svg>
      </div>
    </div>
  );
}
