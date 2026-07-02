import { Clock, User, Mail, Phone, Trash2, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import type { Appointment } from '../../lib/types';
import { STATUS_COLORS, STATUS_LABELS } from '../../lib/types';
import { formatDate, formatTime, addMinutes } from '../../lib/bookingUtils';

interface Props {
  appointment: Appointment;
  onStatusChange: (id: string, status: Appointment['status']) => void;
  onDelete: (id: string) => void;
}

export default function AppointmentCard({ appointment, onStatusChange, onDelete }: Props) {
  const colors = STATUS_COLORS[appointment.status];
  const endTime = appointment.service
    ? addMinutes(appointment.appointment_time.slice(0, 5), appointment.service.duration)
    : null;

  return (
    <div
      className="p-5 transition-all duration-200 hover:shadow-sm"
      style={{ backgroundColor: '#F5EBE0', border: '1px solid #c4a487' }}
    >
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span
              className="text-xs px-2 py-0.5 font-sans font-medium"
              style={{
                backgroundColor: colors.bg,
                color: colors.text,
                border: `1px solid ${colors.border}`,
              }}
            >
              {STATUS_LABELS[appointment.status]}
            </span>
            {appointment.service && (
              <span className="text-xs font-sans" style={{ color: '#A98467' }}>
                {appointment.service.title}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-sans font-medium text-sm" style={{ color: '#6B705C' }}>
              {formatDate(appointment.appointment_date)}
            </span>
            <span className="text-sm font-light" style={{ color: '#A98467' }}>
              <Clock size={11} className="inline mr-1" />
              {formatTime(appointment.appointment_time)}
              {endTime && ` – ${endTime}`}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {appointment.status !== 'confirmed' && appointment.status !== 'completed' && (
            <button
              title="Bevestigen"
              onClick={() => onStatusChange(appointment.id, 'confirmed')}
              className="w-8 h-8 flex items-center justify-center transition-colors"
              style={{ color: '#065F46' }}
            >
              <CheckCircle size={16} />
            </button>
          )}
          {appointment.status !== 'completed' && appointment.status !== 'cancelled' && (
            <button
              title="Afronden"
              onClick={() => onStatusChange(appointment.id, 'completed')}
              className="w-8 h-8 flex items-center justify-center transition-colors"
              style={{ color: '#0C4A6E' }}
            >
              <RefreshCw size={16} />
            </button>
          )}
          {appointment.status !== 'cancelled' && (
            <button
              title="Annuleren"
              onClick={() => onStatusChange(appointment.id, 'cancelled')}
              className="w-8 h-8 flex items-center justify-center transition-colors"
              style={{ color: '#991B1B' }}
            >
              <XCircle size={16} />
            </button>
          )}
          <button
            title="Verwijderen"
            onClick={() => onDelete(appointment.id)}
            className="w-8 h-8 flex items-center justify-center transition-colors"
            style={{ color: '#c4a487' }}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Customer info */}
      <div className="grid gap-1.5 pt-3" style={{ borderTop: '1px solid #EFE3D5' }}>
        <div className="flex items-center gap-2">
          <User size={12} style={{ color: '#D4A373' }} />
          <span className="text-sm font-light" style={{ color: '#6B705C' }}>
            {appointment.customer_name}
          </span>
        </div>
        {appointment.customer_email && (
          <div className="flex items-center gap-2">
            <Mail size={12} style={{ color: '#D4A373' }} />
            <a
              href={`mailto:${appointment.customer_email}`}
              className="text-sm font-light transition-colors"
              style={{ color: '#A98467' }}
            >
              {appointment.customer_email}
            </a>
          </div>
        )}
        {appointment.customer_phone && (
          <div className="flex items-center gap-2">
            <Phone size={12} style={{ color: '#D4A373' }} />
            <a
              href={`tel:${appointment.customer_phone}`}
              className="text-sm font-light"
              style={{ color: '#A98467' }}
            >
              {appointment.customer_phone}
            </a>
          </div>
        )}
        {appointment.notes && (
          <p className="text-xs font-light mt-1 pl-5" style={{ color: '#A98467' }}>
            "{appointment.notes}"
          </p>
        )}
      </div>
    </div>
  );
}
