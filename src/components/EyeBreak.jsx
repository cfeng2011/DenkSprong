import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const WORK_MS = 20 * 60 * 1000; // 20 minutes of active use
const REST_S = 20; // 20-second rest (20-20-20 rule)

export default function EyeBreak({ mascot = '💡', storageKey = 'oogpauze-stickers' }) {
  const { t } = useTranslation();
  const [phase, setPhase] = useState('working'); // 'working' | 'resting' | 'done'
  const [countdown, setCountdown] = useState(REST_S);
  const [stickers, setStickers] = useState(() => {
    try {
      return parseInt(localStorage.getItem(storageKey), 10) || 0;
    } catch {
      return 0;
    }
  });
  const activeMs = useRef(0);

  // Count active time only while the tab is visible
  useEffect(() => {
    if (phase !== 'working') return undefined;
    const id = setInterval(() => {
      if (document.visibilityState === 'visible') {
        activeMs.current += 1000;
        if (activeMs.current >= WORK_MS) {
          setCountdown(REST_S);
          setPhase('resting');
        }
      }
    }, 1000);
    return () => clearInterval(id);
  }, [phase]);

  // Rest countdown — no way to dismiss until it reaches zero
  useEffect(() => {
    if (phase !== 'resting') return undefined;
    const id = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          setPhase('done');
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [phase]);

  const finish = () => {
    const next = stickers + 1;
    setStickers(next);
    try {
      localStorage.setItem(storageKey, String(next));
    } catch {
      // storage unavailable — sticker is session-only
    }
    activeMs.current = 0;
    setPhase('working');
  };

  if (phase === 'working') return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center text-center p-6"
      style={{ background: 'linear-gradient(135deg, #7dd3fc, #a5b4fc, #f9a8d4)' }}
      role="dialog"
      aria-modal="true"
      aria-label={t('eyeBreak.title')}
    >
      <div className="text-7xl mb-4 animate-bounce" aria-hidden="true">{mascot}</div>
      <h2 className="text-4xl font-extrabold text-white drop-shadow mb-3">
        {t('eyeBreak.title')}
      </h2>
      <p className="text-xl font-semibold text-white/90 max-w-md mb-8">
        {t('eyeBreak.instruction')}
      </p>
      {phase === 'resting' ? (
        <div className="text-8xl font-black text-white drop-shadow-lg tabular-nums" role="timer">
          {countdown}
        </div>
      ) : (
        <button
          onClick={finish}
          className="bg-white text-2xl font-extrabold px-10 py-5 rounded-3xl shadow-xl hover:scale-105 active:scale-95 transition-transform"
          style={{ color: '#6366f1' }}
        >
          {t('eyeBreak.done')} 🎉
        </button>
      )}
      <p className="mt-8 text-lg font-bold text-white/90">
        ⭐ {t('eyeBreak.stickers')}: {stickers}
      </p>
    </div>
  );
}
