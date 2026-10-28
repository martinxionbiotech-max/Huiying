// Buying guides series — Pillar + 4 Cluster articles (carfilterspro.com /guides/).
//
// Editorial discipline (source brief, docs/source/guides-series-brief.md):
//   - Zero fabrication: no new OE numbers beyond those in the brief, and no
//     unverified filtration efficiency / pressure / flow / certification figures.
//   - Internal links follow the source brief's cross-linking plan
//     (Pillar ↔ 4 Clusters; Cluster 2/3 → Pillar + Cluster 4; Cluster 4 → Pillar
//     + Clusters 2/3). Product-category links target only real published pages.
//   - Cluster 4 links only data-site records directly relevant to the OE-number
//     argument (the SKU index + source-verified OE records used as examples).

export interface GuideStep {
  title: string;
  text: string;
}

export interface GuideSubsection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface GuideTable {
  headers: string[];
  rows: string[][];
  caption?: string;
}

export interface GuideSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  /** Paragraphs rendered after the table/bullets/steps/checklist within the section. */
  paragraphsAfter?: string[];
  /** Numbered (ordered) list — rendered as <ol>. */
  orderedBullets?: string[];
  /** Static pre-purchase / verification checklist — rendered as disabled checkboxes. */
  checklist?: string[];
  checklistNote?: string;
  table?: GuideTable;
  steps?: GuideStep[];
  subsections?: GuideSubsection[];
}

export interface GuideFaq {
  q: string;
  a: string;
}

export interface GuideLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  /** Opening paragraphs before the first section. */
  intro: string[];
  sections: GuideSection[];
  faq: GuideFaq[];
  /** In-article cross-links to other guides (source brief linking plan). */
  internalLinks: GuideLink[];
  /** The single product category this cluster guides toward. */
  relatedCategory?: { slug: string; name: string; href: string };
  /** Data-site records linked only where directly relevant (Cluster 4). */
  dataLinks?: GuideLink[];
  conclusion: { heading: string; paragraphs: string[] };
}

export const guidesPosts: Guide[] = [
  // ======================================================================
  // PILLAR
  // ======================================================================
  {
    slug: 'automotive-filter-selection-guide',
    title: 'Choosing the Right Automotive Filters: A Buyer\u2019s Guide',
    description:
      'A buyer\u2019s guide to automotive filter types and selection \u2014 engine air, oil, fuel and cabin filters, key checks per type, and a pre-purchase checklist for importers and wholesalers.',
    intro: [
      'Automotive filters are routine replacement parts, but selecting the wrong filter can create problems far beyond the cost of the component itself. For importers, wholesalers, and automotive parts distributors, an incorrect application can lead to customer complaints, returns, installation delays, and inventory that is difficult to sell.',
      'The challenge is that many filters look similar. Two products may share a comparable shape or overall dimension without necessarily having the same application, sealing requirements, filtration characteristics, or internal design.',
      'Choosing the right automotive filter therefore requires more than finding a product with a familiar appearance or a matching catalog reference. Buyers need to establish what the filter does, where it will be installed, which specifications matter, and how the proposed replacement has been verified.',
      'This guide explains the main types of automotive filters, the factors that influence selection, and the checks buyers should complete before placing an order.',
    ],
    sections: [
      {
        heading: 'What Are the Main Types of Automotive Filters?',
        paragraphs: [
          'Most conventional automotive filter purchasing programs cover four major categories: engine air filters, oil filters, fuel filters, and cabin air filters. Each serves a different purpose and must be evaluated against different application requirements.',
        ],
        subsections: [
          {
            heading: 'Engine Air Filters',
            paragraphs: [
              'Engine air filters remove airborne contaminants from the intake air before they enter the engine. Dust, sand, and other particles can contribute to wear if they reach sensitive engine components.',
              'When selecting an engine air filter, buyers should consider its dimensions, sealing surfaces, mounting design, filtration requirements, and intended vehicle application.',
              'A filter that appears to fit inside an airbox may still be unsuitable if its sealing geometry or airflow characteristics do not meet the intended requirements.',
            ],
          },
          {
            heading: 'Oil Filters',
            paragraphs: [
              'Oil filters remove contaminants from engine oil as part of the lubrication system. Depending on the application, a vehicle may use a spin-on filter, a replaceable cartridge, or another specified design.',
              'Important selection factors can include thread specification, gasket dimensions, mounting configuration, bypass-valve characteristics, and anti-drainback features where applicable.',
              'Matching the outside dimensions alone is not sufficient. Internal design and operating requirements may differ even when two filters look alike.',
            ],
          },
          {
            heading: 'Fuel Filters',
            paragraphs: [
              'Fuel filters help control contaminants in the fuel system. Their design and requirements vary with the fuel type, system architecture, pressure conditions, and vehicle application.',
              'Some applications use inline filters, while others incorporate filtration into a larger fuel delivery module.',
              'Before selecting a replacement, buyers should confirm the correct connections, installation arrangement, application, and relevant pressure and filtration requirements. A product intended for one fuel system should not be assumed suitable for another simply because the connectors appear similar.',
            ],
          },
          {
            heading: 'Cabin Air Filters',
            paragraphs: [
              'Cabin air filters help reduce airborne particles entering the passenger compartment through the vehicle\u2019s ventilation system. Depending on the design, filter media may target different types of airborne contaminants.',
              'Standard particulate filters and activated-carbon versions are not necessarily interchangeable in every application.',
              'Buyers should check dimensions, frame design, airflow direction where specified, and the media type required by the intended application.',
            ],
          },
        ],
      },
      {
        heading: 'How to Choose the Right Automotive Filter',
        paragraphs: ['Reliable filter selection follows a sequence of checks rather than a single lookup.'],
        steps: [
          {
            title: 'Identify the Vehicle Application',
            text: 'Start with the vehicle make, model, production year, engine variant, and other application details required by the relevant catalog. A model name alone may not identify the correct replacement. Different engines, production periods, markets, and equipment configurations can use different filter designs. For wholesale purchasing, define the target vehicle population before requesting a quotation. This helps prevent a supplier from quoting a product that covers only part of the intended market.',
          },
          {
            title: 'Find the Original Equipment Reference',
            text: 'An original equipment (OE) part number is often a useful starting point for identifying a replacement filter. Record the original number where available, together with the source of the reference and the vehicle application associated with it. Do not assume that every number found in an online marketplace, supplier spreadsheet, or third-party catalog is equally reliable. Conflicting references should be investigated before the product is approved for bulk purchasing.',
          },
          {
            title: 'Verify the Physical Specifications',
            text: 'Compare the specifications relevant to the filter category. These may include overall dimensions and shape; thread, connector, or mounting specifications; gasket dimensions and sealing arrangement; housing or frame configuration; and relevant internal components and functional specifications. The required checks differ by product. A cartridge filter, for example, requires a different verification process from a threaded spin-on filter.',
          },
          {
            title: 'Confirm Functional Requirements',
            text: 'A physically compatible component is not automatically functionally equivalent. Depending on the application, buyers may need to confirm filtration performance, airflow or flow characteristics, pressure requirements, bypass-valve behavior, media construction, and other relevant specifications. Use applicable technical documentation and test evidence rather than relying on general claims such as \u2018premium quality\u2019 or \u2018high efficiency\u2019.',
          },
          {
            title: 'Resolve Uncertainty Before Ordering',
            text: 'If the application data, part number, or technical specifications conflict, do not treat the match as confirmed. Ask the supplier for the supporting application information, product drawings, dimensional data, or relevant test documentation. For a new or uncertain application, sample evaluation may be appropriate before committing to a large order.',
          },
        ],
      },
      {
        heading: 'What Buyers Should Check for Each Filter Type',
        paragraphs: ['The most useful purchasing checklist depends on the product.'],
        table: {
          headers: ['Filter type', 'Key checks'],
          rows: [
            ['Engine air filter', 'Shape, dimensions, sealing, mounting, application'],
            ['Oil filter', 'Thread, gasket, housing, internal design, operating requirements'],
            ['Fuel filter', 'Fuel system, connections, pressure requirements, filtration specifications'],
            ['Cabin air filter', 'Dimensions, frame, airflow direction where specified, filter media'],
          ],
        },
        paragraphsAfter: [
          'This table is a starting point, not a universal specification. Buyers should use the requirements applicable to the actual vehicle and filter design.',
        ],
      },
      {
        heading: 'How to Verify a Replacement Filter',
        paragraphs: [
          'Replacement references should be treated according to the evidence supporting them. A catalog cross-reference can help identify a candidate product, but the reference alone does not necessarily prove complete application compatibility.',
          'A practical verification process is:',
        ],
        orderedBullets: [
          'Identify the original part number and vehicle application.',
          'Check the proposed replacement against credible catalog information.',
          'Compare the relevant physical and functional specifications.',
          'Investigate conflicting or incomplete information.',
          'Record the basis for the final application decision.',
          'Request additional documentation or samples where necessary.',
        ],
        paragraphsAfter: [
          'For example, a replacement oil filter may have a similar diameter and thread to the original part. That similarity is useful, but it does not establish that its gasket, internal components, or operating characteristics are suitable for the same application.',
          'The strength of the conclusion should match the strength of the evidence.',
        ],
      },
      {
        heading: 'How Wholesalers Should Evaluate Automotive Filter Suppliers',
        paragraphs: [
          'For distributors, product selection is only one part of the purchasing decision. The supplier must also support accurate catalog management and consistent replenishment.',
        ],
        subsections: [
          {
            heading: 'Catalog Coverage and Reference Accuracy',
            paragraphs: [
              'Ask how the supplier maintains application data and cross-reference information. Confirm whether the quoted products cover the intended vehicle variants and whether uncertain applications are clearly identified.',
              'A large catalog is valuable only when its information is sufficiently accurate for the intended use.',
            ],
          },
          {
            heading: 'Product Specifications and Quality Evidence',
            paragraphs: [
              'Request the technical documents relevant to the products being purchased. Depending on the filter category, these may include drawings, dimensional specifications, material information, test reports, and documented quality-control procedures.',
              'Distinguish between a supplier\u2019s general quality statement and evidence relating to a specific product or production batch.',
            ],
          },
          {
            heading: 'Samples and Approval Procedures',
            paragraphs: [
              'For unfamiliar products, a sample review can help confirm dimensions, construction, packaging, and labeling. Functional performance may require appropriate test methods and equipment; visual inspection alone cannot establish filtration performance.',
              'Define the approval criteria before production rather than relying on informal confirmation after delivery.',
            ],
          },
          {
            heading: 'Packaging, Labeling, and Traceability',
            paragraphs: [
              'For private-label and wholesale programs, agree on packaging artwork, part-number presentation, carton quantities, barcode requirements, and product identification.',
              'Clear labeling and traceability help distributors manage stock, investigate complaints, and reorder the correct items.',
            ],
          },
          {
            heading: 'Supply Consistency',
            paragraphs: [
              'Confirm production lead times, minimum order quantities, packaging requirements, and the supplier\u2019s process for communicating product or specification changes.',
              'A competitive quotation is useful, but a sustainable supply relationship also depends on repeatable specifications and reliable order execution.',
            ],
          },
        ],
      },
      {
        heading: 'A Practical Pre-Purchase Checklist',
        paragraphs: ['Before approving a new automotive filter for bulk purchasing, confirm the following:'],
        checklist: [
          'The target vehicle application has been defined.',
          'The OE number or other reference has a traceable source.',
          'Relevant dimensions and interfaces have been checked.',
          'Functional specifications have been reviewed where applicable.',
          'Conflicting catalog references have been resolved or documented.',
          'Product specifications and approval requirements have been agreed.',
          'Packaging, labeling, and order quantities have been confirmed.',
          'Uncertain applications have not been represented as verified fitments.',
        ],
        checklistNote:
          'For established products with reliable application records, this process may be straightforward. New products and unclear cross-references require more investigation.',
      },
    ],
    faq: [
      {
        q: 'Are all automotive filters with the same dimensions interchangeable?',
        a: 'No. Similar dimensions do not establish equivalent sealing, connections, internal construction, filtration characteristics, or vehicle application.',
      },
      {
        q: 'Is an OE number enough to select a replacement filter?',
        a: 'An OE number is an important starting point, but its accuracy and application context should be checked. Additional specification and application verification may be necessary.',
      },
      {
        q: 'Should wholesalers request samples before bulk orders?',
        a: 'Samples can be useful for new suppliers, unfamiliar products, or uncertain applications. However, a sample\u2019s appearance and dimensions alone cannot demonstrate every aspect of functional performance.',
      },
      {
        q: 'What information should buyers send when requesting a quotation?',
        a: 'Provide the filter category, OE number if available, target vehicle application, estimated quantity, packaging requirements, destination market, and any required technical documentation.',
      },
      {
        q: 'How can distributors reduce filter-related returns?',
        a: 'Use reliable application references, verify relevant specifications, establish approval procedures, and maintain clear product identification and traceability.',
      },
    ],
    internalLinks: [
      { label: 'Air Filter vs. Cabin Air Filter', href: '/guides/air-filter-vs-cabin-air-filter/' },
      { label: 'How to Choose the Right Oil Filter', href: '/guides/how-to-choose-an-oil-filter/' },
      { label: 'Automotive Fuel Filter Types', href: '/guides/automotive-fuel-filter-types/' },
      { label: 'Replacement Filter by OE Number', href: '/guides/replacement-filter-by-oe-number/' },
    ],
    conclusion: {
      heading: 'Conclusion: Verify Before You Scale',
      paragraphs: [
        'The best automotive filter purchasing process is not the one that produces the longest list of matching part numbers. It is the one that gives buyers a defensible basis for selecting the right product and repeating that decision across future orders.',
        'For importers and wholesalers, the priorities are clear: identify the intended application, verify the specifications that matter, understand the limits of cross-reference data, and work with suppliers who can support consistent product information.',
        'Before expanding a filter range or committing to bulk inventory, verify the application first. That discipline helps reduce avoidable purchasing errors and creates a stronger foundation for long-term distribution.',
      ],
    },
  },

  // ======================================================================
  // CLUSTER 1
  // ======================================================================
  {
    slug: 'air-filter-vs-cabin-air-filter',
    title: 'Air Filter vs. Cabin Air Filter: What Is the Difference?',
    description:
      'Engine air filter vs cabin air filter \u2014 what each protects, why they are not interchangeable, and the checks importers need to select the correct replacement.',
    intro: [
      'Engine air filters and cabin air filters are both designed to filter air, but they serve different systems and are not interchangeable simply because their names are similar.',
      'For automotive parts distributors, understanding this distinction matters when building product catalogs, identifying replacement parts, and advising customers. Confusing the two can lead to incorrect orders, unnecessary returns, and inaccurate product listings.',
      'The key difference is straightforward: an engine air filter protects the engine\u2019s air intake system, while a cabin air filter helps control the air entering the passenger compartment. Their applications, construction, and selection criteria should be evaluated separately.',
    ],
    sections: [
      {
        heading: 'What Does an Engine Air Filter Do?',
        paragraphs: [
          'An engine air filter removes airborne contaminants from the air entering the engine.',
          'Dust and other particles can contribute to wear when they reach sensitive engine components. The filter must therefore provide appropriate filtration while meeting the airflow requirements of the intended engine application.',
          'Engine air filters are commonly installed in the engine\u2019s air intake housing. Depending on the vehicle, they may use a panel, cylindrical, conical, or other application-specific design.',
          'When selecting an engine air filter, buyers should consider:',
        ],
        bullets: [
          'Vehicle make, model, year, and engine',
          'Filter shape and overall dimensions',
          'Sealing surfaces and housing fit',
          'Relevant filtration and airflow requirements',
          'OE number and replacement references',
        ],
        paragraphsAfter: [
          'A filter that fits inside the housing but does not seal correctly may allow unfiltered air to bypass the media. Correct application and sealing are therefore more important than visual similarity alone.',
        ],
      },
      {
        heading: 'What Does a Cabin Air Filter Do?',
        paragraphs: [
          'A cabin air filter helps reduce airborne particles entering the passenger compartment through the heating, ventilation, and air-conditioning system.',
          'Depending on the design and media, a cabin filter may target particulate matter, while an activated-carbon version may also help reduce certain odors and gaseous contaminants.',
          'Not every cabin filter provides the same level or type of filtration. Buyers should avoid treating all media designs as equivalent.',
          'Typical cabin filter designs include:',
        ],
        subsections: [
          {
            heading: 'Standard Particulate Filters',
            paragraphs: ['These use filter media designed to capture airborne particles. Their construction and performance depend on the specific product.'],
          },
          {
            heading: 'Activated-Carbon Cabin Filters',
            paragraphs: ['These incorporate activated carbon intended to adsorb certain gases and odors. Their effectiveness depends on the carbon material, quantity, construction, and test conditions.'],
          },
          {
            heading: 'Other Specialized Media',
            paragraphs: ['Some products use specialized media or layered structures. Any claims about their capabilities should be supported by relevant technical evidence.'],
          },
        ],
        paragraphsAfter: [
          'Selection factors include dimensions, frame design, airflow direction where specified, media type, and vehicle application.',
        ],
      },
      {
        heading: 'Engine Air Filter vs. Cabin Air Filter',
        table: {
          headers: ['Comparison', 'Engine air filter', 'Cabin air filter'],
          rows: [
            ['Main purpose', 'Filter intake air for the engine', 'Filter air entering the passenger compartment'],
            ['System', 'Engine air intake', 'HVAC and ventilation system'],
            ['Primary concern', 'Contaminant control and required airflow', 'Cabin air quality and required ventilation airflow'],
            ['Typical location', 'Air intake housing', 'Cabin ventilation housing'],
            ['Important fitment checks', 'Shape, sealing, dimensions, application', 'Frame, dimensions, airflow direction where specified'],
            ['Media options', 'Application-dependent engine intake media', 'Particulate, activated-carbon, or other specified media'],
          ],
        },
        paragraphsAfter: [
          'The two filter categories should have separate product records and application references in a wholesale catalog.',
        ],
      },
      {
        heading: 'Why the Two Filters Cannot Be Interchanged',
        paragraphs: [
          'The fact that both products filter air does not make them functionally equivalent.',
          'First, they are designed for different installation locations. Their shapes, frames, and sealing arrangements may be completely different.',
          'Second, their operating requirements differ. An engine intake filter must satisfy the relevant engine airflow and filtration requirements. A cabin filter must work within the vehicle\u2019s ventilation system.',
          'Third, their media and construction may serve different purposes. A cabin filter marketed for odor reduction should not be assumed suitable for engine intake use, and an engine air filter should not be substituted for a cabin filter.',
          'Even within the same category, replacement products require application-specific verification.',
        ],
      },
      {
        heading: 'How to Choose the Correct Replacement',
        paragraphs: ['A reliable replacement process follows four steps.'],
        steps: [
          {
            title: 'Identify the Correct Filter Category',
            text: 'Determine whether the requested product is an engine air filter or a cabin air filter. Do not rely on an incomplete description such as \u2018car air filter\u2019.',
          },
          {
            title: 'Confirm the Vehicle Application',
            text: 'Collect the vehicle make, model, year, engine variant where relevant, and the OE reference if available.',
          },
          {
            title: 'Compare the Relevant Specifications',
            text: 'Check dimensions, shape, sealing or frame design, and the required media type. Confirm airflow direction where the product specifies one.',
          },
          {
            title: 'Verify the Reference Before Bulk Ordering',
            text: 'Use credible catalog information and supporting specifications to confirm the candidate replacement. Investigate conflicting references before approving the item for distribution.',
          },
        ],
        paragraphsAfter: [
          'For a new supplier or an uncertain application, a sample may help confirm physical construction. It does not, by itself, establish filtration performance or complete vehicle compatibility.',
        ],
      },
      {
        heading: 'What Wholesale Buyers Should Consider',
        paragraphs: [
          'For distributors, the difference between the two filter categories should be reflected in product management as well as technical selection.',
          'Maintain separate catalog categories, use clear product descriptions, and ensure that packaging and part numbers identify the correct product.',
          'When evaluating suppliers, ask whether they can provide application information, dimensional specifications, consistent labeling, and documentation supporting relevant product claims.',
          'For activated-carbon cabin filters, confirm the actual media construction instead of assuming that every product described as a premium cabin filter contains activated carbon.',
          'A well-organized catalog helps customers identify the intended product before placing an order and reduces confusion during replenishment.',
        ],
      },
    ],
    faq: [
      {
        q: 'Is an engine air filter the same as a cabin air filter?',
        a: 'No. An engine air filter serves the engine intake, while a cabin air filter serves the passenger ventilation system.',
      },
      {
        q: 'Can a cabin air filter improve engine performance?',
        a: 'A cabin air filter is not designed to control engine intake air. Engine performance-related intake filtration requirements must be addressed by the correct engine air filter.',
      },
      {
        q: 'Are activated-carbon cabin filters always better?',
        a: 'Not in every respect. Activated carbon may help adsorb certain odors and gases, but buyers should compare the intended application, construction, relevant performance evidence, and cost.',
      },
      {
        q: 'Can two air filters with the same dimensions be interchangeable?',
        a: 'Not necessarily. Sealing, frame design, media, airflow characteristics, and application requirements may differ.',
      },
    ],
    internalLinks: [
      { label: 'Automotive Filter Selection Guide', href: '/guides/automotive-filter-selection-guide/' },
    ],
    relatedCategory: { slug: 'air-filter', name: 'Air Filter', href: '/products/air-filter/' },
    conclusion: {
      heading: 'Conclusion',
      paragraphs: [
        'Engine air filters and cabin air filters share a basic filtration concept, but they solve different problems. Treating them as separate product categories is essential for accurate catalog management and dependable replacement selection.',
        'For distributors, the practical rule is simple: identify the system first, verify the application second, and compare specifications before approving the replacement.',
        'For further guidance, see our [automotive filter selection guide](/guides/automotive-filter-selection-guide/) and browse the relevant [engine air filter](/products/air-filter/) or [cabin air filter](/products/cabin-filter/) product category.',
      ],
    },
  },

  // ======================================================================
  // CLUSTER 2
  // ======================================================================
  {
    slug: 'how-to-choose-an-oil-filter',
    title: 'How to Choose the Right Oil Filter for a Vehicle',
    description:
      'How to choose the right oil filter \u2014 spin-on vs cartridge, thread, gasket, bypass and anti-drainback checks, plus a verification checklist for bulk purchasing.',
    intro: [
      'An oil filter may look like a simple replacement component, but selecting the wrong one can create installation problems and may compromise the intended operation of the lubrication system.',
      'For automotive parts importers and wholesalers, the main challenge is not finding a filter that looks similar to the original. It is confirming that the replacement has the correct application, mounting interface, sealing arrangement, and functional characteristics.',
      'Thread size and external dimensions are useful checks, but they are only part of the selection process.',
      'This guide explains how to evaluate oil filter types, identify important specifications, and reduce uncertainty before purchasing replacement filters in bulk.',
    ],
    sections: [
      {
        heading: 'Understand the Main Types of Oil Filters',
        subsections: [
          {
            heading: 'Spin-On Oil Filters',
            paragraphs: [
              'A spin-on oil filter combines the filter media and housing in a single assembly. It is installed by attaching the complete unit to the specified mounting point.',
              'Important checks may include thread specification, gasket dimensions, housing dimensions, mounting configuration, and internal design.',
            ],
          },
          {
            heading: 'Cartridge Oil Filters',
            paragraphs: [
              'A cartridge oil filter uses a replaceable filter element installed in a separate housing. Depending on the design, the housing may contain additional components or require specific sealing elements.',
              'For cartridge applications, buyers should verify the element\u2019s dimensions, end-cap design, sealing interfaces, and any application-specific components.',
              'A cartridge that looks similar to the original may still differ in length, end construction, or sealing arrangement.',
            ],
          },
        ],
      },
      {
        heading: 'Start with the Vehicle Application',
        paragraphs: [
          'Before comparing individual products, identify the intended application.',
          'Collect the vehicle make, model, production year, engine variant, and OE part number where available. Depending on the vehicle, additional details may be needed to distinguish between engine or production configurations.',
          'Do not assume that every vehicle within a model range uses the same oil filter.',
          'For wholesale purchasing, a clear application list is particularly important when ordering several filter references for multiple vehicle platforms.',
        ],
      },
      {
        heading: 'Check the Oil Filter Thread and Mounting Interface',
        paragraphs: [
          'For threaded oil filters, the thread must match the specified mounting interface.',
          'Relevant information can include thread diameter, thread pitch, and thread form. A thread that appears close to the correct size should not be treated as an acceptable substitute without verification.',
          'For cartridge filters, the corresponding checks focus on the housing interface, element dimensions, and locating features.',
          'Also confirm that the product can be installed correctly within the intended assembly. Mounting compatibility is a requirement, not proof of full functional equivalence.',
        ],
      },
      {
        heading: 'Verify the Gasket and Sealing Arrangement',
        paragraphs: [
          'The gasket creates the seal between the filter and its mounting surface.',
          'Buyers should compare the relevant gasket dimensions and position, as well as the specified sealing arrangement. An incorrectly positioned or unsuitable gasket can cause installation difficulties or leakage.',
          'For cartridge filters, inspect the required O-rings and other sealing elements where applicable. Confirm whether these components are supplied with the product and whether their specifications match the intended application.',
          'Do not approve a replacement solely because its housing diameter or overall length is similar to the original.',
        ],
      },
      {
        heading: 'Understand Bypass Valves and Anti-Drainback Features',
        paragraphs: [
          'Oil filter designs may incorporate functional features that are important to the intended lubrication system.',
        ],
        subsections: [
          {
            heading: 'Bypass Valve',
            paragraphs: [
              'A bypass valve allows oil to flow around the filter media under specified conditions in designs that use this feature. Its presence, opening characteristics, and design requirements are application-dependent.',
              'A replacement should not be assumed suitable simply because both products contain a bypass valve. Relevant specifications must be checked where applicable.',
            ],
          },
          {
            heading: 'Anti-Drainback Valve',
            paragraphs: [
              'Some filters use an anti-drainback valve intended to help prevent oil from draining out of the filter or associated passages when the engine is stopped.',
              'Whether this feature is required depends on the application and filter design.',
            ],
          },
          {
            heading: 'Why These Features Matter',
            paragraphs: [
              'Internal components are not always visible from product photographs or external measurements. Buyers should use appropriate technical documentation rather than infer internal equivalence from appearance.',
            ],
          },
        ],
      },
      {
        heading: 'Check Filtration and Operating Requirements',
        paragraphs: [
          'Oil filter selection may also depend on filtration performance, flow characteristics, pressure conditions, media construction, and the requirements of the specific engine.',
          'These specifications should be assessed using relevant technical information and test evidence.',
          'A claim such as \u2018high-efficiency filtration\u2019 is not enough on its own. Buyers should ask what was measured, how it was tested, and whether the information applies to the product under consideration.',
          'Different products should not be ranked solely by a single filtration figure without considering the applicable test method and operating conditions.',
        ],
      },
      {
        heading: 'A Practical Oil Filter Verification Checklist',
        paragraphs: ['Before approving a replacement, check:'],
        checklist: [
          'Vehicle and engine application',
          'OE number and source of the reference',
          'Thread specification or cartridge interface',
          'Overall dimensions and mounting arrangement',
          'Gasket and sealing specifications',
          'Bypass valve requirements where applicable',
          'Anti-drainback requirements where applicable',
          'Relevant filtration and operating specifications',
          'Product labeling, packaging, and traceability',
        ],
        checklistNote:
          'If any critical specification conflicts with the reference product, resolve the discrepancy before placing a bulk order.',
      },
      {
        heading: 'How Wholesalers Can Reduce Oil Filter Purchasing Risks',
        subsections: [
          {
            heading: 'Maintain Reliable Cross-References',
            paragraphs: ['A supplier\u2019s catalog should identify the source and scope of application information where possible. Uncertain or conflicting references should be flagged instead of being presented as confirmed matches.'],
          },
          {
            heading: 'Request Product Documentation',
            paragraphs: ['Ask for relevant dimensional drawings, specifications, and supporting quality or performance documents. The required evidence depends on the product and purchasing requirements.'],
          },
          {
            heading: 'Establish a Sample Approval Process',
            paragraphs: ['For new products, a sample can help assess physical construction, dimensions, and packaging. Functional equivalence may require additional testing or technical evidence.'],
          },
          {
            heading: 'Standardize Product Identification',
            paragraphs: [
              'Ensure that part numbers, carton labels, and product descriptions are consistent across quotations, purchase orders, invoices, and delivered goods.',
              'This is especially important for distributors handling many visually similar oil filter references.',
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Can I choose an oil filter based on thread size alone?',
        a: 'No. Thread compatibility is only one requirement. Application, sealing, internal design, and operating specifications may also matter.',
      },
      {
        q: 'Are spin-on and cartridge oil filters interchangeable?',
        a: 'They are different designs and should be selected according to the specified vehicle application. A cartridge element is not a direct substitute for a complete spin-on assembly.',
      },
      {
        q: 'Does a larger oil filter provide better filtration?',
        a: 'Not necessarily. External size alone does not establish filtration efficiency, capacity, flow behavior, or application suitability.',
      },
      {
        q: 'Should I use an oil filter cross-reference from an online catalog?',
        a: 'It can be a useful starting point. Check the reference against credible application information and relevant specifications before treating it as confirmed.',
      },
    ],
    internalLinks: [
      { label: 'Automotive Filter Selection Guide', href: '/guides/automotive-filter-selection-guide/' },
      { label: 'Replacement Filter by OE Number', href: '/guides/replacement-filter-by-oe-number/' },
    ],
    relatedCategory: { slug: 'oil-filter', name: 'Oil Filter', href: '/products/oil-filter/' },
    conclusion: {
      heading: 'Conclusion',
      paragraphs: [
        'Choosing the correct oil filter requires more than matching a part number or comparing external dimensions. Buyers need to verify the vehicle application, mounting interface, sealing arrangement, and relevant internal and functional requirements.',
        'For importers and wholesalers, a disciplined verification process helps reduce avoidable returns and makes product-range expansion more manageable.',
        'For the broader selection framework, see our [automotive filter selection guide](/guides/automotive-filter-selection-guide/). For a replacement identified by OE number, follow the verification process in our [OE number replacement filter guide](/guides/replacement-filter-by-oe-number/).',
      ],
    },
  },

  // ======================================================================
  // CLUSTER 3
  // ======================================================================
  {
    slug: 'automotive-fuel-filter-types',
    title: 'Automotive Fuel Filter Types and Applications',
    description:
      'Automotive fuel filter types and applications \u2014 inline, in-tank, gasoline and diesel filters, with pressure and connection checks for correct replacement.',
    intro: [
      'Fuel filters play an important role in protecting automotive fuel systems from contaminants. However, fuel filter selection is not simply a matter of choosing a product with the correct shape or connector.',
      'Gasoline and diesel systems can operate under different conditions, and fuel filters may be installed in different locations or integrated into larger assemblies. The correct replacement depends on the vehicle application, fuel system design, pressure requirements, connections, and filtration specifications.',
      'For importers and automotive parts distributors, understanding these differences helps prevent incorrect product selection and improves the accuracy of replacement catalogs.',
    ],
    sections: [
      {
        heading: 'What Does an Automotive Fuel Filter Do?',
        paragraphs: [
          'An automotive fuel filter helps remove contaminants from fuel before they reach components that require clean fuel.',
          'The required filtration characteristics depend on the fuel system and the components being protected. Different systems may have different requirements for particle removal, flow, pressure, water management, and filter construction.',
          'A fuel filter should therefore be evaluated against the intended application rather than selected based on a general claim that it is suitable for automotive use.',
        ],
      },
      {
        heading: 'Common Automotive Fuel Filter Types',
        subsections: [
          {
            heading: 'Inline Fuel Filters',
            paragraphs: [
              'Inline fuel filters are installed within a fuel line. Depending on the application, they may use different housing materials, connection designs, and internal filter media.',
              'Buyers should confirm the intended fuel type, flow direction where specified, connector dimensions, mounting arrangement, and applicable pressure requirements.',
              'A similar-looking inline filter is not automatically suitable for a different fuel system.',
            ],
          },
          {
            heading: 'In-Tank Fuel Filters and Integrated Modules',
            paragraphs: [
              'Some vehicles use filtration components inside the fuel tank or incorporate filtration into a larger fuel delivery assembly.',
              'In these applications, the replacement may be a standalone filter element, a strainer, or part of a more complex module.',
              'Before ordering, establish exactly which component is being replaced. A filter element, pump strainer, and complete fuel delivery module are not necessarily equivalent products.',
            ],
          },
          {
            heading: 'Diesel Fuel Filters',
            paragraphs: [
              'Diesel fuel filtration requirements depend on the system design and the components being protected.',
              'Some applications may require water separation or water-management features in addition to particulate filtration. Others use different arrangements depending on the vehicle and fuel system.',
              'Buyers should confirm the specified filter type, relevant filtration requirements, connections, pressure conditions, and water-separation requirements where applicable.',
            ],
          },
          {
            heading: 'Gasoline Fuel Filters',
            paragraphs: [
              'Gasoline fuel filters also vary by application. Their design depends on the fuel delivery system, installation location, operating pressure, and specified connections.',
              'A filter intended for a low-pressure application should not be assumed suitable for a high-pressure system, and the reverse should not be assumed either.',
              'The vehicle\u2019s application information and technical requirements should determine the replacement choice.',
            ],
          },
        ],
      },
      {
        heading: 'Gasoline vs. Diesel Fuel Filters',
        paragraphs: ['Although both categories remove contaminants from fuel, they should not be treated as interchangeable.'],
        table: {
          headers: ['Selection factor', 'Gasoline applications', 'Diesel applications'],
          rows: [
            ['Fuel compatibility', 'Must match the specified gasoline system', 'Must match the specified diesel system'],
            ['Pressure requirements', 'Depend on system design', 'Depend on system design'],
            ['Water management', 'Application-dependent', 'May be a critical specified function'],
            ['Connections', 'Must match the installation', 'Must match the installation'],
            ['Filtration requirements', 'Determined by the fuel system', 'Determined by the fuel system'],
            ['Replacement verification', 'Vehicle and system-specific', 'Vehicle and system-specific'],
          ],
        },
        paragraphsAfter: [
          'This comparison is intentionally general. Actual requirements vary among vehicles, generations, and fuel system designs.',
        ],
      },
      {
        heading: 'Why Pressure and Connections Matter',
        paragraphs: [
          'Fuel filters must operate within the conditions for which they are designed.',
          'A replacement with similar dimensions may have different pressure capabilities, connection specifications, or internal construction.',
          'For this reason, buyers should verify:',
        ],
        bullets: [
          'Intended fuel type',
          'Required pressure range',
          'Inlet and outlet connection design',
          'Hose or pipe interface where applicable',
          'Mounting arrangement',
          'Relevant flow and filtration requirements',
          'Water-separation requirements where specified',
        ],
        paragraphsAfter: [
          'For applications involving high-pressure fuel systems, the replacement must meet the applicable system requirements. External appearance is not sufficient evidence.',
        ],
      },
      {
        heading: 'How to Identify the Correct Replacement Fuel Filter',
        paragraphs: ['A reliable identification process begins with the original application.'],
        steps: [
          {
            title: 'Identify the Vehicle and Fuel System',
            text: 'Record the vehicle make, model, production year, engine variant, and fuel system details required by the relevant catalog.',
          },
          {
            title: 'Check the OE Number',
            text: 'Use the original part number as a starting point. Confirm that the reference relates to the correct vehicle and component.',
          },
          {
            title: 'Confirm the Product Design',
            text: 'Determine whether the requested item is an inline filter, an in-tank component, a diesel filter assembly, a strainer, or another specified design.',
          },
          {
            title: 'Compare Technical Specifications',
            text: 'Check connections, dimensions, pressure requirements, filtration specifications, and water-management features where applicable.',
          },
          {
            title: 'Resolve Uncertainty Before Bulk Purchasing',
            text: 'If the catalog and technical specifications disagree, request supporting documentation from the supplier. Do not convert an uncertain cross-reference into a confirmed application without adequate evidence.',
          },
        ],
      },
      {
        heading: 'Fuel Filter Purchasing Considerations for Distributors',
        subsections: [
          {
            heading: 'Catalog Accuracy',
            paragraphs: [
              'A supplier should distinguish between different fuel filter designs and identify the applications supported by its catalog.',
              'Broad descriptions such as \u2018universal fuel filter\u2019 require particular care because they may not establish compatibility with a specific vehicle or fuel system.',
            ],
          },
          {
            heading: 'Technical Documentation',
            paragraphs: [
              'Depending on the application, useful documentation may include product drawings, connection specifications, operating limits, filtration data, and water-separation information.',
              'Documentation should relate to the actual product being quoted.',
            ],
          },
          {
            heading: 'Packaging and Identification',
            paragraphs: [
              'Part numbers, flow-direction markings where applicable, installation information, and carton labels should be clear and consistent.',
              'Accurate product identification is important when several similar filters are stored in the same warehouse.',
            ],
          },
          {
            heading: 'Product Changes and Supply Consistency',
            paragraphs: [
              'For repeat orders, buyers should establish how the supplier communicates changes to materials, dimensions, construction, or production specifications.',
              'A replacement that was previously approved should not silently change in a way that affects its application.',
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Are gasoline and diesel fuel filters interchangeable?',
        a: 'Not by default. The correct replacement depends on fuel compatibility, system pressure, connections, filtration requirements, and the vehicle application.',
      },
      {
        q: 'Does every diesel fuel filter separate water?',
        a: 'No. Water-separation capabilities depend on the design and specified application. Buyers should verify this feature rather than assume it is present.',
      },
      {
        q: 'Can I select a fuel filter by connector size?',
        a: 'Connector size is only one consideration. Pressure capability, fuel compatibility, filtration requirements, and the complete application must also be checked.',
      },
      {
        q: 'What information should I provide when requesting a fuel filter quotation?',
        a: 'Provide the OE number if available, vehicle and engine details, fuel system information where known, required quantity, and any relevant technical specifications.',
      },
    ],
    internalLinks: [
      { label: 'Automotive Filter Selection Guide', href: '/guides/automotive-filter-selection-guide/' },
      { label: 'Replacement Filter by OE Number', href: '/guides/replacement-filter-by-oe-number/' },
    ],
    relatedCategory: { slug: 'fuel-filter', name: 'Fuel Filter', href: '/products/fuel-filter/' },
    conclusion: {
      heading: 'Conclusion',
      paragraphs: [
        'Automotive fuel filters vary in construction and operating requirements. Selecting the right replacement requires an understanding of the intended fuel system, not simply a comparison of product photographs or dimensions.',
        'For distributors, reliable application data and technical verification are particularly important when purchasing filters for different vehicle platforms.',
        'For a broader approach to product selection, see our [automotive filter selection guide](/guides/automotive-filter-selection-guide/). For part-number identification and cross-reference checks, see our [replacement filter by OE number guide](/guides/replacement-filter-by-oe-number/).',
      ],
    },
  },

  // ======================================================================
  // CLUSTER 4
  // ======================================================================
  {
    slug: 'replacement-filter-by-oe-number',
    title: 'How to Identify the Correct Replacement Filter by OE Number',
    description:
      'How to identify the correct replacement filter by OE number \u2014 cross-references, evidence status levels, and a verification process for importers and wholesalers.',
    intro: [
      'An original equipment (OE) part number is one of the most useful starting points when identifying a replacement automotive filter. It can narrow a search, connect a request to catalog records, and help buyers communicate with suppliers.',
      'However, finding a matching number in a cross-reference list does not automatically prove that a replacement is suitable for every vehicle associated with that reference.',
      'For importers and wholesalers, the important question is not simply whether two part numbers appear together in a catalog. It is whether the available evidence supports using the proposed replacement for the intended application.',
      'This guide explains how to identify replacement filters by OE number, investigate conflicting references, and establish a more reliable purchasing process.',
    ],
    sections: [
      {
        heading: 'What Is an OE Part Number?',
        paragraphs: [
          'An OE part number is an identifier used by an original equipment manufacturer or within an original equipment parts system to identify a component.',
          'For filter buyers, it can provide a useful link between a vehicle application, an original component, and possible replacement products.',
          'However, part numbers may be affected by revisions, supersessions, market differences, or application-specific configurations. The meaning and scope of a reference should be confirmed using appropriate catalog information.',
          'An OE number should be treated as an identification tool, not as a complete technical specification.',
        ],
      },
      {
        heading: 'OE Numbers, Replacement Numbers, and Cross-References',
        paragraphs: ['These terms serve related but different purposes.'],
        subsections: [
          {
            heading: 'OE Number',
            paragraphs: ['The OE number identifies the original equipment part in the relevant catalog or parts system.'],
          },
          {
            heading: 'Replacement Part Number',
            paragraphs: ['A replacement manufacturer uses its own part number to identify a product offered for a particular application or range of applications.'],
          },
          {
            heading: 'Cross-Reference Number',
            paragraphs: [
              'A cross-reference associates one part number with another. It may help buyers locate a possible replacement, but its reliability depends on the source, application coverage, and evidence supporting the association.',
              'Two numbers appearing in the same list does not necessarily establish that every vehicle application, production period, or specification is covered.',
              'Buyers should distinguish between a documented replacement relationship and an unverified catalog association.',
            ],
          },
        ],
      },
      {
        heading: 'Step One: Start with the Original Reference',
        paragraphs: [
          'Whenever possible, obtain the OE number from a reliable source, such as the original part label, an applicable vehicle parts catalog, or documented supplier information.',
          'Record the source and any available vehicle details.',
          'For example, a request containing only a filter number may be insufficient when the reference is associated with multiple applications or revisions.',
          'Useful information may include:',
        ],
        bullets: [
          'Vehicle make and model',
          'Production year or relevant production range',
          'Engine variant',
          'Market or configuration where relevant',
          'Original part number',
          'Existing filter markings or specifications',
        ],
        paragraphsAfter: [
          'The amount of information required depends on the filter and the application.',
        ],
      },
      {
        heading: 'Step Two: Check the Vehicle Application',
        paragraphs: [
          'Use the available catalog information to determine which vehicles and configurations are associated with the original part number.',
          'Do not assume that a model name alone is enough. The same vehicle model may use different components across engine variants, production periods, or markets.',
          'If two catalogs provide conflicting application ranges, investigate the discrepancy rather than selecting the broader range automatically.',
          'For wholesale buyers, this step helps establish which portion of the target vehicle population the proposed product is intended to cover.',
        ],
      },
      {
        heading: 'Step Three: Compare the Replacement Specifications',
        paragraphs: [
          'Once a candidate replacement has been identified, compare the specifications relevant to the filter type.',
          'For engine air filters, these may include dimensions, sealing, shape, and relevant airflow requirements.',
          'For oil filters, they may include thread specifications, gasket dimensions, internal design, and applicable operating requirements.',
          'For fuel filters, they may include fuel compatibility, connections, pressure requirements, and specified filtration or water-management characteristics.',
          'For cabin air filters, they may include dimensions, frame construction, airflow direction where specified, and filter media.',
          'The exact checks should be selected according to the product. There is no single dimensional checklist that proves compatibility for every filter category.',
        ],
      },
      {
        heading: 'Step Four: Investigate Conflicting Cross-References',
        paragraphs: [
          'Conflicting catalog records should be treated as a signal that further verification is needed.',
          'Common reasons for discrepancies include:',
        ],
        bullets: [
          'Different production ranges',
          'Engine or vehicle configuration differences',
          'Revised or superseded part numbers',
          'Regional catalog differences',
          'Incorrect or incomplete third-party records',
          'Similar-looking products with different specifications',
        ],
        paragraphsAfter: [
          'Not every discrepancy means the replacement is wrong. However, the discrepancy should be resolved before making a definitive application claim.',
          'Ask the supplier to identify the source of the reference and provide relevant supporting documentation.',
        ],
      },
      {
        heading: 'Step Five: Assign an Evidence Status',
        paragraphs: ['A useful catalog management practice is to distinguish between different levels of evidence.'],
        table: {
          headers: ['Status', 'Meaning', 'Appropriate use'],
          rows: [
            ['Candidate match', 'A catalog or search result identifies a possible replacement', 'Further checking required'],
            ['Reference cross-checked', 'Multiple relevant records support the association', 'Suitable for further specification review'],
            ['Specifications reviewed', 'Relevant dimensions and functional requirements have been assessed', 'Stronger basis for application approval'],
            ['Application verified', 'Available application-specific evidence supports the fitment conclusion', 'Use within the documented scope'],
          ],
        },
        paragraphsAfter: [
          'These are recommended internal management labels, not official industry certification levels.',
          'The evidence required for the final status should reflect the product, application risk, and intended claim. A dimensional review alone may not establish complete functional equivalence.',
        ],
      },
      {
        heading: 'Step Six: Confirm Before Bulk Purchasing',
        paragraphs: [
          'For an established product with reliable documentation, the verification process may be relatively simple.',
          'For a new supplier, unfamiliar replacement, or conflicting reference, additional checks may be necessary.',
          'Depending on the application, these may include:',
        ],
        bullets: [
          'Reviewing product drawings and technical specifications',
          'Requesting application-specific documentation',
          'Comparing the candidate with the original component',
          'Evaluating samples',
          'Conducting appropriate functional tests',
          'Recording the approval decision and supporting evidence',
        ],
        paragraphsAfter: [
          'A sample can help confirm physical characteristics, but visual inspection alone cannot prove every functional requirement.',
          'Before a bulk order, ensure that the approved part number, specification, packaging, and application scope are clearly documented.',
        ],
      },
      {
        heading: 'How to Use Online OE Cross-Reference Databases',
        paragraphs: [
          'Online databases can make part-number research faster, especially when a buyer is working with a large catalog.',
          'A practical search process is:',
        ],
        orderedBullets: [
          'Search the original OE number.',
          'Review the listed replacement references.',
          'Open the relevant application record where available.',
          'Compare the vehicle details and filter specifications.',
          'Check whether the source explains the scope of the cross-reference.',
          'Flag missing or conflicting information.',
          'Confirm critical applications before approving the product.',
        ],
        paragraphsAfter: [
          'If a data page is available on a dedicated automotive filter database, link to the specific record rather than making a broad statement about an entire vehicle range.',
          'The page should make clear whether the information is a catalog reference, a specification comparison, or an application verified through additional evidence.',
        ],
      },
      {
        heading: 'How Wholesalers Can Build a More Reliable Filter Catalog',
        paragraphs: [
          'Part-number accuracy becomes increasingly important as the number of products and vehicle applications grows.',
          'Distributors should maintain consistent records for:',
        ],
        bullets: [
          'OE and replacement part numbers',
          'Filter category',
          'Vehicle and engine applications',
          'Source of the cross-reference',
          'Relevant technical specifications',
          'Verification status',
          'Last review date where tracked',
          'Packaging and supplier identification',
        ],
        paragraphsAfter: [
          'When a reference changes, update the relevant product records and check whether the change affects related listings.',
          'Avoid copying the same unverified application claim across multiple product pages. Repetition does not improve the underlying evidence and can make catalog errors more difficult to correct.',
        ],
      },
    ],
    faq: [
      {
        q: 'Does a matching OE number guarantee that a replacement filter fits?',
        a: 'Not by itself. The number must be interpreted in the correct application context, and the replacement relationship should be supported by appropriate evidence.',
      },
      {
        q: 'Why do different websites show different replacement filters for the same OE number?',
        a: 'Sources may differ in coverage, data quality, revision handling, or application interpretation. Investigate the conflicting records before selecting a replacement.',
      },
      {
        q: 'Can I use physical dimensions to confirm a cross-reference?',
        a: 'Dimensions are important, but they may not establish equivalence of sealing, internal construction, filtration performance, or other application requirements.',
      },
      {
        q: 'What should I do when an OE number cannot be found?',
        a: 'Check the original reference for transcription errors, collect additional vehicle information, and consult a reliable parts catalog or supplier. Avoid assigning a replacement based solely on appearance.',
      },
      {
        q: 'Should a distributor publish unverified cross-reference data?',
        a: 'Uncertain data should be clearly identified as a candidate or reference match rather than presented as confirmed compatibility. This protects buyers from confusing search results with verified application information.',
      },
    ],
    internalLinks: [
      { label: 'Automotive Filter Selection Guide', href: '/guides/automotive-filter-selection-guide/' },
      { label: 'How to Choose the Right Oil Filter', href: '/guides/how-to-choose-an-oil-filter/' },
      { label: 'Automotive Fuel Filter Types', href: '/guides/automotive-fuel-filter-types/' },
    ],
    dataLinks: [
      { label: 'SKU Index \u2014 canonical product database', href: 'https://data.carfilterspro.com/products/', external: true },
      { label: 'Toyota oil filter 90915-YZZE1 \u2014 source-verified OE record with cross-references', href: 'https://data.carfilterspro.com/products/90915-YZZE1/', external: true },
      { label: 'Toyota Corolla air filter 17801-21050 \u2014 source-verified OE record with cross-references', href: 'https://data.carfilterspro.com/products/17801-21050/', external: true },
    ],
    conclusion: {
      heading: 'Conclusion: A Part Number Is the Beginning of Verification',
      paragraphs: [
        'OE numbers make automotive filter sourcing more efficient, but they should not replace application checks or technical judgment.',
        'For importers and wholesalers, the most reliable process combines part-number research, vehicle identification, relevant specification checks, and documented approval. Where the evidence is incomplete, the correct response is to investigate rather than overstate certainty.',
        'A dependable catalog does more than list replacement numbers. It explains what the available information supports and where further verification is required.',
        'For the broader selection framework, see our [automotive filter selection guide](/guides/automotive-filter-selection-guide/). For product-specific checks, explore our guides to [choosing the right oil filter](/guides/how-to-choose-an-oil-filter/) and [automotive fuel filter types](/guides/automotive-fuel-filter-types/).',
      ],
    },
  },
];
