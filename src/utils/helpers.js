/** Clamp a number between min and max */
export const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

/** Validate email address */
export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

/** Build WhatsApp URL with optional pre-filled message */
export const buildWhatsAppUrl = (phone, message = '') => {
  const base = `https://wa.me/${phone.replace(/\D/g, '')}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

/** Debounce a function */
export const debounce = (fn, delay = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

/** Scroll smoothly to a section */
export const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/** Format number with + suffix */
export const formatStat = (val, suffix = '') => `${val}${suffix}`;

/** Stagger animation delay helper */
export const staggerDelay = (i, base = 0.1) => i * base;
