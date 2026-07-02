const yogaPlans = [
  { name: 'Losse les', price: '12', unit: 'per les', desc: 'Geldig voor alle yogalessen' },
  { name: 'Rittenkaart', price: '100', unit: '10 lessen', desc: 'Te gebruiken voor alle yogastijlen', featured: true },
  { name: 'Abonnement', price: '55', unit: 'per maand', desc: 'Onbeperkt lessen, maandelijks opzegbaar' },
];

const massagePlans = [
  { name: 'Intuïtieve massage 1 uur', price: '65', unit: 'ca. 60 min', desc: 'Diepe ontspanning, spierspanning loslaten' },
  { name: 'Intuïtieve massage 2,5 uur', price: '140', unit: '2 – 2,5 uur', desc: 'Lichaam en geest volledig tot rust', featured: true },
];

export default function Pricing() {
  return (
    <section id="tarieven" className="section-padding" style={{ backgroundColor: '#F5EBE0' }}>
      <div className="max-w-7xl mx-auto">

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="section-label">Eerlijke prijzen</p>
            <h2
              className="font-serif leading-none"
              style={{ color: '#6B705C', fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-0.02em' }}
            >
              Tarieven
            </h2>
          </div>
          <p className="font-light max-w-xs text-sm" style={{ color: '#A98467', lineHeight: '1.7' }}>
            Kies het pakket dat bij jou past. Losse lessen zijn geldig voor alle yogastijlen.
          </p>
        </div>

        {/* Thin divider */}
        <div className="w-full h-px mb-16" style={{ backgroundColor: 'rgba(167,132,103,0.2)' }} />

        {/* Yoga pricing */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-6 h-px" style={{ backgroundColor: '#D4A373' }} />
            <h3 className="font-serif text-2xl" style={{ color: '#6B705C' }}>
              Yoga
            </h3>
            <span className="text-xs tracking-[0.2em] uppercase font-sans ml-2" style={{ color: '#A98467' }}>
              Yin · Hatha · Vinyasa
            </span>
          </div>
          <div className="grid md:grid-cols-3 gap-3">
            {yogaPlans.map((plan) => (
              <div
                key={plan.name}
                className="group flex flex-col px-6 py-5 transition-all duration-300 hover:-translate-y-0.5"
                style={
                  plan.featured
                    ? { backgroundColor: '#D4A373', border: '1px solid #D4A373' }
                    : { backgroundColor: '#EFE3D5', border: '1px solid rgba(167,132,103,0.25)' }
                }
                onMouseEnter={(e) => {
                  if (!plan.featured) {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(107,112,92,0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                }}
              >
                <p
                  className="text-xs tracking-[0.2em] uppercase font-sans font-medium mb-1"
                  style={{ color: plan.featured ? '#F5EBE0' : '#A98467' }}
                >
                  {plan.name}
                </p>
                <p
                  className="text-sm font-light mb-4"
                  style={{ color: plan.featured ? 'rgba(245,235,224,0.8)' : '#A98467' }}
                >
                  {plan.desc}
                </p>
                <div className="mt-auto">
                  <span
                    className="font-serif"
                    style={{
                      color: plan.featured ? '#F5EBE0' : '#6B705C',
                      fontSize: '2.2rem',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    €{plan.price}
                  </span>
                  <span
                    className="text-xs font-sans ml-2"
                    style={{ color: plan.featured ? 'rgba(245,235,224,0.7)' : '#A98467' }}
                  >
                    {plan.unit}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Massage pricing */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-6 h-px" style={{ backgroundColor: '#D4A373' }} />
            <h3 className="font-serif text-2xl" style={{ color: '#6B705C' }}>
              Massage
            </h3>
            <span className="text-xs tracking-[0.2em] uppercase font-sans ml-2" style={{ color: '#A98467' }}>
              Op afspraak
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {massagePlans.map((plan) => (
              <div
                key={plan.name}
                className="group flex items-center justify-between px-6 py-5 transition-all duration-300 hover:-translate-y-0.5"
                style={
                  plan.featured
                    ? { backgroundColor: '#D4A373', border: '1px solid #D4A373' }
                    : { backgroundColor: '#EFE3D5', border: '1px solid rgba(167,132,103,0.25)' }
                }
                onMouseEnter={(e) => {
                  if (!plan.featured) {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(107,112,92,0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                }}
              >
                <div>
                  <p
                    className="text-xs tracking-[0.2em] uppercase font-sans font-medium mb-1"
                    style={{ color: plan.featured ? '#F5EBE0' : '#A98467' }}
                  >
                    {plan.name}
                  </p>
                  <p
                    className="text-sm font-light"
                    style={{ color: plan.featured ? 'rgba(245,235,224,0.8)' : '#A98467' }}
                  >
                    {plan.desc}
                  </p>
                </div>
                <div className="text-right flex-shrink-0 ml-6">
                  <span
                    className="font-serif"
                    style={{
                      color: plan.featured ? '#F5EBE0' : '#6B705C',
                      fontSize: '2.2rem',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    €{plan.price}
                  </span>
                  <p
                    className="text-xs font-sans"
                    style={{ color: plan.featured ? 'rgba(245,235,224,0.7)' : '#A98467' }}
                  >
                    {plan.unit}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(167,132,103,0.2)' }}
        >
          <p className="text-sm font-light" style={{ color: '#A98467' }}>
            Eerste les? Neem gerust contact op voor een kennismaking.
          </p>
          <a href="#boek-afspraak" className="btn-primary text-xs flex-shrink-0">
            Boek een les
          </a>
        </div>
      </div>
    </section>
  );
}
