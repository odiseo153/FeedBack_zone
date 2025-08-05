import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Plus,
    MessageSquare,
    TrendingUp,
    Settings,
    Users,
    BookOpen,
    Zap,
    Target
} from 'lucide-react';
import { Link } from '@inertiajs/react';

interface QuickAction {
    title: string;
    description: string;
    href: string;
    icon: React.ElementType;
    gradient: string;
    textColor: string;
}

export function QuickActions() {
    const quickActions: QuickAction[] = [
        {
            title: 'Create Project',
            description: 'Share your latest work',
            href: '/projects/create',
            icon: Plus,
            gradient: 'from-blue-500 to-indigo-500',
            textColor: 'text-white'
        },
        {
            title: 'Explore Feed',
            description: 'Discover new projects',
            href: '/feed',
            icon: TrendingUp,
            gradient: 'from-purple-500 to-pink-500',
            textColor: 'text-white'
        },
        {
            title: 'Join Discussion',
            description: 'Engage with community',
            href: '/feed',
            icon: MessageSquare,
            gradient: 'from-green-500 to-emerald-500',
            textColor: 'text-white'
        },
        {
            title: 'User Directory',
            description: 'Connect with creators',
            href: '/users',
            icon: Users,
            gradient: 'from-orange-500 to-red-500',
            textColor: 'text-white'
        }
    ];

    const settingsActions = [
        {
            title: 'Profile Settings',
            description: 'Update your profile',
            href: '/profile',
            icon: Settings,
            style: 'border hover:bg-muted/50'
        },
        {
            title: 'Learning Hub',
            description: 'Improve your skills',
            href: '#',
            icon: BookOpen,
            style: 'border hover:bg-muted/50'
        }
    ];

    return (
        <div className="space-y-6">
            {/* Primary Actions */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <div className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 p-2">
                            <Zap className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-base sm:text-lg md:text-xl font-semibold">Quick Actions</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-3 md:grid-cols-2">
                        {quickActions.map((action) => (
                            <Link key={action.title} href={action.href}>
                                                        <Button
                            className={`w-full h-auto p-4 button-theme hover:scale-[1.02] transition-all duration-200 group border-0 shadow-md hover:shadow-lg`}
                            variant="default"
                        >
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="rounded-lg bg-white/20 p-2 group-hover:bg-white/30 transition-colors">
                                            <action.icon className={`h-4 w-4 ${action.textColor}`} />
                                        </div>
                                        <div className="text-left flex-1">
                                            <div className={`font-medium text-sm sm:text-base md:text-lg ${action.textColor}`}>
                                                <span className="block truncate">{action.title}</span>
                                            </div>
                                            <div className={`text-xs sm:text-sm md:text-base opacity-90 ${action.textColor}`}>
                                                <span className="block truncate">{action.description}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Button>
                            </Link>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Secondary Actions */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <div className="rounded-lg bg-slate-100 dark:bg-slate-800 p-2">
                            <Target className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                        </div>
                        <span className="text-base sm:text-lg md:text-xl font-semibold">Manage Account</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {settingsActions.map((action) => (
                            <Link key={action.title} href={action.href}>
                                <Button
                                    variant="ghost"
                                    className={`w-full justify-start h-auto p-3 ${action.style} group hover:scale-[1.01] transition-all duration-200`}
                                >
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="rounded-md bg-muted p-2 group-hover:bg-muted-foreground/10 transition-colors">
                                            <action.icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                                        </div>
                                        <div className="text-left flex-1">
                                            <div className="font-medium text-sm sm:text-base md:text-lg text-foreground">
                                                <span className="block truncate">{action.title}</span>
                                            </div>
                                            <div className="text-xs sm:text-sm md:text-base text-muted-foreground">
                                                <span className="block truncate">{action.description}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Button>
                            </Link>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
