import { Leaf } from 'lucide-react';

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

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: '#1a1f14' }}>
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 pt-16 pb-10">
        <div className="flex flex-col md:flex-row items-start justify-between gap-12">

          {/* Brand */}
          <div className="flex-shrink-0">
            <div className="flex items-center gap-2 mb-4">
              <Leaf size={16} style={{ color: '#D4A373' }} />
              <span className="font-serif text-xl" style={{ color: '#F5EBE0' }}>
                Innerlijke rust Noord
              </span>
            </div>
            <p className="text-sm font-light max-w-xs leading-relaxed" style={{ color: 'rgba(239,227,213,0.4)' }}>
              Yoga en massage in Groningen.
              <br />
              Rust, balans en bewust bewegen.
            </p>
          </div>

          {/* Nav links */}
          <nav className="grid grid-cols-2 sm:grid-cols-4 gap-x-10 gap-y-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs tracking-[0.2em] uppercase font-sans transition-colors duration-200"
                style={{ color: 'rgba(239,227,213,0.4)' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#D4A373')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(239,227,213,0.4)')}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex-shrink-0">
            <a href="#boek-afspraak" className="btn-primary text-xs">
              Boek een les
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="max-w-7xl mx-auto px-8 md:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
        style={{ borderTop: '1px solid rgba(212,163,115,0.1)' }}
      >
        <p className="text-xs font-light" style={{ color: 'rgba(239,227,213,0.25)' }}>
          &copy; {year} Innerlijke rust Noord. Alle rechten voorbehouden.
        </p>
        <p className="text-xs font-light" style={{ color: 'rgba(239,227,213,0.2)' }}>
          Groningen &mdash; info@innerlijkerustnoord.nl
        </p>
      </div>
    </footer>
  );
}
