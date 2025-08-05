import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { cn } from '@/lib/utils';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();

    return (
        <SidebarMenu className="space-y-1">
            {items.map((item) => {
                const isActive = page.url.startsWith(item.href);
                return (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            asChild
                            isActive={isActive}
                            tooltip={{ children: item.title }}
                            className={cn(
                                "group relative overflow-hidden rounded-lg transition-all duration-200",
                                "hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-950/30 dark:hover:to-indigo-950/30",
                                "hover:shadow-sm hover:scale-[1.02]",
                                "active:scale-[0.98]",
                                isActive && [
                                    "nav-active-theme",
                                    "shadow-sm"
                                ]
                            )}
                        >
                            <Link href={item.href} prefetch className="flex items-center gap-3 w-full">
                                {item.icon && (
                                    <div className={cn(
                                        "flex items-center justify-center rounded-md p-1 transition-colors",
                                                                                isActive
                                            ? "bg-theme-primary text-white"
                                            : "group-hover:bg-white/60 dark:group-hover:bg-slate-700/60"
                                    )}>
                                        <item.icon className="h-4 w-4" />
                                    </div>
                                )}
                                <span className={cn(
                                    "font-medium transition-colors",
                                                                        isActive
                                        ? "text-theme-primary"
                                        : "group-hover:text-slate-900 dark:group-hover:text-slate-100"
                                )}>
                                    {item.title}
                                </span>

                                {/* Active indicator */}
                                {isActive && (
                                    <div className="absolute right-2 h-2 w-2 rounded-full bg-theme-primary animate-pulse" />
                                )}
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                );
            })}
        </SidebarMenu>
    );
}
