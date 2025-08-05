// Core language configuration interface
export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  rtl: boolean;
  dateFormat: string;
  numberFormat: {
    decimal: string;
    thousands: string;
  };
  currency: {
    symbol: string;
    position: 'before' | 'after';
  };
}

// Translation data structures
export interface TranslationData {
  [key: string]: string | TranslationData;
}

export interface TranslationFile {
  [namespace: string]: TranslationData;
}

export interface AllTranslations {
  [locale: string]: TranslationFile;
}

// Translation function parameters
export interface TranslationParams {
  [key: string]: string | number | boolean;
}

// Error types for translation system
export class TranslationError extends Error {
  constructor(
    public key: string,
    public locale: string,
    public context?: string
  ) {
    super(`Translation missing: ${key} for locale ${locale}`);
    this.name = 'TranslationError';
  }
}

export class TranslationLoadError extends Error {
  constructor(
    public locale: string,
    public originalError?: Error
  ) {
    super(`Failed to load translations for locale: ${locale}`);
    this.name = 'TranslationLoadError';
  }
}