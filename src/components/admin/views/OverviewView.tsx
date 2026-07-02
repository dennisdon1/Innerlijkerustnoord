import type { Appointment, Service } from '../../../lib/types';
import { STATUS_LABELS, STATUS_COLORS } from '../../../lib/types';
import { formatDate, formatTime, formatPrice } from '../../../lib/bookingUtils';
import StatsCard from '../StatsCard';
import { Calendar, TrendingUp } from 'lucide-react';

interface Props {
  appointments: Appointment[];
  services: Service[];
  onViewAppointments: () => void;
}

export default function OverviewView({ appointments, services, onViewAppointments }: Props) {
  const today = new Date().toISOString().slice(0, 10);

  const todayAppts = appointments.filter((a) => a.appointment_date === today && a.status !== 'cancelled');
  const upcoming = appointments
    .filter((a) => a.appointment_date >= today && a.status !== 'cancelled' && a.status !== 'completed')
    .sort((a, b) => a.appointment_date.localeCompare(b.appointment_date) || a.appointment_time.localeCompare(b.appointment_time))
    .slice(0, 5);

  const thisMonth = new Date().toISOString().slice(0, 7);
  const monthRevenue = appointments
    .filter((a) => a.appointment_date.startsWith(thisMonth) && a.status !== 'cancelled')
    .reduce((sum, a) => sum + (a.service?.price ?? 0), 0);

  const pendingCount = appointments.filter((a) => a.status === 'pending').length;

  return (
    <div className="grid gap-8">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard label="Vandaag" value={todayAppts.length} sub="afspraken" accent />
        <StatsCard label="In afwachting" value={pendingCount} sub="bevestigen" />
        <StatsCard label="Deze maand" value={formatPrice(monthRevenue)} sub="omzet" />
        <StatsCard label="Actieve diensten" value={services.length} sub="behandelingen" />
      </div>

      {/* Today's agenda */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Calendar size={16} style={{ color: '#D4A373' }} />
          <h3 className="font-sans font-medium text-sm" style={{ color: '#6B705C' }}>
            Vandaag — {new Date().toLocaleDateString('nl-NL', { weekday: 'long', day: 'numeric', month: 'long' })}
          </h3>
        </div>
        {todayAppts.length === 0 ? (
          <p className="text-sm font-light py-6 text-center" style={{ color: '#A98467', backgroundColor: '#EFE3D5', border: '1px solid #c4a487' }}>
            Geen afspraken vandaag.
          </p>
        ) : (
          <div className="grid gap-2">
            {todayAppts
              .sort((a, b) => a.appointment_time.localeCompare(b.appointment_time))
              .map((appt) => {
                const colors = STATUS_COLORS[appt.status];
                return (
                  <div
                    key={appt.id}
                    className="flex items-center gap-4 px-5 py-4"
                    style={{ backgroundColor: '#F5EBE0', border: '1px solid #c4a487' }}
                  >
                    <span className="font-serif text-xl w-16 flex-shrink-0" style={{ color: '#D4A373' }}>
                      {formatTime(appt.appointment_time)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm" style={{ color: '#6B705C' }}>
                        {appt.customer_name}
                      </p>
                      <p className="text-xs font-light" style={{ color: '#A98467' }}>
                        {appt.service?.title ?? 'Onbekende dienst'}
                      </p>
                    </div>
                    <span
                      className="text-xs px-2 py-0.5 font-sans flex-shrink-0"
                      style={{ backgroundColor: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
                    >
                      {STATUS_LABELS[appt.status]}
                    </span>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      {/* Upcoming */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp size={16} style={{ color: '#D4A373' }} />
            <h3 className="font-sans font-medium text-sm" style={{ color: '#6B705C' }}>
              Komende afspraken
            </h3>
          </div>
          <button
            onClick={onViewAppointments}
            className="text-xs font-sans transition-colors"
            style={{ color: '#A98467' }}
          >
            Alle bekijken →
          </button>
        </div>
        {upcoming.length === 0 ? (
          <p className="text-sm font-light py-6 text-center" style={{ color: '#A98467', backgroundColor: '#EFE3D5', border: '1px solid #c4a487' }}>
            Geen komende afspraken.
          </p>
        ) : (
          <div className="grid gap-2">
            {upcoming.map((appt) => (
              <div
                key={appt.id}
                className="flex items-center gap-4 px-5 py-4"
                style={{ backgroundColor: '#F5EBE0', border: '1px solid #c4a487' }}
              >
                <div className="w-14 text-center flex-shrink-0">
                  <p className="font-serif text-lg leading-none" style={{ color: '#D4A373' }}>
                    {new Date(appt.appointment_date + 'T00:00:00').getDate()}
                  </p>
                  <p className="text-xs font-sans capitalize" style={{ color: '#A98467' }}>
                    {new Date(appt.appointment_date + 'T00:00:00').toLocaleDateString('nl-NL', { month: 'short' })}
                  </p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm" style={{ color: '#6B705C' }}>
                    {appt.customer_name}
                  </p>
                  <p className="text-xs font-light" style={{ color: '#A98467' }}>
                    {appt.service?.title} · {formatTime(appt.appointment_time)}
                  </p>
                </div>
                {appt.service && (
                  <span className="font-serif text-lg flex-shrink-0" style={{ color: '#6B705C' }}>
                    {formatPrice(appt.service.price)}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
