import { useState, FormEvent } from 'react';
import { Head, useForm, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import InputError from '@/components/input-error';
import {
    ArrowLeft, Upload, Plus, X, Save, Eye, User, MapPin,
    Briefcase, Globe, Github, Twitter
} from 'lucide-react';
import { SharedData } from '@/types';

interface User {
    id: number;
    name: string;
    email: string;
    username?: string;
    avatar_url: string;
    bio?: string;
    location?: string;
    job_title?: string;
    company?: string;
    github_username?: string;
    portfolio_url?: string;
    twitter_handle?: string;
    skills?: string[];
    is_available_for_hire: boolean;
}

interface EditProfileProps {
    user: User;
}

export default function EditProfile({ user }: EditProfileProps) {
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [skillInput, setSkillInput] = useState('');
    const { auth } = usePage<SharedData>().props;


        const { data, setData, processing, errors } = useForm({
        name: user.name || '',
        username: user.username || '',
        bio: user.bio || '',
        location: user.location || '',
        job_title: user.job_title || '',
        company: user.company || '',
        github_username: user.github_username || '',
        portfolio_url: user.portfolio_url || '',
        twitter_handle: user.twitter_handle || '',
        skills: user.skills || [],
        is_available_for_hire: user.is_available_for_hire || false,
        avatar: null as File | null,
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (key === 'skills') {
                formData.append(key, JSON.stringify(data[key]));
            } else if (key === 'is_available_for_hire') {
                formData.append(key, data[key] ? '1' : '0');
            } else if (key === 'avatar' && data[key]) {
                formData.append(key, data[key]);
            } else if (data[key as keyof typeof data] !== null) {
                formData.append(key, String(data[key as keyof typeof data]));
            }
        });


        const response = await fetch(`/api/v1/users/${auth?.user?.id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
        console.log(response);
        console.log(data);
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('avatar', file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setAvatarPreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const addSkill = () => {
        if (skillInput.trim() && !data.skills.includes(skillInput.trim())) {
            setData('skills', [...data.skills, skillInput.trim()]);
            setSkillInput('');
        }
    };

    const removeSkill = (skillToRemove: string) => {
        setData('skills', data.skills.filter(skill => skill !== skillToRemove));
    };

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    return (
        <AppLayout>
            <Head title="Edit Profile" />

            <div className=" px-4 sm:px-6 lg:px-8 py-10">
                {/* Back Button */}
                <div className="mb-8">
                    <Link href={`/users/${user.id}`}>
                        <Button variant="outline" size="sm" className="transition-all hover:bg-gray-100">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Profile
                        </Button>
                    </Link>
                </div>

                {/* Header */}
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">Edit Your Profile</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Customize your profile information to showcase your skills and experience to the community
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10 max-w-4xl mx-auto">
                    {/* Avatar Section */}
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="border-b bg-gray-50/50">
                            <CardTitle className="flex items-center gap-2 text-blue-700">
                                <User className="w-5 h-5" />
                                Profile Picture
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="flex flex-col sm:flex-row items-center gap-8">
                                <Avatar className="w-32 h-32 border-2 border-gray-200">
                                    <AvatarImage src={avatarPreview || user.avatar_url} />
                                    <AvatarFallback className="text-3xl bg-blue-100 text-blue-700">
                                        {getInitials(user.name)}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="flex-1 space-y-4">
                                    <div className="space-y-3">
                                        <Label htmlFor="avatar" className="cursor-pointer">
                                            <div className="flex items-center gap-2 px-5 py-3 border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors w-fit">
                                                <Upload className="w-4 h-4 text-blue-600" />
                                                <span>Upload New Photo</span>
                                            </div>
                                            <input
                                                id="avatar"
                                                name="avatar"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleAvatarChange}
                                                className="hidden"
                                                aria-label="Upload profile picture"
                                            />
                                        </Label>
                                        <p className="text-sm text-gray-500">
                                            Recommended: Square image, at least 400x400px
                                        </p>
                                    </div>
                                    <InputError message={errors.avatar} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Basic Information */}
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="border-b bg-gray-50/50">
                            <CardTitle className="text-blue-700">Basic Information</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-gray-700">Full Name *</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Your full name"
                                        required
                                        className="focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="username" className="text-gray-700">Username</Label>
                                    <Input
                                        id="username"
                                        name="username"
                                        type="text"
                                        value={data.username}
                                        onChange={(e) => setData('username', e.target.value)}
                                        placeholder="Your unique username"
                                        className="focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <InputError message={errors.username} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bio" className="text-gray-700">Bio</Label>
                                <Textarea
                                    id="bio"
                                    name="bio"
                                    value={data.bio}
                                    onChange={(e) => setData('bio', e.target.value)}
                                    placeholder="Tell the community about yourself, your interests, and what you're working on..."
                                    rows={4}
                                    maxLength={500}
                                    className="focus:ring-blue-500 focus:border-blue-500 resize-none"
                                />
                                <div className="flex justify-between items-center mt-1">
                                    <InputError message={errors.bio} />
                                    <span className="text-sm text-gray-500">
                                        {data.bio.length}/500 characters
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Professional Information */}
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="border-b bg-gray-50/50">
                            <CardTitle className="flex items-center gap-2 text-blue-700">
                                <Briefcase className="w-5 h-5" />
                                Professional Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <Label htmlFor="job_title" className="text-gray-700">Job Title</Label>
                                    <Input
                                        id="job_title"
                                        name="job_title"
                                        type="text"
                                        value={data.job_title}
                                        onChange={(e) => setData('job_title', e.target.value)}
                                        placeholder="e.g., Frontend Developer"
                                        className="focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <InputError message={errors.job_title} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="company" className="text-gray-700">Company</Label>
                                    <Input
                                        id="company"
                                        name="company"
                                        type="text"
                                        value={data.company}
                                        onChange={(e) => setData('company', e.target.value)}
                                        placeholder="Where you currently work"
                                        className="focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <InputError message={errors.company} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="location" className="flex items-center text-gray-700">
                                    <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                                    Location
                                </Label>
                                <Input
                                    id="location"
                                    name="location"
                                    type="text"
                                    value={data.location}
                                    onChange={(e) => setData('location', e.target.value)}
                                    placeholder="City, Country"
                                    className="focus:ring-blue-500 focus:border-blue-500"
                                />
                                <InputError message={errors.location} />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Skills */}
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="border-b bg-gray-50/50">
                            <CardTitle className="text-blue-700">Skills & Technologies</CardTitle>
                            <p className="text-sm text-gray-600">
                                Add your technical skills to help others find you
                            </p>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-6">
                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <Label htmlFor="skill-input" className="sr-only">
                                        Add a new skill
                                    </Label>
                                    <Input
                                        id="skill-input"
                                        type="text"
                                        value={skillInput}
                                        onChange={(e) => setSkillInput(e.target.value)}
                                        placeholder="Add a skill (e.g., React, Python, UI/UX)"
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                addSkill();
                                            }
                                        }}
                                        aria-label="Enter a new skill"
                                        className="focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <Button
                                    type="button"
                                    onClick={addSkill}
                                    variant="outline"
                                    aria-label="Add skill"
                                    className="hover:bg-blue-50 hover:text-blue-600"
                                >
                                    <Plus className="w-4 h-4" />
                                </Button>
                            </div>

                            {data.skills.length > 0 && (
                                <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg">
                                    {data.skills.map((skill) => (
                                        <Badge
                                            key={skill}
                                            variant="secondary"
                                            className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                                        >
                                            {skill}
                                            <button
                                                type="button"
                                                onClick={() => removeSkill(skill)}
                                                className="ml-1 hover:text-red-600 transition-colors"
                                                aria-label={`Remove ${skill} from skills`}
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                            )}

                            <InputError message={errors.skills} />
                        </CardContent>
                    </Card>

                    {/* Social Links */}
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="border-b bg-gray-50/50">
                            <CardTitle className="text-blue-700">Social Links</CardTitle>
                            <p className="text-sm text-gray-600">
                                Connect your social profiles to showcase your work
                            </p>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-8">
                            <div className="space-y-2">
                                <Label htmlFor="portfolio_url" className="flex items-center text-gray-700">
                                    <Globe className="w-4 h-4 mr-2 text-gray-500" />
                                    Portfolio Website
                                </Label>
                                <Input
                                    id="portfolio_url"
                                    name="portfolio_url"
                                    type="url"
                                    value={data.portfolio_url}
                                    onChange={(e) => setData('portfolio_url', e.target.value)}
                                    placeholder="https://your-portfolio.com"
                                    className="focus:ring-blue-500 focus:border-blue-500"
                                />
                                <InputError message={errors.portfolio_url} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <Label htmlFor="github_username" className="flex items-center text-gray-700">
                                        <Github className="w-4 h-4 mr-2 text-gray-500" />
                                        GitHub Username
                                    </Label>
                                    <Input
                                        id="github_username"
                                        name="github_username"
                                        type="text"
                                        value={data.github_username}
                                        onChange={(e) => setData('github_username', e.target.value)}
                                        placeholder="github-username"
                                        className="focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <InputError message={errors.github_username} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="twitter_handle" className="flex items-center text-gray-700">
                                        <Twitter className="w-4 h-4 mr-2 text-gray-500" />
                                        Twitter Handle
                                    </Label>
                                    <Input
                                        id="twitter_handle"
                                        name="twitter_handle"
                                        type="text"
                                        value={data.twitter_handle}
                                        onChange={(e) => setData('twitter_handle', e.target.value)}
                                        placeholder="twitter_handle"
                                        className="focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <InputError message={errors.twitter_handle} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Availability */}
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="border-b bg-gray-50/50">
                            <CardTitle className="text-blue-700">Availability</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="flex items-center space-x-3">
                                <input
                                    title="I'm available for hire or freelance opportunities"
                                    type="checkbox"
                                    id="is_available_for_hire"
                                    name="is_available_for_hire"
                                    checked={data.is_available_for_hire}
                                    onChange={(e) => setData('is_available_for_hire', e.target.checked)}
                                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    aria-describedby="availability-description"
                                />
                                <Label htmlFor="is_available_for_hire" className="font-medium text-gray-700">
                                    I'm available for hire or freelance opportunities
                                </Label>
                            </div>
                            <p id="availability-description" className="text-sm text-gray-500 mt-3 ml-8">
                                This will show a badge on your profile and make you discoverable in hiring searches
                            </p>
                        </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-8 border-t">
                        <Link href={`/users/${user.id}`}>
                            <Button variant="outline" type="button" className="hover:bg-gray-100 transition-colors">
                                <Eye className="w-4 h-4 mr-2" />
                                Preview Profile
                            </Button>
                        </Link>

                        <div className="flex gap-4">
                            <Link href={`/users/${user.id}`}>
                                <Button variant="ghost" type="button" className="hover:bg-gray-100 transition-colors">
                                    Cancel
                                </Button>
                            </Link>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 hover:bg-blue-700 transition-colors"
                            >
                                {processing ? (
                                    <>
                                        <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Changes
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
