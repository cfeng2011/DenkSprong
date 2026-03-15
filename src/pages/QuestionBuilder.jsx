import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, useNavigate } from 'react-router-dom';
import { useApp } from '../store';
import { scenes, questionStarters, deepIndicators, closedStarters } from '../data/questionBuilderScenes';
import { generate, safeParseJSON, buildQuestionEvalPrompt } from '../services/llm';

function getLang(i18nLang) {
  return i18nLang.startsWith('nl') ? 'nl' : 'en';
}

function analyzeQuestion(question, lang) {
  const q = question.toLowerCase().trim();
  if (q.length < 5) return null;

  const indicators = deepIndicators[lang] || deepIndicators.en;
  const closedRegex = closedStarters[lang] || closedStarters.en;

  const isOpen = !closedRegex.test(q);
  const isDeep = indicators.some((ind) => q.includes(ind));
  const hasQuestionMark = q.includes('?');

  let score = 0;
  if (hasQuestionMark) score += 1;
  if (isOpen) score += 2;
  if (isDeep) score += 3;
  const wordCount = q.split(/\s+/).filter(Boolean).length;
  if (wordCount >= 5) score += 1;
  if (wordCount >= 10) score += 1;

  return { isOpen, isDeep, score: Math.min(score, 8), maxScore: 8 };
}

function ScoreStars({ score, max }) {
  const filled = Math.round((score / max) * 5);
  return (
    <div className="flex gap-1 text-2xl" role="img" aria-label={`${filled} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < filled ? 'opacity-100' : 'opacity-20'} aria-hidden="true">
          ⭐
        </span>
      ))}
    </div>
  );
}

function LlmFeedbackCard({ llmFeedback, llmLoading, t }) {
  if (!llmLoading && !llmFeedback) return null;

  return (
    <div className="mt-4 bg-indigo-50 border-2 border-indigo-200 rounded-xl p-4">
      <p className="text-xs font-bold text-indigo-400 uppercase mb-2 flex items-center gap-1.5">
        <span aria-hidden="true">🤖</span> {t('questionBuilder.aiCoach')}
      </p>

      {llmLoading && (
        <div className="flex items-center gap-2 text-gray-400">
          <div className="w-4 h-4 border-2 border-indigo-300 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm">{t('llm.thinking')}</span>
        </div>
      )}

      {llmFeedback && (
        <div>
          <p className="text-gray-700 font-medium mb-3">{llmFeedback.feedback}</p>

          {llmFeedback.improvedVersion && (
            <div className="bg-white rounded-lg p-3 border border-indigo-100">
              <p className="text-xs font-bold text-indigo-500 mb-1">{t('questionBuilder.improvedQuestion')}</p>
              <p className="text-gray-700 italic">&ldquo;{llmFeedback.improvedVersion}&rdquo;</p>
              {llmFeedback.whyBetter && (
                <p className="text-xs text-gray-500 mt-1">
                  <span className="font-bold">{t('questionBuilder.whyBetter')}</span> {llmFeedback.whyBetter}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function QuestionBuilder() {
  const { t, i18n } = useTranslation();
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [sceneIndex, setSceneIndex] = useState(0);
  const [question, setQuestion] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [tooShort, setTooShort] = useState(false);
  const [selectedStarter, setSelectedStarter] = useState('');

  // LLM state
  const [llmFeedback, setLlmFeedback] = useState(null);
  const [llmLoading, setLlmLoading] = useState(false);

  const lang = getLang(i18n.language);
  const isYoung = state.tier === 'explorer' || state.tier === 'thinker';

  const availableScenes = useMemo(
    () => scenes.filter((s) => s.tiers.includes(state.tier)),
    [state.tier]
  );

  if (!state.tier) return <Navigate to="/" replace />;
  const scene = availableScenes[sceneIndex];
  if (!scene) return <Navigate to="/modules" replace />;

  const starters = questionStarters[lang] || questionStarters.en;

  const handleSubmit = async () => {
    const fullQuestion = isYoung ? `${selectedStarter} ${question}` : question;
    const result = analyzeQuestion(fullQuestion, lang);
    if (!result) { setTooShort(true); return; }
    setTooShort(false);
    setFeedback(result);
    dispatch({ type: 'ADD_POINTS', payload: result.score });
    dispatch({ type: 'COMPLETE_CHALLENGE', payload: { module: 'questionBuilder', scene: scene.id, score: result.score } });

    // LLM enhancement (non-blocking)
    if (state.llmAvailable) {
      setLlmLoading(true);
      try {
        const sceneDesc = t(`questionBuilder.scenes.${scene.id}`);
        const prompt = buildQuestionEvalPrompt(fullQuestion, sceneDesc, state.tier, lang);
        const raw = await generate(prompt, { temperature: 0.3, maxTokens: 300 });
        const parsed = safeParseJSON(raw);
        if (parsed && parsed.feedback) {
          setLlmFeedback(parsed);
        }
      } catch {
        // Silent — static feedback already visible
      } finally {
        setLlmLoading(false);
      }
    }
  };

  const handleNext = () => {
    if (sceneIndex < availableScenes.length - 1) {
      setSceneIndex(sceneIndex + 1);
    } else {
      setSceneIndex(0);
    }
    setQuestion('');
    setFeedback(null);
    setTooShort(false);
    setSelectedStarter('');
    setLlmFeedback(null);
    setLlmLoading(false);
  };

  const exampleQuestions = scene.exampleQuestions.deep[lang] || scene.exampleQuestions.deep.en;

  return (
    <div>
      <button onClick={() => navigate('/modules')} className="mb-6 text-gray-500 hover:text-gray-700 font-semibold flex items-center gap-1" aria-label={t('app.back')}>
        &larr; {t('app.back')}
      </button>

      <h2 className="text-3xl font-extrabold mb-2" style={{ color: 'var(--color-primary)' }}>
        {t('modules.questionBuilder')}
      </h2>

      {/* Scene Card */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <div className="text-6xl mb-4 text-center tracking-widest" role="img" aria-label={scene.emojiLabel[lang]}>
          {scene.emoji}
        </div>
        <p className="text-lg text-center text-gray-700 font-medium leading-relaxed">
          {t(`questionBuilder.scenes.${scene.id}`)}
        </p>
      </div>

      <p className="text-gray-500 mb-4 font-medium">
        {isYoung ? t('questionBuilder.instructionYoung') : t('questionBuilder.instruction')}
      </p>

      {/* Question Input */}
      {!feedback && (
        <div className="bg-white rounded-2xl shadow-md p-6">
          {isYoung && (
            <div className="mb-4">
              <p className="text-sm font-bold text-gray-500 mb-2">{t('questionBuilder.questionStarters')}</p>
              <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={t('questionBuilder.questionStarters')}>
                {starters.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedStarter(s)}
                    role="radio"
                    aria-checked={selectedStarter === s}
                    className={`px-4 py-2 rounded-full font-bold text-sm transition-all ${selectedStarter === s ? 'text-white shadow-md scale-105' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    style={selectedStarter === s ? { backgroundColor: 'var(--color-primary)' } : {}}
                  >
                    {s}...
                  </button>
                ))}
              </div>
            </div>
          )}

          <label htmlFor="question-input" className="sr-only">{t('questionBuilder.questionLabel')}</label>
          <div className="flex gap-2">
            {isYoung && selectedStarter && (
              <span className="flex items-center font-bold text-lg" style={{ color: 'var(--color-primary)' }}>
                {selectedStarter}
              </span>
            )}
            <input
              id="question-input"
              type="text"
              value={question}
              onChange={(e) => { setQuestion(e.target.value); setTooShort(false); }}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder={t('questionBuilder.typeQuestion')}
              className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-purple-400 transition-colors"
              maxLength={300}
            />
          </div>

          {tooShort && (
            <p className="mt-2 text-sm text-orange-600 font-medium" role="alert">{t('questionBuilder.tooShort')}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={question.length < 3}
            className="mt-4 w-full py-3 rounded-xl text-white font-bold text-lg transition-all hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            {t('app.submit')}
          </button>
        </div>
      )}

      {/* Feedback */}
      {feedback && (
        <div className="bg-white rounded-2xl shadow-md p-6 text-center" role="alert">
          <div className="mb-4">
            <ScoreStars score={feedback.score} max={feedback.maxScore} />
          </div>

          <h3 className="text-2xl font-extrabold mb-2" style={{ color: 'var(--color-primary)' }}>
            {feedback.score >= 6 ? t('questionBuilder.great') : feedback.score >= 3 ? t('questionBuilder.good') : t('questionBuilder.tryDeeper')}
          </h3>

          <div className="flex flex-col sm:flex-row justify-center gap-3 mb-4 text-sm">
            <span className={`px-3 py-1.5 rounded-full font-bold ${feedback.isOpen ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
              {feedback.isOpen ? t('questionBuilder.rateOpen') : t('questionBuilder.rateClosed')}
            </span>
            <span className={`px-3 py-1.5 rounded-full font-bold ${feedback.isDeep ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
              {feedback.isDeep ? t('questionBuilder.rateDeep') : t('questionBuilder.rateSurface')}
            </span>
          </div>

          <p className="text-gray-500 italic mb-4">{t('questionBuilder.tip')}</p>

          {/* AI Coach Feedback */}
          <LlmFeedbackCard llmFeedback={llmFeedback} llmLoading={llmLoading} t={t} />

          <div className="text-sm text-left bg-gray-50 rounded-xl p-4 mb-4 mt-4">
            <p className="font-bold text-gray-600 mb-1">{t('questionBuilder.examplesTitle')}:</p>
            {exampleQuestions.map((eq, i) => (
              <p key={i} className="text-gray-500">💡 {eq}</p>
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-full py-3 rounded-xl text-white font-bold text-lg transition-all hover:shadow-lg"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            {t('app.next')} &rarr;
          </button>
        </div>
      )}
    </div>
  );
}
