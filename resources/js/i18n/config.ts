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

export const SUPPORTED_LANGUAGES: Language[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    rtl: false,
    dateFormat: 'MM/dd/yyyy',
    numberFormat: {
      decimal: '.',
      thousands: ','
    },
    currency: {
      symbol: '$',
      position: 'before'
    }
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    rtl: false,
    dateFormat: 'dd/MM/yyyy',
    numberFormat: {
      decimal: ',',
      thousands: '.'
    },
    currency: {
      symbol: '€',
      position: 'after'
    }
  },
  {
    code: 'zh-CN',
    name: 'Chinese (Simplified)',
    nativeName: '简体中文',
    flag: '🇨🇳',
    rtl: false,
    dateFormat: 'yyyy/MM/dd',
    numberFormat: {
      decimal: '.',
      thousands: ','
    },
    currency: {
      symbol: '¥',
      position: 'before'
    }
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    rtl: false,
    dateFormat: 'dd/MM/yyyy',
    numberFormat: {
      decimal: ',',
      thousands: ' '
    },
    currency: {
      symbol: '€',
      position: 'after'
    }
  },
  {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    rtl: false,
    dateFormat: 'dd.MM.yyyy',
    numberFormat: {
      decimal: ',',
      thousands: '.'
    },
    currency: {
      symbol: '€',
      position: 'after'
    }
  },
  {
    code: 'pt-BR',
    name: 'Portuguese (Brazil)',
    nativeName: 'Português (Brasil)',
    flag: '🇧🇷',
    rtl: false,
    dateFormat: 'dd/MM/yyyy',
    numberFormat: {
      decimal: ',',
      thousands: '.'
    },
    currency: {
      symbol: 'R$',
      position: 'before'
    }
  }
];

export const DEFAULT_LANGUAGE = 'en';

export const getLanguageByCode = (code: string): Language | undefined => {
  return SUPPORTED_LANGUAGES.find(lang => lang.code === code);
};

export const isValidLanguageCode = (code: string): boolean => {
  return SUPPORTED_LANGUAGES.some(lang => lang.code === code);
};

export const getLanguageNames = (): Record<string, string> => {
  return SUPPORTED_LANGUAGES.reduce((acc, lang) => {
    acc[lang.code] = lang.name;
    return acc;
  }, {} as Record<string, string>);
};

export const getNativeLanguageNames = (): Record<string, string> => {
  return SUPPORTED_LANGUAGES.reduce((acc, lang) => {
    acc[lang.code] = lang.nativeName;
    return acc;
  }, {} as Record<string, string>);
};