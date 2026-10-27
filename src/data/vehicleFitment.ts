// Vehicle fitment & brand association data — reference-level guidance only.
// These are COMMON APPLICATION references, not precise OE cross-references.
// No exact OE numbers are asserted; every fitment must be confirmed against the
// buyer's OE / cross-reference table before ordering. See the disclaimer field.

export interface BrandFitment {
  brand: string;
  region: string;
  models: string[];
  /** Reference-level note on which filter types this brand's vehicles commonly use. */
  filterNote: string;
}

export interface FitmentEntry {
  category: string;
  categoryLabel: string;
  intro: string;
  brands: BrandFitment[];
  disclaimer: string;
}

export const fitmentDisclaimer =
  'Common applications include the models listed below; these are reference-level examples only and do not constitute a precise fitment claim. Always confirm the exact part against your OE number, cross-reference number or our fitment table before ordering.';

const coreBrands = [
  { brand: 'Toyota', region: 'Japan', models: ['Corolla', 'Camry', 'RAV4', 'Hilux', 'Land Cruiser'] },
  { brand: 'Honda', region: 'Japan', models: ['Civic', 'Accord', 'CR-V', 'HR-V', 'City'] },
  { brand: 'Volkswagen', region: 'Germany', models: ['Golf', 'Jetta', 'Passat', 'Tiguan', 'Polo'] },
  { brand: 'BMW', region: 'Germany', models: ['3 Series', '5 Series', 'X3', 'X5', '1 Series'] },
  { brand: 'Mercedes-Benz', region: 'Germany', models: ['C-Class', 'E-Class', 'S-Class', 'GLC', 'Sprinter'] },
  { brand: 'Ford', region: 'USA', models: ['Focus', 'Fiesta', 'F-150', 'Ranger', 'Transit'] },
  { brand: 'Hyundai', region: 'South Korea', models: ['Elantra', 'Tucson', 'Santa Fe', 'i30', 'Accent'] },
  { brand: 'Nissan', region: 'Japan', models: ['Altima', 'Rogue', 'Qashqai', 'Navara', 'Sunny'] },
  { brand: 'Geely', region: 'China', models: ['Emgrand', 'Boyue', 'Coolray', 'Xingyue L', 'Borui'] },
  { brand: 'Great Wall', region: 'China', models: ['Haval H6', 'Haval Jolion', 'Tank 300', 'Poer', 'Haval H9'] },
] as const;

const commercialBrands = [
  { brand: 'Isuzu', region: 'Japan', models: ['D-Max', 'N-Series', 'F-Series'] },
  { brand: 'Foton', region: 'China', models: ['Auman', 'Tunland', 'Aoling'] },
  { brand: 'JAC', region: 'China', models: ['T8', 'Sunray', 'N-Series'] },
] as const;

const noteByType = {
  air: 'Engine air filters are common fitment across virtually all gasoline and diesel vehicles in this range.',
  cabin: 'Cabin (pollen) filters are common fitment on most modern passenger vehicles of this brand.',
  oil: 'Spin-on or cartridge oil filters are common fitment across the service fleet of this brand.',
  fuel: 'In-line or cartridge fuel filters are common fitment, especially on diesel and commercial applications.',
  wiper: 'Wiper blades are sized by length and fitting; these are reference vehicle examples only.',
  brake: 'Ceramic and semi-metallic brake pads are common fitment across the passenger-car fleet of this brand.',
  spark: 'Spark plugs are matched by engine code; these are reference vehicle examples only.',
  hose: 'Rubber hoses (EPDM/NBR/silicone) are matched by circuit and diameter; these are reference vehicle examples only.',
} as const;

function build(category: string, categoryLabel: string, intro: string, noteKey: keyof typeof noteByType, includeCommercial = false): FitmentEntry {
  const brands: BrandFitment[] = coreBrands.map((b) => ({
    brand: b.brand,
    region: b.region,
    models: [...b.models],
    filterNote: noteByType[noteKey],
  }));
  if (includeCommercial) {
    commercialBrands.forEach((b) => brands.push({ brand: b.brand, region: b.region, models: [...b.models], filterNote: noteByType[noteKey] }));
  }
  return { category, categoryLabel, intro, brands, disclaimer: fitmentDisclaimer };
}

export const vehicleFitment: FitmentEntry[] = [
  build(
    'air-filter',
    'Air Filter',
    'Engine air filters are among the most widely replaced service parts. The brands and models below are common application references for engine air filters across passenger, light-commercial and off-highway fleets.',
    'air',
    true,
  ),
  build(
    'cabin-filter',
    'Cabin Filter',
    'Cabin (pollen) filters are standard on the majority of modern vehicles. The references below reflect common applications for cabin air filtration across global and domestic Chinese brands.',
    'cabin',
  ),
  build(
    'oil-filter',
    'Oil Filter',
    'Oil filters are replaced with every engine-oil service. The references below are common application examples for spin-on and cartridge oil filters across the brands we serve.',
    'oil',
    true,
  ),
  build(
    'fuel-filter',
    'Fuel Filter',
    'Fuel filters protect injectors and fuel pumps. Diesel and commercial applications rely on them most heavily. The references below are common application examples.',
    'fuel',
    true,
  ),
  build(
    'wiper',
    'Wiper',
    'Wiper blades are selected by blade length, curvature and connector type. The vehicle references below are examples of common fitment; exact length is confirmed per vehicle.',
    'wiper',
  ),
  build(
    'brake-pads',
    'Brake Pads',
    'Brake pads are matched by OE number to the caliper and platform. The references below are common application examples; the exact pad set is confirmed per OE.',
    'brake',
  ),
  build(
    'spark-plugs',
    'Spark Plugs',
    'Spark plugs are matched by engine code, heat range and thread reach. The references below are common application examples; the exact plug is confirmed per engine.',
    'spark',
  ),
  build(
    'rubber-hoses',
    'Rubber Hoses',
    'Rubber hoses are matched by circuit (coolant, fuel, air), compound and inner diameter. The references below are common application examples; the exact hose is confirmed per application.',
    'hose',
  ),
];

export function getFitment(categorySlug: string): FitmentEntry | undefined {
  return vehicleFitment.find((f) => f.category === categorySlug);
}

/** Total counts used by the enhancement report. */
export function fitmentStats() {
  const brands = new Set<string>();
  const models = new Set<string>();
  let anchorCount = 0;
  for (const f of vehicleFitment) {
    for (const b of f.brands) {
      brands.add(b.brand);
      b.models.forEach((m) => models.add(`${b.brand}::${m}`));
      anchorCount += b.models.length;
    }
  }
  return { brandCount: brands.size, modelCount: models.size, anchorCount };
}
