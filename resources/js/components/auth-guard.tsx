import { usePage, router } from '@inertiajs/react';
import { useEffect } from 'react';
import { SharedData } from '@/types';

interface AuthGuardProps {
    children: React.ReactNode;
    requireAuth?: boolean;
    redirectTo?: string;
}

export function AuthGuard({
    children,
    requireAuth = true,
    redirectTo = '/login'
}: AuthGuardProps) {
    const { auth } = usePage<SharedData>().props;

    useEffect(() => {
        // If authentication is required but user is not authenticated
        if (requireAuth && !auth.user) {
            router.visit(redirectTo, {
                replace: true,
            });
            return;
        }


    }, [auth.user, requireAuth, redirectTo]);

    // If auth is required but user is not authenticated, don't render children
    if (requireAuth && !auth.user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
        );
    }



    return <>{children}</>;
}
