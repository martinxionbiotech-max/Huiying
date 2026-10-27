// Central site config — single source for brand/contact facts (kept consistent site-wide).
// Legal entity: Qinghe County Huiying Automotive Parts Co., Ltd..
export const site = {
  brand: 'huiying',
  companyName: 'Qinghe County Huiying Automotive Parts Co., Ltd.',
  legalName: 'Qinghe County Huiying Automotive Parts Co., Ltd.',
  companyNameShort: 'Huiying Automotive Parts',
    domain: 'huiyingfilter.com', // placeholder domain
  since: 1996, // brand lineage — the Huiying brand traces back to 1996
  foundingDate: '2017-10-10', // legal-entity incorporation date
  tagline: 'Manufacturer of high-tech filter',
  positioning:
    'Professional manufacturer of global filter high-tech products, integrating R&D, production and sales.',
  address:
    'North of Minjiang Street, west of Jiuhuashan Road, Qinghe County, Xingtai City, Hebei Province, China',
    email: 'Martin@carfilterpro.com',
  phone: '+86 13323237275',
  phoneHref: '+8613323237275',
  whatsapp: '+8615903195739',
  whatsappLink: 'https://wa.me/8615903195739',
  contactName: 'Martin',
  // Verified business-registration facts (Tianyancha snapshot via Sogou aggregation, retrieved 2026-10-25).
  unifiedSocialCreditCode: '91130534MA0958NT84',
  legalRepresentative: 'Liu Fengxiu',
  registeredCapital: 'RMB 1,000,000',
  // Baidu Baike company entry (region-blocked 403 on crawl; URL is the authoritative citation).
  baiduBaikeUrl: 'https://baike.baidu.com/item/%E6%B8%85%E6%B2%B3%E5%8E%BF%E6%B1%87%E7%9B%88%E6%B1%BD%E8%BD%A6%E9%9B%B6%E9%83%A8%E4%BB%B6%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8/54139720',
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
  { slug: 'air-filter', name: 'Air Filter', code: 'af', desc: 'Engine air filters for cars, trucks and off-highway equipment.', icon: '/images/d6a0298e-b775-4dac-8ba0-3d4a059757e5.png', stocked: true },
  { slug: 'cabin-filter', name: 'Cabin Filter', code: 'cf', desc: 'Cabin air filters for clean in-cabin air.', icon: '/images/d6028db0-eb29-447e-8e5a-1c238d99f4c0.png', stocked: true },
  { slug: 'oil-filter', name: 'Oil Filter', code: 'of', desc: 'Engine oil filters for reliable lubrication.', icon: '/images/d3c90754-3b64-49fe-9777-7973fb0eab78.png', stocked: true },
  { slug: 'fuel-filter', name: 'Fuel Filter', code: 'ff', desc: 'Fuel filters for clean fuel delivery.', icon: '/images/dfa88509-8560-4df5-88f7-e980a578d65a.png', stocked: false },
  { slug: 'wiper', name: 'Wiper', code: 'wb', desc: 'Wiper blades and wiper products.', icon: '/images/d8dc5304-3276-4f48-95dd-1e16fa3e4e23.png', stocked: false },
];

// Categories shown in product navigation — only stocked lines (air/cabin/oil).
// Empty categories (fuel/wiper) stay published as pages but are hidden from nav.
export const stockedCategories = productCategories.filter((c) => c.stocked);

export const companyLinks = [
  { label: 'Company Profile', href: '/company-profile/' },
  { label: 'Company Culture', href: '/culture/' },
  { label: 'Factory', href: '/factory/' },
  { label: 'Marketing', href: '/marketing/' },
  { label: 'Download', href: '/download/' },
  { label: 'Exhibition', href: '/exhibition/' },
  { label: 'Contact', href: '/contact/' },
];

export const complianceLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy/' },
  { label: 'Terms of Service', href: '/terms/' },
  { label: 'Disclaimer', href: '/disclaimer/' },
  { label: 'Cookie Policy', href: '/cookies/' },
];
