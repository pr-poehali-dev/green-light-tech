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

const HEART_COLORS = [
  "rgba(255,255,255,0.80)",
  "rgba(255,255,255,0.65)",
  "rgba(212,185,120,0.75)",
  "rgba(228,196,110,0.70)",
  "rgba(255,255,255,0.90)",
  "rgba(212,185,120,0.80)",
  "rgba(255,255,255,0.70)",
  "rgba(228,196,110,0.65)",
  "rgba(255,255,255,0.75)",
  "rgba(212,185,120,0.70)",
];

function FloatingHeart({ delay, left, size, color }: { delay: number; left: string; size: number; color: string }) {
  return (
    <motion.div
      className="absolute bottom-0 pointer-events-none z-20"
      style={{ left }}
      initial={{ y: 0, opacity: 0 }}
      animate={{
        y: [0, -(typeof window !== "undefined" ? window.innerHeight : 800) - 100],
        opacity: [0, 0.85, 0.85, 0],
        x: [0, 14, -10, 7, 0],
      }}
      transition={{
        duration: 9 + Math.random() * 5,
        delay,
        repeat: Infinity,
        repeatDelay: 2 + Math.random() * 3,
        ease: "easeInOut",
      }}
    >
      <span style={{ fontSize: size, color }}>♥</span>
    </motion.div>
  );
}

const hearts = [
  { delay: 0,   left: "8%",  size: 13 },
  { delay: 1.8, left: "20%", size: 9  },
  { delay: 3.2, left: "35%", size: 16 },
  { delay: 0.7, left: "50%", size: 10 },
  { delay: 4.1, left: "65%", size: 14 },
  { delay: 2.2, left: "78%", size: 8  },
  { delay: 5.0, left: "90%", size: 12 },
  { delay: 1.0, left: "55%", size: 18 },
  { delay: 6.0, left: "28%", size: 7  },
  { delay: 3.8, left: "85%", size: 11 },
];

function MusicButton() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.5 }}
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs uppercase tracking-widest hover:bg-black/60 transition-all duration-300 rounded-full"
    >
      <span className="flex items-end gap-0.5 h-3">
        {[1, 2, 3].map((i) => (
          <motion.span
            key={i}
            className="block w-0.5 bg-[hsl(44,70%,70%)] rounded-full"
            animate={playing ? { height: ["4px", "12px", "4px"] } : { height: "4px" }}
            transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </span>
      {playing ? "Пауза" : "Музыка"}
    </motion.button>
  );
}

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

      {/* Music button */}
      <MusicButton />

      {/* Floating hearts — white & gold */}
      {hearts.map((h, i) => (
        <FloatingHeart key={i} {...h} color={HEART_COLORS[i % HEART_COLORS.length]} />
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
          {/* Dusty-blue label */}
          <span className="text-[hsl(210,35%,75%)] uppercase tracking-[0.4em] text-xs">Save the Date</span>
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

        {/* Surname in dusty blue */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="font-serif text-xl md:text-2xl mt-4 tracking-[0.2em] italic"
          style={{ color: "hsl(210,40%,78%)" }}
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
          {/* City in dusty blue */}
          <p className="text-sm mt-1 tracking-widest uppercase" style={{ color: "hsl(210,35%,72%)" }}>
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
