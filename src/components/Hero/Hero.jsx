import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaWhatsapp, FaEye, FaPaperPlane,
} from 'react-icons/fa';
import { personalInfo, socialLinks } from '../../data/socialLinks';
import profileImg from '../../assets/images/profile.jpg';
import './Hero.css';

const tools = [
  { label: 'Photoshop',   src: 'https://img.icons8.com/color/48/adobe-photoshop--v1.png',   cls: 'tb-ps',  delay: 0 },
  { label: 'Illustrator', src: 'https://img.icons8.com/color/48/adobe-illustrator--v1.png', cls: 'tb-ai',  delay: 0.5 },
  { label: 'Premiere Pro',src: 'https://img.icons8.com/color/48/adobe-premiere-pro--v1.png',cls: 'tb-pr',  delay: 1 },
  { label: 'After Effects',src:'https://img.icons8.com/color/48/adobe-after-effects--v1.png',cls:'tb-ae',  delay: 1.5 },
];

const PHRASES = [
  'Creative Designer',
  'Video Editor',
  'Motion Graphics Artist',
  'Thumbnail Designer',
  'Brand Storyteller',
];

function useTypewriter(phrases) {
  const [text, setText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    const delay = deleting ? 40 : 70;
    const timer = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), 2000);
        } else {
          setCharIdx(c => c + 1);
        }
      } else {
        setText(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setCharIdx(0);
          setPhraseIdx(i => (i + 1) % phrases.length);
        } else {
          setCharIdx(c => c - 1);
        }
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [charIdx, deleting, phraseIdx, phrases]);

  return text;
}

function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      setCount(c => {
        if (c + step >= target) { clearInterval(timer); return target; }
        return c + step;
      });
    }, 25);
    return () => clearInterval(timer);
  }, [target]);
  return <>{count}{suffix}</>;
}

export default function Hero() {
  const typed = useTypewriter(PHRASES);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.4,0,0.2,1] },
  });

  return (
    <section className="hero" id="home">
      {/* Blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <div className="hero-container container">
        {/* ── Left: Text ── */}
        <div className="hero-text">
          <motion.div className="hero-badge" {...fadeUp(0.1)}>
            <span className="badge-dot" />
            Available for Freelance Work
          </motion.div>

          <motion.h1 className="hero-heading" {...fadeUp(0.2)}>
            Hi, I'm <span className="gradient-text">Usman</span>
          </motion.h1>

          <motion.div className="hero-typewriter" {...fadeUp(0.3)}>
            <span>{typed}</span><span className="cursor">|</span>
          </motion.div>

          <motion.p className="hero-desc" {...fadeUp(0.4)}>
            {personalInfo.heroDesc}
          </motion.p>

          <motion.div className="hero-buttons" {...fadeUp(0.5)}>
            <a href="/#selected-works" className="btn btn-primary">
              <FaEye /> View My Works
            </a>
            <Link to="/contact" className="btn btn-outline">
              <FaPaperPlane /> Contact Me
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div className="hero-stats" {...fadeUp(0.6)}>
            {personalInfo.stats.map(s => (
              <div key={s.label} className="stat-card glass">
                <div className="stat-num">
                  <Counter target={s.value} suffix={s.suffix} />
                </div>
                <p>{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: Image ── */}
        <div className="hero-image-col">
          {/* Tool badges */}
          {tools.map(t => (
            <motion.div
              key={t.label}
              className={`tool-badge ${t.cls}`}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + t.delay, type: 'spring', stiffness: 180 }}
            >
              <img src={t.src} alt={t.label} />
              <span>{t.label}</span>
            </motion.div>
          ))}

          <motion.div
            className="profile-ring"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <div className="profile-glow" />
            <img src={profileImg} alt="Usman – Creative Designer & Video Editor" className="profile-img" />
          </motion.div>

          {/* WhatsApp floating CTA */}
          <motion.a
            href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer"
            className="wa-float"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, type: 'spring' }}
            whileHover={{ scale: 1.1 }}
          >
            <FaWhatsapp />
          </motion.a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <div className="scroll-dot" />
      </div>
    </section>
  );
}
