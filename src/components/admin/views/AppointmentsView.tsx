import { useState } from 'react';
import type { Appointment } from '../../../lib/types';
import { STATUS_LABELS } from '../../../lib/types';
import AppointmentCard from '../AppointmentCard';
import { Search } from 'lucide-react';

type Filter = 'all' | Appointment['status'];

interface Props {
  appointments: Appointment[];
  onStatusChange: (id: string, status: Appointment['status']) => void;
  onDelete: (id: string) => void;
}

export default function AppointmentsView({ appointments, onStatusChange, onDelete }: Props) {
  const [filter, setFilter] = useState<Filter>('all');
  const [search, setSearch] = useState('');

  const today = new Date().toISOString().slice(0, 10);

  const filtered = appointments
    .filter((a) => filter === 'all' || a.status === filter)
    .filter((a) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        a.customer_name.toLowerCase().includes(q) ||
        a.customer_email.toLowerCase().includes(q) ||
        a.customer_phone.includes(q) ||
        a.service?.title.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      // upcoming first, then past
      const aFuture = a.appointment_date >= today ? 0 : 1;
      const bFuture = b.appointment_date >= today ? 0 : 1;
      if (aFuture !== bFuture) return aFuture - bFuture;
      return a.appointment_date.localeCompare(b.appointment_date) || a.appointment_time.localeCompare(b.appointment_time);
    });

  const filters: { value: Filter; label: string }[] = [
    { value: 'all', label: 'Alle' },
    { value: 'pending', label: STATUS_LABELS.pending },
    { value: 'confirmed', label: STATUS_LABELS.confirmed },
    { value: 'completed', label: STATUS_LABELS.completed },
    { value: 'cancelled', label: STATUS_LABELS.cancelled },
  ];

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#A98467' }} />
          <input
            type="text"
            placeholder="Zoek op naam, e-mail..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-9 text-sm"
          />
        </div>

        {/* Status filters */}
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className="px-3 py-1.5 text-xs font-sans font-medium transition-all"
              style={{
                backgroundColor: filter === f.value ? '#D4A373' : '#EFE3D5',
                color: filter === f.value ? '#F5EBE0' : '#6B705C',
                border: `1px solid ${filter === f.value ? '#D4A373' : '#c4a487'}`,
              }}
            >
              {f.label}
              {f.value !== 'all' && (
                <span className="ml-1.5 opacity-70">
                  ({appointments.filter((a) => a.status === f.value).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm font-light py-10 text-center" style={{ color: '#A98467' }}>
          Geen afspraken gevonden.
        </p>
      ) : (
        <div className="grid gap-3">
          {filtered.map((appt) => (
            <AppointmentCard
              key={appt.id}
              appointment={appt}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
