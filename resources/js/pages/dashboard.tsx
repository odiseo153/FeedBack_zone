import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { StatsOverview } from '@/components/dashboard/stats-overview';
import { RecentComments } from '@/components/dashboard/recent-comments';
import { UserProjects } from '@/components/dashboard/user-projects';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { QuickActions } from '@/components/dashboard/quick-actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import {
    TrendingUp,
    Users,
    MessageSquare,
    Star,
    ArrowRight,
    Sparkles
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;

    // If user is not authenticated, show welcome message
    if (!auth.user) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Dashboard" />
                <div className="flex h-full flex-1 flex-col items-center justify-center p-8">
                    <div className="text-center space-y-6 max-w-md">
                        <div className="rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-4 w-20 h-20 mx-auto">
                            <Sparkles className="h-12 w-12 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-foreground mb-2">
                                Welcome to Feedback Zone
                            </h1>
                            <p className="text-muted-foreground text-lg">
                                Please log in to access your personalized dashboard
                            </p>
                        </div>
                        <div className="flex gap-4 justify-center">
                            <Link href="/login">
                                <Button className="button-theme">
                                    Sign In
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button variant="outline">
                                    Create Account
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6 overflow-x-auto min-h-screen dashboard-theme">

                {/* Stats Overview */}
                <StatsOverview user={auth.user} />

                {/* Main Content Grid */}
                <div className="grid gap-6 lg:grid-cols-3">

                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* User Projects */}
                        <UserProjects />

                        {/* Recent Comments */}
                        <RecentComments />

                        {/* Community Insights */}
                        <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-indigo-200 dark:border-indigo-800">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <div className="rounded-lg bg-indigo-100 dark:bg-indigo-900/50 p-2">
                                        <TrendingUp className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    Community Insights
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4 md:grid-cols-3">
                                    <div className="text-center p-4 rounded-lg bg-white/60 dark:bg-slate-800/60">
                                        <Users className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                                        <div className="text-2xl font-bold text-foreground">1,234</div>
                                        <div className="text-sm text-muted-foreground">Active Users</div>
                                    </div>
                                    <div className="text-center p-4 rounded-lg bg-white/60 dark:bg-slate-800/60">
                                        <MessageSquare className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                                        <div className="text-2xl font-bold text-foreground">5,678</div>
                                        <div className="text-sm text-muted-foreground">Comments Today</div>
                                    </div>
                                    <div className="text-center p-4 rounded-lg bg-white/60 dark:bg-slate-800/60">
                                        <Star className="h-8 w-8 text-yellow-600 dark:text-yellow-400 mx-auto mb-2" />
                                        <div className="text-2xl font-bold text-foreground">9,012</div>
                                        <div className="text-sm text-muted-foreground">Ratings Given</div>
                                    </div>
                                </div>
                                <div className="mt-4 text-center">
                                    <Link href="/feed">
                                        <Button variant="outline" className="group">
                                            Explore Community
                                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>

                    </div>

                    {/* Right Column - Sidebar Content */}
                    <div className="space-y-6">

                        {/* Quick Actions */}
                        <QuickActions />

                        {/* Recent Activity */}
                        <RecentActivity />

                    </div>
                </div>

                {/* Footer CTA */}
                <Card className="bg-theme-gradient text-white border-0">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold mb-1">
                                    Ready to share your next project?
                                </h3>
                                <p className="text-blue-100">
                                    Get valuable feedback from our amazing community
                                </p>
                            </div>
                            <Link href="/projects/create">
                                                                <Button
                                    className="bg-white hover:bg-gray-50 shadow-lg"
                                    style={{ color: 'var(--theme-primary)' }}
                                    size="lg"
                                >
                                    Create Project
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
