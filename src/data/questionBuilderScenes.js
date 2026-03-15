export const scenes = [
  {
    id: 'park',
    emoji: '🏞️🧒👧🪑',
    emojiLabel: { en: 'Park with children and a bench', nl: 'Park met kinderen en een bankje' },
    tiers: ['explorer', 'thinker', 'investigator', 'analyst', 'philosopher'],
    exampleQuestions: {
      deep: {
        en: ['Why might the child be sitting alone?', 'How does the child feel and what could have caused it?'],
        nl: ['Waarom zou het kind alleen zitten?', 'Hoe voelt het kind zich en wat zou de oorzaak kunnen zijn?'],
      },
    },
  },
  {
    id: 'kitchen',
    emoji: '🍰📖🐱🍽️',
    emojiLabel: { en: 'Cake, book, cat and plate', nl: 'Taart, boek, kat en bord' },
    tiers: ['explorer', 'thinker', 'investigator', 'analyst', 'philosopher'],
    exampleQuestions: {
      deep: {
        en: ['What happened that made someone stop eating the cake?', 'What story connects the cake, the book, and the cat?'],
        nl: ['Wat is er gebeurd waardoor iemand stopte met het eten van de taart?', 'Welk verhaal verbindt de taart, het boek en de kat?'],
      },
    },
  },
  {
    id: 'space',
    emoji: '🧑‍🚀🛸🌍✨',
    emojiLabel: { en: 'Astronaut, spaceship, Earth and stars', nl: 'Astronaut, ruimteschip, Aarde en sterren' },
    tiers: ['thinker', 'investigator', 'analyst', 'philosopher'],
    exampleQuestions: {
      deep: {
        en: ['What might the astronaut be thinking while looking at Earth?', 'How does being in space change how you see problems on Earth?'],
        nl: ['Wat zou de astronaut denken terwijl hij naar de Aarde kijkt?', 'Hoe verandert het zijn in de ruimte hoe je problemen op Aarde ziet?'],
      },
    },
  },
  {
    id: 'forest',
    emoji: '🌲🔀🌑☀️',
    emojiLabel: { en: 'Forest with two paths, dark and light', nl: 'Bos met twee paden, donker en licht' },
    tiers: ['thinker', 'investigator', 'analyst', 'philosopher'],
    exampleQuestions: {
      deep: {
        en: ['Why would someone choose the dark path?', 'What does the fork in the path represent about choices in life?'],
        nl: ['Waarom zou iemand het donkere pad kiezen?', 'Wat zegt de splitsing in het pad over keuzes in het leven?'],
      },
    },
  },
  {
    id: 'classroom',
    emoji: '🏫🪟📚👩‍🏫',
    emojiLabel: { en: 'Classroom with window and teacher', nl: 'Klaslokaal met raam en leraar' },
    tiers: ['investigator', 'analyst', 'philosopher'],
    exampleQuestions: {
      deep: {
        en: ['Why might someone arrange a classroom this way?', 'How would learning change if students always faced the window?'],
        nl: ['Waarom zou iemand een klaslokaal zo inrichten?', 'Hoe zou het leren veranderen als leerlingen altijd naar het raam kijken?'],
      },
    },
  },
];

export const questionStarters = {
  en: ['Who', 'What', 'Where', 'When', 'Why', 'How'],
  nl: ['Wie', 'Wat', 'Waar', 'Wanneer', 'Waarom', 'Hoe'],
};

// Language-separated deep question indicators
export const deepIndicators = {
  en: ['why', 'how', 'what if', 'what would', 'what could', 'how might', 'what does', 'how does', 'could it be', 'what causes'],
  nl: ['waarom', 'hoe', 'wat als', 'wat zou', 'wat kan', 'hoe zou', 'wat betekent', 'hoe komt', 'zou het kunnen', 'wat veroorzaakt'],
};

// Language-separated closed question starters
export const closedStarters = {
  en: /^(is|are|was|were|do|does|did|can|could|will|would|has|have|had)\b/i,
  nl: /^(ben|is|is het|was|was het|zijn|heeft|kan|zal|mag|moet|heb)\b/i,
};
