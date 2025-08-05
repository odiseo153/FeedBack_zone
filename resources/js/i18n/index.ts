export * from './config';
export type { Language } from './config';

// Translation data type definitions
export interface TranslationData {
  [key: string]: string | TranslationData;
}

export interface TranslationFile {
  [namespace: string]: TranslationData;
}

export interface AllTranslations {
  [locale: string]: TranslationFile;
}

// Utility function to load translation files
export const loadTranslationFile = async (locale: string): Promise<TranslationFile> => {
  try {
    const module = await import(`./locales/${locale}.json`);
    return module.default || module;
  } catch (error) {
    console.error(`Failed to load translation file for locale: ${locale}`, error);
    throw new Error(`Translation file not found for locale: ${locale}`);
  }
};

// Utility function to get nested translation value
export const getNestedValue = (obj: TranslationData, path: string): string | undefined => {
  const keys = path.split('.');
  let current: any = obj;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return undefined;
    }
  }
  
  return typeof current === 'string' ? current : undefined;
};

// Utility function to interpolate parameters in translation strings
export const interpolateString = (template: string, params: Record<string, any> = {}): string => {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return params[key] !== undefined ? String(params[key]) : match;
  });
};