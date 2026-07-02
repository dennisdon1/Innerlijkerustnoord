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
