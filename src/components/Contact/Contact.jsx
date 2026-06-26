import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import { socialLinks, personalInfo } from '../../data/socialLinks';
import { isValidEmail } from '../../utils/helpers';
import { supabase } from '../../utils/supabaseClient';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }
    if (!isValidEmail(formData.email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    
    try {
      // Save visitor message to Supabase database
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name.trim(),
            email: formData.email.trim(),
            subject: formData.subject.trim() || 'General Inquiry',
            message: formData.message.trim(),
            is_read: false
          }
        ]);

      if (error) throw error;

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage('Failed to send message. Please try again or reach out directly on WhatsApp.');
    }
  };

  const prefilledMessage = "Hi Usman,\nI visited your portfolio website and would like to discuss a project.";
  const directWhatsAppUrl = `https://wa.me/919061354069?text=${encodeURIComponent(prefilledMessage)}`;

  return (
    <section className="contact section-padding" id="contact">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Get In Touch</span>
          <h2 className="section-title">Let's Work <span className="gradient-text">Together</span></h2>
          <p className="section-subtitle">Have a project or design in mind? Drop a message or contact me directly</p>
        </div>

        <div className="contact-grid">
          {/* Contact Details (Left Column) */}
          <motion.div
            className="contact-info-col"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3>Connect with me</h3>
            <p className="contact-info-desc">
              I am open to freelance design projects, video editing, motion graphics, branding, and thumbnail design work. Let's build something awesome together!
            </p>

            <div className="contact-cards">
              {/* WhatsApp Card */}
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card glass"
              >
                <div className="contact-card-icon whatsapp">
                  <FaWhatsapp />
                </div>
                <div className="contact-card-text">
                  <h4>WhatsApp</h4>
                  <p>{personalInfo.phone}</p>
                  <span>Chat now</span>
                </div>
              </a>

              {/* Email Card */}
              <a
                href={`mailto:${personalInfo.email}`}
                className="contact-card glass"
              >
                <div className="contact-card-icon email">
                  <FaEnvelope />
                </div>
                <div className="contact-card-text">
                  <h4>Email</h4>
                  <p>{personalInfo.email}</p>
                  <span>Send an email</span>
                </div>
              </a>

              {/* Location Card */}
              <div className="contact-card glass">
                <div className="contact-card-icon location">
                  <FaMapMarkerAlt />
                </div>
                <div className="contact-card-text">
                  <h4>Location</h4>
                  <p>{personalInfo.location}</p>
                  <span>Remote availability</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form (Right Column) */}
          <motion.div
            className="contact-form-col glass"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3>Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Your Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Your Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. john@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Project Inquiry"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Explain your project scope, timeline, etc."
                  rows="5"
                  required
                />
              </div>

              <AnimatePresence mode="wait">
                {status === 'success' && (
                  <motion.div
                    className="form-alert success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <FaCheckCircle /> Message sent successfully! It has been saved.
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    className="form-alert error"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {errorMessage}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                className="btn btn-primary btn-submit"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <>
                    <FaSpinner className="spin" /> Sending...
                  </>
                ) : (
                  <>
                    Send Message <FaPaperPlane />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
