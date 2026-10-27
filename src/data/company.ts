// Company page content — original editorial rewrite for E-E-A-T.
import { site } from './site';

export const companyProfile = {
  heading: 'About Us',
  name: site.companyName,
  description:
    'Qinghe County Huiying Automotive Parts Co., Ltd. is an automotive-parts manufacturer based in Qinghe County, Xingtai City, Hebei Province, China — one of the country\'s established clusters for automotive filters and related components. Incorporated on 10 October 2017 with a registered capital of RMB 1,000,000, the company\'s registered scope covers the manufacturing of automotive parts and components, and its registered address is north of Minjiang Street and west of Jiuhuashan Road in Qinghe County. The Huiying brand carries a longer history in the Qinghe filter industry, tracing back to 1996. The company runs a 10,000 m² facility with a clean workshop of over 6,000 m², employs more than 100 people, and operates three PU filter production lines, vacuum-testing equipment and more than twenty specialist machines to produce air, cabin, oil and fuel filters for domestic and export markets.',
  strengths: [
    { title: 'Quality to open up the market', image: '/images/a05a4769-ee8f-494a-8490-805b91999f73.jpg' },
    { title: 'Advanced equipment', image: '/images/07598f55-0f02-42d9-9649-8cfafbd88c7f.jpg' },
    { title: 'Product guarantee', image: '/images/c0117352-9851-433d-99d0-d7ece663fe6a.jpg' },
    { title: 'Boutique service', image: '/images/e9647e60-eeba-412c-84a3-51208285c65c.jpg' },
  ],
  welcome:
    'All employees of the company sincerely welcome guests from all over the world and merchants from all over the world to visit and negotiate business. Based on the corporate philosophy of quality as a survival, we will seek common development and create brilliance with you!',
  images: [
    '/images/e2302fd0-e550-4281-8068-ec9a1d0221ae.jpg',
    '/images/447f20e8-e91b-46de-bda9-20ce84d92597.jpg',
    '/images/5b08293c-8b97-4f3e-b5ea-2116d487dcc6.jpg',
    '/images/0baa2d31-9857-44d6-a5e7-9e1993ccd122.jpg',
  ],
};

export const companyCulture = {
  heading: 'Culture',
  tagline: 'Integrity, win-win cooperation, carry forward, and pass on from generation to generation',
  items: [
    { title: 'Vision', text: 'Green high-end products, high-quality services', image: '/images/fdc4449b-3e36-4d88-89e8-dad85a694dff.jpg' },
    { title: 'Values', text: 'Serve customers, benefit employees, develop enterprises, and contribute to society', image: '/images/afe91872-0ad7-4d8c-9c2c-de67f8951e5a.jpg' },
    { title: 'Philosophy', text: 'Let the market determine the product, let customers recognize the quality', image: '/images/95d57966-b721-417b-a9f1-19ccee001137.jpg' },
    { title: 'Mission', text: 'Safety, excellence, low carbon, environmental protection', image: '/images/1381949f-aef8-4860-a33f-6fdfc0d5bbe0.jpg' },
  ],
};

// Legal-entity disclosure — verified business-registration facts (retrieved 2026-10-25,
// Tianyancha snapshot via Sogou aggregation). Kept separate from brand lineage on purpose:
// the Huiying brand dates to 1996, while the operating legal entity was incorporated 2017-10-10.
export const companyDisclosure = {
  heading: 'Legal entity & registration',
  items: [
    { label: 'Legal name', value: site.companyName },
    { label: 'Chinese name', value: site.companyNameZh },
    { label: 'Unified social credit code', value: site.unifiedSocialCreditCode },
    { label: 'Legal representative', value: site.legalRepresentative },
    { label: 'Incorporated', value: '10 October 2017' },
    { label: 'Registered capital', value: site.registeredCapital },
    { label: 'Registered address', value: site.address },
  ],
  sourceNote:
    'Business-registration data: Tianyancha snapshot aggregated via Sogou (retrieved 2026-10-25). Production figures (facility area, headcount, equipment) are as published in the company\'s own profile.',
  baikeUrl: site.baiduBaikeUrl,
  baikeLabel: 'Company profile on Baidu Baike',
  baikeNote:
    'Baidu Baike company entry — region-blocked (403) on crawl, so the URL is cited as the authoritative reference.',
};

export const brandLineage = {
  heading: 'Brand lineage vs. legal entity',
  text:
    'The Huiying brand traces its roots in Qinghe County\'s filter industry back to 1996, when the founding team began producing filter products. The operating company — Qinghe County Huiying Automotive Parts Co., Ltd. — was incorporated later, on 10 October 2017, with a registered scope covering the manufacturing of automotive parts and components. We keep these two dates distinct on purpose: "since 1996" describes the brand\'s history in the Qinghe filter cluster, while "2017" is the legal-entity incorporation date.',
};

export const factoryInfo = {
  heading: 'How to reach our factory?',
  intro:
    'As long as you tell us the flight number or train number of any of the following places, we will arrange a dedicated car to pick you up to our factory.',
  pickupPoints: [
    'Jinan Yaoqiang International Airport',
    'Jinan West High-speed Railway Station',
    'Xingtai East Station',
  ],
  image: '/images/factory-ai/factory-01-1600x1200.webp',
};

export const marketingInfo = {
  heading: 'Marketing Network',
  text:
    'All employees of the company sincerely welcome guests from all over the world and merchants from all over the world to visit and negotiate business. Based on the corporate philosophy of quality as a survival, we will seek common development and create brilliance with you!',
  image: '/images/44babffb-c530-4321-af90-a0dc846f2960.jpg',
};

export const downloadCenter = {
  heading: 'Download Center',
  files: [
    { name: 'Huiying Automotive Parts — Company Profile', size: '62.6KB', updated: '2024/12/30' },
  ],
};

export const exhibition = {
  heading: 'Exhibition Pictures',
  images: [
    '/images/0a25f6bf-162a-451c-bc3a-3b25c973950d.jpg',
    '/images/c0cff173-d89d-4996-a98d-c8fb2300f84d.jpg',
    '/images/bebfe498-4952-40b6-9330-079aa59f9f4c.jpg',
    '/images/fec96d9d-8dff-42a6-8573-8b1e4cd015ad.jpg',
  ],
};

// Industry & regional background — original editorial content informed by
// publicly available information about Qinghe County's filter/auto-parts cluster.
export const industryBackground = {
  heading: 'Built in China\'s filter-manufacturing heartland',
  paragraphs: [
    'Our factory sits in Qinghe County, Xingtai City, Hebei Province — a region widely recognised as one of China\'s core clusters for automotive filters and related parts. Filter manufacturing here began as early as the 1980s and has since grown into a full supply chain covering filter paper, media processing, rubber and polyurethane sealing, and finished-element assembly.',
    'Being part of this cluster gives practical advantages that translate directly to buyers. Raw materials, tooling and specialised processes are available close by, which shortens lead times and keeps prototyping and batch production flexible. The Beijing-Kowloon Railway and the Qingyin Expressway intersect nearby, forming a logistics network that reaches Beijing, Tianjin, Hebei and Shandong within roughly 300 km — convenient for both domestic distribution and shipment to major ports.',
    'The cluster has also pushed steadily toward greener, smarter production: low-energy equipment, tighter scrap control and growing R&D into high-temperature and long-life filter media for new-energy vehicles. For our part, we combine that regional supply chain with our own clean workshop and testing equipment to turn the cluster\'s advantages into consistent, export-grade quality.',
  ],
  points: [
    'Cluster roots dating back to the 1980s with a complete filter supply chain',
    'Convenient rail and expressway links across the Beijing-Tianjin-Hebei-Shandong region',
    'One-stop sourcing of filter paper, media, sealing and finished elements',
    'Ongoing shift toward green manufacturing and new-energy filter media',
  ],
};

export const exportMarkets = {
  heading: 'Where our products go',
  text: 'Our filters are built for export. We routinely quote for buyers across Asia, the Middle East, Africa, South America and Europe, and we support private-label and OEM-supply programs with consistent batch quality and responsive service. Tell us your target market and OE requirements and we will recommend the right specification.',
  points: [
    'Private-label and OEM supply programs',
    'Mixed-container and multi-SKU orders',
    'OE / cross-reference matching to your market',
    'Consistent batch quality with testing documentation',
  ],
};

// Factory evidence — production process, quality system, equipment and OEM delivery.
// Framework-level and honest: no certificate numbers, test results or specific
// machine counts are invented (audit discipline 4.3). Only the equipment figures
// already published in the company profile (three PU lines, 20+ machines, vacuum
// testing) are referenced.

export const productionProcess = {
  heading: 'Production process',
  intro:
    'Our filter elements move through a standard production flow. The description below is a framework overview of the steps, not a machine-by-machine specification.',
  steps: [
    { title: 'Pleating', text: 'Filter media is folded into even pleats. Consistent fold spacing increases the usable media area and dust-holding capacity, and is checked during production.' },
    { title: 'Bonding & sealing', text: 'The pleated media is bonded to its end caps. On our PU (polyurethane) lines, polyurethane is used to form and seal the end caps so the element seats correctly and does not let unfiltered air or oil bypass the media.' },
    { title: 'Assembly', text: 'The element is assembled into its housing or frame — for example, a spin-on canister for oil filters or a panel frame for air filters.' },
    { title: 'Inspection & testing', text: 'Finished elements are checked for dimensions, sealing and, where applicable, leak or pressure integrity before packing.' },
  ],
};

export const qualitySystem = {
  heading: 'Quality control system',
  intro:
    'Quality is controlled at four gates across the production flow, using an AQL (Acceptable Quality Limit) sampling framework. This is a framework description of our control points; specific limits are set per product and confirmed with the buyer at order time.',
  gates: [
    { code: 'IQC', name: 'Incoming Quality Control', text: 'Inspection of incoming raw materials and filter media before they enter production.' },
    { code: 'IPQC', name: 'In-Process Quality Control', text: 'In-line checks during pleating, bonding and assembly to catch deviation early.' },
    { code: 'FQC', name: 'Final Quality Control', text: 'Inspection of finished elements against dimension, sealing and appearance criteria.' },
    { code: 'OQC', name: 'Outgoing Quality Control', text: 'Pre-shipment inspection and sampling before packing and dispatch.' },
  ],
  aqlNote:
    'Sampling follows an AQL-based framework. The specific AQL level, sample size and defect classification are agreed with the buyer as part of the order specification.',
};

export const equipmentCategories = {
  heading: 'Equipment categories',
  intro:
    'The facility combines the machine types needed for filter production, including the three PU production lines and vacuum-testing equipment described in our company profile, alongside more than twenty specialist machines.',
  items: [
    'Filter-media pleating and folding machines',
    'PU end-cap moulding and bonding lines',
    'Assembly and sealing equipment',
    'Vacuum / leak testing equipment',
    'Measurement and inspection tools',
  ],
};

export const oemDeliveryProcess = {
  heading: 'OEM & private-label delivery process',
  steps: [
    { title: 'Sample confirmation', text: 'We produce a sample against your specification and send it for approval before production begins.' },
    { title: 'Specification freeze', text: 'Once the sample is approved, the specification — dimensions, media, packaging and marking — is frozen and becomes the reference for the batch.' },
    { title: 'Batch identification', text: 'Each production batch carries its own identification so it can be traced to its specification, materials and inspection records.' },
    { title: 'MOQ & lead time', text: 'Minimum order quantity and lead time are set per product and per order, and confirmed in the quotation before the order is placed.' },
  ],
};

// Privacy policy and other legal content now live in src/data/legal.ts (compliance suite).
