"use client";

import {
  type LanguageCode,
  type TranslationKey,
  getLanguageCode,
  translations,
} from "@/lib/translations";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type LanguageContextValue = {
  language: LanguageCode;
  setLanguage: (language: LanguageCode | string) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>("en");

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem("portfolio-language");
    if (storedLanguage && storedLanguage in translations) {
      setLanguageState(storedLanguage as LanguageCode);
      document.documentElement.lang = storedLanguage;
    }
  }, []);

  const setLanguage = (nextLanguage: LanguageCode | string) => {
    const code =
      nextLanguage in translations ? (nextLanguage as LanguageCode) : getLanguageCode(nextLanguage);
    setLanguageState(code);
    window.localStorage.setItem("portfolio-language", code);
    document.documentElement.lang = code;
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: (key: TranslationKey) => translations[language][key] ?? translations.en[key],
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}

export function T({ id }: { id: TranslationKey }) {
  const { t } = useLanguage();

  return <>{t(id)}</>;
}
