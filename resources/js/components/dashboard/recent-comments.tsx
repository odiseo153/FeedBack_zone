import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, ExternalLink, Clock, Star } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useInitials } from '@/hooks/use-initials';

interface Comment {
    id: string;
    content: string;
    created_at: string;
    project: {
        id: string;
        title: string;
        author: {
            name: string;
            avatar?: string;
        };
    };
    rating?: {
        overall: number;
    };
}

interface RecentCommentsProps {
    comments?: Comment[];
}

export function RecentComments({ comments }: RecentCommentsProps) {
    const getInitials = useInitials();

    // Mock data for demonstration
    const mockComments: Comment[] = [
        {
            id: '1',
            content: 'Great project! The UI is clean and the functionality is smooth. I particularly like the gradient design and smooth animations.',
            created_at: '2024-01-15T10:30:00Z',
            project: {
                id: '1',
                title: 'Modern Dashboard Design',
                author: {
                    name: 'John Doe',
                    avatar: '/avatars/john.jpg'
                }
            },
            rating: { overall: 4.5 }
        },
        {
            id: '2',
            content: 'The API integration looks solid, but consider adding error handling for edge cases.',
            created_at: '2024-01-14T15:45:00Z',
            project: {
                id: '2',
                title: 'React API Integration',
                author: {
                    name: 'Jane Smith',
                    avatar: '/avatars/jane.jpg'
                }
            },
            rating: { overall: 4.0 }
        },
        {
            id: '3',
            content: 'Love the responsive design! Works perfectly on mobile devices.',
            created_at: '2024-01-13T09:15:00Z',
            project: {
                id: '3',
                title: 'Mobile-First Portfolio',
                author: {
                    name: 'Mike Johnson',
                    avatar: '/avatars/mike.jpg'
                }
            },
            rating: { overall: 5.0 }
        }
    ];

    const displayComments = comments || mockComments;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const days = Math.floor(diff / (1000 * 3600 * 24));

        if (days === 0) return 'Today';
        if (days === 1) return 'Yesterday';
        if (days < 7) return `${days} days ago`;
        return date.toLocaleDateString();
    };

    return (
        <Card className="h-fit">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <div className="rounded-lg bg-purple-100 dark:bg-purple-900/30 p-2">
                            <MessageSquare className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        </div>
                        Recent Comments
                    </CardTitle>
                    <Link href="/my/comments">
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                            View All
                            <ExternalLink className="ml-1 h-3 w-3" />
                        </Button>
                    </Link>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {displayComments.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                        <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No comments yet</p>
                        <p className="text-sm">Start engaging with projects to see your comments here</p>
                    </div>
                ) : (
                    displayComments.map((comment) => (
                        <div key={comment.id} className="group space-y-3 rounded-lg border border-border/50 p-4 hover:border-border hover:shadow-sm transition-all duration-200">
                            {/* Comment Header */}
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={comment.project.author.avatar} />
                                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                                            {getInitials(comment.project.author.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <Link
                                            href={`/projects/${comment.project.id}`}
                                            className="font-medium text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate block"
                                        >
                                            {comment.project.title}
                                        </Link>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <Clock className="h-3 w-3" />
                                            {formatDate(comment.created_at)}
                                            {comment.rating && (
                                                <div className="flex items-center gap-1">
                                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                    <span>{comment.rating.overall}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <Badge variant="secondary" className="text-xs">
                                    Comment
                                </Badge>
                            </div>

                            {/* Comment Content */}
                            <div className="text-sm text-foreground leading-relaxed">
                                {comment.content.length > 120
                                    ? `${comment.content.substring(0, 120)}...`
                                    : comment.content
                                }
                            </div>

                            {/* Action Button */}
                            <div className="flex justify-end">
                                <Link href={`/projects/${comment.project.id}#comment-${comment.id}`}>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="opacity-0 group-hover:opacity-100 transition-opacity text-xs h-7"
                                    >
                                        View Project
                                        <ExternalLink className="ml-1 h-3 w-3" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </CardContent>
        </Card>
    );
}
