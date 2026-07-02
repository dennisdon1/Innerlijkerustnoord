import { Moon, Wind, Feather } from 'lucide-react';

const benefits = [
  { icon: Moon, text: 'Diepe ontspanning van lichaam en geest' },
  { icon: Wind, text: 'Verbeterde flexibiliteit en mobiliteit' },
  { icon: Feather, text: 'Verlicht spanning in spieren en bindweefsel' },
];

export default function YinYoga() {
  return (
    <section id="yin-yoga" className="overflow-hidden" style={{ backgroundColor: '#EFE3D5' }}>

      {/* Full-bleed cinematic image banner */}
      <div className="relative h-[55vh] md:h-[70vh] overflow-hidden group">
        <img
          src="/foto_4.jpeg"
          alt="Yin Yoga les"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          style={{ objectPosition: 'center 40%' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(26,31,20,0.72) 0%, rgba(26,31,20,0.3) 60%, rgba(26,31,20,0.1) 100%)',
          }}
        />

        {/* Headline over image */}
        <div className="absolute inset-0 flex items-end px-10 md:px-20 pb-14">
          <div>
            <p
              className="text-xs tracking-[0.4em] uppercase font-sans mb-3"
              style={{ color: '#D4A373' }}
            >
              Rustige yoga
            </p>
            <h2
              className="font-serif leading-none"
              style={{ color: '#F5EBE0', fontSize: 'clamp(3rem, 8vw, 7rem)', letterSpacing: '-0.02em' }}
            >
              Yin Yoga
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
            Yin is de meest rustige vorm van yoga die ik geef. Voor mij is het een ontspanningsmoment
            waarbij je leert stil te staan en alles er lekker laat zijn.
          </p>
          <p className="leading-relaxed font-light" style={{ color: '#A98467', fontSize: '1.0625rem' }}>
            Houdingen worden lang vastgehouden — doorgaans drie tot vijf minuten — zodat het lichaam
            de tijd krijgt om diep los te laten. Deze vorm van yoga helpt erg goed met het reguleren
            van emoties en is geschikt voor beginners en gevorderden.
          </p>
        </div>

        {/* Right — benefits + CTA */}
        <div>
          <div className="grid gap-5 mb-10">
            {benefits.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-4">
                <div
                  className="w-10 h-10 flex-shrink-0 flex items-center justify-center"
                  style={{ backgroundColor: '#F5EBE0' }}
                >
                  <Icon size={16} style={{ color: '#D4A373' }} />
                </div>
                <span className="text-sm font-light" style={{ color: '#6B705C' }}>{text}</span>
              </div>
            ))}
          </div>
          <a href="#boek-afspraak" className="btn-primary">
            Boek Yin Yoga
          </a>
        </div>
      </div>
    </section>
  );
}
