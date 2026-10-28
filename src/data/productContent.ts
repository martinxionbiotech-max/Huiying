// SKU page enrichment — per-SKU original editorial content (quality pass 2).
// Each SKU is de-templated: distinct opening, angle and sentence structure.
// Zero-fabrication: OE numbers, materials, fitment and dimensions stay exactly
// as the source catalog published them. Technical points are public category
// knowledge (structure/material vs performance) — never invented specs.

export interface ProductContent {
  slug: string;
  application: string[];   // where / how this part is used
  scenarios: string[];     // application scenarios: model-level, duty, market adaptation
  technical: string[];     // category-specific structure/material vs performance
  procurement: string[];   // procurement notes + differentiation vs same-category SKUs
  selectionNotes: string[];
  maintenance: string[];
  buyerNote: string;
}

export const productContent: Record<string, ProductContent> = {
  "of-690": {
    application: [
      "The HY-OF-690 is a spin-on engine oil filter built for the passenger-car and light-commercial service market. In service it sits in the lubrication circuit, where it traps the metal wear particles and carbon sludge carried by the oil before either can reach the oil pump, the journals or the bearing shells.",
      "As a first-line consumable it is replaced at every oil service. The correct fit is established from the engine's OE or cross-reference number, which is how we confirm the thread, the seal diameter and the bypass-valve specification — the three details that separate a filter that fits from one that merely looks like it fits.",
    ],
    scenarios: [
      "Passenger cars and light commercials on normal road duty, where the filter is a routine service item replaced with every oil change.",
      "Stop-and-go urban driving and short trips, where moisture and fuel dilution load the oil faster and shorten the effective service life.",
      "Markets with long oil-drain intervals, where the media's dirt-holding capacity must outlast the interval without the bypass opening early.",
    ],
    technical: [
      "A spin-on filter packages the media, a bypass valve and (on most designs) an anti-drain-back valve inside a sealed steel canister, so the whole unit is replaced rather than the media alone.",
      "The bypass valve is the safety element: if the media loads to the point of restriction it opens to keep oil flowing, trading filtration for uninterrupted lubrication in an emergency.",
      "The anti-drain-back valve retains oil in the filter at shut-down so pressure builds faster on the next cold start, protecting the top end from a dry run.",
    ],
    procurement: [
      "For workshops and importers the oil filter is the highest-frequency consumable, so qualify the media and bypass specification up front and buy on batch consistency rather than the lowest unit price.",
      "Unlike the OE-matched Toyota, Honda and Mercedes numbers in this category, the HY-OF-690 is positioned as the generic service entry point — confirm the engine family before ordering, because it carries no single OE anchor.",
    ],
    selectionNotes: [
      "Confirm the spin-on thread and seal size against the engine — a near-match by eye is not a match.",
      "Request the media micron rating and bypass-valve setting when ordering for turbocharged or long-interval engines.",
      "For private-label programs, ask for batch consistency documentation on the canister and seal materials.",
    ],
    maintenance: [
      "Replace the oil filter together with the engine oil at every oil service; a used filter retains old oil and contaminants.",
      "Follow the engine manufacturer's service interval, and shorten it in dusty or stop-and-go conditions.",
      "Check the sealing surface is clean and the seal lightly oiled on installation to ensure a leak-free fit.",
    ],
    buyerNote: "For a workshop or importer, the oil filter is the highest-frequency consumable in the range — qualify the media and bypass specification up front, then buy on consistency rather than chasing the lowest unit price.",
  },
  "cf-691": {
    application: [
      "The HY-CF-691 is a cabin air filter that sits between the outside intake and the passenger compartment, holding back dust, pollen and road particulate before they reach occupants or the blower.",
      "Frame fit and any activated-carbon option are matched to the model rather than guessed. The edge-seal is the deciding quality point, because a filter that rattles or leaks at the frame lets unfiltered air bypass the media.",
    ],
    scenarios: [
      "Passenger cars on the annual cabin-filter replacement cycle, where the filter keeps the HVAC blower clean.",
      "Urban and congested markets, where a carbon version reduces exhaust and diesel odours that a plain particulate filter cannot.",
      "Allergy-sensitive markets, where the filter's pollen and fine-particulate capture is the selling point.",
    ],
    technical: [
      "A plain particulate cabin filter stops dust and pollen, while an activated-carbon layer also adsorbs gases and odours — two different jobs.",
      "The frame must seal tightly at the edges, otherwise unfiltered air bypasses the media around the sides.",
      "Cabin filters also protect the blower motor from dust build-up, which extends the HVAC system's life.",
    ],
    procurement: [
      "For distributors, cabin filters are a fast-moving, price-sensitive line — offer a clear good-better-best split between plain and activated carbon.",
      "Within the cabin-filter category, the HY-CF-691 is the generic entry while the 87139-0N010 carries a Toyota OE anchor — position the generic for price and the OE for coverage.",
    ],
    selectionNotes: [
      "Confirm whether the application needs a plain particulate filter or an activated-carbon version.",
      "Check the frame type and dimensions by OE number, since cabin filters are sensitive to edge-seal fit.",
      "For resellers, position the carbon version as premium and the plain version for price-sensitive demand.",
    ],
    maintenance: [
      "Inspect the cabin filter with the engine air filter and replace roughly once a year.",
      "Replace sooner if airflow drops, windows fog easily or a musty smell develops.",
      "A clean cabin filter also protects the blower motor from dust build-up over time.",
    ],
    buyerNote: "The HY-CF-691 is the generic cabin-filter entry — the winning move for a distributor is a clear good-better-best split (plain versus activated carbon) and selling on air quality rather than price.",
  },
  "af-692": {
    application: [
      "The HY-AF-692 is a panel-type engine air filter that keeps abrasive dust out of the combustion chamber, protecting pistons, rings and bores from the wear that shortens engine life.",
      "As an aftermarket service part it is matched to the air-cleaner housing of a specific model by OE or cross-reference number. Element dimensions, pleat count and the seal design are confirmed before quoting so the element drops in and seals around the housing.",
    ],
    scenarios: [
      "Passenger cars on standard service schedules, where the panel element is replaced at or before the nominal interval.",
      "Dry and dusty markets, where pleat consistency and dust-holding capacity matter more than price.",
      "Humid climates, where the media must resist moisture uptake and the folds must not stick together.",
    ],
    technical: [
      "The panel form is a flat pleated element that seats into the air-cleaner housing, with the seal (foam or rubber) forming the airtight edge.",
      "Even pleat spacing is a production quality signal that prevents the paper from sticking together in humid air (general category knowledge — not a measured performance figure).",
      "Media area and pleat count are matched to the housing, which is what keeps airflow and filtration in balance.",
    ],
    procurement: [
      "For panel air-filter buyers, quote the OE number so pleat count and media area are matched, not guessed from a photo.",
      "Within the air-filter category, the HY-AF-692 is the generic panel entry, distinct from the OE-matched BMW, Mercedes and truck numbers — confirm the housing rather than interchanging.",
    ],
    selectionNotes: [
      "Quote the OE number to confirm the panel dimensions and media area — outer size alone is not enough.",
      "In dusty markets, prioritise pleat consistency and dust-holding capacity over the lowest price.",
      "Ask whether the seal (foam or rubber) is pre-attached and matches the housing lip.",
    ],
    maintenance: [
      "Inspect the element at every oil service and replace earlier than the nominal interval in dry or dusty conditions.",
      "A darkened or clogged outer surface is a sign to replace, as restricted airflow hurts performance and economy.",
      "Do not tap or blow out a paper element to 'clean' it — this can damage the media and let fine dust through.",
    ],
    buyerNote: "For panel air filters, the hidden cost of a cheap part lands on the customer's engine — match the media area and seal by OE and treat pleat consistency as a quality signal.",
  },
  "af-693": {
    application: [
      "The HY-AF-693 is an engine air filter positioned for intake-air cleanliness across a wide passenger fleet.",
      "Because a near-match by eye is not a match, we confirm the element geometry and media specification against the air-cleaner housing rather than relying on appearance.",
    ],
    scenarios: [
      "Passenger and light-commercial fleets where intake-air cleanliness directly influences cylinder and piston-ring life.",
      "Sandy and construction environments, where the element loads faster and is replaced on condition.",
      "Cold-climate markets, where a clean element keeps the mixture correct and cold starts reliable.",
    ],
    technical: [
      "The element shape (panel or cylindrical) is matched to the housing, since the two are not interchangeable.",
      "End-cap and seal construction prevent dust bypass at the sealing face, which is where cheap filters fail.",
      "Media efficiency and dust capacity are the two numbers that decide how long the element protects the bore.",
    ],
    procurement: [
      "For fleet buyers, confirm the element shape and dimensions by OE and prioritise media durability and dust capacity.",
      "Within the air-filter category, the HY-AF-693 is the generic passenger entry, distinct from the OE-anchored numbers — confirm the housing rather than interchanging.",
    ],
    selectionNotes: [
      "Confirm the element shape (panel or cylindrical) and dimensions against the housing by OE number.",
      "For commercial or high-mileage fleets, prioritise media durability and dust capacity.",
      "Verify the end-cap and seal construction to prevent dust bypass at the sealing face.",
    ],
    maintenance: [
      "Replace according to the service schedule, and shorten the interval in sandy, dry or construction environments.",
      "Watch for rough running, weak acceleration or rising coolant temperature as signs of a blocked element.",
      "Keep the air-cleaner housing sealed and the intake duct free of leaks so unfiltered air cannot enter.",
    ],
    buyerNote: "A well-matched air filter is cheap insurance for the engine — quote the OE reference and buy on media quality, not on appearance, for this line.",
  },
  "af-698": {
    application: [
      "The HY-AF-698 is an engine air filter that protects the intake side from airborne dust and suspended particulate.",
      "The element is confirmed by OE or cross-reference against the housing dimensions and the required media area, so airflow and filtration stay in balance.",
    ],
    scenarios: [
      "Passenger cars and light commercials where the air filter is the first defence against bore and ring wear.",
      "Desert and unpaved-road markets, where dust-holding capacity is the deciding quality signal.",
      "Humid climates, where the media must resist moisture uptake and the folds must not stick.",
    ],
    technical: [
      "The pleated media presents a large surface area in a compact panel, which is what balances airflow against filtration.",
      "Fold geometry is the production step that matters most — even spacing prevents sticking and increases dust capacity.",
      "A blocked element restricts airflow, enriches the mixture and causes rough running, so media condition is the maintenance signal.",
    ],
    procurement: [
      "For buyers, provide the OE number so pleat count and media area are matched, not guessed from a photo.",
      "Within the air-filter category, the HY-AF-698 is the generic intake entry, distinct from the OE-anchored numbers — confirm the housing rather than interchanging.",
    ],
    selectionNotes: [
      "Provide the OE number so the pleat count and media area are matched, not guessed from a photo.",
      "In humid climates, confirm the media resists moisture uptake and the folds do not stick together.",
      "For batch orders, ask for fold-spacing consistency so every unit performs the same.",
    ],
    maintenance: [
      "Inspect at every service; in dusty regions replace the element earlier than the nominal schedule.",
      "A clogged filter enriches the mixture, so replace when the outer surface is visibly loaded or performance drops.",
      "Never run the engine without the air filter in place, even briefly, in dusty conditions.",
    ],
    buyerNote: "Fold geometry is where air filters earn their money — buy from a supplier that controls pleat spacing, because consistency keeps customers' engines protected and returns low.",
  },
  "af-699": {
    application: [
      "The HY-AF-699 is an intake air filter for passenger and light-commercial applications where bore and ring wear are the dominant service risk.",
      "We match the panel or cylindrical dimensions and the seal style per application instead of judging by outer size alone.",
    ],
    scenarios: [
      "Passenger and light-commercial fleets where intake-air cleanliness is the single most effective way to limit bore wear.",
      "Unpaved-road and desert markets, where dust-holding capacity matters more than price.",
      "Emissions-sensitive markets, where a clean element keeps the mixture correct and the engine compliant.",
    ],
    technical: [
      "The panel or cylindrical dimensions are confirmed against the housing, since housings vary by year and engine.",
      "The seal style (foam, rubber or felt) is what stops dust bypass at the sealing face.",
      "Media efficiency and dust capacity are the two numbers that decide how long the element protects the bore.",
    ],
    procurement: [
      "For fleet buyers, confirm the dimensions and seal style by OE and prioritise dust-holding capacity.",
      "Within the air-filter category, the HY-AF-699 is the generic passenger entry, distinct from the OE-anchored numbers — confirm the housing rather than interchanging.",
    ],
    selectionNotes: [
      "Confirm the exact dimensions and seal style against the housing by OE number.",
      "For fleets operating on unpaved roads, prioritise dust-holding capacity and replace on condition.",
      "Ask about the media efficiency target when ordering for engines that must meet emissions goals.",
    ],
    maintenance: [
      "Replace on the service schedule and shorten the interval in dry, sandy or high-dust environments.",
      "Symptoms of a blocked element include rough idle, slow acceleration and increased fuel consumption.",
      "Ensure the airbox lid and intake duct seal tightly after every filter change.",
    ],
    buyerNote: "The air filter is the cheapest protection an engine has — match it by OE, keep a spare for dusty fleets, and never judge quality by price alone.",
  },
  "af-700": {
    application: [
      "The HY-AF-700 is an engine air filter engineered for the intake system, removing airborne dust before it can reach the combustion chamber.",
      "Pleat count, seal type and media area are matched by OE or cross-reference number, not by a photograph.",
    ],
    scenarios: [
      "Passenger cars on standard service schedules, where the element is a routine service item.",
      "Dusty and off-road conditions, where the element loads faster and is replaced on condition.",
      "Cold climates, where a clean element keeps cold starts reliable and the mixture correct.",
    ],
    technical: [
      "Pleat count and media area are matched to the housing, which is what keeps airflow and filtration balanced.",
      "The seal type (foam, rubber or felt) prevents dust bypass at the sealing face.",
      "A paper element must never be washed or blown out — damage to the media lets fine dust through.",
    ],
    procurement: [
      "For aftermarket resellers, quote the OE number and keep the correct cross-reference list to reduce ordering errors.",
      "Within the air-filter category, the HY-AF-700 is the generic engine entry, distinct from the OE-anchored numbers — confirm the housing rather than interchanging.",
    ],
    selectionNotes: [
      "Quote the OE or cross-reference number to match the media area and pleat geometry precisely.",
      "For aftermarket resellers, keep the correct cross-reference list handy to reduce ordering errors.",
      "Confirm the seal type (foam, rubber or felt) matches the housing to avoid dust bypass.",
    ],
    maintenance: [
      "Inspect the element at each oil service and replace on condition in dusty environments.",
      "Do not attempt to wash or blow out the paper media — a damaged element lets fine dust through.",
      "Replace the element whenever the air-cleaner housing is serviced or the intake is disturbed.",
    ],
    buyerNote: "Treat air-filter sourcing as an engineering decision, not a commodity purchase — a correctly matched element protects the engine and reduces warranty exposure.",
  },
  "af-701": {
    application: [
      "The HY-AF-701 is an intake air filter that is the foundation of cylinder and piston-ring longevity in the engine bay.",
      "The element is confirmed against the air-cleaner housing dimensions and media area so it seals correctly and passes the designed airflow.",
    ],
    scenarios: [
      "Passenger cars where clean intake air is the foundation of cylinder and piston-ring longevity.",
      "Dry and desert regions, where dust-holding capacity and even fold spacing are the deciding quality signals.",
      "Markets with a wide model mix, where confirming dimensions rather than the model name avoids ordering errors.",
    ],
    technical: [
      "The element is confirmed against the housing dimensions and media area, since housings vary by year and engine.",
      "Pleat count and fold spacing are production quality signals (general category knowledge — not a measured performance figure).",
      "A clean, correctly sealed element keeps the mixture correct and prevents unfiltered air entering.",
    ],
    procurement: [
      "For buyers, provide the OE number so pleat count and media area are matched to the application.",
      "Within the air-filter category, the HY-AF-701 is the generic intake entry, distinct from the OE-anchored numbers — confirm the housing rather than interchanging.",
    ],
    selectionNotes: [
      "Provide the OE number so we match pleat count and media area to the application.",
      "For dry or desert regions, choose an element with high dust-holding capacity and even fold spacing.",
      "Confirm the dimensions rather than relying on model name alone — housings vary by year and engine.",
    ],
    maintenance: [
      "Replace on the service schedule, and inspect more often in high-dust conditions.",
      "A loaded or darkened element should be replaced promptly to maintain airflow and fuel economy.",
      "Keep the intake ducting sealed and free of cracks so unfiltered air cannot bypass the element.",
    ],
    buyerNote: "The air filter is the most underrated service part — buying it by OE match and media quality is the most cost-effective way to protect the engine over its full life.",
  },
  "af-702": {
    application: [
      "The HY-AF-702 is an engine air filter for passenger and commercial intake systems, keeping dust and suspended particles out of the combustion chamber.",
      "We confirm geometry and media specification per application and treat pleat consistency as the quality signal.",
    ],
    scenarios: [
      "Passenger and commercial fleets where intake-air cleanliness protects the bore and rings.",
      "Dry, sandy and construction environments, where the element loads faster and is replaced on condition.",
      "High-mileage fleets, where media durability and dust capacity decide the replacement interval.",
    ],
    technical: [
      "The panel or cylindrical geometry is confirmed against the housing, since the two are not interchangeable.",
      "Pleat consistency is the quality signal — even spacing increases dust capacity and prevents sticking.",
      "Media durability and dust capacity decide how long the element protects the engine between replacements.",
    ],
    procurement: [
      "For commercial fleets, confirm the geometry by OE and prioritise media durability and dust capacity.",
      "Within the air-filter category, the HY-AF-702 is the generic passenger/commercial entry, distinct from the OE-anchored numbers — confirm the housing rather than interchanging.",
    ],
    selectionNotes: [
      "Quote the OE number to match the panel or cylindrical dimensions and seal design.",
      "For commercial fleets, prioritise media durability and dust capacity, and replace on condition.",
      "Ask for fold-spacing consistency documentation on large batch orders.",
    ],
    maintenance: [
      "Inspect at every oil service and replace earlier in dry, sandy or construction environments.",
      "Rough running, weak acceleration and rising temperature can all indicate a blocked air filter.",
      "Replace the element and check the housing seal whenever the intake is serviced.",
    ],
    buyerNote: "A correctly matched air filter is the cheapest insurance for the engine — match by OE and buy on media quality and seal integrity.",
  },
  "af-703": {
    application: [
      "The HY-AF-703 is an engine air filter specified for intake-side protection, limiting cylinder and piston-ring wear caused by abrasive dust.",
      "The element is matched by OE or cross-reference to the housing, pleat count and seal so it drops in correctly the first time.",
    ],
    scenarios: [
      "Passenger cars where intake-side protection limits cylinder and piston-ring wear.",
      "Dusty and off-road conditions, where the element is replaced on condition rather than on a fixed schedule.",
      "Humid regions, where the media must resist moisture and the folds must not stick.",
    ],
    technical: [
      "The element is matched to the housing dimensions, pleat count and seal so it seats and seals correctly.",
      "Media efficiency and dust capacity are the two numbers that decide how long the bore is protected.",
      "A visibly loaded or darkened element is the clear signal that airflow is restricted and replacement is due.",
    ],
    procurement: [
      "For resellers, maintain an accurate cross-reference list to reduce ordering errors and returns.",
      "Within the air-filter category, the HY-AF-703 is the generic intake entry, distinct from the OE-anchored numbers — confirm the housing rather than interchanging.",
    ],
    selectionNotes: [
      "Provide the OE reference so the media area and pleat geometry are matched precisely.",
      "In humid regions, confirm the media resists moisture and the folds do not stick together.",
      "For resellers, maintain an accurate cross-reference list to reduce ordering errors and returns.",
    ],
    maintenance: [
      "Replace on the service schedule and shorten the interval in dusty or off-road conditions.",
      "A visibly loaded or darkened outer surface is a clear sign it is time to replace the element.",
      "Never operate the engine with the air filter removed, even briefly, in a dusty environment.",
    ],
    buyerNote: "Treat air-filter procurement as an engineering match, not a commodity — a correctly specified element protects the engine and keeps your customers coming back.",
  },
  "oil-filter-90915-yzze1": {
    application: [
      "The 90915-YZZE1 is a Toyota-pattern spin-on oil filter listed for the RAV4, Camry, Corolla and Prius, matched to OE 90915-YZZE1 / 90915-YZZJ1 with cross-references 90915-10003, 90915-10001 and 90915-YZZF2.",
      "It sits in the engine lubrication circuit where it removes wear metal and carbon sludge. The thread, seal diameter and bypass-valve setting are confirmed against the OE application before quoting, because those are what make a service-grade filter fit and behave like the genuine part.",
    ],
    scenarios: [
      "Toyota RAV4, Camry, Corolla and Prius owners on standard service schedules, where the filter is replaced at every oil change.",
      "Hybrid applications (Prius and the wider Toyota hybrid family) where oil is shared with stop-start duty and the anti-drain-back behaviour matters for cold-start protection.",
      "High-temperature and stop-and-go urban markets, where a correctly calibrated bypass valve is the difference between filtered oil and unfiltered bypass.",
    ],
    technical: [
      "The source catalogue lists the build as High-Density Filtration Media (a catalog-confirmed material description, not a measured efficiency figure).",
      "The spin-on canister integrates the media, bypass valve and anti-drain-back valve into one replaceable unit, matching the Toyota service pattern.",
      "The cross-reference set (90915-10003, 90915-10001, 90915-YZZF2) spans several Toyota generations, so a single part number covers a wide installed base.",
    ],
    procurement: [
      "For Toyota-focused importers this is a high-volume anchor SKU — confirm the OE number and buy on consistent media and seal quality rather than price alone.",
      "Compared with the generic HY-OF-690, this part carries a verified Toyota OE anchor and a defined cross-reference set, which makes it the easier to spec and to sell against genuine Toyota service parts.",
    ],
    selectionNotes: [
      "Quote the OE 90915-YZZE1 / 90915-YZZJ1 so the thread and seal are matched, not guessed from a photo.",
      "For hybrid models confirm the anti-drain-back valve specification, since those engines cycle the oil more often.",
      "Batch buyers should request the media micron rating and bypass-valve setting in writing.",
    ],
    maintenance: [
      "Replace with the engine oil at every service; a used filter reintroduces old oil and contaminants into fresh oil.",
      "Shorten the interval in dusty or stop-and-go conditions rather than reading a generic mileage table.",
      "Lightly oil the seal and confirm the canister is hand-tight plus the specified turn on installation.",
    ],
    buyerNote: "For a Toyota-focused importer the 90915-YZZE1 is an anchor volume SKU with a clean OE story — confirm the number, then buy on media and seal consistency, not the lowest quote.",
  },
  "fuel-filter-500fh": {
    application: [
      "The 500FH is a diesel fuel water separator matched to OE 500FH / 500FG.",
      "It removes particulate and free water before either reaches the injectors and high-pressure pump. The filtration rating and water-separation capability are the procurement checks for common-rail protection.",
    ],
    scenarios: [
      "Common-rail diesel light-commercial and passenger applications, where injector protection is the whole point of the part.",
      "Markets with variable diesel quality, where water and particulate loading are higher and the separator earns its cost.",
      "Fleets running long intervals, where a filter that catches both particulate and water pays for itself in injector life.",
    ],
    technical: [
      "Water separation works by coalescing free water droplets so they settle out of the fuel, protecting injectors from corrosion and wear.",
      "The filtration rating determines how fine a particle is stopped before it reaches the common-rail injector, whose clearances are tightest in the fuel system.",
      "A matched 500FH / 500FG number set covers the assembly's two common references, which is why the fitting style must be confirmed per application.",
    ],
    procurement: [
      "For diesel importers this is a water-separator anchor SKU — require the micron rating and water-separation capability in writing, because those are what protect injectors.",
      "Within the fuel-filter category, the 500FH is the smaller water-separator assembly, distinct from the 900FG / 1000FH higher-flow assemblies and the Toyota 23390 in-tank number — confirm the flow and fitting per application.",
    ],
    selectionNotes: [
      "Quote the OE 500FH / 500FG and confirm the inlet/outlet fitting style and flow rating.",
      "Require the micron rating and water-separation capability in writing for diesel programs.",
      "Confirm the drain arrangement (manual or automatic) for the target installation.",
    ],
    maintenance: [
      "Replace on the diesel service schedule, and shorten it in markets with variable fuel quality.",
      "Drain accumulated water from the separator bowl on schedule to keep separation effective.",
      "Bleed or prime the system correctly after replacement to avoid air in the fuel line.",
    ],
    buyerNote: "The 500FH is a diesel water-separator anchor — require the micron rating and water-separation capability in writing, because those two numbers are what protect the injectors and the pump.",
  },
  "rubber-hoses-premium-nbr-nitrile-rubber-hose-china-factory-and": {
    application: [
      "The HY-RH-603 is a nitrile butadiene (NBR/Buna-N) rubber hose for oil and fuel transfer circuits.",
      "The compound's oil resistance is the reason to choose it over EPDM, and reinforcement plus inner diameter are confirmed per application.",
    ],
    scenarios: [
      "Fuel and oil transfer lines, where NBR's oil resistance is the deciding factor over EPDM.",
      "Under-bonnet circuits where oil mist and fuel contact are routine.",
      "Markets with hot climates, where NBR holds up under oil at temperature.",
    ],
    technical: [
      "NBR (Buna-N) resists oil and fuel, which is what makes it the fuel-line and oil-transfer compound.",
      "Reinforcement (fabric or braided) lets the hose hold pressure and vacuum without collapsing.",
      "Inner diameter and reinforcement are confirmed per application, since a hose that swells or hardens under oil is a premature-failure risk.",
    ],
    procurement: [
      "For hose importers this is the NBR fuel/oil line — specify the compound, working temperature and inner diameter up front.",
      "Within the rubber-hoses category, the HY-RH-603 is the NBR entry, distinct from the EPDM coolant lines and the silicone heat lines — confirm the fluid and temperature rather than interchanging.",
    ],
    selectionNotes: [
      "Specify NBR for oil and fuel, and confirm the inner diameter and reinforcement.",
      "State the working temperature, since NBR has a lower heat ceiling than silicone.",
      "Request the dimensional tolerance on the inner diameter for batch orders.",
    ],
    maintenance: [
      "Inspect for swelling, hardening or cracks, which signal the hose is degrading in oil service.",
      "Replace on a time or mileage schedule rather than waiting for failure.",
      "Confirm the clamp is tight and the hose is not kinked at the bend.",
    ],
    buyerNote: "The HY-RH-603 is the NBR fuel/oil hose — specify the compound, temperature and inner diameter up front, because material is the first procurement check.",
  },
  "air-filter-17801-30070": {
    application: [
      "The 17801-30070 is a Toyota OE-pattern engine air filter (catalog-confirmed) matched to OE 17801-30070 (cross-reference 1780130070), built with PP and non-woven fabric.",
      "The element removes dust and sand from intake air, with pleat spacing and media area matched to the air-cleaner housing for the designed airflow.",
    ],
    scenarios: [
      "Toyota models on standard service schedules, where the element is a routine replacement.",
      "Dusty and desert markets, where sand loading is the dominant service risk and pleat consistency matters.",
      "High-mileage fleets, where dust-holding capacity decides the replacement interval.",
    ],
    technical: [
      "The source catalogue lists the build as PP and non-woven fabric (a catalog-confirmed material description).",
      "Pleat spacing and media area are matched to the air-cleaner housing for the designed airflow.",
      "The cross-reference 1780130070 ties this part to the Toyota application's second common number.",
    ],
    procurement: [
      "For Toyota importers this is an OE-anchored air filter — confirm the OE pair and buy on pleat consistency.",
      "Within the air-filter category, the 17801-30070 is the Toyota-specific entry, distinct from the generic HY-AF line and the truck numbers — confirm the application rather than interchanging.",
    ],
    selectionNotes: [
      "Quote the OE 17801-30070 / 1780130070 so the media area and pleat geometry are matched.",
      "In dusty markets, prioritise pleat consistency and dust-holding capacity.",
      "Confirm the seal design matches the Toyota housing lip.",
    ],
    maintenance: [
      "Replace on the service schedule and shorten the interval in dusty conditions.",
      "A darkened or clogged outer surface is the sign to replace.",
      "Do not tap or blow out the element to clean it — this damages the media.",
    ],
    buyerNote: "The 17801-30070 is a Toyota OE-anchored air filter — confirm the number, then buy on pleat consistency and dust-holding capacity rather than price.",
  },
  "air-filter-17801-21050": {
    application: [
      "The 17801-21050 is a Toyota Corolla, Avensis and Auris engine air filter matched to OE 17801-21050 (cross-reference 17801-0M020, 17801-0T020, 17801-0T030), built with non-woven fabric.",
      "Housing dimensions and seal design are confirmed so the element drops in and seals around the lip.",
    ],
    scenarios: [
      "Toyota Corolla, Avensis and Auris models on standard service schedules.",
      "Urban and highway duty, where a clean element keeps the mixture correct and economy up.",
      "Dusty markets, where the non-woven fabric's dust capacity matters.",
    ],
    technical: [
      "The source catalogue lists the build as non-woven fabric (a catalog-confirmed material description).",
      "The cross-reference set (17801-0M020, 17801-0T020, 17801-0T030) spans the Corolla/Avensis/Auris platform.",
      "Seal design is confirmed against the housing lip so the element seals without bypass.",
    ],
    procurement: [
      "For Toyota importers this is the Corolla/Avensis/Auris air filter — confirm the OE and cross-reference set.",
      "Within the air-filter category, the 17801-21050 covers the Corolla family, distinct from the 17801-30070 and the generic HY-AF line — confirm the application rather than interchanging.",
    ],
    selectionNotes: [
      "Quote the OE 17801-21050 and the cross-reference set for the Corolla/Avensis/Auris platform.",
      "Confirm the seal design matches the housing lip.",
      "In dusty markets, prioritise dust-holding capacity.",
    ],
    maintenance: [
      "Replace on the service schedule and shorten the interval in dusty conditions.",
      "A darkened or clogged outer surface is the sign to replace.",
      "Keep the airbox lid and intake duct sealed after every change.",
    ],
    buyerNote: "The 17801-21050 is the Corolla-family Toyota air filter — confirm the OE and cross-reference set, then buy on seal fit and dust capacity.",
  },
  "oil-filter-lf14000nn": {
    application: [
      "The LF14000NN is a heavy-duty truck engine oil filter matched to OE LF14000NN, built for the extended oil-drain fleets that run commercial trucks and off-highway equipment.",
      "It sits in the lubrication circuit of a high-displacement diesel, holding back the soot, wear metal and sludge those engines generate between long service intervals. Canister integrity, media capacity and bypass setting are confirmed per application.",
    ],
    scenarios: [
      "Long-haul trucks and buses running extended oil-drain intervals, where the filter must hold contaminant for far longer than a passenger filter.",
      "Off-highway and construction equipment working in dust and heat, where soot loading and thermal stress are both elevated.",
      "Cold-climate cold starts, where a correctly calibrated bypass valve keeps oil flowing until the media warms and flows normally.",
    ],
    technical: [
      "The heavy-duty canister is built to survive the higher pressure and vibration of a commercial diesel, unlike a light-passenger spin-on.",
      "Heavy-duty filters use a larger media area than a light-passenger spin-on (general category knowledge); no measured dirt-holding figure is published for this SKU.",
      "A bypass valve is a general design element of a spin-on filter; the bypass setting for this SKU is pending and must be confirmed per application.",
    ],
    procurement: [
      "For fleet and truck-parts distributors, qualify the burst rating and the media capacity, then buy on batch consistency — a truck filter failure is far costlier than a passenger one.",
      "Against the passenger oil filters in this category, the LF14000NN is the heavy-duty end: confirm the exact LF14000NN application, since it is not interchangeable with the smaller spin-on numbers.",
    ],
    selectionNotes: [
      "Confirm the OE LF14000NN match and the bypass setting — a truck filter's bypass is calibrated to a specific oil system.",
      "Ask for the burst-pressure rating and the media dirt-holding capacity in writing for fleet programs.",
      "Verify the gasket and canister finish for corrosion resistance if the fleet operates in humid or coastal regions.",
    ],
    maintenance: [
      "Replace at the fleet's oil-drain interval, and do not extend it beyond what the oil and filter are rated to hold.",
      "Inspect the drained filter and oil for signs of soot over-loading, which points to a shortened interval.",
      "Clean the mounting surface and confirm the seal seats squarely before torquing to specification.",
    ],
    buyerNote: "The LF14000NN is the heavy-duty end of the oil-filter range — for fleet buyers the burst rating and media capacity are the two numbers to pin down in writing before committing to volume.",
  },
  "oil-filter-15400-plc-004": {
    application: [
      "The 15400-PLC-004 is a Honda engine oil filter matched to OE 15400-PLC-004 / 15400-PLC-003, with a broad cross-reference including 15400-PLM-A02, 15400-RTA-003 and 15400-PH1-003.",
      "It lives in the Honda lubrication circuit where it removes wear metal and carbon sludge. The spin-on thread, seal, media efficiency and anti-drain-back behaviour are confirmed against the Honda application before quoting.",
    ],
    scenarios: [
      "Honda passenger cars on standard service schedules, where the filter is a routine replacement at every oil change.",
      "High-revving Honda petrol engines, where consistent oil pressure and filtration protect the valvetrain and bearings under sustained load.",
      "Urban and stop-and-go markets, where the anti-drain-back valve keeps oil at the top end between short trips.",
    ],
    technical: [
      "The spin-on design integrates media, bypass valve and anti-drain-back valve in one replaceable canister, matching the Honda service pattern.",
      "The wide cross-reference (15400-PLM-A02, 15400-RTA-003, 15400-PH1-003 and others) means one part number covers several Honda platforms, which is why thread and seal confirmation is the first check.",
      "The source catalogue lists the OE and cross-reference set; media efficiency and bypass setting are pending and must be confirmed per application.",
    ],
    procurement: [
      "For Honda-focused importers this is a cross-platform volume SKU — confirm the OE and cross-reference set, then buy on media and seal consistency.",
      "Unlike the generic HY-OF-690, this part carries a verified Honda OE anchor and a defined interchange list, which makes it the easier to quote against genuine Honda service parts.",
    ],
    selectionNotes: [
      "Quote the OE 15400-PLC-004 / 15400-PLC-003 so the thread and seal are matched to the Honda platform.",
      "Confirm the anti-drain-back valve specification for cold-start and short-trip protection.",
      "For batch orders, request the media micron rating and bypass-valve setting in writing.",
    ],
    maintenance: [
      "Replace with the engine oil at every service; reusing a loaded filter puts old oil back into fresh oil.",
      "Shorten the interval in dusty or stop-and-go driving rather than following a generic mileage table.",
      "Lightly oil the seal and confirm the canister is tightened to the specified turn, not over-torqued.",
    ],
    buyerNote: "The 15400-PLC-004 is a cross-platform Honda volume SKU — its value to an importer is the clean OE anchor plus a defined interchange list, so buy on media and seal consistency rather than price.",
  },
  "fuel-filter-ff5507": {
    application: [
      "The FF5507 is a diesel fuel filter matched to OE FF5507.",
      "It removes particulate upstream of the injectors and high-pressure pump, where a tight filtration rating is what protects common-rail hardware from abrasive wear.",
    ],
    scenarios: [
      "Common-rail diesel applications where injector protection is the entire point of the part.",
      "Markets with variable fuel quality, where particulate loading is higher and the filter must work harder.",
      "Fleet and commercial diesel, where a tight filtration rating protects expensive common-rail hardware.",
    ],
    technical: [
      "The filtration rating sets the finest particle the filter stops, matched to the clearances of a common-rail injector.",
      "Common-rail systems are the most contaminant-sensitive part of the fuel system, which is why the rating matters more than canister size.",
      "The FF5507 is a specific-number filter, so inlet/outlet style and flow rating are confirmed per application rather than assumed.",
    ],
    procurement: [
      "For diesel importers, require the micron rating in writing — it is the single most important number on this part.",
      "Within the fuel-filter category, the FF5507 is the particulate-specific entry, distinct from the 500FH / 900FG / 1000FH water-separator assemblies and the Toyota 23390 number — confirm the application rather than interchanging.",
    ],
    selectionNotes: [
      "Quote the OE FF5507 and confirm the inlet/outlet fitting style and flow rating.",
      "Require the micron rating in writing for diesel programs.",
      "Confirm whether the target application also needs water separation or is particulate-only.",
    ],
    maintenance: [
      "Replace on the diesel service schedule, and shorten it in markets with variable fuel quality.",
      "Bleed or prime the system correctly after replacement to avoid air in the line.",
      "Inspect the drained filter for signs of water or heavy particulate, which points to a shorter interval.",
    ],
    buyerNote: "The FF5507 is the particulate-specific diesel filter — the micron rating is the one number to pin down in writing, because it is what protects the common-rail injectors.",
  },
  "air-filter-03-42776-010": {
    application: [
      "The 03-42776-010 is a Freightliner Cascadia / Detroit Diesel truck air filter matched to OE 03-42776-010 / 0342776010 (cross-reference P320510 / 91559 / 997879).",
      "Dust-holding capacity and pleat consistency matter most on a commercial intake, so media area is matched per application.",
    ],
    scenarios: [
      "Freightliner Cascadia and Detroit Diesel trucks on long-haul duty, where the element loads with road dust over long distances.",
      "Construction and off-highway duty, where dust loading is heavy and replacement is on condition.",
      "Fleet operations, where dust-holding capacity decides the replacement interval and the total cost per kilometre.",
    ],
    technical: [
      "A commercial truck air filter uses a larger media area than a passenger element (general category knowledge); no measured dust-holding figure is published.",
      "Pleat consistency and media area are production quality signals (general category knowledge — not a measured performance figure).",
      "The cross-reference set (P320510, 91559, 997879) spans the truck application's several numbering systems.",
    ],
    procurement: [
      "For truck-parts distributors, prioritise dust-holding capacity and pleat consistency, and confirm the cross-reference set.",
      "Within the air-filter category, the 03-42776-010 is the Freightliner/Detroit truck entry, distinct from the passenger OE numbers and the generic HY-AF line — confirm the application rather than interchanging.",
    ],
    selectionNotes: [
      "Quote the OE 03-42776-010 / 0342776010 and the cross-reference set for the truck application.",
      "For fleet programs, request the dust-holding capacity and pleat-consistency documentation.",
      "Confirm the seal and housing fit for the Cascadia / Detroit Diesel intake.",
    ],
    maintenance: [
      "Replace on the fleet's service schedule, and shorten it in heavy dust.",
      "A clogged element restricts airflow and raises fuel consumption on a diesel.",
      "Keep the air-cleaner housing sealed and the intake duct free of leaks.",
    ],
    buyerNote: "The 03-42776-010 is the Freightliner/Detroit truck air filter — dust-holding capacity and pleat consistency are the two numbers that decide a fleet's cost per kilometre.",
  },
  "rubber-hoses-17127525023": {
    application: [
      "The 17127525023 is a BMW upper radiator hose matched to OE 17127525023 in high-grade EPDM for coolant service.",
      "EPDM's water-and-glycol resistance is what suits it to the radiator circuit, with diameter and elbow geometry confirmed against the OE number.",
    ],
    scenarios: [
      "BMW cooling circuits on the upper radiator run, where the hose carries hot coolant under pressure.",
      "Markets with hot climates, where coolant temperatures cycle hard and the hose must resist heat ageing.",
      "Fleet and enthusiast BMW service, where an OE-matched hose fits the routing without kinking.",
    ],
    technical: [
      "EPDM resists water and glycol, which is why it is the standard coolant-circuit compound.",
      "The upper radiator hose runs the highest coolant temperature in the system, so heat ageing resistance matters.",
      "Matching the OE 17127525023 confirms the diameter and elbow geometry so the hose routes correctly without kinking.",
    ],
    procurement: [
      "For BMW importers this is the OE-anchored coolant hose — confirm the OE number and the elbow geometry, then buy on EPDM compound consistency.",
      "Within the rubber-hoses category, the 17127525023 is the specific BMW OE line, distinct from the generic EPDM and silicone lines — confirm the number rather than interchanging.",
    ],
    selectionNotes: [
      "Quote the OE 17127525023 and confirm the diameter and elbow geometry.",
      "Confirm the EPDM compound and the working pressure rating.",
      "Check the clamp and fitting compatibility for the target BMW model.",
    ],
    maintenance: [
      "Inspect the upper radiator hose at every service for swelling, hardening or soft spots.",
      "Replace on a time or mileage schedule rather than waiting for failure.",
      "Bleed the cooling system correctly after replacement to avoid air pockets.",
    ],
    buyerNote: "The 17127525023 is the OE-anchored BMW coolant hose — confirm the number and elbow geometry, then buy on EPDM compound consistency.",
  },
  "air-filter-re596317": {
    application: [
      "The RE596317 is a John Deere E-series air filter matched to OE RE596317 / RE596318.",
      "In agricultural duty the element faces heavy dust, so pleat spacing and dust-holding capacity are the quality signals we confirm against the application.",
    ],
    scenarios: [
      "John Deere E-series agricultural equipment working in field dust, where loading is far heavier than on-road.",
      "Harvest and tillage seasons, where the element loads fastest and is replaced on condition.",
      "Off-highway equipment, where a blocked element restricts airflow and hurts engine output.",
    ],
    technical: [
      "Agricultural air filters use a large media area (general category knowledge); no measured dust-holding figure is published for this SKU.",
      "Pleat spacing is the production detail that keeps dust capacity uniform across a batch.",
      "The RE596317 / RE596318 pairing covers the John Deere E-series application's two references.",
    ],
    procurement: [
      "For agricultural equipment distributors, prioritise dust-holding capacity and pleat consistency over price.",
      "Within the air-filter category, the RE596317 is the John Deere agricultural entry, distinct from the truck and passenger numbers — confirm the application rather than interchanging.",
    ],
    selectionNotes: [
      "Quote the OE RE596317 / RE596318 for the John Deere E-series application.",
      "Prioritise dust-holding capacity and pleat consistency for agricultural duty.",
      "Confirm the seal and housing fit for the equipment's intake.",
    ],
    maintenance: [
      "Replace on condition in heavy field dust, and shorten the interval during harvest season.",
      "A clogged element restricts airflow and hurts diesel engine output.",
      "Keep the air-cleaner housing sealed and the intake free of debris.",
    ],
    buyerNote: "The RE596317 is the John Deere agricultural air filter — in field dust, dust-holding capacity and pleat consistency are the two details that decide how often the element must be replaced.",
  },
  "brake-pads-04465-04030": {
    application: [
      "The 04465-04030 is a ceramic front brake pad set matched to OE 04465-04030 / 04465-0K020 for Toyota platforms.",
      "Friction formulation, backing-plate fit and the completeness of the noise and hardware kit determine pedal feel, disc life and return rate, so set contents are confirmed per application.",
    ],
    scenarios: [
      "Toyota passenger cars and SUVs on front-axle disc brakes, where a ceramic pad runs quieter and cooler with less dust.",
      "Urban and premium segments, where low dust and low noise are the selling points.",
      "Markets with heavy braking or hills, where the pad's heat tolerance must keep up with the duty cycle.",
    ],
    technical: [
      "Ceramic compounds use ceramic fibres and fillers that run quieter, cooler and with less dust than semi-metallic, at a slight trade in cold bite.",
      "The backing plate must fit the caliper precisely, otherwise the pad binds or rattles and the pedal feel suffers.",
      "The noise and hardware kit (shims, springs, anti-rattle clips) is what stops post-installation noise and judder complaints.",
    ],
    procurement: [
      "For Toyota importers this is the ceramic front-pad set — confirm the full hardware kit is included, since a pad that ships without it generates returns.",
      "Within the brake-pad category, the 04465-04030 and the 04465-0K020 cover the same Toyota platform's two reference sets — keep them aligned by OE so customers get the exact fit.",
    ],
    selectionNotes: [
      "Quote the OE 04465-04030 / 04465-0K020 and confirm the caliper platform.",
      "Confirm the noise and hardware kit is included in the box.",
      "Request the friction formulation (ceramic vs semi-metallic) in writing.",
    ],
    maintenance: [
      "Bed the new pads in over the first few hundred kilometres to transfer an even friction film.",
      "Inspect pad thickness at every service and replace before the friction material reaches minimum thickness.",
      "Check the discs for scoring or uneven wear when the pads are replaced.",
    ],
    buyerNote: "The 04465-04030 is a Toyota ceramic front-pad set — confirm the full hardware kit is included, and sell it on low dust and low noise for the premium segment.",
  },
  "oil-filter-35330-08010": {
    application: [
      "The 35330-08010 is an automatic-transmission oil filter listed for Toyota and Lexus, matched to OE 35330-08010 / 58010.",
      "Unlike an engine oil filter it lives inside the transmission pan, where it holds back the clutch-wear debris and fine particulate that circulate with the ATF. Pickup geometry, seal seating and media are confirmed against the transmission application.",
    ],
    scenarios: [
      "Toyota and Lexus automatic transmissions serviced on the ATF change interval, where the filter is replaced when the pan is dropped.",
      "High-mileage transmissions where clutch debris accumulates faster and a clean filter protects the valve body and solenoids.",
      "Markets with high ambient heat, where ATF degradation is faster and the filter's role in keeping fluid clean is more critical.",
    ],
    technical: [
      "The transmission filter sits in the pan rather than on the block, so its pickup and seal seating are matched to the pan rather than to a spin-on thread.",
      "It typically uses a finer media than an engine filter because transmission components — valve bodies and solenoids — are more sensitive to fine particulate.",
      "Because it is only replaced when the pan is dropped, the filter is usually serviced together with the ATF and the pan gasket as one job.",
    ],
    procurement: [
      "For Toyota/Lexus transmission specialists, this part rides on the ATF service job — bundle it with the pan gasket and fluid to win the full service sale.",
      "Within the oil-filter category this is the transmission-specific entry, distinct from the engine spin-on numbers: confirm 35330-08010 rather than treating it as an engine-filter interchange.",
    ],
    selectionNotes: [
      "Confirm OE 35330-08010 / 58010 and the transmission model before ordering — transmission filters are pan-specific.",
      "Check whether the kit should include the pan gasket or seal, since the two are usually replaced together.",
      "Request the media type and the pickup/seal geometry confirmation for the target transmission.",
    ],
    maintenance: [
      "Replace at the ATF service interval, normally when the pan is dropped for a fluid change.",
      "Use the correct ATF and follow the manufacturer's fill and level procedure after service.",
      "Inspect the old filter and fluid for excess debris, which can indicate deeper transmission wear.",
    ],
    buyerNote: "The 35330-08010 is a transmission service part rather than an engine filter — its sales value sits in the full ATF service job, so bundle it with the gasket and fluid and confirm the pan application up front.",
  },
  "air-filter-04e129620": {
    application: [
      "The 04E129620 is a VW air intake filter matched to OE 04E129620 / L04E129620D, built with PU and filter paper.",
      "The PU frame seals against the airbox and the paper pleats do the filtering, with dimensions and seal confirmed against the Volkswagen application.",
    ],
    scenarios: [
      "Volkswagen petrol models on standard service schedules, where the element is a routine replacement.",
      "Urban and highway duty, where a clean element keeps the mixture correct.",
      "Dusty markets, where the paper pleats' dust capacity matters.",
    ],
    technical: [
      "The PU frame seals against the airbox, while the paper pleats do the filtering.",
      "The PU frame's dimensional accuracy is what stops dust bypass at the sealing face.",
      "The OE pair 04E129620 / L04E129620D covers the VW application's two common references.",
    ],
    procurement: [
      "For VW importers this is the OE-anchored air intake filter — confirm the OE pair and the PU frame fit.",
      "Within the air-filter category, the 04E129620 is the VW entry, distinct from the BMW, Mercedes and Toyota numbers — confirm the application rather than interchanging.",
    ],
    selectionNotes: [
      "Quote the OE 04E129620 / L04E129620D for the VW application.",
      "Confirm the PU frame dimensions and seal fit against the airbox.",
      "Request the paper media grade for the target engine.",
    ],
    maintenance: [
      "Replace on the service schedule and shorten the interval in dusty conditions.",
      "A darkened or clogged element is the sign to replace.",
      "Keep the airbox sealed and the intake free of leaks.",
    ],
    buyerNote: "The 04E129620 is the VW OE air intake filter — confirm the number and the PU frame fit, then buy on media and seal quality.",
  },
  "air-filter-16546-ed000": {
    application: [
      "The 16546-ED000 is a Nissan Tiida, NV200 and March air filter matched to OE 16546-ED000 (cross-reference 16546-ED500), built with PU and high-grade filter paper.",
      "Element geometry and seal are confirmed so the filter fits the Nissan airbox without bypass.",
    ],
    scenarios: [
      "Nissan Tiida, NV200 and March models on standard service schedules.",
      "Urban delivery and light-commercial NV200 duty, where the element loads with road dust.",
      "Dusty markets, where the high-grade paper's dust capacity matters.",
    ],
    technical: [
      "The PU frame seals against the airbox, while the high-grade paper pleats do the filtering.",
      "The cross-reference 16546-ED500 ties this part to the Nissan platform's second common number.",
      "Element geometry is confirmed so the filter drops in and seals without bypass.",
    ],
    procurement: [
      "For Nissan importers this is the Tiida/NV200/March air filter — confirm the OE and cross-reference.",
      "Within the air-filter category, the 16546-ED000 is the Nissan entry, distinct from the other OE numbers and the generic HY-AF line — confirm the application rather than interchanging.",
    ],
    selectionNotes: [
      "Quote the OE 16546-ED000 / 16546-ED500 for the Tiida/NV200/March platform.",
      "Confirm the PU frame and seal fit against the Nissan airbox.",
      "Request the paper media grade for the target engine.",
    ],
    maintenance: [
      "Replace on the service schedule and shorten the interval in dusty conditions.",
      "A darkened or clogged element is the sign to replace.",
      "Keep the airbox sealed and the intake free of leaks.",
    ],
    buyerNote: "The 16546-ED000 is the Nissan Tiida/NV200/March air filter — confirm the OE and cross-reference, then buy on PU frame fit and paper grade.",
  },
  "air-filter-1500a098": {
    application: [
      "The 1500A098 is a Mitsubishi engine air filter matched to OE 1500A098 (cross-reference 1500A358), built with PP and non-woven fabric.",
      "Pleat count and media area are matched to the Mitsubishi air-cleaner housing for the designed airflow.",
    ],
    scenarios: [
      "Mitsubishi petrol models on standard service schedules.",
      "Urban and highway duty, where a clean element keeps the mixture correct.",
      "Dusty markets, where the PP and non-woven fabric's dust capacity matters.",
    ],
    technical: [
      "The source catalogue lists the build as PP and non-woven fabric (a catalog-confirmed material description).",
      "The cross-reference 1500A358 ties this part to the Mitsubishi platform's second common number.",
      "Pleat count and media area are matched to the air-cleaner housing for the designed airflow.",
    ],
    procurement: [
      "For Mitsubishi importers this is the OE-anchored air filter — confirm the OE and cross-reference.",
      "Within the air-filter category, the 1500A098 is the Mitsubishi entry, distinct from the other OE numbers and the generic HY-AF line — confirm the application rather than interchanging.",
    ],
    selectionNotes: [
      "Quote the OE 1500A098 / 1500A358 for the Mitsubishi platform.",
      "Confirm the media area and pleat geometry against the housing.",
      "Request the media grade for the target engine.",
    ],
    maintenance: [
      "Replace on the service schedule and shorten the interval in dusty conditions.",
      "A darkened or clogged element is the sign to replace.",
      "Keep the airbox sealed and the intake free of leaks.",
    ],
    buyerNote: "The 1500A098 is the Mitsubishi OE air filter — confirm the number and cross-reference, then buy on media area and pleat geometry.",
  },
  "air-filter-17220-5r0-008": {
    application: [
      "The 17220-5R0-008 is a Honda air filter matched to OE 17220-5R0-008 (cross-reference 17220-5RO-008), built with PP and non-woven fabric.",
      "The element is confirmed against the Honda airbox dimensions and seal so it seals correctly and passes the designed airflow.",
    ],
    scenarios: [
      "Honda models on standard service schedules, where the element is a routine replacement.",
      "High-revving Honda engines, where a clean element keeps the mixture correct under load.",
      "Dusty markets, where the PP and non-woven fabric's dust capacity matters.",
    ],
    technical: [
      "The source catalogue lists the build as PP and non-woven fabric (a catalog-confirmed material description).",
      "The cross-reference 17220-5RO-008 ties this part to the Honda platform's second common number.",
      "Element dimensions and seal are confirmed against the Honda airbox.",
    ],
    procurement: [
      "For Honda importers this is the OE-anchored air filter — confirm the OE and cross-reference.",
      "Within the air-filter category, the 17220-5R0-008 is the Honda entry, distinct from the other OE numbers and the generic HY-AF line — confirm the application rather than interchanging.",
    ],
    selectionNotes: [
      "Quote the OE 17220-5R0-008 / 17220-5RO-008 for the Honda platform.",
      "Confirm the dimensions and seal against the Honda airbox.",
      "Request the media grade for the target engine.",
    ],
    maintenance: [
      "Replace on the service schedule and shorten the interval in dusty conditions.",
      "A darkened or clogged element is the sign to replace.",
      "Keep the airbox sealed and the intake free of leaks.",
    ],
    buyerNote: "The 17220-5R0-008 is the Honda OE air filter — confirm the number and cross-reference, then buy on dimensions and seal fit.",
  },
  "air-filter-28113-2s000": {
    application: [
      "The 28113-2S000 is a Kia / Hyundai engine air filter matched to OE 28113-2S000, built with PP, non-woven fabric and cellulose, at 259 × 164 × 54.5 mm.",
      "The cellulose blend trades on dust capacity, with dimensions confirmed per the application.",
    ],
    scenarios: [
      "Kia and Hyundai models on standard service schedules, where the element is a routine replacement.",
      "Urban and highway duty, where a clean element keeps the mixture correct.",
      "Dusty markets, where the cellulose blend's dust capacity matters.",
    ],
    technical: [
      "The source catalogue lists the build as PP, non-woven fabric and cellulose (a catalog-confirmed material description).",
      "The stated 259 × 164 × 54.5 mm dimensions are confirmed per the application.",
      "Pleat geometry and media area are matched to the Kia/Hyundai airbox.",
    ],
    procurement: [
      "For Kia/Hyundai importers this is the OE-anchored air filter — confirm the dimensions and the OE number.",
      "Within the air-filter category, the 28113-2S000 is the Kia/Hyundai entry, distinct from the other OE numbers and the generic HY-AF line — confirm the application rather than interchanging.",
    ],
    selectionNotes: [
      "Quote the OE 28113-2S000 and confirm the 259 × 164 × 54.5 mm dimensions.",
      "Confirm the seal fit against the Kia/Hyundai airbox.",
      "Request the media blend specification for the target engine.",
    ],
    maintenance: [
      "Replace on the service schedule and shorten the interval in dusty conditions.",
      "A darkened or clogged element is the sign to replace.",
      "Keep the airbox sealed and the intake free of leaks.",
    ],
    buyerNote: "The 28113-2S000 is the Kia/Hyundai OE air filter — confirm the dimensions and number, then buy on the cellulose-blend dust capacity.",
  },
  "air-filter-a2700940004": {
    application: [
      "The A2700940004 is a Mercedes-Benz A / B / CLA / GLA air filter matched to OE A2700940004 (cross-reference MANN C27004 / BOSCH F026400380), built with PU and filter paper.",
      "The PU frame seals the airbox and the pleated paper does the filtering, confirmed per application.",
    ],
    scenarios: [
      "Mercedes-Benz A, B, CLA and GLA models on standard service schedules.",
      "Urban and highway duty, where a clean element keeps the mixture correct.",
      "Dusty markets, where the paper pleats' dust capacity matters.",
    ],
    technical: [
      "The PU frame seals against the airbox, while the pleated paper does the filtering.",
      "The cross-references MANN C27004 and BOSCH F026400380 tie this part to the aftermarket equivalents.",
      "Element dimensions and seal are confirmed against the Mercedes airbox.",
    ],
    procurement: [
      "For Mercedes importers this is the OE-anchored air filter — confirm the OE and the MANN/BOSCH cross-references.",
      "Within the air-filter category, the A2700940004 is the Mercedes A/B/CLA/GLA entry, distinct from the BMW and other OE numbers — confirm the application rather than interchanging.",
    ],
    selectionNotes: [
      "Quote the OE A2700940004 and the MANN C27004 / BOSCH F026400380 cross-references.",
      "Confirm the PU frame and seal fit against the Mercedes airbox.",
      "Request the paper media grade for the target engine.",
    ],
    maintenance: [
      "Replace on the service schedule and shorten the interval in dusty conditions.",
      "A darkened or clogged element is the sign to replace.",
      "Keep the airbox sealed and the intake free of leaks.",
    ],
    buyerNote: "The A2700940004 is the Mercedes A/B/CLA/GLA air filter — confirm the OE and the MANN/BOSCH cross-references, then buy on PU frame fit.",
  },
  "air-filter-13717811026": {
    application: [
      "The 13717811026 is a BMW X3 / X5 / X6 engine air filter matched to OE 13717811026 (cross-reference MANN C36014 / BOSCH F026400366), built with PP and non-woven fabric for the N55 / N57 / N20 engines.",
      "Dimensions and seal are confirmed against the BMW airbox.",
    ],
    scenarios: [
      "BMW X3, X5 and X6 models with the N55, N57 or N20 engines on standard service schedules.",
      "Highway and performance duty, where a clean element keeps the forced-induction engines breathing correctly.",
      "Dusty markets, where the PP and non-woven fabric's dust capacity matters.",
    ],
    technical: [
      "The source catalogue lists the build as PP and non-woven fabric (a catalog-confirmed material description).",
      "The cross-references MANN C36014 and BOSCH F026400366 tie this part to the aftermarket equivalents.",
      "The N55, N57 and N20 engine fitment is confirmed against the BMW airbox.",
    ],
    procurement: [
      "For BMW importers this is the X3/X5/X6 air filter — confirm the OE, the N55/N57/N20 fitment and the MANN/BOSCH cross-references.",
      "Within the air-filter category, the 13717811026 is the BMW X-series entry, distinct from the Mercedes and other OE numbers — confirm the application rather than interchanging.",
    ],
    selectionNotes: [
      "Quote the OE 13717811026 and the MANN C36014 / BOSCH F026400366 cross-references.",
      "Confirm the N55 / N57 / N20 engine fitment.",
      "Confirm the seal fit against the BMW airbox.",
    ],
    maintenance: [
      "Replace on the service schedule and shorten the interval in dusty conditions.",
      "A clogged element restricts airflow and hurts forced-induction engine output.",
      "Keep the airbox sealed and the intake free of leaks.",
    ],
    buyerNote: "The 13717811026 is the BMW X3/X5/X6 air filter — confirm the OE and the N55/N57/N20 fitment, then buy on media and seal quality.",
  },
  "air-filter-lr011593": {
    application: [
      "The LR011593 is a Land Rover Discovery 4, Range Rover Sport and Range Rover air filter matched to OE LR011593 (cross-reference LR161843), built with PU and premium filter paper.",
      "The PU frame and pleat area are confirmed against the Land Rover housing for a drop-in fit.",
    ],
    scenarios: [
      "Land Rover Discovery 4, Range Rover Sport and Range Rover models on standard service schedules.",
      "Off-road and dusty duty, where the element loads faster and is replaced on condition.",
      "Highway duty, where a clean element keeps the larger-displacement engines breathing correctly.",
    ],
    technical: [
      "The PU frame seals against the housing, while the premium paper pleats do the filtering.",
      "The cross-reference LR161843 ties this part to the Land Rover platform's second common number.",
      "Pleat area is confirmed against the Land Rover housing for a drop-in fit.",
    ],
    procurement: [
      "For Land Rover importers this is the OE-anchored air filter — confirm the OE and cross-reference.",
      "Within the air-filter category, the LR011593 is the Land Rover entry, distinct from the other OE numbers and the generic HY-AF line — confirm the application rather than interchanging.",
    ],
    selectionNotes: [
      "Quote the OE LR011593 / LR161843 for the Land Rover platform.",
      "Confirm the PU frame and seal fit against the housing.",
      "Request the premium paper media grade for the target engine.",
    ],
    maintenance: [
      "Replace on the service schedule and shorten the interval in off-road or dusty conditions.",
      "A darkened or clogged element is the sign to replace.",
      "Keep the airbox sealed and the intake free of leaks.",
    ],
    buyerNote: "The LR011593 is the Land Rover OE air filter — confirm the number and cross-reference, then buy on PU frame fit and premium paper grade.",
  },
  "oil-filter-90915-yzze2": {
    application: [
      "The 90915-YZZE2 is a Toyota/Lexus spin-on oil filter matched to OE 90915-YZZE2 / 90915-YZZJ2, listed across the Camry, Corolla, RAV4, Highlander, Yaris, Prius, Matrix and several Lexus models.",
      "It removes wear metal and carbon sludge from circulating oil across a very wide installed base. Because the cross-reference is so broad, confirming the exact thread and seal is the first ordering check rather than an afterthought.",
    ],
    scenarios: [
      "Toyota and Lexus petrol models on standard service schedules, covering one of the widest single-number fitments in the range.",
      "Hybrid models (Prius, Camry Hybrid and Lexus hybrids) where stop-start duty and the anti-drain-back valve matter for cold-start protection.",
      "Fleet and grey-import markets where one part number covering many models cuts inventory and ordering errors.",
    ],
    technical: [
      "The spin-on canister integrates the media, bypass valve and anti-drain-back valve, matching the Toyota service pattern.",
      "The cross-reference set (90915-10002, 90915-10004, 90915-YZZF1, 90915-TA002) is what makes it a broad single-SKU cover, which is precisely why thread and seal confirmation matters most.",
      "The source catalogue lists the OE and cross-reference set; media efficiency and bypass setting are pending and must be confirmed per application.",
    ],
    procurement: [
      "For Toyota/Lexus importers this is the broadest single-number oil filter — a genuine inventory consolidator, so confirm the OE and buy on consistent media and seal quality.",
      "Compared with the 90915-YZZE1 (RAV4/Camry/Corolla/Prius) this SKU spans an even wider Lexus and hybrid set, so position it as the broader-coverage sibling rather than a duplicate.",
    ],
    selectionNotes: [
      "Quote the OE 90915-YZZE2 / 90915-YZZJ2 so the thread and seal are matched across the wide fitment.",
      "For hybrid models confirm the anti-drain-back valve specification, since those engines cycle oil more often.",
      "Batch buyers should request the media micron rating and bypass-valve setting in writing.",
    ],
    maintenance: [
      "Replace with the engine oil at every service; a used filter reintroduces old oil and contaminants.",
      "Shorten the interval in dusty or stop-and-go conditions rather than following a generic mileage table.",
      "Lightly oil the seal and torque the canister to the specified turn on installation.",
    ],
    buyerNote: "The 90915-YZZE2 is the widest-coverage Toyota/Lexus oil filter in the range — a genuine inventory consolidator, so pin down the thread and seal, then buy on media and seal consistency for volume.",
  },
  "oil-filter-a0001802309": {
    application: [
      "The A0001802309 is a Mercedes-Benz engine oil filter matched to OE A0001802309 / A0001802609, built with a Pressure-Resistant Heavy-Duty media and cross-referenced to A1121800610 and A1124840525.",
      "It sits in the Mercedes lubrication circuit, holding back wear metal and carbon sludge on engines that are run on long service intervals. Cartridge or spin-on form, seal and bypass specification are confirmed against the Mercedes application before quoting.",
    ],
    scenarios: [
      "Mercedes-Benz passenger cars on the manufacturer's long service schedule, where the filter must hold contaminant for an extended drain.",
      "Turbocharged Mercedes engines where oil pressure and heat are higher and the pressure-resistant media earns its specification.",
      "Cold-climate and stop-start markets, where a correct bypass and anti-drain-back behaviour protect the engine on short trips.",
    ],
    technical: [
      "The Pressure-Resistant Heavy-Duty media is specified to survive the higher oil pressure of modern Mercedes engines without collapsing or tearing.",
      "Many of these Mercedes applications are cartridge-style, where only the element is replaced inside a reusable housing, unlike a spin-on canister.",
      "The cross-reference A1121800610 / A1124840525 ties this part to an earlier Mercedes engine family, which is why the housing type must be confirmed per application.",
    ],
    procurement: [
      "For Mercedes-focused importers, confirm cartridge versus spin-on by engine before ordering — mixing the two is the classic ordering error on this line.",
      "Within the oil-filter category this is the Mercedes end, distinct from the Toyota and Honda numbers: the pressure-resistant media spec is the differentiator to verify in writing.",
    ],
    selectionNotes: [
      "Confirm OE A0001802309 / A0001802609 and the housing type (cartridge vs spin-on) for the target engine.",
      "Request the pressure-resistant media specification and the bypass setting for long-interval engines.",
      "Check whether the application needs the o-ring or seal kit included, since cartridge filters usually do.",
    ],
    maintenance: [
      "Replace at the Mercedes service interval, together with the oil, rather than extending the drain.",
      "On cartridge applications, replace the housing o-ring or seal with the element every service.",
      "Confirm correct housing torque and seating to avoid leaks on the next cold start.",
    ],
    buyerNote: "The A0001802309 is the Mercedes end of the oil-filter range — confirm cartridge versus spin-on and the pressure-resistant media spec up front, because those two details are where ordering errors and warranty claims come from.",
  },
  "oil-filter-a2701800009": {
    application: [
      "The A2701800009 is a Mercedes-Benz M270 / M274 engine oil filter matched to OE A2701800009 / A2701800109 / A2701840025 / A2701840125, with a Pressure-Resistant Heavy-Duty Steel build and a Mann W 712/95 / Bosch F 026 407 015 cross-reference.",
      "It serves the Mercedes M270 and M274 four-cylinder turbo family. Burst rating, bypass setting and the steel-element construction are the procurement checks for these long-interval, high-pressure engines.",
    ],
    scenarios: [
      "Mercedes M270 / M274 turbo four-cylinder models on the manufacturer's long service schedule.",
      "Stop-start and urban duty, where the oil is cycled frequently and the bypass and anti-drain-back behaviour matter most.",
      "High-performance or chipped applications where oil pressure runs higher and the heavy-duty steel element is the safety margin.",
    ],
    technical: [
      "The Pressure-Resistant Heavy-Duty Steel element is built to hold its shape under the high oil pressure of the M270 / M274 turbo family.",
      "The multi-number OE set (A2701800009, A2701800109, A2701840025, A2701840125) reflects Mercedes part-number evolution, so one SKU spans the platform's service history.",
      "Burst rating and bypass setting are pending and must be confirmed per application.",
    ],
    procurement: [
      "For Mercedes specialists this is the M270/M274 turbo cover — confirm the OE and the steel-element construction, and bundle with the housing seal where the application uses a cartridge.",
      "Against the A0001802309 (earlier Mercedes family), this SKU is the newer M270/M274 turbo generation — keep the two separated by engine rather than treating them as interchangeable.",
    ],
    selectionNotes: [
      "Confirm OE A2701800009 / A2701800109 and the M270 / M274 engine before ordering.",
      "Request the burst-pressure rating and the bypass-valve setting in writing for long-interval programs.",
      "Check whether the housing seal or o-ring kit should be included for the cartridge application.",
    ],
    maintenance: [
      "Replace at the Mercedes interval together with the oil; do not extend the drain on turbo engines.",
      "Replace the housing seal or o-ring with the element on every cartridge service.",
      "Confirm correct housing seating and torque to avoid leaks on the next cold start.",
    ],
    buyerNote: "The A2701800009 is the M270/M274 turbo oil filter — its steel-element construction and burst rating are the two details to pin down in writing, and keep it separated from the earlier A0001802309 family by engine.",
  },
  "oil-filter-04152-37010": {
    application: [
      "The 04152-37010 is a Toyota Corolla oil filter matched to OE 04152-37010 / 04152-YZZA6.",
      "It sits in the Corolla lubrication circuit, holding back wear metal and carbon sludge. Spin-on thread, seal and bypass specification are confirmed against the Corolla family before quoting.",
    ],
    scenarios: [
      "Toyota Corolla owners on standard service schedules, where the filter is replaced at every oil change.",
      "High-mileage Corolla taxis and fleet cars, where a consistent media and seal keep the service interval predictable.",
      "Dusty or stop-and-go urban markets, where the interval should be shortened rather than read from a generic table.",
    ],
    technical: [
      "The spin-on canister integrates the media, bypass valve and anti-drain-back valve, matching the Toyota service pattern.",
      "The paired OE 04152-37010 / 04152-YZZA6 ties this part to the Corolla platform's two common numbering systems.",
      "The source catalogue lists the OE pair; media efficiency and bypass setting are pending and must be confirmed per application.",
    ],
    procurement: [
      "For Toyota Corolla specialists this is a steady, high-volume SKU — confirm the OE and buy on media and seal consistency.",
      "Within the Toyota oil-filter set, the 04152-37010 is the Corolla-specific entry, distinct from the broader 90915-YZZE1 / YZZE2 which span more models — keep the two separated by application.",
    ],
    selectionNotes: [
      "Quote the OE 04152-37010 / 04152-YZZA6 so the thread and seal are matched to the Corolla.",
      "For fleet programs, request the media micron rating and bypass setting in writing.",
      "Confirm the anti-drain-back valve specification for cold-start and short-trip protection.",
    ],
    maintenance: [
      "Replace with the engine oil at every service; reusing a loaded filter puts old oil back into fresh oil.",
      "Shorten the interval in dusty or stop-and-go conditions.",
      "Lightly oil the seal and torque the canister to the specified turn on installation.",
    ],
    buyerNote: "The 04152-37010 is the Corolla-specific Toyota oil filter — a steady volume line, so confirm the OE, then buy on media and seal consistency rather than the lowest quote.",
  },
  "oil-filter-04152-31080": {
    application: [
      "The 04152-31080 is a Toyota / Lexus oil filter matched to OE 04152-31080 with cross-references 04152-38010, 04152-31060 and 04152-0P010 (source catalog), built with High-density premium filter paper. The 2.5L–3.5L engine band is a catalog reference, not a verified fitment.",
      "It holds back wear metal and carbon sludge on Toyota and Lexus petrol engines. Thread, seal and bypass specification are pending and must be confirmed per order.",
    ],
    scenarios: [
      "Toyota and Lexus petrol engines in the 2.5L–3.5L band (catalog reference) on standard service schedules.",
      "Larger-displacement engines where oil volume is higher.",
      "Highway and towing duty, where sustained load raises oil temperature.",
    ],
    technical: [
      "The source catalogue lists the build as High-density premium filter paper (a catalog-confirmed material description, not a measured efficiency figure).",
      "The cross-reference set (04152-38010, 04152-31060, 04152-0P010) spans several Toyota numbering generations on the same engine family.",
      "Bypass calibration and seal diameter are matched to the larger-displacement oil system, which is why the engine band is stated on the part.",
    ],
    procurement: [
      "For Toyota/Lexus importers covering the mid-size engine band, this is a solid mid-volume SKU — confirm the engine displacement band and buy on the high-density media spec.",
      "Within the Toyota oil-filter set, the 04152-31080 is the 2.5L–3.5L entry, distinct from the Corolla 04152-37010 and the broad 90915 numbers — position it by displacement band.",
    ],
    selectionNotes: [
      "Confirm OE 04152-31080 and the 2.5L–3.5L engine band before ordering.",
      "Request the high-density media specification and bypass setting in writing.",
      "Verify the cross-reference (04152-38010, 04152-31060, 04152-0P010) against the target model year.",
    ],
    maintenance: [
      "Replace with the engine oil at every service; do not extend the drain on larger-displacement engines.",
      "Shorten the interval in dusty or towing duty rather than following a generic mileage table.",
      "Lightly oil the seal and torque the canister to the specified turn.",
    ],
    buyerNote: "The 04152-31080 is the Toyota/Lexus 2.5L–3.5L oil filter — confirm the displacement band, then buy on the high-density media specification rather than price alone.",
  },
  "brake-pads-04465-0k020": {
    application: [
      "The 04465-0K020 is a ceramic front brake pad set matched to OE 04465-0K020 / 04465-04030 / 04465-0K070 for Toyota.",
      "The friction material and the included shims, springs and anti-rattle clips are confirmed per application, since a pad that ships without its hardware kit generates returns.",
    ],
    scenarios: [
      "Toyota passenger platforms on front-axle disc brakes, where a ceramic pad runs quieter with less dust.",
      "Premium and urban segments, where low noise and low dust are the selling points.",
      "Markets with heavy braking or hills, where heat tolerance matters.",
    ],
    technical: [
      "Ceramic friction material runs cooler, quieter and with less dust than semi-metallic, at a slight trade in cold bite.",
      "The backing plate must fit the caliper precisely to avoid binding or rattling.",
      "The three-OE set (04465-0K020, 04465-04030, 04465-0K070) reflects Toyota's numbering across the same platform, which is why exact fit is confirmed per application.",
    ],
    procurement: [
      "For Toyota importers this is the wider-OE ceramic set — confirm the full hardware kit and align by the three-number OE set.",
      "Within the brake-pad category, the 04465-0K020 carries the broader three-number OE set while the 04465-04030 is the two-number reference — keep them aligned by OE so customers get the exact fit.",
    ],
    selectionNotes: [
      "Quote the OE 04465-0K020 / 04465-04030 / 04465-0K070 and confirm the caliper platform.",
      "Confirm the noise and hardware kit is included in the box.",
      "Request the friction formulation in writing.",
    ],
    maintenance: [
      "Bed the new pads in over the first few hundred kilometres.",
      "Inspect pad thickness at every service and replace before minimum thickness.",
      "Check the discs for scoring or uneven wear when the pads are replaced.",
    ],
    buyerNote: "The 04465-0K020 is the wider-OE Toyota ceramic pad set — confirm the hardware kit and align by the three-number OE set, then sell on low dust and low noise.",
  },
    "oil-filter-15400-plc": {
    application: [
      "The 15400-PLC is a Honda oil filter matched to OE 15400-PLC, the shared-platform Honda service number.",
      "It sits in the Honda lubrication circuit, holding back wear metal and carbon sludge. Media efficiency, spin-on thread and the anti-drain-back valve are confirmed against the Honda application rather than assumed from a photo.",
    ],
    scenarios: [
      "Honda passenger cars on standard service schedules, where the filter is a routine replacement at every oil change.",
      "High-revving Honda petrol engines, where consistent oil pressure protects the valvetrain under sustained load.",
      "Urban and stop-and-go markets, where the anti-drain-back valve keeps oil at the top end between short trips.",
    ],
    technical: [
      "The spin-on design integrates media, bypass valve and anti-drain-back valve in one replaceable canister.",
      "The 15400-PLC number is the shared Honda platform service code, so a single part covers several Honda models.",
      "The source catalogue lists the OE number; media efficiency and bypass setting are pending and must be confirmed per application.",
    ],
    procurement: [
      "For Honda importers this is the shared-platform entry — confirm the OE and buy on media and seal consistency.",
      "Within the Honda oil-filter set, the 15400-PLC is the generic shared number while the 15400-PLC-004 carries the fuller cross-reference list — keep the two separated by the customer's interchange needs.",
    ],
    selectionNotes: [
      "Quote the OE 15400-PLC so the thread and seal are matched to the Honda platform.",
      "Confirm the anti-drain-back valve specification for cold-start and short-trip protection.",
      "For batch orders, request the media micron rating and bypass setting in writing.",
    ],
    maintenance: [
      "Replace with the engine oil at every service; a used filter retains old oil and contaminants.",
      "Shorten the interval in dusty or stop-and-go driving.",
      "Lightly oil the seal and confirm the canister is hand-tight plus the specified turn.",
    ],
    buyerNote: "The 15400-PLC is the shared-platform Honda oil filter — a clean, steady volume line, so confirm the OE and buy on media and seal consistency.",
  },
  "oil-filter-04152-31090": {
    application: [
      "The 04152-31090 is a Toyota oil filter matched to OE 04152-31090 / 04152-YZZA1.",
      "It holds back wear metal and carbon sludge in the Toyota lubrication circuit. Correct thread pitch, seal diameter and bypass-valve calibration are what keep this filter service-grade, and they are confirmed per application before quoting.",
    ],
    scenarios: [
      "Toyota passenger cars on standard service schedules, where the filter is replaced at every oil change.",
      "Older and grey-import Toyota models where the 04152-YZZA1 numbering is the common service reference.",
      "Stop-and-go urban duty, where the anti-drain-back valve protects the top end between short trips.",
    ],
    technical: [
      "The spin-on canister integrates media, bypass valve and anti-drain-back valve, matching the Toyota service pattern.",
      "The paired 04152-31090 / 04152-YZZA1 numbers are the two common references for this Toyota application.",
      "Thread pitch, seal diameter and bypass calibration are the three details that make a filter fit and behave like the genuine part.",
    ],
    procurement: [
      "For Toyota importers this is a steady service SKU — confirm the OE pair and buy on thread, seal and bypass consistency.",
      "Within the Toyota oil-filter set, the 04152-31090 is a specific-number entry distinct from the broader 90915 family — confirm the exact number rather than defaulting to a wider cross-reference.",
    ],
    selectionNotes: [
      "Quote the OE 04152-31090 / 04152-YZZA1 so the thread and seal are matched.",
      "Confirm the bypass-valve calibration for the target engine.",
      "For batch orders, request the media micron rating in writing.",
    ],
    maintenance: [
      "Replace with the engine oil at every service.",
      "Shorten the interval in dusty or stop-and-go conditions.",
      "Lightly oil the seal and torque the canister to the specified turn.",
    ],
    buyerNote: "The 04152-31090 is a specific-number Toyota oil filter — confirm the exact OE pair, then buy on thread, seal and bypass consistency rather than the lowest price.",
  },
  "fuel-filter-900fg": {
    application: [
      "The 900FG is an oil-water separator assembly matched to OE 900FG / 900FH.",
      "Water separation is the headline feature — free water in diesel corrodes and wears injectors, so the separator's rating and drain arrangement are confirmed per application.",
    ],
    scenarios: [
      "Common-rail diesel applications where free water is a real contamination risk.",
      "Markets with humid or variable fuel quality, where water ingress into the tank is more common.",
      "Commercial and marine diesel, where a separator bowl and drain are the practical way to manage water.",
    ],
    technical: [
      "Water separation coalesces free water so it settles and can be drained, keeping it out of the injectors.",
      "The assembly form (rather than a bare element) means the separator is a complete replaceable unit with its drain arrangement.",
      "The 900FG / 900FH pairing covers the assembly's two common references, so the fitting and flow rating are confirmed per application.",
    ],
    procurement: [
      "For diesel importers this is the mid-flow water-separator assembly — confirm the drain arrangement and the micron rating in writing.",
      "Within the fuel-filter category, the 900FG sits between the smaller 500FH and the higher-flow 1000FH — position it by flow rating and confirm the application rather than interchanging.",
    ],
    selectionNotes: [
      "Quote the OE 900FG / 900FH and confirm the inlet/outlet fitting style and flow rating.",
      "Require the micron rating and water-separation capability in writing.",
      "Confirm the drain arrangement (manual or automatic) for the target installation.",
    ],
    maintenance: [
      "Replace on the diesel service schedule, and shorten it in markets with variable fuel quality.",
      "Drain accumulated water from the separator bowl on schedule.",
      "Bleed or prime the system correctly after replacement to avoid air in the line.",
    ],
    buyerNote: "The 900FG is the mid-flow water-separator assembly — confirm the drain arrangement and micron rating in writing, and position it by flow between the 500FH and the 1000FH.",
  },
  "fuel-filter-1000fh": {
    application: [
      "The 1000FH is a high-efficiency diesel fuel filter water separator matched to OE 1000FH / 1000FG.",
      "Particulate and free-water removal are confirmed against the common-rail application, where injector protection is the entire point of the part.",
    ],
    scenarios: [
      "Higher-flow common-rail diesel applications where the fuel system demands both filtration and water separation.",
      "Commercial and heavy-duty diesel, where fuel volume is higher and the separator must keep pace.",
      "Markets with variable fuel quality, where combined particulate and water removal protects expensive injectors.",
    ],
    technical: [
      "High efficiency refers to the combined particulate and water-separation rating, tuned for common-rail injector protection.",
      "The higher-flow assembly is sized for commercial diesel, where fuel volume is greater than a passenger application.",
      "The 1000FH / 1000FG pairing covers the assembly's two common references, so fitting and flow are confirmed per application.",
    ],
    procurement: [
      "For diesel and commercial importers this is the high-flow end of the water-separator line — confirm the flow rating and require the micron rating in writing.",
      "Within the fuel-filter category, the 1000FH is the higher-flow sibling to the 900FG and 500FH — position it by flow rating and confirm the application rather than interchanging.",
    ],
    selectionNotes: [
      "Quote the OE 1000FH / 1000FG and confirm the inlet/outlet fitting style and flow rating.",
      "Require the micron rating and water-separation capability in writing.",
      "Confirm the drain arrangement for the target installation.",
    ],
    maintenance: [
      "Replace on the diesel service schedule, and shorten it in markets with variable fuel quality.",
      "Drain accumulated water from the separator bowl on schedule.",
      "Bleed or prime the system correctly after replacement to avoid air in the line.",
    ],
    buyerNote: "The 1000FH is the high-flow diesel water separator — confirm the flow rating and micron rating in writing, and position it as the heavy-duty sibling to the 900FG and 500FH.",
  },
  "oil-filter-15208-65f00": {
    application: [
      "The 15208-65F00 is a Suzuki-pattern engine oil filter matched to OE 15208-65F00.",
      "It sits in the Suzuki lubrication circuit, holding back wear metal and carbon sludge. Spin-on fitment and the bypass specification are confirmed against the Suzuki application, with media quality treated as the main differentiator.",
    ],
    scenarios: [
      "Suzuki passenger cars and small engines on standard service schedules.",
      "Compact and kei-class Suzuki applications where the filter is smaller and the media area is tight.",
      "Dusty and stop-and-go markets, where the interval should be shortened rather than read from a generic table.",
    ],
    technical: [
      "The spin-on canister integrates media, bypass valve and anti-drain-back valve in one replaceable unit.",
      "Small-engine filters are compact (general category knowledge); no measured efficiency or dirt-holding figure is published for this SKU.",
      "Bypass calibration is matched to the Suzuki oil system, which is why the part is matched to 15208-65F00 rather than sold as a universal size.",
    ],
    procurement: [
      "For Suzuki specialists and kei-car importers this is the small-engine entry — confirm the OE and buy on media quality, since compact filters have less capacity margin.",
      "Within the oil-filter category, the 15208-65F00 is the compact Suzuki end, distinct from the larger Toyota, Honda and truck numbers — do not interchange it.",
    ],
    selectionNotes: [
      "Quote the OE 15208-65F00 so the compact fitment is matched.",
      "Request the media micron rating, since small filters have less dirt-holding margin.",
      "Confirm the bypass-valve specification for the target Suzuki engine.",
    ],
    maintenance: [
      "Replace with the engine oil at every service.",
      "Shorten the interval in dusty or stop-and-go conditions.",
      "Lightly oil the seal and torque the canister to the specified turn.",
    ],
    buyerNote: "The 15208-65F00 is the compact Suzuki oil filter — with less media capacity margin than a large filter, confirm the OE and buy on media quality rather than price.",
  },
  "fuel-filter-23390-0l070": {
    application: [
      "The 23390-0L070 is a Toyota fuel filter matched to OE 23390-0L070 / 23390-0L090.",
      "It removes particulate before fuel reaches the injectors and pump, with fitting style and micron rating confirmed against the Toyota application.",
    ],
    scenarios: [
      "Toyota petrol models on standard service schedules, where the external in-line fuel filter is a routine service item.",
      "Diesel Toyota applications where the filter protects common-rail injectors from abrasive wear.",
      "Markets with variable fuel quality, where a clean filter protects the pump and injectors.",
    ],
    technical: [
      "The in-line filter sits in the fuel line and removes particulate before it reaches the pump and injectors.",
      "The 23390-0L070 / 23390-0L090 pairing covers the Toyota application's two common references.",
      "Fitting style (push-on, banjo or threaded) and the micron rating are confirmed per application rather than assumed.",
    ],
    procurement: [
      "For Toyota importers this is a steady service SKU — confirm the OE pair and the fitting style, then buy on the micron rating.",
      "Within the fuel-filter category, the 23390-0L070 is the Toyota OEM-number entry, distinct from the 500FH / 900FG / 1000FH water-separator assemblies and the FF5507 — confirm the application rather than interchanging.",
    ],
    selectionNotes: [
      "Quote the OE 23390-0L070 / 23390-0L090 and confirm the fitting style.",
      "Require the micron rating in writing.",
      "Confirm whether the application is petrol or diesel, since the fuel system requirements differ.",
    ],
    maintenance: [
      "Replace on the service schedule, and shorten it in markets with variable fuel quality.",
      "Bleed or prime the system correctly after replacement to avoid air in the line.",
      "Inspect the drained filter for water or heavy particulate, which points to a shorter interval.",
    ],
    buyerNote: "The 23390-0L070 is the Toyota OEM fuel filter — confirm the fitting style and micron rating, and buy on consistency rather than price.",
  },
  "cabin-filter-87139-0n010": {
    application: [
      "The 87139-0N010 is a Toyota cabin air filter matched to OE 87139-0N010 / 87139-30040.",
      "It traps dust, pollen and particulate before outside air reaches the cabin, with edge-seal fit and any carbon option confirmed per model year.",
    ],
    scenarios: [
      "Toyota passenger cars on the annual cabin-filter cycle, where the filter keeps the blower and occupants protected.",
      "Urban and congested markets, where a carbon version reduces exhaust and diesel odours.",
      "Allergy-sensitive markets, where pollen and fine-particulate capture is the selling point.",
    ],
    technical: [
      "A plain particulate filter stops dust and pollen; an activated-carbon layer also adsorbs gases and odours.",
      "The frame must seal tightly at the edges, otherwise unfiltered air bypasses the media.",
      "The 87139-0N010 / 87139-30040 pairing covers the Toyota application's two common references.",
    ],
    procurement: [
      "For Toyota importers this is the OE-anchored cabin-filter entry — confirm the model year and any carbon option, then buy on edge-seal fit.",
      "Within the cabin-filter category, the 87139-0N010 carries the Toyota OE anchor while the HY-CF-691 is the generic entry — position the OE number for coverage and the generic for price.",
    ],
    selectionNotes: [
      "Quote the OE 87139-0N010 / 87139-30040 and confirm the model year.",
      "Confirm whether the application needs a plain or activated-carbon version.",
      "Check the frame type and dimensions by OE number, since cabin filters are sensitive to edge-seal fit.",
    ],
    maintenance: [
      "Inspect the cabin filter with the engine air filter and replace roughly once a year.",
      "Replace sooner if airflow drops, windows fog easily or a musty smell develops.",
      "A clean cabin filter protects the blower motor from dust build-up.",
    ],
    buyerNote: "The 87139-0N010 is the Toyota OE-anchored cabin filter — confirm the model year and carbon option, then buy on edge-seal fit rather than price.",
  },
  "oil-filter-premium-motorcycle-fuel-and-oil-filters-china-fact": {
    application: [
      "The HY-OF-637 is a motorcycle oil and fuel filter line built with High-Grade Filter Paper and PP, positioned for the small-engine and two-wheeler aftermarket.",
      "It holds back wear metal and sludge in motorcycle oil circuits, and the companion fuel filters screen particulate before the carburettor or injector. Thread, seal and media rating are confirmed per application, because motorcycle filters carry tight space and flow constraints.",
    ],
    scenarios: [
      "Motorcycles and scooters on short service intervals, where oil and fuel filters are replaced more often than on cars.",
      "Small-displacement engines where a compact filter must flow enough oil without restricting the pump.",
      "Markets with variable fuel quality, where a fuel filter protects the carburettor jets or injector from particulate.",
    ],
    technical: [
      "The High-Grade Filter Paper and PP construction is sized for compact small-engine housings, where media area is limited.",
      "Motorcycle oil filters must balance flow against filtration because the oil pump has less headroom than a car's.",
      "The companion fuel filters are in-line screens, matched to the small fuel-flow rates of carburettor and small-injector engines.",
    ],
    procurement: [
      "For two-wheeler parts distributors this is a compact niche line — confirm the exact bike application, because motorcycle fitment is far more model-specific than a car filter.",
      "Within the oil-filter category this is the motorcycle line, distinct from the passenger and heavy-duty numbers: confirm the application rather than treating it as an engine-filter interchange.",
    ],
    selectionNotes: [
      "Confirm the exact motorcycle make, model and engine before ordering — fitment is model-specific.",
      "Request the media type and flow rating, since compact filters have little flow margin.",
      "Check whether the fuel filter is an in-line or an in-tank strainer for the target bike.",
    ],
    maintenance: [
      "Replace at the motorcycle's short service interval, together with the oil.",
      "Replace the fuel filter on schedule or earlier with variable fuel quality.",
      "Confirm correct fitment and seating, since a compact filter can leak if the seal is mis-seated.",
    ],
    buyerNote: "The HY-OF-637 is the motorcycle niche line — fitment is far more model-specific than a car filter, so confirm the exact bike and buy on media and flow rating rather than price.",
  },
  "rubber-hoses-custom-reinforced-silicone-turbo-heater-hose-china": {
    application: [
      "The HY-RH-638 is a reinforced silicone turbo and heater hose in Premium Silicone.",
      "Silicone holds its shape at higher heat than EPDM, and the reinforcement lets it hold pressure and vacuum without collapsing — compound, reinforcement and bore are confirmed per application.",
    ],
    scenarios: [
      "Turbocharger and heater circuits, where under-bonnet heat exceeds what EPDM can take.",
      "High-performance and modified engines, where silicone's heat headroom is the point.",
      "Cold-climate heater circuits, where the hose must hold vacuum without collapsing.",
    ],
    technical: [
      "Silicone tolerates higher temperatures than EPDM, which is why it is the turbo and heater choice.",
      "Reinforcement (fabric or braided) lets the hose hold pressure and vacuum without collapsing.",
      "Compound, reinforcement and inner diameter are confirmed per application, since a hose that hardens or collapses under heat is a failure risk.",
    ],
    procurement: [
      "For performance and turbo importers this is the reinforced silicone line — specify the working temperature and inner diameter up front.",
      "Within the rubber-hoses category, the HY-RH-638 is the reinforced silicone turbo/heater entry, distinct from the EPDM coolant lines and the braided silicone line — confirm the circuit rather than interchanging.",
    ],
    selectionNotes: [
      "Specify silicone for high heat, and confirm the reinforcement and inner diameter.",
      "State the working temperature and pressure, since turbo circuits run hot and pressurised.",
      "Request the dimensional tolerance on the bore for batch orders.",
    ],
    maintenance: [
      "Inspect for hardening, cracking or soft spots, especially near the turbo heat source.",
      "Replace on a time or mileage schedule rather than waiting for failure.",
      "Confirm the clamps are tight and the hose is routed without kinking.",
    ],
    buyerNote: "The HY-RH-638 is the reinforced silicone turbo/heater hose — specify the temperature, reinforcement and bore up front, and buy on compound consistency.",
  },
  "rubber-hoses-high-performance-braided-silicone-heater-vacuum-ho": {
    application: [
      "The HY-RH-639 is a braided silicone heater and vacuum hose, available in Silicone, EPDM and NBR.",
      "The braided reinforcement resists collapse under vacuum, which is what a heater or vacuum line needs; compound and inner diameter are confirmed per circuit.",
    ],
    scenarios: [
      "Heater and vacuum lines, where the hose must hold vacuum without collapsing.",
      "High-heat under-bonnet circuits, where silicone is the compound of choice.",
      "Custom and modified engines, where the braided look and heat headroom are both wanted.",
    ],
    technical: [
      "Braided reinforcement resists collapse under vacuum, which plain silicone does less well on its own.",
      "Silicone gives heat headroom, EPDM gives glycol resistance, and NBR gives oil resistance — the compound is chosen per circuit.",
      "Compound and inner diameter are confirmed per application, since the wrong compound is a premature-failure risk.",
    ],
    procurement: [
      "For performance importers this is the braided silicone line — specify the circuit (heater vs vacuum) and the compound up front.",
      "Within the rubber-hoses category, the HY-RH-639 is the braided silicone entry, distinct from the non-braided HY-RH-638 and the EPDM lines — confirm the circuit rather than interchanging.",
    ],
    selectionNotes: [
      "Specify the circuit (heater vs vacuum) and the compound (silicone, EPDM or NBR).",
      "Confirm the inner diameter and the braid reinforcement.",
      "State the working temperature and vacuum level for the target circuit.",
    ],
    maintenance: [
      "Inspect for hardening, cracking or collapse, especially on vacuum lines.",
      "Replace on a time or mileage schedule rather than waiting for failure.",
      "Confirm the clamps are tight and the hose is not kinked.",
    ],
    buyerNote: "The HY-RH-639 is the braided silicone heater/vacuum hose — specify the circuit and compound up front, and buy on reinforcement consistency.",
  },
  "rubber-hoses-custom-epdm-rubber-elbow-hose-china-factory-and-le": {
    application: [
      "The HY-RH-640 is an EPDM rubber elbow hose in premium EPDM for coolant and air circuits.",
      "EPDM resists water, glycol and heat ageing, and the elbow form is supplied to the bend angle the circuit requires — compound, reinforcement and bore are confirmed per application.",
    ],
    scenarios: [
      "Coolant elbow circuits, where the hose must make a tight bend without kinking.",
      "Air transfer and intake runs, where EPDM's heat ageing resistance matters.",
      "Markets with hot climates, where coolant temperatures cycle hard and EPDM holds up.",
    ],
    technical: [
      "EPDM resists water, glycol and heat ageing, which is why it is the coolant and air-transfer compound.",
      "The elbow form is supplied to the bend angle the circuit requires, avoiding the kink that a straight hose would develop.",
      "Reinforcement and inner diameter are confirmed per application, since a hose that collapses or hardens is a failure risk.",
    ],
    procurement: [
      "For hose importers this is the EPDM elbow line — specify the bend angle, inner diameter and reinforcement up front.",
      "Within the rubber-hoses category, the HY-RH-640 is the EPDM elbow entry, distinct from the straight NBR and silicone lines — confirm the bend and circuit rather than interchanging.",
    ],
    selectionNotes: [
      "Specify the bend angle and inner diameter for the target circuit.",
      "Confirm the EPDM compound and the working pressure rating.",
      "Request the dimensional tolerance on the bore and bend for batch orders.",
    ],
    maintenance: [
      "Inspect the elbow for cracking, hardening or soft spots at the bend.",
      "Replace on a time or mileage schedule rather than waiting for failure.",
      "Confirm the hose is not kinked and the clamps are tight.",
    ],
    buyerNote: "The HY-RH-640 is the EPDM elbow hose — specify the bend angle, bore and reinforcement up front, and buy on compound consistency.",
  },
  "rubber-hoses-oil-resistant-nbr-automotive-fuel-hose-china-facto": {
    application: [
      "The HY-RH-641 is an oil-resistant NBR automotive fuel hose, available in NBR, Silicone and EPDM.",
      "NBR's oil and fuel resistance is what makes it the fuel-line choice, with reinforcement and inner diameter confirmed per application.",
    ],
    scenarios: [
      "Automotive fuel lines, where NBR's fuel resistance is the deciding factor.",
      "Oil transfer circuits, where the compound must resist oil swelling.",
      "Markets with hot climates, where NBR holds up under fuel and oil at temperature.",
    ],
    technical: [
      "NBR resists oil and fuel, which is why it is the fuel-line compound.",
      "Reinforcement lets the hose hold pressure and vacuum without collapsing.",
      "Compound and inner diameter are confirmed per application, since a hose that swells or hardens under fuel is a failure risk.",
    ],
    procurement: [
      "For fuel-system importers this is the NBR fuel line — specify the compound, inner diameter and working pressure up front.",
      "Within the rubber-hoses category, the HY-RH-641 is the NBR fuel entry, distinct from the HY-RH-603 NBR line and the EPDM/silicone lines — confirm the application rather than interchanging.",
    ],
    selectionNotes: [
      "Specify NBR for fuel and oil, and confirm the inner diameter and reinforcement.",
      "State the working temperature and pressure.",
      "Request the dimensional tolerance on the bore for batch orders.",
    ],
    maintenance: [
      "Inspect for swelling, hardening or cracks in fuel service.",
      "Replace on a time or mileage schedule rather than waiting for failure.",
      "Confirm the clamps are tight and the hose is not kinked.",
    ],
    buyerNote: "The HY-RH-641 is the NBR automotive fuel hose — specify the compound, bore and pressure up front, and buy on consistency.",
  },
  "rubber-hoses-custom-high-temperature-radiator-silicone-hose-fac": {
    application: [
      "The HY-RH-642 is a high-temperature radiator silicone hose in Premium Silicone Rubber.",
      "Silicone tolerates the heat cycling of a radiator circuit better than EPDM, and the hose is supplied straight, as 45°/90° elbows or a 180° U-bend to match the layout.",
    ],
    scenarios: [
      "Radiator circuits where heat cycling is hard and silicone's temperature headroom is the point.",
      "High-performance and modified cooling systems, where silicone outlasts EPDM under heat.",
      "Markets with hot climates, where radiator temperatures cycle harder than temperate regions.",
    ],
    technical: [
      "Silicone tolerates higher heat cycling than EPDM, which is why it is the high-temperature radiator choice.",
      "The hose is supplied straight, as 45°/90° elbows or a 180° U-bend to match the layout without kinking.",
      "Compound, reinforcement and inner diameter are confirmed per application.",
    ],
    procurement: [
      "For cooling-system importers this is the high-temp silicone radiator line — specify the form (straight, elbow, U-bend) and bore up front.",
      "Within the rubber-hoses category, the HY-RH-642 is the high-temp silicone radiator entry, distinct from the EPDM radiator lines and the reinforced turbo line — confirm the circuit rather than interchanging.",
    ],
    selectionNotes: [
      "Specify the form (straight, 45°/90° elbow or 180° U-bend) and inner diameter.",
      "Confirm the working temperature and pressure.",
      "Request the dimensional tolerance on the bore for batch orders.",
    ],
    maintenance: [
      "Inspect for hardening, cracking or soft spots in the radiator circuit.",
      "Replace on a time or mileage schedule rather than waiting for failure.",
      "Bleed the cooling system correctly after replacement.",
    ],
    buyerNote: "The HY-RH-642 is the high-temp silicone radiator hose — specify the form and bore up front, and buy on compound consistency.",
  },
  "rubber-hoses-black-hydraulic-oil-fuel-hose-high-pressure-fuel-l": {
    application: [
      "The HY-RH-643 is a black hydraulic, oil and fuel hose for high-pressure fuel line duty.",
      "Compound, reinforcement and inner diameter are confirmed per application, because a hose that hardens or swells under oil is a premature-failure risk on the end vehicle.",
    ],
    scenarios: [
      "High-pressure fuel lines, where the hose must hold pressure without swelling or bursting.",
      "Hydraulic and oil circuits, where the compound must resist oil at pressure.",
      "Commercial and heavy-duty applications, where pressure and duty cycle are both higher.",
    ],
    technical: [
      "The compound is chosen for oil and fuel resistance, and the reinforcement for pressure holding.",
      "High-pressure service demands a reinforced construction that will not swell or burst under load.",
      "Inner diameter and reinforcement are confirmed per application, since the wrong spec is a safety-relevant failure.",
    ],
    procurement: [
      "For fuel and hydraulic importers this is the high-pressure line — specify the pressure rating, compound and bore up front.",
      "Within the rubber-hoses category, the HY-RH-643 is the high-pressure hydraulic/fuel entry, distinct from the low-pressure NBR and EPDM lines — confirm the pressure rating rather than interchanging.",
    ],
    selectionNotes: [
      "Specify the working pressure and the compound (NBR for fuel/oil).",
      "Confirm the inner diameter and reinforcement.",
      "Request the burst-pressure rating in writing for high-pressure applications.",
    ],
    maintenance: [
      "Inspect for swelling, hardening or cracks, and watch for signs of leakage at the fittings.",
      "Replace on a time or mileage schedule rather than waiting for failure.",
      "Confirm the clamps and fittings are rated for the line pressure.",
    ],
    buyerNote: "The HY-RH-643 is the high-pressure hydraulic/fuel hose — specify the pressure rating and compound up front, because the wrong spec is a safety risk.",
  },
  "rubber-hoses-custom-high-temp-radiator-hose-auto-elbow-silicone": {
    application: [
      "The HY-RH-644 is a high-temperature radiator hose in auto-elbow silicone for car cooling circuits.",
      "The silicone compound holds up to the heat of the cooling loop, and the elbow geometry is supplied to the routing the vehicle requires.",
    ],
    scenarios: [
      "Car cooling circuits, where the hose makes a tight bend and carries hot coolant.",
      "High-heat markets, where silicone's temperature headroom outlasts EPDM.",
      "Custom and replacement cooling systems, where the elbow routing must match the vehicle.",
    ],
    technical: [
      "Silicone holds up to the heat of the cooling loop better than EPDM.",
      "The auto-elbow form matches the vehicle's routing without kinking.",
      "Compound, reinforcement and inner diameter are confirmed per application.",
    ],
    procurement: [
      "For cooling-system importers this is the silicone auto-elbow radiator line — specify the bend and bore up front.",
      "Within the rubber-hoses category, the HY-RH-644 is the silicone auto-elbow entry, distinct from the HY-RH-642 straight/elbow line and the EPDM lines — confirm the routing rather than interchanging.",
    ],
    selectionNotes: [
      "Specify the elbow bend and inner diameter for the target routing.",
      "Confirm the working temperature and pressure.",
      "Request the dimensional tolerance on the bore and bend.",
    ],
    maintenance: [
      "Inspect for hardening, cracking or soft spots at the bend.",
      "Replace on a time or mileage schedule rather than waiting for failure.",
      "Bleed the cooling system correctly after replacement.",
    ],
    buyerNote: "The HY-RH-644 is the silicone auto-elbow radiator hose — specify the bend and bore up front, and buy on compound consistency.",
  },
  "rubber-hoses-oil-resistant-nbr-automotive-fuel-hose": {
    application: [
      "The HY-RH-645 is an oil-resistant NBR automotive fuel hose.",
      "NBR's resistance to oil and fuel is the reason it is the fuel-line compound, and reinforcement plus inner diameter are confirmed against the application before quoting.",
    ],
    scenarios: [
      "Automotive fuel lines, where NBR's fuel resistance is the deciding factor.",
      "Oil transfer circuits, where the compound must resist swelling.",
      "Markets with hot climates, where NBR holds up under fuel and oil at temperature.",
    ],
    technical: [
      "NBR resists oil and fuel, which is why it is the fuel-line compound.",
      "Reinforcement lets the hose hold pressure and vacuum without collapsing.",
      "Inner diameter and reinforcement are confirmed per application.",
    ],
    procurement: [
      "For fuel-system importers this is the NBR fuel line — specify the bore, pressure and compound up front.",
      "Within the rubber-hoses category, the HY-RH-645 is the NBR fuel entry, distinct from the HY-RH-641 and HY-RH-603 NBR lines and the EPDM/silicone lines — confirm the application rather than interchanging.",
    ],
    selectionNotes: [
      "Specify NBR and confirm the inner diameter and reinforcement.",
      "State the working temperature and pressure.",
      "Request the dimensional tolerance on the bore.",
    ],
    maintenance: [
      "Inspect for swelling, hardening or cracks in fuel service.",
      "Replace on a time or mileage schedule rather than waiting for failure.",
      "Confirm the clamps are tight and the hose is not kinked.",
    ],
    buyerNote: "The HY-RH-645 is the NBR fuel hose — specify the bore, pressure and compound up front, and buy on consistency.",
  },
  "rubber-hoses-custom-auto-black-elbow-epdm-rubber-hose-pipe-cool": {
    application: [
      "The HY-RH-646 is an auto black elbow EPDM rubber hose for coolant elbow and radiator pipe circuits.",
      "EPDM's glycol resistance suits the coolant loop, and the elbow bend is matched to the engine bay routing per application.",
    ],
    scenarios: [
      "Coolant elbow and radiator pipe circuits, where the hose makes a tight bend.",
      "Hot-climate markets, where coolant temperatures cycle hard and EPDM holds up.",
      "Replacement cooling systems, where the elbow routing must match the vehicle.",
    ],
    technical: [
      "EPDM resists water and glycol, which is why it is the coolant-circuit compound.",
      "The elbow form matches the engine bay routing without kinking.",
      "Reinforcement and inner diameter are confirmed per application.",
    ],
    procurement: [
      "For cooling-system importers this is the EPDM coolant elbow line — specify the bend and bore up front.",
      "Within the rubber-hoses category, the HY-RH-646 is the EPDM coolant elbow entry, distinct from the silicone lines and the NBR fuel lines — confirm the circuit rather than interchanging.",
    ],
    selectionNotes: [
      "Specify the elbow bend and inner diameter for the target routing.",
      "Confirm the EPDM compound and working pressure.",
      "Request the dimensional tolerance on the bore and bend.",
    ],
    maintenance: [
      "Inspect the elbow for cracking, hardening or soft spots.",
      "Replace on a time or mileage schedule rather than waiting for failure.",
      "Bleed the cooling system correctly after replacement.",
    ],
    buyerNote: "The HY-RH-646 is the EPDM coolant elbow hose — specify the bend and bore up front, and buy on compound consistency.",
  },
  "rubber-hoses-heat-resistant-braided-silicone-heater-vacuum-hose": {
    application: [
      "The HY-RH-647 is a heat-resistant braided silicone heater and vacuum hose.",
      "The silicone compound tolerates under-bonnet heat and the braid resists vacuum collapse, which together make it the heater-line and vacuum-line choice.",
    ],
    scenarios: [
      "Heater and vacuum lines, where the hose must hold vacuum without collapsing.",
      "High-heat under-bonnet circuits, where silicone is the compound of choice.",
      "Cold-climate heater circuits, where vacuum holding matters.",
    ],
    technical: [
      "Braided reinforcement resists collapse under vacuum, which plain silicone does less well.",
      "Silicone gives heat headroom, and the braid adds mechanical strength.",
      "Compound, reinforcement and inner diameter are confirmed per application.",
    ],
    procurement: [
      "For performance importers this is the heat-resistant braided silicone line — specify the circuit and bore up front.",
      "Within the rubber-hoses category, the HY-RH-647 is the heat-resistant braided entry, distinct from the HY-RH-639 braided line and the non-braided silicone lines — confirm the circuit rather than interchanging.",
    ],
    selectionNotes: [
      "Specify the circuit (heater vs vacuum) and the inner diameter.",
      "Confirm the braid reinforcement and working temperature.",
      "Request the dimensional tolerance on the bore.",
    ],
    maintenance: [
      "Inspect for hardening, cracking or collapse on vacuum lines.",
      "Replace on a time or mileage schedule rather than waiting for failure.",
      "Confirm the clamps are tight and the hose is not kinked.",
    ],
    buyerNote: "The HY-RH-647 is the heat-resistant braided silicone hose — specify the circuit and bore up front, and buy on reinforcement consistency.",
  },
  "rubber-hoses-custom-reinforced-silicone-turbo-heater-hose-90-de": {
    application: [
      "The HY-RH-648 is a reinforced silicone turbo and heater hose in a 90-degree elbow form.",
      "The reinforcement holds pressure and vacuum, silicone holds heat, and the 90° bend matches the turbo-to-intercooler or heater routing per application.",
    ],
    scenarios: [
      "Turbocharger and heater circuits with a 90° routing, where the bend must match the pipework.",
      "High-performance engines, where silicone's heat headroom and the reinforced pressure holding both matter.",
      "Custom intercooler piping, where the 90° form is a standard building block.",
    ],
    technical: [
      "Reinforcement lets the hose hold pressure and vacuum without collapsing.",
      "Silicone holds heat, which is why it is the turbo choice.",
      "The 90° bend is a standard form for turbo-to-intercooler and heater routing, with the bore confirmed per application.",
    ],
    procurement: [
      "For turbo and performance importers this is the 90° reinforced silicone line — specify the bore and confirm the 90° form up front.",
      "Within the rubber-hoses category, the HY-RH-648 is the 90° turbo/heater entry, distinct from the straight HY-RH-638 and the non-reinforced lines — confirm the routing rather than interchanging.",
    ],
    selectionNotes: [
      "Specify the 90° form and the inner diameter.",
      "Confirm the working temperature and pressure for the turbo or heater circuit.",
      "Request the dimensional tolerance on the bore.",
    ],
    maintenance: [
      "Inspect for hardening, cracking or collapse near the heat source.",
      "Replace on a time or mileage schedule rather than waiting for failure.",
      "Confirm the clamps are tight and the hose is routed without kinking.",
    ],
    buyerNote: "The HY-RH-648 is the 90° reinforced silicone turbo/heater hose — specify the bore and confirm the form up front, and buy on reinforcement consistency.",
  },
  "oil-filter-motorcycle-oil-gasoline-filter-fuel-filters": {
    application: [
      "The HY-OF-649 is a motorcycle oil and gasoline filter for the small-engine service market.",
      "It holds back wear metal in the oil circuit and screens particulate in the fuel line. Compact canister dimensions and flow rate matter more here than on a car, so thread, seal and media are confirmed per application.",
    ],
    scenarios: [
      "Motorcycles and small two-wheelers on short, frequent service intervals.",
      "Small-displacement engines where the filter must flow enough oil and fuel without restriction.",
      "Markets with variable fuel quality, where the gasoline filter protects jets and injectors from particulate.",
    ],
    technical: [
      "The compact canister is sized for small-engine housings, where media area is limited and flow margin is tight.",
      "Oil and fuel filtration are packaged as a matched line for the same small-engine platform.",
      "Because small engines have little pump headroom, the filter balances flow against filtration more finely than a passenger filter.",
    ],
    procurement: [
      "For two-wheeler distributors this is a small, model-specific line — confirm the exact bike before ordering.",
      "Within the category it is the small-engine entry, distinct from the passenger and heavy-duty numbers and from the HY-OF-637 line, so treat fitment as model-specific rather than interchangeable.",
    ],
    selectionNotes: [
      "Confirm the exact motorcycle make, model and engine before ordering.",
      "Request the flow rating, since compact filters have little margin.",
      "Check whether the gasoline filter is in-line or an in-tank strainer.",
    ],
    maintenance: [
      "Replace at the motorcycle's short service interval with the oil.",
      "Replace the gasoline filter on schedule or earlier with variable fuel quality.",
      "Confirm correct seating to avoid leaks from the compact seal.",
    ],
    buyerNote: "The HY-OF-649 is the small-engine oil and fuel filter line — confirm the exact bike, and buy on flow rating and media rather than price.",
  },
  "spark-plugs-auto-original-genuine-engine-spark-plug": {
    application: [
      "The HY-SP-650 is a gasoline engine spark plug for the ignition aftermarket.",
      "Heat range, thread reach and electrode gap are the three details that must match the engine, so the exact application is confirmed per model before ordering.",
    ],
    scenarios: [
      "Gasoline engines on the plug replacement interval, where the plug's heat range and reach must match the engine.",
      "Turbocharged and high-compression engines, where heat-range matching prevents pre-ignition and fouling.",
      "Markets with frequent cold starts, where a correctly gapped plug ensures reliable ignition.",
    ],
    technical: [
      "The heat range describes how fast the plug dissipates heat — a too-hot plug risks pre-ignition, a too-cold plug fouls with carbon.",
      "Thread reach and seat type must match the head, otherwise the plug does not sit or seal correctly.",
      "Electrode material (nickel, platinum, iridium) drives service life and spark consistency, and the gap is factory-set for the engine.",
    ],
    procurement: [
      "For ignition importers this is the generic spark-plug line — confirm the exact engine application, because a wrong heat range or reach damages the engine.",
      "Within the category it is the sole spark-plug SKU, positioned by engine code rather than by a single generic part number.",
    ],
    selectionNotes: [
      "Confirm the exact engine code and application before ordering.",
      "Request the electrode material and factory-set gap in writing.",
      "Match the heat range and thread reach to the engine, not by appearance.",
    ],
    maintenance: [
      "Replace on the interval for the electrode material, and follow the engine schedule first.",
      "Use the factory-set gap and avoid re-gapping fine-wire electrodes.",
      "Inspect removed plugs for fouling or overheating, which points to a heat-range mismatch.",
    ],
    buyerNote: "The HY-SP-650 is the sole spark-plug SKU — confirm the exact engine code and heat range, because a wrong match is the one mistake that can damage the engine.",
  },
  "fuel-filter-diesel-fuel-filter-water-separator": {
    application: [
      "The HY-FF-651 is a diesel fuel filter water separator for the common-rail aftermarket.",
      "Particulate and free-water removal are confirmed per application — the filtration rating and drain arrangement protect injectors and the high-pressure pump from premature wear.",
    ],
    scenarios: [
      "Common-rail diesel applications where injector and pump protection is the entire point of the part.",
      "Markets with variable diesel quality, where water and particulate loading are higher.",
      "Commercial and fleet diesel, where a separator bowl and drain are the practical way to manage water.",
    ],
    technical: [
      "Water separation coalesces free water so it settles and can be drained, keeping it out of the injectors.",
      "The filtration rating sets the finest particle stopped, matched to common-rail injector clearances.",
      "Because it is positioned as a generic aftermarket line rather than a specific OE number, the fitting style and flow rating are confirmed per application.",
    ],
    procurement: [
      "For diesel importers this is the generic water-separator entry — confirm the flow and fitting per application, since it carries no single OE anchor.",
      "Within the fuel-filter category, the HY-FF-651 is the generic line, distinct from the OE-matched 500FH / 900FG / 1000FH / FF5507 / 23390 numbers — confirm the application rather than interchanging.",
    ],
    selectionNotes: [
      "Confirm the flow rating and fitting style, since this part carries no single OE anchor.",
      "Require the micron rating and water-separation capability in writing.",
      "Confirm the drain arrangement for the target installation.",
    ],
    maintenance: [
      "Replace on the diesel service schedule, and shorten it in markets with variable fuel quality.",
      "Drain accumulated water from the separator bowl on schedule.",
      "Bleed or prime the system correctly after replacement.",
    ],
    buyerNote: "The HY-FF-651 is the generic diesel water separator — confirm the flow and fitting per application, and require the micron rating and water-separation capability in writing.",
  },
  "oil-filter-heavy-duty-trucks-oil-filters": {
    application: [
      "The HY-OF-652 is a heavy-duty truck oil filter for extended-drain commercial fleets.",
      "It holds back soot, wear metal and sludge across long oil-drain intervals. Canister integrity, media capacity and bypass-valve setting are confirmed per application, since a truck filter runs far longer between services than a passenger filter.",
    ],
    scenarios: [
      "Long-haul trucks and buses running extended oil-drain intervals, where the filter must hold contaminant far longer than a passenger filter.",
      "Off-highway and construction equipment working in dust and heat, where soot loading and thermal stress are both elevated.",
      "Cold-climate cold starts, where a correctly calibrated bypass valve keeps oil flowing until the media warms.",
    ],
    technical: [
      "The heavy-duty canister survives the higher pressure and vibration of a commercial diesel, unlike a light-passenger spin-on.",
      "Heavy-duty filters use a larger media area than a light-passenger spin-on (general category knowledge); no measured dirt-holding figure is published.",
      "The bypass valve is calibrated to the oil system of the target truck engine, which is why the part is matched per application rather than sold as a universal size.",
    ],
    procurement: [
      "For fleet and truck-parts distributors, qualify the burst rating and media capacity, then buy on batch consistency — a truck filter failure is far costlier than a passenger one.",
      "Within the oil-filter category this is the heavy-duty end, distinct from the passenger and motorcycle numbers and from the LF14000NN specific OE line — confirm the application rather than interchanging.",
    ],
    selectionNotes: [
      "Confirm the truck application and the bypass setting before ordering.",
      "Ask for the burst-pressure rating and media dirt-holding capacity in writing for fleet programs.",
      "Verify gasket and canister finish for corrosion resistance in humid or coastal operation.",
    ],
    maintenance: [
      "Replace at the fleet's oil-drain interval, and do not extend it beyond what the filter is rated to hold.",
      "Inspect the drained filter and oil for soot over-loading, which points to a shortened interval.",
      "Clean the mounting surface and confirm the seal seats squarely before torquing to specification.",
    ],
    buyerNote: "The HY-OF-652 is the heavy-duty truck oil filter — for fleet buyers the burst rating and media capacity are the two numbers to pin down in writing before committing to volume.",
  },
};

export function getProductContent(slug: string): ProductContent | undefined {
  return productContent[slug];
}
