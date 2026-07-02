import { ArrowDown } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-end overflow-hidden"
      style={{ backgroundColor: '#1a1f14' }}
    >
      {/* Full-bleed background yoga image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/foto_5.jpeg"
          alt="Yoga"
          className="w-full h-full object-cover"
          style={{
            objectPosition: 'center 40%',
            transform: 'scale(1.08)',
            animation: 'heroZoom 12s ease-out forwards',
          }}
        />
        {/* Gradient overlay — dark bottom, lighter top */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(26,31,20,0.25) 0%, rgba(26,31,20,0.15) 40%, rgba(26,31,20,0.75) 75%, rgba(26,31,20,0.95) 100%)',
          }}
        />
      </div>

      {/* Content — bottom aligned like eatnaked.co */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 pb-24 md:pb-32">
        {/* Small label */}
        <p
          className="text-xs tracking-[0.4em] uppercase font-sans mb-6 opacity-0 animate-[fadeInUp_0.9s_0.2s_forwards]"
          style={{ color: '#D4A373' }}
        >
          Yoga &amp; massage &mdash; Groningen
        </p>

        {/* Mega headline */}
        <h1
          className="font-serif leading-[0.9] mb-8 opacity-0 animate-[fadeInUp_0.9s_0.4s_forwards]"
          style={{
            color: '#F5EBE0',
            fontSize: 'clamp(3.5rem, 10vw, 9rem)',
            letterSpacing: '-0.02em',
          }}
        >
          Innerlijke
          <br />
          <em className="font-light italic" style={{ color: '#D4A373' }}>
            rust Noord
          </em>
        </h1>

        {/* Divider + tagline row */}
        <div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 opacity-0 animate-[fadeInUp_0.9s_0.65s_forwards]"
        >
          <p
            className="font-sans font-light leading-relaxed max-w-sm"
            style={{ color: 'rgba(239,227,213,0.75)', fontSize: '1rem' }}
          >
            Voor rust, balans en bewust bewegen.
            <br />
            Een plek om uit je hoofd te komen.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#boek-afspraak"
              className="group inline-flex items-center gap-3 px-8 py-4 text-sm tracking-[0.18em] uppercase font-sans font-medium transition-all duration-300"
              style={{ backgroundColor: '#D4A373', color: '#1a1f14' }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.backgroundColor = '#bb8a58';
                el.style.transform = 'translateY(-2px)';
                el.style.boxShadow = '0 16px 48px rgba(212,163,115,0.4)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.backgroundColor = '#D4A373';
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'none';
              }}
            >
              <span
                className="inline-block w-5 h-px transition-all duration-300 group-hover:w-8"
                style={{ backgroundColor: '#1a1f14' }}
              />
              Boek een yogales
            </a>

            <a
              href="#massage"
              className="inline-flex items-center gap-3 px-8 py-4 text-sm tracking-[0.18em] uppercase font-sans font-medium transition-all duration-300"
              style={{
                border: '1px solid rgba(239,227,213,0.4)',
                color: '#EFE3D5',
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = '#EFE3D5';
                el.style.backgroundColor = 'rgba(239,227,213,0.08)';
                el.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = 'rgba(239,227,213,0.4)';
                el.style.backgroundColor = 'transparent';
                el.style.transform = 'translateY(0)';
              }}
            >
              <span
                className="inline-block w-5 h-px"
                style={{ backgroundColor: '#EFE3D5' }}
              />
              Plan een massage
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#over-mij"
        className="absolute bottom-8 right-10 flex items-center gap-3 transition-opacity hover:opacity-60"
        style={{ color: 'rgba(239,227,213,0.5)' }}
        aria-label="Scroll naar beneden"
      >
        <span style={{ fontSize: '10px' }} className="text-xs tracking-[0.3em] uppercase font-sans">
          Scroll
        </span>
        <ArrowDown size={14} className="animate-bounce" />
      </a>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroZoom {
          from { transform: scale(1.08); }
          to   { transform: scale(1.0); }
        }
      `}</style>
    </section>
  );
}
