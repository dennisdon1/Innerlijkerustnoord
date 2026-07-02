import type { Availability, Appointment } from './types';

export function generateTimeSlots(
  availability: Availability[],
  date: Date,
  serviceDuration: number,
  existingAppointments: Appointment[]
): string[] {
  const weekday = date.getDay();
  const dayAvailability = availability.filter((a) => a.weekday === weekday && a.active);
  if (!dayAvailability.length) return [];

  const slots: string[] = [];

  for (const avail of dayAvailability) {
    const [startH, startM] = avail.start_time.split(':').map(Number);
    const [endH, endM] = avail.end_time.split(':').map(Number);
    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;

    const step = 30;
    let cursor = startMinutes;
    while (cursor + serviceDuration <= endMinutes) {
      const h = Math.floor(cursor / 60).toString().padStart(2, '0');
      const m = (cursor % 60).toString().padStart(2, '0');
      slots.push(`${h}:${m}`);
      cursor += step;
    }
  }

  // Filter out already-booked slots (non-cancelled)
  const bookedTimes = new Set(
    existingAppointments
      .filter((a) => a.status !== 'cancelled')
      .map((a) => a.appointment_time.slice(0, 5))
  );

  return slots.filter((s) => !bookedTimes.has(s));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(price);
}

export function formatDate(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString('nl-NL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatTime(time: string): string {
  return time.slice(0, 5);
}

export function addMinutes(time: string, minutes: number): string {
  const [h, m] = time.split(':').map(Number);
  const total = h * 60 + m + minutes;
  return `${Math.floor(total / 60).toString().padStart(2, '0')}:${(total % 60).toString().padStart(2, '0')}`;
}

export function isoToday(): string {
  return new Date().toISOString().slice(0, 10);
}

export function getUpcomingAvailableDates(
  availability: Availability[],
  blockedDates: string[],
  monthsAhead = 3
): Set<string> {
  const available = new Set<string>();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const future = new Date(today);
  future.setMonth(future.getMonth() + monthsAhead);

  const activeWeekdays = new Set(availability.filter((a) => a.active).map((a) => a.weekday));
  const blocked = new Set(blockedDates);

  const d = new Date(today);
  d.setDate(d.getDate() + 1); // start from tomorrow
  while (d <= future) {
    const iso = d.toISOString().slice(0, 10);
    if (activeWeekdays.has(d.getDay()) && !blocked.has(iso)) {
      available.add(iso);
    }
    d.setDate(d.getDate() + 1);
  }
  return available;
}
