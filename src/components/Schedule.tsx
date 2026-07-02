const schedule = [
  { day: 'Dinsdag', time: '17:30 – 18:30', lesson: 'Vinyasa Yoga', type: 'vinyasa' },
  { day: 'Woensdag', time: '09:00 – 10:00', lesson: 'Hatha Yoga', type: 'hatha' },
  { day: 'Zondag', time: '11:00 – 12:00', lesson: 'Yin Yoga', type: 'yin' },
];

const typeColors: Record<string, string> = {
  yin: '#A98467',
  vinyasa: '#D4A373',
  hatha: '#8a9e7a',
};

export default function Schedule() {
  return (
    <section id="lesrooster" className="overflow-hidden" style={{ backgroundColor: '#1a1f14' }}>

      {/* Top image banner with text overlay */}
      <div className="relative h-[40vh] overflow-hidden group">
        <img
          src="/Lesrooster_innerlijke_rust_Noord_Groningen_.jpeg"
          alt="Yogales Groningen"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          style={{ objectPosition: 'center 40%' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(26,31,20,0.3) 0%, rgba(26,31,20,0.85) 100%)' }}
        />
        <div className="absolute inset-0 flex items-end px-10 md:px-20 pb-12">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase font-sans mb-3" style={{ color: '#D4A373' }}>
              Wekelijks
            </p>
            <h2
              className="font-serif leading-none"
              style={{ color: '#F5EBE0', fontSize: 'clamp(2.5rem, 7vw, 6rem)', letterSpacing: '-0.02em' }}
            >
              Lesrooster
            </h2>
          </div>
        </div>
      </div>

      {/* Schedule rows */}
      <div className="max-w-5xl mx-auto px-8 md:px-16 py-16">
        <div className="grid gap-0 mb-14">
          {schedule.map((row, i) => (
            <div
              key={i}
              className="group flex flex-col sm:flex-row sm:items-center justify-between py-6 transition-all duration-300 cursor-default"
              style={{
                borderBottom: '1px solid rgba(212,163,115,0.15)',
                borderTop: i === 0 ? '1px solid rgba(212,163,115,0.15)' : 'none',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.paddingLeft = '12px')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.paddingLeft = '0')}
            >
              {/* Day + time */}
              <div className="flex items-baseline gap-6 mb-3 sm:mb-0">
                <span
                  className="font-sans text-xs tracking-[0.25em] uppercase w-24 flex-shrink-0"
                  style={{ color: 'rgba(239,227,213,0.45)' }}
                >
                  {row.day}
                </span>
                <span
                  className="font-serif"
                  style={{ color: '#F5EBE0', fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)' }}
                >
                  {row.time}
                </span>
              </div>

              {/* Lesson + action */}
              <div className="flex items-center gap-6">
                <span
                  className="text-xs tracking-[0.25em] uppercase font-sans px-3 py-1.5"
                  style={{
                    color: typeColors[row.type] ?? '#D4A373',
                    border: `1px solid ${typeColors[row.type] ?? '#D4A373'}50`,
                    backgroundColor: `${typeColors[row.type] ?? '#D4A373'}12`,
                  }}
                >
                  {row.lesson}
                </span>
                <a
                  href="#boek-afspraak"
                  className="text-xs tracking-[0.25em] uppercase font-sans transition-all duration-300 opacity-0 group-hover:opacity-100"
                  style={{ color: '#EFE3D5' }}
                >
                  Aanmelden &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a href="#boek-afspraak" className="btn-primary">
            Boek een les
          </a>
        </div>
      </div>
    </section>
  );
}
