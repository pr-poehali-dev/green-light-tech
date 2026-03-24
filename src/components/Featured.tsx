import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function SectionTitle({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9 }}
      className="text-center mb-16"
    >
      <p className="text-[hsl(44,70%,55%)] uppercase tracking-[0.4em] text-xs mb-4">{label}</p>
      <h2 className="font-serif text-4xl md:text-6xl text-[hsl(220,15%,15%)] font-light mb-4">{title}</h2>
      {subtitle && (
        <p className="text-[hsl(215,15%,50%)] text-sm md:text-base max-w-xl mx-auto leading-relaxed">{subtitle}</p>
      )}
      <div className="flex items-center justify-center gap-3 mt-6">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-[hsl(44,70%,62%)]" />
        <span className="text-[hsl(44,70%,62%)] text-sm">✦</span>
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-[hsl(44,70%,62%)]" />
      </div>
    </motion.div>
  );
}

function StorySection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const x2 = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const events = [
    {
      year: "2019",
      title: "Первая встреча",
      text: "Тихий вечер на набережной Невы. Взгляды встретились у Дворцового моста — и весь Петербург, кажется, затаил дыхание.",
      emoji: "🌙",
    },
    {
      year: "2022",
      title: "Первое путешествие",
      text: "Венеция, каналы, вечернее вино. Они поняли: рядом с этим человеком хочется открывать новые города всю жизнь.",
      emoji: "🚢",
    },
    {
      year: "2025",
      title: "Предложение",
      text: "На рассвете в Петергофе, у фонтана, с кольцом в руке — она сказала «Да». Фонтаны тогда ещё не запустили, но они точно зашумели в сердцах.",
      emoji: "💍",
    },
    {
      year: "2026",
      title: "Свадьба",
      text: "12 сентября. Дворец. Вечная любовь. И вы — самые близкие люди рядом.",
      emoji: "♥",
    },
  ];

  return (
    <section id="story" ref={ref} className="bg-[hsl(40,40%,96%)] py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionTitle label="История любви" title="Наш путь" subtitle="Каждая история начинается с одного момента. Наша — с Петербурга." />

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[hsl(44,70%,62%,0.5)] to-transparent hidden md:block" />

          <div className="flex flex-col gap-16">
            {events.map((ev, i) => (
              <motion.div
                key={ev.year}
                style={{ x: i % 2 === 0 ? x1 : x2 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <span className="font-serif text-[hsl(44,70%,62%)] text-5xl">{ev.year}</span>
                  <h3 className="font-serif text-2xl text-[hsl(220,15%,15%)] mt-1">{ev.title}</h3>
                  <p className="text-[hsl(215,15%,45%)] text-sm leading-relaxed mt-3 max-w-sm">{ev.text}</p>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex flex-col items-center shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[hsl(40,40%,96%)] border-2 border-[hsl(44,70%,62%)] flex items-center justify-center text-xl shadow-md">
                    {ev.emoji}
                  </div>
                </div>

                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function VenueSection() {
  const venues = [
    {
      id: "ceremony",
      label: "Церемония",
      name: "Дворец бракосочетания №1",
      address: "Английская набережная, 28, Санкт-Петербург",
      time: "14:00",
      description: "Главный дворец бракосочетания Санкт-Петербурга — памятник архитектуры XVIII века с роскошными залами в стиле классицизма. Именно здесь, у берегов Невы, мы скажем «Да».",
      img: "https://cdn.poehali.dev/projects/e50b24b0-a722-4de0-9d04-bf3cec58ef05/files/d81f6803-38c7-4563-9656-60ea941cfd78.jpg",
    },
    {
      id: "restaurant",
      label: "Банкет",
      name: "Ресторан «Эрмитаж»",
      address: "Переулок Антоненко, 1, Санкт-Петербург",
      time: "17:00",
      description: "Исторический особняк в самом сердце Петербурга. Изысканная кухня, живая музыка, атмосфера петербургского шика — именно здесь продолжится наш праздник.",
      img: "https://cdn.poehali.dev/projects/e50b24b0-a722-4de0-9d04-bf3cec58ef05/files/ebc8ece7-dd3b-41a6-86c5-d6b92fd3b4f5.jpg",
    },
  ];

  return (
    <section id="venue" className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle label="Локации" title="Где мы будем" />

        <div className="grid md:grid-cols-2 gap-12">
          {venues.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="group"
            >
              <div className="relative overflow-hidden mb-6 vintage-frame">
                <img
                  src={v.img}
                  alt={v.name}
                  className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-[hsl(40,40%,96%)] px-4 py-1 border border-[hsl(44,70%,62%,0.5)]">
                  <span className="text-[hsl(44,70%,55%)] text-xs uppercase tracking-widest">{v.label}</span>
                </div>
                <div className="absolute top-4 right-4 bg-[hsl(220,15%,15%)] px-4 py-1">
                  <span className="text-white text-xs tracking-widest">{v.time}</span>
                </div>
              </div>
              <h3 className="font-serif text-2xl text-[hsl(220,15%,15%)] mb-2">{v.name}</h3>
              <p className="text-[hsl(44,70%,55%)] text-xs uppercase tracking-widest mb-3">{v.address}</p>
              <p className="text-[hsl(215,15%,45%)] text-sm leading-relaxed">{v.description}</p>
              <a
                href={`https://maps.yandex.ru/?text=${encodeURIComponent(v.address)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-4 text-xs uppercase tracking-widest border border-[hsl(44,70%,62%)] text-[hsl(44,70%,50%)] px-5 py-2 hover:bg-[hsl(44,70%,62%)] hover:text-white transition-all duration-300"
              >
                Построить маршрут
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TimingSection() {
  const items = [
    { time: "13:30", event: "Сбор гостей", desc: "Угощения, лёгкое шампанское у Дворца" },
    { time: "14:00", event: "Церемония бракосочетания", desc: "Торжественная регистрация" },
    { time: "14:45", event: "Фотосессия", desc: "На набережной Невы и у Дворцовой площади" },
    { time: "16:30", event: "Трансфер в ресторан", desc: "Комфортные автомобили для гостей" },
    { time: "17:00", event: "Торжественный банкет", desc: "Приветственные коктейли и фуршет" },
    { time: "18:00", event: "Праздничный ужин", desc: "Первый танец, тосты, живая музыка" },
    { time: "23:00", event: "Танцевальная ночь", desc: "Диджей, танцы до рассвета" },
  ];

  return (
    <section id="timing" className="bg-[hsl(220,15%,12%)] py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionTitle label="Программа" title="Тайминг дня" />

        <div className="relative mt-4">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[hsl(44,70%,62%,0.2)] via-[hsl(44,70%,62%,0.6)] to-[hsl(44,70%,62%,0.2)]" />
          
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className={`flex items-center mb-10 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
            >
              <div className={`flex-1 ${i % 2 === 0 ? "text-right pr-10" : "text-left pl-10"}`}>
                <span className="font-serif text-[hsl(44,70%,62%)] text-2xl">{item.time}</span>
                <h4 className="text-white font-light tracking-wide mt-1">{item.event}</h4>
                <p className="text-white/50 text-xs mt-1">{item.desc}</p>
              </div>

              <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[hsl(44,70%,62%)] border-2 border-[hsl(220,15%,12%)] shadow-lg shadow-[hsl(44,70%,62%,0.4)]" />

              <div className="flex-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DressCodeSection() {
  const palette = [
    { name: "Слоновая кость", hex: "#F5F0E8" },
    { name: "Молочный", hex: "#FAF6F0" },
    { name: "Пыльно-голубой", hex: "#A8BCCF" },
    { name: "Серо-голубой", hex: "#8A9FB0" },
    { name: "Серебро", hex: "#C0C8D2" },
    { name: "Жемчуг", hex: "#E8E4DC" },
    { name: "Шампань", hex: "#E8D8B8" },
    { name: "Туман", hex: "#D4DCE4" },
  ];

  const gallery = [
    "https://cdn.poehali.dev/projects/e50b24b0-a722-4de0-9d04-bf3cec58ef05/files/ebc8ece7-dd3b-41a6-86c5-d6b92fd3b4f5.jpg",
    "https://cdn.poehali.dev/projects/e50b24b0-a722-4de0-9d04-bf3cec58ef05/files/d81f6803-38c7-4563-9656-60ea941cfd78.jpg",
    "https://cdn.poehali.dev/projects/e50b24b0-a722-4de0-9d04-bf3cec58ef05/files/23ef7dab-37ea-4f29-bcac-46c1b6aa4358.jpg",
  ];

  return (
    <section id="dresscode" className="bg-[hsl(40,40%,96%)] py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionTitle
          label="Дресс-код"
          title="Нео-классика"
          subtitle="Элегантный вечерний дресс-код в пастельных тонах. Пожалуйста, воздержитесь от белого и чёрного — оставим эти цвета нам."
        />

        {/* Palette */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-center text-[hsl(215,15%,50%)] text-xs uppercase tracking-widest mb-8">Цветовая палитра</p>
          <div className="flex flex-wrap justify-center gap-4">
            {palette.map((c) => (
              <div key={c.name} className="flex flex-col items-center gap-2">
                <div
                  className="w-14 h-14 rounded-full border border-[hsl(44,70%,62%,0.3)] shadow-md"
                  style={{ backgroundColor: c.hex }}
                />
                <span className="text-[hsl(215,15%,50%)] text-xs text-center">{c.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Gallery in vintage frames */}
        <div className="grid md:grid-cols-3 gap-8">
          {gallery.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="group relative"
            >
              <div className="p-3 bg-white vintage-frame">
                <img
                  src={src}
                  alt="Dress code inspiration"
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Vintage frame corners */}
                <div className="absolute top-1 left-1 w-4 h-4 border-t border-l border-[hsl(44,70%,62%,0.6)]" />
                <div className="absolute top-1 right-1 w-4 h-4 border-t border-r border-[hsl(44,70%,62%,0.6)]" />
                <div className="absolute bottom-1 left-1 w-4 h-4 border-b border-l border-[hsl(44,70%,62%,0.6)]" />
                <div className="absolute bottom-1 right-1 w-4 h-4 border-b border-r border-[hsl(44,70%,62%,0.6)]" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Notes */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 grid md:grid-cols-2 gap-6"
        >
          <div className="bg-white p-6 border border-[hsl(44,70%,62%,0.3)]">
            <h4 className="font-serif text-lg text-[hsl(220,15%,15%)] mb-3">Для дам</h4>
            <ul className="text-[hsl(215,15%,45%)] text-sm space-y-2 leading-relaxed">
              <li>· Вечерние платья или костюмы в пастельных тонах</li>
              <li>· Каблук-рюмочка или изящные лодочки</li>
              <li>· Украшения в жемчужной или золотой гамме</li>
              <li>· Элегантные аксессуары, шали</li>
            </ul>
          </div>
          <div className="bg-white p-6 border border-[hsl(44,70%,62%,0.3)]">
            <h4 className="font-serif text-lg text-[hsl(220,15%,15%)] mb-3">Для джентльменов</h4>
            <ul className="text-[hsl(215,15%,45%)] text-sm space-y-2 leading-relaxed">
              <li>· Тёмный костюм или смокинг</li>
              <li>· Галстук или бабочка приветствуются</li>
              <li>· Классические оксфорды или монки</li>
              <li>· Карманный платок в тон палитре</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function GuestSection() {
  return (
    <section id="guests" className="bg-white py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionTitle
          label="Анкета гостя"
          title="Подтвердите присутствие"
          subtitle="Пожалуйста, заполните анкету до 1 августа 2026 года, чтобы мы смогли позаботиться о каждом из вас."
        />

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
          onSubmit={(e) => { e.preventDefault(); alert("Спасибо! Мы вас ждём ♥"); }}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-[hsl(215,15%,50%)] mb-2">Ваше имя *</label>
              <input
                required
                placeholder="Имя Фамилия"
                className="w-full border border-[hsl(44,70%,62%,0.4)] bg-[hsl(40,40%,97%)] px-4 py-3 text-sm text-[hsl(220,15%,15%)] placeholder:text-[hsl(215,15%,70%)] focus:outline-none focus:border-[hsl(44,70%,62%)] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-[hsl(215,15%,50%)] mb-2">Телефон</label>
              <input
                placeholder="+7 (___) ___-__-__"
                className="w-full border border-[hsl(44,70%,62%,0.4)] bg-[hsl(40,40%,97%)] px-4 py-3 text-sm text-[hsl(220,15%,15%)] placeholder:text-[hsl(215,15%,70%)] focus:outline-none focus:border-[hsl(44,70%,62%)] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-[hsl(215,15%,50%)] mb-2">Я приду *</label>
            <div className="flex gap-6">
              {["Да, обязательно ♥", "К сожалению, нет"].map((opt) => (
                <label key={opt} className="flex items-center gap-2 text-sm text-[hsl(220,15%,25%)] cursor-pointer">
                  <input type="radio" name="attendance" value={opt} className="accent-[hsl(44,70%,62%)]" />
                  {opt}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-[hsl(215,15%,50%)] mb-2">Предпочтение в меню</label>
            <div className="flex gap-6 flex-wrap">
              {["Мясное", "Рыбное", "Вегетарианское"].map((opt) => (
                <label key={opt} className="flex items-center gap-2 text-sm text-[hsl(220,15%,25%)] cursor-pointer">
                  <input type="checkbox" value={opt} className="accent-[hsl(44,70%,62%)]" />
                  {opt}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-[hsl(215,15%,50%)] mb-2">Пожелание молодожёнам</label>
            <textarea
              rows={4}
              placeholder="Ваши тёплые слова..."
              className="w-full border border-[hsl(44,70%,62%,0.4)] bg-[hsl(40,40%,97%)] px-4 py-3 text-sm text-[hsl(220,15%,15%)] placeholder:text-[hsl(215,15%,70%)] focus:outline-none focus:border-[hsl(44,70%,62%)] transition-colors resize-none"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-[hsl(220,15%,15%)] text-white px-12 py-3 text-xs uppercase tracking-widest hover:bg-[hsl(44,70%,55%)] transition-all duration-400 border border-[hsl(220,15%,15%)] hover:border-[hsl(44,70%,55%)]"
            >
              Отправить ♥
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

function WishesSection() {
  const wishes = [
    { name: "Александра Т.", text: "Поздравляю вас! Пусть ваш союз будет крепким, как стены Петропавловской крепости, и нежным, как белые ночи!" },
    { name: "Дмитрий К.", text: "Вася и Маша, счастья вам! Так рады разделить этот день с вами." },
    { name: "Семья Орловых", text: "Любви вам долгой и глубокой, как Нева в сентябре. Поздравляем!" },
  ];

  return (
    <section className="bg-[hsl(210,28%,68%,0.15)] py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionTitle label="Книга пожеланий" title="Слова гостей" />

        <div className="grid md:grid-cols-3 gap-6">
          {wishes.map((w, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-white p-6 border border-[hsl(44,70%,62%,0.3)] relative"
            >
              <span className="font-serif text-5xl text-[hsl(44,70%,62%,0.3)] absolute top-2 left-4 leading-none">"</span>
              <p className="text-[hsl(215,15%,40%)] text-sm leading-relaxed italic relative z-10 pt-4">{w.text}</p>
              <p className="text-[hsl(44,70%,55%)] text-xs uppercase tracking-widest mt-4">— {w.name}</p>
            </motion.div>
          ))}
        </div>

        {/* Pearl beads decoration */}
        <div className="flex justify-center mt-12 gap-2">
          {Array.from({ length: 13 }).map((_, i) => (
            <div
              key={i}
              className="pearl-dot rounded-full bg-gradient-to-br from-white to-[hsl(210,28%,85%)] border border-[hsl(210,28%,75%)] shadow-sm"
              style={{
                width: i === 6 ? 16 : i % 3 === 0 ? 12 : 9,
                height: i === 6 ? 16 : i % 3 === 0 ? 12 : 9,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Featured() {
  return (
    <>
      <StorySection />
      <VenueSection />
      <TimingSection />
      <DressCodeSection />
      <GuestSection />
      <WishesSection />
    </>
  );
}
