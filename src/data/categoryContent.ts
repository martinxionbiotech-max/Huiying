// Category page enrichment — original editorial content (purchasing guide,
// long-tail knowledge, FAQ with brand+model keywords, selection advice).
// Written in original prose; not copied from the source site.

export interface CategoryFaq {
  q: string;
  a: string;
}

export interface CategoryContent {
  slug: string;
  purchasingGuide: string[]; // paragraphs, original procurement-perspective guidance
  longTail: string[]; // long-tail knowledge paragraphs
  faqs: CategoryFaq[];
  selectionAdvice: { heading: string; items: string[] }; // subjective conclusions
}

export const categoryContent: CategoryContent[] = [
  {
    slug: 'air-filter',
    purchasingGuide: [
      'When you source engine air filters for resale or fleet use, the decision that matters most is dust-holding capacity versus airflow. In dusty operating regions — desert routes, construction sites, agricultural work — a filter with a high pleat count and consistent fold spacing will hold more contamination before airflow drops off, which directly extends service intervals and protects cylinders and piston rings from abrasive wear.',
      'On the procurement side, ask your supplier for the media specification and the filtration-efficiency target, not just the outer dimensions. Two filters that look identical can differ sharply in paper grade and end-cap sealing. For private-label and OEM-supply programs, also confirm whether the manufacturer can hold the fold spacing and end-cap tolerances across large batches, because consistency is what keeps your return rate low.',
      'Price alone is a weak signal here. A low-cost air filter that lets fine dust through can accelerate bore wear, and the hidden cost lands on your customer\'s engine. For our own range, we recommend buyers quote a representative OE or cross-reference number so the pleat count, media area and seal design can be matched to the specific application rather than guessed from a photo.',
    ],
    longTail: [
      'The fold (pleating) process is one of the most important production steps in an engine air filter. Even spacing between pleats prevents the paper from sticking together and increases the usable dust-holding capacity; in high-humidity climates, tightly packed folds also trap moisture and degrade faster, which is why fold geometry is checked during manufacture.',
      'In a dry, sandy environment the maintenance interval for an air filter should be shortened rather than read straight from a generic mileage table. A blocked element does not just reduce filtering — it restricts airflow, enriches the air-fuel mixture and can cause rough running, poor acceleration and rising coolant temperature during long climbs.',
    ],
    faqs: [
      {
        q: 'Which air filter fits a Toyota Corolla or Camry?',
        a: 'Both the Corolla and Camry are common applications for panel-style engine air filters. Because the exact part depends on the model year and engine, we match against your OE or cross-reference number rather than by name alone — common applications include Toyota Corolla, Camry and RAV4, with the precise part confirmed per fitment table.',
      },
      {
        q: 'Do you make air filters for the Honda Civic and CR-V?',
        a: 'Yes — the Honda Civic, Accord and CR-V are common application references in our air-filter range. Panel air filters for these models are matched by OE number and engine code; send us your reference and we confirm the correct pleat count and media area.',
      },
      {
        q: 'What about Volkswagen Golf or BMW 3 Series air filters?',
        a: 'The Volkswagen Golf, Jetta, Passat and Tiguan, as well as the BMW 3 Series and 5 Series, are common applications for engine air filters in our catalog. European models frequently use panel or cylindrical elements, so we verify the housing shape and dimensions before quoting.',
      },
      {
        q: 'How often should an air filter be replaced in a dusty market?',
        a: 'As a rule of thumb we recommend inspecting the element at every oil service and replacing it earlier than the nominal interval in dry or dusty conditions. A visibly darkened or clogged outer surface is a sign to replace, because restricted airflow hurts both performance and fuel economy.',
      },
    ],
    selectionAdvice: {
      heading: 'Selection advice from our team',
      items: [
        'Dusty or desert markets: prioritise dust-holding capacity and pleat consistency over price.',
        'Humid climates: confirm the media resists moisture uptake and the end-caps seal tightly.',
        'Fleet / commercial buyers: quote OE numbers so media area and seal design are matched, not guessed.',
      ],
    },
  },
  {
    slug: 'cabin-filter',
    purchasingGuide: [
      'Cabin air filters sit between the outside air and the people in the car, so the buying decision should weigh filtration of fine particulate and pollen against airflow and any odour-control layer. For aftermarket buyers, the practical questions are the filter\'s efficiency class, whether it carries an activated-carbon layer, and whether the frame seals tightly enough to stop unfiltered air bypassing the media.',
      'On the procurement side, cabin filters are a fast-moving, price-sensitive line, which makes batch consistency and packaging quality as important as the media itself. Ask the manufacturer how they validate the carbon layer adhesion and the frame dimensional tolerance, because a filter that rattles or leaks at the edges will generate returns even if the paper is good.',
      'From our perspective, the best value for a distributor is a mid-to-high efficiency cabin filter with a genuine activated-carbon layer, positioned clearly by efficiency rather than by brand confusion. That lets the reseller sell on air quality and comfort rather than competing on price alone.',
    ],
    longTail: [
      'Activated-carbon cabin filters do more than trap dust: the carbon layer adsorbs gases and odours, which matters in congested urban driving where exhaust and diesel fumes are constant. A standard particulate cabin filter will stop pollen and dust but will not address gaseous odours to the same degree.',
      'Because cabin filters are often hidden behind the glovebox, they are easy to forget. A saturated cabin filter reduces HVAC airflow, fogs windows more readily in humid weather and can develop a musty smell — all symptoms buyers and workshops can use to explain the value of a timely replacement to the vehicle owner.',
    ],
    faqs: [
      {
        q: 'Do you supply a cabin filter for the Honda Civic or Hyundai Elantra?',
        a: 'Both the Honda Civic and the Hyundai Elantra are common applications for cabin (pollen) filters, along with the Toyota Corolla, Volkswagen Golf and Nissan Altima. We match the exact panel or frame type by OE number, and can supply a standard or activated-carbon version.',
      },
      {
        q: 'Is an activated-carbon cabin filter worth the extra cost?',
        a: 'For urban and highway fleets where drivers sit in traffic, yes — the carbon layer reduces gaseous odours that a plain particulate filter cannot remove. For a budget line in rural markets, a standard pollen filter may be sufficient.',
      },
      {
        q: 'Which cabin filters fit the Great Wall Haval H6 or Geely Boyue?',
        a: 'The Haval H6 and Geely Boyue are common domestic-brand applications in our cabin-filter range. We confirm the panel dimensions and any carbon option against the model year before quoting.',
      },
      {
        q: 'How can I tell a cabin filter needs replacing?',
        a: 'Reduced airflow from the vents, persistent window fogging and a musty odour are the usual signs. We recommend checking the cabin filter at the same time as the engine air filter, and replacing it roughly once a year or as the service schedule requires.',
      },
    ],
    selectionAdvice: {
      heading: 'Selection advice from our team',
      items: [
        'Urban / congested markets: stock the activated-carbon version and sell on air quality.',
        'Retail vs workshop: keep a plain particulate SKU for price-sensitive retail and a carbon SKU for premium service.',
        'Confirm the frame type (panel vs cartridge) per OE to avoid edge-seal returns.',
      ],
    },
  },
  {
    slug: 'oil-filter',
    purchasingGuide: [
      'The oil filter is the one part replaced at every oil service, so its cost-of-failure is spread across the entire engine. When sourcing oil filters, the factors that matter are the media efficiency and the bypass-valve setting, not just thread size. A filter with the wrong bypass calibration can either starve the engine of oil in cold starts or let unfiltered oil circulate when the media is loaded.',
      'For importers and private-label programs, ask the manufacturer to state the media micron rating, the burst-pressure rating and the anti-drain-back valve design, because these are the engineering details that separate a service-grade filter from a look-alike. Also verify the canister and seal materials for consistent torque and leak-free fitment.',
      'Our own advice to buyers is to never buy oil filters purely on price for engines that run long service intervals or turbochargers. The small saving disappears the first time a filter bypasses early or a seal leaks, and the reputational cost with a workshop customer is far higher than the part cost.',
    ],
    longTail: [
      'Oil filters are commonly spin-on (a sealed metal canister) or cartridge (a replaceable element inside a reusable housing). Both are common across the brands we serve; the spin-on type dominates aftermarket service, while many modern European engines use a cartridge element.',
      'The anti-drain-back valve keeps oil in the filter when the engine stops, so pressure builds faster at the next start and the top end is not left dry. The bypass valve is a safety feature that opens if the media becomes fully blocked, trading filtration for uninterrupted oil flow in an emergency.',
    ],
    faqs: [
      {
        q: 'Which oil filter fits a Toyota Corolla, Honda Civic or Ford Focus?',
        a: 'The Toyota Corolla, Honda Civic and Ford Focus are all common applications for spin-on or cartridge oil filters. Because thread pitch, seal diameter and bypass pressure differ by engine, we match the part by OE number and engine code rather than by model name.',
      },
      {
        q: 'Do you offer oil filters for the BMW 3 Series and Mercedes-Benz C-Class?',
        a: 'Yes — the BMW 3 Series and Mercedes-Benz C-Class are common applications in our oil-filter range, typically cartridge-style elements on these engines. We confirm the housing type and element dimensions per OE before quoting.',
      },
      {
        q: 'Why should the oil filter be replaced with the oil, not just the oil?',
        a: 'A used filter retains a share of the old oil and its contaminants, so reusing it lets some of that back into fresh oil. Replacing the filter with every oil change protects the new oil and extends engine life.',
      },
      {
        q: 'What oil filters fit the Haval H6 or Geely Emgrand?',
        a: 'The Haval H6 and Geely Emgrand are common domestic applications in our oil-filter range. We match the canister thread, seal and bypass specification to the engine family on request.',
      },
    ],
    selectionAdvice: {
      heading: 'Selection advice from our team',
      items: [
        'Turbocharged or long-interval engines: specify the correct bypass-valve setting and burst rating.',
        'Confirm spin-on vs cartridge by engine — mixing these is a common ordering error.',
        'Batch buyers: request the media micron rating and anti-drain-back valve spec in writing.',
      ],
    },
  },
  {
    slug: 'fuel-filter',
    purchasingGuide: [
      'Fuel filters protect the injectors and the high-pressure fuel pump, and in diesel systems those components are expensive to repair. The sourcing decision should therefore focus on filtration efficiency, water-separation capability and micron rating rather than on the canister size alone, because fine particles and water are what destroy common-rail injectors over time.',
      'For diesel applications in particular, ask whether the filter provides water separation and at what micron rating. In markets with variable fuel quality, a filter that catches both particulate and water will pay for itself many times over by protecting injectors from premature wear and corrosion.',
      'Our advice to buyers is to match the filter to the fuel system, not just the vehicle. A high-pressure common-rail diesel engine has far stricter cleanliness requirements than a basic gasoline application, and quoting the OE number lets us confirm the correct filtration rating and fitting style.',
    ],
    longTail: [
      'Diesel engines using high-pressure common-rail injection demand very clean fuel. Unfiltered water or particulate causes abrasive wear inside the injector and can damage the high-pressure pump, leading to rough running, power loss and rising fuel consumption long before any obvious failure.',
      'Fuel filters come in in-line and cartridge (spin-on) forms, and some modern gasoline vehicles use an in-tank strainer instead of a replaceable external filter. Diesel light-commercial and truck applications, by contrast, rely heavily on replaceable external fuel filters with water-separation media.',
    ],
    faqs: [
      {
        q: 'Which fuel filter fits a Toyota Hilux or Ford Ranger diesel?',
        a: 'The Toyota Hilux and Ford Ranger are common diesel applications for replaceable fuel filters with water-separation media. We match the filter by OE number and confirm the inlet/outlet style and micron rating for the engine.',
      },
      {
        q: 'Do you supply fuel filters for Isuzu D-Max or JAC trucks?',
        a: 'Yes — the Isuzu D-Max and JAC commercial range are common applications in our fuel-filter range, where water separation and high filtration efficiency are essential for common-rail diesel protection.',
      },
      {
        q: 'Why does a diesel fuel filter need water separation?',
        a: 'Water in diesel causes injector wear, corrosion and poor combustion. A fuel filter with water-separation media traps both particulate and free water, protecting the high-pressure pump and injectors.',
      },
      {
        q: 'What fuel filters fit the Geely Emgrand or Volkswagen Golf?',
        a: 'For gasoline models like the Geely Emgrand and Volkswagen Golf, the external in-line fuel filter is a common fitment on many versions. We confirm the exact fitting and micron rating by OE number.',
      },
    ],
    selectionAdvice: {
      heading: 'Selection advice from our team',
      items: [
        'Diesel / common-rail fleets: require water separation and a tight micron rating.',
        'Variable fuel-quality markets: shorten the replacement interval and carry spare elements.',
        'Match inlet/outlet fitting style by OE — fuel systems are unforgiving of wrong connectors.',
      ],
    },
  },
  {
    slug: 'wiper',
    purchasingGuide: [
      'Wiper blades are selected by blade length, curvature and connector (adapter) type rather than by a single model code, so sourcing them well means building a range that covers the common lengths and adapter styles in your market. For a distributor, the key commercial decisions are the blade profile (conventional frame, hybrid or flat beam) and the rubber compound, which together determine durability and noise.',
      'From a procurement standpoint, ask about the rubber compound and whether the blade is coated for smooth, quiet wiping. A flat (beam) blade with a good silicone or coated rubber edge performs better and lasts longer than a cheap conventional blade, which matters for repeat sales and warranty claims.',
      'Our advice to buyers is to stock the beam-blade profile as the mainstream line and keep conventional frames for price-sensitive replacement demand, then confirm the connector type per vehicle before quoting bulk orders.',
    ],
    longTail: [
      'Flat-beam wiper blades use a pre-curved metal spring strip to distribute pressure evenly across the glass, which gives more consistent contact than a conventional multi-point frame — especially on curved modern windscreens. Hybrid blades combine a conventional frame with a beam profile for a middle-ground option.',
      'Wiper life is shortened by sun, heat and heavy use, so in hot or high-UV climates blades should be replaced more often. Streaking, chattering or a band of missed glass are the signs it is time to change the blade.',
    ],
    faqs: [
      {
        q: 'Which wiper blades fit a Toyota Corolla or Volkswagen Golf?',
        a: 'Wiper fitment is defined by blade length and connector type, and the Toyota Corolla and Volkswagen Golf are common application examples with specific length pairings. We confirm the exact lengths and adapter style per model year before quoting.',
      },
      {
        q: 'Do you supply wipers for the Geely Emgrand or Great Wall Haval H6?',
        a: 'Yes — the Geely Emgrand and Haval H6 are common domestic applications in our wiper range. We match the blade lengths and connector type to the specific model and year.',
      },
      {
        q: 'What is the difference between a beam and a conventional wiper blade?',
        a: 'A beam blade has a pre-curved spring profile that presses evenly across the glass, while a conventional blade uses a metal frame with multiple contact points. Beam blades generally wipe more consistently on curved windscreens.',
      },
      {
        q: 'How do I know which wiper size to order?',
        a: 'Measure the current blade length or provide the vehicle model and year, and we confirm the correct length pair and connector (hook, push-button, pinch-tab or bayonet) for the application.',
      },
    ],
    selectionAdvice: {
      heading: 'Selection advice from our team',
      items: [
        'Hot / high-UV markets: stock coated or silicone-edge beam blades for longer life.',
        'Confirm connector type per vehicle to avoid ordering errors on bulk lines.',
        'Carry both beam and conventional profiles to cover premium and budget segments.',
      ],
    },
  },
  {
    slug: 'brake-pads',
    purchasingGuide: [
      'Brake pads are the highest-safety consumable on the vehicle, so the sourcing decision turns on friction formulation and hardware completeness more than on unit price. A ceramic pad trades a little initial bite for quieter, lower-dust operation and gentler rotor wear, while a semi-metallic pad delivers stronger cold bite and heat tolerance at the cost of more dust and rotor wear — the right choice depends on the driving profile of the market you serve.',
      'For importers and private-label programs, the checklist is the backing-plate fit, the chamfer and slot pattern, and whether the noise-reduction shims, springs and anti-rattle clips are included in the box. A pad that fits the caliper but ships without the hardware kit generates returns and workshop complaints, so confirm the full set contents per OE number.',
      'Our advice to buyers is to quote the OE or cross-reference number and match the friction material to the application — ceramic for the premium urban/SUV segment, semi-metallic for fleets and heavier vehicles — rather than mixing on price alone.',
    ],
    longTail: [
      'Ceramic and semi-metallic pads differ mainly in how they manage heat and noise. Ceramic compounds use ceramic fibres and fillers that run quieter and cooler with less dust, which suits modern passenger cars and SUVs; semi-metallic compounds use metal fibres for strong bite and high-temperature stability, which suits heavier vehicles and demanding duty cycles.',
      'New pads should be bedded in against the rotor for the first few hundred kilometres to transfer a consistent friction film. Skipping this step can cause uneven deposits, noise and judder, and is the most common cause of post-installation complaints.',
    ],
    faqs: [
      { q: 'Which brake pads fit a Toyota Corolla or Camry?', a: 'Both the Corolla and Camry are common applications for ceramic front brake pads in our range. The exact pad is matched by OE number — for example 04465-0K020, 04465-04030 and 04465-0K070 for several Toyota platforms — and we confirm the full set contents before quoting.' },
      { q: 'Do you offer brake pads for the Honda Civic or Hyundai Elantra?', a: 'Yes — the Honda Civic and Hyundai Elantra are common applications in our brake-pad range. We match the pad set by OE number and confirm the friction material and hardware kit per model.' },
      { q: 'What is the difference between ceramic and semi-metallic pads?', a: 'Ceramic pads are quieter, lower-dust and easier on rotors, while semi-metallic pads offer stronger cold bite and higher heat tolerance. The right material depends on the vehicle and driving conditions, so we confirm the recommendation per application.' },
      { q: 'How can I tell when brake pads need replacing?', a: 'Squealing wear indicators, reduced pedal feel, longer stopping distance or a low-pad warning light are the usual signs. We recommend inspecting pad thickness at every service and replacing before the friction material reaches the minimum thickness.' },
    ],
    selectionAdvice: {
      heading: 'Selection advice from our team',
      items: [
        'Premium / urban segment: ceramic for quiet, low-dust operation and longer rotor life.',
        'Fleet / heavy vehicles: semi-metallic for cold bite and heat tolerance.',
        'Always confirm the noise/hardware kit is included per OE to avoid returns.',
      ],
    },
  },
  {
    slug: 'spark-plugs',
    purchasingGuide: [
      'Spark plugs are selected by heat range, thread reach and electrode material, not by a single generic part number. A plug with the wrong heat range will either foul at low load or overheat at high load, so the sourcing decision should be driven by the exact engine application rather than by appearance or price.',
      'For importers and private-label programs, the useful checks are the centre-electrode material (nickel, platinum or iridium), the thread size and reach, and the factory-set gap. Iridium plugs cost more up front but last far longer and are now the mainstream OEM choice, which makes them the natural premium line.',
      'Our advice to buyers is to quote the OE or engine code and match the heat range and electrode spec per model, then position iridium as the premium line and nickel as the price-sensitive option.',
    ],
    longTail: [
      'Electrode material drives both cost and service life. Nickel is the budget option with the shortest life; platinum is a mid-tier step up; iridium offers the longest life and most consistent spark, which is why it is the factory fit on most modern engines.',
      'The heat range describes how quickly a plug dissipates heat from the firing tip. A too-hot plug can cause pre-ignition and engine damage, while a too-cold plug fouls with carbon deposits — which is why matching the heat range to the engine is the first correctness check.',
    ],
    faqs: [
      { q: 'Which spark plugs fit a Toyota or Honda gasoline engine?', a: 'Toyota and Honda gasoline engines are common applications in our spark-plug range. The exact plug is matched by OE number and engine code, and we confirm the heat range, thread reach and electrode material per model.' },
      { q: 'What is the difference between iridium and platinum spark plugs?', a: 'Iridium plugs have a finer, harder electrode that lasts longer and produces a more consistent spark than platinum, which is why they are the mainstream OEM choice. Platinum is a good mid-tier alternative; nickel is the budget option.' },
      { q: 'How often should spark plugs be replaced?', a: 'The interval depends on the electrode material — roughly 30,000 km for nickel, 60,000 km for platinum and up to 100,000 km or more for iridium — but always follow the engine manufacturer schedule first.' },
      { q: 'Can I gap the spark plugs myself?', a: 'We recommend using the factory-set gap for iridium and platinum plugs. Confirm the correct gap for the application and avoid re-gapping fine-wire iridium electrodes, which are easily damaged.' },
    ],
    selectionAdvice: {
      heading: 'Selection advice from our team',
      items: [
        'Premium / long-life: iridium electrodes for consistent spark and extended intervals.',
        'Match heat range and thread reach by engine code to avoid pre-ignition or fouling.',
        'Keep a nickel line for price-sensitive demand and an iridium line for the service market.',
      ],
    },
  },
  {
    slug: 'rubber-hoses',
    purchasingGuide: [
      'Rubber hoses are chosen by compound, reinforcement and inner diameter, and the wrong compound is the most common failure. EPDM suits coolant and radiator circuits, NBR (nitrile) resists oil and fuel, and silicone handles higher heat — so the first sourcing question is which fluid and temperature the hose will carry.',
      'For importers and private-label programs, ask about the reinforcement (fabric or braided) and the dimensional tolerance on the inner diameter, because a hose that swells, hardens or collapses under heat or oil is a premature-failure risk that ends up on the end customer.',
      'Our advice to buyers is to specify the compound, the working temperature and the inner diameter up front, and to treat material consistency across a batch as the main quality signal — not the price.',
    ],
    longTail: [
      'EPDM, NBR and silicone each serve a different circuit. EPDM is the standard for coolant because it resists water and glycol; NBR resists oil and fuel and is used for fuel lines and oil-transfer hoses; silicone tolerates higher temperatures and is used for turbo, heater and vacuum lines where heat resistance matters.',
      'Reinforcement is what lets a hose hold pressure and vacuum without collapsing. A braided or fabric-reinforced hose keeps its shape under vacuum and at temperature, while an unreinforced hose is only suitable for low-pressure gravity flow.',
    ],
    faqs: [
      { q: 'What is the difference between EPDM, NBR and silicone hose?', a: 'EPDM resists water and coolant and is the standard radiator choice; NBR resists oil and fuel; silicone handles higher heat. The right compound depends on the fluid and working temperature, so we confirm the application before quoting.' },
      { q: 'Do you make custom-sized radiator or turbo hoses?', a: 'Yes — our hose range includes custom EPDM elbow, NBR and reinforced silicone hoses in a range of inner diameters, and we match the compound, reinforcement and dimensions to your application.' },
      { q: 'Which hose fits the BMW 17127525023 upper radiator application?', a: 'The BMW 17127525023 upper radiator hose is a common application in our range, supplied in EPDM for coolant service. We confirm the diameter and any elbow geometry per the OE number before quoting.' },
      { q: 'How can I tell a hose needs replacing?', a: 'Swelling, hardening, cracks, soft spots or leaks at the clamp are the usual signs. Coolant hoses are typically inspected at every service and replaced on a time or mileage schedule rather than waiting for failure.' },
    ],
    selectionAdvice: {
      heading: 'Selection advice from our team',
      items: [
        'Coolant circuits: EPDM for water/glycol resistance.',
        'Fuel / oil circuits: NBR for oil and fuel resistance.',
        'High-heat circuits: silicone with reinforcement for turbo, heater and vacuum lines.',
      ],
    },
  },
];

export function getCategoryContent(slug: string): CategoryContent | undefined {
  return categoryContent.find((c) => c.slug === slug);
}
