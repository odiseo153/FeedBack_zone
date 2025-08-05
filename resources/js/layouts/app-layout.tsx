import { usePage } from '@inertiajs/react';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { AuthProvider } from '@/contexts/AuthContext';
import { AuthGuard } from '@/components/auth-guard';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    requireAuth?: boolean;
}

export default ({ children, breadcrumbs, requireAuth = true, ...props }: AppLayoutProps) => {
    const page = usePage<SharedData>();

    // Ensure auth is always defined
    const auth = page?.props?.auth || { user: null };

    return (
        <AuthProvider auth={auth}>
            <AuthGuard requireAuth={requireAuth}>
                <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
                    {children}
                </AppLayoutTemplate>
            </AuthGuard>
        </AuthProvider>
    );
};
