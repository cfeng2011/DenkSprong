// Ollama local LLM service — talks to http://localhost:11434 via Vite proxy
const OLLAMA_BASE = '/ollama';
const MODEL = 'qwen2.5:3b';
const REQUEST_TIMEOUT = 15000;

// --- Tier descriptions used in every prompt ---
const TIER_DESC = {
  explorer:     { age: '4-6',   level: 'very young child, use simple words and short sentences' },
  thinker:      { age: '7-9',   level: 'young child, use clear language and simple explanations' },
  investigator: { age: '10-12', level: 'older child, can understand moderate complexity' },
  analyst:      { age: '13-15', level: 'teenager, can handle nuanced explanations' },
  philosopher:  { age: '16-18', level: 'young adult, can engage with abstract and complex ideas' },
};

function langName(lang) {
  return lang === 'nl' ? 'Dutch' : 'English';
}

// --- Core API ---

export async function checkHealth() {
  try {
    const controller = new AbortController();
    const tid = setTimeout(() => controller.abort(), 3000);
    const res = await fetch(`${OLLAMA_BASE}/api/tags`, { signal: controller.signal });
    clearTimeout(tid);
    if (!res.ok) return false;
    const data = await res.json();
    return data.models?.some((m) => m.name.startsWith('qwen2.5')) ?? false;
  } catch {
    return false;
  }
}

export async function generate(prompt, { temperature = 0.3, maxTokens = 512 } = {}) {
  const controller = new AbortController();
  const tid = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
  try {
    const res = await fetch(`${OLLAMA_BASE}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL,
        prompt,
        stream: false,
        options: { temperature, num_predict: maxTokens },
      }),
      signal: controller.signal,
    });
    clearTimeout(tid);
    if (!res.ok) throw new Error(`Ollama ${res.status}`);
    const data = await res.json();
    return data.response;
  } catch (err) {
    clearTimeout(tid);
    throw err;
  }
}

export async function generateStream(prompt, onToken, { temperature = 0.3, maxTokens = 512 } = {}) {
  const controller = new AbortController();
  const tid = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
  const res = await fetch(`${OLLAMA_BASE}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      prompt,
      stream: true,
      options: { temperature, num_predict: maxTokens },
    }),
    signal: controller.signal,
  });
  clearTimeout(tid);
  if (!res.ok) throw new Error(`Ollama ${res.status}`);

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let full = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    for (const line of decoder.decode(value, { stream: true }).split('\n').filter(Boolean)) {
      try {
        const parsed = JSON.parse(line);
        if (parsed.response) {
          full += parsed.response;
          onToken(parsed.response, full);
        }
      } catch { /* skip malformed */ }
    }
  }
  return full;
}

// --- JSON safety ---

export function safeParseJSON(text) {
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    // Try extracting from markdown code block
    const codeBlock = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (codeBlock) {
      try { return JSON.parse(codeBlock[1].trim()); } catch { /* fall through */ }
    }
    // Try first {...} block
    const braceMatch = text.match(/\{[\s\S]*\}/);
    if (braceMatch) {
      try { return JSON.parse(braceMatch[0]); } catch { /* fall through */ }
    }
    return null;
  }
}

// ============================================================
// PROMPT BUILDERS — one per module feature
// ============================================================

// --- Question Builder: Evaluate a student's question ---
export function buildQuestionEvalPrompt(question, sceneDescription, tier, lang) {
  const t = TIER_DESC[tier] || TIER_DESC.thinker;
  return `You are a friendly thinking coach for a ${t.level} (age ${t.age}).

The student is looking at this scene: "${sceneDescription}"

They asked this question: "${question}"

Evaluate their question and respond in ${langName(lang)}.

Respond in EXACTLY this JSON format (no other text):
{
  "score": <number 1-10>,
  "isOpen": <true if the question cannot be answered with yes/no>,
  "isDeep": <true if the question explores causes, reasons, feelings, or consequences>,
  "feedback": "<2-3 sentences explaining what makes this question good or how to improve it>",
  "improvedVersion": "<a better version of their question, or null if already excellent>",
  "whyBetter": "<1 sentence why the improved version is better, or null>"
}

Rules:
- An OPEN question cannot be answered with just yes/no
- A DEEP question explores causes, reasons, feelings, or consequences
- Adjust your language complexity to the student's age
- Be encouraging and positive, even when suggesting improvements
- If the language is Dutch, write ALL text values in Dutch`;
}

// --- Chain of Why: Evaluate a student's "why" answer ---
export function buildChainEvalPrompt(factText, userAnswer, expectedAnswer, depth, previousChain, tier, lang) {
  const t = TIER_DESC[tier] || TIER_DESC.thinker;
  let chainContext = '';
  if (previousChain && previousChain.length > 0) {
    chainContext = '\nPrevious chain:\n' + previousChain.map((a, i) => `  Level ${i + 1}: ${a}`).join('\n');
  }

  return `You are a Socratic thinking coach for a ${t.level} (age ${t.age}).

The starting fact is: "${factText}"
The question is: "Why?" (depth level ${depth + 1})
${chainContext}

The student answered: "${userAnswer}"
The expected answer is: "${expectedAnswer}"

Respond in ${langName(lang)}.

Respond in EXACTLY this JSON format (no other text):
{
  "quality": "<one of: excellent, good, partial, off-track>",
  "feedback": "<1-2 sentences: what they got right, what they missed, encouragement>",
  "socraticHint": "<a guiding question to help them think deeper, or null if quality is excellent>"
}

Rules:
- "excellent" = captures the core idea, even if worded differently
- "good" = mostly right but missing a key aspect
- "partial" = has some relevant ideas but misses the main point
- "off-track" = does not address the actual reason
- Be encouraging. Never say "wrong." Use phrases like "You're on the right track!"
- Adjust complexity to the student's age
- If the language is Dutch, write ALL text values in Dutch`;
}

// --- Chain of Why: Generate a deeper chain level ---
export function buildChainExtendPrompt(factText, chainSoFar, tier, lang) {
  const t = TIER_DESC[tier] || TIER_DESC.thinker;
  const chainText = chainSoFar.map((a, i) => `  Level ${i + 1}: ${a}`).join('\n');

  return `You are a Socratic thinking coach for a ${t.level} (age ${t.age}).

The student has explored a chain of "Why?" questions:
Fact: "${factText}"
${chainText}

Generate the next deeper "Why?" answer that goes one level more fundamental.

Respond in ${langName(lang)}.

Respond in EXACTLY this JSON format (no other text):
{
  "answer": "<the next deeper explanation, 1-2 sentences>",
  "isUltimate": <true if this reaches a truly fundamental principle that is hard to go deeper on>
}`;
}

// --- What's Missing: Generate richer explanation ---
export function buildRicherExplanationPrompt(statement, selectedText, isCorrect, correctText, staticExplanation, tier, lang) {
  const t = TIER_DESC[tier] || TIER_DESC.thinker;
  return `You are a critical thinking coach for a ${t.level} (age ${t.age}).

The student was shown this argument:
"${statement}"

They chose: "${selectedText}"
This was ${isCorrect ? 'CORRECT' : 'INCORRECT'}. The correct answer was: "${correctText}"

The logical fallacy is: "${staticExplanation}"

Respond in ${langName(lang)}.

Give a 2-4 sentence explanation that:
1. Explains WHY this is a logical error in terms the student can understand
2. Gives a real-life example they can relate to
3. If they got it wrong, gently encourage them without making them feel bad

Keep it concise. Respond with ONLY the plain text explanation, no JSON, no markdown.`;
}

// --- What's Missing: Generate a new challenge ---
export function buildNewChallengePrompt(tier, lang) {
  const t = TIER_DESC[tier] || TIER_DESC.thinker;
  return `You are a critical thinking teacher creating exercises for a ${t.level} (age ${t.age}).

Generate a logical fallacy challenge. Respond in ${langName(lang)}.

Respond in EXACTLY this JSON format (no other text):
{
  "statement": "<a flawed argument of 2-3 sentences that contains a logical fallacy>",
  "options": [
    { "text": "<a plausible but WRONG answer>", "correct": false },
    { "text": "<the correct identification of the flaw>", "correct": true },
    { "text": "<another plausible but WRONG answer>", "correct": false }
  ],
  "hint": "<a short hint that points toward the flaw without giving it away>",
  "explanation": "<a 2-3 sentence explanation of the logical error>"
}

Rules:
- Use one of these fallacy types: hasty generalization, false cause, appeal to authority, false dilemma, ad hominem, strawman, bandwagon, circular reasoning
- Make the scenario age-appropriate and relatable
- The wrong options should be genuinely tempting, not obviously wrong
- If the language is Dutch, write ALL text values in Dutch`;
}
