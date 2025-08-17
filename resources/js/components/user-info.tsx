import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { type User } from '@/types';
import { cn } from '@/lib/utils';

export function UserInfo({ user, showEmail = false, className }: { user: User; showEmail?: boolean; className?: string }) {
    const getInitials = useInitials();

    const getAvatarUrl = () => {
        if (user.avatar && user.avatar.startsWith('data:')) {
            return user.avatar;
        }
        return 'http://localhost:8000/' + user.avatar || '';
    };

    return (
        <div className={cn("flex items-center gap-3", className)}>
            <div className="relative">
                <Avatar className="h-8 w-8 overflow-hidden rounded-full ring-2 ring-white dark:ring-slate-700 shadow-sm">
                    <AvatarImage src={getAvatarUrl()} alt={user?.name ?? ""} />
                    <AvatarFallback className="rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-sm">
                        {getInitials(user.name)}
                    </AvatarFallback>
                </Avatar>
                {/* Online status indicator */}
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-slate-800" />
            </div>
            <div className="grid flex-1 text-left leading-tight min-w-0">
                <span className="truncate font-semibold text-slate-900 dark:text-white text-sm">
                    {user.name}
                </span>
                {showEmail && (
                    <span className="truncate text-xs text-slate-500 dark:text-slate-400">
                        {user.email}
                    </span>
                )}
                {user.job_title && !showEmail && (
                    <span className="truncate text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {user.job_title}
                    </span>
                )}
            </div>
        </div>
    );
}
