// SKU page enrichment — original, per-SKU editorial content.
// Because the source site shares one generic description across the air-filter
// line, we differentiate each SKU with original application, selection and
// maintenance guidance. No fabricated specs are asserted.

export interface ProductContent {
  slug: string;
  application: string[]; // original paragraphs: where/how this part is used
  selectionNotes: string[]; // procurement / selection guidance
  maintenance: string[]; // care & replacement guidance
  buyerNote: string; // subjective conclusion / recommendation
}

export const productContent: Record<string, ProductContent> = {
  'of-690': {
    application: [
      'The HY-OF-690 is a spin-on engine oil filter positioned for the passenger-car and light-commercial service market. In service it sits in the lubrication circuit where it traps metal wear particles and carbon sludge carried by the engine oil, protecting the oil pump and the bearing surfaces from abrasive contamination.',
      'As a first-line replacement item, this part is best matched to a specific engine family using the OE or cross-reference number. Our team uses that reference to confirm the thread, seal diameter and bypass-valve specification before quoting, so the part fits and performs as the engine requires.',
    ],
    selectionNotes: [
      'Confirm the spin-on thread and seal size against the engine — a near-match by eye is not a match.',
      'Request the media micron rating and bypass-valve setting when ordering for turbocharged or long-interval engines.',
      'For private-label programs, ask for batch consistency documentation on the canister and seal materials.',
    ],
    maintenance: [
      'Replace the oil filter together with the engine oil at every oil service; a used filter retains old oil and contaminants.',
      'Follow the engine manufacturer\'s service interval, and shorten it in dusty or stop-and-go conditions.',
      'Check the sealing surface is clean and the seal lightly oiled on installation to ensure a leak-free fit.',
    ],
    buyerNote:
      'For a workshop or importer, the oil filter is the highest-frequency consumable in the range — our recommendation is to qualify the media and bypass specification up front, then buy on consistency rather than chasing the lowest unit price.',
  },
  'cf-691': {
    application: [
      'The HY-CF-691 is a cabin air filter intended to keep the air entering the passenger cabin clean of dust, pollen and particulate. It is the component that sits between the outside air intake and the cabin, protecting occupants and the HVAC blower from airborne contamination.',
      'This part is matched to specific panel or frame dimensions by OE reference. We confirm the exact frame type and any activated-carbon option per model year, so the filter seals tightly and does not let unfiltered air bypass around the edges.',
    ],
    selectionNotes: [
      'Confirm whether the application needs a standard particulate filter or an activated-carbon version for odour control.',
      'Check the frame type and dimensions by OE number — cabin filters are sensitive to edge-seal fit.',
      'For resellers, position the carbon version as a premium line and keep the plain version for price-sensitive demand.',
    ],
    maintenance: [
      'Inspect the cabin filter at the same time as the engine air filter and replace roughly once a year.',
      'Replace sooner if airflow from the vents drops, windows fog easily or a musty smell develops.',
      'A clean cabin filter also protects the blower motor from dust build-up over time.',
    ],
    buyerNote:
      'Cabin filters are a fast-moving, price-sensitive line — the winning move for a distributor is to offer a clear good-better-best split (plain versus activated carbon) and sell on air quality rather than price alone.',
  },
  'af-692': {
    application: [
      'The HY-AF-692 is a panel-style engine air filter for passenger-car applications. Its job is to remove dust and suspended particles from intake air before it reaches the combustion chamber, reducing wear on the cylinder, piston and piston-ring surfaces.',
      'As an aftermarket service part, it is matched to the air-cleaner housing of a specific model by OE or cross-reference number. We use that reference to confirm the panel dimensions, pleat count and seal design so the element drops in correctly and seals around the housing.',
    ],
    selectionNotes: [
      'Quote the OE number to confirm the panel dimensions and media area — outer size alone is not enough.',
      'In dusty markets, prioritise pleat consistency and dust-holding capacity over the lowest price.',
      'Ask whether the seal (foam or rubber) is pre-attached and matches the housing lip.',
    ],
    maintenance: [
      'Inspect the element at every oil service and replace it earlier than the nominal interval in dry or dusty conditions.',
      'A darkened or clogged outer surface is a sign to replace, as restricted airflow hurts performance and economy.',
      'Do not tap or blow out a paper element to "clean" it — this can damage the media and let fine dust through.',
    ],
    buyerNote:
      'For panel air filters, the hidden cost of a cheap part lands on the customer\'s engine — our advice is to match the media area and seal by OE and treat pleat consistency as a quality signal.',
  },
  'af-693': {
    application: [
      'The HY-AF-693 is an engine air filter for the intake system, protecting the combustion chamber from abrasive dust. It is specified for applications where intake-air cleanliness directly influences cylinder and piston-ring life.',
      'This part is matched to the vehicle air-cleaner housing by OE or cross-reference. We confirm the filter\'s geometry and media specification per application so the airflow and filtration balance the engine was designed for is maintained.',
    ],
    selectionNotes: [
      'Confirm the element shape (panel or cylindrical) and dimensions against the housing by OE number.',
      'For commercial or high-mileage fleets, prioritise media durability and dust capacity.',
      'Verify the end-cap and seal construction to prevent dust bypass at the sealing face.',
    ],
    maintenance: [
      'Replace according to the service schedule, and shorten the interval in sandy, dry or construction environments.',
      'Watch for rough running, weak acceleration or rising coolant temperature as signs of a blocked element.',
      'Keep the air-cleaner housing sealed and the intake duct free of leaks so unfiltered air cannot enter.',
    ],
    buyerNote:
      'A well-matched air filter is cheap insurance for the engine — we recommend quoting the OE reference and buying on media quality, not on appearance, for this line.',
  },
  'af-698': {
    application: [
      'The HY-AF-698 is an engine air filter for the intake side of the engine. It removes airborne dust before the air reaches the combustion chamber, protecting pistons, cylinders and piston rings from the abrasive wear that shortens engine life.',
      'Matched by OE or cross-reference number, this element is confirmed against the air-cleaner housing dimensions and the required media area. That ensures the engine receives clean air at the designed flow rate without the element collapsing or bypassing.',
    ],
    selectionNotes: [
      'Provide the OE number so the pleat count and media area are matched, not guessed from a photo.',
      'In humid climates, confirm the media resists moisture uptake and the folds do not stick together.',
      'For batch orders, ask for fold-spacing consistency so every unit performs the same.',
    ],
    maintenance: [
      'Inspect at every service; in dusty regions replace the element earlier than the nominal schedule.',
      'A clogged filter enriches the mixture, so replace when the outer surface is visibly loaded or performance drops.',
      'Never run the engine without the air filter in place, even briefly, in dusty conditions.',
    ],
    buyerNote:
      'Fold geometry is where air filters earn their money — buy from a supplier that controls pleat spacing, because consistency is what keeps your customers\' engines protected and your returns low.',
  },
  'af-699': {
    application: [
      'The HY-AF-699 is an engine air filter specified for the intake system of passenger and light-commercial vehicles. It keeps dust and suspended particles out of the combustion chamber, which is the single most effective way to limit bore and ring wear.',
      'We match this element by OE or cross-reference number to confirm the panel or cylindrical dimensions and the media specification for the application, so the filter seals correctly and delivers the intended airflow.',
    ],
    selectionNotes: [
      'Confirm the exact dimensions and seal style against the housing by OE number.',
      'For fleets operating on unpaved roads, prioritise dust-holding capacity and replace on condition.',
      'Ask about the media efficiency target when ordering for engines that must meet emissions or longevity goals.',
    ],
    maintenance: [
      'Replace on the service schedule and shorten the interval in dry, sandy or high-dust environments.',
      'Symptoms of a blocked element include rough idle, slow acceleration and increased fuel consumption.',
      'Ensure the airbox lid and intake duct seal tightly after every filter change.',
    ],
    buyerNote:
      'The air filter is the cheapest protection an engine has — our recommendation is to match it by OE, keep a spare on hand for dusty fleets, and never judge quality by price alone.',
  },
  'af-700': {
    application: [
      'The HY-AF-700 is an engine air filter for the intake system, engineered to remove airborne dust before it reaches the combustion chamber and to protect cylinder and piston components from abrasive wear.',
      'This part is matched to the application by OE or cross-reference number. We use that reference to confirm the element geometry, pleat count and seal design so the filter performs to the engine\'s airflow requirement.',
    ],
    selectionNotes: [
      'Quote the OE or cross-reference number to match the media area and pleat geometry precisely.',
      'For aftermarket resellers, keep the correct cross-reference list handy to reduce ordering errors.',
      'Confirm the seal type (foam, rubber or felt) matches the housing to avoid dust bypass.',
    ],
    maintenance: [
      'Inspect the element at each oil service and replace on condition in dusty environments.',
      'Do not attempt to wash or blow out the paper media — a damaged element lets fine dust through.',
      'Replace the element whenever the air-cleaner housing is serviced or the intake is disturbed.',
    ],
    buyerNote:
      'We advise buyers to treat air-filter sourcing as an engineering decision, not a commodity purchase — a correctly matched element protects the engine and reduces warranty exposure.',
  },
  'af-701': {
    application: [
      'The HY-AF-701 is an engine air filter protecting the intake side of the engine from dust and particulate. Clean intake air is the foundation of cylinder, piston and piston-ring longevity, which is why this part is a routine service item.',
      'Matched by OE or cross-reference number, this element is confirmed against the air-cleaner housing dimensions and media area. That ensures correct sealing and airflow for the specific engine and prevents unfiltered air from entering.',
    ],
    selectionNotes: [
      'Provide the OE number so we match pleat count and media area to the application.',
      'For dry or desert regions, choose an element with high dust-holding capacity and even fold spacing.',
      'Confirm the dimensions rather than relying on model name alone — housings vary by year and engine.',
    ],
    maintenance: [
      'Replace on the service schedule, and inspect more often in high-dust conditions.',
      'A loaded or darkened element should be replaced promptly to maintain airflow and fuel economy.',
      'Keep the intake ducting sealed and free of cracks so unfiltered air cannot bypass the element.',
    ],
    buyerNote:
      'In our experience the air filter is the most underrated service part — buying it by OE match and media quality is the most cost-effective way to protect the engine over its full life.',
  },
  'af-702': {
    application: [
      'The HY-AF-702 is an engine air filter for the intake system of passenger and commercial vehicles. It removes airborne dust before the air reaches the combustion chamber, protecting the cylinder, piston and piston-ring surfaces from abrasive wear.',
      'This element is matched to the vehicle air-cleaner housing by OE or cross-reference number. We confirm the geometry and media specification per application so the filter seals correctly and delivers the airflow the engine requires.',
    ],
    selectionNotes: [
      'Quote the OE number to match the panel or cylindrical dimensions and seal design.',
      'For commercial fleets, prioritise media durability and dust capacity, and replace on condition.',
      'Ask for fold-spacing consistency documentation on large batch orders.',
    ],
    maintenance: [
      'Inspect at every oil service and replace earlier in dry, sandy or construction environments.',
      'Rough running, weak acceleration and rising temperature can all indicate a blocked air filter.',
      'Replace the element and check the housing seal whenever the intake is serviced.',
    ],
    buyerNote:
      'A correctly matched air filter is the cheapest insurance for the engine — we recommend matching by OE and buying on media quality and seal integrity.',
  },
  'af-703': {
    application: [
      'The HY-AF-703 is an engine air filter specified for the intake system, keeping dust and suspended particles out of the combustion chamber to limit cylinder and piston-ring wear.',
      'We match this element by OE or cross-reference number to confirm the air-cleaner housing dimensions, pleat count and seal design, so the filter drops in correctly and maintains the intended airflow and filtration balance.',
    ],
    selectionNotes: [
      'Provide the OE reference so the media area and pleat geometry are matched precisely.',
      'In humid regions, confirm the media resists moisture and the folds do not stick together.',
      'For resellers, maintain an accurate cross-reference list to reduce ordering errors and returns.',
    ],
    maintenance: [
      'Replace on the service schedule and shorten the interval in dusty or off-road conditions.',
      'A visibly loaded or darkened outer surface is a clear sign it is time to replace the element.',
      'Never operate the engine with the air filter removed, even briefly, in a dusty environment.',
    ],
    buyerNote:
      'For this line we advise treating air-filter procurement as an engineering match, not a commodity — a correctly specified element protects the engine and keeps your customers coming back.',
  },
};

export function getProductContent(slug: string): ProductContent | undefined {
  return productContent[slug];
}
