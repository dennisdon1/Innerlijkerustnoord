import { Phone, Mail, MapPin, Instagram } from 'lucide-react';

const contactItems = [
  { icon: Phone, label: 'Telefoon', value: '+31 6 37 29 47 15', href: 'tel:+31637294715' },
  { icon: Mail, label: 'E-mail', value: 'info@innerlijkerustnoord.nl', href: 'mailto:info@innerlijkerustnoord.nl' },
  { icon: Instagram, label: 'Instagram', value: '@innerlijkerustnoord', href: 'https://instagram.com/innerlijkerustnoord' },
  { icon: MapPin, label: 'Locatie', value: 'Ulgersmaweg 137d', href: null },
];

export default function Contact() {
  return (
    <section id="contact" className="overflow-hidden" style={{ backgroundColor: '#1a1f14' }}>
      <div className="relative min-h-[70vh] overflow-hidden group">
        <img
          src="/foto_8.jpeg"
          alt="Yoga studio"
          className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          style={{ objectPosition: 'center 40%' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(26,31,20,0.6) 0%, rgba(26,31,20,0.85) 100%)' }}
        />

        <div className="relative z-10 flex flex-col justify-end px-10 md:px-20 lg:px-32 pb-20 pt-32 min-h-[70vh]">
          <p className="text-xs tracking-[0.4em] uppercase font-sans mb-3" style={{ color: '#D4A373' }}>
            Neem contact op
          </p>
          <h2
            className="font-serif leading-none mb-12"
            style={{ color: '#F5EBE0', fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.02em' }}
          >
            Contact
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactItems.map(({ icon: Icon, label, value, href }) => {
              const inner = (
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 flex-shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(212,163,115,0.2)', border: '1px solid rgba(212,163,115,0.3)' }}
                  >
                    <Icon size={15} style={{ color: '#D4A373' }} />
                  </div>
                  <div>
                    <p className="text-xs tracking-widest uppercase font-sans mb-0.5" style={{ color: 'rgba(239,227,213,0.45)' }}>
                      {label}
                    </p>
                    <p className="text-sm font-light" style={{ color: '#EFE3D5' }}>{value}</p>
                  </div>
                </div>
              );

              return href ? (
                <a key={label} href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-80">
                  {inner}
                </a>
              ) : (
                <div key={label}>{inner}</div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
