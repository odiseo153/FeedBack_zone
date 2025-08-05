import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { router } from '@inertiajs/react';
import { LoginModal } from '@/components/auth/LoginModal';
import type { User } from '@/types';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    showLoginModal: (options?: LoginModalOptions) => void;
    hideLoginModal: () => void;
    requireAuth: (action: () => void, options?: LoginModalOptions) => void;
    isLoginModalOpen: boolean;
}

interface LoginModalOptions {
    title?: string;
    description?: string;
    onSuccess?: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
    auth?: {
        user?: User | null;
    } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children, auth }: AuthProviderProps) {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [modalOptions, setModalOptions] = useState<LoginModalOptions>({});
    const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

    const user = auth?.user ?? null;
    const isAuthenticated = !!user;

    const showLoginModal = useCallback((options: LoginModalOptions = {}) => {
        setModalOptions(options);
        setIsLoginModalOpen(true);
    }, []);

    const hideLoginModal = useCallback(() => {
        setIsLoginModalOpen(false);
        setModalOptions({});
        setPendingAction(null);
    }, []);

    const requireAuth = useCallback((action: () => void, options: LoginModalOptions = {}) => {
        if (isAuthenticated) {
            // User is already authenticated, execute action immediately
            action();
        } else {
            // User is not authenticated, store action and show login modal
            setPendingAction(() => action);
            showLoginModal({
                ...options,
                onSuccess: () => {
                    // Execute the pending action after successful login
                    action();
                    options.onSuccess?.();
                },
            });
        }
    }, [isAuthenticated, showLoginModal]);

    const handleLoginSuccess = useCallback(() => {
        // Execute pending action if it exists
        if (pendingAction) {
            pendingAction();
        }

        // Call the custom onSuccess callback if provided
        modalOptions.onSuccess?.();

        // Close the modal
        hideLoginModal();

        // Use Inertia's router to refresh the current page with updated auth state
        router.reload({
            only: ['auth'],
            preserveUrl: true
        });
    }, [pendingAction, modalOptions, hideLoginModal]);

    const contextValue: AuthContextType = {
        user,
        isAuthenticated,
        showLoginModal,
        hideLoginModal,
        requireAuth,
        isLoginModalOpen,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}

            {/* Global Login Modal */}
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={hideLoginModal}
                onSuccess={handleLoginSuccess}
                title={modalOptions.title}
                description={modalOptions.description}
            />
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider. Make sure your component is wrapped with <AuthProvider>.');
    }
    return context;
}

