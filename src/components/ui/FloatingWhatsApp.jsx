import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import './FloatingWhatsApp.css';

export default function FloatingWhatsApp() {
  const phone = '919061354069';
  const message = 'Hi Usman, I saw your portfolio and would like to discuss a project.';
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp-btn"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="whatsapp-icon" />
      <span className="whatsapp-tooltip">Chat with me</span>
    </motion.a>
  );
}
