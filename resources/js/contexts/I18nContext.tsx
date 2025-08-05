import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { 
  Language, 
  TranslationFile, 
  TranslationParams, 
  TranslationError, 
  TranslationLoadError 
} from '@/i18n/types';
import { 
  SUPPORTED_LANGUAGES, 
  DEFAULT_LANGUAGE, 
  getLanguageByCode, 
  isValidLanguageCode 
} from '@/i18n/config';
import { 
  loadTranslationFile, 
  getNestedValue, 
  interpolateString 
} from '@/i18n';

interface I18nContextType {
  currentLanguage: string;
  availableLanguages: Language[];
  t: (key: string, params?: TranslationParams) => string;
  changeLanguage: (language: string) => Promise<void>;
  formatDate: (date: Date, options?: Intl.DateTimeFormatOptions) => string;
  formatNumber: (number: number, options?: Intl.NumberFormatOptions) => string;
  formatCurrency: (amount: number, currency: string) => string;
  isLoading: boolean;
  error: string | null;
}

interface I18nProviderProps {
  children: ReactNode;
  initialLanguage?: string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Storage keys for persistence
const LANGUAGE_STORAGE_KEY = 'preferred_language';

export function I18nProvider({ children, initialLanguage }: I18nProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState<string>(() => {
    // Priority: initialLanguage > localStorage > default
    if (initialLanguage && isValidLanguageCode(initialLanguage)) {
      return initialLanguage;
    }
    
    try {
      const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (stored && isValidLanguageCode(stored)) {
        return stored;
      }
    } catch (error) {
      console.warn('Failed to read language preference from localStorage:', error);
    }
    
    return DEFAULT_LANGUAGE;
  });

  const [translations, setTranslations] = useState<TranslationFile>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load translations for the current language
  const loadTranslations = useCallback(async (language: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const translationData = await loadTranslationFile(language);
      setTranslations(translationData);
    } catch (err) {
      const errorMessage = `Failed to load translations for ${language}`;
      console.error(errorMessage, err);
      
      setError(errorMessage);
      
      // If we failed to load the requested language and it's not the default,
      // try to load the default language as fallback
      if (language !== DEFAULT_LANGUAGE) {
        try {
          const fallbackData = await loadTranslationFile(DEFAULT_LANGUAGE);
          setTranslations(fallbackData);
          console.warn(`Loaded fallback translations (${DEFAULT_LANGUAGE}) due to error loading ${language}`);
        } catch (fallbackErr) {
          console.error('Failed to load fallback translations:', fallbackErr);
          throw new TranslationLoadError(language, err instanceof Error ? err : undefined);
        }
      } else {
        throw new TranslationLoadError(language, err instanceof Error ? err : undefined);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Translation function
  const t = useCallback((key: string, params?: TranslationParams): string => {
    try {
      const value = getNestedValue(translations, key);
      
      if (value === undefined) {
        // Log missing translation in development
        if (process.env.NODE_ENV === 'development') {
          console.warn(new TranslationError(key, currentLanguage));
        }
        
        // Return the key as fallback (useful for development)
        return key;
      }
      
      // Interpolate parameters if provided
      return params ? interpolateString(value, params) : value;
    } catch (err) {
      console.error('Translation error:', err);
      return key;
    }
  }, [translations, currentLanguage]);

  // Change language function
  const changeLanguage = useCallback(async (language: string) => {
    if (!isValidLanguageCode(language)) {
      throw new Error(`Invalid language code: ${language}`);
    }

    if (language === currentLanguage) {
      return; // No change needed
    }

    try {
      // Persist to localStorage
      localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch (err) {
      console.warn('Failed to persist language preference:', err);
    }

    setCurrentLanguage(language);
    await loadTranslations(language);
  }, [currentLanguage, loadTranslations]);

  // Formatting functions
  const formatDate = useCallback((date: Date, options?: Intl.DateTimeFormatOptions): string => {
    try {
      return new Intl.DateTimeFormat(currentLanguage, options).format(date);
    } catch (err) {
      console.error('Date formatting error:', err);
      // Fallback to default locale
      return new Intl.DateTimeFormat(DEFAULT_LANGUAGE, options).format(date);
    }
  }, [currentLanguage]);

  const formatNumber = useCallback((number: number, options?: Intl.NumberFormatOptions): string => {
    try {
      return new Intl.NumberFormat(currentLanguage, options).format(number);
    } catch (err) {
      console.error('Number formatting error:', err);
      // Fallback to default locale
      return new Intl.NumberFormat(DEFAULT_LANGUAGE, options).format(number);
    }
  }, [currentLanguage]);

  const formatCurrency = useCallback((amount: number, currency: string): string => {
    try {
      return new Intl.NumberFormat(currentLanguage, {
        style: 'currency',
        currency: currency,
      }).format(amount);
    } catch (err) {
      console.error('Currency formatting error:', err);
      // Fallback to default locale
      return new Intl.NumberFormat(DEFAULT_LANGUAGE, {
        style: 'currency',
        currency: currency,
      }).format(amount);
    }
  }, [currentLanguage]);

  // Load initial translations
  useEffect(() => {
    loadTranslations(currentLanguage);
  }, [currentLanguage, loadTranslations]);

  const contextValue: I18nContextType = {
    currentLanguage,
    availableLanguages: SUPPORTED_LANGUAGES,
    t,
    changeLanguage,
    formatDate,
    formatNumber,
    formatCurrency,
    isLoading,
    error,
  };

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider. Make sure your component is wrapped with <I18nProvider>.');
  }
  return context;
}

// Convenience hook for just the translation function
export function useTranslation() {
  const { t, currentLanguage, isLoading, error } = useI18n();
  return { t, currentLanguage, isLoading, error };
}