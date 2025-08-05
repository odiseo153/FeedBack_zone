import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    TrendingUp,
    FolderOpen,
    MessageSquare,
    Star,
    Eye,
    Heart,
    Award,
    Target,
    Zap
} from 'lucide-react';
import { type User } from '@/types';

interface StatsOverviewProps {
    user: User;
    stats?: {
        projects: number;
        comments: number;
        likes_received: number;
        views: number;
        ratings_given: number;
        streak_days: number;
    };
}

export function StatsOverview({ user, stats }: StatsOverviewProps) {
    const defaultStats = {
        projects: 12,
        comments: 48,
        likes_received: 156,
        views: 2341,
        ratings_given: 23,
        streak_days: 7,
        ...stats
    };

    const statCards = [
        {
            title: 'Projects',
            value: defaultStats.projects,
            change: '+2 this month',
            icon: FolderOpen,
            color: 'text-white',
            bgColor: '',
            changeColor: ''
        },
        {
            title: 'Comments',
            value: defaultStats.comments,
            change: '+12 this week',
            icon: MessageSquare,
            color: 'text-purple-600 dark:text-purple-400',
            bgColor: 'bg-purple-100 dark:bg-purple-900/30',
            changeColor: 'text-green-600 dark:text-green-400'
        },
        {
            title: 'Likes Received',
            value: defaultStats.likes_received,
            change: '+24 this week',
            icon: Heart,
            color: 'text-red-600 dark:text-red-400',
            bgColor: 'bg-red-100 dark:bg-red-900/30',
            changeColor: 'text-green-600 dark:text-green-400'
        },
        {
            title: 'Total Views',
            value: defaultStats.views.toLocaleString(),
            change: '+234 this week',
            icon: Eye,
            color: 'text-green-600 dark:text-green-400',
            bgColor: 'bg-green-100 dark:bg-green-900/30',
            changeColor: 'text-green-600 dark:text-green-400'
        }
    ];

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 p-6 text-white">
                <div className="relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                                    <TrendingUp className="h-6 w-6" />
                                </div>
                                <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-green-400 animate-pulse" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">
                                    Welcome back, {user.name}! 👋
                                </h1>
                                <p className="text-blue-100">
                                    Here's what's happening with your projects
                                </p>
                            </div>
                        </div>
                        <div className="ml-auto flex items-center gap-2">
                            <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                                <Award className="h-3 w-3 mr-1" />
                                Reputation: {user.reputation_score || 0}
                            </Badge>
                            {user.is_verified && (
                                <Badge className="bg-yellow-400/20 text-yellow-100 border-yellow-300/30">
                                    <Star className="h-3 w-3 mr-1" />
                                    Verified
                                </Badge>
                            )}
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                        <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
                            <div className="flex items-center justify-center gap-2">
                                <Target className="h-4 w-4" />
                                <span className="text-sm font-medium">Active Streak</span>
                            </div>
                            <div className="text-2xl font-bold mt-1">{defaultStats.streak_days} days</div>
                        </div>
                        <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
                            <div className="flex items-center justify-center gap-2">
                                <Zap className="h-4 w-4" />
                                <span className="text-sm font-medium">This Month</span>
                            </div>
                            <div className="text-2xl font-bold mt-1">+{defaultStats.ratings_given}</div>
                        </div>
                        <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
                            <div className="flex items-center justify-center gap-2">
                                <TrendingUp className="h-4 w-4" />
                                <span className="text-sm font-medium">Growth</span>
                            </div>
                            <div className="text-2xl font-bold mt-1">+15%</div>
                        </div>
                    </div>
                </div>

                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-transparent" />
                <div className="absolute top-0 right-0 -translate-y-4 translate-x-4 h-32 w-32 rounded-full bg-white/10" />
                <div className="absolute bottom-0 left-0 translate-y-4 -translate-x-4 h-24 w-24 rounded-full bg-white/5" />
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {statCards.map((stat) => (
                    <Card key={stat.title} className="relative overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-200 group">
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {stat.title}
                                </CardTitle>
                                <div className={`rounded-lg p-2 text-white group-hover:scale-110 transition-transform duration-200`}>
                                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="space-y-1">
                                <div className="text-2xl font-bold text-foreground">
                                    {stat.value}
                                </div>
                                <p className={`text-xs ${stat.changeColor} font-medium`}>
                                    {stat.change}
                                </p>
                            </div>
                        </CardContent>

                        {/* Hover Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    </Card>
                ))}
            </div>
        </div>
    );
}
