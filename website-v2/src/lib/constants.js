/**
 * Global constants and shared data structures used across the UI.
 * Centralizing these values avoids duplication between components
 * such as the navbar, footer, and sections while keeping the
 * rendered text and routes identical.
 */

export const BRAND = {
  NAME: 'AiGENThix',
  ADDRESS_LINE: 'HSR Layout, Bengaluru, Karnataka, India',
  PRIMARY_EMAIL: 'info@aigenthix.com',
  SECONDARY_EMAIL: 'aigenthix@gmail.com',
  PHONE: '+91 7006951124',
};

export const SOCIAL_LINKS = {
  TWITTER: 'https://twitter.com',
  LINKEDIN: 'https://linkedin.com',
  INSTAGRAM: 'https://instagram.com',
};

export const NAV_PRODUCTS = [
  { title: 'Sahayak AI', to: '/products/sahayak-ai' },
  { title: 'Video Translation', to: '/products/video-translation' },
  { title: 'AI Interviewer', to: '/products/ai-interviewer' },
  { title: 'Project Management', to: '/products/project-management' },
];

export const NAV_SERVICES = [
  { title: 'Generative AI', to: '/services/generative-ai' },
  { title: 'Artificial Intelligence & ML', to: '/services/ai-ml' },
  { title: 'Data Engineering', to: '/services/data-engineering' },
  { title: 'Software Development', to: '/services/software-development' },
  { title: 'Robotics', to: '/services/robotics' },
  { title: 'Cybersecurity', to: '/services/cybersecurity' },
];

export const NAV_INDUSTRIES = [
  { title: 'Healthcare', to: '/industries/healthcare' },
  { title: 'Finance', to: '/industries/finance' },
  { title: 'Retail & E-commerce', to: '/industries/retail-ecommerce' },
  { title: 'Manufacturing', to: '/industries/manufacturing' },
  { title: 'Education', to: '/industries/education' },
  { title: 'Enterprise Solutions', to: '/industries/enterprise-solutions' },
];

export const NAV_COMPANY_MORE = [
  { title: 'OUR CORE PRINCIPLES', to: '/principles' },
  { title: 'OUR TEAM', to: '/team' },
  { title: 'CONTACT US', to: '/contact' },
  { title: 'BLOG', to: '/blog' },
];

export const NAV_ACCOUNT = [
  { title: 'SIGN IN', to: '/sign-in' },
  { title: 'CREATE ACCOUNT', to: '/create-account' },
  { title: 'MY ACCOUNT', to: '/my-account' },
];

