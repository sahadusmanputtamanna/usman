import { motion } from 'framer-motion';
import ServicesComp from '../../components/Services/Services';
import SEO from '../../components/ui/SEO';
import { FaPaperPlane, FaComments, FaCheckDouble, FaCogs } from 'react-icons/fa';
import { socialLinks } from '../../data/socialLinks';
import './Services.css';

const steps = [
  { icon: <FaComments />, title: '1. Discovery & Discussion', desc: 'We chat on WhatsApp or Email about your project goals, theme requirements, references and timeline.' },
  { icon: <FaCogs />, title: '2. Concepts & Drafting', desc: 'I brainstorm concept layouts or script outlines and present the drafts for your review.' },
  { icon: <FaCheckDouble />, title: '3. Refinement & Polish', desc: 'We refine the chosen design path, edit cuts or features based on your feedback.' },
  { icon: <FaPaperPlane />, title: '4. Final Delivery', desc: 'I package the assets (high-res images, source files, final videos) and deliver them on time.' },
];

export default function Services() {
  return (
    <div className="services-page">
      <SEO
        title="Services"
        description="Professional design, video editing, and branding services offered by Usman. Explore workflow details from draft concepting to ultimate file delivery."
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
            <span className="section-tag">Offerings</span>
            <h1 className="page-title">Professional <span className="gradient-text">Services</span></h1>
            <p className="page-subtitle">Creative design and visual solutions crafted specifically for your business needs</p>
          </motion.div>
        </div>
      </section>

      {/* Main Services Grid */}
      <ServicesComp />

      {/* Workflow Section */}
      <section className="workflow section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">How I Work</span>
            <h2 className="section-title">My Creative <span className="gradient-text">Process</span></h2>
            <p className="section-subtitle">A simple step-by-step workflow designed to deliver pixel-perfect results</p>
          </div>

          <div className="workflow-grid">
            {steps.map((step, idx) => (
              <motion.div
                key={step.title}
                className="workflow-card glass"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <span className="workflow-icon-wrapper">{step.icon}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="workflow-cta">
            <h3>Have a project in mind? Let's kick start step 1!</h3>
            <a
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              Start Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
