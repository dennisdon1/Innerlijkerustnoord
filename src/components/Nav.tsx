import { useState, useEffect } from 'react';
import { Menu, X, Leaf } from 'lucide-react';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Over Mij', href: '#over-mij' },
  { label: 'Yin Yoga', href: '#yin-yoga' },
  { label: 'Hatha Yoga', href: '#hatha-yoga' },
  { label: 'Vinyasa Yoga', href: '#vinyasa-yoga' },
  { label: 'Massage', href: '#massage' },
  { label: 'Lesrooster', href: '#lesrooster' },
  { label: 'Tarieven', href: '#tarieven' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={scrolled ? { backgroundColor: 'rgba(245,235,224,0.96)', backdropFilter: 'blur(6px)', boxShadow: '0 1px 12px rgba(107,112,92,0.08)' } : {}}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-[4.5rem]">
        <a href="#home" className="flex items-center gap-2 group">
          <Leaf size={18} style={{ color: '#D4A373' }} className="transition-colors duration-300" />
          <span
            className="font-serif text-lg tracking-wide transition-colors duration-300"
            style={{ color: scrolled ? '#6B705C' : '#F5EBE0' }}
          >
            Innerlijke rust Noord
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-xs tracking-widest uppercase font-sans font-medium transition-colors duration-300 hover:text-[#D4A373]"
                style={{ color: scrolled ? '#6B705C' : 'rgba(245,235,224,0.85)' }}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#boek-afspraak" className="btn-primary text-xs py-2 px-5">
              Boek een les
            </a>
          </li>
        </ul>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden transition-colors duration-300"
          style={{ color: scrolled ? '#6B705C' : '#F5EBE0' }}
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <div
        className="lg:hidden transition-all duration-300 overflow-hidden"
        style={{
          maxHeight: open ? '600px' : '0',
          opacity: open ? 1 : 0,
          backgroundColor: 'rgba(245,235,224,0.98)',
          backdropFilter: 'blur(6px)',
          borderTop: open ? '1px solid #EFE3D5' : 'none',
        }}
      >
        <ul className="px-6 py-6 flex flex-col gap-5">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-xs tracking-widest uppercase font-medium transition-colors hover:text-[#D4A373]"
                style={{ color: '#6B705C' }}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#boek-afspraak" onClick={() => setOpen(false)} className="btn-primary text-xs py-2">
              Boek een les
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
