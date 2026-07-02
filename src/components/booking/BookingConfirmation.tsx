import { CheckCircle, Calendar, Clock, User, Mail, Phone } from 'lucide-react';
import type { Service } from '../../lib/types';
import { formatDate, formatTime, addMinutes, formatPrice } from '../../lib/bookingUtils';

interface Props {
  service: Service;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  onReset: () => void;
}

export default function BookingConfirmation({ service, date, time, name, email, phone, onReset }: Props) {
  const endTime = addMinutes(time, service.duration);

  return (
    <div className="text-center py-12 px-6 max-w-lg mx-auto">
      {/* Animated check */}
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
        style={{ backgroundColor: '#D4A373' }}
      >
        <CheckCircle size={40} style={{ color: '#F5EBE0' }} />
      </div>

      <h2 className="font-serif text-3xl mb-3" style={{ color: '#6B705C' }}>
        Aanvraag ontvangen!
      </h2>
      <p className="font-light mb-10" style={{ color: '#A98467' }}>
        Bedankt voor je boeking. Je ontvangt een bevestiging per e-mail. Ik neem binnen 24 uur contact met je op.
      </p>

      {/* Summary card */}
      <div
        className="p-6 text-left mb-8"
        style={{ backgroundColor: '#EFE3D5', border: '1px solid #c4a487' }}
      >
        <h3 className="font-sans font-medium text-sm mb-5" style={{ color: '#6B705C' }}>
          Overzicht boeking
        </h3>
        <div className="grid gap-3">
          <div className="flex items-start gap-3">
            <Calendar size={14} className="mt-0.5 flex-shrink-0" style={{ color: '#D4A373' }} />
            <div>
              <p className="text-xs font-sans" style={{ color: '#A98467' }}>Behandeling</p>
              <p className="text-sm font-medium" style={{ color: '#6B705C' }}>
                {service.title} — {formatPrice(service.price)}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Calendar size={14} className="mt-0.5 flex-shrink-0" style={{ color: '#D4A373' }} />
            <div>
              <p className="text-xs font-sans" style={{ color: '#A98467' }}>Datum</p>
              <p className="text-sm font-medium capitalize" style={{ color: '#6B705C' }}>
                {formatDate(date)}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock size={14} className="mt-0.5 flex-shrink-0" style={{ color: '#D4A373' }} />
            <div>
              <p className="text-xs font-sans" style={{ color: '#A98467' }}>Tijd</p>
              <p className="text-sm font-medium" style={{ color: '#6B705C' }}>
                {formatTime(time)} – {endTime}
              </p>
            </div>
          </div>
          <div className="w-full h-px my-1" style={{ backgroundColor: '#c4a487' }} />
          <div className="flex items-start gap-3">
            <User size={14} className="mt-0.5 flex-shrink-0" style={{ color: '#D4A373' }} />
            <div>
              <p className="text-xs font-sans" style={{ color: '#A98467' }}>Naam</p>
              <p className="text-sm font-medium" style={{ color: '#6B705C' }}>{name}</p>
            </div>
          </div>
          {email && (
            <div className="flex items-start gap-3">
              <Mail size={14} className="mt-0.5 flex-shrink-0" style={{ color: '#D4A373' }} />
              <div>
                <p className="text-xs font-sans" style={{ color: '#A98467' }}>E-mail</p>
                <p className="text-sm font-medium" style={{ color: '#6B705C' }}>{email}</p>
              </div>
            </div>
          )}
          {phone && (
            <div className="flex items-start gap-3">
              <Phone size={14} className="mt-0.5 flex-shrink-0" style={{ color: '#D4A373' }} />
              <div>
                <p className="text-xs font-sans" style={{ color: '#A98467' }}>Telefoon</p>
                <p className="text-sm font-medium" style={{ color: '#6B705C' }}>{phone}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <p className="text-xs font-light mb-8" style={{ color: '#A98467' }}>
        Annuleren is kosteloos tot 24 uur voor de afspraak. Neem contact op via info@innerlijkerustnoord.nl of +31 6 37294715.
      </p>

      <button onClick={onReset} className="btn-outline text-xs">
        Nieuwe boeking maken
      </button>
    </div>
  );
}
