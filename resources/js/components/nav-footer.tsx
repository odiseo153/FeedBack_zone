import { Icon } from '@/components/icon';
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { type ComponentPropsWithoutRef } from 'react';
import { ExternalLink } from 'lucide-react';

export function NavFooter({
    items,
    className,
    ...props
}: ComponentPropsWithoutRef<typeof SidebarGroup> & {
    items: NavItem[];
}) {
    return (
        <SidebarGroup {...props} className={`group-data-[collapsible=icon]:p-0 ${className || ''}`}>
            <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                className="group relative overflow-hidden rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-700/60 hover:shadow-sm hover:shadow-slate-200/30 dark:hover:shadow-slate-900/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm border border-transparent hover:border-slate-200/50 dark:hover:border-slate-600/50"
                            >
                                <a
                                    href={item.href}
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 w-full"
                                >
                                    {item.icon && (
                                        <Icon iconNode={item.icon} className="h-4 w-4 transition-all duration-300 group-hover:scale-110" />
                                    )}
                                    <span className="font-medium text-sm group-hover:text-slate-800 dark:group-hover:text-slate-100 transition-all duration-300 group-hover:translate-x-0.5">
                                        {item.title}
                                    </span>
                                    <ExternalLink className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110" />

                                    {/* Subtle hover glow effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-slate-100/20 to-white/20 dark:from-slate-700/20 dark:to-slate-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl -z-10" />
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
