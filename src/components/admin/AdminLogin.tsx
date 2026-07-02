import { useState } from 'react';
import { Leaf, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../lib/auth';

export default function AdminLogin() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const err = await signIn(email, password);
    setLoading(false);
    if (err) setError('Ongeldige inloggegevens. Probeer het opnieuw.');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: '#EFE3D5' }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div
            className="w-12 h-12 flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: '#D4A373' }}
          >
            <Leaf size={22} style={{ color: '#F5EBE0' }} />
          </div>
          <h1 className="font-serif text-3xl mb-1" style={{ color: '#6B705C' }}>
            Innerlijke Rust Noord
          </h1>
          <p className="text-sm font-light" style={{ color: '#A98467' }}>
            Beheer dashboard
          </p>
        </div>

        <div
          className="p-8"
          style={{ backgroundColor: '#F5EBE0', border: '1px solid #c4a487' }}
        >
          <form onSubmit={handleSubmit} className="grid gap-5">
            <div>
              <label className="block text-xs tracking-widest uppercase font-sans mb-2" style={{ color: '#A98467' }}>
                E-mailadres
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="admin@innerlijkerustnoord.nl"
              />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase font-sans mb-2" style={{ color: '#A98467' }}>
                Wachtwoord
              </label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: '#A98467' }}
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm font-light" style={{ color: '#c0392b' }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full text-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Inloggen...' : 'Inloggen'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
