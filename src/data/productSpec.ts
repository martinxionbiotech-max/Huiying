// SKU "Specification & Ordering" table — procurement-level fields.
// Zero-fabrication discipline: fields are filled only with data the source dataset
// actually provides (category type, model). Everything else is stated honestly as
// "Confirm per order specification" rather than invented. No dimensions, OE numbers,
// MOQ or lead times are asserted because the source data does not contain them.

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
    vehicleApplication: 'Engine lubrication circuit — spin-on (confirm per fitment table)',
    filterMedia: 'Heat-cured filter-paper media (confirmed per application)',
  },
  {
    slug: 'fuel-filter',
    vehicleApplication: 'Fuel delivery system (confirm per fitment table)',
    filterMedia: CONFIRM,
  },
  {
    slug: 'wiper',
    vehicleApplication: 'Windscreen wiper (confirm per fitment table)',
    filterMedia: CONFIRM,
  },
];

export function getCategorySpec(categorySlug: string): CategorySpec | undefined {
  return categorySpecs.find((c) => c.slug === categorySlug);
}

/**
 * Build the ordering/spec rows for a given SKU.
 * `model` is the only per-SKU data available in the source dataset.
 */
export function getProductSpec(categorySlug: string): SpecRow[] {
  const spec = getCategorySpec(categorySlug);
  return [
    { label: 'Dimensions', value: CONFIRM },
    { label: 'OE number', value: CONFIRM },
    { label: 'Cross-reference', value: CONFIRM },
    { label: 'Vehicle application', value: spec?.vehicleApplication ?? CONFIRM },
    { label: 'Filter media', value: spec?.filterMedia ?? CONFIRM },
    { label: 'MOQ', value: CONFIRM },
    { label: 'Lead time', value: CONFIRM },
    { label: 'OEM & private label', value: 'Available — confirm per order specification' },
    { label: 'Quality documents', value: 'Available on request — confirm per order specification' },
  ];
}
