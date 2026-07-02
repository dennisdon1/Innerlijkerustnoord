interface Props {
  label: string;
  value: string | number;
  sub?: string;
  accent?: boolean;
}

export default function StatsCard({ label, value, sub, accent }: Props) {
  return (
    <div
      className="p-6 transition-all duration-200"
      style={{
        backgroundColor: accent ? '#D4A373' : '#F5EBE0',
        border: `1px solid ${accent ? '#D4A373' : '#c4a487'}`,
      }}
    >
      <p
        className="text-xs tracking-widest uppercase font-sans mb-2"
        style={{ color: accent ? 'rgba(245,235,224,0.8)' : '#A98467' }}
      >
        {label}
      </p>
      <p
        className="font-serif text-4xl mb-1"
        style={{ color: accent ? '#F5EBE0' : '#6B705C' }}
      >
        {value}
      </p>
      {sub && (
        <p
          className="text-xs font-light"
          style={{ color: accent ? 'rgba(245,235,224,0.7)' : '#A98467' }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}
