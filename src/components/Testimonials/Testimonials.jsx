import { motion } from 'framer-motion';
import { FaStar, FaQuoteRight } from 'react-icons/fa';
import { testimonials } from '../../data/socialLinks';
import { useInView } from '../../hooks/useInView';
import './Testimonials.css';

export default function Testimonials() {
  const [ref, inView] = useInView();

  return (
    <section className="testimonials section-padding" id="testimonials">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Reviews</span>
          <h2 className="section-title">Client <span className="gradient-text">Feedback</span></h2>
          <p className="section-subtitle">Read what my business partners and clients say about my work quality</p>
        </div>

        <div className="testimonials-grid" ref={ref}>
          {testimonials.map((test, index) => (
            <motion.div
              key={test.id}
              className="testimonial-card glass"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
            >
              <div className="test-card-top">
                <div className="test-stars">
                  {Array.from({ length: test.rating }).map((_, i) => (
                    <FaStar key={i} className="star-icon" />
                  ))}
                </div>
                <div className="quote-icon-wrapper">
                  <FaQuoteRight className="quote-icon" />
                </div>
              </div>

              <div className="test-card-body">
                <p>{test.text}</p>
              </div>

              <div className="test-card-footer">
                <div className="client-avatar" style={{ background: test.gradient }}>
                  {test.initial}
                </div>
                <div className="client-info">
                  <h4>{test.name}</h4>
                  <span>{test.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
