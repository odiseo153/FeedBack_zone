import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarGroup, SidebarGroupLabel } from '@/components/ui/sidebar';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
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
    if (auth?.user) {
        mainNavItems.push({
            title: 'My Profile',
            href: '/users/' + auth?.user?.id,
            icon: User,
        });
    }


    return (
        <Sidebar collapsible="icon" variant="inset" className="border-r-0 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/60 dark:from-slate-950/90 dark:via-slate-900 dark:to-slate-950/80 shadow-sm backdrop-blur-sm">
            <SidebarHeader className="relative border-b border-slate-200/60 dark:border-slate-700/40 bg-gradient-to-br from-white/90 via-slate-50/60 to-blue-50/40 dark:from-slate-900/90 dark:via-slate-800/60 dark:to-slate-950/80 backdrop-blur-md overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-violet-500/5 dark:from-blue-400/10 dark:via-purple-400/10 dark:to-violet-400/10"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-400/10 to-transparent rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400/10 to-transparent rounded-full blur-xl"></div>

                <SidebarMenu className="relative z-10">
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            asChild
                            className="group relative hover:bg-white/90 dark:hover:bg-slate-800/70 transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/10 dark:hover:shadow-blue-400/20 rounded-2xl border border-transparent hover:border-blue-200/50 dark:hover:border-blue-700/30 overflow-hidden"
                        >
                            <Link href="/feed" prefetch className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 relative">
                                {/* Logo container with enhanced effects */}
                                <div className="relative flex-shrink-0">
                                    <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                                        <AppLogo />
                                    </div>
                                    {/* Animated glow effect */}
                                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-violet-500/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse -z-10"></div>
                                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                                </div>

                                {/* Brand text with responsive typography */}
                                <div className="group-data-[collapsible=icon]:hidden flex-1 min-w-0">
                                    <h2 className="text-base sm:text-lg font-bold tracking-tight bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-violet-600 dark:group-hover:from-blue-300 dark:group-hover:via-purple-300 dark:group-hover:to-violet-300 transition-all duration-300 truncate">
                                        FeedBack Zone
                                    </h2>

                                </div>

                                {/* Subtle arrow indicator */}
                                <div className="group-data-[collapsible=icon]:hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0">
                                    <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>

                {/* Enhanced User Stats Section */}
                {auth?.user && (
                    <div className="relative group-data-[collapsible=icon]:hidden border-t border-slate-200/50 dark:border-slate-700/30 mt-3 mx-2 overflow-hidden rounded-xl">
                        {/* Background with subtle animation */}
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-50/60 via-white/40 to-blue-50/30 dark:from-slate-800/60 dark:via-slate-900/40 dark:to-slate-950/30"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-500/5 to-purple-500/5 dark:from-transparent dark:via-blue-400/10 dark:to-purple-400/10"></div>

                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-blue-400/10 to-transparent rounded-full blur-xl"></div>
                        <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-purple-400/10 to-transparent rounded-full blur-lg"></div>

                        {/* Content */}
                        <div className="relative z-10 px-3 sm:px-4 py-3 sm:py-4 backdrop-blur-sm">
                            <UserStats user={auth.user} />
                        </div>

                        {/* Subtle border glow */}
                        <div className="absolute inset-0 rounded-xl border border-gradient-to-r from-blue-200/30 via-purple-200/20 to-violet-200/30 dark:from-blue-700/30 dark:via-purple-700/20 dark:to-violet-700/30 pointer-events-none"></div>
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
