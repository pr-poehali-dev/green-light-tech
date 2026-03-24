import { useState, useEffect } from "react";

const navItems = [
  { label: "История", href: "#story" },
  { label: "Локация", href: "#venue" },
  { label: "Тайминг", href: "#timing" },
  { label: "Дресс-код", href: "#dresscode" },
  { label: "Гостям", href: "#guests" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-[hsl(40,40%,96%,0.97)] backdrop-blur-md shadow-sm border-b border-[hsl(44,70%,62%,0.3)]"
          : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <a
          href="#"
          className={`font-serif text-xl tracking-widest transition-colors duration-500 ${
            scrolled ? "text-[hsl(44,70%,50%)]" : "text-white"
          }`}
        >
          В & М
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`uppercase text-xs tracking-widest transition-colors duration-300 ${
                scrolled
                  ? "text-[hsl(220,15%,25%)] hover:text-[hsl(44,70%,50%)]"
                  : "text-white/90 hover:text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile burger */}
        <button
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block w-6 h-0.5 transition-colors ${scrolled ? "bg-[hsl(220,15%,25%)]" : "bg-white"}`} />
          <span className={`block w-6 h-0.5 transition-colors ${scrolled ? "bg-[hsl(220,15%,25%)]" : "bg-white"}`} />
          <span className={`block w-4 h-0.5 transition-colors ${scrolled ? "bg-[hsl(220,15%,25%)]" : "bg-white"}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[hsl(40,40%,96%,0.98)] border-t border-[hsl(44,70%,62%,0.3)] px-6 py-4 flex flex-col gap-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="uppercase text-xs tracking-widest text-[hsl(220,15%,25%)] hover:text-[hsl(44,70%,50%)] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
