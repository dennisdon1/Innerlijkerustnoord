import { Clock, CheckCircle } from 'lucide-react';
import type { Service } from '../../lib/types';
import { formatPrice } from '../../lib/bookingUtils';

interface Props {
  service: Service;
  selected: boolean;
  onSelect: () => void;
}

export default function ServiceCard({ service, selected, onSelect }: Props) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="w-full text-left transition-all duration-200 p-5 relative group focus:outline-none"
      style={{
        backgroundColor: selected ? '#D4A373' : '#F5EBE0',
        border: `1.5px solid ${selected ? '#D4A373' : '#c4a487'}`,
        transform: selected ? 'translateY(-2px)' : undefined,
        boxShadow: selected ? '0 4px 20px rgba(212,163,115,0.25)' : undefined,
      }}
    >
      {selected && (
        <CheckCircle
          size={16}
          className="absolute top-3 right-3"
          style={{ color: '#F5EBE0' }}
        />
      )}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3
            className="font-sans font-medium text-sm mb-1"
            style={{ color: selected ? '#F5EBE0' : '#6B705C' }}
          >
            {service.title}
          </h3>
          <p
            className="text-xs font-light leading-relaxed mb-3 line-clamp-2"
            style={{ color: selected ? 'rgba(245,235,224,0.85)' : '#A98467' }}
          >
            {service.description}
          </p>
          <div className="flex items-center gap-3">
            <span
              className="flex items-center gap-1 text-xs font-sans"
              style={{ color: selected ? 'rgba(245,235,224,0.8)' : '#A98467' }}
            >
              <Clock size={11} />
              {service.duration} min
            </span>
          </div>
        </div>
        <div className="flex-shrink-0 text-right">
          <span
            className="font-serif text-2xl"
            style={{ color: selected ? '#F5EBE0' : '#6B705C' }}
          >
            {formatPrice(service.price)}
          </span>
        </div>
      </div>
    </button>
  );
}
