export const socialLinks = {
  instagram: import.meta.env.VITE_INSTAGRAM || 'https://www.instagram.com/usmanputtamanna/',
  pinterest: import.meta.env.VITE_PINTEREST || 'https://in.pinterest.com/usmanputtamanna/_pins/',
  whatsapp: `https://wa.me/${import.meta.env.VITE_WHATSAPP || '919061354069'}`,
  email: import.meta.env.VITE_EMAIL || 'sahadusmanputtamanna@gmail.com',
};

export const personalInfo = {
  name: 'Usman',
  fullName: 'Usman Puttamanna',
  title: 'Creative Designer • Video Editor • Social Media Designer',
  tagline: 'Crafting Visual Experiences That Elevate Brands',
  location: 'Kerala, India',
  phone: '+91 9061354069',
  email: socialLinks.email,
  about: `I am a passionate creative professional specializing in poster design, video editing, social media creatives, branding, and thumbnail design. I use Adobe Photoshop, Illustrator, After Effects, and Premiere Pro to create visually engaging digital experiences.`,
  heroDesc: 'I create professional posters, social media creatives, motion graphics, short-form videos, custom branding, and high-CTR thumbnails that help brands and businesses grow online.',
  stats: [
    { value: 250, label: 'Poster Designs',  suffix: '+' },
    { value: 10,  label: 'Motion Projects', suffix: '+' },
    { value: 30,  label: 'Video Edits',     suffix: '+' },
  ],
  experience: '3+',
};

export const testimonials = [
  {
    id: 1, name: 'Ahmed Farhan', role: 'Event Organizer, Kerala', initial: 'A',
    gradient: 'linear-gradient(135deg,#593D09,#A86F03)',
    text: '"Usman created an absolutely stunning poster for our event. The design was professional, creative and delivered on time. Highly recommended!"',
    rating: 5,
  },
  {
    id: 2, name: 'Sara Rasheed', role: 'Business Owner, Calicut', initial: 'S',
    gradient: 'linear-gradient(135deg,#833ab4,#fd1d1d)',
    text: '"The Instagram creatives Usman designed for my business tripled our engagement. His understanding of design and social media is exceptional."',
    rating: 5,
  },
  {
    id: 3, name: 'Mohammed Riyas', role: 'Brand Manager, Kochi', initial: 'M',
    gradient: 'linear-gradient(135deg,#003d80,#00b4ff)',
    text: '"Outstanding motion graphics work! The logo animation he created for us was beyond our expectations. Very professional and skilled."',
    rating: 5,
  },
  {
    id: 4, name: 'Rahul Krishnan', role: 'Restaurant Owner, Trivandrum', initial: 'R',
    gradient: 'linear-gradient(135deg,#004400,#00cc44)',
    text: '"Usman designed a beautiful visual campaign for my restaurant. It\'s modern, engaging, and our customers love it. Best investment we made!"',
    rating: 5,
  },
  {
    id: 5, name: 'Fathima Noor', role: 'Content Creator, Thrissur', initial: 'F',
    gradient: 'linear-gradient(135deg,#300030,#cc00cc)',
    text: '"The video editing work was flawless. Our promotional reel got thousands of views within days. Usman truly understands visual storytelling."',
    rating: 5,
  },
];

export const navLinks = [
  { label: 'Home',            href: '/' },
  { label: 'About',           href: '/about' },
  { label: 'Skills',          href: '/#skills' },
  { label: 'My Recent Works', href: '/#selected-works' },
  { label: 'Services',        href: '/services' },
  { label: 'Contact',         href: '/contact' },
];

export const whyChooseMe = [
  { num: '01', icon: 'FaPaintBrush', title: 'Creative Designs',      text: 'Unique, eye-catching designs that stand out and reflect your brand identity perfectly.' },
  { num: '02', icon: 'FaBolt',       title: 'Fast Delivery',         text: 'Projects delivered on schedule without compromising quality – always on time.' },
  { num: '03', icon: 'FaBriefcase',  title: 'Visual Branding',       text: 'Custom brand assets, logos, and identity designs tailored to elevate your business presence.' },
  { num: '04', icon: 'FaMedal',      title: 'Professional Quality',  text: 'Industry-standard tools and professional techniques ensure premium output every time.' },
];
