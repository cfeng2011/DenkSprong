import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../store';

export default function Layout({ children }) {
  const { t, i18n } = useTranslation();
  const { state } = useApp();
  const navigate = useNavigate();

  // Keep <html lang> in sync with selected language
  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.title = t('app.title');
  }, [i18n.language, t]);

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'nl' : 'en');
  };

  const tierClass = state.tier ? `tier-${state.tier}` : '';

  return (
    <div className={`min-h-screen flex flex-col ${tierClass}`}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:bg-white focus:p-3 focus:text-lg focus:font-bold"
      >
        Skip to main content
      </a>

      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="text-2xl font-extrabold tracking-tight"
            style={{ color: 'var(--color-primary)' }}
            aria-label={t('app.home')}
          >
            {t('app.title')}
          </button>

          <div className="flex items-center gap-3">
            {state.llmAvailable !== null && (
              <div
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  state.llmAvailable ? 'bg-green-400' : 'bg-gray-300'
                }`}
                title={state.llmAvailable ? t('llm.connected') : t('llm.offline')}
                aria-label={state.llmAvailable ? t('llm.connected') : t('llm.offline')}
                role="status"
              />
            )}

            {state.tier && (
              <div
                className="flex items-center gap-3 text-sm font-semibold"
                aria-label={`${state.points} ${t('app.points')}`}
              >
                <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                  <span aria-hidden="true">⭐</span> {state.points} {t('app.points')}
                </span>
              </div>
            )}

            <button
              onClick={toggleLang}
              className="px-3 py-1.5 rounded-full text-sm font-bold border-2 transition-all hover:scale-105"
              style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
              aria-label={t('app.langSwitch')}
            >
              {i18n.language === 'en' ? 'NL' : 'EN'}
            </button>
          </div>
        </div>
      </header>

      <main id="main-content" className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        {children}
      </main>
    </div>
  );
}
