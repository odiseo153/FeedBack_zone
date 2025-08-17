
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    TrendingUp,
} from 'lucide-react';
import { type ColorScheme } from '@/contexts/theme-context';

interface ThemePreviewProps {
    colors: ColorScheme;
    isActive?: boolean;
}

export function ThemePreview({ colors, isActive = false }: ThemePreviewProps) {
    return (
        <div
            className="relative overflow-hidden rounded-lg border-2 transition-all duration-200"
            style={{
                backgroundColor: colors.background,
                borderColor: isActive ? colors.primary : colors.surface,
                color: colors.text,
            }}
        >
            {/* Preview Header */}
            <div
                className="p-3 border-b"
                style={{
                    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                    color: 'white',
                }}
            >
                <div className="flex items-center gap-2 text-sm font-medium">
                    <div className="w-6 h-6 rounded bg-white/20 flex items-center justify-center">
                        <TrendingUp className="h-3 w-3" />
                    </div>
                    Theme Preview
                </div>
            </div>

            {/* Preview Content */}
            <div className="p-3 space-y-3" style={{ backgroundColor: colors.surface }}>
                {/* User Section */}
                <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                        <AvatarFallback
                            className="text-xs"
                            style={{
                                backgroundColor: colors.primary,
                                color: 'white'
                            }}
                        >
                            JD
                        </AvatarFallback>
                    </Avatar>
                    <div className="text-xs" style={{ color: colors.text }}>
                        John Doe
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2">
                    <div
                        className="text-center p-2 rounded text-xs"
                        style={{ backgroundColor: colors.primary + '20' }}
                    >
                        <div style={{ color: colors.primary }} className="font-bold">42</div>
                        <div style={{ color: colors.muted }} className="text-[10px]">Projects</div>
                    </div>
                    <div
                        className="text-center p-2 rounded text-xs"
                        style={{ backgroundColor: colors.success + '20' }}
                    >
                        <div style={{ color: colors.success }} className="font-bold">156</div>
                        <div style={{ color: colors.muted }} className="text-[10px]">Likes</div>
                    </div>
                    <div
                        className="text-center p-2 rounded text-xs"
                        style={{ backgroundColor: colors.accent + '20' }}
                    >
                        <div style={{ color: colors.accent }} className="font-bold">89</div>
                        <div style={{ color: colors.muted }} className="text-[10px]">Comments</div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-1">
                    <button
                        className="flex-1 py-1 px-2 rounded text-xs font-medium transition-colors"
                        style={{
                            backgroundColor: colors.primary,
                            color: 'white'
                        }}
                    >
                        Primary
                    </button>
                    <button
                        className="flex-1 py-1 px-2 rounded text-xs font-medium border transition-colors"
                        style={{
                            borderColor: colors.primary,
                            color: colors.primary,
                            backgroundColor: 'transparent'
                        }}
                    >
                        Secondary
                    </button>
                </div>

                {/* Status Badge */}
                <div className="flex justify-center">
                    <span
                        className="px-2 py-0.5 rounded text-[10px] font-medium"
                        style={{
                            backgroundColor: colors.success + '30',
                            color: colors.success
                        }}
                    >
                        Active Theme
                    </span>
                </div>
            </div>

            {/* Active Indicator */}
            {isActive && (
                <div
                    className="absolute top-2 right-2 w-3 h-3 rounded-full"
                    style={{ backgroundColor: colors.success }}
                />
            )}
        </div>
    );
}
