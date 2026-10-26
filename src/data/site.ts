// Central site config — single source for brand/contact facts (kept consistent site-wide).
// Brand renamed from the source site to huiying per build instruction.
export const site = {
  brand: 'huiying',
  companyName: 'Qinghe County Huiying Filter Manufacturing Co., Ltd.',
  companyNameShort: 'Huiying Filter',
  domain: 'huiyingfilter.com', // placeholder domain
  since: 1996,
  tagline: 'Manufacturer of high-tech filter',
  positioning:
    'Professional manufacturer of global filter high-tech products, integrating R&D, production and sales.',
  address: 'Wangshuangmiao Industrial Zone, Qinghe County, Hebei Province, China',
  email: 'davidwang@huiyingfilter.com',
  phone: '+86-319-8291681',
  whatsapp: '+8615903195739',
  whatsappLink: 'https://wa.me/8615903195739',
};

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products/' },
  { label: 'News', href: '/news/' },
  { label: 'Factory', href: '/factory/' },
  { label: 'About', href: '/company-profile/' },
  { label: 'Contact', href: '/contact/' },
];

export const productCategories = [
  { slug: 'air-filter', name: 'Air Filter', code: 'af', desc: 'Engine air filters for cars, trucks and off-highway equipment.' },
  { slug: 'cabin-filter', name: 'Cabin Filter', code: 'cf', desc: 'Cabin air filters for clean in-cabin air.' },
  { slug: 'oil-filter', name: 'Oil Filter', code: 'of', desc: 'Engine oil filters for reliable lubrication.' },
  { slug: 'fuel-filter', name: 'Fuel Filter', code: 'ff', desc: 'Fuel filters for clean fuel delivery.' },
  { slug: 'wiper', name: 'Wiper', code: 'wb', desc: 'Wiper blades and wiper products.' },
];

export const companyLinks = [
  { label: 'Company Profile', href: '/company-profile/' },
  { label: 'Company Culture', href: '/culture/' },
  { label: 'Factory', href: '/factory/' },
  { label: 'Marketing', href: '/marketing/' },
  { label: 'Download', href: '/download/' },
  { label: 'Exhibition', href: '/exhibition/' },
  { label: 'Contact', href: '/contact/' },
  { label: 'Privacy Policy', href: '/privacy-policy/' },
];

export const complianceLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy/' },
];
