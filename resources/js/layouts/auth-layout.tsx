import { usePage } from '@inertiajs/react';
import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';
import { AuthProvider } from '@/contexts/AuthContext';
import type { SharedData } from '@/types';

export default function AuthLayout({ children, title, description, ...props }: { children: React.ReactNode; title: string; description: string }) {
    const page = usePage<SharedData>();
    
    // Ensure auth is always defined
    const auth = page?.props?.auth || { user: null };

    return (
        <AuthProvider auth={auth}>
            <AuthLayoutTemplate title={title} description={description} {...props}>
                {children}
            </AuthLayoutTemplate>
        </AuthProvider>
    );
}
