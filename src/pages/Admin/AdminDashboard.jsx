import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaPlus, FaEdit, FaTrash, FaEye, FaCloudUploadAlt,
  FaCheckCircle, FaExclamationTriangle, FaTimes, FaSpinner,
  FaFolder, FaImages, FaEnvelope, FaExternalLinkAlt
} from 'react-icons/fa';
import { supabase } from '../../utils/supabaseClient';
import './AdminDashboard.css';

const categories = [
  'Poster Design',
  'Social Media Design',
  'Educational Design',
  'Event Design',
  'Video Editing',
  'Website Design',
];

export default function AdminDashboard() {
  const [works, setWorks] = useState([]);
  const [messagesCount, setMessagesCount] = useState(0);
  const [visitorCount, setVisitorCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form states
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [description, setDescription] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [isPublished, setIsPublished] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState('');

  // UI state
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [previewWork, setPreviewWork] = useState(null);
  const [lastUpdated, setLastUpdated] = useState('');
  const [todayDate, setTodayDate] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchDashboardData();
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setTodayDate(new Date().toLocaleDateString(undefined, dateOptions));
    setLastUpdated(new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // 1. Fetch works
      const { data: worksData, error: worksError } = await supabase
        .from('portfolio_works')
        .select('*')
        .order('created_at', { ascending: false });

      if (worksError) throw worksError;
      setWorks(worksData || []);

      // 2. Fetch messages count
      const { count, error: countError } = await supabase
        .from('contact_messages')
        .select('*', { count: 'exact', head: true });

      if (countError) throw countError;
      setMessagesCount(count || 0);

      // 3. Fetch visitor count (gracefully fallback if table does not exist yet)
      try {
        const { count: countVisitors, error: visitorError } = await supabase
          .from('visitor_stats')
          .select('*', { count: 'exact', head: true });

        if (visitorError) {
          console.warn('[AdminDashboard] visitor_stats query failed (likely table needs database migration):', visitorError.message);
          setVisitorCount(0);
        } else {
          setVisitorCount(countVisitors || 0);
        }
      } catch (errVisitor) {
        console.warn('[AdminDashboard] Exception checking visitor stats:', errVisitor);
        setVisitorCount(0);
      }

      setLastUpdated(new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch (err) {
      console.error(err);
      showAlert('error', 'Failed to retrieve dashboard records.');
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert({ type: '', message: '' }), 5000);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setCategory(categories[0]);
    setDescription('');
    setInstagramUrl('');
    setIsPublished(true);
    setImageFile(null);
    setImagePreview(null);
    setExistingImageUrl('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || (!imageFile && !existingImageUrl)) {
      showAlert('error', 'Please provide a title and poster image.');
      return;
    }

    setSubmitting(true);
    try {
      let finalImageUrl = existingImageUrl;

      // Upload image if a new file is chosen
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
        const filePath = `posters/${fileName}`;

        // Upload to 'portfolio-images' bucket
        const { error: uploadError } = await supabase.storage
          .from('portfolio-images')
          .upload(filePath, imageFile, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('portfolio-images')
          .getPublicUrl(filePath);

        finalImageUrl = publicUrl;
      }

      const payload = {
        title: title.trim(),
        category,
        description: description.trim(),
        instagram_url: instagramUrl.trim(),
        is_published: isPublished,
        image_url: finalImageUrl,
      };

      if (editingId) {
        // Edit existing record
        const { error } = await supabase
          .from('portfolio_works')
          .update(payload)
          .eq('id', editingId);

        if (error) throw error;
        showAlert('success', 'Work updated successfully!');
      } else {
        // Add new record
        const { error } = await supabase
          .from('portfolio_works')
          .insert([payload]);

        if (error) throw error;
        showAlert('success', 'Work published successfully!');
      }

      resetForm();
      fetchDashboardData();
    } catch (err) {
      console.error(err);
      showAlert('error', err.message || 'Operation failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditClick = (work) => {
    setEditingId(work.id);
    setTitle(work.title);
    setCategory(work.category);
    setDescription(work.description || '');
    setInstagramUrl(work.instagram_url || '');
    setIsPublished(work.is_published);
    setExistingImageUrl(work.image_url);
    setImagePreview(work.image_url);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteClick = async (id, imageUrl) => {
    if (!window.confirm('Are you sure you want to delete this work? This action cannot be undone.')) {
      return;
    }

    try {
      // 1. Delete database row
      const { error: dbError } = await supabase
        .from('portfolio_works')
        .delete()
        .eq('id', id);

      if (dbError) throw dbError;

      // 2. Extract storage path from imageUrl if applicable and delete
      // Example public URL: https://.../storage/v1/object/public/portfolio-images/posters/filename.jpg
      if (imageUrl && imageUrl.includes('/storage/v1/object/public/portfolio-images/')) {
        const storagePath = imageUrl.split('/portfolio-images/')[1];
        if (storagePath) {
          await supabase.storage
            .from('portfolio-images')
            .remove([storagePath]);
        }
      }

      showAlert('success', 'Work deleted successfully.');
      fetchDashboardData();
    } catch (err) {
      console.error(err);
      showAlert('error', 'Failed to delete record.');
    }
  };

  const totalWorks = works.length;
  const publishedWorks = works.filter(w => w.is_published).length;
  const categoriesCount = new Set(works.map(w => w.category)).size;

  return (
    <div className="admin-dashboard">
      {/* Alert Banner */}
      <AnimatePresence>
        {alert.message && (
          <motion.div
            className={`admin-alert ${alert.type}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {alert.type === 'success' ? <FaCheckCircle /> : <FaExclamationTriangle />}
            <span>{alert.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Overview Control Card */}
      <div className="admin-overview-card glass">
        <div className="overview-meta">
          <h2>Overview Dashboard</h2>
          <p className="overview-timestamp">
            Today's Date: {todayDate} | Last Updated: {lastUpdated}
          </p>
        </div>
        <a
          href="https://usman-nu.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary visit-btn"
        >
          🌐 Visit Portfolio
        </a>
      </div>

      {/* Overview Stats Cards Grid */}
      <div className="admin-stats-grid">
        <div className="stat-card glass">
          <div className="stat-card-icon"><FaImages /></div>
          <div className="stat-card-info">
            <h3>{totalWorks}</h3>
            <p>Total Portfolio Works ({publishedWorks} Published)</p>
          </div>
        </div>
        <div className="stat-card glass">
          <div className="stat-card-icon"><FaEnvelope /></div>
          <div className="stat-card-info">
            <h3>{messagesCount}</h3>
            <p>Total Contact Messages</p>
          </div>
        </div>
        <div className="stat-card glass">
          <div className="stat-card-icon"><FaEye /></div>
          <div className="stat-card-info">
            <h3>{visitorCount}</h3>
            <p>Total Portfolio Visitors (Users)</p>
          </div>
        </div>
      </div>

      <div className="admin-workspace-grid">
        {/* Form Container (Left Column) */}
        <div className="admin-form-col glass">
          <h3>{editingId ? 'Edit Work Details' : 'Upload New Poster'}</h3>
          
          <form onSubmit={handleSubmit} className="admin-crud-form">
            <div className="form-group">
              <label htmlFor="work-title">Title *</label>
              <input
                type="text"
                id="work-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. World Environment Day Poster"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="work-category">Category *</label>
              <select
                id="work-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="work-instagram">Instagram URL</label>
              <input
                type="url"
                id="work-instagram"
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
                placeholder="e.g. https://www.instagram.com/p/..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="work-desc">Description</label>
              <textarea
                id="work-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detail the creative context, theme, typography, etc."
                rows="4"
              />
            </div>

            {/* Poster Upload Field */}
            <div className="form-group">
              <label>Poster Image *</label>
              <div
                className="upload-dropzone"
                onClick={() => fileInputRef.current?.click()}
              >
                <FaCloudUploadAlt className="upload-zone-icon" />
                <p>Click to select image file (JPG, PNG)</p>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
              </div>

              {/* Preview Thumbnail */}
              {imagePreview && (
                <div className="upload-preview-wrapper">
                  <img src={imagePreview} alt="Upload Preview" />
                  <button
                    type="button"
                    className="remove-preview-btn"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview(null);
                      setExistingImageUrl('');
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                  >
                    <FaTimes />
                  </button>
                </div>
              )}
            </div>

            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                id="work-published"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
              />
              <label htmlFor="work-published">Publish immediately (visible to visitors)</label>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting}
              >
                {submitting ? (
                  <><FaSpinner className="spin" /> Saving...</>
                ) : (
                  editingId ? 'Update Work' : 'Publish Poster'
                )}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* List of Works (Right Column) */}
        <div className="admin-list-col glass">
          <h3>Portfolio Catalog ({works.length})</h3>

          {loading ? (
            <div className="list-loading">
              <FaSpinner className="spin" /> Loading works...
            </div>
          ) : works.length === 0 ? (
            <div className="list-empty">No posters uploaded yet. Start publishing above!</div>
          ) : (
            <div className="admin-works-list">
              {works.map(work => (
                <div key={work.id} className="admin-work-row">
                  <div className="admin-work-thumb">
                    <img src={work.image_url} alt={work.title} />
                  </div>
                  <div className="admin-work-details">
                    <h4>{work.title}</h4>
                    <span className="admin-work-cat">{work.category}</span>
                    <span className={`admin-work-status ${work.is_published ? 'published' : 'draft'}`}>
                      {work.is_published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <div className="admin-work-actions">
                    <button
                      onClick={() => setPreviewWork(work)}
                      className="action-btn preview"
                      title="Preview"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleEditClick(work)}
                      className="action-btn edit"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(work.id, work.image_url)}
                      className="action-btn delete"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Preview Modal Lightbox */}
      <AnimatePresence>
        {previewWork && (
          <motion.div
            className="sw-lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewWork(null)}
          >
            <button className="sw-lightbox-close" onClick={() => setPreviewWork(null)}>
              <FaTimes />
            </button>

            <motion.div
              className="sw-lightbox-card"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: '400px' }}
            >
              <div className="sw-lightbox-image-container" style={{ maxHeight: '55vh' }}>
                <img
                  src={previewWork.image_url}
                  alt={previewWork.title}
                  className="sw-lightbox-img"
                  style={{ maxHeight: '55vh' }}
                />
              </div>
              <div className="sw-lightbox-footer" style={{ background: 'var(--bg)' }}>
                <span className="sw-lightbox-cat">{previewWork.category}</span>
                <h4 className="sw-lightbox-title" style={{ color: 'var(--text)', marginBottom: '8px' }}>
                  {previewWork.title}
                </h4>
                {previewWork.description && (
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0 0 16px', lineHeight: '1.5' }}>
                    {previewWork.description}
                  </p>
                )}
                {previewWork.instagram_url && (
                  <a
                    href={previewWork.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-instagram btn-sm"
                  >
                    View on Instagram <FaExternalLinkAlt />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
