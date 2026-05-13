"use client";

import { getLanguageCode } from "@/lib/translations";
import { useLanguage } from "./LanguageProvider";
import styles from "./LanguageSwitcher.module.scss";

export function LanguageSwitcher({
  languages,
  size = "s",
}: { languages: string[]; size?: "s" | "l" }) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className={styles.languageList}>
      {languages.map((languageName) => {
        const code = getLanguageCode(languageName);

        return (
          <button
            key={languageName}
            type="button"
            className={styles.languageButton}
            data-active={language === code}
            aria-pressed={language === code}
            aria-label={`${t("selectLanguage")} ${languageName}`}
            title={`${t("selectLanguage")} ${languageName}`}
            style={size === "l" ? { minHeight: "2rem", paddingInline: "0.85rem" } : undefined}
            onClick={() => setLanguage(code)}
          >
            {languageName}
          </button>
        );
      })}
    </div>
  );
}
