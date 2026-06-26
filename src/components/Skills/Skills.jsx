import { motion } from 'framer-motion';
import {
  FaPaintBrush, FaFilm, FaMagic, FaCode,
  FaImage, FaInstagram, FaMobileAlt, FaAdjust, FaCut,
  FaSignature, FaPlayCircle, FaStar, FaRocket, FaLayerGroup, FaSearch
} from 'react-icons/fa';
import { skillCategories } from '../../data/skillsData';
import { useInView } from '../../hooks/useInView';
import './Skills.css';

const iconMap = {
  FaPaintBrush: <FaPaintBrush />,
  FaFilm: <FaFilm />,
  FaMagic: <FaMagic />,
  FaCode: <FaCode />,
  FaImage: <FaImage />,
  FaInstagram: <FaInstagram />,
  FaMobileAlt: <FaMobileAlt />,
  FaAdjust: <FaAdjust />,
  FaCut: <FaCut />,
  FaSignature: <FaSignature />,
  FaPlayCircle: <FaPlayCircle />,
  FaStar: <FaStar />,
  FaRocket: <FaRocket />,
  FaLayerGroup: <FaLayerGroup />,
  FaSearch: <FaSearch />
};

export default function Skills() {
  const [ref, inView] = useInView();

  return (
    <section className="skills section-padding" id="skills">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Expertise</span>
          <h2 className="section-title">My Skills & <span className="gradient-text">Abilities</span></h2>
          <p className="section-subtitle">Proficiencies in modern design tools and web development technologies</p>
        </div>

        <div className="skills-grid" ref={ref}>
          {skillCategories.map((cat, catIdx) => (
            <motion.div
              key={cat.id}
              className="skills-category glass"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIdx * 0.15 }}
            >
              <div className="category-header" style={{ background: cat.gradient }}>
                <span className="category-icon">
                  {iconMap[cat.icon] || <FaStar />}
                </span>
                <h3>{cat.title}</h3>
              </div>

              <div className="category-body">
                {cat.skills.map((skill, skillIdx) => (
                  <div key={skill.name} className="skill-item">
                    <div className="skill-info">
                      <span className="skill-icon-wrapper">
                        {skill.icon ? (
                          <img src={skill.icon} alt={skill.name} className="skill-img-icon" />
                        ) : (
                          iconMap[skill.faIcon] || <FaStar />
                        )}
                      </span>
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-level">{skill.level}%</span>
                    </div>
                    <div className="skill-bar-bg">
                      <motion.div
                        className="skill-bar-fill"
                        style={{ background: cat.gradient }}
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: 0.2 + skillIdx * 0.08 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
