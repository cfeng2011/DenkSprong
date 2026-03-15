import { createContext, useContext, useEffect, useReducer } from 'react';
import { checkHealth } from './services/llm';

const TIERS = [
  { id: 'explorer', minAge: 4, maxAge: 6, emoji: '🔭' },
  { id: 'thinker', minAge: 7, maxAge: 9, emoji: '💡' },
  { id: 'investigator', minAge: 10, maxAge: 12, emoji: '🔍' },
  { id: 'analyst', minAge: 13, maxAge: 15, emoji: '📊' },
  { id: 'philosopher', minAge: 16, maxAge: 18, emoji: '🧠' },
];

const TIER_ORDER = TIERS.map((t) => t.id);

const STORAGE_KEY = 'thinklab-state';

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // ignore corrupt storage
  }
  return null;
}

const initialState = {
  tier: null,
  points: 0,
  completedChallenges: [],
  llmAvailable: null, // null = checking, true = online, false = offline
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_TIER':
      return { ...state, tier: action.payload };
    case 'ADD_POINTS':
      return { ...state, points: state.points + action.payload };
    case 'COMPLETE_CHALLENGE': {
      const key = `${action.payload.module}:${action.payload.challenge || action.payload.scene || action.payload.fact}`;
      const alreadyDone = state.completedChallenges.some(
        (c) => `${c.module}:${c.challenge || c.scene || c.fact}` === key
      );
      if (alreadyDone) return state;
      return {
        ...state,
        completedChallenges: [...state.completedChallenges, action.payload],
      };
    }
    case 'SET_LLM_AVAILABLE':
      return { ...state, llmAvailable: action.payload };
    case 'RESET':
      return { ...initialState, llmAvailable: state.llmAvailable };
    default:
      return state;
  }
}

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const saved = loadState();
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    ...(saved && { tier: saved.tier, points: saved.points, completedChallenges: saved.completedChallenges }),
  });

  // Persist state (exclude llmAvailable — it's runtime-only)
  useEffect(() => {
    try {
      const { llmAvailable, ...persistable } = state;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(persistable));
    } catch {
      // storage full or unavailable
    }
  }, [state]);

  // LLM health check on mount + every 30 seconds
  useEffect(() => {
    const check = async () => {
      const available = await checkHealth();
      dispatch({ type: 'SET_LLM_AVAILABLE', payload: available });
    };
    check();
    const interval = setInterval(check, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch, TIERS }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

export { TIERS, TIER_ORDER };
