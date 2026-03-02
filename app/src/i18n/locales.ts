export type Locale = "en" | "pt-BR" | "es";

export const DEFAULT_LOCALE: Locale = "en";

export const SUPPORTED_LOCALES: { code: Locale; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "pt-BR", label: "PT-BR" },
  { code: "es", label: "ES" }
];

