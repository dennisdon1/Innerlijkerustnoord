import { Sparkles, Clock } from 'lucide-react';

const treatments = [
  {
    icon: Clock,
    name: 'Intuïtieve massage 1 uur',
    duration: 'ca. 60 min',
    price: '65',
    desc: 'Een volledige intuïtieve massage die spierspanning lost en het zenuwstelsel kalmeert.',
  },
  {
    icon: Sparkles,
    name: 'Intuïtieve massage 2,5 uur',
    duration: '2 – 2,5 uur',
    price: '140',
    desc: 'Een diepgaande intuïtieve massage waarbij lichaam en geest volledig tot rust komen.',
  },
];

export default function Massage() {
  return (
    <section id="massage" className="overflow-hidden" style={{ backgroundColor: '#EFE3D5' }}>
      <div className="grid lg:grid-cols-2 min-h-[80vh]">

        {/* Left — full-height image */}
        <div className="relative overflow-hidden lg:min-h-[80vh] order-2 lg:order-1 group">
          <img
            src="/FOTO_1.jpeg"
            alt="Massage behandeling"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            style={{ minHeight: '420px', objectPosition: 'center 35%' }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(26,31,20,0.5) 0%, transparent 60%)' }}
          />
          {/* Price badges over image */}
          <div className="absolute bottom-8 left-8 flex gap-3">
            {treatments.map((t) => (
              <div
                key={t.name}
                className="px-4 py-2"
                style={{ backgroundColor: 'rgba(26,31,20,0.75)', backdropFilter: 'blur(6px)' }}
              >
                <p className="text-xs tracking-widest uppercase font-sans mb-0.5" style={{ color: '#D4A373' }}>
                  {t.name}
                </p>
                <p className="font-serif text-xl" style={{ color: '#F5EBE0' }}>
                  €{t.price}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — content */}
        <div className="flex flex-col justify-center px-10 md:px-16 lg:px-20 py-20 order-1 lg:order-2">
          <p className="section-label">Lichaamswerk</p>
          <h2
            className="font-serif leading-none mb-6"
            style={{ color: '#6B705C', fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.02em' }}
          >
            Massage
          </h2>
          <div className="divider" />

          <p className="leading-relaxed mb-5 font-light" style={{ color: '#A98467', fontSize: '1.0625rem' }}>
            Ik heb nog nooit iemand ontmoet die op dezelfde manier masseert als ik. Mijn massage
            is erg intuïtief — ik masseer vanuit het hart en luister naar het lichaam wat voor mij
            ligt. Als het lichaam het toestaat help ik het meer ruimte te creëren, oude spanningen
            los te laten en weer te laten voelen. In overleg stemmen we samen een passende en fijne locatie af.
          </p>
          <p className="leading-relaxed mb-12 font-light" style={{ color: '#A98467', fontSize: '1.0625rem' }}>
  
          </p>

          <div className="grid gap-4 mb-12">
            {treatments.map(({ icon: Icon, name, duration, price, desc }) => (
              <div
                key={name}
                className="p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm"
                style={{ backgroundColor: '#F5EBE0', border: '1px solid rgba(167,132,103,0.3)' }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 flex-shrink-0 flex items-center justify-center mt-0.5"
                      style={{ backgroundColor: '#EFE3D5' }}
                    >
                      <Icon size={15} style={{ color: '#D4A373' }} />
                    </div>
                    <div>
                      <h4 className="font-sans font-medium text-sm mb-1 tracking-wide" style={{ color: '#6B705C' }}>
                        {name}
                      </h4>
                      <p className="text-xs font-light mb-2" style={{ color: '#A98467' }}>
                        {duration}
                      </p>
                      <p className="text-sm font-light leading-relaxed" style={{ color: '#A98467' }}>
                        {desc}
                      </p>
                    </div>
                  </div>
                  <span className="font-serif text-3xl flex-shrink-0" style={{ color: '#6B705C' }}>
                    €{price}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div>
            <a href="#boek-afspraak" className="btn-primary">
              Afspraak maken
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
