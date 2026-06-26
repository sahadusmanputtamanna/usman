import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaLightbulb, FaEye, FaHandshake, FaRocket, FaArrowRight,
} from 'react-icons/fa';
import { personalInfo, socialLinks } from '../../data/socialLinks';
import profileImg from '../../assets/images/profile.jpg';
import { useInView } from '../../hooks/useInView';
import './About.css';

const cards = [
  { icon: <FaLightbulb />, title: 'Creative Mindset',     text: 'Fresh ideas and innovative thinking in every project.' },
  { icon: <FaEye />,       title: 'Attention to Detail',  text: 'Pixel-perfect designs with meticulous precision.' },
  { icon: <FaHandshake />, title: 'Client-Focused',       text: 'Your vision is my priority – I deliver beyond expectations.' },
  { icon: <FaRocket />,    title: 'Fast Delivery',        text: 'Quality work delivered within agreed timelines, always.' },
];

const tools = [
  { label: 'Photoshop',    src: 'https://img.icons8.com/color/28/adobe-photoshop--v1.png' },
  { label: 'Illustrator',  src: 'https://img.icons8.com/color/28/adobe-illustrator--v1.png' },
  { label: 'After Effects',src: 'https://img.icons8.com/color/28/adobe-after-effects--v1.png' },
  { label: 'Premiere Pro', src: 'https://img.icons8.com/color/28/adobe-premiere-pro--v1.png' },
];

export default function About() {
  const [imgRef, imgInView] = useInView();
  const [textRef, textInView] = useInView();

  return (
    <section className="about section-padding" id="about">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">About Me</span>
          <h2 className="section-title">Passion Meets <span className="gradient-text">Creativity</span></h2>
          <p className="section-subtitle">A creative professional who turns ideas into visual masterpieces</p>
        </div>

        <div className="about-grid">
          {/* Image */}
          <motion.div
            ref={imgRef}
            className="about-img-col"
            initial={{ opacity: 0, x: -50 }}
            animate={imgInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="about-img-wrapper">
              <img src={profileImg} alt="Usman – About" className="about-img" />
              <div className="about-img-deco" />
              <div className="about-exp-badge glass">
                <span className="exp-num">{personalInfo.experience}</span>
                <span className="exp-label">Years of Experience</span>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            ref={textRef}
            className="about-content"
            initial={{ opacity: 0, x: 50 }}
            animate={textInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <h3>I am <span className="gradient-text">Usman</span></h3>
            <p className="about-intro">{personalInfo.about}</p>

            <div className="about-cards">
              {cards.map((c, i) => (
                <motion.div
                  key={c.title} className="about-card glass"
                  initial={{ opacity: 0, y: 20 }}
                  animate={textInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="about-card-icon">{c.icon}</div>
                  <div>
                    <h4>{c.title}</h4>
                    <p>{c.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="about-tools">
              {tools.map(t => (
                <span key={t.label} className="tool-chip">
                  <img src={t.src} alt={t.label} /> {t.label}
                </span>
              ))}
            </div>

            <div className="about-actions">
              <Link to="/contact" className="btn btn-primary">
                Let's Collaborate <FaArrowRight />
              </Link>
              <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
