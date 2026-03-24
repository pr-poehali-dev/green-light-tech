import { useScroll, useTransform, motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const WEDDING_DATE = new Date("2026-09-01T14:00:00");

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const diff = WEDDING_DATE.getTime() - now.getTime();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex gap-6 justify-center mt-8">
      {[
        { v: timeLeft.days, l: "дней" },
        { v: timeLeft.hours, l: "часов" },
        { v: timeLeft.minutes, l: "минут" },
        { v: timeLeft.seconds, l: "секунд" },
      ].map(({ v, l }) => (
        <div key={l} className="flex flex-col items-center">
          <span className="font-serif text-3xl md:text-5xl text-white leading-none">
            {String(v).padStart(2, "0")}
          </span>
          <span className="text-white/60 text-xs uppercase tracking-widest mt-1">{l}</span>
        </div>
      ))}
    </div>
  );
}

function FloatingParticle({ delay, left, size, type }: { delay: number; left: string; size: number; type: "heart" | "pearl" | "petal" }) {
  return (
    <motion.div
      className="absolute bottom-0 pointer-events-none z-20"
      style={{ left }}
      initial={{ y: 0, opacity: 0, x: 0 }}
      animate={{
        y: [0, -window.innerHeight - 100],
        opacity: [0, 0.8, 0.8, 0],
        x: [0, 20, -15, 10, 0],
        rotate: type === "pearl" ? 0 : [0, 180, 360],
      }}
      transition={{
        duration: 8 + Math.random() * 6,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 4,
        ease: "easeInOut",
      }}
    >
      {type === "heart" && (
        <span style={{ fontSize: size }} className="text-rose-200/70">♥</span>
      )}
      {type === "pearl" && (
        <div
          style={{ width: size, height: size }}
          className="rounded-full bg-white/60 shadow-inner"
          css-trick="pearl-shimmer"
        />
      )}
      {type === "petal" && (
        <span style={{ fontSize: size }} className="text-pink-200/60">✿</span>
      )}
    </motion.div>
  );
}

const particles = [
  { delay: 0, left: "10%", size: 14, type: "heart" as const },
  { delay: 1.5, left: "25%", size: 8, type: "pearl" as const },
  { delay: 2.8, left: "40%", size: 18, type: "petal" as const },
  { delay: 0.5, left: "55%", size: 10, type: "pearl" as const },
  { delay: 3.5, left: "70%", size: 12, type: "heart" as const },
  { delay: 1, left: "82%", size: 16, type: "petal" as const },
  { delay: 4, left: "92%", size: 9, type: "pearl" as const },
  { delay: 2, left: "5%", size: 20, type: "petal" as const },
  { delay: 5, left: "60%", size: 11, type: "heart" as const },
  { delay: 3, left: "88%", size: 7, type: "pearl" as const },
];

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "50vh"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div
      ref={container}
      id="home"
      className="relative flex items-center justify-center h-screen overflow-hidden"
    >
      {/* Parallax background */}
      <motion.div style={{ y }} className="absolute inset-0 w-full h-full">
        <img
          src="https://cdn.poehali.dev/projects/e50b24b0-a722-4de0-9d04-bf3cec58ef05/files/23ef7dab-37ea-4f29-bcac-46c1b6aa4358.jpg"
          alt="Санкт-Петербург"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </motion.div>

      {/* Floating particles */}
      {particles.map((p, i) => (
        <FloatingParticle key={i} {...p} />
      ))}

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-6"
      >
        {/* Decorative lace top */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[hsl(44,70%,62%)]" />
          <span className="text-[hsl(44,70%,70%)] text-lg">♦</span>
          <span className="text-white/60 uppercase tracking-[0.4em] text-xs">Save the Date</span>
          <span className="text-[hsl(44,70%,70%)] text-lg">♦</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[hsl(44,70%,62%)]" />
        </motion.div>

        {/* Names */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="font-serif text-6xl md:text-8xl lg:text-9xl text-white font-light leading-tight tracking-wide"
        >
          Василий
          <br />
          <span className="text-[hsl(44,70%,70%)]">&</span>
          <br />
          Мария
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="font-serif text-xl md:text-2xl text-white/80 mt-4 tracking-[0.2em] italic"
        >
          Строгановы
        </motion.p>

        {/* Date */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-8"
        >
          <p className="text-[hsl(44,70%,70%)] uppercase tracking-[0.5em] text-sm">
            1 сентября 2026
          </p>
          <p className="text-white/60 text-sm mt-1 tracking-widest uppercase">
            Санкт-Петербург
          </p>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          <Countdown />
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="mt-12 flex flex-col items-center gap-2"
        >
          <span className="text-white/40 text-xs uppercase tracking-widest">Листайте</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="text-white/40 text-lg"
          >
            ↓
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}