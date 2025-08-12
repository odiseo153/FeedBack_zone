import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { UserInfo } from '@/components/user-info';
import { UserMenuContent } from '@/components/user-menu-content';
import { useIsMobile } from '@/hooks/use-mobile';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { ChevronsUpDown, Sparkles } from 'lucide-react';

export function NavUser() {
    const { auth } = usePage<SharedData>().props;
    const { state } = useSidebar();
    const isMobile = useIsMobile();

    if (!auth.user) {
        return null;
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-white/90 to-slate-50/90 dark:from-slate-800/90 dark:to-slate-700/90 border border-slate-200/60 dark:border-slate-600/60 shadow-sm hover:shadow-lg hover:shadow-slate-200/30 dark:hover:shadow-slate-900/30 transition-all duration-300 data-[state=open]:bg-gradient-to-r data-[state=open]:from-slate-50/90 data-[state=open]:to-white/90 dark:data-[state=open]:from-slate-700/90 dark:data-[state=open]:to-slate-800/90 backdrop-blur-sm hover:scale-[1.02] active:scale-[0.98] p-3"
                        >
                            <UserInfo user={auth.user} />

                            {/* Premium user indicator */}
                            {auth.user.is_verified && (
                                <Sparkles className="absolute top-1 right-1 h-3 w-3 text-yellow-500" />
                            )}

                            <ChevronsUpDown className="ml-auto size-4 text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-all duration-300 group-hover:scale-110" />

                            {/* Subtle hover glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-100/30 via-white/30 to-slate-100/30 dark:from-slate-700/30 dark:via-slate-600/30 dark:to-slate-700/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl -z-10" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-xl border-slate-200/60 dark:border-slate-700/60 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm shadow-xl shadow-slate-200/20 dark:shadow-slate-900/20"
                        align="end"
                        side={isMobile ? 'bottom' : state === 'collapsed' ? 'left' : 'bottom'}
                    >
                        <UserMenuContent user={auth.user} />
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
