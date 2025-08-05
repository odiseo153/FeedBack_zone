import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Activity,
    Heart,
    MessageSquare,
    Star,
    FolderOpen,
    ExternalLink,
    Clock,
    TrendingUp
} from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useInitials } from '@/hooks/use-initials';

interface ActivityItem {
    id: string;
    type: 'like' | 'comment' | 'rating' | 'project_created' | 'project_updated';
    title: string;
    description: string;
    created_at: string;
    project?: {
        id: string;
        title: string;
    };
    user?: {
        name: string;
        avatar?: string;
    };
}

interface RecentActivityProps {
    activities?: ActivityItem[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
    const getInitials = useInitials();

    // Mock data for demonstration
    const mockActivities: ActivityItem[] = [
        {
            id: '1',
            type: 'like',
            title: 'Project liked',
            description: 'Someone liked your "Modern Dashboard Design" project',
            created_at: '2024-01-15T10:30:00Z',
            project: {
                id: '1',
                title: 'Modern Dashboard Design'
            },
            user: {
                name: 'John Doe',
                avatar: '/avatars/john.jpg'
            }
        },
        {
            id: '2',
            type: 'comment',
            title: 'New comment',
            description: 'Jane Smith commented on your "E-commerce API" project',
            created_at: '2024-01-14T15:45:00Z',
            project: {
                id: '2',
                title: 'E-commerce API Integration'
            },
            user: {
                name: 'Jane Smith',
                avatar: '/avatars/jane.jpg'
            }
        },
        {
            id: '3',
            type: 'rating',
            title: 'Project rated',
            description: 'Your project received a 5-star rating',
            created_at: '2024-01-13T09:15:00Z',
            project: {
                id: '1',
                title: 'Modern Dashboard Design'
            },
            user: {
                name: 'Mike Johnson',
                avatar: '/avatars/mike.jpg'
            }
        },
        {
            id: '4',
            type: 'project_created',
            title: 'Project published',
            description: 'Your "Mobile App UI Kit" project was published',
            created_at: '2024-01-12T14:20:00Z',
            project: {
                id: '3',
                title: 'Mobile App UI Kit'
            }
        },
        {
            id: '5',
            type: 'project_updated',
            title: 'Project updated',
            description: 'You updated the "Dashboard Design" project',
            created_at: '2024-01-11T11:10:00Z',
            project: {
                id: '1',
                title: 'Modern Dashboard Design'
            }
        }
    ];

    const displayActivities = activities || mockActivities;

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'like':
                return { icon: Heart, color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/30' };
            case 'comment':
                return { icon: MessageSquare, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' };
            case 'rating':
                return { icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900/30' };
            case 'project_created':
                return { icon: FolderOpen, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' };
            case 'project_updated':
                return { icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' };
            default:
                return { icon: Activity, color: 'text-gray-500', bg: 'bg-gray-100 dark:bg-gray-900/30' };
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const hours = Math.floor(diff / (1000 * 3600));
        const days = Math.floor(hours / 24);

        if (hours < 1) return 'Just now';
        if (hours < 24) return `${hours}h ago`;
        if (days === 1) return 'Yesterday';
        if (days < 7) return `${days} days ago`;
        return date.toLocaleDateString();
    };

    return (
        <Card className="h-fit">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <div className="rounded-lg bg-green-100 dark:bg-green-900/30 p-2">
                            <Activity className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        Recent Activity
                    </CardTitle>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                        View All
                        <ExternalLink className="ml-1 h-3 w-3" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                {displayActivities.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                        <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No recent activity</p>
                        <p className="text-sm">Activity will appear here as you engage with projects</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {displayActivities.map((activity, index) => {
                            const activityStyle = getActivityIcon(activity.type);
                            const IconComponent = activityStyle.icon;

                            return (
                                <div
                                    key={activity.id}
                                    className="group flex items-start gap-4 rounded-lg p-3 hover:bg-muted/50 transition-colors duration-200"
                                >
                                    {/* Activity Icon */}
                                    <div className={`rounded-full p-2 ${activityStyle.bg} group-hover:scale-110 transition-transform duration-200`}>
                                        <IconComponent className={`h-4 w-4 ${activityStyle.color}`} />
                                    </div>

                                    {/* Activity Content */}
                                    <div className="flex-1 min-w-0 space-y-1">
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium text-sm text-foreground">
                                                {activity.title}
                                            </p>
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                <Clock className="h-3 w-3" />
                                                {formatDate(activity.created_at)}
                                            </div>
                                        </div>

                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            {activity.description}
                                        </p>

                                        {/* User Avatar if available */}
                                        {activity.user && (
                                            <div className="flex items-center gap-2 mt-2">
                                                <Avatar className="h-5 w-5">
                                                    <AvatarImage src={activity.user.avatar} />
                                                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                                                        {getInitials(activity.user.name)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="text-xs text-muted-foreground">
                                                    {activity.user.name}
                                                </span>
                                            </div>
                                        )}

                                        {/* Project Link */}
                                        {activity.project && (
                                            <Link
                                                href={`/projects/${activity.project.id}`}
                                                className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline mt-1"
                                            >
                                                <FolderOpen className="h-3 w-3" />
                                                {activity.project.title}
                                            </Link>
                                        )}
                                    </div>

                                    {/* Timeline connector */}
                                    {index < displayActivities.length - 1 && (
                                        <div className="absolute left-8 mt-12 w-px h-4 bg-border" />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
