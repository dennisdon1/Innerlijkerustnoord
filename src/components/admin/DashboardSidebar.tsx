import { Leaf, Calendar, LayoutGrid, Settings, Users, LogOut, X, BarChart2, Clock } from 'lucide-react';
import { useAuth } from '../../lib/auth';

type AdminView = 'overview' | 'appointments' | 'services' | 'availability' | 'clients';

interface Props {
  view: AdminView;
  onViewChange: (v: AdminView) => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const navItems: { id: AdminView; label: string; icon: React.ElementType }[] = [
  { id: 'overview', label: 'Overzicht', icon: BarChart2 },
  { id: 'appointments', label: 'Afspraken', icon: Calendar },
  { id: 'clients', label: 'Klanten', icon: Users },
  { id: 'services', label: 'Diensten', icon: LayoutGrid },
  { id: 'availability', label: 'Beschikbaarheid', icon: Clock },
  { id: 'clients', label: 'Instellingen', icon: Settings },
];

export default function DashboardSidebar({ view, onViewChange, mobileOpen, onMobileClose }: Props) {
  const { signOut } = useAuth();

  const content = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b" style={{ borderColor: 'rgba(212,163,115,0.2)' }}>
        <div
          className="w-8 h-8 flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: '#D4A373' }}
        >
          <Leaf size={16} style={{ color: '#F5EBE0' }} />
        </div>
        <div>
          <p className="font-serif text-sm leading-tight" style={{ color: '#F5EBE0' }}>
            Innerlijke Rust
          </p>
          <p className="text-xs font-sans" style={{ color: 'rgba(212,163,115,0.8)' }}>
            Dashboard
          </p>
        </div>
        {/* Mobile close */}
        <button
          type="button"
          onClick={onMobileClose}
          className="ml-auto lg:hidden"
          style={{ color: 'rgba(245,235,224,0.6)' }}
        >
          <X size={18} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-6 overflow-y-auto">
        <p className="text-xs tracking-widest uppercase px-3 mb-3" style={{ color: 'rgba(212,163,115,0.6)' }}>
          Beheer
        </p>
        <div className="grid gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = view === item.id;
            return (
              <button
                key={item.id + item.label}
                type="button"
                onClick={() => { onViewChange(item.id); onMobileClose(); }}
                className="flex items-center gap-3 px-3 py-2.5 w-full text-left transition-all duration-150 text-sm font-sans"
                style={{
                  backgroundColor: active ? 'rgba(212,163,115,0.15)' : 'transparent',
                  color: active ? '#D4A373' : 'rgba(245,235,224,0.7)',
                  borderLeft: active ? '2px solid #D4A373' : '2px solid transparent',
                }}
              >
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Sign out */}
      <div className="px-3 py-4 border-t" style={{ borderColor: 'rgba(212,163,115,0.2)' }}>
        <button
          type="button"
          onClick={signOut}
          className="flex items-center gap-3 px-3 py-2.5 w-full text-left text-sm font-sans transition-colors"
          style={{ color: 'rgba(245,235,224,0.5)' }}
        >
          <LogOut size={16} />
          Uitloggen
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex flex-col w-60 flex-shrink-0 h-screen sticky top-0"
        style={{ backgroundColor: '#4e5243' }}
      >
        {content}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/40"
            onClick={onMobileClose}
          />
          <aside
            className="relative flex flex-col w-64 h-full z-10"
            style={{ backgroundColor: '#4e5243' }}
          >
            {content}
          </aside>
        </div>
      )}
    </>
  );
}
