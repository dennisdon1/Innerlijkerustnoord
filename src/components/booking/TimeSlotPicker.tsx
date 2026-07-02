interface Props {
  slots: string[];
  selected: string;
  onSelect: (time: string) => void;
  loading: boolean;
}

export default function TimeSlotPicker({ slots, selected, onSelect, loading }: Props) {
  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-11 animate-pulse"
            style={{ backgroundColor: '#EFE3D5' }}
          />
        ))}
      </div>
    );
  }

  if (!slots.length) {
    return (
      <p className="text-sm font-light py-4 text-center" style={{ color: '#A98467' }}>
        Geen beschikbare tijden op deze dag.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
      {slots.map((slot) => {
        const isSelected = slot === selected;
        return (
          <button
            key={slot}
            type="button"
            onClick={() => onSelect(slot)}
            className="h-11 text-sm font-sans font-medium transition-all duration-150 focus:outline-none"
            style={{
              backgroundColor: isSelected ? '#D4A373' : '#F5EBE0',
              color: isSelected ? '#F5EBE0' : '#6B705C',
              border: `1.5px solid ${isSelected ? '#D4A373' : '#c4a487'}`,
              transform: isSelected ? 'translateY(-1px)' : undefined,
              boxShadow: isSelected ? '0 2px 8px rgba(212,163,115,0.3)' : undefined,
            }}
          >
            {slot}
          </button>
        );
      })}
    </div>
  );
}
