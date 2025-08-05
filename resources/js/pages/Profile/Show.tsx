import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    ArrowLeft, MapPin, Calendar, Globe, Github, Twitter, Star,
    Users, MessageCircle, Award, Briefcase, Mail,
    Edit, UserPlus, UserCheck, ExternalLink
} from 'lucide-react';
import { User, Project } from '@/types';
import { PostCard } from '@/components/post/post-card';
import { transformProjectToPost } from '@/lib/utils';

interface Tag {
    id: number;
    name: string;
    slug: string;
    color: string;
    type: string;
}



interface UserStats {
    total_views: number;
    total_likes: number;
    total_comments_received: number;
    average_rating: number;
    projects_count: number;
    total_ratings_received: number;
}

interface ShowProfileProps {
    user: User;
    stats?: UserStats;
    auth: {
        user?: User;
    };
}

export default function ShowProfile({ user,  stats, auth }: ShowProfileProps) {
    const [activeTab, setActiveTab] = useState('overview');
    const [projects, setProjects] = useState<Project[]>(user.projects || []);

    console.log(user);
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    const getReputationLevel = (score: number) => {
        if (score >= 2000) return { level: 'Expert', color: 'text-purple-600', bgColor: 'bg-purple-100' };
        if (score >= 1000) return { level: 'Advanced', color: 'text-blue-600', bgColor: 'bg-blue-100' };
        if (score >= 500) return { level: 'Intermediate', color: 'text-green-600', bgColor: 'bg-green-100' };
        if (score >= 100) return { level: 'Beginner', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
        return { level: 'Newcomer', color: 'text-gray-600', bgColor: 'bg-gray-100' };
    };

    const isOwnProfile = auth.user?.id === user.id;
    const reputationInfo = getReputationLevel(user.reputation_score);


    return (
        <AppLayout>
            <Head title={`${user.name} - Profile`} />

            <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Button */}
                <div className="mb-6">
                    <Link href={route('profile.directory')}>
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Directory
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Sidebar */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-6">
                            <CardHeader className="text-center">
                                <div className="relative inline-block">
                                    <Avatar className="w-32 h-32 mx-auto mb-4">
                                        <AvatarImage src={user.avatar_url} />
                                        <AvatarFallback className="text-3xl">
                                            {getInitials(user.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    {user.is_verified && (
                                        <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-1">
                                            <UserCheck className="w-4 h-4" />
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                                    {user.username && (
                                        <p className="text-gray-600">@{user.username}</p>
                                    )}
                                    {user.job_title && (
                                        <div className="flex items-center justify-center gap-2 text-gray-600">
                                            <Briefcase className="w-4 h-4" />
                                            <span>{user.job_title}</span>
                                            {user.company && <span>at {user.company}</span>}
                                        </div>
                                    )}
                                    {user.location && (
                                        <div className="flex items-center justify-center gap-2 text-gray-600">
                                            <MapPin className="w-4 h-4" />
                                            <span>{user.location}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2 mt-4">
                                    {isOwnProfile ? (
                                        <Button className="flex-1" asChild>
                                            <Link href={route('profile.edit')}>
                                            <Edit className="w-4 h-4 mr-2" />
                                            Edit Profile
                                            </Link>
                                        </Button>
                                    ) : (
                                        <>
                                            <Button variant="outline" className="flex-1" >
                                                <UserPlus className="w-4 h-4 mr-2" />
                                                Follow
                                            </Button>
                                            <Button variant="outline">
                                                <Mail className="w-4 h-4" />
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-6">
                                {/* Bio */}
                                {user.bio && (
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-900 mb-2">Bio</h3>
                                        <p className="text-gray-700 text-sm leading-relaxed">{user.bio}</p>
                                    </div>
                                )}

                                {/* Stats */}
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Stats</h3>
                                    <div className="grid grid-cols-2 gap-4 text-center">
                                        <div>
                                            <div className="text-2xl font-bold text-blue-600">{stats?.projects_count}</div>
                                            <div className="text-xs text-gray-600">Projects</div>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-purple-600">{stats?.total_likes || 0}</div>
                                            <div className="text-xs text-gray-600">Likes</div>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-orange-600">{stats?.total_comments_received}</div>
                                            <div className="text-xs text-gray-600">Comments</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Reputation */}
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Reputation</h3>
                                    <div className="flex items-center gap-2">
                                        <Badge className={`${reputationInfo.bgColor} ${reputationInfo.color} border-0`}>
                                            {reputationInfo.level}
                                        </Badge>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            <span className="font-medium">{user.reputation_score}</span>
                                        </div>
                                    </div>
                                    {stats?.average_rating && (
                                        <div className="mt-2 text-sm text-gray-600">
                                            Average Rating: {stats.average_rating.toFixed(1)}/5
                                            ({stats.total_ratings_received} ratings)
                                        </div>
                                    )}
                                </div>

                                {/* Skills */}
                                {user.skills && user.skills.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-900 mb-2">Skills</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {user.skills.map((skill) => (
                                                <Badge key={skill} variant="secondary" className="text-xs">
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Availability */}
                                {user.is_available_for_hire && (
                                    <div>
                                        <Badge className="bg-green-100 text-green-800 border-green-200">
                                            <span className="mr-1">🟢</span>
                                            Available for hire
                                        </Badge>
                                    </div>
                                )}

                                {/* Social Links */}
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Links</h3>
                                    <div className="space-y-2">
                                        {user.portfolio_url && (
                                            <a
                                                href={user.portfolio_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
                                            >
                                                <Globe className="w-4 h-4" />
                                                Portfolio
                                                <ExternalLink className="w-3 h-3" />
                                            </a>
                                        )}
                                        {user.github_username && (
                                            <a
                                                href={`https://github.com/${user.github_username}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 text-sm"
                                            >
                                                <Github className="w-4 h-4" />
                                                GitHub
                                                <ExternalLink className="w-3 h-3" />
                                            </a>
                                        )}
                                        {user.twitter_handle && (
                                            <a
                                                href={`https://twitter.com/${user.twitter_handle}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-blue-500 hover:text-blue-600 text-sm"
                                            >
                                                <Twitter className="w-4 h-4" />
                                                Twitter
                                                <ExternalLink className="w-3 h-3" />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Member Since */}
                                <div className="pt-4 border-t border-gray-200">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Calendar className="w-4 h-4" />
                                        Member since {formatDate(user.created_at)}
                                    </div>
                                    {user.last_active_at && (
                                        <div className="mt-1 text-xs text-gray-500">
                                            Last active {formatDate(user.last_active_at)}
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardContent className="p-6">
                                <Tabs value={activeTab} onValueChange={setActiveTab}>
                                    <TabsList className="mb-6">
                                        <TabsTrigger value="overview">Overview</TabsTrigger>
                                        <TabsTrigger value="projects">
                                            Projects ({stats?.projects_count})
                                        </TabsTrigger>
                                        <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="overview" className="space-y-6">
                                        {/* Achievements */}
                                        <div>
                                            <h3 className="text-lg font-semibold mb-4">Achievements</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <Card className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="bg-blue-100 p-2 rounded-lg">
                                                            <Star className="w-5 h-5 text-blue-600" />
                                                        </div>
                                                        <div>
                                                            <div className="font-medium">Top Contributor</div>
                                                            <div className="text-sm text-gray-600">
                                                                {user.reputation_score} reputation points
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card>

                                                <Card className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="bg-green-100 p-2 rounded-lg">
                                                            <Users className="w-5 h-5 text-green-600" />
                                                        </div>
                                                        <div>
                                                            <div className="font-medium">Community Member</div>
                                                            <div className="text-sm text-gray-600">
                                                                {user.comments_count} helpful comments
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card>

                                                {stats && stats.projects_count >= 5 && (
                                                    <Card className="p-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="bg-purple-100 p-2 rounded-lg">
                                                                <Award className="w-5 h-5 text-purple-600" />
                                                            </div>
                                                            <div>
                                                                <div className="font-medium">Prolific Creator</div>
                                                                <div className="text-sm text-gray-600">
                                                                    {stats?.projects_count} projects shared
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                )}

                                                {stats?.average_rating && stats.average_rating >= 4.0 && (
                                                    <Card className="p-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="bg-yellow-100 p-2 rounded-lg">
                                                                <Star className="w-5 h-5 text-yellow-600" />
                                                            </div>
                                                            <div>
                                                                <div className="font-medium">Quality Creator</div>
                                                                <div className="text-sm text-gray-600">
                                                                    {stats.average_rating.toFixed(1)} average rating
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                )}
                                            </div>
                                        </div>

                                        {/* Recent Projects Preview */}
                                        {projects && projects.length > 0 && (
                                            <div>
                                                <div className="flex items-center justify-between mb-4">
                                                    <h3 className="text-lg font-semibold">Recent Projects</h3>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => setActiveTab('projects')}
                                                    >
                                                        View All
                                                    </Button>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {projects.map((project) => (
                                                        <PostCard key={project.id} post={transformProjectToPost({...project, user: user})} />

                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </TabsContent>

                                    <TabsContent value="projects" className="space-y-6">
                                        {projects && projects.length > 0 ? (
                                            <div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    {projects.map((project) => (
                                                        <PostCard key={project.id} post={transformProjectToPost({...project, user: user})} />
                                                    ))}
                                                </div>

                                                {/* Pagination */}

                                            </div>
                                        ) : (
                                            <div className="text-center py-12">
                                                <div className="text-gray-400 mb-4">
                                                    <Users className="w-16 h-16 mx-auto" />
                                                </div>
                                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                                    No projects yet
                                                </h3>
                                                <p className="text-gray-600 mb-4">
                                                    {isOwnProfile
                                                        ? "Share your first project to get started!"
                                                        : `${user.name} hasn't shared any projects yet.`
                                                    }
                                                </p>
                                                {isOwnProfile && (
                                                    <Button>
                                                        Share Your First Project
                                                    </Button>
                                                )}
                                            </div>
                                        )}
                                    </TabsContent>

                                    <TabsContent value="activity" className="space-y-6">
                                        <div className="text-center py-12">
                                            <div className="text-gray-400 mb-4">
                                                <MessageCircle className="w-16 h-16 mx-auto" />
                                            </div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                                Activity Feed Coming Soon
                                            </h3>
                                            <p className="text-gray-600">
                                                Recent comments, ratings, and project updates will appear here.
                                            </p>
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
