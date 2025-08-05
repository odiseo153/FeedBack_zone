import { useAuth } from '@/contexts/AuthContext';
import { router } from '@inertiajs/react';

/**
 * Hook for actions that require authentication
 * Automatically shows login modal if user is not authenticated
 */
export function useAuthActions() {
    const {requireAuth} = useAuth();

    // Generic action wrapper that requires authentication
    const withAuth = (action: () => void, options?: {
        title?: string;
        description?: string;
        onSuccess?: () => void;
    }) => {
        return () => {
            return requireAuth(action, options);
        };
    };

    // Specific action helpers
    const likeProject = (projectId: number) => {
        const action = () => {
            router.post(`/projects/${projectId}/like`, {}, {
                preserveScroll: true,
                onSuccess: () => {
                    // Handle success (could show a toast notification)
                },
            });
        };

        return withAuth(action, {
            title: "Like Project",
            description: "Please sign in to like this project."
        });
    };

    const commentOnProject = (callback?: () => void) => {
        const action = callback || (() => {
            // Default behavior - could scroll to comment form, focus input, etc.
        });

        return withAuth(action, {
            title: "Comment on Project",
            description: "Please sign in to leave a comment."
        });
    };

    const rateProject = (callback?: () => void) => {
        const action = callback || (() => {
            // Default behavior - could open rating form, etc.
        });

        return withAuth(action, {
            title: "Rate Project",
            description: "Please sign in to rate this project."
        });
    };

    const followUser = (userId: number) => {
        const action = () => {
            router.post(`/users/${userId}/follow`, {}, {
                preserveScroll: true,
                onSuccess: () => {
                    // Handle success
                },
            });
        };

        return withAuth(action, {
            title: "Follow User",
            description: "Please sign in to follow this user."
        });
    };

    const shareProject = (callback: () => void) => {
        return withAuth(callback, {
            title: "Share Project",
            description: "Please sign in to share your project."
        });
    };

    const editProfile = () => {
        const action = () => {
            router.get('/profile/edit');
        };

        return withAuth(action, {
            title: "Edit Profile",
            description: "Please sign in to edit your profile."
        });
    };

    const createProject = () => {
        const action = () => {
            router.get('/projects/create');
        };

        return withAuth(action, {
            title: "Create Project",
            description: "Please sign in to share your project."
        });
    };

    return {
        withAuth,
        likeProject,
        commentOnProject,
        rateProject,
        followUser,
        shareProject,
        editProfile,
        createProject,
    };
}

/**
 * Hook for handling authentication-required form submissions
 */
export function useAuthenticatedForm() {
    const {requireAuth} = useAuth();

    const submitWithAuth = (
        submitFn: () => void,
        options: {
            title?: string;
            description?: string;
        } = {}
    ) => {
        requireAuth(submitFn, options);
    };

    return { submitWithAuth };
}

/**
 * Hook for checking authentication before navigation
 */
export function useAuthenticatedNavigation() {
    const {requireAuth} = useAuth();

    const navigateWithAuth = (
        path: string,
        options: {
            title?: string;
            description?: string;
        } = {}
    ) => {
        const action = () => router.get(path);
        requireAuth(action, options);
    };

    return { navigateWithAuth };
}
