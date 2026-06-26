import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaPinterest, FaWhatsapp, FaEnvelope, FaChevronUp } from 'react-icons/fa';
import { socialLinks, navLinks, personalInfo } from '../../data/socialLinks';
import FloatingWhatsApp from '../ui/FloatingWhatsApp';
import './Footer.css';

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          {/* Brand Info */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              {personalInfo.name.toUpperCase()}
            </Link>
            <p className="footer-tagline">{personalInfo.tagline}</p>
            <div className="footer-socials">
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href={socialLinks.pinterest} target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
                <FaPinterest />
              </a>
              <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <FaWhatsapp />
              </a>
              <a href={`mailto:${socialLinks.email}`} aria-label="Email">
                <FaEnvelope />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              {navLinks.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('/#') ? (
                    <a href={link.href}>{link.label}</a>
                  ) : (
                    <Link to={link.href}>{link.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Services Quick Links */}
          <div className="footer-links">
            <h4>Services</h4>
            <ul>
              <li><Link to="/services">Poster Design</Link></li>
              <li><Link to="/services">Video Editing</Link></li>
              <li><Link to="/services">Motion Graphics</Link></li>
              <li><Link to="/services">Visual Branding</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {personalInfo.fullName}. All rights reserved.</p>
          <p className="footer-credit">Designed by Usman</p>
        </div>
      </div>

      {/* Floating Back To Top Button */}
      <button
        onClick={scrollToTop}
        className={`back-to-top ${showScrollTop ? 'visible' : ''}`}
        aria-label="Back to top"
      >
        <FaChevronUp />
      </button>

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />
    </footer>
  );
}
