import { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaImages, FaEnvelope, FaSignOutAlt, FaLock, FaUser } from 'react-icons/fa';
import { supabase } from '../../utils/supabaseClient';
import './AdminLayout.css';

export default function AdminLayout() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setAuthError('');
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (err) {
      setAuthError(err.message || 'Invalid credentials');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-spinner"></div>
        <p>Loading session...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="admin-login-container">
        <motion.div
          className="admin-login-card glass"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="admin-login-header">
            <div className="admin-lock-icon"><FaLock /></div>
            <h2>Admin Portal</h2>
            <p>Sign in to manage your portfolio</p>
          </div>
          
          <form onSubmit={handleLogin} className="admin-login-form">
            {authError && <div className="admin-auth-error">{authError}</div>}
            
            <div className="form-group">
              <label htmlFor="admin-email">Email Address</label>
              <div className="input-with-icon">
                <FaUser className="input-icon" />
                <input
                  type="email"
                  id="admin-email"
                  placeholder="admin@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="admin-password">Password</label>
              <div className="input-with-icon">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  id="admin-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-full" disabled={loginLoading}>
              {loginLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  const currentPath = location.pathname;

  return (
    <div className="admin-shell">
      {/* Sidebar Navigation */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">
          <h3>Usman<span className="logo-dot">.Admin</span></h3>
        </div>
        
        <nav className="admin-sidebar-nav">
          <Link
            to="/admin"
            className={`admin-nav-item ${currentPath === '/admin' ? 'active' : ''}`}
          >
            <FaImages /> Portfolio
          </Link>
          <Link
            to="/admin/messages"
            className={`admin-nav-item ${currentPath === '/admin/messages' ? 'active' : ''}`}
          >
            <FaEnvelope /> Messages
          </Link>
        </nav>

        <div className="admin-sidebar-footer">
          <button onClick={handleLogout} className="admin-logout-btn">
            <FaSignOutAlt /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Workspace content */}
      <main className="admin-main">
        <div className="admin-header-bar">
          <div className="admin-welcome">
            <h4>Welcome, Usman</h4>
            <p>Manage your site details and view live messages</p>
          </div>
        </div>
        
        <div className="admin-page-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
