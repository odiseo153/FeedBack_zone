import { TrendingUp, Award, Zap, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { type User } from '@/types';

interface UserStatsProps {
    user: User;
    className?: string;
}

export function UserStats({ user, className }: UserStatsProps) {
    const stats = [
        {
            label: 'Reputation',
            value: user.reputation_score || 0,
            icon: TrendingUp,
            color: 'text-green-600 dark:text-green-400',
            bgColor: 'bg-green-100 dark:bg-green-900/30',
        },
        {
            label: 'Projects',
            value: user.projects?.length, // This would come from user data
            icon: Target,
            color: 'text-blue-600 dark:text-blue-400',
            bgColor: 'bg-blue-100 dark:bg-blue-900/30',
        }
    ];

    return (
        <div className={`space-y-2 ${className || ''}`}>
            <div className="grid grid-cols-2 gap-2">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className={`relative overflow-hidden rounded-lg ${stat.bgColor} p-2 text-center transition-all duration-200 hover:scale-105`}
                    >
                        <div className={`flex items-center justify-center mb-1 ${stat.color}`}>
                            <stat.icon className="h-3 w-3" />
                        </div>
                        <div className={`text-xs font-bold ${stat.color}`}>
                            {stat.value}
                        </div>
                        <div className="text-[10px] text-muted-foreground font-medium">
                            {stat.label}
                        </div>

                        {/* Animated background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000" />
                    </div>
                ))}
            </div>

            {/* Achievements */}
            {user.is_verified && (
                <div className="flex items-center justify-center">
                    <Badge
                        variant="secondary"
                        className="h-5 px-2 bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 dark:from-yellow-900/30 dark:to-amber-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800"
                    >
                        <Award className="h-2.5 w-2.5 mr-1" />
                        Verified Creator
                    </Badge>
                </div>
            )}
        </div>
    );
}
