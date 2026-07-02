export interface Service {
  id: string;
  title: string;
  description: string;
  duration: number;
  price: number;
  active: boolean;
  created_at: string;
}

export interface Appointment {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  service_id: string | null;
  appointment_date: string;
  appointment_time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes: string;
  created_at: string;
  service?: Service;
}

export interface Availability {
  id: string;
  weekday: number;
  start_time: string;
  end_time: string;
  active: boolean;
}

export interface BlockedDate {
  id: string;
  blocked_date: string;
  reason: string;
}

export const STATUS_COLORS: Record<Appointment['status'], { bg: string; text: string; border: string }> = {
  pending:   { bg: '#FEF9C3', text: '#92400E', border: '#FDE68A' },
  confirmed: { bg: '#D1FAE5', text: '#065F46', border: '#6EE7B7' },
  completed: { bg: '#E0F2FE', text: '#0C4A6E', border: '#BAE6FD' },
  cancelled: { bg: '#FEE2E2', text: '#991B1B', border: '#FECACA' },
};

export const STATUS_LABELS: Record<Appointment['status'], string> = {
  pending: 'In afwachting',
  confirmed: 'Bevestigd',
  completed: 'Afgerond',
  cancelled: 'Geannuleerd',
};

export const WEEKDAY_NAMES = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];
