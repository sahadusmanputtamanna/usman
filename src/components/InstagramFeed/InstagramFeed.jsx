import { motion } from 'framer-motion';
import { FaInstagram, FaHeart, FaComment, FaExternalLinkAlt } from 'react-icons/fa';
import { socialLinks } from '../../data/socialLinks';
import { useInView } from '../../hooks/useInView';
import './InstagramFeed.css';

// Mock post data with gradients to match aesthetic
const mockPosts = [
  { id: 1, likes: '482', comments: '54', gradient: 'linear-gradient(135deg, #FF3B30, #FF9500)' },
  { id: 2, likes: '320', comments: '28', gradient: 'linear-gradient(135deg, #AF52DE, #FF2D55)' },
  { id: 3, likes: '612', comments: '76', gradient: 'linear-gradient(135deg, #5856D6, #007AFF)' },
  { id: 4, likes: '411', comments: '39', gradient: 'linear-gradient(135deg, #4CD964, #5AC8FA)' },
  { id: 5, likes: '530', comments: '62', gradient: 'linear-gradient(135deg, #A86F03, #593D09)' },
  { id: 6, likes: '389', comments: '41', gradient: 'linear-gradient(135deg, #1A0A00, #C8901a)' },
];

export default function InstagramFeed() {
  const [ref, inView] = useInView();

  return (
    <section className="instagram-feed section-padding" id="instagram">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Social Hub</span>
          <h2 className="section-title">Instagram <span className="gradient-text">Showcase</span></h2>
          <p className="section-subtitle">Catch my latest designs and updates on my Instagram feed</p>
        </div>

        {/* Profile Stats Header */}
        <div className="insta-profile-card glass">
          <div className="insta-avatar-col">
            <div className="insta-avatar-ring">
              <div className="insta-avatar">U</div>
            </div>
            <div className="insta-meta">
              <h3>@usmanputtamanna</h3>
              <p>Creative Designer & Editor</p>
            </div>
          </div>
          <div className="insta-stats">
            <div className="insta-stat">
              <span className="stat-val">300+</span>
              <span className="stat-lbl">posts</span>
            </div>
            <div className="insta-stat">
              <span className="stat-val">2.5K</span>
              <span className="stat-lbl">followers</span>
            </div>
            <div className="insta-stat">
              <span className="stat-val">450</span>
              <span className="stat-lbl">following</span>
            </div>
          </div>
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-insta"
          >
            <FaInstagram /> Follow Me
          </a>
        </div>

        {/* Feed Grid */}
        <div className="insta-grid" ref={ref}>
          {mockPosts.map((post, index) => (
            <motion.a
              key={post.id}
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="insta-post-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="insta-post-image" style={{ background: post.gradient }}>
                <div className="insta-post-overlay">
                  <div className="insta-post-interaction">
                    <span><FaHeart /> {post.likes}</span>
                    <span><FaComment /> {post.comments}</span>
                  </div>
                  <FaExternalLinkAlt className="insta-post-link-icon" />
                </div>
                <div className="insta-post-logo">
                  <FaInstagram />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
