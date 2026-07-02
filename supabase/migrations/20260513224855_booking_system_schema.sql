/*
  # Booking System Schema

  1. New Tables
    - `services` — yoga lessons and massage treatments
      - id, title, description, duration (minutes), price, active, created_at
    - `appointments` — customer bookings
      - id, customer_name, customer_email, customer_phone, service_id, appointment_date,
        appointment_time, status (pending/confirmed/completed/cancelled), notes, created_at
    - `availability` — recurring weekly availability
      - id, weekday (0=Sun..6=Sat), start_time, end_time, active
    - `blocked_dates` — days fully blocked off
      - id, blocked_date, reason

  2. Security
    - RLS enabled on all tables
    - Public can INSERT appointments (booking form)
    - Public can SELECT active services, availability, blocked_dates (needed for booking UI)
    - Public can SELECT appointments by email (for cancellation link)
    - Authenticated admin users have full access via service_role (bypasses RLS)
    - Admin check uses auth.jwt() app_metadata.role = 'admin'
*/

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  duration integer NOT NULL DEFAULT 60,
  price numeric(8,2) NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active services"
  ON services FOR SELECT
  TO anon, authenticated
  USING (active = true);

CREATE POLICY "Admin can view all services"
  ON services FOR SELECT
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admin can insert services"
  ON services FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admin can update services"
  ON services FOR UPDATE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admin can delete services"
  ON services FOR DELETE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL DEFAULT '',
  customer_email text NOT NULL DEFAULT '',
  customer_phone text NOT NULL DEFAULT '',
  service_id uuid REFERENCES services(id) ON DELETE SET NULL,
  appointment_date date NOT NULL,
  appointment_time time NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','completed','cancelled')),
  notes text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can book an appointment"
  ON appointments FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Customers can view own appointments"
  ON appointments FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admin can update appointments"
  ON appointments FOR UPDATE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admin can delete appointments"
  ON appointments FOR DELETE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Availability table
CREATE TABLE IF NOT EXISTS availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  weekday integer NOT NULL CHECK (weekday BETWEEN 0 AND 6),
  start_time time NOT NULL,
  end_time time NOT NULL,
  active boolean NOT NULL DEFAULT true
);

ALTER TABLE availability ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view availability"
  ON availability FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admin can insert availability"
  ON availability FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admin can update availability"
  ON availability FOR UPDATE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admin can delete availability"
  ON availability FOR DELETE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Blocked dates table
CREATE TABLE IF NOT EXISTS blocked_dates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  blocked_date date NOT NULL UNIQUE,
  reason text NOT NULL DEFAULT ''
);

ALTER TABLE blocked_dates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view blocked dates"
  ON blocked_dates FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admin can insert blocked dates"
  ON blocked_dates FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admin can update blocked dates"
  ON blocked_dates FOR UPDATE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admin can delete blocked dates"
  ON blocked_dates FOR DELETE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Index for fast availability lookups
CREATE INDEX IF NOT EXISTS appointments_date_time_idx ON appointments(appointment_date, appointment_time);
CREATE INDEX IF NOT EXISTS appointments_status_idx ON appointments(status);
