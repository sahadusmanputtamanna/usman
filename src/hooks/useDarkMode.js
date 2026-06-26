import { useState, useEffect } from 'react';

export function useDarkMode() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('usman-theme');
    if (saved) return saved === 'dark';
    return false; // default to light mode on first visit
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('usman-theme', dark ? 'dark' : 'light');
  }, [dark]);

  return [dark, setDark];
}
