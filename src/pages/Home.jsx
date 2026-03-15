import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useApp, TIERS } from '../store';

const TIER_COLORS = {
  explorer: 'from-pink-400 to-pink-600',
  thinker: 'from-purple-400 to-purple-600',
  investigator: 'from-blue-400 to-blue-600',
  analyst: 'from-green-400 to-green-600',
  philosopher: 'from-orange-400 to-orange-600',
};

export default function Home() {
  const { t } = useTranslation();
  const { dispatch } = useApp();
  const navigate = useNavigate();

  const selectTier = (tierId) => {
    dispatch({ type: 'SET_TIER', payload: tierId });
    navigate('/modules');
  };

  return (
    <div className="text-center">
      <div className="mb-10">
        <h1
          className="text-5xl font-extrabold mb-3"
          style={{ color: 'var(--color-primary)' }}
        >
          {t('app.title')}
        </h1>
        <p className="text-xl text-gray-500 font-medium">
          {t('app.subtitle')}
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-gray-700">
        {t('app.selectAge')}
      </h2>

      <div className="grid gap-4 max-w-md mx-auto">
        {TIERS.map((tier) => (
          <button
            key={tier.id}
            onClick={() => selectTier(tier.id)}
            className={`bg-gradient-to-r ${TIER_COLORS[tier.id]} text-white rounded-2xl p-5 text-left transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]`}
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">{tier.emoji}</span>
              <div>
                <div className="text-xl font-bold">
                  {t(`tiers.${tier.id}`)}
                </div>
                <div className="text-white/80 font-medium">
                  {t(`tiers.${tier.id}Age`)}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
