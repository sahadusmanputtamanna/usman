import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaMoon, FaSun, FaBars, FaTimes,
  FaHome, FaUser, FaStar, FaImages, FaTools, FaEnvelope,
  FaInstagram, FaWhatsapp, FaChevronRight,
} from 'react-icons/fa';
import { navLinks, socialLinks, personalInfo } from '../../data/socialLinks';
import { useScrollTop } from '../../hooks/useScrollTop';
import './Navbar.css';

/* Map each nav label to an icon */
const NAV_ICONS = {
  'Home':            <FaHome />,
  'About':           <FaUser />,
  'Skills':          <FaStar />,
  'My Recent Works': <FaImages />,
  'Services':        <FaTools />,
  'Contact':         <FaEnvelope />,
};

export default function Navbar({ dark, setDark }) {
  const [open, setOpen] = useState(false);
  const scrollY = useScrollTop();
  const location = useLocation();
  const scrolled = scrollY > 60;

  /* Close on route change */
  useEffect(() => { setOpen(false); }, [location]);

  /* Lock body scroll */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  /* Detect active link (pathname match OR hash anchor) */
  const isActive = (href) => {
    if (href === '/') return location.pathname === '/' && !location.hash;
    if (href.startsWith('/#')) return location.hash === href.slice(1);
    return location.pathname === href;
  };

  return (
    <>
      {/* ─── Desktop / Top Navbar ─────────────────────────────────── */}
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
                  className={`nav-link${isActive(link.href) ? ' active' : ''}`}
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
            <a
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
            >
              Hire Me
            </a>
            <button
              className="hamburger"
              onClick={() => setOpen(o => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              <FaBars />
            </button>
          </div>
        </div>
      </nav>

      {/* ─── Mobile Drawer ────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="mob-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              onClick={() => setOpen(false)}
            />

            {/* Drawer panel */}
            <motion.aside
              className="mob-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              aria-label="Mobile navigation"
            >
              {/* ── Close button ── */}
              <button
                className="mob-close"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <FaTimes />
              </button>

              {/* ── Profile header ── */}
              <div className="mob-profile">
                <div className="mob-profile-logo">
                  <span className="mob-logo-text">Usman</span>
                  <span className="mob-logo-dot">.</span>
                </div>
                <p className="mob-profile-sub">{personalInfo.title.split('•')[0].trim()}</p>
              </div>

              {/* ── Divider ── */}
              <div className="mob-divider" />

              {/* ── Navigation links ── */}
              <nav className="mob-nav">
                {navLinks.map((link, i) => {
                  const active = isActive(link.href);
                  const isHash = link.href.startsWith('/#');
                  return (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: 32 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.055, duration: 0.28 }}
                    >
                      {isHash ? (
                        <a
                          href={link.href}
                          className={`mob-nav-item${active ? ' mob-active' : ''}`}
                          onClick={() => setOpen(false)}
                        >
                          <span className="mob-nav-icon">{NAV_ICONS[link.label]}</span>
                          <span className="mob-nav-label">{link.label}</span>
                          <FaChevronRight className="mob-nav-arrow" />
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          className={`mob-nav-item${active ? ' mob-active' : ''}`}
                          onClick={() => setOpen(false)}
                        >
                          <span className="mob-nav-icon">{NAV_ICONS[link.label]}</span>
                          <span className="mob-nav-label">{link.label}</span>
                          <FaChevronRight className="mob-nav-arrow" />
                        </Link>
                      )}
                    </motion.div>
                  );
                })}
              </nav>

              {/* ── CTA button ── */}
              <a
                href={socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary mob-cta"
                onClick={() => setOpen(false)}
              >
                Hire Me
              </a>

              {/* ── Footer ── */}
              <div className="mob-footer">
                <div className="mob-socials">
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="mob-social-btn"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href={socialLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="mob-social-btn"
                  >
                    <FaWhatsapp />
                  </a>
                  <a
                    href={`mailto:${socialLinks.email}`}
                    aria-label="Email"
                    className="mob-social-btn"
                  >
                    <FaEnvelope />
                  </a>
                </div>
                <p className="mob-copyright">© {new Date().getFullYear()} Usman</p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
