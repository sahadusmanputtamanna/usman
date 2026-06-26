import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTrash, FaEnvelopeOpen, FaEnvelope, FaSpinner,
  FaCheckCircle, FaExclamationTriangle, FaCalendarAlt, FaUser, FaInfoCircle
} from 'react-icons/fa';
import { supabase } from '../../utils/supabaseClient';
import './AdminMessages.css';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ type: '', message: '' });

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (err) {
      console.error(err);
      showAlert('error', 'Failed to retrieve messages from database.');
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert({ type: '', message: '' }), 5000);
  };

  const toggleReadStatus = async (id, currentReadStatus) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ is_read: !currentReadStatus })
        .eq('id', id);

      if (error) throw error;

      // Update locally
      setMessages(prev =>
        prev.map(msg => (msg.id === id ? { ...msg, is_read: !currentReadStatus } : msg))
      );
      showAlert('success', `Message marked as ${!currentReadStatus ? 'read' : 'unread'}.`);
    } catch (err) {
      console.error(err);
      showAlert('error', 'Failed to update message status.');
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message forever?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setMessages(prev => prev.filter(msg => msg.id !== id));
      showAlert('success', 'Message deleted successfully.');
    } catch (err) {
      console.error(err);
      showAlert('error', 'Failed to delete message.');
    }
  };

  const formatDate = (isoString) => {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const unreadCount = messages.filter(m => !m.is_read).length;

  return (
    <div className="admin-messages-page">
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

      <div className="messages-header glass">
        <div className="messages-header-info">
          <h3>Inbox</h3>
          <p>You have {unreadCount} unread message{unreadCount !== 1 ? 's' : ''} in total</p>
        </div>
      </div>

      {loading ? (
        <div className="messages-loading">
          <FaSpinner className="spin" /> Loading inbox...
        </div>
      ) : messages.length === 0 ? (
        <div className="messages-empty glass">
          <FaInfoCircle className="empty-icon" />
          <p>Your inbox is empty. No messages submitted yet.</p>
        </div>
      ) : (
        <div className="messages-list">
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              className={`message-card glass ${msg.is_read ? 'read' : 'unread'}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Message Header */}
              <div className="message-card-header">
                <div className="sender-meta">
                  <div className="sender-avatar">
                    <FaUser />
                  </div>
                  <div>
                    <h4>{msg.name}</h4>
                    <a href={`mailto:${msg.email}`} className="sender-email">
                      {msg.email}
                    </a>
                  </div>
                </div>

                <div className="message-meta-date">
                  <span className="msg-date">
                    <FaCalendarAlt /> {formatDate(msg.created_at)}
                  </span>
                  {!msg.is_read && <span className="unread-badge">New</span>}
                </div>
              </div>

              {/* Message Subject & Body */}
              <div className="message-card-content">
                <h5 className="msg-subject">
                  <span>Subject:</span> {msg.subject || 'No Subject Specified'}
                </h5>
                <p className="msg-body">{msg.message}</p>
              </div>

              {/* Actions row */}
              <div className="message-card-actions">
                <button
                  onClick={() => toggleReadStatus(msg.id, msg.is_read)}
                  className={`msg-action-btn toggle-read ${msg.is_read ? 'unread-btn' : 'read-btn'}`}
                  title={msg.is_read ? 'Mark as Unread' : 'Mark as Read'}
                >
                  {msg.is_read ? (
                    <>
                      <FaEnvelope /> Mark Unread
                    </>
                  ) : (
                    <>
                      <FaEnvelopeOpen /> Mark Read
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleDeleteMessage(msg.id)}
                  className="msg-action-btn delete-btn"
                  title="Delete Message"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
