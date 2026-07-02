/*
  # Update bookings table

  1. Changes
    - Add `booking_type` column replacing `lesson_type` usage — supports yin, vinyasa, hatha, massage_ontspanning, massage_intuitief
    - Add `message` column for optional notes
    - Make phone and email optional (allow empty string, already default '')
    - Remove required preferred_time column (no longer in form)

  2. Notes
    - Uses IF NOT EXISTS / conditional checks to be safe on re-run
    - Existing rows keep their data
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'bookings' AND column_name = 'booking_type'
  ) THEN
    ALTER TABLE bookings ADD COLUMN booking_type text NOT NULL DEFAULT 'yin';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'bookings' AND column_name = 'message'
  ) THEN
    ALTER TABLE bookings ADD COLUMN message text NOT NULL DEFAULT '';
  END IF;
END $$;
