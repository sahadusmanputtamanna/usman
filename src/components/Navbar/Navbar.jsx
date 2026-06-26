import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';
import { navLinks, socialLinks } from '../../data/socialLinks';
import { useScrollTop } from '../../hooks/useScrollTop';
import './Navbar.css';

export default function Navbar({ dark, setDark }) {
  const [open, setOpen] = useState(false);
  const scrollY = useScrollTop();
  const location = useLocation();
  const scrolled = scrollY > 60;

  useEffect(() => { setOpen(false); }, [location]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <span className="logo-text">Usman</span>
            <span className="logo-dot">.</span>
          </Link>

          <ul className="nav-links">
            {navLinks.map(link => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className={`nav-link${location.pathname === link.href ? ' active' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <button
              className="dark-toggle"
              onClick={() => setDark(d => !d)}
              aria-label="Toggle dark mode"
            >
              {dark ? <FaSun /> : <FaMoon />}
            </button>
            <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
              Hire Me
            </a>
            <button className="hamburger" onClick={() => setOpen(o => !o)} aria-label="Menu">
              {open ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="mobile-overlay"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="mobile-menu"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.32 }}
            >
              <button className="mobile-close" onClick={() => setOpen(false)} aria-label="Close">
                <FaTimes />
              </button>
              <ul className="mobile-nav-links">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link to={link.href} className="mobile-link">{link.label}</Link>
                  </motion.li>
                ))}
              </ul>
              <a
                href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer"
                className="btn btn-primary mobile-hire"
              >
                Hire Me
              </a>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
