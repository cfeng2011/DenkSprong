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
  // --- Bonus challenges: surface only after the regular set is done (extra points) ---
  {
    id: 'bonus-toothpaste',
    tier: 'thinker',
    bonus: true,
    statement: {
      en: 'A TV ad says: "9 out of 10 kids who tried SuperSmile toothpaste loved it!" So SuperSmile must be the best toothpaste.',
      nl: 'Een tv-reclame zegt: "9 van de 10 kinderen die SuperSmile-tandpasta probeerden, vonden hem geweldig!" Dus SuperSmile moet de beste tandpasta zijn.',
    },
    options: {
      en: [
        { text: 'We don\'t know how many kids they asked, or who paid for the test!', correct: true },
        { text: 'Most kids have good taste in toothpaste.', correct: false },
        { text: '9 out of 10 is a very high score.', correct: false },
      ],
      nl: [
        { text: 'We weten niet hoeveel kinderen ze hebben gevraagd, of wie de test betaalde!', correct: true },
        { text: 'De meeste kinderen hebben een goede smaak in tandpasta.', correct: false },
        { text: '9 van de 10 is een heel hoge score.', correct: false },
      ],
    },
    hint: {
      en: 'Who made this ad, and what do they want you to do?',
      nl: 'Wie heeft deze reclame gemaakt, en wat willen ze dat jij doet?',
    },
    explanation: {
      en: 'Ads pick the numbers that sell. Maybe they asked only 10 kids, or only kids who already liked it. Always ask: who is telling me this, and why?',
      nl: 'Reclames kiezen de cijfers die verkopen. Misschien vroegen ze maar 10 kinderen, of alleen kinderen die hem al lekker vonden. Vraag altijd: wie vertelt mij dit, en waarom?',
    },
  },
  {
    id: 'bonus-lucky-socks',
    tier: 'investigator',
    bonus: true,
    statement: {
      en: 'I wore my new socks and we won the game. I wore them again and we won again. These socks are lucky — we win because of my socks!',
      nl: 'Ik droeg mijn nieuwe sokken en we wonnen de wedstrijd. Ik droeg ze weer en we wonnen weer. Deze sokken brengen geluk — we winnen door mijn sokken!',
    },
    options: {
      en: [
        { text: 'Two wins is not enough proof — the team\'s skill and luck explain it better!', correct: true },
        { text: 'Many athletes have lucky clothes, so it must work.', correct: false },
        { text: 'New socks are more comfortable, so you play better.', correct: false },
      ],
      nl: [
        { text: 'Twee keer winnen is niet genoeg bewijs — de kwaliteit van het team en toeval verklaren het beter!', correct: true },
        { text: 'Veel sporters hebben geluksokken, dus het moet werken.', correct: false },
        { text: 'Nieuwe sokken zitten lekkerder, dus je speelt beter.', correct: false },
      ],
    },
    hint: {
      en: 'Would you have noticed the socks if the team had lost?',
      nl: 'Zou je de sokken zijn opgevallen als het team had verloren?',
    },
    explanation: {
      en: 'This is "false cause" plus noticing only the hits. We remember the times the ritual "worked" and forget the times it didn\'t. To test it, you\'d need many games — and counting the losses too!',
      nl: 'Dit is een "valse oorzaak" plus alleen de treffers onthouden. We onthouden de keren dat het ritueel "werkte" en vergeten de keren van niet. Om het te testen heb je veel wedstrijden nodig — en je moet ook de verliezen tellen!',
    },
  },
  {
    id: 'bonus-strawman',
    tier: 'analyst',
    bonus: true,
    statement: {
      en: 'Mila says schools should have less homework. Her classmate replies: "So you think kids should learn nothing at all? That\'s ridiculous!"',
      nl: 'Mila zegt dat scholen minder huiswerk moeten geven. Haar klasgenoot antwoordt: "Dus jij vindt dat kinderen helemaal niets moeten leren? Dat is belachelijk!"',
    },
    options: {
      en: [
        { text: 'The classmate attacks a twisted version of Mila\'s idea, not what she actually said.', correct: true },
        { text: 'Mila should have explained her idea more clearly.', correct: false },
        { text: 'Less homework really does mean learning less.', correct: false },
      ],
      nl: [
        { text: 'De klasgenoot valt een verdraaide versie van Mila\'s idee aan, niet wat ze echt zei.', correct: true },
        { text: 'Mila had haar idee duidelijker moeten uitleggen.', correct: false },
        { text: 'Minder huiswerk betekent echt minder leren.', correct: false },
      ],
    },
    hint: {
      en: 'Compare what Mila said with what her classmate claims she said.',
      nl: 'Vergelijk wat Mila zei met wat haar klasgenoot beweert dat ze zei.',
    },
    explanation: {
      en: 'This is a "strawman": replacing someone\'s real argument with an exaggerated version that is easier to attack. "Less homework" is not "no learning." Always respond to what was actually said.',
      nl: 'Dit is een "stropop": iemands echte argument vervangen door een overdreven versie die makkelijker aan te vallen is. "Minder huiswerk" is niet "niets leren." Reageer altijd op wat er écht gezegd is.',
    },
  },
];

export function getChallengesForTier(tier) {
  const tierIndex = TIER_ORDER.indexOf(tier);
  const matching = challenges.filter((c) => {
    const challengeTierIndex = TIER_ORDER.indexOf(c.tier);
    return challengeTierIndex <= tierIndex;
  });
  // Bonus challenges come last: they unlock for fast thinkers who finish the regular set
  return [...matching.filter((c) => !c.bonus), ...matching.filter((c) => c.bonus)];
}
