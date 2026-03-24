import { motion } from "framer-motion";

function ContactSection() {
  return (
    <section id="contacts" className="bg-white py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-[hsl(44,70%,55%)] uppercase tracking-[0.4em] text-xs mb-4">Свяжитесь с нами</p>
          <h2 className="font-serif text-4xl md:text-5xl text-[hsl(220,15%,15%)] font-light mb-4">Контакты</h2>
          <div className="flex items-center justify-center gap-3 mb-12">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[hsl(44,70%,62%)]" />
            <span className="text-[hsl(44,70%,62%)] text-sm">✦</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[hsl(44,70%,62%)]" />
          </div>

          <p className="text-[hsl(215,15%,45%)] text-sm leading-relaxed mb-10">
            Если у вас есть вопросы по организации дня, дресс-коду или логистике —<br />
            свяжитесь с нашими организаторами.
          </p>

          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="bg-[hsl(40,40%,96%)] p-6 border border-[hsl(44,70%,62%,0.3)]">
              <h4 className="font-serif text-lg text-[hsl(220,15%,15%)] mb-3">Организатор</h4>
              <p className="text-[hsl(215,15%,45%)] text-sm">Елена Воронова</p>
              <a href="tel:+79112345678" className="text-[hsl(44,70%,50%)] text-sm hover:underline">+7 (911) 234-56-78</a>
              <br />
              <a href="https://t.me/elenavogt" target="_blank" rel="noreferrer" className="text-[hsl(44,70%,50%)] text-sm hover:underline">@elenavogt в Telegram</a>
            </div>
            <div className="bg-[hsl(40,40%,96%)] p-6 border border-[hsl(44,70%,62%,0.3)]">
              <h4 className="font-serif text-lg text-[hsl(220,15%,15%)] mb-3">Свяжитесь с нами</h4>
              <a href="mailto:vasya.masha.2026@gmail.com" className="text-[hsl(44,70%,50%)] text-sm hover:underline block">vasya.masha.2026@gmail.com</a>
              <p className="text-[hsl(215,15%,45%)] text-xs mt-2 leading-relaxed">
                Отвечаем в течение 24 часов
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ClosingText() {
  return (
    <section className="bg-[hsl(40,40%,96%)] py-16 px-6 text-center border-t border-[hsl(44,70%,62%,0.3)]">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          {/* Pearl beads */}
          <div className="flex justify-center gap-2 mb-10">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="pearl-dot rounded-full bg-gradient-to-br from-white to-[hsl(210,28%,85%)] border border-[hsl(210,28%,75%)] shadow-sm"
                style={{
                  width: i === 4 ? 14 : i % 2 === 0 ? 10 : 8,
                  height: i === 4 ? 14 : i % 2 === 0 ? 10 : 8,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>

          <p className="font-serif text-2xl md:text-3xl text-[hsl(220,15%,15%)] font-light italic leading-relaxed mb-8">
            Мы собираем только самых близких.
            <br />
            Тех, кто всегда рядом — в радости и в буднях.
            <br />
            Именно вы — часть нашей истории.
          </p>

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[hsl(44,70%,62%)]" />
            <span className="text-[hsl(44,70%,62%)]">♥</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[hsl(44,70%,62%)]" />
          </div>

          <p className="text-[hsl(215,15%,50%)] text-sm uppercase tracking-widest">
            С любовью, Василий и Мария
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default function Footer() {
  return (
    <>
      <ContactSection />
      <ClosingText />

      <div
        className="relative h-[400px] sm:h-[600px] lg:h-[800px] max-h-[800px]"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <div className="relative h-[calc(100vh+400px)] sm:h-[calc(100vh+600px)] lg:h-[calc(100vh+800px)] -top-[100vh]">
          <div className="h-[400px] sm:h-[600px] lg:h-[800px] sticky top-[calc(100vh-400px)] sm:top-[calc(100vh-600px)] lg:top-[calc(100vh-800px)]">
            <div className="bg-[hsl(220,20%,10%)] py-4 sm:py-6 lg:py-8 px-6 h-full w-full flex flex-col justify-between">
              
              {/* Navigation */}
              <div className="flex shrink-0 flex-wrap gap-x-12 gap-y-6">
                <div className="flex flex-col gap-2">
                  <h3 className="mb-1 uppercase text-[hsl(44,70%,62%)] text-xs tracking-widest">Программа</h3>
                  {["История", "Локация", "Тайминг"].map((link) => (
                    <a key={link} href={`#${link.toLowerCase()}`} className="text-white/60 hover:text-white transition-colors text-sm">
                      {link}
                    </a>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="mb-1 uppercase text-[hsl(44,70%,62%)] text-xs tracking-widest">Гостям</h3>
                  {["Дресс-код", "Анкета", "Контакты"].map((link) => (
                    <a key={link} href={`#${link.toLowerCase()}`} className="text-white/60 hover:text-white transition-colors text-sm">
                      {link}
                    </a>
                  ))}
                </div>
              </div>

              {/* Big name */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <h1 className="font-serif text-[16vw] sm:text-[14vw] lg:text-[12vw] leading-[0.85] text-white font-light tracking-tight">
                  Строгановы
                </h1>
                <div className="text-right shrink-0">
                  <p className="text-[hsl(44,70%,62%)] text-sm mb-1">1 сентября 2026</p>
                  <p className="text-white/40 text-xs">Санкт-Петербург</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}