/*
  # Innerlijke Rust Noord - Initial Schema

  1. New Tables
    - `bookings`
      - `id` (uuid, primary key)
      - `name` (text) - Full name of the person booking
      - `phone` (text) - Phone number
      - `email` (text) - Email address
      - `lesson_type` (text) - 'yin' or 'vinyasa'
      - `preferred_date` (date) - Requested date
      - `preferred_time` (text) - Requested time
      - `created_at` (timestamptz)

    - `contact_messages`
      - `id` (uuid, primary key)
      - `name` (text) - Sender name
      - `email` (text) - Sender email
      - `message` (text) - Message body
      - `created_at` (timestamptz)

  2. Security
    - RLS enabled on both tables
    - Anyone (anon) can INSERT bookings and contact messages (public form submissions)
    - No public SELECT — only authenticated service role reads these
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  lesson_type text NOT NULL DEFAULT 'yin',
  preferred_date date NOT NULL,
  preferred_time text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a booking"
  ON bookings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  message text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a contact message"
  ON contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
