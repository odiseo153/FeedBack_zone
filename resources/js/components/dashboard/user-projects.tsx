import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    FolderOpen,
    ExternalLink,
    Calendar,
    Eye,
    Heart,
    MessageSquare,
    Star,
    Plus,
    TrendingUp
} from 'lucide-react';
import { Link } from '@inertiajs/react';

interface Project {
    id: string;
    title: string;
    description: string;
    created_at: string;
    status: 'published' | 'draft' | 'archived';
    stats: {
        views: number;
        likes: number;
        comments: number;
        rating: number;
    };
    tags: string[];
    thumbnail?: string;
}

interface UserProjectsProps {
    projects?: Project[];
}

export function UserProjects({ projects }: UserProjectsProps) {
    // Mock data for demonstration
    const mockProjects: Project[] = [
        {
            id: '1',
            title: 'Modern Dashboard Design',
            description: 'A beautiful and responsive dashboard built with React and Tailwind CSS featuring modern design patterns.',
            created_at: '2024-01-10T10:00:00Z',
            status: 'published',
            stats: {
                views: 1234,
                likes: 45,
                comments: 12,
                rating: 4.8
            },
            tags: ['React', 'Tailwind', 'TypeScript'],
            thumbnail: '/thumbnails/dashboard.jpg'
        },
        {
            id: '2',
            title: 'E-commerce API Integration',
            description: 'Full-stack e-commerce solution with payment processing, inventory management, and user authentication.',
            created_at: '2024-01-05T15:30:00Z',
            status: 'published',
            stats: {
                views: 856,
                likes: 32,
                comments: 8,
                rating: 4.5
            },
            tags: ['Node.js', 'MongoDB', 'Stripe'],
            thumbnail: '/thumbnails/ecommerce.jpg'
        },
        {
            id: '3',
            title: 'Mobile App UI Kit',
            description: 'Comprehensive UI kit for mobile applications with dark/light theme support and accessibility features.',
            created_at: '2024-01-01T09:15:00Z',
            status: 'draft',
            stats: {
                views: 234,
                likes: 15,
                comments: 3,
                rating: 4.2
            },
            tags: ['Flutter', 'Figma', 'UI/UX'],
            thumbnail: '/thumbnails/mobile-ui.jpg'
        }
    ];

    const displayProjects = projects || mockProjects;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'published':
                return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'draft':
                return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'archived':
                return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
            default:
                return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <div className="rounded-lg bg-blue-100 dark:bg-blue-900/30 p-2">
                            <FolderOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        My Projects
                    </CardTitle>
                    <div className="flex items-center gap-2">
                        <Link href="/projects">
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                                View All
                                <ExternalLink className="ml-1 h-3 w-3" />
                            </Button>
                        </Link>
                        <Link href="/projects/create">
                            <Button size="sm" className="button-theme">
                                <Plus className="mr-1 h-3 w-3" />
                                New Project
                            </Button>
                        </Link>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {displayProjects.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-4 w-16 h-16 mx-auto mb-4">
                            <FolderOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">No projects yet</h3>
                        <p className="text-muted-foreground mb-4">Create your first project to get started</p>
                        <Link href="/projects/create">
                            <Button className="button-theme">
                                <Plus className="mr-2 h-4 w-4" />
                                Create Project
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                        {displayProjects.map((project) => (
                            <div
                                key={project.id}
                                className="group relative overflow-hidden rounded-lg border border-border/50 p-4 hover:border-border hover:shadow-md transition-all duration-200"
                            >
                                {/* Project Header */}
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1 min-w-0">
                                        <Link
                                            href={`/projects/${project.id}`}
                                            className="font-semibold text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate block"
                                        >
                                            {project.title}
                                        </Link>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                <Calendar className="h-3 w-3" />
                                                {formatDate(project.created_at)}
                                            </div>
                                            <Badge className={`text-xs ${getStatusColor(project.status)}`}>
                                                {project.status}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                        <span className="text-xs font-medium">{project.stats.rating}</span>
                                    </div>
                                </div>

                                {/* Project Description */}
                                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                                    {project.description.length > 100
                                        ? `${project.description.substring(0, 100)}...`
                                        : project.description
                                    }
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-1 mb-3">
                                    {project.tags.slice(0, 3).map((tag) => (
                                        <Badge key={tag} variant="secondary" className="text-xs">
                                            {tag}
                                        </Badge>
                                    ))}
                                    {project.tags.length > 3 && (
                                        <Badge variant="secondary" className="text-xs">
                                            +{project.tags.length - 3}
                                        </Badge>
                                    )}
                                </div>

                                {/* Project Stats */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Eye className="h-3 w-3" />
                                            <span>{project.stats.views}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Heart className="h-3 w-3" />
                                            <span>{project.stats.likes}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MessageSquare className="h-3 w-3" />
                                            <span>{project.stats.comments}</span>
                                        </div>
                                    </div>
                                    <Link href={`/projects/${project.id}`}>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="opacity-0 group-hover:opacity-100 transition-opacity text-xs h-6"
                                        >
                                            View
                                            <ExternalLink className="ml-1 h-3 w-3" />
                                        </Button>
                                    </Link>
                                </div>

                                {/* Trending indicator for high-performing projects */}
                                {project.stats.views > 1000 && (
                                    <div className="absolute top-2 right-2">
                                        <div className="rounded-full bg-orange-100 dark:bg-orange-900/30 p-1">
                                            <TrendingUp className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                                        </div>
                                    </div>
                                )}

                                {/* Hover Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
