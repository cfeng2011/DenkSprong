// Vraag van de Dag — open philosophical questions (P4C style).
// No question has a "right" answer; the app only ever responds with counter-questions.

export const dailyQuestions = [
  // --- Explorer (4-6) friendly ---
  {
    id: 'dq-knuffel',
    tiers: ['explorer', 'thinker'],
    question: {
      nl: 'Kan een knuffel je vriend zijn?',
      en: 'Can a stuffed animal be your friend?',
    },
    counterQuestions: {
      nl: [
        'Wat doet een vriend dat een knuffel niet kan?',
        'Kan iets je vriend zijn als het niet terug kan praten?',
        'Hoe weet je eigenlijk dat iemand je vriend is?',
      ],
      en: [
        'What does a friend do that a stuffed animal cannot?',
        'Can something be your friend if it cannot talk back?',
        'How do you actually know that someone is your friend?',
      ],
    },
  },
  {
    id: 'dq-dieren-praten',
    tiers: ['explorer', 'thinker'],
    question: {
      nl: 'Als dieren konden praten, wat zouden ze dan zeggen?',
      en: 'If animals could talk, what would they say?',
    },
    counterQuestions: {
      nl: [
        'Zouden alle dieren hetzelfde willen zeggen, of ieder iets anders?',
        'Praten dieren misschien al met elkaar, op hun eigen manier?',
        'Wat zou jij aan een dier willen vragen?',
      ],
      en: [
        'Would all animals say the same thing, or each something different?',
        'Maybe animals already talk to each other in their own way?',
        'What would you want to ask an animal?',
      ],
    },
  },
  {
    id: 'dq-groot-klein',
    tiers: ['explorer', 'thinker'],
    question: {
      nl: 'Is groot zijn altijd beter dan klein zijn?',
      en: 'Is being big always better than being small?',
    },
    counterQuestions: {
      nl: [
        'Kun je iets bedenken dat juist makkelijker is als je klein bent?',
        'Wie bepaalt eigenlijk wat "beter" is?',
        'Zou een muis liever een olifant willen zijn, denk je?',
      ],
      en: [
        'Can you think of something that is easier when you are small?',
        'Who actually decides what "better" means?',
        'Do you think a mouse would rather be an elephant?',
      ],
    },
  },
  {
    id: 'dq-delen',
    tiers: ['explorer', 'thinker'],
    question: {
      nl: 'Moet je altijd alles delen?',
      en: 'Should you always share everything?',
    },
    counterQuestions: {
      nl: [
        'Zijn er dingen die je niet hoeft te delen? Waarom die wel of niet?',
        'Hoe voelt het als iemand niet met jou wil delen?',
        'Is delen nog aardig als iemand zégt dat het moet?',
      ],
      en: [
        'Are there things you should not have to share? Why those?',
        'How does it feel when someone will not share with you?',
        'Is sharing still kind if someone tells you that you must?',
      ],
    },
  },
  {
    id: 'dq-spelen',
    tiers: ['explorer', 'thinker'],
    question: {
      nl: 'Waarom is spelen eigenlijk leuk?',
      en: 'Why is playing actually fun?',
    },
    counterQuestions: {
      nl: [
        'Is iets nog spelen als je het móét doen?',
        'Kunnen grote mensen ook spelen? Hoe ziet dat eruit?',
        'Leer je iets van spelen, of is het alleen maar leuk?',
      ],
      en: [
        'Is something still play if you HAVE to do it?',
        'Can grown-ups play too? What does that look like?',
        'Do you learn something from playing, or is it only fun?',
      ],
    },
  },
  // --- Thinker (7-9) ---
  {
    id: 'dq-robot-vriend',
    tiers: ['thinker', 'investigator'],
    question: {
      nl: 'Kan een robot je vriend zijn?',
      en: 'Can a robot be your friend?',
    },
    counterQuestions: {
      nl: [
        'Maakt het uit of de robot écht om je geeft, of alleen doet alsof?',
        'Hoe zou je kunnen testen of een robot echt je vriend is?',
        'Wat is het verschil tussen een vriend en iemand die gewoon aardig doet?',
      ],
      en: [
        'Does it matter whether the robot really cares, or only pretends to?',
        'How could you test whether a robot is really your friend?',
        'What is the difference between a friend and someone who just acts nice?',
      ],
    },
  },
  {
    id: 'dq-eerlijk',
    tiers: ['thinker', 'investigator'],
    question: {
      nl: 'Is het weleens goed om niet de waarheid te vertellen?',
      en: 'Is it ever good to not tell the truth?',
    },
    counterQuestions: {
      nl: [
        'Wat als de waarheid iemand verdrietig maakt — verandert dat iets?',
        'Is iets verzwijgen hetzelfde als liegen?',
        'Hoe zou de wereld eruitzien als niemand ooit kon liegen?',
      ],
      en: [
        'What if the truth makes someone sad — does that change anything?',
        'Is keeping something secret the same as lying?',
        'What would the world look like if nobody could ever lie?',
      ],
    },
  },
  {
    id: 'dq-regels',
    tiers: ['thinker', 'investigator'],
    question: {
      nl: 'Waarom hebben we regels? Zou het zonder ook kunnen?',
      en: 'Why do we have rules? Could we do without them?',
    },
    counterQuestions: {
      nl: [
        'Wie zou er winnen en wie zou er verliezen als er geen regels waren?',
        'Zijn er regels die je zelf zou veranderen? Waarom die?',
        'Is een spel zonder regels nog een spel?',
      ],
      en: [
        'Who would win and who would lose if there were no rules?',
        'Are there rules you would change? Why those?',
        'Is a game without rules still a game?',
      ],
    },
  },
  {
    id: 'dq-dapper',
    tiers: ['thinker', 'investigator'],
    question: {
      nl: 'Kun je dapper zijn als je nergens bang voor bent?',
      en: 'Can you be brave if you are not afraid of anything?',
    },
    counterQuestions: {
      nl: [
        'Is dapper zijn iets wat je doet, of iets wat je voelt?',
        'Kan iemand die heel bang is dapperder zijn dan iemand zonder angst?',
        'Wanneer was jij voor het laatst dapper — wat voelde je toen?',
      ],
      en: [
        'Is being brave something you do, or something you feel?',
        'Can a very scared person be braver than someone with no fear?',
        'When were you last brave — what did you feel then?',
      ],
    },
  },
  {
    id: 'dq-mooi',
    tiers: ['thinker', 'investigator'],
    question: {
      nl: 'Is iets mooi voor iedereen, of beslist iedereen dat zelf?',
      en: 'Is something beautiful for everyone, or does each person decide?',
    },
    counterQuestions: {
      nl: [
        'Als jij iets mooi vindt en je vriend niet — wie heeft er gelijk?',
        'Kan iets eerst lelijk zijn en later mooi worden? Hoe dan?',
        'Waarom vinden bijna alle mensen een zonsondergang mooi, denk je?',
      ],
      en: [
        'If you find something beautiful and your friend does not — who is right?',
        'Can something be ugly first and beautiful later? How?',
        'Why do almost all people find a sunset beautiful, do you think?',
      ],
    },
  },
  // --- Investigator (10-12) ---
  {
    id: 'dq-computer-denkt',
    tiers: ['investigator', 'analyst'],
    question: {
      nl: 'Kan een computer echt denken, of doet hij alleen alsof?',
      en: 'Can a computer really think, or does it only pretend?',
    },
    counterQuestions: {
      nl: [
        'Hoe weet je zeker dat ándere mensen echt denken en niet alleen doen alsof?',
        'Wat zou een computer moeten kunnen om jou te overtuigen dat hij denkt?',
        'Is rekenen hetzelfde als denken? Waarom wel of niet?',
      ],
      en: [
        'How do you know for sure that OTHER people really think and are not pretending?',
        'What would a computer need to do to convince you it thinks?',
        'Is calculating the same as thinking? Why or why not?',
      ],
    },
  },
  {
    id: 'dq-eerlijk-verdelen',
    tiers: ['investigator', 'analyst'],
    question: {
      nl: 'Is eerlijk verdelen altijd dat iedereen evenveel krijgt?',
      en: 'Is fair sharing always everyone getting the same amount?',
    },
    counterQuestions: {
      nl: [
        'Wat als de één meer nodig heeft dan de ander — wat is dan eerlijk?',
        'Wat als de één harder heeft gewerkt — verdient die dan meer?',
        'Kan iets eerlijk zijn en toch niet aardig voelen?',
      ],
      en: [
        'What if one person needs more than another — what is fair then?',
        'What if one person worked harder — do they deserve more?',
        'Can something be fair and still not feel kind?',
      ],
    },
  },
  {
    id: 'dq-zelfde-rivier',
    tiers: ['investigator', 'analyst'],
    question: {
      nl: 'Jij verandert elke dag een beetje. Ben je nog steeds dezelfde persoon als vorig jaar?',
      en: 'You change a little every day. Are you still the same person as last year?',
    },
    counterQuestions: {
      nl: [
        'Wat zou er moeten veranderen voordat je iemand anders bent?',
        'Is er iets aan jou dat nooit verandert? Wat dan?',
        'Als je alles vergeet wat je hebt meegemaakt, ben je dan nog jezelf?',
      ],
      en: [
        'What would have to change before you became someone else?',
        'Is there anything about you that never changes? What?',
        'If you forgot everything you have experienced, would you still be you?',
      ],
    },
  },
  {
    id: 'dq-weten-geloven',
    tiers: ['investigator', 'analyst'],
    question: {
      nl: 'Wat is het verschil tussen iets weten en iets geloven?',
      en: 'What is the difference between knowing something and believing something?',
    },
    counterQuestions: {
      nl: [
        'Kun je iets zeker weten zonder het zelf gezien te hebben?',
        'Wat doe je als twee mensen allebei zeggen dat ze iets zeker weten, maar het oneens zijn?',
        'Hoe zou je kunnen controleren of iets echt waar is?',
      ],
      en: [
        'Can you know something for sure without seeing it yourself?',
        'What do you do when two people both say they know for sure, but disagree?',
        'How could you check whether something is really true?',
      ],
    },
  },
  {
    id: 'dq-verveling',
    tiers: ['investigator', 'analyst'],
    question: {
      nl: 'Is je vervelen erg, of kan het juist ergens goed voor zijn?',
      en: 'Is being bored bad, or could it actually be good for something?',
    },
    counterQuestions: {
      nl: [
        'Wat gebeurt er in je hoofd als je je verveelt?',
        'Zouden er minder goede ideeën zijn als niemand zich ooit verveelde?',
        'Waarom proberen we verveling eigenlijk altijd meteen weg te jagen?',
      ],
      en: [
        'What happens in your head when you are bored?',
        'Would there be fewer good ideas if nobody was ever bored?',
        'Why do we always try to chase boredom away immediately?',
      ],
    },
  },
  // --- Analyst / Philosopher (13+) ---
  {
    id: 'dq-vrije-keuze',
    tiers: ['analyst', 'philosopher'],
    question: {
      nl: 'Kies jij je eigen gedachten, of komen ze gewoon in je op?',
      en: 'Do you choose your own thoughts, or do they just appear?',
    },
    counterQuestions: {
      nl: [
        'Probeer eens tien seconden nergens aan te denken — wat zegt het resultaat?',
        'Als gedachten vanzelf komen, wie of wat kiest er dan wat jij doet?',
        'Maakt het voor verantwoordelijkheid uit waar je gedachten vandaan komen?',
      ],
      en: [
        'Try thinking of nothing for ten seconds — what does the result tell you?',
        'If thoughts come by themselves, who or what chooses what you do?',
        'Does it matter for responsibility where your thoughts come from?',
      ],
    },
  },
  {
    id: 'dq-geluk-pil',
    tiers: ['analyst', 'philosopher'],
    question: {
      nl: 'Als een pil je voor altijd gelukkig kon maken, zou je hem nemen?',
      en: 'If a pill could make you happy forever, would you take it?',
    },
    counterQuestions: {
      nl: [
        'Is geluk dat je niet zelf hebt verdiend minder waard?',
        'Zou je nog iets willen bereiken als je al perfect gelukkig was?',
        'Is gelukkig zíjn hetzelfde als een goed leven hebben?',
      ],
      en: [
        'Is happiness you did not earn worth less?',
        'Would you still want to achieve anything if you were already perfectly happy?',
        'Is being happy the same as having a good life?',
      ],
    },
  },
  {
    id: 'dq-meerderheid',
    tiers: ['analyst', 'philosopher'],
    question: {
      nl: 'Als bijna iedereen iets vindt, is het dan waar?',
      en: 'If almost everyone believes something, does that make it true?',
    },
    counterQuestions: {
      nl: [
        'Kun je een voorbeeld bedenken waarbij bijna iedereen het mis had?',
        'Waarom voelt het veiliger om te vinden wat de groep vindt?',
        'Hoe zou je erachter komen dat de meerderheid het mis heeft?',
      ],
      en: [
        'Can you think of an example where almost everyone was wrong?',
        'Why does it feel safer to believe what the group believes?',
        'How would you find out that the majority is wrong?',
      ],
    },
  },
  {
    id: 'dq-natuur',
    tiers: ['analyst', 'philosopher'],
    question: {
      nl: 'Hebben bomen en rivieren rechten nodig, net als mensen?',
      en: 'Do trees and rivers need rights, like people do?',
    },
    counterQuestions: {
      nl: [
        'Moet iets kunnen voelen om rechten te verdienen?',
        'Wie zou er voor een rivier moeten spreken als die rechten had?',
        'Beschermen we de natuur voor de natuur zelf, of voor onszelf?',
      ],
      en: [
        'Does something need to be able to feel to deserve rights?',
        'Who should speak for a river if it had rights?',
        'Do we protect nature for nature itself, or for ourselves?',
      ],
    },
  },
  {
    id: 'dq-vraag-antwoord',
    tiers: ['analyst', 'philosopher'],
    question: {
      nl: 'Wat is waardevoller: een goed antwoord of een goede vraag?',
      en: 'Which is more valuable: a good answer or a good question?',
    },
    counterQuestions: {
      nl: [
        'Kan een antwoord bestaan zonder dat iemand eerst een vraag stelde?',
        'Waarom onthouden we beroemde vragen soms langer dan hun antwoorden?',
        'Welke vraag zou jij het liefst beantwoord zien in jouw leven?',
      ],
      en: [
        'Can an answer exist without someone first asking a question?',
        'Why do we sometimes remember famous questions longer than their answers?',
        'Which question would you most like to see answered in your lifetime?',
      ],
    },
  },
];

function dayOfYear(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0);
  return Math.floor((date - start) / (24 * 60 * 60 * 1000));
}

export function getTodaysQuestion(tierId) {
  const pool = dailyQuestions.filter((q) => q.tiers.includes(tierId));
  const source = pool.length > 0 ? pool : dailyQuestions;
  return source[dayOfYear() % source.length];
}

export function todayKey() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}
