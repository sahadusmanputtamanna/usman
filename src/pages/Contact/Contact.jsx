import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ContactComp from '../../components/Contact/Contact';
import SEO from '../../components/ui/SEO';
import { FaPlus, FaMinus } from 'react-icons/fa';
import './Contact.css';

const faqs = [
  { q: 'What is your turnaround time for a poster design?', a: 'Standard turnaround time is 2-4 business days depending on design complexity.' },
  { q: 'Which tools do you use for video editing and motion graphics?', a: 'I primarily use Adobe Premiere Pro for editing and Adobe After Effects for motion graphics.' },
  { q: 'Do you offer custom branding and thumbnail design?', a: 'Yes! I design custom logos, visual brand identities, and high-CTR YouTube thumbnails to help your brand grow and stand out online.' },
  { q: 'How do we handle payments?', a: 'Payments are handled securely via local bank transfer or UPI (GPay/PhonePe). For larger projects, a deposit is required before starting.' },
];

function FAQItem({ q, a }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item glass">
      <button className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        <span>{q}</span>
        {isOpen ? <FaMinus className="faq-icon" /> : <FaPlus className="faq-icon" />}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="faq-answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  return (
    <div className="contact-page">
      <SEO
        title="Contact"
        description="Get in touch with Usman for your next graphic design, poster, video edit, branding, or thumbnail design project. Find answers to common design FAQs."
      />

      {/* Header */}
      <section className="page-header header-padding">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="page-header-content"
          >
            <span className="section-tag">Let's Connect</span>
            <h1 className="page-title">Contact <span className="gradient-text">Me</span></h1>
            <p className="page-subtitle">Let's discuss details or build creative designs and visual assets</p>
          </motion.div>
        </div>
      </section>

      {/* Main Contact Forms & Cards */}
      <ContactComp />

      {/* FAQs Section */}
      <section className="faqs section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Help Center</span>
            <h2 className="section-title">Frequently Asked <span className="gradient-text">Questions</span></h2>
            <p className="section-subtitle">Got questions? Find immediate answers about timelines, tools and payments</p>
          </div>

          <div className="faq-list">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
