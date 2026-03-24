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

function FloatingHeart({ delay, left, size }: { delay: number; left: string; size: number }) {
  return (
    <motion.div
      className="absolute bottom-0 pointer-events-none z-20"
      style={{ left }}
      initial={{ y: 0, opacity: 0 }}
      animate={{
        y: [0, -(typeof window !== "undefined" ? window.innerHeight : 800) - 100],
        opacity: [0, 0.75, 0.75, 0],
        x: [0, 15, -10, 8, 0],
      }}
      transition={{
        duration: 9 + Math.random() * 5,
        delay,
        repeat: Infinity,
        repeatDelay: 2 + Math.random() * 3,
        ease: "easeInOut",
      }}
    >
      <span style={{ fontSize: size }} className="text-rose-200/75">♥</span>
    </motion.div>
  );
}

const hearts = [
  { delay: 0, left: "8%", size: 13 },
  { delay: 1.8, left: "20%", size: 9 },
  { delay: 3.2, left: "35%", size: 16 },
  { delay: 0.7, left: "50%", size: 10 },
  { delay: 4.1, left: "65%", size: 14 },
  { delay: 2.2, left: "78%", size: 8 },
  { delay: 5.0, left: "90%", size: 12 },
  { delay: 1.0, left: "55%", size: 18 },
  { delay: 6.0, left: "28%", size: 7 },
  { delay: 3.8, left: "85%", size: 11 },
];

/* Decorative flower SVGs */
function Rose({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="14" fill="#E8B4B8" opacity="0.85" />
      <ellipse cx="40" cy="26" rx="10" ry="14" fill="#F4C2C2" opacity="0.7" transform="rotate(0 40 40)" />
      <ellipse cx="40" cy="26" rx="10" ry="14" fill="#F4C2C2" opacity="0.6" transform="rotate(60 40 40)" />
      <ellipse cx="40" cy="26" rx="10" ry="14" fill="#F4C2C2" opacity="0.6" transform="rotate(120 40 40)" />
      <ellipse cx="40" cy="26" rx="10" ry="14" fill="#EDA8AC" opacity="0.5" transform="rotate(180 40 40)" />
      <ellipse cx="40" cy="26" rx="10" ry="14" fill="#EDA8AC" opacity="0.5" transform="rotate(240 40 40)" />
      <ellipse cx="40" cy="26" rx="10" ry="14" fill="#EDA8AC" opacity="0.5" transform="rotate(300 40 40)" />
      <line x1="40" y1="54" x2="40" y2="76" stroke="#7BA05B" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="32" cy="66" rx="7" ry="4" fill="#7BA05B" opacity="0.7" transform="rotate(-30 32 66)" />
    </svg>
  );
}

function Peony({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="10" fill="#F2A7B8" opacity="0.9" />
      {[0,40,80,120,160,200,240,280,320].map((deg, i) => (
        <ellipse key={i} cx="40" cy="24" rx="8" ry="16" fill="#F9C4D0" opacity="0.55"
          transform={`rotate(${deg} 40 40)`} />
      ))}
      <ellipse cx="40" cy="28" rx="6" ry="12" fill="#F2A7B8" opacity="0.5" transform="rotate(20 40 40)" />
      <ellipse cx="40" cy="28" rx="6" ry="12" fill="#F2A7B8" opacity="0.5" transform="rotate(100 40 40)" />
      <ellipse cx="40" cy="28" rx="6" ry="12" fill="#F2A7B8" opacity="0.5" transform="rotate(200 40 40)" />
      <line x1="40" y1="54" x2="38" y2="76" stroke="#7BA05B" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="31" cy="68" rx="7" ry="4" fill="#7BA05B" opacity="0.7" transform="rotate(-25 31 68)" />
    </svg>
  );
}

function Hydrangea({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {[
        [40,28],[52,36],[52,52],[40,58],[28,52],[28,36]
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="10" fill="#A8C4D8" opacity="0.65" />
          <circle cx={cx} cy={cy} r="5" fill="#BFD8E8" opacity="0.8" />
          <circle cx={cx} cy={cy} r="2" fill="#D4EAF5" opacity="0.9" />
        </g>
      ))}
      <circle cx="40" cy="42" r="9" fill="#9BBAD0" opacity="0.5" />
      <line x1="40" y1="64" x2="40" y2="76" stroke="#7BA05B" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

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
      {/* Animated bars when playing */}
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

      {/* Floating hearts */}
      {hearts.map((h, i) => (
        <FloatingHeart key={i} {...h} />
      ))}

      {/* Decorative flowers — corners */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute bottom-0 left-0 pointer-events-none z-10 flex gap-1 items-end"
      >
        <Rose className="w-24 h-24 opacity-70 drop-shadow-lg" />
        <Peony className="w-20 h-20 opacity-60 drop-shadow-lg -mb-1" />
        <Hydrangea className="w-16 h-16 opacity-65 drop-shadow-lg mb-1" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="absolute bottom-0 right-0 pointer-events-none z-10 flex gap-1 items-end"
      >
        <Hydrangea className="w-16 h-16 opacity-65 drop-shadow-lg mb-1" />
        <Peony className="w-20 h-20 opacity-60 drop-shadow-lg -mb-1" />
        <Rose className="w-24 h-24 opacity-70 drop-shadow-lg" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="absolute top-20 left-4 pointer-events-none z-10 hidden lg:block"
      >
        <Hydrangea className="w-14 h-14 opacity-45 drop-shadow-md" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.2 }}
        className="absolute top-20 right-4 pointer-events-none z-10 hidden lg:block"
      >
        <Rose className="w-14 h-14 opacity-45 drop-shadow-md" />
      </motion.div>

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