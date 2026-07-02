import { useState, useMemo } from 'react';
import { CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

type LessonType = 'yin' | 'vinyasa' | 'hatha' | 'massage_ontspanning' | 'massage_intuitief';

interface FormState {
  name: string;
  phone: string;
  email: string;
  lesson_type: LessonType;
  preferred_date: string;
  preferred_time: string;
  notes: string;
}

const initialForm: FormState = {
  name: '',
  phone: '',
  email: '',
  lesson_type: 'yin',
  preferred_date: '',
  preferred_time: '',
  notes: '',
};

// Service IDs uit Supabase
const SERVICE_IDS: Record<LessonType, string> = {
  yin: 'fec18f14-4038-4837-bf77-64a79ba869af',
  hatha: '87929240-a9ec-4beb-974e-04b1b50a29d8',
  vinyasa: 'e7847f80-bb2d-47b2-a886-9d8c4cd0e26e',
  massage_ontspanning: '1bc138a1-c424-40f8-a876-de3bb3dfc11d',
  massage_intuitief: '449dba13-d381-4015-ab35-3c5622278b4d',
};

const lessonOptions: { value: LessonType; label: string }[] = [
  { value: 'yin', label: 'Yin Yoga — €12 per les' },
  { value: 'hatha', label: 'Hatha Yoga — €12 per les' },
  { value: 'vinyasa', label: 'Vinyasa Yoga — €12 per les' },
  { value: 'massage_ontspanning', label: 'Intuïtieve massage 1 uur — €65 / 60 min' },
  { value: 'massage_intuitief', label: 'Intuïtieve massage 2,5 uur — €140 / 2,5 uur' },
];

// weekday: 0=Zon,1=Ma,2=Di,3=Wo
const scheduleByType: Record<LessonType, { weekday: number; time: string; label: string }[]> = {
  yin: [
    { weekday: 3, time: '09:00', label: 'Woensdag 09:00 – 10:00' },
    { weekday: 0, time: '11:00', label: 'Zondag 11:00 – 12:00' },
  ],
  hatha: [
    { weekday: 1, time: '09:00', label: 'Maandag 09:00 – 10:00' },
  ],
  vinyasa: [
    { weekday: 2, time: '17:30', label: 'Dinsdag 17:30 – 18:30' },
    { weekday: 0, time: '09:30', label: 'Zondag 09:30 – 10:30' },
  ],
  massage_ontspanning: [],
  massage_intuitief: [],
};

const isMassage = (t: LessonType) => t === 'massage_ontspanning' || t === 'massage_intuitief';

function getUpcomingDates(weekday: number, count = 8): string[] {
  const dates: string[] = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 1);
  while (dates.length < count) {
    if (d.getDay() === weekday) dates.push(d.toISOString().slice(0, 10));
    d.setDate(d.getDate() + 1);
  }
  return dates;
}

function formatDateLabel(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString('nl-NL', {
    weekday: 'long', day: 'numeric', month: 'long',
  });
}

export default function BookLesson() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const availableSlots = useMemo(() => {
    const slots = scheduleByType[form.lesson_type];
    if (!slots.length) return null;
    const combined: { date: string; time: string; label: string }[] = [];
    for (const slot of slots) {
      for (const date of getUpcomingDates(slot.weekday, 8)) {
        const timeLabel = slot.label.split(' ').slice(1).join(' ');
        combined.push({ date, time: slot.time, label: `${formatDateLabel(date)} — ${timeLabel}` });
      }
    }
    combined.sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
    return combined;
  }, [form.lesson_type]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (name === 'lesson_type') {
        next.preferred_date = '';
        next.preferred_time = '';
      }
      return next;
    });
  };

  const handleSlotChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [date, time] = e.target.value.split('|');
    setForm((prev) => ({ ...prev, preferred_date: date, preferred_time: time }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.phone && !form.email) {
      setError('Vul minimaal je telefoonnummer of e-mailadres in.');
      return;
    }
    if (!form.preferred_date || !form.preferred_time) {
      setError('Kies een datum en tijd.');
      return;
    }

    setLoading(true);
    setError('');

    const { error: dbError } = await supabase.from('appointments').insert([{
      customer_name: form.name,
      customer_email: form.email,
      customer_phone: form.phone,
      service_id: SERVICE_IDS[form.lesson_type],
      appointment_date: form.preferred_date,
      appointment_time: form.preferred_time,
      status: 'pending',
      notes: form.notes,
    }]);

    if (dbError) {
      setLoading(false);
      setError('Er ging iets mis. Probeer het opnieuw of neem contact op.');
      return;
    }

    setLoading(false);
    setSuccess(true);
    setForm(initialForm);
  };

  const slotValue =
    form.preferred_date && form.preferred_time
      ? `${form.preferred_date}|${form.preferred_time}`
      : '';

  return (
    <section id="boek-les" className="section-padding" style={{ backgroundColor: '#F5EBE0' }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="section-label">Reserveer jouw plek</p>
          <h2 className="section-title">Boek een les of afspraak</h2>
          <div className="divider mx-auto" />
          <p className="font-light" style={{ color: '#A98467' }}>
            Vul het formulier in en ik neem zo snel mogelijk contact met je op ter bevestiging.
          </p>
        </div>

        {success ? (
          <div
            className="text-center py-16 px-8"
            style={{ backgroundColor: '#EFE3D5', border: '1px solid #c4a487' }}
          >
            <CheckCircle size={40} className="mx-auto mb-4" style={{ color: '#D4A373' }} />
            <h3 className="font-serif text-2xl mb-3" style={{ color: '#6B705C' }}>
              Aanvraag ontvangen!
            </h3>
            <p className="font-light" style={{ color: '#A98467' }}>
              Bedankt voor je aanmelding. Ik neem binnen 24 uur contact met je op.
            </p>
            <button onClick={() => setSuccess(false)} className="btn-outline mt-8 text-xs">
              Nog een les boeken
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs tracking-widest uppercase font-sans mb-2" style={{ color: '#A98467' }}>
                  Naam *
                </label>
                <input
                  type="text" name="name" required value={form.name} onChange={handleChange}
                  placeholder="Jouw volledige naam" className="input-field"
                />
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase font-sans mb-2" style={{ color: '#A98467' }}>
                  Telefoonnummer
                </label>
                <input
                  type="tel" name="phone" value={form.phone} onChange={handleChange}
                  placeholder="+31 6 00 00 00 00" className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs tracking-widest uppercase font-sans mb-2" style={{ color: '#A98467' }}>
                E-mailadres
              </label>
              <input
                type="email" name="email" value={form.email} onChange={handleChange}
                placeholder="jouw@email.nl" className="input-field"
              />
              <p className="text-xs font-light mt-1" style={{ color: '#A98467' }}>
                Vul minimaal je telefoonnummer of e-mailadres in.
              </p>
            </div>

            <div>
              <label className="block text-xs tracking-widest uppercase font-sans mb-2" style={{ color: '#A98467' }}>
                Kies les of behandeling *
              </label>
              <select
                name="lesson_type" value={form.lesson_type} onChange={handleChange}
                className="input-field appearance-none"
              >
                {lessonOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {availableSlots && (
              <div>
                <label className="block text-xs tracking-widest uppercase font-sans mb-2" style={{ color: '#A98467' }}>
                  Kies datum & tijd *
                </label>
                <select
                  required
                  value={slotValue}
                  onChange={handleSlotChange}
                  className="input-field appearance-none"
                >
                  <option value="" disabled>Selecteer een datum...</option>
                  {availableSlots.map((slot) => (
                    <option key={`${slot.date}|${slot.time}`} value={`${slot.date}|${slot.time}`}>
                      {slot.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {isMassage(form.lesson_type) && (
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs tracking-widest uppercase font-sans mb-2" style={{ color: '#A98467' }}>
                    Gewenste datum *
                  </label>
                  <input
                    type="date"
                    name="preferred_date"
                    required
                    value={form.preferred_date}
                    onChange={handleChange}
                    min={new Date(Date.now() + 86400000).toISOString().slice(0, 10)}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase font-sans mb-2" style={{ color: '#A98467' }}>
                    Gewenste tijd *
                  </label>
                  <input
                    type="time"
                    name="preferred_time"
                    required
                    value={form.preferred_time}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs tracking-widest uppercase font-sans mb-2" style={{ color: '#A98467' }}>
                Opmerking (optioneel)
              </label>
              <textarea
                name="notes" value={form.notes} onChange={handleChange}
                placeholder="Eventuele vragen of bijzonderheden..."
                rows={3}
                className="input-field resize-none"
              />
            </div>

            {error && (
              <p className="text-sm font-light" style={{ color: '#c0392b' }}>{error}</p>
            )}

            <div className="text-center pt-2">
              <button
                type="submit" disabled={loading}
                className="btn-primary min-w-48 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Bezig met versturen...' : 'Bevestig reservering'}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
