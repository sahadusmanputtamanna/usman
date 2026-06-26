import { motion } from 'framer-motion';
import { FaPinterest, FaExternalLinkAlt } from 'react-icons/fa';
import { socialLinks } from '../../data/socialLinks';
import { useInView } from '../../hooks/useInView';
import './PinterestFeed.css';

const mockPins = [
  { id: 1, title: 'Minimalist Poster Art', height: '320px', gradient: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)' },
  { id: 2, title: 'Cyberpunk Editorial Design', height: '240px', gradient: 'linear-gradient(135deg, #f857a6 0%, #ff5858 100%)' },
  { id: 3, title: 'Abstract Poster Typography', height: '400px', gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' },
  { id: 4, title: 'Brand Poster Visuals', height: '260px', gradient: 'linear-gradient(135deg, #FC466B 0%, #3F5EFB 100%)' },
  { id: 5, title: 'Kerala Heritage Graphic', height: '340px', gradient: 'linear-gradient(135deg, #593D09 0%, #A86F03 100%)' },
  { id: 6, title: 'Vector Illustration Pin', height: '290px', gradient: 'linear-gradient(135deg, #3a7bd5 0%, #3a6073 100%)' },
];

export default function PinterestFeed() {
  const [ref, inView] = useInView();

  return (
    <section className="pinterest-feed section-padding" id="pinterest">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Inspiration Board</span>
          <h2 className="section-title">Pinterest <span className="gradient-text">Showcase</span></h2>
          <p className="section-subtitle">A collection of designs, ideas, and visual assets saved on my boards</p>
        </div>

        {/* Pinterest Profile Header */}
        <div className="pin-profile-card glass">
          <div className="pin-profile-left">
            <div className="pin-avatar">U</div>
            <div className="pin-profile-info">
              <h3>Usman Puttamanna</h3>
              <p>@usmanputtamanna</p>
            </div>
          </div>
          <a
            href={socialLinks.pinterest}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-pinterest"
          >
            <FaPinterest /> Visit Pinterest
          </a>
        </div>

        {/* Masonry-like Pin Columns */}
        <div className="pin-masonry" ref={ref}>
          {mockPins.map((pin, index) => (
            <motion.a
              key={pin.id}
              href={socialLinks.pinterest}
              target="_blank"
              rel="noopener noreferrer"
              className="pin-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -4 }}
            >
              <div
                className="pin-media"
                style={{ height: pin.height, background: pin.gradient }}
              >
                <div className="pin-overlay">
                  <span className="pin-save-btn"><FaPinterest /> Save</span>
                  <div className="pin-overlay-bottom">
                    <h4>{pin.title}</h4>
                    <FaExternalLinkAlt className="pin-link-icon" />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
