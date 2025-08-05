import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { cn } from '@/lib/utils';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();

    return (
        <SidebarMenu className="space-y-2">
            {items.map((item) => {
                const isActive = page.url.startsWith(item.href);
                return (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            asChild
                            isActive={isActive}
                            tooltip={{
                                children: (
                                    <div className="px-2 py-1 rounded bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg text-xs font-semibold">
                                        {item.title}
                                    </div>
                                )
                            }}
                            className={cn(
                                "group relative overflow-hidden rounded-xl transition-all duration-200",
                                "hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-950/40 dark:hover:to-purple-950/40",
                                "hover:shadow-lg hover:scale-[1.03]",
                                "active:scale-[0.98]",
                                isActive && [
                                    "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg",
                                    "nav-active-theme"
                                ]
                            )}
                        >
                            <Link
                                href={item.href}
                                prefetch
                                className={cn(
                                    "flex items-center gap-4 w-full px-3 py-2",
                                    isActive
                                        ? "text-black"
                                        : "text-slate-700 dark:text-slate-200"
                                )}
                                style={{
                                    fontWeight: isActive ? 700 : 500,
                                    letterSpacing: isActive ? '0.01em' : undefined
                                }}
                            >
                                {item.icon && (
                                    <div
                                        className={cn(
                                            "flex items-center justify-center rounded-lg p-2 transition-colors duration-200 shadow-sm",
                                            isActive
                                                ? "bg-white/20 text-white"
                                                : "bg-gradient-to-tr from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 group-hover:bg-white/60 dark:group-hover:bg-slate-700/60"
                                        )}
                                    >
                                        <item.icon className={cn(
                                            "h-5 w-5",
                                            isActive ? "text-white drop-shadow" : "text-blue-600 dark:text-blue-300 group-hover:text-blue-700"
                                        )} />
                                    </div>
                                )}
                                <span
                                    className={cn(
                                        "font-semibold text-base transition-colors duration-200",
                                        isActive
                                            ? "text-white drop-shadow"
                                            : "group-hover:text-blue-700 dark:group-hover:text-blue-200"
                                    )}
                                >
                                    {item.title}
                                </span>
                                {/* Animated underline for active */}
                                <span
                                    className={cn(
                                        "absolute left-4 right-4 bottom-1 h-0.5 rounded-full transition-all duration-300",
                                        isActive
                                            ? "bg-white/80 scale-x-100"
                                            : "bg-blue-200 dark:bg-blue-900 scale-x-0 group-hover:scale-x-100"
                                    )}
                                    style={{
                                        transformOrigin: "left"
                                    }}
                                />
                                {/* Active indicator pulse */}
                                {isActive && (
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-white/90 shadow-lg animate-pulse border-2 border-blue-600" />
                                )}
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                );
            })}
        </SidebarMenu>
    );
}
