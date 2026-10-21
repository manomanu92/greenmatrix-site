// Single source of truth for the details that repeat across every page.
// All values carried over verbatim from the WordPress site.
export const site = {
  name: 'Green Matrix',
  legalName: 'Green Matrix Solar Energy Systems & Components Trading Co. L.L.C',
  phone: '+971 55 804 7101',
  phoneHref: 'tel:+971558047101',
  email: 'contact@greenmatrixsolar.com',
  address: 'Jebel Ali FZ, Dubai, United Arab Emirates',
  instagram: 'https://www.instagram.com/greenmatrix86/',
  // wa.me takes the number in full international form, digits only.
  whatsapp: 'https://wa.me/971558047101',
  whatsappMessage: 'Hello Green Matrix, I would like to enquire about solar components.',
};

// Pre-filled WhatsApp link, ready to drop into an href.
export const whatsappHref = `${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`;

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Contact', href: '/contact' },
];
