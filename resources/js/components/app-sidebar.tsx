import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarGroup, SidebarGroupLabel } from '@/components/ui/sidebar';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    Home,
    PlusCircle,
    MessageSquare,
    Star,
    Activity,
    Heart,
    Settings,
    LogIn,
    PaintRoller,
    User,
    Layers2
} from 'lucide-react';
import AppLogo from './app-logo';
import { UserStats } from '@/components/user-stats';



export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;

    const mainNavItems: NavItem[] = [
         {
            title: 'Dashboard',
            href: '/dashboard',
            icon: Layers2,
        },
        {
            title: 'Feed',
            href: '/feed',
            icon: Activity,
        }
    ];

    if (auth?.user) {
        mainNavItems.push({
            title: 'My Profile',
            href: '/users/' + auth?.user?.id,
            icon: User,
        });
    }

    const createNavItems: NavItem[] = [
        {
            title: 'New Project',
            href: '/projects/create',
            icon: PlusCircle,
        },
    ];

    const activityNavItems: NavItem[] = [
        {
            title: 'My Comments',
            href: '/my/comments',
            icon: MessageSquare,
        },
        {
            title: 'My Ratings',
            href: '/my/ratings',
            icon: Star,
        },
        {
            title: 'Liked Projects',
            href: '/my/liked',
            icon: Heart,
        },
        {
            title: 'Settings',
            href: '/settings',
            icon: Settings,
        },
        {
            title: 'Themes',
            href: '/themes',
            icon: PaintRoller,
        },
    ];

    const footerNavItems: NavItem[] = [
        {
            title: 'Login',
            href: '/login',
            icon: LogIn,
        }
    ];

    return (
        <Sidebar collapsible="icon" variant="inset" className="border-r-0 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/60 dark:from-slate-950/90 dark:via-slate-900 dark:to-slate-950/80 shadow-sm backdrop-blur-sm">
            <SidebarHeader className="border-b border-slate-200/60 dark:border-slate-700/40 bg-gradient-to-br from-white/80 via-slate-50/40 to-white/60 dark:from-slate-900/80 dark:via-slate-800/40 dark:to-slate-900/60 backdrop-blur-sm">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="group hover:bg-white/80 dark:hover:bg-slate-800/60 transition-all duration-300 hover:shadow-sm rounded-xl">
                            <Link href="/feed" prefetch className="flex items-center gap-3 p-3">
                                <div className="relative">
                                    <AppLogo />
                                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                                </div>
                                <div className="group-data-[collapsible=icon]:hidden">
                                    <h2 className="text-base font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
                                        FeedBack Zone
                                    </h2>
                                    <p className="text-xs text-muted-foreground/70 font-medium">Share & Discover</p>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                {/* User Stats Section */}
                {auth?.user && (
                    <div className="px-3 py-4 group-data-[collapsible=icon]:hidden border-t border-slate-200/50 dark:border-slate-700/30 bg-gradient-to-r from-slate-50/30 to-white/30 dark:from-slate-800/30 dark:to-slate-900/30 rounded-b-lg mx-2 mt-2">
                        <UserStats user={auth.user} />
                    </div>
                )}
            </SidebarHeader>

            <SidebarContent className="px-3 py-6 space-y-6">
                {/* Main Navigation */}
                <SidebarGroup className="space-y-3">
                    <SidebarGroupLabel className="text-xs font-semibold text-slate-600/80 dark:text-slate-400/80 uppercase tracking-wider flex items-center gap-2 px-2 py-1 bg-slate-100/50 dark:bg-slate-800/30 rounded-lg border border-slate-200/50 dark:border-slate-700/30">
                        <div className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full"></div>
                        Discover
                    </SidebarGroupLabel>
                    <NavMain items={mainNavItems} />
                </SidebarGroup>

                {/* Create Section */}
                {auth?.user && (
                    <SidebarGroup className="space-y-3">
                        <SidebarGroupLabel className="text-xs font-semibold text-emerald-600/80 dark:text-emerald-400/80 uppercase tracking-wider flex items-center gap-2 px-2 py-1 bg-emerald-50/50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200/50 dark:border-emerald-700/30">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                            Create
                        </SidebarGroupLabel>
                        <NavMain items={createNavItems} />
                    </SidebarGroup>
                )}

                {/* Activity Section */}
                {auth?.user && (
                    <SidebarGroup className="space-y-3">
                        <SidebarGroupLabel className="text-xs font-semibold text-blue-600/80 dark:text-blue-400/80 uppercase tracking-wider flex items-center gap-2 px-2 py-1 bg-blue-50/50 dark:bg-blue-900/20 rounded-lg border border-blue-200/50 dark:border-blue-700/30">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                            My Activity
                        </SidebarGroupLabel>
                        <NavMain items={activityNavItems} />
                    </SidebarGroup>
                )}
            </SidebarContent>

            <SidebarFooter className="border-t border-slate-200/50 dark:border-slate-700/30 bg-gradient-to-r from-slate-50/50 via-white/30 to-slate-50/50 dark:from-slate-900/50 dark:via-slate-800/30 dark:to-slate-900/50 backdrop-blur-sm p-3">
            {!auth?.user && (
                <div className="mb-3">
                    <NavFooter items={footerNavItems} className="space-y-2" />
                </div>
                )}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
