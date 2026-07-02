import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  availableDates: Set<string>;
  selectedDate: string;
  onSelect: (date: string) => void;
}

const WEEKDAY_HEADERS = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];

export default function BookingCalendar({ availableDates, selectedDate, onSelect }: Props) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewMonth, setViewMonth] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });

  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();

  const firstDay = new Date(year, month, 1);
  // Monday-first: convert Sunday(0) to 6, Mon(1) to 0, etc.
  const startOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const prevMonth = () => {
    const d = new Date(viewMonth);
    d.setMonth(d.getMonth() - 1);
    setViewMonth(d);
  };

  const nextMonth = () => {
    const d = new Date(viewMonth);
    d.setMonth(d.getMonth() + 1);
    setViewMonth(d);
  };

  const monthLabel = viewMonth.toLocaleDateString('nl-NL', { month: 'long', year: 'numeric' });

  // Don't allow navigating to past months
  const isPrevDisabled =
    year < today.getFullYear() ||
    (year === today.getFullYear() && month <= today.getMonth());

  return (
    <div className="select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <button
          type="button"
          onClick={prevMonth}
          disabled={isPrevDisabled}
          className="w-8 h-8 flex items-center justify-center transition-colors disabled:opacity-30"
          style={{ color: '#6B705C' }}
        >
          <ChevronLeft size={18} />
        </button>
        <span className="font-sans text-sm font-medium capitalize" style={{ color: '#6B705C' }}>
          {monthLabel}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          className="w-8 h-8 flex items-center justify-center transition-colors"
          style={{ color: '#6B705C' }}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-2">
        {WEEKDAY_HEADERS.map((d) => (
          <div key={d} className="text-center text-xs font-sans font-medium py-1" style={{ color: '#A98467' }}>
            {d}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />;

          const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const cellDate = new Date(year, month, day);
          const isPast = cellDate <= today;
          const isAvailable = availableDates.has(iso);
          const isSelected = iso === selectedDate;

          let bg = 'transparent';
          let textColor = '#c4a487';
          let cursor = 'default';
          let hoverBg = 'transparent';

          if (isSelected) {
            bg = '#D4A373';
            textColor = '#F5EBE0';
          } else if (isAvailable && !isPast) {
            bg = '#EFE3D5';
            textColor = '#6B705C';
            cursor = 'pointer';
            hoverBg = '#D4A373';
          } else if (!isPast && !isAvailable) {
            textColor = '#c4a487';
          }

          return (
            <button
              key={iso}
              type="button"
              disabled={isPast || !isAvailable}
              onClick={() => isAvailable && !isPast && onSelect(iso)}
              className="w-full aspect-square flex items-center justify-center text-sm font-sans transition-all duration-150 focus:outline-none"
              style={{
                backgroundColor: bg,
                color: textColor,
                cursor,
                borderRadius: '2px',
              }}
              onMouseEnter={(e) => {
                if (isAvailable && !isPast && !isSelected) {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = hoverBg;
                  (e.currentTarget as HTMLButtonElement).style.color = '#F5EBE0';
                }
              }}
              onMouseLeave={(e) => {
                if (isAvailable && !isPast && !isSelected) {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = bg;
                  (e.currentTarget as HTMLButtonElement).style.color = textColor;
                }
              }}
            >
              {day}
            </button>
          );
        })}
      </div>

      <p className="text-xs font-light mt-4 text-center" style={{ color: '#A98467' }}>
        Gemarkeerde dagen zijn beschikbaar
      </p>
    </div>
  );
}
