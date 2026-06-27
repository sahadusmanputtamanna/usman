import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LoadingScreen from './components/ui/LoadingScreen';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Services from './pages/Services/Services';
import Contact from './pages/Contact/Contact';
import AdminLayout from './components/Admin/AdminLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminMessages from './pages/Admin/AdminMessages';
import { useDarkMode } from './hooks/useDarkMode';
import { supabase } from './utils/supabaseClient';

// Helper component to handle scrolling to hash or top on path change
function ScrollToAnchor() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function AppContent() {
  const [dark, setDark] = useDarkMode();
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  useEffect(() => {
    if (!isAdminPath) {
      const visitorKey = 'portfolio_visited';
      const lastVisit = localStorage.getItem(visitorKey);
      const now = Date.now();
      const oneDay = 24 * 60 * 60 * 1000; // 24 hours in ms

      if (!lastVisit || now - parseInt(lastVisit, 10) > oneDay) {
        supabase
          .from('visitor_stats')
          .insert([{}])
          .then(({ error }) => {
            if (!error) {
              localStorage.setItem(visitorKey, now.toString());
            } else {
              console.warn('[Analytics] Failed to log visit:', error.message);
            }
          })
          .catch((err) => {
            console.warn('[Analytics] Error logging visit:', err);
          });
      }
    }
  }, [isAdminPath]);

  return (
    <>
      <LoadingScreen />
      {!isAdminPath && <Navbar dark={dark} setDark={setDark} />}
      <main style={isAdminPath ? {} : { minHeight: 'calc(100vh - var(--nav-h) - 300px)' }}>
        <Routes>
          {/* Public Website */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Panel */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="messages" element={<AdminMessages />} />
          </Route>
        </Routes>
      </main>
      {!isAdminPath && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToAnchor />
      <AppContent />
    </Router>
  );
}
