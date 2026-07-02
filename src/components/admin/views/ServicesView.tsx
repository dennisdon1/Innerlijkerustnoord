import { useState } from 'react';
import { Plus, Pencil, Trash2, Check, X } from 'lucide-react';
import type { Service } from '../../../lib/types';
import { formatPrice } from '../../../lib/bookingUtils';

interface Props {
  services: Service[];
  onSave: (service: Partial<Service> & { id?: string }) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onToggleActive: (id: string, active: boolean) => Promise<void>;
}

const emptyService = { title: '', description: '', duration: 60, price: 0, active: true };

export default function ServicesView({ services, onSave, onDelete, onToggleActive }: Props) {
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(emptyService);
  const [saving, setSaving] = useState(false);

  const startEdit = (s: Service) => {
    setEditing(s.id);
    setAdding(false);
    setForm({ title: s.title, description: s.description, duration: s.duration, price: s.price, active: s.active });
  };

  const startAdd = () => {
    setAdding(true);
    setEditing(null);
    setForm(emptyService);
  };

  const cancel = () => { setEditing(null); setAdding(false); };

  const handleSave = async () => {
    setSaving(true);
    await onSave(editing ? { ...form, id: editing } : form);
    setSaving(false);
    cancel();
  };

  const FormRow = () => (
    <div
      className="p-5 grid gap-4"
      style={{ backgroundColor: '#EFE3D5', border: '1.5px solid #D4A373' }}
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs tracking-widest uppercase font-sans mb-1.5" style={{ color: '#A98467' }}>Titel *</label>
          <input
            type="text"
            required
            className="input-field"
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs tracking-widest uppercase font-sans mb-1.5" style={{ color: '#A98467' }}>Prijs (€)</label>
            <input
              type="number"
              min={0}
              step={0.01}
              className="input-field"
              value={form.price}
              onChange={(e) => setForm((p) => ({ ...p, price: parseFloat(e.target.value) || 0 }))}
            />
          </div>
          <div>
            <label className="block text-xs tracking-widest uppercase font-sans mb-1.5" style={{ color: '#A98467' }}>Duur (min)</label>
            <input
              type="number"
              min={15}
              step={15}
              className="input-field"
              value={form.duration}
              onChange={(e) => setForm((p) => ({ ...p, duration: parseInt(e.target.value) || 60 }))}
            />
          </div>
        </div>
      </div>
      <div>
        <label className="block text-xs tracking-widest uppercase font-sans mb-1.5" style={{ color: '#A98467' }}>Beschrijving</label>
        <textarea
          rows={2}
          className="input-field resize-none"
          value={form.description}
          onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
        />
      </div>
      <div className="flex items-center justify-end gap-3">
        <button type="button" onClick={cancel} className="btn-outline text-xs py-2 px-5">
          Annuleren
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={!form.title || saving}
          className="btn-primary text-xs py-2 px-5 disabled:opacity-50"
        >
          {saving ? 'Opslaan...' : 'Opslaan'}
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex justify-end mb-5">
        <button type="button" onClick={startAdd} className="btn-primary text-xs flex items-center gap-2">
          <Plus size={14} /> Dienst toevoegen
        </button>
      </div>

      {adding && <div className="mb-4"><FormRow /></div>}

      <div className="grid gap-3">
        {services.map((s) => (
          <div key={s.id}>
            {editing === s.id ? (
              <FormRow />
            ) : (
              <div
                className="p-5 flex items-start gap-4 transition-all"
                style={{ backgroundColor: '#F5EBE0', border: '1px solid #c4a487', opacity: s.active ? 1 : 0.5 }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <h4 className="font-sans font-medium text-sm" style={{ color: '#6B705C' }}>{s.title}</h4>
                    <span className="font-serif text-lg" style={{ color: '#D4A373' }}>{formatPrice(s.price)}</span>
                    <span className="text-xs font-sans" style={{ color: '#A98467' }}>{s.duration} min</span>
                  </div>
                  <p className="text-xs font-light leading-relaxed" style={{ color: '#A98467' }}>{s.description}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    title={s.active ? 'Deactiveren' : 'Activeren'}
                    onClick={() => onToggleActive(s.id, !s.active)}
                    className="w-8 h-8 flex items-center justify-center transition-colors"
                    style={{ color: s.active ? '#065F46' : '#A98467' }}
                  >
                    <Check size={15} />
                  </button>
                  <button
                    title="Bewerken"
                    onClick={() => startEdit(s)}
                    className="w-8 h-8 flex items-center justify-center"
                    style={{ color: '#A98467' }}
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    title="Verwijderen"
                    onClick={() => onDelete(s.id)}
                    className="w-8 h-8 flex items-center justify-center"
                    style={{ color: '#c4a487' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
