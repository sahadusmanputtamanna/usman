import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaInstagram, FaPinterest, FaTimes, FaSearchPlus,
  FaChevronLeft, FaChevronRight, FaSpinner
} from 'react-icons/fa';
import { supabase } from '../../utils/supabaseClient';
import './SelectedWorks.css';


export default function SelectedWorks() {
  const sectionRef = useRef(null);
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIdx, setActiveIdx] = useState(null);

  // Wrapped in useCallback so the realtime handler can call it without stale closure
  const loadWorks = useCallback(async () => {
    console.log('[SelectedWorks] Fetching portfolio_works from Supabase…');
    try {
      // Fetch ALL rows first (no RLS filter in the query), then filter client-side.
      // This avoids any edge-case where the is_published column name or value type
      // doesn't match what PostgREST expects from the anon key.
      const { data, error: queryError } = await supabase
        .from('portfolio_works')
        .select('id, title, category, description, image_url, instagram_url, is_published, created_at')
        .order('created_at', { ascending: false })
        .limit(20); // fetch buffer, filter below to max 6

      if (queryError) {
        console.error('[SelectedWorks] Query error:', queryError);
        setError(`${queryError.message} (code: ${queryError.code})`);
        setWorks([]);
        setLoading(false);
        return;
      }

      // Client-side filter: only published works, max 6 (3×2 grid)
      const published = (data || [])
        .filter(w => w.is_published === true)
        .slice(0, 6);

      console.log(`[SelectedWorks] Total fetched: ${(data || []).length}, published: ${published.length}`);
      setWorks(published);
      setError(null);
    } catch (err) {
      console.error('[SelectedWorks] Unexpected error:', err);
      setError(String(err));
      setWorks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial load
    loadWorks();

    // --- Realtime subscription ---
    const channel = supabase
      .channel('sw-portfolio-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'portfolio_works' },
        (payload) => {
          console.log('[SelectedWorks] Realtime change:', payload.eventType);
          loadWorks();
        }
      )
      .subscribe((status, err) => {
        console.log('[SelectedWorks] Realtime status:', status);
        if (err) console.warn('[SelectedWorks] Realtime warning:', err);
      });

    // --- Polling fallback (every 15 s) in case realtime isn't enabled ---
    const pollInterval = setInterval(() => {
      loadWorks();
    }, 15000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(pollInterval);
    };
  }, [loadWorks]);

  const handleOpenLightbox = (index) => {
    setActiveIdx(index);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseLightbox = () => {
    setActiveIdx(null);
    document.body.style.overflow = '';
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === 0 ? works.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === works.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="selected-works section-padding" id="selected-works" ref={sectionRef}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Gallery</span>
          <h2 className="section-title">
            My Recent <span className="gradient-text">Works</span>
          </h2>
          <p className="section-subtitle">
            A showcase of my latest poster designs created for educational institutions, events, celebrations and social media campaigns.
          </p>
        </div>

        {/* Grid / States */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
            <FaSpinner className="spin" style={{ fontSize: '2rem', color: 'var(--accent)' }} />
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <p style={{ color: '#ff4d4d', fontSize: '1rem', marginBottom: '8px' }}>
              Failed to load recent works.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Error: {error}
            </p>
          </div>
        ) : works.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '1.1rem', margin: '0' }}>No recent works available</p>
          </div>
        ) : (
          <motion.div
            className="sw-compact-grid"
          >
            {works.map((work, index) => (
              <motion.div
                key={work.id}
                className="sw-compact-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.07 }}
                onClick={() => handleOpenLightbox(index)}
              >
                {/* Thumbnail */}
                <div className="sw-thumb-wrapper">
                  <img
                    src={work.image_url}
                    alt={work.title}
                    loading="lazy"
                    className="sw-thumb-img"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      console.warn('[SelectedWorks] Image failed to load:', work.image_url);
                    }}
                  />
                  <div className="sw-thumb-overlay">
                    <span className="sw-thumb-zoom-icon" aria-label="Zoom image">
                      <FaSearchPlus />
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="sw-card-content">
                  <span className="sw-card-category">{work.category}</span>
                  <h3 className="sw-card-title">{work.title}</h3>
                  {work.description && (
                    <p className="sw-card-desc">{work.description}</p>
                  )}
                  <div className="sw-card-footer">
                    <button className="sw-card-btn" aria-label={`View ${work.title}`}>
                      View Design
                    </button>
                    {work.instagram_url && (
                      <a
                        href={work.instagram_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sw-card-insta-link"
                        title="View on Instagram"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaInstagram />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* View More Works */}
        <div className="sw-view-more">
          <h3 className="sw-view-more-title">View More Works</h3>
          <p className="sw-view-more-desc">
            Explore more of my latest poster designs, creative projects and visual content on my social platforms.
          </p>
          <div className="sw-view-more-buttons">
            <a
              href="https://www.instagram.com/usmanputtamanna/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-instagram"
            >
              <FaInstagram /> Instagram Portfolio
            </a>
            <a
              href="https://in.pinterest.com/usmanputtamanna/_pins/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-pinterest"
            >
              <FaPinterest /> Pinterest Collection
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeIdx !== null && (
          <motion.div
            className="sw-lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseLightbox}
          >
            <button
              className="sw-lightbox-close"
              onClick={handleCloseLightbox}
              aria-label="Close Lightbox"
            >
              <FaTimes />
            </button>

            <button
              className="sw-lightbox-nav prev"
              onClick={handlePrev}
              aria-label="Previous Poster"
            >
              <FaChevronLeft />
            </button>
            <button
              className="sw-lightbox-nav next"
              onClick={handleNext}
              aria-label="Next Poster"
            >
              <FaChevronRight />
            </button>

            <motion.div
              className="sw-lightbox-card"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sw-lightbox-image-container">
                <img
                  src={works[activeIdx].image_url}
                  alt={works[activeIdx].title}
                  className="sw-lightbox-img"
                />
              </div>
              <div className="sw-lightbox-footer">
                <span className="sw-lightbox-cat">{works[activeIdx].category}</span>
                <h4 className="sw-lightbox-title">{works[activeIdx].title}</h4>
                {works[activeIdx].description && (
                  <p className="sw-lightbox-desc" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px', lineHeight: '1.5' }}>
                    {works[activeIdx].description}
                  </p>
                )}
                {works[activeIdx].instagram_url && (
                  <a
                    href={works[activeIdx].instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-instagram btn-sm sw-lightbox-insta-btn"
                    style={{ marginTop: '16px', display: 'inline-flex', gap: '8px' }}
                  >
                    <FaInstagram /> View on Instagram
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
