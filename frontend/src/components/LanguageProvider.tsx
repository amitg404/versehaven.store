"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, Language, TranslationKey } from "@/lib/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKey;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: translations.en,
});

const languageNames: Record<Language, string> = {
  en: "English",
  hi: "हिन्दी",
  kn: "ಕನ್ನಡ",
  ta: "தமிழ்",
  te: "తెలుగు",
};

export { languageNames };

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const stored = localStorage.getItem("versehaven_lang") as Language | null;
    if (stored && translations[stored]) {
      setLanguageState(stored);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("versehaven_lang", lang);
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage, 
        t: translations[language] as TranslationKey
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
