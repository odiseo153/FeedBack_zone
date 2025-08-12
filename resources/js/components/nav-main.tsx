import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { cn } from '@/lib/utils';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();

    return (
        <SidebarMenu className="space-y-1.5">
            {items.map((item) => {
                const isActive = page.url.startsWith(item.href);
                return (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            asChild
                            isActive={isActive}
                            tooltip={{
                                children: (
                                    <div className="px-3 py-2 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-lg text-xs font-medium border border-slate-200 dark:border-slate-700">
                                        {item.title}
                                    </div>
                                )
                            }}
                            className={cn(
                                "group relative overflow-hidden rounded-xl transition-all duration-300 ease-out",
                                "hover:bg-white/80 dark:hover:bg-slate-800/60",
                                "hover:shadow-sm hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50",
                                "hover:border hover:border-slate-200/60 dark:hover:border-slate-700/60",
                                "hover:scale-[1.02] active:scale-[0.98]",
                                "backdrop-blur-sm",
                                isActive && [
                                    "bg-gradient-to-r from-slate-100 to-white dark:from-slate-800 dark:to-slate-700",
                                    "shadow-sm shadow-slate-200/60 dark:shadow-slate-900/60",
                                    "border border-slate-200/80 dark:border-slate-600/80",
                                    "text-slate-900 dark:text-white font-medium",
                                    "scale-[1.02]"
                                ]
                            )}
                        >
                            <Link
                                href={item.href}
                                prefetch
                                className={cn(
                                    "flex items-center gap-3 w-full px-3 py-2.5",
                                    "transition-all duration-300 ease-out",
                                    isActive
                                        ? "text-slate-900 dark:text-white"
                                        : "text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white"
                                )}
                            >
                                {item.icon && (
                                    <item.icon
                                        className={cn(
                                            "h-4 w-4 shrink-0 transition-all duration-300 ease-out",
                                            isActive
                                                ? "text-slate-700 dark:text-slate-200"
                                                : "text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200",
                                            "group-hover:scale-110 drop-shadow-sm"
                                        )}
                                    />
                                )}
                                <span className={cn(
                                    "text-sm font-medium tracking-tight transition-all duration-300 ease-out",
                                    isActive
                                        ? "text-slate-900 dark:text-white font-semibold"
                                        : "text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white",
                                    "group-hover:translate-x-0.5"
                                )}>
                                    {item.title}
                                </span>

                                {/* Active indicator */}
                                {isActive && (
                                    <div className="absolute right-2 w-1.5 h-1.5 bg-slate-600 dark:bg-slate-400 rounded-full" />
                                )}

                                {/* Subtle hover glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-slate-100/20 to-white/20 dark:from-slate-700/20 dark:to-slate-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                );
            })}
        </SidebarMenu>
    );
}
