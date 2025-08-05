import React, { createContext, useContext, useEffect, useState } from 'react';

export interface ColorScheme {
    name: string;
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    muted: string;
    success: string;
    warning: string;
    error: string;
}

export interface CustomTheme {
    id: string;
    name: string;
    colors: ColorScheme;
    gradients: {
        primary: string;
        secondary: string;
        accent: string;
    };
}

interface ThemeContextType {
    currentTheme: CustomTheme;
    availableThemes: CustomTheme[];
    setTheme: (themeId: string) => void;
    createCustomTheme: (theme: Omit<CustomTheme, 'id'>) => void;
    updateCustomTheme: (themeId: string, theme: Partial<CustomTheme>) => void;
    deleteCustomTheme: (themeId: string) => void;
    applyThemeColors: (colors: ColorScheme) => void;
}

const defaultThemes: CustomTheme[] = [
    {
        id: 'default',
        name: 'Default Blue',
        colors: {
            name: 'Default Blue',
            primary: '#3B82F6',
            secondary: '#6366F1',
            accent: '#8B5CF6',
            background: '#FFFFFF',
            surface: '#F8FAFC',
            text: '#0F172A',
            muted: '#64748B',
            success: '#10B981',
            warning: '#F59E0B',
            error: '#EF4444',
        },
        gradients: {
            primary: 'from-blue-500 to-indigo-500',
            secondary: 'from-indigo-500 to-purple-500',
            accent: 'from-purple-500 to-pink-500',
        },
    },
    {
        id: 'sunset',
        name: 'Sunset Orange',
        colors: {
            name: 'Sunset Orange',
            primary: '#F97316',
            secondary: '#EF4444',
            accent: '#EC4899',
            background: '#FFFFFF',
            surface: '#FEF7F0',
            text: '#0F172A',
            muted: '#64748B',
            success: '#10B981',
            warning: '#F59E0B',
            error: '#EF4444',
        },
        gradients: {
            primary: 'from-orange-500 to-red-500',
            secondary: 'from-red-500 to-pink-500',
            accent: 'from-pink-500 to-rose-500',
        },
    },
    {
        id: 'forest',
        name: 'Forest Green',
        colors: {
            name: 'Forest Green',
            primary: '#10B981',
            secondary: '#059669',
            accent: '#6366F1',
            background: '#FFFFFF',
            surface: '#F0FDF9',
            text: '#0F172A',
            muted: '#64748B',
            success: '#10B981',
            warning: '#F59E0B',
            error: '#EF4444',
        },
        gradients: {
            primary: 'from-emerald-500 to-green-500',
            secondary: 'from-green-500 to-teal-500',
            accent: 'from-teal-500 to-cyan-500',
        },
    },
    {
        id: 'royal',
        name: 'Royal Purple',
        colors: {
            name: 'Royal Purple',
            primary: '#8B5CF6',
            secondary: '#A855F7',
            accent: '#EC4899',
            background: '#FFFFFF',
            surface: '#FAF5FF',
            text: '#0F172A',
            muted: '#64748B',
            success: '#10B981',
            warning: '#F59E0B',
            error: '#EF4444',
        },
        gradients: {
            primary: 'from-violet-500 to-purple-500',
            secondary: 'from-purple-500 to-fuchsia-500',
            accent: 'from-fuchsia-500 to-pink-500',
        },
    },
    {
        id: 'ocean',
        name: 'Ocean Blue',
        colors: {
            name: 'Ocean Blue',
            primary: '#0EA5E9',
            secondary: '#06B6D4',
            accent: '#10B981',
            background: '#FFFFFF',
            surface: '#F0F9FF',
            text: '#0F172A',
            muted: '#64748B',
            success: '#10B981',
            warning: '#F59E0B',
            error: '#EF4444',
        },
        gradients: {
            primary: 'from-sky-500 to-cyan-500',
            secondary: 'from-cyan-500 to-teal-500',
            accent: 'from-teal-500 to-emerald-500',
        },
    },
];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [currentTheme, setCurrentTheme] = useState<CustomTheme>(defaultThemes[0]);
    const [customThemes, setCustomThemes] = useState<CustomTheme[]>([]);

    // Load saved theme and custom themes from localStorage
    useEffect(() => {
        const savedThemeId = localStorage.getItem('feedback-zone-theme');
        const savedCustomThemes = localStorage.getItem('feedback-zone-custom-themes');

        let parsedCustomThemes: CustomTheme[] = [];
        if (savedCustomThemes) {
            try {
                parsedCustomThemes = JSON.parse(savedCustomThemes);
                setCustomThemes(parsedCustomThemes);
            } catch (error) {
                console.error('Error parsing saved custom themes:', error);
            }
        }

        if (savedThemeId) {
            const allThemes = [...defaultThemes, ...parsedCustomThemes];
            const savedTheme = allThemes.find(theme => theme.id === savedThemeId);
            if (savedTheme) {
                setCurrentTheme(savedTheme);
                applyThemeColors(savedTheme.colors);
            }
        } else {
            // Apply default theme colors on first load
            applyThemeColors(defaultThemes[0].colors);
        }

        // Force apply theme colors after initial load to fix text visibility
        setTimeout(() => {
            if (savedThemeId) {
                const allThemes = [...defaultThemes, ...parsedCustomThemes];
                const savedTheme = allThemes.find(theme => theme.id === savedThemeId);
                if (savedTheme) {
                    applyThemeColors(savedTheme.colors);
                }
            } else {
                applyThemeColors(defaultThemes[0].colors);
            }
        }, 100);
    }, []);

    // Listen for dark mode changes and reapply theme
    useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    // Dark mode class changed, reapply current theme colors
                    applyThemeColors(currentTheme.colors);
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        return () => observer.disconnect();
    }, [currentTheme]);

    // Apply theme colors to CSS custom properties
    const applyThemeColors = (colors: ColorScheme) => {
        const root = document.documentElement;

        // Convert hex to HSL for better CSS variable support
        const hexToHsl = (hex: string) => {
            const r = parseInt(hex.slice(1, 3), 16) / 255;
            const g = parseInt(hex.slice(3, 5), 16) / 255;
            const b = parseInt(hex.slice(5, 7), 16) / 255;

            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            let h = 0, s = 0;
            const l = (max + min) / 2;

            if (max !== min) {
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
            }

            return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
        };

        // Apply theme colors (primary, secondary, accent, etc.)
        // DO NOT override foreground/background - let CSS handle light/dark mode
        root.style.setProperty('--primary', hexToHsl(colors.primary));
        root.style.setProperty('--secondary', hexToHsl(colors.secondary));
        root.style.setProperty('--accent', hexToHsl(colors.accent));
        root.style.setProperty('--success', hexToHsl(colors.success));
        root.style.setProperty('--warning', hexToHsl(colors.warning));
        root.style.setProperty('--destructive', hexToHsl(colors.error));

        // Set card and UI element colors that aren't affected by dark mode
        root.style.setProperty('--card-foreground', hexToHsl(colors.text));
        root.style.setProperty('--muted', hexToHsl(colors.surface));
        root.style.setProperty('--border', hexToHsl(colors.muted));
        root.style.setProperty('--input', hexToHsl(colors.surface));
        root.style.setProperty('--ring', hexToHsl(colors.primary));

        // IMPORTANT: Never override --foreground, --background, --muted-foreground
        // These are handled by CSS based on .dark class for proper light/dark mode

        // Set theme colors for our custom CSS classes
        root.style.setProperty('--theme-primary', colors.primary);
        root.style.setProperty('--theme-secondary', colors.secondary);
        root.style.setProperty('--theme-accent', colors.accent);
        root.style.setProperty('--theme-success', colors.success);
        root.style.setProperty('--theme-warning', colors.warning);
        root.style.setProperty('--theme-error', colors.error);

        // Removed problematic DOM manipulation - CSS variables handle theming
    };

    const setTheme = (themeId: string) => {
        const allThemes = [...defaultThemes, ...customThemes];
        const theme = allThemes.find(t => t.id === themeId);
        if (theme) {
            setCurrentTheme(theme);
            applyThemeColors(theme.colors);
            localStorage.setItem('feedback-zone-theme', themeId);
        }
    };

    const createCustomTheme = (theme: Omit<CustomTheme, 'id'>): string => {
        const newTheme = {
            ...theme,
            id: `custom-${Date.now()}`,
        };
        const updatedCustomThemes = [...customThemes, newTheme];
        setCustomThemes(updatedCustomThemes);
        localStorage.setItem('feedback-zone-custom-themes', JSON.stringify(updatedCustomThemes));
        return newTheme.id;
    };

    const updateCustomTheme = (themeId: string, updates: Partial<CustomTheme>) => {
        const updatedCustomThemes = customThemes.map(theme =>
            theme.id === themeId ? { ...theme, ...updates } : theme
        );
        setCustomThemes(updatedCustomThemes);
        localStorage.setItem('feedback-zone-custom-themes', JSON.stringify(updatedCustomThemes));

        // If updating current theme, apply changes
        if (currentTheme.id === themeId) {
            const updatedTheme = { ...currentTheme, ...updates };
            setCurrentTheme(updatedTheme);
            if (updates.colors) {
                applyThemeColors(updatedTheme.colors);
            }
        }
    };

    const deleteCustomTheme = (themeId: string) => {
        const updatedCustomThemes = customThemes.filter(theme => theme.id !== themeId);
        setCustomThemes(updatedCustomThemes);
        localStorage.setItem('feedback-zone-custom-themes', JSON.stringify(updatedCustomThemes));

        // If deleting current theme, switch to default
        if (currentTheme.id === themeId) {
            setTheme(defaultThemes[0].id);
        }
    };

    const availableThemes = [...defaultThemes, ...customThemes];

    return (
        <ThemeContext.Provider
            value={{
                currentTheme,
                availableThemes,
                setTheme,
                createCustomTheme,
                updateCustomTheme,
                deleteCustomTheme,
                applyThemeColors,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}
