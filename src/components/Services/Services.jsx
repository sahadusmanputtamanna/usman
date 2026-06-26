import { motion } from 'framer-motion';
import {
  FaImage, FaInstagram, FaFilm, FaMagic, FaLaptopCode, FaBriefcase, FaCheckCircle
} from 'react-icons/fa';
import { servicesData } from '../../data/servicesData';
import { socialLinks } from '../../data/socialLinks';
import { useInView } from '../../hooks/useInView';
import './Services.css';

const iconMap = {
  FaImage: <FaImage />,
  FaInstagram: <FaInstagram />,
  FaFilm: <FaFilm />,
  FaMagic: <FaMagic />,
  FaLaptopCode: <FaLaptopCode />,
  FaBriefcase: <FaBriefcase />,
};

export default function Services({ limit }) {
  const [ref, inView] = useInView();

  const displayedServices = limit ? servicesData.slice(0, limit) : servicesData;

  return (
    <section className="services section-padding" id="services">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Services</span>
          <h2 className="section-title">What I <span className="gradient-text">Offer</span></h2>
          <p className="section-subtitle">Tailored creative services designed to elevate your brand presence online</p>
        </div>

        <div className="services-grid" ref={ref}>
          {displayedServices.map((service, index) => (
            <motion.div
              key={service.id}
              className="service-card glass"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, boxShadow: `0 20px 40px ${service.glow}` }}
            >
              {/* Header block with gradient background */}
              <div className="service-card-header" style={{ background: service.gradient }}>
                <div className="service-icon">
                  {iconMap[service.icon] || <FaMagic />}
                </div>
                <h3>{service.title}</h3>
              </div>

              {/* Body block with features list */}
              <div className="service-card-body">
                <p className="service-desc">{service.description}</p>
                
                <ul className="service-features">
                  {service.features.map((feat) => (
                    <li key={feat} className="service-feat-item">
                      <FaCheckCircle className="feat-check-icon" style={{ color: service.gradient.split(',')[1] || 'var(--accent)' }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="service-card-action">
                  <a
                    href={`${socialLinks.whatsapp}?text=Hi Usman, I am interested in your ${encodeURIComponent(service.title)} service.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-alt"
                    style={{ '--hover-bg': service.gradient }}
                  >
                    Inquire Now
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
