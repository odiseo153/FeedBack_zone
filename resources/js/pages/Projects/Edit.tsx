import { useState, FormEvent, useEffect } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Upload, X, Github, ExternalLink, Plus, Trash2 } from 'lucide-react';
import InputError from '@/components/input-error';
import { Textarea } from '@/components/ui/textarea';

interface Tag {
    id: number;
    name: string;
    slug: string;
    color: string;
    type: string;
}

interface Project {
    id: number;
    title: string;
    description: string;
    github_url?: string;
    live_url?: string;
    thumbnail_url?: string;
    project_type: string;
    feedback_request?: string;
    status: string;
    tech_stack?: string[];
    created_at: string;
    updated_at: string;
    user: {
        id: number;
        name: string;
    };
    tags: Tag[];
}

interface EditProjectProps {
    project: Project;
    tags: Tag[];
}

const projectTypes = [
    { value: 'web', label: 'Web Application' },
    { value: 'mobile', label: 'Mobile App' },
    { value: 'design', label: 'UI/UX Design' },
    { value: 'backend', label: 'Backend/API' },
    { value: 'fullstack', label: 'Full Stack' },
    { value: 'other', label: 'Other' }
];

export default function EditProject({ project, tags }: EditProjectProps) {
    const [selectedTags, setSelectedTags] = useState<number[]>([]);
    const [techStack, setTechStack] = useState<string[]>([]);
    const [newTech, setNewTech] = useState('');
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
    const [isDraft, setIsDraft] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        title: project.title,
        description: project.description,
        github_url: project.github_url || '',
        live_url: project.live_url || '',
        thumbnail: null as File | null,
        feedback_request: project.feedback_request || '',
        project_type: project.project_type,
        tech_stack: project.tech_stack || [],
        tags: project.tags.map(tag => tag.id),
        status: project.status,
        _method: 'PUT',
    });

    // Initialize form data when component mounts
    useEffect(() => {
        setSelectedTags(project.tags.map(tag => tag.id));
        setTechStack(project.tech_stack || []);
        setIsDraft(project.status === 'draft');
        setThumbnailPreview(project.thumbnail_url || null);
    }, [project]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        // Update form data with current selections
        setData({
            ...data,
            tech_stack: techStack,
            tags: selectedTags,
            status: isDraft ? 'draft' : 'published',
        });

console.log(data);
        post(route('projects.update', project.id), {
            preserveScroll: true,
            onSuccess: () => {
                // Don't reset form on success for edit
            },
        });
    };

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('thumbnail', file);

            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setThumbnailPreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeThumbnail = () => {
        setData('thumbnail', null);
        setThumbnailPreview(project.thumbnail_url || null);
        // Reset file input
        const fileInput = document.getElementById('thumbnail') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
    };

    const toggleTag = (tagId: number) => {
        setSelectedTags(prev =>
            prev.includes(tagId)
                ? prev.filter(id => id !== tagId)
                : [...prev, tagId]
        );
    };

    const addTechToStack = () => {
        if (newTech.trim() && !techStack.includes(newTech.trim())) {
            setTechStack(prev => [...prev, newTech.trim()]);
            setNewTech('');
        }
    };

    const removeTechFromStack = (tech: string) => {
        setTechStack(prev => prev.filter(t => t !== tech));
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTechToStack();
        }
    };

    // Group tags by type
const groupedTags = project.tags.reduce((acc, tag) => {
    if (!acc[tag.type]) {
        acc[tag.type] = [];
    }
    acc[tag.type].push(tag);
    return acc;
}, {} as Record<string, Tag[]>);


    return (
        <AppLayout>
            <Head title={`Edit ${project.title}`} />

            <div className=" px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link href={route('projects.show', project.id)}>
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Project
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Edit Project</h1>
                        <p className="text-gray-600 mt-1">
                            Update your project details and settings
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Project Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Title */}
                            <div>
                                <Label htmlFor="title">Project Title *</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Give your project a catchy title"
                                    className="mt-1"
                                />
                                <InputError message={errors.title} className="mt-1" />
                            </div>

                            {/* Description */}
                            <div>
                                <Label htmlFor="description">Description *</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Describe your project, what it does, and what makes it special..."
                                    rows={4}
                                    className="mt-1"
                                />
                                <InputError message={errors.description} className="mt-1" />
                            </div>

                            {/* Project Type */}
                            <div>
                                <Label htmlFor="project_type">Project Type *</Label>
                                <Select
                                    value={data.project_type}
                                    onValueChange={(value) => setData('project_type', value)}
                                >
                                    <SelectTrigger className="mt-1">
                                        <SelectValue placeholder="Select project type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {projectTypes.map((type) => (
                                            <SelectItem key={type.value} value={type.value}>
                                                {type.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.project_type} className="mt-1" />
                            </div>

                            {/* URLs */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="live_url">Live Demo URL</Label>
                                    <div className="relative mt-1">
                                        <ExternalLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <Input
                                            id="live_url"
                                            type="url"
                                            value={data.live_url}
                                            onChange={(e) => setData('live_url', e.target.value)}
                                            placeholder="https://your-project.com"
                                            className="pl-10"
                                        />
                                    </div>
                                    <InputError message={errors.live_url} className="mt-1" />
                                </div>

                                <div>
                                    <Label htmlFor="github_url">GitHub Repository</Label>
                                    <div className="relative mt-1">
                                        <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <Input
                                            id="github_url"
                                            type="url"
                                            value={data.github_url}
                                            onChange={(e) => setData('github_url', e.target.value)}
                                            placeholder="https://github.com/username/repo"
                                            className="pl-10"
                                        />
                                    </div>
                                    <InputError message={errors.github_url} className="mt-1" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Thumbnail */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Project Thumbnail</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {!thumbnailPreview ? (
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <div className="space-y-2">
                                        <p className="text-lg font-medium text-gray-700">
                                            Upload a thumbnail image
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            PNG, JPG up to 2MB. Recommended: 1200x630px
                                        </p>
                                        <div className="mt-4">
                                            <Label htmlFor="thumbnail" className="cursor-pointer">
                                                <Button type="button" variant="outline" asChild>
                                                    <span>Choose File</span>
                                                </Button>
                                                <Input
                                                    id="thumbnail"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleThumbnailChange}
                                                    className="hidden"
                                                />
                                            </Label>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative">
                                    <img
                                        src={thumbnailPreview}
                                        alt="Thumbnail preview"
                                        className="w-full h-64 object-cover rounded-lg"
                                    />
                                    <div className="absolute top-2 right-2 flex gap-2">
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            onClick={removeThumbnail}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                            <InputError message={errors.thumbnail} className="mt-2" />
                        </CardContent>
                    </Card>

                    {/* Tech Stack */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Technology Stack</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="tech_stack">Add Technologies</Label>
                                <div className="flex gap-2 mt-1">
                                    <Input
                                        id="tech_stack"
                                        type="text"
                                        value={newTech}
                                        onChange={(e) => setNewTech(e.target.value)}
                                        placeholder="e.g., React, Node.js, PostgreSQL"
                                        onKeyPress={handleKeyPress}
                                    />
                                    <Button
                                        type="button"
                                        onClick={addTechToStack}
                                        disabled={!newTech.trim()}
                                    >
                                        <Plus className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            {techStack.length > 0 && (
                                <div>
                                    <Label>Selected Technologies</Label>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {techStack.map((tech) => (
                                            <Badge
                                                key={tech}
                                                variant="secondary"
                                                className="flex items-center gap-1"
                                            >
                                                {tech}
                                                <button
                                                    type="button"
                                                    onClick={() => removeTechFromStack(tech)}
                                                    className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                                                    aria-label={`Remove ${tech} from tech stack`}
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Tags */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Project Tags</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {Object.entries(groupedTags).map(([type, typeTags]) => (
                                <div key={type}>
                                    <Label className="text-sm font-medium capitalize mb-3 block">
                                        {type.replace('_', ' ')}
                                    </Label>
                                    <div className="flex flex-wrap gap-2">
                                        {typeTags.map((tag) => (
                                            <Badge
                                                key={tag.id}
                                                variant={selectedTags.includes(tag.id) ? "default" : "outline"}
                                                className="cursor-pointer hover:bg-gray-100"
                                                style={selectedTags.includes(tag.id) ? { backgroundColor: tag.color } : {}}
                                                onClick={() => toggleTag(tag.id)}
                                            >
                                                {tag.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Feedback Request */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Feedback Request</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <Label htmlFor="feedback_request">What kind of feedback are you looking for?</Label>
                                <Textarea
                                    id="feedback_request"
                                    value={data.feedback_request}
                                    onChange={(e) => setData('feedback_request', e.target.value)}
                                    placeholder="e.g., Looking for feedback on UI/UX design, code quality, performance optimization, or general thoughts..."
                                    rows={3}
                                    className="mt-1"
                                />
                                <InputError message={errors.feedback_request} className="mt-1" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="draft"
                                checked={isDraft}
                                onCheckedChange={(checked) => setIsDraft(checked === 'indeterminate' ? false : checked)}
                            />
                            <Label htmlFor="draft" className="text-sm">
                                Save as draft
                            </Label>
                        </div>

                        <div className="flex gap-4">
                            <Link href={route('projects.show', project.id)}>
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </Link>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Updating...' : isDraft ? 'Update Draft' : 'Update Project'}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
