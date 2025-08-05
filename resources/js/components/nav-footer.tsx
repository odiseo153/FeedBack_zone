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
                                className="group relative overflow-hidden rounded-md text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-gradient-to-r hover:from-slate-100 hover:to-gray-100 dark:hover:from-slate-700 dark:hover:to-gray-700 transition-all duration-200"
                            >
                                <a
                                    href={item.href}
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 w-full"
                                >
                                    {item.icon && (
                                        <div className="flex items-center justify-center rounded-sm p-0.5 group-hover:bg-white/60 dark:group-hover:bg-slate-600/60 transition-colors">
                                            <Icon iconNode={item.icon} className="h-4 w-4" />
                                        </div>
                                    )}
                                    <span className="font-medium text-xs group-hover:text-slate-800 dark:group-hover:text-slate-100">
                                        {item.title}
                                    </span>
                                    <ExternalLink className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />

                                    {/* Hover effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
