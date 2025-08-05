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
    Sparkles,
    Heart,
    Settings,
    LogIn,
    PaintRoller,
    StopCircleIcon,
    User,
    Layers2
} from 'lucide-react';
import AppLogo from './app-logo';
import { UserStats } from '@/components/user-stats';



export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;

    const mainNavItems: NavItem[] = [
        {
            title: 'Principal',
            href: route('home'),
            icon: Layers2
        },
         {
            title: 'Dashboard',
            href: '/dashboard',
            icon: Home,
        },
        {
            title: 'Feed',
            href: '/feed',
            icon: StopCircleIcon,
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
        <Sidebar collapsible="icon" variant="inset" className="border-r-0 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
            <SidebarHeader className="border-b border-border/40 bg-theme-gradient-header">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="group hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all duration-200">
                            <Link href="/feed" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                {/* User Stats Section */}
                {auth?.user && (
                    <div className="px-3 py-3 group-data-[collapsible=icon]:hidden border-t border-white/20 dark:border-slate-700/50">
                        <UserStats user={auth.user} />
                    </div>
                )}
            </SidebarHeader>

            <SidebarContent className="px-2 py-4 space-y-2">
                {/* Main Navigation */}
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
                        <Sparkles className="h-3 w-3" />
                        Discover
                    </SidebarGroupLabel>
                    <NavMain items={mainNavItems} />
                </SidebarGroup>

                {/* Create Section */}
                {auth?.user && (
                    <SidebarGroup>
                        <SidebarGroupLabel className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider flex items-center gap-2">
                            <PlusCircle className="h-3 w-3" />
                            Create
                        </SidebarGroupLabel>
                        <NavMain items={createNavItems} />
                    </SidebarGroup>
                )}

                {/* Activity Section */}
                {auth?.user && (
                    <SidebarGroup>
                        <SidebarGroupLabel className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider flex items-center gap-2">
                            <Activity className="h-3 w-3" />
                            My Activity
                        </SidebarGroupLabel>
                        <NavMain items={activityNavItems} />
                    </SidebarGroup>
                )}
            </SidebarContent>

            <SidebarFooter className="border-t border-border/40 bg-theme-gradient-footer">
            {!auth?.user && (
                <NavFooter items={footerNavItems} className="mt-auto" />
                )}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
