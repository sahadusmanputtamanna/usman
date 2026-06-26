import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { personalInfo } from '../../data/socialLinks';

export default function SEO({ title, description, ogImage }) {
  const location = useLocation();

  const siteTitle = `${title ? `${title} | ` : ''}${personalInfo.fullName} - ${personalInfo.name}`;
  const siteDesc = description || personalInfo.heroDesc;
  const currentUrl = window.location.origin + location.pathname;
  const ogImgUrl = ogImage || `${window.location.origin}/og-image.jpg`;

  useEffect(() => {
    // 1. Title Tag
    document.title = siteTitle;

    // 2. Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', siteDesc);

    // 3. Open Graph Tags
    const updateMeta = (property, value, isProperty = true) => {
      const attribute = isProperty ? 'property' : 'name';
      let tag = document.querySelector(`meta[${attribute}="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', value);
    };

    updateMeta('og:title', siteTitle);
    updateMeta('og:description', siteDesc);
    updateMeta('og:url', currentUrl);
    updateMeta('og:type', 'website');
    updateMeta('og:image', ogImgUrl);

    updateMeta('twitter:card', 'summary_large_image', false);
    updateMeta('twitter:title', siteTitle, false);
    updateMeta('twitter:description', siteDesc, false);
    updateMeta('twitter:image', ogImgUrl, false);

    // 4. Structured Data (JSON-LD)
    let schemaScript = document.getElementById('jsonld-schema');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.setAttribute('id', 'jsonld-schema');
      schemaScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(schemaScript);
    }

    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      'name': personalInfo.fullName,
      'jobTitle': 'Creative Designer, Video Editor & Website Developer',
      'description': personalInfo.about,
      'url': window.location.origin,
      'sameAs': [
        import.meta.env.VITE_INSTAGRAM || 'https://www.instagram.com/usmanputtamanna/',
        import.meta.env.VITE_PINTEREST || 'https://in.pinterest.com/usmanputtamanna/_pins/'
      ],
      'knowsAbout': [
        'Graphic Design',
        'Poster Design',
        'Video Editing',
        'Motion Graphics',
        'Website Development',
        'Adobe Photoshop',
        'Adobe Premiere Pro',
        'Adobe After Effects'
      ]
    };

    schemaScript.textContent = JSON.stringify(schemaData);

    return () => {
      // Clean up structured data if component unmounts
      if (schemaScript) {
        schemaScript.textContent = '';
      }
    };
  }, [siteTitle, siteDesc, currentUrl, ogImgUrl]);

  return null;
}
