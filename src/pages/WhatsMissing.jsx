import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, useNavigate } from 'react-router-dom';
import { useApp } from '../store';
import { getChallengesForTier } from '../data/whatsMissingChallenges';
import { generate, safeParseJSON, buildRicherExplanationPrompt, buildNewChallengePrompt } from '../services/llm';

function getLang(i18nLang) {
  return i18nLang.startsWith('nl') ? 'nl' : 'en';
}

export default function WhatsMissing() {
  const { t, i18n } = useTranslation();
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const lang = getLang(i18n.language);

  const staticChallenges = useMemo(() => getChallengesForTier(state.tier), [state.tier]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // LLM state
  const [llmExplanation, setLlmExplanation] = useState('');
  const [llmExplLoading, setLlmExplLoading] = useState(false);
  const [dynamicChallenge, setDynamicChallenge] = useState(null); // LLM-generated challenge
  const [generatingChallenge, setGeneratingChallenge] = useState(false);
  const [showingDynamic, setShowingDynamic] = useState(false);

  if (!state.tier) return <Navigate to="/" replace />;

  // Determine current challenge (static or dynamic)
  const isOnDynamic = showingDynamic && dynamicChallenge;
  const challenge = isOnDynamic ? dynamicChallenge : staticChallenges[index];
  if (!challenge && !isOnDynamic) return <Navigate to="/modules" replace />;

  const options = isOnDynamic ? challenge.options : challenge.options[lang];
  const statement = isOnDynamic ? challenge.statement : challenge.statement[lang];
  const hintText = isOnDynamic ? challenge.hint : challenge.hint[lang];
  const explanationText = isOnDynamic ? challenge.explanation : challenge.explanation[lang];
  const totalCount = staticChallenges.length + (dynamicChallenge ? 1 : 0);

  const handleSelect = async (optIndex) => {
    if (selected !== null) return;
    setSelected(optIndex);
    setShowExplanation(true);

    const isCorrect = options[optIndex].correct;
    if (isCorrect) {
      const points = showHint ? 3 : 5;
      dispatch({ type: 'ADD_POINTS', payload: points });
      if (!isOnDynamic) {
        dispatch({ type: 'COMPLETE_CHALLENGE', payload: { module: 'whatsMissing', challenge: challenge.id, points } });
      }
    }

    // LLM richer explanation (non-blocking)
    if (state.llmAvailable) {
      setLlmExplLoading(true);
      try {
        const correctOpt = options.find((o) => o.correct);
        const prompt = buildRicherExplanationPrompt(
          statement,
          options[optIndex].text,
          isCorrect,
          correctOpt.text,
          explanationText,
          state.tier,
          lang
        );
        const raw = await generate(prompt, { temperature: 0.4, maxTokens: 250 });
        if (raw) setLlmExplanation(raw.trim());
      } catch {
        // silent
      } finally {
        setLlmExplLoading(false);
      }
    }
  };

  const handleNext = () => {
    setSelected(null);
    setShowHint(false);
    setShowExplanation(false);
    setLlmExplanation('');
    setLlmExplLoading(false);

    if (isOnDynamic) {
      // After a dynamic challenge, go back to static cycling
      setShowingDynamic(false);
      setDynamicChallenge(null);
      return;
    }

    if (index < staticChallenges.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  };

  const handleGenerateNew = async () => {
    if (!state.llmAvailable) return;
    setGeneratingChallenge(true);
    try {
      const prompt = buildNewChallengePrompt(state.tier, lang);
      const raw = await generate(prompt, { temperature: 0.7, maxTokens: 500 });
      const parsed = safeParseJSON(raw);
      if (parsed && parsed.statement && parsed.options && parsed.explanation) {
        setDynamicChallenge(parsed);
        setShowingDynamic(true);
        setSelected(null);
        setShowHint(false);
        setShowExplanation(false);
        setLlmExplanation('');
      }
    } catch {
      // silent
    } finally {
      setGeneratingChallenge(false);
    }
  };

  const isCorrect = selected !== null && options[selected]?.correct;

  return (
    <div>
      <button onClick={() => navigate('/modules')} className="mb-6 text-gray-500 hover:text-gray-700 font-semibold flex items-center gap-1" aria-label={t('app.back')}>
        &larr; {t('app.back')}
      </button>

      <h2 className="text-3xl font-extrabold mb-2" style={{ color: 'var(--color-primary)' }}>
        {t('modules.whatsMissing')}
      </h2>
      <p className="text-gray-500 mb-4 font-medium">{t('whatsMissing.instruction')}</p>

      {/* Progress */}
      {!isOnDynamic && (
        <div className="flex items-center gap-3 mb-6">
          <span className="text-sm font-semibold text-gray-400">
            {t('whatsMissing.progress', { current: index + 1, total: staticChallenges.length })}
          </span>
          <div className="flex gap-1 flex-1" role="progressbar" aria-valuenow={index + (selected !== null ? 1 : 0)} aria-valuemin={0} aria-valuemax={staticChallenges.length}>
            {staticChallenges.map((_, i) => (
              <div
                key={i}
                className="h-2 flex-1 rounded-full transition-all"
                style={{
                  backgroundColor:
                    i < index || (i === index && selected !== null) ? 'var(--color-success, #00B894)' : i === index ? 'var(--color-primary)' : '#E2E8F0',
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* AI Generated badge */}
      {isOnDynamic && (
        <div className="mb-4">
          <span className="inline-flex items-center gap-1.5 bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full">
            <span aria-hidden="true">🤖</span> {t('whatsMissing.aiGenerated')}
          </span>
        </div>
      )}

      {/* Statement Card */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <div className="text-4xl text-center mb-4" aria-hidden="true">🤔</div>
        <p className="text-lg text-center font-medium text-gray-700 leading-relaxed italic">
          &ldquo;{statement}&rdquo;
        </p>
      </div>

      {/* Hint */}
      {!showHint && selected === null && (
        <button onClick={() => setShowHint(true)} className="mb-4 text-sm font-bold underline" style={{ color: 'var(--color-primary)' }}>
          💡 {t('whatsMissing.hint')}
        </button>
      )}
      {showHint && !showExplanation && (
        <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 mb-4">
          <p className="text-amber-700 font-medium">💡 {hintText}</p>
        </div>
      )}

      {/* Options */}
      <div className="space-y-3 mb-6">
        <p className="font-bold text-gray-600">{t('whatsMissing.findGap')}</p>
        {options.map((opt, i) => {
          let borderColor = 'border-gray-200';
          let bg = 'bg-white';
          if (selected !== null) {
            if (opt.correct) { borderColor = 'border-green-400'; bg = 'bg-green-50'; }
            else if (i === selected && !opt.correct) { borderColor = 'border-red-400'; bg = 'bg-red-50'; }
          }
          return (
            <button
              key={`opt-${i}`}
              onClick={() => handleSelect(i)}
              disabled={selected !== null}
              className={`w-full text-left ${bg} border-2 ${borderColor} rounded-xl p-4 transition-all ${selected === null ? 'hover:border-purple-300 hover:shadow-sm' : ''}`}
              aria-pressed={selected === i}
            >
              <span className="font-medium text-gray-700">{opt.text}</span>
              {selected !== null && opt.correct && <span className="ml-2 text-green-600 font-bold" aria-label="Correct">✓</span>}
              {selected === i && !opt.correct && <span className="ml-2 text-red-600 font-bold" aria-label="Incorrect">✗</span>}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className={`rounded-2xl p-6 mb-4 ${isCorrect ? 'bg-green-50 border-2 border-green-200' : 'bg-orange-50 border-2 border-orange-200'}`} role="alert">
          <p className={`text-xl font-extrabold mb-2 ${isCorrect ? 'text-green-700' : 'text-orange-700'}`}>
            {isCorrect ? t('whatsMissing.correct') : t('whatsMissing.incorrect')}
            {isCorrect ? ' 🎉' : ''}
          </p>
          <p className="font-bold text-gray-600 mb-1">{t('whatsMissing.explanation')}:</p>
          <p className="text-gray-600">{explanationText}</p>
        </div>
      )}

      {/* LLM Richer Explanation */}
      {showExplanation && (llmExplLoading || llmExplanation) && (
        <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-4 mb-4">
          <p className="text-xs font-bold text-indigo-400 uppercase mb-2 flex items-center gap-1.5">
            <span aria-hidden="true">🤖</span> {t('whatsMissing.learnMore')}
          </p>
          {llmExplLoading && (
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-4 h-4 border-2 border-indigo-300 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm">{t('llm.thinking')}</span>
            </div>
          )}
          {llmExplanation && <p className="text-gray-700 font-medium">{llmExplanation}</p>}
        </div>
      )}

      {/* Next + Generate New */}
      {selected !== null && (
        <div className="flex flex-col gap-3">
          <button
            onClick={handleNext}
            className="w-full py-3 rounded-xl text-white font-bold text-lg transition-all hover:shadow-lg"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            {t('app.next')} &rarr;
          </button>

          {/* Generate new challenge button — show when LLM is available */}
          {state.llmAvailable && !isOnDynamic && (
            <button
              onClick={handleGenerateNew}
              disabled={generatingChallenge}
              className="w-full py-3 rounded-xl font-bold text-lg transition-all hover:shadow-lg border-2 disabled:opacity-60"
              style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
            >
              {generatingChallenge ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  {t('whatsMissing.generating')}
                </span>
              ) : (
                `🤖 ${t('whatsMissing.generateNew')}`
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
