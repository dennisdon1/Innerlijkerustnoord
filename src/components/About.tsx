import { Heart, Sprout, Users } from 'lucide-react';

const values = [
  { icon: Heart, title: 'Mijn passie', desc: 'Dieren, natuur en mensen — alles wat puur is. In het moment leven en innerlijke rust vinden.' },
  { icon: Sprout, title: 'Mijn ervaring', desc: '7 jaar yoga beoefening, 2 jaar lesgeven. Opgeleid in Rishikesh, India. Gespecialiseerd in Yin, Hatha en Vinyasa.' },
  { icon: Users, title: 'Mijn motivatie', desc: 'Mensen helpen voelen wat zij dachten dat chronische pijn was. Massage en yoga als roeping, vanuit het hart.' },
];

export default function About() {
  return (
    <section id="over-mij" className="overflow-hidden" style={{ backgroundColor: '#F5EBE0' }}>
      <div className="grid lg:grid-cols-2 min-h-[90vh]">

        {/* Left — full-height sticky image */}
        <div className="relative overflow-hidden lg:min-h-[90vh] group">
          <img
            src="/innerlijke_rust_noord_mijn_verhaal_groningen.jpeg"
            alt="Yogadocent Innerlijke Rust Noord"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            style={{ minHeight: '520px', objectPosition: 'center 20%' }}
          />
          {/* Subtle gradient at bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(245,235,224,0.4), transparent)' }}
          />
          {/* Small label over image */}
          <div
            className="absolute bottom-8 left-8 px-4 py-2"
            style={{ backgroundColor: 'rgba(26,31,20,0.7)', backdropFilter: 'blur(4px)' }}
          >
            <span
              className="text-xs tracking-[0.3em] uppercase font-sans"
              style={{ color: '#D4A373' }}
            >
              Innerlijke rust Noord
            </span>
          </div>
        </div>

        {/* Right — content */}
        <div className="flex flex-col justify-center px-10 md:px-16 lg:px-20 py-20">
          <p className="section-label">Over mij</p>

          <h2
            className="font-serif leading-none mb-6"
            style={{ color: '#6B705C', fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.02em' }}
          >
            Mijn verhaal
          </h2>
          <div className="divider" />

          <p className="leading-relaxed mb-5 font-light" style={{ color: '#A98467', fontSize: '1.0625rem' }}>
            Hallo, ik ben Dennis. Ik hou van dieren, natuur en mensen — alles wat puur is. Ik probeer
            zoveel mogelijk in het moment te leven, daarom is innerlijke rust zo belangrijk voor mij.
            Dit is alleen niet altijd zo geweest.
          </p>
          <p className="leading-relaxed mb-5 font-light" style={{ color: '#A98467', fontSize: '1.0625rem' }}>
            8 jaar geleden zat ik compleet vast, zowel fysiek als mentaal. Overal had ik pijn in
            het lichaam en van binnenuit voelde ik niks. Toen besloot ik dingen te veranderen en
            op zoek te gaan naar hulp. Na met veel mensen gesproken te hebben ben ik terecht
            gekomen bij John — hij heeft mij via massagesessies weer laten voelen.
          </p>
          <p className="leading-relaxed mb-12 font-light" style={{ color: '#A98467', fontSize: '1.0625rem' }}>
            Vanaf dat moment ben ik geobsedeerd geraakt met het lichaam en de geest. De afgelopen
            jaren heb ik veel gereisd en geleerd van mensen over de hele wereld. Tijdens mijn
            laatste reis in Thailand ben ik erachter gekomen dat massage mijn roeping is. Nu ben
            ik hier in Groningen om mensen te helpen.
          </p>

          <div className="grid gap-7 mb-12">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-5 items-start group">
                <div
                  className="w-11 h-11 flex-shrink-0 flex items-center justify-center transition-colors duration-300"
                  style={{ backgroundColor: '#EFE3D5' }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.backgroundColor = '#D4A373')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.backgroundColor = '#EFE3D5')}
                >
                  <Icon size={17} style={{ color: '#D4A373' }} />
                </div>
                <div>
                  <h4 className="font-sans font-medium text-sm mb-1 tracking-wide" style={{ color: '#6B705C' }}>
                    {title}
                  </h4>
                  <p className="text-sm font-light leading-relaxed" style={{ color: '#A98467' }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <a href="#boek-afspraak" className="btn-primary">
              Boek een les
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
