"use client";

import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { DEFAULT_LOCALE, type Locale } from "./locales";
import type { MessageKey } from "./messages/en";
import { messages as enMessages } from "./messages/en";
import { messages as ptMessages } from "./messages/pt-BR";
import { messages as esMessages } from "./messages/es";

type Messages = Record<MessageKey, string>;

type I18nContextValue = {
  locale: Locale;
  t: (key: keyof Messages) => string;
  setLocale: (locale: Locale) => void;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const STORAGE_KEY = "sta_locale";

const getMessagesForLocale = (locale: Locale): Messages => {
  switch (locale) {
    case "pt-BR":
      return ptMessages;
    case "es":
      return esMessages;
    case "en":
    default:
      return enMessages;
  }
};

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored) {
      setLocaleState(stored);
    }
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
  }, []);

  const messages = useMemo(() => getMessagesForLocale(locale), [locale]);

  const t = useCallback(
    (key: keyof Messages) => {
      return messages[key] ?? key;
    },
    [messages]
  );

  const value = useMemo(
    () => ({
      locale,
      t,
      setLocale
    }),
    [locale, t, setLocale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return ctx;
}

