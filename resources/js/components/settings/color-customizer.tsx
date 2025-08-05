import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
    Palette,
    Plus,
    Edit,
    Trash2,
    Check,
    X,
    Eye,
    Sparkles,
    Download,
    Upload
} from 'lucide-react';
import { useTheme, type CustomTheme, type ColorScheme } from '@/contexts/theme-context';
import { cn } from '@/lib/utils';

export function ColorCustomizer() {
    const {
        currentTheme,
        availableThemes,
        setTheme,
        createCustomTheme,
        updateCustomTheme,
        deleteCustomTheme,
        applyThemeColors
    } = useTheme();

    const [isCreating, setIsCreating] = useState(false);
    const [editingTheme, setEditingTheme] = useState<string | null>(null);
    const [previewColors, setPreviewColors] = useState<ColorScheme | null>(null);
    const [newTheme, setNewTheme] = useState<Partial<CustomTheme>>({
        name: '',
        colors: {
            name: '',
            primary: '#3B82F6',
            secondary: '#6366F1',
            accent: '#8B5CF6',
            background: '#FFFFFF',
            surface: '#F8FAFC',
            text: '#1E293B',
            muted: '#64748B',
            success: '#10B981',
            warning: '#F59E0B',
            error: '#EF4444',
        },
    });

    const handleCreateTheme = () => {
        if (newTheme.name && newTheme.colors) {
            const themeId = createCustomTheme({
                name: newTheme.name,
                colors: { ...newTheme.colors, name: newTheme.name },
                gradients: generateGradients(newTheme.colors),
            });
            setTheme(themeId);
            setIsCreating(false);
            setNewTheme({
                name: '',
                colors: {
                    name: '',
                    primary: '#3B82F6',
                    secondary: '#6366F1',
                    accent: '#8B5CF6',
                    background: '#FFFFFF',
                    surface: '#F8FAFC',
                    text: '#1E293B',
                    muted: '#64748B',
                    success: '#10B981',
                    warning: '#F59E0B',
                    error: '#EF4444',
                },
            });
        }
    };

    const handleUpdateTheme = (themeId: string, updates: Partial<CustomTheme>) => {
        updateCustomTheme(themeId, updates);
        setEditingTheme(null);
    };

    const generateGradients = (colors: ColorScheme) => {
        return {
            primary: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            secondary: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.accent} 100%)`,
            accent: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.primary} 100%)`,
        };
    };

    const previewTheme = (colors: ColorScheme) => {
        setPreviewColors(colors);
        applyThemeColors(colors);
    };

    const stopPreview = () => {
        setPreviewColors(null);
        applyThemeColors(currentTheme.colors);
    };

    const exportTheme = (theme: CustomTheme) => {
        const dataStr = JSON.stringify(theme, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

        const exportFileDefaultName = `${theme.name.toLowerCase().replace(/\s+/g, '-')}-theme.json`;

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };


    const importTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const theme = JSON.parse(e.target?.result as string);
                    const themeId = createCustomTheme({
                        name: `${theme.name} (Imported)`,
                        colors: theme.colors,
                        gradients: theme.gradients || generateGradients(theme.colors),
                    });
                    setTheme(themeId);
                } catch (error) {
                    console.error('Error importing theme:', error);
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-foreground">Color Themes</h2>
                    <p className="text-muted-foreground">Customize the appearance of your application</p>
                </div>
                <div className="flex items-center gap-2">
                    <input
                        type="file"
                        accept=".json"
                        onChange={importTheme}
                        className="hidden"
                        id="import-theme"
                        title="Import theme file"
                        aria-label="Import theme file"
                    />
                    <Label htmlFor="import-theme">
                        <Button variant="outline" size="sm" className="cursor-pointer">
                            <Upload className="h-4 w-4 mr-2" />
                            Import
                        </Button>
                    </Label>
                                                                <Button
                            onClick={() => setIsCreating(true)}
                            className="button-theme"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Create Theme
                        </Button>
                        <Button
                            variant="outline"
                            className="border-orange-500 text-orange-600 hover:bg-orange-50"
                        >
                            <X className="h-4 w-4 mr-2" />
                            Reset to Default
                        </Button>
                </div>
            </div>

            {/* Preview Notice */}
            {previewColors && (
                <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/20">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Eye className="h-4 w-4 text-orange-600" />
                                <span className="text-sm font-medium text-orange-800 dark:text-orange-200">
                                    Preview Mode Active
                                </span>
                            </div>
                            <Button onClick={stopPreview} variant="outline" size="sm">
                                <X className="h-4 w-4 mr-1" />
                                Stop Preview
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Theme Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {availableThemes.map((theme) => (
                    <Card
                        key={theme.id}
                        className={cn(
                            "relative overflow-hidden transition-all duration-200 hover:shadow-lg",
                            currentTheme.id === theme.id && "ring-2 ring-blue-500 dark:ring-blue-400"
                        )}
                    >
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                    <Palette className="h-4 w-4" />
                                    {theme.name}
                                    {currentTheme.id === theme.id && (
                                        <Badge variant="secondary" className="text-xs">
                                            <Check className="h-3 w-3 mr-1" />
                                            Active
                                        </Badge>
                                    )}
                                </CardTitle>
                                <div className="flex items-center gap-1">
                                    {theme.id.startsWith('custom-') && (
                                        <>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => exportTheme(theme)}
                                                className="h-7 w-7 p-0"
                                            >
                                                <Download className="h-3 w-3" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setEditingTheme(theme.id)}
                                                className="h-7 w-7 p-0"
                                            >
                                                <Edit className="h-3 w-3" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => deleteCustomTheme(theme.id)}
                                                className="h-7 w-7 p-0 text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 className="h-3 w-3" />
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {/* Color Palette Preview */}
                            <div className="grid grid-cols-5 gap-2 h-8">
                                <div
                                    className="rounded-md border border-border/50"
                                    style={{ backgroundColor: theme.colors.primary }}
                                    title="Primary"
                                />
                                <div
                                    className="rounded-md border border-border/50"
                                    style={{ backgroundColor: theme.colors.secondary }}
                                    title="Secondary"
                                />
                                <div
                                    className="rounded-md border border-border/50"
                                    style={{ backgroundColor: theme.colors.accent }}
                                    title="Accent"
                                />
                                <div
                                    className="rounded-md border border-border/50"
                                    style={{ backgroundColor: theme.colors.success }}
                                    title="Success"
                                />
                                <div
                                    className="rounded-md border border-border/50"
                                    style={{ backgroundColor: theme.colors.warning }}
                                    title="Warning"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                                <Button
                                    onClick={() => setTheme(theme.id)}
                                    variant={currentTheme.id === theme.id ? "default" : "outline"}
                                    size="sm"
                                    className="flex-1"
                                >
                                    {currentTheme.id === theme.id ? (
                                        <>
                                            <Check className="h-3 w-3 mr-1" />
                                            Applied
                                        </>
                                    ) : (
                                        'Apply'
                                    )}
                                </Button>
                                <Button
                                    onClick={() => previewTheme(theme.colors)}
                                    variant="ghost"
                                    size="sm"
                                >
                                    <Eye className="h-3 w-3" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Create New Theme Modal/Form */}
            {isCreating && (
                <Card className="border-blue-200 bg-blue-50/30 dark:border-blue-800 dark:bg-blue-950/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-blue-600" />
                            Create Custom Theme
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="theme-name">Theme Name</Label>
                                <Input
                                    id="theme-name"
                                    value={newTheme.name}
                                    onChange={(e) => setNewTheme({ ...newTheme, name: e.target.value })}
                                    placeholder="My Custom Theme"
                                />
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
                            {[
                                { key: 'primary', label: 'Primary', description: 'Main brand color' },
                                { key: 'secondary', label: 'Secondary', description: 'Secondary accent' },
                                { key: 'accent', label: 'Accent', description: 'Highlight color' },
                                { key: 'success', label: 'Success', description: 'Success states' },
                                { key: 'warning', label: 'Warning', description: 'Warning states' },
                            ].map(({ key, label, description }) => (
                                <div key={key} className="space-y-2">
                                    <Label htmlFor={`color-${key}`} className="text-sm">
                                        {label}
                                    </Label>
                                    <div className="space-y-2">
                                        <div
                                            className="h-12 w-full rounded-md border border-border/50"
                                            style={{
                                                backgroundColor: newTheme.colors?.[key as keyof ColorScheme] || '#000000'
                                            }}
                                        />
                                        <Input
                                            id={`color-${key}`}
                                            type="color"
                                            value={newTheme.colors?.[key as keyof ColorScheme] || '#000000'}
                                            onChange={(e) => setNewTheme({
                                                ...newTheme,
                                                colors: {
                                                    ...newTheme.colors!,
                                                    [key]: e.target.value
                                                }
                                            })}
                                            className="h-8 w-full"
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">{description}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between pt-4">
                            <div className="flex gap-2">
                                <Button
                                    onClick={() => previewTheme(newTheme.colors!)}
                                    variant="outline"
                                    disabled={!newTheme.colors}
                                >
                                    <Eye className="h-4 w-4 mr-2" />
                                    Preview
                                </Button>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    onClick={() => {
                                        setIsCreating(false);
                                        stopPreview();
                                    }}
                                    variant="outline"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleCreateTheme}
                                    disabled={!newTheme.name || !newTheme.colors}
                                    className="button-theme"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Create Theme
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
