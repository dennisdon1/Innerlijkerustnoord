import { Target, Wind, Layers } from 'lucide-react';

const benefits = [
  { icon: Layers, text: 'Leer verschillende poses goed vasthouden' },
  { icon: Wind, text: 'Beheers je adem en lichaamsbewustzijn' },
  { icon: Target, text: 'Sneller dan Yin, met aandacht in elke positie' },
];

export default function HathaYoga() {
  return (
    <section id="hatha-yoga" className="overflow-hidden" style={{ backgroundColor: '#F5EBE0' }}>

      {/* Full-bleed cinematic image banner */}
      <div className="relative h-[55vh] md:h-[70vh] overflow-hidden group">
        <img
          src="/Hatha_Yoga_Innerlijke_rust_Noord_Groningen.jpeg"
          alt="Hatha Yoga les"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          style={{ objectPosition: 'center 55%' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(26,31,20,0.55) 0%, rgba(26,31,20,0.15) 60%, rgba(26,31,20,0.05) 100%)',
          }}
        />

        <div className="absolute inset-0 flex items-end px-10 md:px-20 pb-14">
          <div>
            <p
              className="text-xs tracking-[0.4em] uppercase font-sans mb-3"
              style={{ color: '#D4A373' }}
            >
              Balans & kracht
            </p>
            <h2
              className="font-serif leading-none"
              style={{ color: '#F5EBE0', fontSize: 'clamp(3rem, 8vw, 7rem)', letterSpacing: '-0.02em' }}
            >
              Hatha Yoga
            </h2>
          </div>
        </div>
      </div>

      {/* Content row */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-20 grid md:grid-cols-2 gap-16 items-start">

        {/* Left — body text */}
        <div>
          <div className="divider" />
          <p className="leading-relaxed mb-5 font-light" style={{ color: '#A98467', fontSize: '1.0625rem' }}>
            Met Hatha yoga gaan we verschillende poses vasthouden. Hatha is een stuk vlugger dan
            Yin, maar ook hier besteden we aandacht in elke positie.
          </p>
          <p className="leading-relaxed font-light" style={{ color: '#A98467', fontSize: '1.0625rem' }}>
           Tijdens Hatha yoga leer je op een rustige manier je lichaam en ademhaling beter te voelen en te beheersen, terwijl je stap voor stap door de houdingen beweegt. Het is een fijne mix van inspanning en ontspanning, waarmee je werkt aan kracht, flexibiliteit en balans. Door de duidelijke opbouw en focus op techniek is Hatha yoga ideaal als je wilt groeien in je practice, of je nu net begint of al wat langer bezig bent.
          </p>
        </div>

        {/* Right — benefits + CTA */}
        <div>
          <div className="grid gap-5 mb-10">
            {benefits.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-4">
                <div
                  className="w-10 h-10 flex-shrink-0 flex items-center justify-center"
                  style={{ backgroundColor: '#EFE3D5' }}
                >
                  <Icon size={16} style={{ color: '#D4A373' }} />
                </div>
                <span className="text-sm font-light" style={{ color: '#6B705C' }}>{text}</span>
              </div>
            ))}
          </div>
          <a href="#boek-afspraak" className="btn-primary">
            Boek Hatha Yoga
          </a>
        </div>
      </div>
    </section>
  );
}
