import { motion } from 'framer-motion';
import { FaInstagram, FaPinterest, FaWhatsapp } from 'react-icons/fa';
import { socialLinks } from '../../data/socialLinks';
import { useInView } from '../../hooks/useInView';
import './SocialLinks.css';

const socialPlatforms = [
  {
    id: 'instagram',
    name: 'Instagram',
    username: '@usmanputtamanna',
    url: socialLinks.instagram,
    icon: <FaInstagram />,
    description: 'Check out my latest design projects, creative posters, and quick video edits.',
    btnText: 'Follow on Instagram',
    btnClass: 'btn-instagram',
    color: '#E1306C',
    gradient: 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)',
    glow: 'rgba(253, 29, 29, 0.22)',
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    username: '@usmanputtamanna',
    url: socialLinks.pinterest,
    icon: <FaPinterest />,
    description: 'Browse my inspiration boards, visual concepts, and graphic design assets.',
    btnText: 'Follow on Pinterest',
    btnClass: 'btn-pinterest',
    color: '#BD081C',
    gradient: 'linear-gradient(135deg, #bd081c 0%, #e60023 100%)',
    glow: 'rgba(230, 0, 35, 0.22)',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    username: '+91 90613 54069',
    url: socialLinks.whatsapp,
    icon: <FaWhatsapp />,
    description: 'Let’s chat about project inquiries, collaborations, or work opportunities directly.',
    btnText: 'Chat on WhatsApp',
    btnClass: 'btn-whatsapp',
    color: '#25D366',
    gradient: 'linear-gradient(135deg, #25d366 0%, #128c7e 100%)',
    glow: 'rgba(37, 211, 102, 0.22)',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function SocialLinks() {
  const [ref, inView] = useInView();

  return (
    <section className="social-links section-padding" id="social-links">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Connect</span>
          <h2 className="section-title">
            Connect <span className="gradient-text">With Me</span>
          </h2>
          <p className="section-subtitle">
            Follow my work and connect with me through my social platforms.
          </p>
        </div>

        {/* Social Cards Grid */}
        <motion.div
          className="social-grid"
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {socialPlatforms.map((platform) => (
            <motion.div
              key={platform.id}
              className="social-card glass"
              variants={cardVariants}
              whileHover={{ y: -8, boxShadow: `0 20px 40px ${platform.glow}` }}
            >
              {/* Card visual accent bar */}
              <div className="social-card-accent" style={{ background: platform.gradient }} />
              
              <div className="social-card-body">
                <div className="social-card-header">
                  <div className="social-icon-box" style={{ background: platform.gradient }}>
                    {platform.icon}
                  </div>
                  <div className="social-meta">
                    <h3>{platform.name}</h3>
                    <p>{platform.username}</p>
                  </div>
                </div>

                <p className="social-desc">{platform.description}</p>

                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn btn-full ${platform.btnClass}`}
                >
                  {platform.icon} {platform.btnText}
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
