import { TIER_ORDER } from '../store';

export const facts = [
  // Explorer (4-6)
  {
    id: 'sky-blue',
    tier: 'explorer',
    fact: {
      en: 'The sky looks blue during the day.',
      nl: 'De lucht ziet er overdag blauw uit.',
    },
    chain: {
      en: [
        'Because sunlight hits tiny particles in the air.',
        'Because the atmosphere is full of gases and small bits.',
        'Because Earth has an atmosphere made of different gases.',
        'Because when Earth formed, gases were pulled in by gravity.',
        'Because everything with mass attracts other things (gravity)!',
      ],
      nl: [
        'Omdat zonlicht kleine deeltjes in de lucht raakt.',
        'Omdat de atmosfeer vol zit met gassen en kleine deeltjes.',
        'Omdat de Aarde een atmosfeer heeft van verschillende gassen.',
        'Omdat toen de Aarde ontstond, gassen werden aangetrokken door zwaartekracht.',
        'Omdat alles met massa andere dingen aantrekt (zwaartekracht)!',
      ],
    },
  },
  {
    id: 'leaves-fall',
    tier: 'explorer',
    fact: {
      en: 'Leaves fall from trees in autumn.',
      nl: 'Bladeren vallen van bomen in de herfst.',
    },
    chain: {
      en: [
        'Because trees stop sending water to their leaves.',
        'Because there is less sunlight in autumn.',
        'Because Earth tilts away from the sun in that season.',
        'Because Earth spins at an angle as it orbits the sun.',
        'Because of how Earth was formed billions of years ago!',
      ],
      nl: [
        'Omdat bomen stoppen met water naar hun bladeren te sturen.',
        'Omdat er minder zonlicht is in de herfst.',
        'Omdat de Aarde in dat seizoen van de zon af kantelt.',
        'Omdat de Aarde schuin draait terwijl het om de zon beweegt.',
        'Vanwege hoe de Aarde miljarden jaren geleden is ontstaan!',
      ],
    },
  },
  // Thinker (7-9)
  {
    id: 'homework',
    tier: 'thinker',
    fact: {
      en: 'Students get homework from school.',
      nl: 'Leerlingen krijgen huiswerk van school.',
    },
    chain: {
      en: [
        'Because teachers want students to practice what they learned.',
        'Because practicing helps move knowledge into long-term memory.',
        'Because our brains need repetition to form strong connections.',
        'Because brain cells (neurons) get stronger when used repeatedly.',
        'Because that\'s how evolution shaped our learning brain!',
      ],
      nl: [
        'Omdat leraren willen dat leerlingen oefenen wat ze hebben geleerd.',
        'Omdat oefenen helpt om kennis naar het langetermijngeheugen te verplaatsen.',
        'Omdat onze hersenen herhaling nodig hebben om sterke verbindingen te maken.',
        'Omdat hersencellen (neuronen) sterker worden als ze herhaaldelijk worden gebruikt.',
        'Omdat evolutie zo ons lerende brein heeft gevormd!',
      ],
    },
  },
  // Investigator (10-12)
  {
    id: 'expensive',
    tier: 'investigator',
    fact: {
      en: 'Some brands of sneakers cost over $200.',
      nl: 'Sommige merken sneakers kosten meer dan €200.',
    },
    chain: {
      en: [
        'Because people are willing to pay that much for them.',
        'Because marketing creates a feeling of status and exclusivity.',
        'Because humans naturally compare themselves to others (social status).',
        'Because throughout history, displaying resources helped attract allies.',
        'Because survival often depended on being part of a strong social group!',
      ],
      nl: [
        'Omdat mensen bereid zijn zoveel ervoor te betalen.',
        'Omdat marketing een gevoel van status en exclusiviteit creëert.',
        'Omdat mensen zich van nature vergelijken met anderen (sociale status).',
        'Omdat door de geschiedenis heen het tonen van middelen hielp om bondgenoten aan te trekken.',
        'Omdat overleven vaak afhing van het deel uitmaken van een sterke sociale groep!',
      ],
    },
  },
  // Analyst (13-15)
  {
    id: 'social-media',
    tier: 'analyst',
    fact: {
      en: 'People spend hours scrolling through social media every day.',
      nl: 'Mensen besteden dagelijks uren aan het scrollen door sociale media.',
    },
    chain: {
      en: [
        'Because the apps are designed to be as engaging as possible.',
        'Because companies profit from keeping your attention longer (ad revenue).',
        'Because in a capitalist system, companies compete for maximum profit.',
        'Because investors expect growing returns on their investments.',
        'Because our economic system incentivizes growth above most other values!',
      ],
      nl: [
        'Omdat de apps ontworpen zijn om zo boeiend mogelijk te zijn.',
        'Omdat bedrijven profiteren van het langer vasthouden van je aandacht (advertentie-inkomsten).',
        'Omdat in een kapitalistisch systeem bedrijven concurreren om maximale winst.',
        'Omdat investeerders groeiende rendementen verwachten op hun investeringen.',
        'Omdat ons economisch systeem groei stimuleert boven de meeste andere waarden!',
      ],
    },
  },
  // Philosopher (16-18)
  {
    id: 'truth',
    tier: 'philosopher',
    fact: {
      en: 'Different cultures have different ideas about what is "true."',
      nl: 'Verschillende culturen hebben verschillende ideeën over wat "waar" is.',
    },
    chain: {
      en: [
        'Because truth is often shaped by language, history, and experience.',
        'Because our perception of reality is filtered through our personal and cultural lens.',
        'Because the human brain constructs a model of reality rather than experiencing it directly.',
        'Because our senses and cognition evolved for survival, not for perceiving objective truth.',
        'Because the fundamental nature of reality and consciousness remains one of philosophy\'s deepest unsolved questions!',
      ],
      nl: [
        'Omdat waarheid vaak wordt gevormd door taal, geschiedenis en ervaring.',
        'Omdat onze waarneming van de werkelijkheid wordt gefilterd door onze persoonlijke en culturele lens.',
        'Omdat het menselijk brein een model van de werkelijkheid construeert in plaats van het direct te ervaren.',
        'Omdat onze zintuigen en cognitie zijn geëvolueerd voor overleving, niet voor het waarnemen van objectieve waarheid.',
        'Omdat de fundamentele aard van de werkelijkheid en het bewustzijn een van de diepste onopgeloste vragen van de filosofie blijft!',
      ],
    },
  },
];

export function getFactsForTier(tier) {
  const tierIndex = TIER_ORDER.indexOf(tier);
  return facts.filter((f) => {
    const factTierIndex = TIER_ORDER.indexOf(f.tier);
    return factTierIndex <= tierIndex;
  });
}
