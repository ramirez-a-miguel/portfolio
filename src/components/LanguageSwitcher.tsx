"use client";

import { getLanguageCode } from "@/lib/translations";
import type { LanguageName } from "@/lib/translations";
import { useLanguage } from "./LanguageProvider";
import styles from "./LanguageSwitcher.module.scss";

const languageFlags: Record<LanguageName, string> = {
  English: "🇬🇧",
  Spanish: "🇪🇸",
  German: "🇩🇪",
  Portuguese: "🇵🇹",
  Italian: "🇮🇹",
  Dutch: "🇳🇱",
};

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
            data-size={size}
            data-active={language === code}
            aria-pressed={language === code}
            aria-label={`${t("selectLanguage")} ${languageName}`}
            title={`${t("selectLanguage")} ${languageName}`}
            onClick={() => setLanguage(code)}
          >
            <span className={styles.flag} aria-hidden="true">
              {languageFlags[languageName as LanguageName] ?? languageName.slice(0, 2)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
