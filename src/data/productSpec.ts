// SKU "Specification & Ordering" table — procurement-level fields.
// Zero-fabrication discipline: per-SKU fields (OE number, cross-reference, material,
// fitment, dimensions) are rendered ONLY when the source catalog provides them.
// Everything else is stated honestly as "Confirm per order specification" rather
// than invented.

export interface SpecRow {
  label: string;
  value: string;
}

export interface CategorySpec {
  slug: string;
  /** Reference-level, honest application wording derived from the product type. */
  vehicleApplication: string;
  /** Reference-level, honest media wording derived from the product type. */
  filterMedia: string;
}

const CONFIRM = 'Confirm per order specification';

const categorySpecs: CategorySpec[] = [
  {
    slug: 'air-filter',
    vehicleApplication: 'Engine air intake — passenger-car and light-commercial applications (confirm per fitment table)',
    filterMedia: 'Pleated filter-paper media (grade confirmed per application)',
  },
  {
    slug: 'cabin-filter',
    vehicleApplication: 'Passenger cabin HVAC air intake (confirm per fitment table)',
    filterMedia: 'Particulate or activated-carbon media (confirmed per order)',
  },
  {
    slug: 'oil-filter',
    vehicleApplication: 'Engine lubrication circuit — spin-on or cartridge (confirm per fitment table)',
    filterMedia: 'Heat-cured filter-paper media (confirmed per application)',
  },
  {
    slug: 'fuel-filter',
    vehicleApplication: 'Fuel delivery system — including diesel water-separator assemblies (confirm per fitment table)',
    filterMedia: CONFIRM,
  },
  {
    slug: 'wiper',
    vehicleApplication: 'Windscreen wiper (confirm per fitment table)',
    filterMedia: CONFIRM,
  },
  {
    slug: 'brake-pads',
    vehicleApplication: 'Front-axle disc brakes — passenger car (confirm per fitment table)',
    filterMedia: 'Ceramic or semi-metallic friction material (confirmed per order)',
  },
  {
    slug: 'spark-plugs',
    vehicleApplication: 'Gasoline engine ignition (confirm per fitment table)',
    filterMedia: 'Iridium / platinum / nickel electrode (confirmed per order)',
  },
  {
    slug: 'rubber-hoses',
    vehicleApplication: 'Cooling, fuel and air-transfer circuits (confirm per application)',
    filterMedia: 'EPDM / NBR / silicone compound (confirmed per order)',
  },
];

export function getCategorySpec(categorySlug: string): CategorySpec | undefined {
  return categorySpecs.find((c) => c.slug === categorySlug);
}

/** Shape of the per-SKU data carried on a product record in products.json. */
export interface ProductData {
  model?: string;
  oeNumbers?: string[] | null;
  crossReference?: string | null;
  material?: string | null;
  dimensions?: string | null;
  fitment?: { brand?: string; models?: string[]; engine?: string | null } | null;
  source?: { name?: string; status?: string; url?: string } | null;
}

/**
 * Build the ordering/spec rows for a given SKU.
 * Per-SKU values (OE, cross-reference, material, fitment) are shown when the
 * source catalog provides them; otherwise the honest "confirm per order" default.
 */
export function getProductSpec(categorySlug: string, product?: ProductData): SpecRow[] {
  const spec = getCategorySpec(categorySlug);
  const fitment = product?.fitment;
  const fitmentValue = fitment?.brand
    ? `${fitment.brand}${fitment.models && fitment.models.length ? ' ' + fitment.models.join(', ') : ''}${fitment.engine ? ` (engine: ${fitment.engine})` : ''}`
    : null;
  return [
    { label: 'OE number', value: product?.oeNumbers?.length ? product.oeNumbers.join(' / ') : CONFIRM },
    { label: 'Cross-reference', value: product?.crossReference || CONFIRM },
    { label: 'Material', value: product?.material || CONFIRM },
    { label: 'Dimensions', value: product?.dimensions || CONFIRM },
    { label: 'Vehicle fitment', value: fitmentValue || CONFIRM },
    { label: 'Vehicle application', value: spec?.vehicleApplication ?? CONFIRM },
    { label: 'Filter media', value: spec?.filterMedia ?? CONFIRM },
    { label: 'MOQ', value: CONFIRM },
    { label: 'Lead time', value: CONFIRM },
    { label: 'OEM & private label', value: 'Available — confirm per order specification' },
    { label: 'Quality documents', value: 'Available on request — confirm per order specification' },
  ];
}
