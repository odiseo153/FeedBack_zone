import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
    Search, MapPin, Briefcase, Users, Star,
    Github, Twitter, Globe, Calendar, Filter
} from 'lucide-react';

interface User {
    id: number;
    name: string;
    username?: string;
    avatar_url: string;
    bio?: string;
    location?: string;
    job_title?: string;
    company?: string;
    github_username?: string;
    portfolio_url?: string;
    twitter_handle?: string;
    reputation_score: number;
    projects_count: number;
    skills?: string[];
    is_verified: boolean;
    is_available_for_hire: boolean;
    created_at: string;
}

interface DirectoryProps {
    users: {
        data: User[];
        links: Array<{ url: string; label: string; active: boolean }>;
        meta: { current_page: number; total: number; per_page: number; from: number; to: number };
    };
    filters: {
        search: string;
        available_for_hire: boolean;
        location: string;
        sort: string;
    };
}

const sortOptions = [
    { value: 'reputation', label: 'Reputation' },
    { value: 'projects', label: 'Projects' },
    { value: 'newest', label: 'Newest' },
];

export default function Directory({ users, filters }: DirectoryProps) {
    const [searchQuery, setSearchQuery] = useState(filters.search);
    const [showFilters, setShowFilters] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        updateFilters({ search: searchQuery });
    };

    const updateFilters = (newFilters: Partial<typeof filters>) => {
        router.get('/directory', {
            ...filters,
            ...newFilters,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
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

    return (
        <AppLayout>
            <Head title="Developer Directory" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Developer Directory</h1>
                    <p className="text-gray-600">
                        Connect with talented developers and designers in our community
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="flex gap-4 mb-6">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                type="text"
                                placeholder="Search by name, skills, or company..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Button type="submit" variant="outline">
                            Search
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <Filter className="w-4 h-4 mr-2" />
                            Filters
                        </Button>
                    </form>

                    {/* Sort Options */}
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-sm text-gray-600">Sort by:</span>
                        {sortOptions.map((option) => (
                            <Button
                                key={option.value}
                                variant={filters.sort === option.value ? "default" : "ghost"}
                                size="sm"
                                onClick={() => updateFilters({ sort: option.value })}
                            >
                                {option.label}
                            </Button>
                        ))}
                    </div>

                    {/* Additional Filters */}
                    {showFilters && (
                        <div className="space-y-4">
                            <Separator />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Location Filter */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                                        Location
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="Filter by location..."
                                        value={filters.location}
                                        onChange={(e) => updateFilters({ location: e.target.value })}
                                    />
                                </div>

                                {/* Availability Filter */}
                                <div className="flex items-center space-x-2 pt-6">
                                    <input
                                        type="checkbox"
                                        id="available_for_hire"
                                        checked={filters.available_for_hire}
                                        onChange={(e) => updateFilters({ available_for_hire: e.target.checked })}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="available_for_hire" className="text-sm text-gray-700">
                                        Available for hire only
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Results Count */}
                <div className="flex items-center justify-between mb-6">
                    <div className="text-sm text-gray-600">
                        Showing {users.meta.from} to {users.meta.to} of {users.meta.total} developers
                    </div>
                </div>

                {/* Users Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {users.data.map((user) => {
                        const reputationInfo = getReputationLevel(user.reputation_score);

                        return (
                            <Card key={user.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader className="text-center">
                                    <div className="relative inline-block mb-4">
                                        <Avatar className="w-20 h-20 mx-auto">
                                            <AvatarImage src={user.avatar_url} />
                                            <AvatarFallback className="text-lg">
                                                {getInitials(user.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                        {user.is_verified && (
                                            <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-1">
                                                <Star className="w-3 h-3 fill-current" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Link href={`/users/${user.id}`}>
                                            <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600">
                                                {user.name}
                                            </h3>
                                        </Link>
                                        {user.username && (
                                            <p className="text-gray-600">@{user.username}</p>
                                        )}
                                        {user.job_title && (
                                            <div className="flex items-center justify-center gap-2 text-gray-600">
                                                <Briefcase className="w-4 h-4" />
                                                <span className="text-sm">
                                                    {user.job_title}
                                                    {user.company && ` at ${user.company}`}
                                                </span>
                                            </div>
                                        )}
                                        {user.location && (
                                            <div className="flex items-center justify-center gap-2 text-gray-600">
                                                <MapPin className="w-4 h-4" />
                                                <span className="text-sm">{user.location}</span>
                                            </div>
                                        )}
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    {/* Bio */}
                                    {user.bio && (
                                        <p className="text-gray-700 text-sm text-center line-clamp-3">
                                            {user.bio}
                                        </p>
                                    )}

                                    {/* Stats */}
                                    <div className="grid grid-cols-2 gap-4 text-center">
                                        <div>
                                            <div className="text-lg font-bold text-blue-600">{user.projects_count}</div>
                                            <div className="text-xs text-gray-600">Projects</div>
                                        </div>
                                        <div>
                                            <div className="text-lg font-bold text-purple-600">{user.reputation_score}</div>
                                            <div className="text-xs text-gray-600">Reputation</div>
                                        </div>
                                    </div>

                                    {/* Reputation Level */}
                                    <div className="text-center">
                                        <Badge className={`${reputationInfo.bgColor} ${reputationInfo.color} border-0`}>
                                            {reputationInfo.level}
                                        </Badge>
                                    </div>

                                    {/* Skills */}
                                    {user.skills && user.skills.length > 0 && (
                                        <div>
                                            <div className="flex flex-wrap gap-1 justify-center">
                                                {user.skills.slice(0, 3).map((skill) => (
                                                    <Badge key={skill} variant="secondary" className="text-xs">
                                                        {skill}
                                                    </Badge>
                                                ))}
                                                {user.skills.length > 3 && (
                                                    <Badge variant="secondary" className="text-xs">
                                                        +{user.skills.length - 3}
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Availability */}
                                    {user.is_available_for_hire && (
                                        <div className="text-center">
                                            <Badge className="bg-green-100 text-green-800 border-green-200">
                                                <span className="mr-1">🟢</span>
                                                Available
                                            </Badge>
                                        </div>
                                    )}

                                    {/* Social Links */}
                                    <div className="flex justify-center gap-2">
                                        {user.portfolio_url && (
                                            <a
                                                href={user.portfolio_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-700"
                                            >
                                                <Globe className="w-4 h-4" />
                                            </a>
                                        )}
                                        {user.github_username && (
                                            <a
                                                href={`https://github.com/${user.github_username}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-700 hover:text-gray-900"
                                            >
                                                <Github className="w-4 h-4" />
                                            </a>
                                        )}
                                        {user.twitter_handle && (
                                            <a
                                                href={`https://twitter.com/${user.twitter_handle}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 hover:text-blue-600"
                                            >
                                                <Twitter className="w-4 h-4" />
                                            </a>
                                        )}
                                    </div>

                                    {/* Member Since */}
                                    <div className="text-center text-xs text-gray-500">
                                        <Calendar className="w-3 h-3 inline mr-1" />
                                        Member since {formatDate(user.created_at)}
                                    </div>

                                    {/* View Profile Button */}
                                    <div className="pt-2">
                                        <Link href={`/users/${user.id}`}>
                                            <Button variant="outline" size="sm" className="w-full">
                                                View Profile
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Empty State */}
                {users.data.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                            <Users className="w-16 h-16 mx-auto" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No developers found</h3>
                        <p className="text-gray-600 mb-4">
                            Try adjusting your search criteria or filters.
                        </p>
                    </div>
                )}

                {/* Pagination */}
                {users.data.length > 0 && users.links && (
                    <div className="flex justify-center mt-8">
                        <div className="flex gap-2">
                            {users.links.map((link, index) => (
                                <Button
                                    key={index}
                                    variant={link.active ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => link.url && router.get(link.url)}
                                    disabled={!link.url}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
