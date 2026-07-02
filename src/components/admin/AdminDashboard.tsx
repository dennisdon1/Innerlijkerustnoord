import { useState, useEffect, useCallback } from 'react';
import { Menu } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Appointment, Service, Availability, BlockedDate } from '../../lib/types';
import DashboardSidebar from './DashboardSidebar';
import OverviewView from './views/OverviewView';
import AppointmentsView from './views/AppointmentsView';
import ServicesView from './views/ServicesView';
import AvailabilityView from './views/AvailabilityView';
import ClientsView from './views/ClientsView';

type AdminView = 'overview' | 'appointments' | 'services' | 'availability' | 'clients';

const VIEW_TITLES: Record<AdminView, string> = {
  overview: 'Overzicht',
  appointments: 'Afspraken',
  services: 'Diensten',
  availability: 'Beschikbaarheid',
  clients: 'Klanten',
};

export default function AdminDashboard() {
  const [view, setView] = useState<AdminView>('overview');
  const [mobileOpen, setMobileOpen] = useState(false);

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAll = useCallback(async () => {
    const [apptRes, svcRes, availRes, blockRes] = await Promise.all([
      supabase.from('appointments').select('*, service:services(*)').order('appointment_date', { ascending: false }),
      supabase.from('services').select('*').order('price'),
      supabase.from('availability').select('*'),
      supabase.from('blocked_dates').select('*'),
    ]);
    setAppointments((apptRes.data as Appointment[]) ?? []);
    setServices(svcRes.data ?? []);
    setAvailability(availRes.data ?? []);
    setBlockedDates(blockRes.data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { loadAll(); }, [loadAll]);

  // Appointment actions
  const handleStatusChange = async (id: string, status: Appointment['status']) => {
    await supabase.from('appointments').update({ status }).eq('id', id);
    setAppointments((prev) => prev.map((a) => a.id === id ? { ...a, status } : a));
  };

  const handleDeleteAppointment = async (id: string) => {
    if (!confirm('Afspraak definitief verwijderen?')) return;
    await supabase.from('appointments').delete().eq('id', id);
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  // Service actions
  const handleSaveService = async (data: Partial<Service> & { id?: string }) => {
    if (data.id) {
      const { data: updated } = await supabase.from('services').update(data).eq('id', data.id).select().maybeSingle();
      if (updated) setServices((prev) => prev.map((s) => s.id === data.id ? updated : s));
    } else {
      const { data: created } = await supabase.from('services').insert([data]).select().maybeSingle();
      if (created) setServices((prev) => [...prev, created]);
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm('Dienst verwijderen?')) return;
    await supabase.from('services').delete().eq('id', id);
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const handleToggleService = async (id: string, active: boolean) => {
    await supabase.from('services').update({ active }).eq('id', id);
    setServices((prev) => prev.map((s) => s.id === id ? { ...s, active } : s));
  };

  // Availability actions
  const handleSaveAvailability = async (data: Partial<Availability> & { id?: string }) => {
    if (data.id) {
      await supabase.from('availability').update(data).eq('id', data.id);
      setAvailability((prev) => prev.map((a) => a.id === data.id ? { ...a, ...data } as Availability : a));
    } else {
      const { data: created } = await supabase.from('availability').insert([{ ...data, active: true }]).select().maybeSingle();
      if (created) setAvailability((prev) => [...prev, created]);
    }
  };

  const handleDeleteAvailability = async (id: string) => {
    await supabase.from('availability').delete().eq('id', id);
    setAvailability((prev) => prev.filter((a) => a.id !== id));
  };

  const handleToggleAvailability = async (id: string, active: boolean) => {
    await supabase.from('availability').update({ active }).eq('id', id);
    setAvailability((prev) => prev.map((a) => a.id === id ? { ...a, active } : a));
  };

  // Blocked dates actions
  const handleAddBlockedDate = async (date: string, reason: string) => {
    const { data: created } = await supabase.from('blocked_dates').insert([{ blocked_date: date, reason }]).select().maybeSingle();
    if (created) setBlockedDates((prev) => [...prev, created]);
  };

  const handleDeleteBlockedDate = async (id: string) => {
    await supabase.from('blocked_dates').delete().eq('id', id);
    setBlockedDates((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#EFE3D5' }}>
      <DashboardSidebar
        view={view}
        onViewChange={setView}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <main className="flex-1 min-w-0">
        {/* Top bar */}
        <div
          className="sticky top-0 z-10 flex items-center gap-4 px-6 py-4 border-b"
          style={{ backgroundColor: '#F5EBE0', borderColor: '#c4a487' }}
        >
          <button
            type="button"
            className="lg:hidden"
            onClick={() => setMobileOpen(true)}
            style={{ color: '#6B705C' }}
          >
            <Menu size={20} />
          </button>
          <h1 className="font-serif text-2xl" style={{ color: '#6B705C' }}>
            {VIEW_TITLES[view]}
          </h1>
          <div className="ml-auto flex items-center gap-2">
            <a
              href="/"
              className="text-xs font-sans tracking-widest uppercase transition-colors"
              style={{ color: '#A98467' }}
            >
              Naar website →
            </a>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-w-5xl">
          {loading ? (
            <div className="grid gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-20 animate-pulse" style={{ backgroundColor: '#F5EBE0' }} />
              ))}
            </div>
          ) : (
            <>
              {view === 'overview' && (
                <OverviewView
                  appointments={appointments}
                  services={services}
                  onViewAppointments={() => setView('appointments')}
                />
              )}
              {view === 'appointments' && (
                <AppointmentsView
                  appointments={appointments}
                  onStatusChange={handleStatusChange}
                  onDelete={handleDeleteAppointment}
                />
              )}
              {view === 'clients' && (
                <ClientsView appointments={appointments} />
              )}
              {view === 'services' && (
                <ServicesView
                  services={services}
                  onSave={handleSaveService}
                  onDelete={handleDeleteService}
                  onToggleActive={handleToggleService}
                />
              )}
              {view === 'availability' && (
                <AvailabilityView
                  availability={availability}
                  blockedDates={blockedDates}
                  onSaveAvailability={handleSaveAvailability}
                  onDeleteAvailability={handleDeleteAvailability}
                  onToggleAvailability={handleToggleAvailability}
                  onAddBlockedDate={handleAddBlockedDate}
                  onDeleteBlockedDate={handleDeleteBlockedDate}
                />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
