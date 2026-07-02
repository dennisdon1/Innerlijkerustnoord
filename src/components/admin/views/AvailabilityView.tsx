import { useState } from 'react';
import { Plus, Trash2, Check } from 'lucide-react';
import type { Availability, BlockedDate } from '../../../lib/types';
import { WEEKDAY_NAMES } from '../../../lib/types';

interface Props {
  availability: Availability[];
  blockedDates: BlockedDate[];
  onSaveAvailability: (data: Partial<Availability> & { id?: string }) => Promise<void>;
  onDeleteAvailability: (id: string) => Promise<void>;
  onToggleAvailability: (id: string, active: boolean) => Promise<void>;
  onAddBlockedDate: (date: string, reason: string) => Promise<void>;
  onDeleteBlockedDate: (id: string) => Promise<void>;
}

export default function AvailabilityView({
  availability,
  blockedDates,
  onSaveAvailability,
  onDeleteAvailability,
  onToggleAvailability,
  onAddBlockedDate,
  onDeleteBlockedDate,
}: Props) {
  const [addingAvail, setAddingAvail] = useState(false);
  const [availForm, setAvailForm] = useState({ weekday: 1, start_time: '09:00', end_time: '10:00' });
  const [saving, setSaving] = useState(false);

  const [blockDate, setBlockDate] = useState('');
  const [blockReason, setBlockReason] = useState('');
  const [blockSaving, setBlockSaving] = useState(false);

  const handleSaveAvail = async () => {
    setSaving(true);
    await onSaveAvailability(availForm);
    setSaving(false);
    setAddingAvail(false);
    setAvailForm({ weekday: 1, start_time: '09:00', end_time: '10:00' });
  };

  const handleAddBlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blockDate) return;
    setBlockSaving(true);
    await onAddBlockedDate(blockDate, blockReason);
    setBlockSaving(false);
    setBlockDate('');
    setBlockReason('');
  };

  const sorted = [...availability].sort((a, b) => a.weekday - b.weekday || a.start_time.localeCompare(b.start_time));

  return (
    <div className="grid gap-10">
      {/* Weekly availability */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-sans font-medium text-sm" style={{ color: '#6B705C' }}>Wekelijkse beschikbaarheid</h3>
          <button type="button" onClick={() => setAddingAvail(!addingAvail)} className="btn-primary text-xs flex items-center gap-2 py-2">
            <Plus size={14} /> Toevoegen
          </button>
        </div>

        {addingAvail && (
          <div
            className="p-5 mb-4 grid sm:grid-cols-3 gap-4 items-end"
            style={{ backgroundColor: '#EFE3D5', border: '1.5px solid #D4A373' }}
          >
            <div>
              <label className="block text-xs tracking-widest uppercase font-sans mb-1.5" style={{ color: '#A98467' }}>Dag</label>
              <select
                className="input-field appearance-none"
                value={availForm.weekday}
                onChange={(e) => setAvailForm((p) => ({ ...p, weekday: parseInt(e.target.value) }))}
              >
                {WEEKDAY_NAMES.map((name, i) => (
                  <option key={i} value={i}>{name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase font-sans mb-1.5" style={{ color: '#A98467' }}>Starttijd</label>
              <input type="time" className="input-field" value={availForm.start_time}
                onChange={(e) => setAvailForm((p) => ({ ...p, start_time: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase font-sans mb-1.5" style={{ color: '#A98467' }}>Eindtijd</label>
              <input type="time" className="input-field" value={availForm.end_time}
                onChange={(e) => setAvailForm((p) => ({ ...p, end_time: e.target.value }))} />
            </div>
            <div className="sm:col-span-3 flex justify-end gap-3">
              <button type="button" onClick={() => setAddingAvail(false)} className="btn-outline text-xs py-2 px-5">Annuleren</button>
              <button type="button" onClick={handleSaveAvail} disabled={saving} className="btn-primary text-xs py-2 px-5 disabled:opacity-50">
                {saving ? 'Opslaan...' : 'Opslaan'}
              </button>
            </div>
          </div>
        )}

        <div className="grid gap-2">
          {sorted.map((a) => (
            <div
              key={a.id}
              className="flex items-center justify-between px-5 py-3"
              style={{ backgroundColor: '#F5EBE0', border: '1px solid #c4a487', opacity: a.active ? 1 : 0.5 }}
            >
              <div className="flex items-center gap-4">
                <span className="font-sans font-medium text-sm w-24" style={{ color: '#6B705C' }}>
                  {WEEKDAY_NAMES[a.weekday]}
                </span>
                <span className="font-serif text-lg" style={{ color: '#D4A373' }}>
                  {a.start_time.slice(0, 5)} – {a.end_time.slice(0, 5)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onToggleAvailability(a.id, !a.active)}
                  className="w-8 h-8 flex items-center justify-center"
                  style={{ color: a.active ? '#065F46' : '#A98467' }}
                >
                  <Check size={14} />
                </button>
                <button
                  onClick={() => onDeleteAvailability(a.id)}
                  className="w-8 h-8 flex items-center justify-center"
                  style={{ color: '#c4a487' }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blocked dates */}
      <div>
        <h3 className="font-sans font-medium text-sm mb-5" style={{ color: '#6B705C' }}>Geblokkeerde datums</h3>
        <form onSubmit={handleAddBlock} className="grid sm:grid-cols-3 gap-4 items-end mb-4">
          <div>
            <label className="block text-xs tracking-widest uppercase font-sans mb-1.5" style={{ color: '#A98467' }}>Datum *</label>
            <input type="date" required className="input-field" value={blockDate}
              min={new Date().toISOString().slice(0, 10)}
              onChange={(e) => setBlockDate(e.target.value)} />
          </div>
          <div>
            <label className="block text-xs tracking-widest uppercase font-sans mb-1.5" style={{ color: '#A98467' }}>Reden</label>
            <input type="text" className="input-field" value={blockReason} placeholder="Vakantie, ziekte..."
              onChange={(e) => setBlockReason(e.target.value)} />
          </div>
          <button type="submit" disabled={!blockDate || blockSaving} className="btn-primary text-xs py-3 disabled:opacity-50">
            {blockSaving ? 'Toevoegen...' : 'Datum blokkeren'}
          </button>
        </form>

        {blockedDates.length === 0 ? (
          <p className="text-sm font-light py-6 text-center" style={{ color: '#A98467', backgroundColor: '#EFE3D5', border: '1px solid #c4a487' }}>
            Geen geblokkeerde datums.
          </p>
        ) : (
          <div className="grid gap-2">
            {[...blockedDates]
              .sort((a, b) => a.blocked_date.localeCompare(b.blocked_date))
              .map((bd) => (
                <div
                  key={bd.id}
                  className="flex items-center justify-between px-5 py-3"
                  style={{ backgroundColor: '#F5EBE0', border: '1px solid #c4a487' }}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-serif text-lg" style={{ color: '#D4A373' }}>
                      {new Date(bd.blocked_date + 'T00:00:00').toLocaleDateString('nl-NL', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                    {bd.reason && (
                      <span className="text-xs font-light" style={{ color: '#A98467' }}>{bd.reason}</span>
                    )}
                  </div>
                  <button
                    onClick={() => onDeleteBlockedDate(bd.id)}
                    className="w-8 h-8 flex items-center justify-center"
                    style={{ color: '#c4a487' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
