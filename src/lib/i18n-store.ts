import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export type Language = 'en' | 'es';
interface LanguageState {
  current: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}
export const useLanguage = create<LanguageState>()(
  persist(
    (set) => ({
      current: 'en',
      setLanguage: (lang) => {
        set({ current: lang });
        if (typeof document !== 'undefined') {
          document.documentElement.lang = lang;
        }
      },
      toggleLanguage: () => set((state) => {
        const next = state.current === 'en' ? 'es' : 'en';
        if (typeof document !== 'undefined') {
          document.documentElement.lang = next;
        }
        return { current: next };
      }),
    }),
    {
      name: 'veritas-lang-preference',
      onRehydrateStorage: () => (state) => {
        if (state && typeof document !== 'undefined') {
          document.documentElement.lang = state.current;
        }
      },
    }
  )
);
// Final safety check for initial page load before hydration
if (typeof document !== 'undefined') {
  const saved = localStorage.getItem('veritas-lang-preference');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed?.state?.current) {
        document.documentElement.lang = parsed.state.current;
      }
    } catch (e) {
      console.warn('Failed to parse i18n preference:', e);
    }
  }
}