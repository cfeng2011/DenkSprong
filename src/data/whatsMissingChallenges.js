import { TIER_ORDER } from '../store';

export const challenges = [
  // Explorer (4-6)
  {
    id: 'fruits',
    tier: 'explorer',
    statement: {
      en: 'Apples are red. This fruit is red. So this fruit must be an apple!',
      nl: 'Appels zijn rood. Dit fruit is rood. Dus dit fruit moet een appel zijn!',
    },
    options: {
      en: [
        { text: 'Not all red fruits are apples! Strawberries are red too.', correct: true },
        { text: 'Apples are always red.', correct: false },
        { text: 'Red is a nice color.', correct: false },
      ],
      nl: [
        { text: 'Niet alle rode vruchten zijn appels! Aardbeien zijn ook rood.', correct: true },
        { text: 'Appels zijn altijd rood.', correct: false },
        { text: 'Rood is een mooie kleur.', correct: false },
      ],
    },
    hint: {
      en: 'Can you think of other red fruits?',
      nl: 'Kun je andere rode vruchten bedenken?',
    },
    explanation: {
      en: 'Just because apples are red doesn\'t mean ALL red things are apples. Strawberries, cherries, and tomatoes are red too!',
      nl: 'Alleen omdat appels rood zijn, betekent niet dat ALLE rode dingen appels zijn. Aardbeien, kersen en tomaten zijn ook rood!',
    },
  },
  {
    id: 'animals',
    tier: 'explorer',
    statement: {
      en: 'Dogs have four legs. My pet has four legs. So my pet must be a dog!',
      nl: 'Honden hebben vier poten. Mijn huisdier heeft vier poten. Dus mijn huisdier moet een hond zijn!',
    },
    options: {
      en: [
        { text: 'Cats also have four legs, and so do rabbits!', correct: true },
        { text: 'Dogs are the best pets.', correct: false },
        { text: 'Four legs is a lot.', correct: false },
      ],
      nl: [
        { text: 'Katten hebben ook vier poten, en konijnen ook!', correct: true },
        { text: 'Honden zijn de beste huisdieren.', correct: false },
        { text: 'Vier poten is veel.', correct: false },
      ],
    },
    hint: {
      en: 'What other animals have four legs?',
      nl: 'Welke andere dieren hebben vier poten?',
    },
    explanation: {
      en: 'Many animals have four legs - cats, rabbits, horses! Having four legs doesn\'t tell us which animal it is.',
      nl: 'Veel dieren hebben vier poten - katten, konijnen, paarden! Vier poten vertelt ons niet welk dier het is.',
    },
  },
  // Thinker (7-9)
  {
    id: 'rain',
    tier: 'thinker',
    statement: {
      en: 'It rained yesterday. The grass is wet today. So the rain made the grass wet.',
      nl: 'Het regende gisteren. Het gras is vandaag nat. Dus de regen heeft het gras nat gemaakt.',
    },
    options: {
      en: [
        { text: 'Maybe someone used a sprinkler this morning!', correct: true },
        { text: 'Rain always makes things wet.', correct: false },
        { text: 'Grass is always green.', correct: false },
      ],
      nl: [
        { text: 'Misschien heeft iemand vanochtend de sproeier gebruikt!', correct: true },
        { text: 'Regen maakt altijd dingen nat.', correct: false },
        { text: 'Gras is altijd groen.', correct: false },
      ],
    },
    hint: {
      en: 'Could something else have made the grass wet?',
      nl: 'Kan iets anders het gras nat hebben gemaakt?',
    },
    explanation: {
      en: 'Just because two things happen close together doesn\'t mean one caused the other. The wet grass could have many causes!',
      nl: 'Alleen omdat twee dingen kort na elkaar gebeuren, betekent niet dat het een het ander veroorzaakte. Het natte gras kan vele oorzaken hebben!',
    },
  },
  {
    id: 'icecream',
    tier: 'thinker',
    statement: {
      en: 'When it\'s hot, more people buy ice cream. When it\'s hot, more people go swimming. So ice cream makes people want to swim!',
      nl: 'Als het warm is, kopen meer mensen ijs. Als het warm is, gaan meer mensen zwemmen. Dus ijs zorgt ervoor dat mensen willen zwemmen!',
    },
    options: {
      en: [
        { text: 'It\'s the hot weather causing both, not ice cream causing swimming!', correct: true },
        { text: 'Ice cream and swimming are fun.', correct: false },
        { text: 'Swimming is good exercise.', correct: false },
      ],
      nl: [
        { text: 'Het warme weer veroorzaakt beide, niet het ijs dat zwemmen veroorzaakt!', correct: true },
        { text: 'Ijs en zwemmen zijn leuk.', correct: false },
        { text: 'Zwemmen is goede oefening.', correct: false },
      ],
    },
    hint: {
      en: 'What do ice cream and swimming have in common?',
      nl: 'Wat hebben ijs en zwemmen gemeen?',
    },
    explanation: {
      en: 'This is called "correlation vs causation." Both ice cream sales and swimming increase because of hot weather, not because of each other!',
      nl: 'Dit heet "correlatie vs causaliteit." Zowel ijsverkoop als zwemmen nemen toe door warm weer, niet door elkaar!',
    },
  },
  // Investigator (10-12)
  {
    id: 'everyone',
    tier: 'investigator',
    statement: {
      en: 'Everyone in my class likes pizza. So all children in the world like pizza.',
      nl: 'Iedereen in mijn klas houdt van pizza. Dus alle kinderen in de wereld houden van pizza.',
    },
    options: {
      en: [
        { text: 'Your class is too small a group to represent all children!', correct: true },
        { text: 'Pizza is universally loved.', correct: false },
        { text: 'Your class has good taste.', correct: false },
      ],
      nl: [
        { text: 'Je klas is een te kleine groep om alle kinderen te vertegenwoordigen!', correct: true },
        { text: 'Pizza is universeel geliefd.', correct: false },
        { text: 'Je klas heeft een goede smaak.', correct: false },
      ],
    },
    hint: {
      en: 'How many children are in your class vs. the world?',
      nl: 'Hoeveel kinderen zitten er in je klas vs. de wereld?',
    },
    explanation: {
      en: 'This is called "hasty generalization." One small group can\'t represent everyone. Children in other countries may prefer different foods!',
      nl: 'Dit heet "overhaaste generalisatie." Eén kleine groep kan niet iedereen vertegenwoordigen. Kinderen in andere landen geven misschien de voorkeur aan ander eten!',
    },
  },
  // Analyst (13-15)
  {
    id: 'celebrity',
    tier: 'analyst',
    statement: {
      en: 'A famous soccer player says these shoes are the best. So these must be the best shoes for running.',
      nl: 'Een beroemde voetballer zegt dat deze schoenen de beste zijn. Dus dit moeten de beste hardloopschoenen zijn.',
    },
    options: {
      en: [
        { text: 'Being famous at soccer doesn\'t make someone an expert on running shoes!', correct: true },
        { text: 'The player probably tested many shoes before choosing.', correct: false },
        { text: 'Professional athletes know sports equipment well.', correct: false },
      ],
      nl: [
        { text: 'Beroemd zijn in voetbal maakt iemand geen expert in hardloopschoenen!', correct: true },
        { text: 'De speler heeft waarschijnlijk veel schoenen getest voor de keuze.', correct: false },
        { text: 'Professionele atleten kennen sportuitrusting goed.', correct: false },
      ],
    },
    hint: {
      en: 'Why is this person recommending the product?',
      nl: 'Waarom beveelt deze persoon het product aan?',
    },
    explanation: {
      en: 'This is an "appeal to authority" fallacy. Celebrity endorsements are paid advertising. Expertise in one area doesn\'t transfer to another.',
      nl: 'Dit is een "beroep op autoriteit" drogreden. Aanbevelingen van beroemdheden zijn betaalde reclame. Expertise op één gebied gaat niet automatisch over naar een ander gebied.',
    },
  },
  // Philosopher (16-18)
  {
    id: 'freedom',
    tier: 'philosopher',
    statement: {
      en: 'If we value freedom, then people should be able to do anything they want. Limiting any behavior means we don\'t value freedom.',
      nl: 'Als we vrijheid waarderen, dan moeten mensen alles kunnen doen wat ze willen. Elk gedrag beperken betekent dat we vrijheid niet waarderen.',
    },
    options: {
      en: [
        { text: 'This is a false dilemma - freedom can exist with reasonable limits that protect others.', correct: true },
        { text: 'Freedom requires responsibility, but the argument is mostly correct.', correct: false },
        { text: 'Throughout history, all great societies valued absolute freedom.', correct: false },
      ],
      nl: [
        { text: 'Dit is een vals dilemma - vrijheid kan bestaan met redelijke grenzen die anderen beschermen.', correct: true },
        { text: 'Vrijheid vereist verantwoordelijkheid, maar het argument klopt grotendeels.', correct: false },
        { text: 'Door de geschiedenis heen waardeerden alle grote samenlevingen absolute vrijheid.', correct: false },
      ],
    },
    hint: {
      en: 'Is the choice really between ALL freedom or NO freedom?',
      nl: 'Is de keuze echt tussen ALLE vrijheid of GEEN vrijheid?',
    },
    explanation: {
      en: 'This is a "false dilemma" (black-or-white thinking). Most real situations have a spectrum of options, not just two extremes. Freedom and reasonable limits can coexist.',
      nl: 'Dit is een "vals dilemma" (zwart-wit denken). De meeste echte situaties hebben een spectrum aan opties, niet slechts twee extremen. Vrijheid en redelijke grenzen kunnen samengaan.',
    },
  },
];

export function getChallengesForTier(tier) {
  const tierIndex = TIER_ORDER.indexOf(tier);
  return challenges.filter((c) => {
    const challengeTierIndex = TIER_ORDER.indexOf(c.tier);
    return challengeTierIndex <= tierIndex;
  });
}
