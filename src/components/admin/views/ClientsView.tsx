import { useMemo } from 'react';
import type { Appointment } from '../../../lib/types';
import { formatDate, formatPrice } from '../../../lib/bookingUtils';
import { Mail, Phone, Calendar } from 'lucide-react';

interface Props {
  appointments: Appointment[];
}

interface ClientRecord {
  email: string;
  name: string;
  phone: string;
  count: number;
  lastDate: string;
  totalSpend: number;
}

export default function ClientsView({ appointments }: Props) {
  const clients = useMemo<ClientRecord[]>(() => {
    const map = new Map<string, ClientRecord>();
    for (const a of appointments) {
      if (a.status === 'cancelled') continue;
      const key = a.customer_email || a.customer_phone || a.customer_name;
      const existing = map.get(key);
      if (existing) {
        existing.count += 1;
        existing.totalSpend += a.service?.price ?? 0;
        if (a.appointment_date > existing.lastDate) existing.lastDate = a.appointment_date;
      } else {
        map.set(key, {
          email: a.customer_email,
          name: a.customer_name,
          phone: a.customer_phone,
          count: 1,
          lastDate: a.appointment_date,
          totalSpend: a.service?.price ?? 0,
        });
      }
    }
    return [...map.values()].sort((a, b) => b.lastDate.localeCompare(a.lastDate));
  }, [appointments]);

  if (clients.length === 0) {
    return (
      <p className="text-sm font-light py-10 text-center" style={{ color: '#A98467' }}>
        Nog geen klanten.
      </p>
    );
  }

  return (
    <div className="grid gap-3">
      {clients.map((c) => (
        <div
          key={c.email || c.phone || c.name}
          className="p-5 flex flex-wrap items-start gap-4"
          style={{ backgroundColor: '#F5EBE0', border: '1px solid #c4a487' }}
        >
          <div className="flex-1 min-w-0 grid gap-1.5">
            <p className="font-sans font-medium text-sm" style={{ color: '#6B705C' }}>{c.name}</p>
            {c.email && (
              <div className="flex items-center gap-2">
                <Mail size={12} style={{ color: '#D4A373' }} />
                <a href={`mailto:${c.email}`} className="text-xs font-light" style={{ color: '#A98467' }}>{c.email}</a>
              </div>
            )}
            {c.phone && (
              <div className="flex items-center gap-2">
                <Phone size={12} style={{ color: '#D4A373' }} />
                <a href={`tel:${c.phone}`} className="text-xs font-light" style={{ color: '#A98467' }}>{c.phone}</a>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar size={12} style={{ color: '#D4A373' }} />
              <span className="text-xs font-light capitalize" style={{ color: '#A98467' }}>
                Laatste afspraak: {formatDate(c.lastDate)}
              </span>
            </div>
          </div>
          <div className="flex gap-6 flex-shrink-0">
            <div className="text-center">
              <p className="font-serif text-2xl" style={{ color: '#D4A373' }}>{c.count}</p>
              <p className="text-xs font-sans" style={{ color: '#A98467' }}>afspraken</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-2xl" style={{ color: '#6B705C' }}>{formatPrice(c.totalSpend)}</p>
              <p className="text-xs font-sans" style={{ color: '#A98467' }}>besteed</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
