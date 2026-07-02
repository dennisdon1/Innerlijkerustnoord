import { useState, useEffect, useMemo } from 'react';
import { ChevronLeft } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { sendBookingConfirmation } from '../../lib/emailjs';
import { formatDate, addMinutes, formatPrice, generateTimeSlots, getUpcomingAvailableDates, formatTime } from '../../lib/bookingUtils';
import type { Service, Availability, Appointment, BlockedDate } from '../../lib/types';

import ServiceCard from './ServiceCard';
import BookingCalendar from './BookingCalendar';
import TimeSlotPicker from './TimeSlotPicker';
import BookingConfirmation from './BookingConfirmation';

type Step = 1 | 2 | 3;

interface IntakeForm {
  name: string;
  email: string;
  phone: string;
  notes: string;
}

const emptyForm: IntakeForm = { name: '', email: '', phone: '', notes: '' };

export default function BookingPage() {
  const [step, setStep] = useState<Step>(1);
  const [services, setServices] = useState<Service[]>([]);
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [form, setForm] = useState<IntakeForm>(emptyForm);

  const [loadingInit, setLoadingInit] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    Promise.all([
      supabase.from('services').select('*').eq('active', true),
      supabase.from('availability').select('*').eq('active', true),
      supabase.from('blocked_dates').select('*'),
    ]).then(([svc, avail, block]) => {
      setServices(svc.data ?? []);
      setAvailability(avail.data ?? []);
      setBlockedDates(block.data ?? []);
      setLoadingInit(false);
    });
  }, []);

  useEffect(() => {
    if (!selectedDate) return;
    setLoadingSlots(true);
    setSelectedTime('');
    supabase
      .from('appointments')
      .select('appointment_time, status')
      .eq('appointment_date', selectedDate)
      .then(({ data }) => {
        setAppointments((data as Appointment[]) ?? []);
        setLoadingSlots(false);
      });
  }, [selectedDate]);

  const availableDates = useMemo(
    () => getUpcomingAvailableDates(availability, blockedDates.map(b => b.blocked_date)),
    [availability, blockedDates]
  );

  const timeSlots = useMemo(() => {
    if (!selectedDate || !selectedService) return [];
    const d = new Date(selectedDate + 'T00:00:00');
    return generateTimeSlots(availability, d, selectedService.duration, appointments);
  }, [selectedDate, selectedService, availability, appointments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !selectedDate || !selectedTime) return;

    setSubmitting(true);
    setError('');

    try {
      const { error: dbErr } = await supabase.from('appointments').insert([{
        customer_name: form.name,
        customer_email: form.email,
        customer_phone: form.phone,
        service_id: selectedService.id,
        appointment_date: selectedDate,
        appointment_time: selectedTime,
        status: 'pending',
        notes: form.notes,
      }]);

      if (dbErr) {
        setError('Kon afspraak niet opslaan. Probeer het opnieuw.');
        setSubmitting(false);
        return;
      }

      try {
        await sendBookingConfirmation({
          customer_name: form.name,
          customer_email: form.email,
          customer_phone: form.phone,
          service_title: selectedService.title,
          service_price: formatPrice(selectedService.price),
          appointment_date: formatDate(selectedDate),
          appointment_time: formatTime(selectedTime),
          appointment_end_time: addMinutes(selectedTime, selectedService.duration),
          notes: form.notes,
        });
      } catch {
        // email failure is non-blocking
      }

      setSubmitted(true);
    } catch {
      setError('Er ging iets mis. Probeer het opnieuw.');
    }

    setSubmitting(false);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedService(null);
    setSelectedDate('');
    setSelectedTime('');
    setForm(emptyForm);
    setSubmitted(false);
    setError('');
  };

  if (loadingInit) {
    return (
      <section id="boek-afspraak" className="section-padding" style={{ backgroundColor: '#EFE3D5' }}>
        <div className="max-w-3xl mx-auto text-center py-20">
          <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mx-auto" style={{ borderColor: '#D4A373' }} />
        </div>
      </section>
    );
  }

  if (submitted && selectedService) {
    return (
      <section id="boek-afspraak" className="section-padding" style={{ backgroundColor: '#EFE3D5' }}>
        <div className="max-w-3xl mx-auto">
          <BookingConfirmation
            service={selectedService}
            date={selectedDate}
            time={selectedTime}
            name={form.name}
            email={form.email}
            phone={form.phone}
            onReset={handleReset}
          />
        </div>
      </section>
    );
  }

  const stepLabels = ['Kies behandeling', 'Datum & tijd', 'Jouw gegevens'];

  return (
    <section id="boek-afspraak" className="section-padding" style={{ backgroundColor: '#EFE3D5' }}>
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="section-label">Online reserveren</p>
          <h2 className="section-title">Boek een afspraak</h2>
          <div className="divider mx-auto" />
          <p className="font-light" style={{ color: '#A98467' }}>
            Kies je behandeling, selecteer een datum en vul je gegevens in.
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-0 mb-10">
          {stepLabels.map((label, i) => {
            const num = i + 1;
            const isActive = step === num;
            const isDone = step > num;
            return (
              <div key={label} className="flex items-center">
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className="w-8 h-8 flex items-center justify-center text-xs font-sans font-medium transition-all duration-300"
                    style={{
                      backgroundColor: isActive || isDone ? '#D4A373' : '#F5EBE0',
                      color: isActive || isDone ? '#F5EBE0' : '#A98467',
                      border: `1.5px solid ${isActive || isDone ? '#D4A373' : '#c4a487'}`,
                    }}
                  >
                    {isDone ? '✓' : num}
                  </div>
                  <span
                    className="text-xs font-sans hidden sm:block"
                    style={{ color: isActive ? '#6B705C' : '#A98467' }}
                  >
                    {label}
                  </span>
                </div>
                {i < stepLabels.length - 1 && (
                  <div
                    className="w-16 h-px mx-2 mb-5"
                    style={{ backgroundColor: step > num ? '#D4A373' : '#c4a487' }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Step content */}
        <div className="p-8 md:p-10" style={{ backgroundColor: '#F5EBE0', border: '1px solid #c4a487' }}>

          {/* STEP 1 — Service */}
          {step === 1 && (
            <div>
              <h3 className="font-sans text-sm font-medium tracking-wide mb-6" style={{ color: '#6B705C' }}>
                Kies een behandeling
              </h3>
              {services.length === 0 ? (
                <p className="text-sm font-light text-center py-8" style={{ color: '#A98467' }}>
                  Momenteel zijn er geen behandelingen beschikbaar.
                </p>
              ) : (
                <div className="grid gap-3 mb-8">
                  {services.map(service => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      selected={selectedService?.id === service.id}
                      onSelect={() => setSelectedService(service)}
                    />
                  ))}
                </div>
              )}
              <div className="flex justify-end">
                <button
                  disabled={!selectedService}
                  onClick={() => setStep(2)}
                  className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Volgende stap
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 — Date & time */}
          {step === 2 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1 text-xs font-sans transition-colors"
                  style={{ color: '#A98467' }}
                >
                  <ChevronLeft size={14} />
                  Terug
                </button>
                <h3 className="font-sans text-sm font-medium tracking-wide" style={{ color: '#6B705C' }}>
                  Kies datum & tijd
                </h3>
              </div>

              {selectedService && (
                <div
                  className="flex items-center justify-between px-4 py-3 mb-6 text-xs font-sans"
                  style={{ backgroundColor: '#EFE3D5', border: '1px solid #c4a487' }}
                >
                  <span style={{ color: '#6B705C' }}>{selectedService.title}</span>
                  <span style={{ color: '#D4A373' }}>{formatPrice(selectedService.price)}</span>
                </div>
              )}

              <div className="mb-8">
                <BookingCalendar
                  availableDates={availableDates}
                  selectedDate={selectedDate}
                  onSelect={setSelectedDate}
                />
              </div>

              {selectedDate && (
                <div className="mb-8">
                  <p className="text-xs tracking-widest uppercase font-sans mb-3" style={{ color: '#A98467' }}>
                    Beschikbare tijden
                  </p>
                  <TimeSlotPicker
                    slots={timeSlots}
                    selected={selectedTime}
                    onSelect={setSelectedTime}
                    loading={loadingSlots}
                  />
                </div>
              )}

              <div className="flex justify-end">
                <button
                  disabled={!selectedTime}
                  onClick={() => setStep(3)}
                  className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Volgende stap
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 — Personal details */}
          {step === 3 && (
            <form onSubmit={handleSubmit}>
              <div className="flex items-center gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex items-center gap-1 text-xs font-sans transition-colors"
                  style={{ color: '#A98467' }}
                >
                  <ChevronLeft size={14} />
                  Terug
                </button>
                <h3 className="font-sans text-sm font-medium tracking-wide" style={{ color: '#6B705C' }}>
                  Jouw gegevens
                </h3>
              </div>

              {selectedService && selectedDate && selectedTime && (
                <div
                  className="px-4 py-3 mb-6 text-xs font-sans grid gap-1"
                  style={{ backgroundColor: '#EFE3D5', border: '1px solid #c4a487' }}
                >
                  <div className="flex justify-between">
                    <span style={{ color: '#A98467' }}>Behandeling</span>
                    <span style={{ color: '#6B705C' }}>{selectedService.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: '#A98467' }}>Datum</span>
                    <span style={{ color: '#6B705C' }} className="capitalize">{formatDate(selectedDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: '#A98467' }}>Tijd</span>
                    <span style={{ color: '#6B705C' }}>
                      {formatTime(selectedTime)} – {addMinutes(selectedTime, selectedService.duration)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1 border-t" style={{ borderColor: '#c4a487' }}>
                    <span style={{ color: '#A98467' }}>Prijs</span>
                    <span style={{ color: '#D4A373', fontWeight: 500 }}>{formatPrice(selectedService.price)}</span>
                  </div>
                </div>
              )}

              <div className="grid gap-5 mb-6">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs tracking-widest uppercase font-sans mb-2" style={{ color: '#A98467' }}>
                      Naam *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jouw volledige naam"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase font-sans mb-2" style={{ color: '#A98467' }}>
                      Telefoon *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+31 6 00 00 00 00"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="input-field"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase font-sans mb-2" style={{ color: '#A98467' }}>
                    E-mailadres *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jouw@email.nl"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase font-sans mb-2" style={{ color: '#A98467' }}>
                    Opmerkingen (optioneel)
                  </label>
                  <textarea
                    placeholder="Eventuele vragen of bijzonderheden..."
                    rows={3}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="input-field resize-none"
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm font-light mb-4" style={{ color: '#c0392b' }}>{error}</p>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed min-w-44"
                >
                  {submitting ? 'Bezig...' : 'Bevestig boeking'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
