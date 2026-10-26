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
];

export function getCategoryContent(slug: string): CategoryContent | undefined {
  return categoryContent.find((c) => c.slug === slug);
}
