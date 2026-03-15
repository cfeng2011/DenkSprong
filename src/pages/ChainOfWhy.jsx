import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, useNavigate } from 'react-router-dom';
import { useApp } from '../store';
import { getFactsForTier } from '../data/chainOfWhyFacts';
import { generate, safeParseJSON, buildChainEvalPrompt, buildChainExtendPrompt } from '../services/llm';

function getLang(i18nLang) {
  return i18nLang.startsWith('nl') ? 'nl' : 'en';
}

const QUALITY_COLORS = {
  excellent: 'bg-green-50 border-green-300 text-green-700',
  good: 'bg-blue-50 border-blue-300 text-blue-700',
  partial: 'bg-amber-50 border-amber-300 text-amber-700',
  'off-track': 'bg-orange-50 border-orange-300 text-orange-700',
};

function DepthMeter({ depth, max, label }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-sm font-bold text-gray-500">{label}:</span>
      <div className="flex gap-1" role="progressbar" aria-valuenow={depth} aria-valuemin={0} aria-valuemax={max} aria-label={`${label} ${depth}/${max}`}>
        {Array.from({ length: max }, (_, i) => (
          <div
            key={i}
            className="w-8 h-3 rounded-full transition-all duration-300"
            style={{
              backgroundColor: i < depth ? `hsl(${120 + (i * 30)}, 70%, 50%)` : '#E2E8F0',
              transform: i < depth ? 'scaleY(1.3)' : 'scaleY(1)',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function ChainOfWhy() {
  const { t, i18n } = useTranslation();
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const lang = getLang(i18n.language);

  const availableFacts = useMemo(() => getFactsForTier(state.tier), [state.tier]);
  const [factIndex, setFactIndex] = useState(0);
  const [depth, setDepth] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [revealedAnswers, setRevealedAnswers] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  // LLM state
  const [llmEval, setLlmEval] = useState(null);
  const [llmEvalLoading, setLlmEvalLoading] = useState(false);
  const [extendedChain, setExtendedChain] = useState([]); // LLM-generated extra levels
  const [extendingChain, setExtendingChain] = useState(false);

  if (!state.tier) return <Navigate to="/" replace />;
  const fact = availableFacts[factIndex];
  if (!fact) return <Navigate to="/modules" replace />;

  const chain = fact.chain[lang];
  const totalDepth = chain.length + extendedChain.length;

  // Get the expected answer for current depth (from static chain or extended)
  const getExpectedAnswer = (d) => {
    if (d < chain.length) return chain[d];
    return extendedChain[d - chain.length] || null;
  };

  const handleAskWhy = async () => {
    if (userAnswer.trim().length < 3) return;

    const expected = getExpectedAnswer(depth);
    const entry = { user: userAnswer, suggested: expected };
    setRevealedAnswers([...revealedAnswers, entry]);
    setShowComparison(true);

    // LLM evaluation (non-blocking)
    if (state.llmAvailable && expected) {
      setLlmEvalLoading(true);
      try {
        const previousAnswers = chain.slice(0, depth);
        const prompt = buildChainEvalPrompt(fact.fact[lang], userAnswer, expected, depth, previousAnswers, state.tier, lang);
        const raw = await generate(prompt, { temperature: 0.3, maxTokens: 200 });
        const parsed = safeParseJSON(raw);
        if (parsed && parsed.quality) {
          setLlmEval(parsed);
          if (parsed.quality === 'excellent') {
            dispatch({ type: 'ADD_POINTS', payload: 2 });
          }
        }
      } catch {
        setLlmEval(null);
      } finally {
        setLlmEvalLoading(false);
      }
    }
  };

  const handleContinue = () => {
    const newDepth = depth + 1;
    setDepth(newDepth);
    setUserAnswer('');
    setShowComparison(false);
    setLlmEval(null);
    setLlmEvalLoading(false);

    dispatch({ type: 'ADD_POINTS', payload: newDepth });

    if (newDepth >= totalDepth) {
      dispatch({ type: 'COMPLETE_CHALLENGE', payload: { module: 'chainOfWhy', fact: fact.id, depth: newDepth } });
    }
  };

  const handleExtendChain = async () => {
    if (!state.llmAvailable) return;
    setExtendingChain(true);
    try {
      const allAnswers = [...chain, ...extendedChain];
      const prompt = buildChainExtendPrompt(fact.fact[lang], allAnswers, state.tier, lang);
      const raw = await generate(prompt, { temperature: 0.5, maxTokens: 200 });
      const parsed = safeParseJSON(raw);
      if (parsed && parsed.answer) {
        setExtendedChain([...extendedChain, parsed.answer]);
      }
    } catch {
      // silent
    } finally {
      setExtendingChain(false);
    }
  };

  const handleNextFact = () => {
    setDepth(0);
    setUserAnswer('');
    setRevealedAnswers([]);
    setShowComparison(false);
    setLlmEval(null);
    setLlmEvalLoading(false);
    setExtendedChain([]);
    if (factIndex < availableFacts.length - 1) {
      setFactIndex(factIndex + 1);
    } else {
      setFactIndex(0);
    }
  };

  const getMessage = () => {
    if (depth >= totalDepth) return t('chainOfWhy.maxDepth');
    if (depth >= 4) return t('chainOfWhy.amazing');
    if (depth >= 2) return t('chainOfWhy.keepGoing');
    return t('chainOfWhy.goodStart');
  };

  const isComplete = depth >= totalDepth;
  const canExtend = isComplete && state.llmAvailable && extendedChain.length < 3;

  return (
    <div>
      <button onClick={() => navigate('/modules')} className="mb-6 text-gray-500 hover:text-gray-700 font-semibold flex items-center gap-1" aria-label={t('app.back')}>
        &larr; {t('app.back')}
      </button>

      <h2 className="text-3xl font-extrabold mb-2" style={{ color: 'var(--color-primary)' }}>
        {t('modules.chainOfWhy')}
      </h2>
      <p className="text-gray-500 mb-4 font-medium">{t('chainOfWhy.instruction')}</p>

      <DepthMeter depth={depth} max={totalDepth} label={t('chainOfWhy.depth')} />

      <div className="space-y-3 mb-6">
        {/* Starting fact */}
        <div className="bg-white rounded-2xl shadow-md p-5 border-l-4" style={{ borderColor: 'var(--color-primary)' }}>
          <p className="text-xs font-bold text-gray-400 uppercase mb-1">{t('chainOfWhy.startFact')}</p>
          <p className="text-lg font-medium text-gray-700">{fact.fact[lang]}</p>
        </div>

        {/* Revealed chain links */}
        {revealedAnswers.map((answer, i) => (
          <div key={i} className="ml-4">
            <div className="flex items-center gap-2 mb-2 ml-2">
              <div className="w-0.5 h-4" style={{ backgroundColor: 'var(--color-primary)' }} aria-hidden="true" />
              <span className="text-sm font-bold" style={{ color: 'var(--color-primary)' }}>{t('chainOfWhy.askWhy')}</span>
            </div>

            {/* User's answer */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-2">
              <p className="text-xs font-bold text-blue-400 mb-1">{t('chainOfWhy.yourAnswer')}:</p>
              <p className="text-gray-700 font-medium">{answer.user}</p>
            </div>

            {/* LLM Evaluation (only for the latest answer while it's the current comparison) */}
            {i === revealedAnswers.length - 1 && showComparison && (llmEvalLoading || llmEval) && (
              <div className={`border-2 rounded-xl p-4 mb-2 ${llmEval ? QUALITY_COLORS[llmEval.quality] || 'bg-gray-50 border-gray-200 text-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                <p className="text-xs font-bold uppercase mb-1 flex items-center gap-1.5">
                  <span aria-hidden="true">🤖</span> {t('chainOfWhy.aiEvaluation')}
                </p>

                {llmEvalLoading && (
                  <div className="flex items-center gap-2 text-gray-400">
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm">{t('llm.thinking')}</span>
                  </div>
                )}

                {llmEval && (
                  <div>
                    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-bold mb-2">
                      {t(`chainOfWhy.${llmEval.quality === 'off-track' ? 'offTrack' : llmEval.quality}`)}
                    </span>
                    <p className="text-sm font-medium">{llmEval.feedback}</p>
                    {llmEval.socraticHint && (
                      <p className="text-sm italic mt-1 opacity-80">💡 {llmEval.socraticHint}</p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Suggested answer */}
            {answer.suggested && (
              <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
                <p className="text-xs font-bold text-purple-400 mb-1">{t('chainOfWhy.suggestedAnswer')}:</p>
                <p className="text-gray-700 font-medium">{answer.suggested}</p>
              </div>
            )}
          </div>
        ))}

        {/* Current "Why?" prompt */}
        {!isComplete && !showComparison && (
          <div className="ml-4">
            <div className="flex items-center gap-2 mb-2 ml-2">
              <div className="w-0.5 h-4" style={{ backgroundColor: 'var(--color-primary)' }} aria-hidden="true" />
              <span className="text-lg font-bold" style={{ color: 'var(--color-primary)' }}>
                {t('chainOfWhy.askWhy')} 🤔
              </span>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-5">
              <label htmlFor="why-answer" className="sr-only">{t('chainOfWhy.answerLabel')}</label>
              <textarea
                id="why-answer"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAskWhy(); } }}
                placeholder={t('chainOfWhy.typeAnswer')}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-purple-400 transition-colors resize-none"
                rows={2}
                maxLength={500}
              />
              <button
                onClick={handleAskWhy}
                disabled={userAnswer.trim().length < 3}
                className="mt-3 w-full py-3 rounded-xl text-white font-bold text-lg transition-all hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                {t('app.submit')}
              </button>
            </div>
          </div>
        )}

        {/* Continue / Go deeper button */}
        {showComparison && !isComplete && (
          <div className="ml-4">
            <button
              onClick={handleContinue}
              className="w-full py-3 rounded-xl text-white font-bold text-lg transition-all hover:shadow-lg"
              style={{ backgroundColor: 'var(--color-secondary, #00CEC9)' }}
            >
              {depth + 1 < totalDepth
                ? `${t('chainOfWhy.askWhy')} - ${t('chainOfWhy.goDeeper')}`
                : t('chainOfWhy.seeFinal')}
            </button>
          </div>
        )}

        {/* After last comparison but before we mark complete */}
        {showComparison && depth + 1 >= totalDepth && (
          <div className="ml-4">
            <button
              onClick={handleContinue}
              className="w-full py-3 rounded-xl text-white font-bold text-lg transition-all hover:shadow-lg"
              style={{ backgroundColor: 'var(--color-secondary, #00CEC9)' }}
            >
              {t('chainOfWhy.seeFinal')}
            </button>
          </div>
        )}
      </div>

      {/* Completion */}
      {isComplete && !showComparison && (
        <>
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-6 text-center mb-6" role="alert">
            <div className="text-4xl mb-2" aria-hidden="true">🏆</div>
            <p className="text-xl font-extrabold mb-2">{getMessage()}</p>
            <p className="text-white/80">{t('chainOfWhy.depth')}: {depth}/{totalDepth}</p>
          </div>

          <div className="flex flex-col items-center gap-3">
            {/* Go Even Deeper — LLM extends the chain */}
            {canExtend && (
              <button
                onClick={handleExtendChain}
                disabled={extendingChain}
                className="w-full py-3 rounded-xl text-white font-bold text-lg transition-all hover:shadow-lg disabled:opacity-60"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                {extendingChain ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {t('chainOfWhy.extending')}
                  </span>
                ) : (
                  `🔗 ${t('chainOfWhy.goEvenDeeper')}`
                )}
              </button>
            )}

            {depth > 0 && depth < totalDepth && (
              <p className="text-gray-500 font-medium text-lg">{getMessage()}</p>
            )}

            <button
              onClick={handleNextFact}
              className="px-8 py-3 rounded-xl font-bold text-lg transition-all hover:shadow-lg border-2"
              style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
            >
              {t('app.next')} {t('app.fact')} &rarr;
            </button>
          </div>
        </>
      )}

      {/* Mid-chain encouragement */}
      {!isComplete && !showComparison && depth > 0 && (
        <div className="text-center">
          <p className="text-gray-500 font-medium mb-4 text-lg">{getMessage()}</p>
          <button
            onClick={handleNextFact}
            className="px-8 py-3 rounded-xl font-bold text-lg transition-all hover:shadow-lg border-2"
            style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
          >
            {t('app.next')} {t('app.fact')} &rarr;
          </button>
        </div>
      )}
    </div>
  );
}
