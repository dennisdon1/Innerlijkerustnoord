import { useEffect, useState } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import YinYoga from './components/YinYoga';
import HathaYoga from './components/HathaYoga';
import VinyasaYoga from './components/VinyasaYoga';
import Massage from './components/Massage';
import Schedule from './components/Schedule';
import Pricing from './components/Pricing';
import BookingPage from './components/booking/BookingPage';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminLogin from './components/admin/AdminLogin';
import { AuthProvider, useAuth } from './lib/auth';

function AdminRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#EFE3D5' }}>
        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#D4A373' }} />
      </div>
    );
  }

  return user ? <AdminDashboard /> : <AdminLogin />;
}

function Router() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  if (path === '/admin' || path === '/admin/') {
    return <AdminRoute />;
  }

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <div
          className="w-full py-10 px-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
          style={{ backgroundColor: '#D4A373' }}
        >
          <span
            className="font-sans text-xs tracking-[0.4em] uppercase font-medium"
            style={{ color: 'rgba(26,31,20,0.65)' }}
          >
            Markeer de datum
          </span>
          <span
            className="font-serif leading-none"
            style={{
              color: '#1a1f14',
              fontSize: 'clamp(2.2rem, 6vw, 4rem)',
              letterSpacing: '-0.02em',
            }}
          >
            Opening <em className="font-light italic">12 juli</em>
          </span>
          <span
            className="font-sans text-xs tracking-[0.4em] uppercase font-medium"
            style={{ color: 'rgba(26,31,20,0.65)' }}
          >
            Wees welkom
          </span>
        </div>
        <About />
        <YinYoga />
        <HathaYoga />
        <VinyasaYoga />
        <Massage />
        <Schedule />
        <Pricing />
        <BookingPage />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
