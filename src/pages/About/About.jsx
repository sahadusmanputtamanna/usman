import { motion } from 'framer-motion';
import { FaPaintBrush, FaBolt, FaLaptopCode, FaMedal, FaQuoteLeft, FaGraduationCap, FaBriefcase } from 'react-icons/fa';
import AboutComp from '../../components/About/About';
import Skills from '../../components/Skills/Skills';
import SEO from '../../components/ui/SEO';
import { whyChooseMe, personalInfo } from '../../data/socialLinks';
import './About.css';

const iconMap = {
  FaPaintBrush: <FaPaintBrush />,
  FaBolt: <FaBolt />,
  FaBriefcase: <FaBriefcase />,
  FaMedal: <FaMedal />,
};

export default function About() {
  return (
    <div className="about-page">
      <SEO
        title="About Me"
        description={`Learn more about Usman. Passionate creative designer and video editor from Kerala, delivering high-quality visual graphics.`}
      />
      
      {/* Intro Header */}
      <section className="page-header header-padding">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="page-header-content"
          >
            <span className="section-tag">Who I Am</span>
            <h1 className="page-title">About <span className="gradient-text">Usman</span></h1>
            <p className="page-subtitle">A brief look into my background, creative values, and work philosophy</p>
          </motion.div>
        </div>
      </section>

      {/* Main About Component */}
      <AboutComp />

      {/* Philosophy Section */}
      <section className="philosophy section-padding">
        <div className="container">
          <div className="philosophy-grid">
            <motion.div
              className="philosophy-text-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <FaQuoteLeft className="quote-left-deco" />
              <h3>Visual Craftsmanship & Storytelling</h3>
              <p>
                My design journey started from a love for clean aesthetics and color harmonies. I believe design is not just what it looks like, but how it communicates. I apply the same pixel-perfect rigor to every branding project.
              </p>
              <p>
                Whether it is a short-form video edit to hook attention, a custom thumbnail, or a bold event poster, I focus on delivering visual clarity and professional storytelling.
              </p>
            </motion.div>

            <motion.div
              className="philosophy-timeline"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <h3>My Journey</h3>
              <div className="timeline-items">
                <div className="timeline-item">
                  <div className="timeline-icon"><FaBriefcase /></div>
                  <div className="timeline-content">
                    <h4>Freelance Creative Designer</h4>
                    <span>2023 - Present</span>
                    <p>Delivering premium graphics, branding posters, social edits, and video designs globally.</p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-icon"><FaGraduationCap /></div>
                  <div className="timeline-content">
                    <h4>Creative Studies & Practice</h4>
                    <span>2020 - 2023</span>
                    <p>Honing mastery over Adobe Creative Suite tools, branding foundations, and modern animation concepts.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Me */}
      <section className="why-choose section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Value Proposition</span>
            <h2 className="section-title">Why Choose <span className="gradient-text">Me?</span></h2>
            <p className="section-subtitle">Core principles that I bring to every single collaboration</p>
          </div>

          <div className="why-grid">
            {whyChooseMe.map((item, index) => (
              <motion.div
                key={item.num}
                className="why-card glass"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="why-card-top">
                  <span className="why-num">{item.num}</span>
                  <span className="why-icon-box">{iconMap[item.icon] || <FaMedal />}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Showcase */}
      <Skills />
    </div>
  );
}
