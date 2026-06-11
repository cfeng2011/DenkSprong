import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Navigate } from 'react-router-dom';
import { useApp } from '../store';
import { getTodaysQuestion, todayKey } from '../data/dailyQuestions';
import { generate, buildCounterQuestionPrompt } from '../services/llm';

const TOTAL_ROUNDS = 2; // counter-question rounds after the first answer

export default function DailyQuestion() {
  const { t, i18n } = useTranslation();
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const lang = i18n.language === 'nl' ? 'nl' : 'en';

  const question = useMemo(
    () => (state.tier ? getTodaysQuestion(state.tier) : null),
    [state.tier]
  );

  const challengeKey = question ? `${question.id}:${todayKey()}` : null;
  const doneToday = state.completedChallenges.some(
    (c) => c.module === 'daily-question' && c.challenge === challengeKey
  );

  const [exchanges, setExchanges] = useState([]); // { counterQuestion, answer }
  const [currentCounter, setCurrentCounter] = useState(null);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const [finished, setFinished] = useState(false);

  if (!state.tier) return <Navigate to="/" replace />;

  const wordCount = input.trim().split(/\s+/).filter(Boolean).length;
  const roundsDone = exchanges.length;

  const fetchCounterQuestion = async (childAnswer, history) => {
    if (state.llmAvailable) {
      try {
        const reply = await generate(
          buildCounterQuestionPrompt(question.question[lang], childAnswer, history, state.tier, lang),
          { temperature: 0.7, maxTokens: 60 }
        );
        const cleaned = reply?.trim().replace(/^["']|["']$/g, '');
        if (cleaned && cleaned.includes('?')) return cleaned;
      } catch {
        // fall back to canned question below
      }
    }
    return question.counterQuestions[lang][history.length % question.counterQuestions[lang].length];
  };

  const submitAnswer = async () => {
    if (wordCount < 3 || thinking) return;
    const answer = input.trim();
    setInput('');

    if (roundsDone >= TOTAL_ROUNDS || (currentCounter && roundsDone === TOTAL_ROUNDS - 1)) {
      // This was the answer to the final counter-question — finish up
      const allExchanges = currentCounter
        ? [...exchanges, { counterQuestion: currentCounter, answer }]
        : exchanges;
      setExchanges(allExchanges);
      setCurrentCounter(null);
      setFinished(true);
      const points = 10 + 5 * allExchanges.length;
      dispatch({ type: 'ADD_POINTS', payload: points });
      dispatch({
        type: 'COMPLETE_CHALLENGE',
        payload: { module: 'daily-question', challenge: challengeKey },
      });
      return;
    }

    setThinking(true);
    const history = currentCounter
      ? [...exchanges, { counterQuestion: currentCounter, answer }]
      : exchanges;
    if (currentCounter) setExchanges(history);
    const next = await fetchCounterQuestion(answer, history);
    setCurrentCounter(next);
    setThinking(false);
  };

  if (doneToday && !finished) {
    return (
      <div className="text-center py-16">
        <div className="text-7xl mb-6" aria-hidden="true">🌙</div>
        <h2 className="text-3xl font-extrabold mb-3" style={{ color: 'var(--color-primary)' }}>
          {t('dailyQuestion.comeBack')}
        </h2>
        <p className="text-lg text-gray-500 mb-8">{t('dailyQuestion.comeBackSub')}</p>
        <button
          onClick={() => navigate('/modules')}
          className="bg-gradient-to-r from-rose-400 to-rose-600 text-white text-xl font-bold px-8 py-4 rounded-2xl hover:scale-105 transition-transform"
        >
          {t('app.back')}
        </button>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="text-center py-16">
        <div className="text-7xl mb-6 animate-bounce" aria-hidden="true">🌟</div>
        <h2 className="text-3xl font-extrabold mb-3" style={{ color: 'var(--color-primary)' }}>
          {t('dailyQuestion.greatThinking')}
        </h2>
        <p className="text-lg text-gray-500 max-w-md mx-auto mb-2">
          {t('dailyQuestion.noRightAnswer')}
        </p>
        <p className="text-xl font-bold text-amber-600 mb-8">
          +{10 + 5 * exchanges.length} {t('app.points')} ⭐
        </p>
        <button
          onClick={() => navigate('/modules')}
          className="bg-gradient-to-r from-rose-400 to-rose-600 text-white text-xl font-bold px-8 py-4 rounded-2xl hover:scale-105 transition-transform"
        >
          {t('dailyQuestion.moreChallenges')}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate('/modules')}
        className="mb-6 text-gray-500 hover:text-gray-700 font-semibold flex items-center gap-1"
        aria-label={t('app.back')}
      >
        &larr; {t('app.back')}
      </button>

      <div className="text-center mb-8">
        <div className="text-5xl mb-3" aria-hidden="true">🌅</div>
        <h1 className="text-3xl font-extrabold mb-2" style={{ color: 'var(--color-primary)' }}>
          {t('dailyQuestion.title')}
        </h1>
        <p className="text-gray-500 font-medium">{t('dailyQuestion.subtitle')}</p>
      </div>

      {/* The big question of the day */}
      <div className="bg-gradient-to-r from-rose-400 to-orange-400 text-white rounded-3xl p-8 text-center mb-6 shadow-lg">
        <p className="text-2xl font-bold leading-snug">{question.question[lang]}</p>
      </div>

      {/* Conversation so far */}
      {exchanges.map((e, i) => (
        <div key={i} className="mb-4">
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 mb-2">
            <span className="font-bold text-amber-700">🤔 </span>
            <span className="font-semibold text-gray-700">{e.counterQuestion}</span>
          </div>
          <div className="bg-white rounded-2xl p-4 border-2 border-gray-100 ml-6">
            <span className="font-bold" style={{ color: 'var(--color-primary)' }}>🧒 </span>
            <span className="text-gray-700">{e.answer}</span>
          </div>
        </div>
      ))}

      {/* Current counter-question */}
      {currentCounter && (
        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 mb-4">
          <span className="font-bold text-amber-700">🤔 </span>
          <span className="font-semibold text-gray-700">{currentCounter}</span>
        </div>
      )}

      {thinking ? (
        <p className="text-center text-gray-500 font-semibold py-4 animate-pulse">
          {t('dailyQuestion.pondering')}
        </p>
      ) : (
        <div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('dailyQuestion.placeholder')}
            rows={3}
            className="w-full rounded-2xl border-2 border-gray-200 p-4 text-lg focus:border-rose-400 focus:outline-none resize-none"
            aria-label={t('dailyQuestion.yourThoughts')}
          />
          <div className="flex items-center justify-between mt-3">
            <p className="text-sm text-gray-400 font-medium">
              {wordCount < 3 ? t('dailyQuestion.minWords') : ''}
            </p>
            <button
              onClick={submitAnswer}
              disabled={wordCount < 3}
              className="bg-gradient-to-r from-rose-400 to-rose-600 text-white text-lg font-bold px-8 py-3 rounded-2xl hover:scale-105 transition-transform disabled:opacity-40 disabled:hover:scale-100"
            >
              {t('app.submit')} ✨
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
