/*
  # Full Booking System Schema

  Creates all tables needed for the booking system:
  - services: yoga lessons and massage treatments
  - appointments: customer bookings
  - availability: weekly recurring time slots
  - blocked_dates: fully blocked off days

  All tables have RLS enabled with simple, non-conflicting policies.
*/

-- Services
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

CREATE POLICY "Anyone can view active services"
  ON services FOR SELECT
  TO anon, authenticated
  USING (active = true);

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

-- Appointments
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

CREATE POLICY "Anyone can insert appointments"
  ON appointments FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can view appointments"
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

-- Availability
CREATE TABLE IF NOT EXISTS availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  weekday integer NOT NULL CHECK (weekday BETWEEN 0 AND 6),
  start_time time NOT NULL,
  end_time time NOT NULL,
  active boolean NOT NULL DEFAULT true
);

ALTER TABLE availability ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view availability"
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

-- Blocked dates
CREATE TABLE IF NOT EXISTS blocked_dates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  blocked_date date NOT NULL UNIQUE,
  reason text NOT NULL DEFAULT ''
);

ALTER TABLE blocked_dates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view blocked dates"
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

-- Indexes
CREATE INDEX IF NOT EXISTS appointments_date_idx ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS appointments_status_idx ON appointments(status);

-- Seed services
INSERT INTO services (title, description, duration, price, active) VALUES
  ('Yin Yoga', 'Een rustgevende yogastijl waarbij houdingen lang worden vastgehouden. Werkt diep op bindweefsel en bevordert ontspanning en innerlijke rust.', 60, 18, true),
  ('Vinyasa Yoga', 'Dynamische yogastijl waarbij beweging en adem worden gesynchroniseerd. Versterkt lichaam en geest door vloeiende overgangen.', 60, 18, true),
  ('Hatha Yoga', 'Klassieke yogastijl met focus op balans tussen kracht en flexibiliteit. Geschikt voor alle niveaus.', 60, 18, true),
  ('Ontspanningsmassage', 'Een volledige ontspanningsmassage die spierspanning lost en het zenuwstelsel kalmeert. Perfect na een lange week.', 60, 70, true),
  ('Intuïtieve Massage', 'Een diepgaande intuïtieve massage van 2 tot 2,5 uur waarbij lichaam en geest volledig tot rust komen.', 150, 175, true)
ON CONFLICT DO NOTHING;

-- Seed availability
INSERT INTO availability (weekday, start_time, end_time, active) VALUES
  (1, '09:00', '10:00', true),
  (2, '17:30', '18:30', true),
  (3, '09:00', '10:00', true),
  (0, '09:30', '12:00', true)
ON CONFLICT DO NOTHING;
