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
        document.documentElement.lang = lang;
      },
      toggleLanguage: () => set((state) => {
        const next = state.current === 'en' ? 'es' : 'en';
        document.documentElement.lang = next;
        return { current: next };
      }),
    }),
    {
      name: 'veritas-lang-preference',
    }
  )
);
// Initialize lang attribute on load
if (typeof document !== 'undefined') {
  const saved = localStorage.getItem('veritas-lang-preference');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      document.documentElement.lang = parsed.state.current || 'en';
    } catch (e) {
      document.documentElement.lang = 'en';
    }
  }
}