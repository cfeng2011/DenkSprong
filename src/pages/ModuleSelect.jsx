import { useTranslation } from 'react-i18next';
import { useNavigate, Navigate } from 'react-router-dom';
import { useApp } from '../store';

const MODULES = [
  {
    id: 'questionBuilder',
    path: '/question-builder',
    icon: '❓',
    color: 'from-violet-400 to-violet-600',
  },
  {
    id: 'whatsMissing',
    path: '/whats-missing',
    icon: '🧩',
    color: 'from-teal-400 to-teal-600',
  },
  {
    id: 'chainOfWhy',
    path: '/chain-of-why',
    icon: '🔗',
    color: 'from-amber-400 to-amber-600',
  },
];

export default function ModuleSelect() {
  const { t } = useTranslation();
  const { state } = useApp();
  const navigate = useNavigate();

  if (!state.tier) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <button
        onClick={() => navigate('/')}
        className="mb-6 text-gray-500 hover:text-gray-700 font-semibold flex items-center gap-1"
        aria-label={t('app.back')}
      >
        &larr; {t('app.back')}
      </button>

      <h2 className="text-3xl font-extrabold mb-2" style={{ color: 'var(--color-primary)' }}>
        {t(`tiers.${state.tier}`)}
      </h2>
      <p className="text-gray-500 mb-8 text-lg">{t('app.chooseChallenge')}</p>

      <div className="grid gap-5">
        {MODULES.map((mod) => (
          <button
            key={mod.id}
            onClick={() => navigate(mod.path)}
            className={`bg-gradient-to-r ${mod.color} text-white rounded-2xl p-6 text-left transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]`}
          >
            <div className="flex items-center gap-5">
              <span className="text-5xl" aria-hidden="true">{mod.icon}</span>
              <div>
                <div className="text-2xl font-bold">
                  {t(`modules.${mod.id}`)}
                </div>
                <div className="text-white/80 font-medium text-lg">
                  {t(`modules.${mod.id}Desc`)}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
