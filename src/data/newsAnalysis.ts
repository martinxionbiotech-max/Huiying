// Editorial analysis appended to each news article — original "huiying's take".
// Not copied from the source site; adds practical, subjective interpretation.

export interface NewsAnalysis {
  slug: string;
  heading: string;
  paragraphs: string[];
}

export const newsAnalysis: NewsAnalysis[] = [
  {
    slug: 'how-to-choose-air-filter',
    heading: 'huiying\'s take',
    paragraphs: [
      'The practical message here is that an air filter cannot be judged by its outer dimensions alone. What separates a good element from a look-alike is the filter paper grade, the uniformity of the folds and the quality of the end-cap seal — all of which sit below the surface.',
      'For a buyer, the actionable rule is to treat pleat consistency and media permeability as quality signals. In our own production we check fold spacing and media area precisely because uneven folds either let dust through or restrict airflow — and either failure ends up costing the engine.',
      'Our recommendation: always quote an OE or cross-reference number so the media area and seal design are matched to the application, and be suspicious of any air filter sold purely on a low price.',
    ],
  },
  {
    slug: 'why-does-sludge-still-appear-in-the-oil-shell',
    heading: 'huiying\'s take',
    paragraphs: [
      'Sludge in the oil pan is a symptom, not the root cause. It points to either oil that has been run too long, oil of the wrong viscosity for the engine, or an oil filter that is no longer doing its job — and often a combination of all three.',
      'The engineering point worth remembering is that a properly functioning filter holds contamination inside the element, not on the oil-pump pickup screen. When sludge migrates to the pickup screen, oil circulation has already been compromised, which is exactly when local overheating and further sludge formation accelerate.',
      'Our recommendation is to treat the oil filter as part of a system: use the correct oil grade and viscosity, replace the filter with every oil change, and shorten intervals for turbocharged or heavily loaded engines.',
    ],
  },
  {
    slug: 'frequently-asked-questions-about-excavator-filter-elements',
    heading: 'huiying\'s take',
    paragraphs: [
      'This article is aimed at excavators, but the logic applies to any off-highway or heavy-duty engine: filtration accuracy must balance against contaminant-holding capacity. A filter that is too fine can clog prematurely, while one that is too coarse lets damaging particles through.',
      'For heavy equipment the economics are decisive. An engine rebuild or a damaged common-rail injector costs far more than a quality filter, so the "cheapest element" calculation is usually a false economy. The useful life of a diesel engine is directly tied to how much dust it ingests.',
      'Our recommendation for fleet and equipment owners: match the filter to the fuel and oil system by OE reference, replace on the equipment\'s hour schedule, and shorten the interval when operating in dust or with variable fuel quality.',
    ],
  },
  {
    slug: 'the-lungs-of-the-engine-working-principle-of-the-air-filter',
    heading: 'huiying\'s take',
    paragraphs: [
      'The "lungs of the engine" analogy is a good one: the air filter is a small, inexpensive part whose failure quietly shortens the life of the most expensive part of the vehicle. Clean intake air is the foundation of cylinder, piston and piston-ring durability.',
      'The maintenance insight to take away is that a neglected filter does two harmful things at once — it stops filtering effectively and it restricts airflow, enriching the mixture and degrading performance. That is why a blocked air filter shows up as rough running and rising temperature before it shows up as engine wear.',
      'Our recommendation is simple: inspect the air filter at every oil service and replace it earlier than the nominal schedule in dry, sandy or off-road conditions. It is the cheapest engine protection you can buy.',
    ],
  },
  {
    slug: 'is-it-necessary-to-replace-the-oil-filter-while-maintaining-the-oil',
    heading: 'huiying\'s take',
    paragraphs: [
      'The short answer — yes, always replace the filter with the oil — is correct and worth repeating. A used filter holds a meaningful share of the old oil\'s contaminants, and reinstalling it reintroduces that load into fresh oil.',
      'What is easy to miss is the asymmetry: the filter only removes particulate, while the oil itself degrades chemically over time. So neither can substitute for the other. The two work together and should be replaced together.',
      'Our recommendation: follow the maintenance schedule for both oil and filter, and treat the filter as a consumable on the same interval as the oil — never longer.',
    ],
  },
  {
    slug: 'good-engine-oil-changed-every-time-why-sludge-still-appears',
    heading: 'huiying\'s take',
    paragraphs: [
      'When clean oil still turns to sludge, the usual suspects are oil of the wrong grade or viscosity, a filter that is no longer filtering, or an oil that is being overheated through poor circulation. The key diagnostic point is where the sludge accumulates.',
      'If sludge is collecting on the oil-pump pickup screen rather than inside the filter element, circulation has already degraded — and reduced flow is itself a cause of the local overheating that cooks the oil further. That is the vicious cycle behind most sludge problems.',
      'Our recommendation: confirm the correct oil specification for the engine, replace the filter at every oil change, and investigate any loss of oil pressure or flow immediately rather than waiting for visible sludge.',
    ],
  },
  {
    slug: 'oil-filter-the-knowledge-you-dont-know',
    heading: 'huiying\'s take',
    paragraphs: [
      'The most useful point in this article is that an oil filter\'s service life is judged by its filtering capacity, not by whether the canister still looks intact. Once the media is loaded and the bypass valve opens, the filter has effectively stopped filtering even though it is still screwed on.',
      'That is why a filter should be replaced on the oil-change interval rather than "when it fails" — by the time a spin-on filter visibly fails, the engine has already been running on unfiltered oil. The bypass valve is a safety feature, not a reason to extend the interval.',
      'Our recommendation: treat the oil filter and the oil as a matched pair on the same interval, and shorten that interval for turbocharged, high-load or stop-and-go service.',
    ],
  },
  {
    slug: 'the-importance-of-filter-efficiency-to-the-engine',
    heading: 'huiying\'s take',
    paragraphs: [
      'The core argument — that a filter is cheap insurance against very expensive repairs — is strongest on diesel and common-rail systems. An injector set or a high-pressure pump costs many times the price of a filter, so filtration quality is not where to economise.',
      'Fuel cleanliness is the variable that matters most here. In markets with variable diesel quality, water and particulate are the two enemies, and a fuel filter that addresses both is the difference between a healthy fuel system and premature injector wear.',
      'Our recommendation for diesel fleets: specify water separation and a tight micron rating, carry spare elements, and shorten the fuel-filter interval when fuel quality is uncertain.',
    ],
  },
  {
    slug: 'the-misunderstanding-and-identification-method-of-air-filter',
    heading: 'huiying\'s take',
    paragraphs: [
      'The warning against running an engine without its air filter is backed by striking numbers: removing the filter can multiply cylinder, piston and ring wear by several times. The air filter is not an optional accessory — it is a load-bearing part of engine protection.',
      'The identification method is also worth committing to memory. A filter should be judged by airflow and condition, not by mileage alone: when airflow is restricted, or when the outer surface has lost its colour and the inner surface has darkened, the element is done.',
      'Our recommendation: replace on condition as well as on schedule, and never "clean" a paper element by tapping or blowing it out, which can damage the media and let fine dust through.',
    ],
  },
];

export function getNewsAnalysis(slug: string): NewsAnalysis | undefined {
  return newsAnalysis.find((a) => a.slug === slug);
}
