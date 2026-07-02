import { Zap, Activity, Sun } from 'lucide-react';

const benefits = [
  { icon: Sun, text: 'Verhoog je energieniveau en vitaliteit' },
  { icon: Activity, text: 'Verbeter kracht, balans en coördinatie' },
  { icon: Zap, text: 'Vloeiende beweging gesynchroniseerd met de adem' },
];

export default function VinyasaYoga() {
  return (
    <section id="vinyasa-yoga" className="overflow-hidden" style={{ backgroundColor: '#F5EBE0' }}>

      {/* Full-bleed cinematic image banner — image right side */}
      <div className="relative h-[55vh] md:h-[70vh] overflow-hidden group">
        <img
          src="/Vinyasa_les_Groningen_Innerlijke_rust_Noord.jpeg"
          alt="Vinyasa Yoga les"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          style={{ objectPosition: 'center 45%' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to left, rgba(26,31,20,0.45) 0%, rgba(26,31,20,0.08) 50%, rgba(26,31,20,0.0) 100%)',
          }}
        />

        {/* Headline over image — right aligned */}
        <div className="absolute inset-0 flex items-end justify-end px-10 md:px-20 pb-14">
          <div className="text-right">
            <p
              className="text-xs tracking-[0.4em] uppercase font-sans mb-3"
              style={{ color: '#D4A373' }}
            >
              Dynamische yoga
            </p>
            <h2
              className="font-serif leading-none"
              style={{ color: '#F5EBE0', fontSize: 'clamp(3rem, 8vw, 7rem)', letterSpacing: '-0.02em' }}
            >
              Vinyasa Yoga
            </h2>
          </div>
        </div>
      </div>

      {/* Content row */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-20 grid md:grid-cols-2 gap-16 items-start">

        {/* Left — benefits + CTA */}
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
            Boek Vinyasa Yoga
          </a>
        </div>

        {/* Right — body text */}
        <div>
          <div className="divider" style={{ marginLeft: 'auto' }} />
          <p className="leading-relaxed mb-5 font-light" style={{ color: '#A98467', fontSize: '1.0625rem' }}>
            Vinyasa betekent letterlijk 'flow' — het zijn veel poses achter elkaar in een hoger tempo.
            Dit is de meest intensieve yoga die ik aanbied. Ademhaling en beweging komen samen in
            een vloeiende sequentie die je lichaam en geest volledig uitdaagt.
          </p>
          <p className="leading-relaxed font-light" style={{ color: '#A98467', fontSize: '1.0625rem' }}>
            Elke les is anders — gevarieerde sequenties houden je scherp terwijl je kracht,
            uithoudingsvermogen en focus opbouwt.
          </p>
        </div>
      </div>
    </section>
  );
}
