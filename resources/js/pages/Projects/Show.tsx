import { useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
    ArrowLeft, Github, ExternalLink, Eye, Heart, MessageCircle, Star,
    Edit, Send, ThumbsUp, Calendar
} from 'lucide-react';
import { Project } from '@/types';
import { SharedData } from '@/types';


// Star rating component
function StarRating({ rating, onRatingChange, readonly = false }: {
    rating: number;
    onRatingChange?: (rating: number) => void;
    readonly?: boolean;
}) {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Button
                    key={star}
                    type="button"
                    onClick={() => !readonly && onRatingChange?.(star)}
                    className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform`}
                    disabled={readonly}
                >
                    <Star
                        className={`w-5 h-5 ${
                            star <= rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                        }`}
                    />
                </Button>
            ))}
        </div>
    );
}

export default function ShowProject({ project }: { project: Project }) {
    const { auth } = usePage<SharedData>().props;

    const [activeTab, setActiveTab] = useState('overview');
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [showRatingForm, setShowRatingForm] = useState(false);

    console.log(project.user);
    const { data: commentData, setData: setCommentData, post: postComment, processing: commentProcessing, reset: resetComment } = useForm({
        content: '',
        type: 'feedback',
    });

    const { data: ratingData, setData: setRatingData, post: postRating, processing: ratingProcessing, reset: resetRating } = useForm({
        ui_ux_score: 0,
        performance_score: 0,
        code_quality_score: 0,
        innovation_score: 0,
        overall_score: 0,
        review_comment: '',
    });

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        postComment(route('comments.store'), {
            data: {
                ...commentData,
                project_id: project.id,
            },
            onSuccess: () => {
                resetComment();
                setShowCommentForm(false);
            },
        });
    };

    const handleRatingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        postRating(route('ratings.store'), {
            data: {
                ...ratingData,
                project_id: project.id,
            },
            onSuccess: () => {
                resetRating();
                setShowRatingForm(false);
            },
        });
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getInitials = (name: string) => {
        if (!name) return '';
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    return (
        <AppLayout>
            <Head title={project.title} />

            <div className="  px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Button */}
                <div className="mb-6">
                    <Link href="/feed">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Feed
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <Card className="mb-8">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h1 className="text-4xl font-bold text-gray-900 mb-2">{project.title}</h1>
                                        <div className="flex items-center gap-4 text-gray-600 mb-4">
                                            <Link
                                                href={`/users/${project.user?.id}`}
                                                className="flex items-center gap-2 hover:text-blue-600"
                                            >
                                                <Avatar className="w-6 h-6">
                                                    <AvatarImage src={project.user?.avatar_url} />
                                                    <AvatarFallback className="text-xs">
                                                        {getInitials(project.user?.name)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                {project.user?.name}
                                            </Link>
                                            <span>•</span>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                {formatDate(project.created_at)}
                                            </div>
                                        </div>
                                    </div>

                                    {auth.user?.id === project.user?.id && (
                                        <div className="flex gap-2">
                                            <Link href={route('projects.edit', project.id)}>
                                                <Button variant="outline" size="sm">
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                {/* Project Image */}
                                {project.thumbnail_url && (
                                    <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 mb-6">
                                        <img
                                            src={project.thumbnail_url}
                                            alt={project.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}

                                {/* Action Links */}
                                <div className="flex items-center gap-4 mb-6">
                                    {project.live_url && (
                                        <a
                                            href={project.live_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            Live Demo
                                        </a>
                                    )}
                                    {project.github_url && (
                                        <a
                                            href={project.github_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
                                        >
                                            <Github className="w-4 h-4" />
                                            Source Code
                                        </a>
                                    )}
                                </div>

                                {/* Stats */}
                                <div className="flex items-center gap-6 text-sm text-gray-600">
                                    <div className="flex items-center gap-1">
                                        <Eye className="w-4 h-4" />
                                        {project.views_count} views
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Heart className="w-4 h-4" />
                                        {project.likes_count} likes
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MessageCircle className="w-4 h-4" />
                                        {project.comments_count} comments
                                    </div>
                                    {project.average_rating && (
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            {project.average_rating.toFixed(1)} ({project.ratings_count} ratings)
                                        </div>
                                    )}
                                </div>
                            </CardHeader>

                            <CardContent>
                                <Tabs value={activeTab} onValueChange={setActiveTab}>
                                    <TabsList className="mb-6">
                                        <TabsTrigger value="overview">Overview</TabsTrigger>
                                        <TabsTrigger value="comments">Comments ({project.comments_count})</TabsTrigger>
                                        <TabsTrigger value="ratings">Ratings ({project.ratings_count})</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="overview" className="space-y-6">
                                        <div>
                                            <h3 className="text-lg font-semibold mb-3">Description</h3>
                                            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                                {project.description}
                                            </p>
                                        </div>

                                        {project.feedback_request && (
                                            <div>
                                                <h3 className="text-lg font-semibold mb-3">Feedback Request</h3>
                                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                                    <p className="text-gray-700">{project.feedback_request}</p>
                                                </div>
                                            </div>
                                        )}

                                        {project.tech_stack && project.tech_stack.length > 0 && (
                                            <div>
                                                <h3 className="text-lg font-semibold mb-3">Tech Stack</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.tech_stack.map((tech) => (
                                                        <Badge key={tech} variant="secondary">
                                                            {tech}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </TabsContent>

                                    <TabsContent value="comments" className="space-y-6">
                                        {auth.user && (
                                            <div className="border-b pb-6 mb-6">
                                                {!showCommentForm ? (
                                                    <Button onClick={() => setShowCommentForm(true)}>
                                                        <MessageCircle className="w-4 h-4 mr-2" />
                                                        Add Comment
                                                    </Button>
                                                ) : (
                                                    <form onSubmit={handleCommentSubmit} className="space-y-4">
                                                        <div>
                                                            <Label htmlFor="comment">Your Comment</Label>
                                                            <Textarea
                                                                id="comment"
                                                                value={commentData.content}
                                                                onChange={(e) => setCommentData('content', e.target.value)}
                                                                placeholder="Share your thoughts, suggestions, or questions..."
                                                                rows={4}
                                                                required
                                                            />
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <Button type="submit" disabled={commentProcessing}>
                                                                <Send className="w-4 h-4 mr-2" />
                                                                {commentProcessing ? 'Posting...' : 'Post Comment'}
                                                            </Button>
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                onClick={() => {
                                                                    setShowCommentForm(false);
                                                                    resetComment();
                                                                }}
                                                            >
                                                                Cancel
                                                            </Button>
                                                        </div>
                                                    </form>
                                                )}
                                            </div>
                                        )}

                                        {project.comments && project.comments.length > 0 ? (
                                            <div className="space-y-6">
                                                {project.comments.map((comment) => (
                                                    <div key={comment.id} className="border rounded-lg p-4">
                                                        <div className="flex items-start gap-3">
                                                            <Avatar className="w-8 h-8 flex-shrink-0">
                                                                <AvatarImage src={comment.user?.avatar_url} />
                                                                <AvatarFallback className="text-sm">
                                                                    {getInitials(comment.user?.name)}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-2 mb-2">
                                                                    <Link
                                                                        href={`/users/${comment.user?.id}`}
                                                                        className="font-medium text-gray-900 hover:text-blue-600"
                                                                    >
                                                                        {comment.user?.name}
                                                                    </Link>
                                                                    <Badge variant="outline" className="text-xs">
                                                                        {comment.type}
                                                                    </Badge>
                                                                    <span className="text-sm text-gray-500">
                                                                        {formatDate(comment.created_at)}
                                                                    </span>
                                                                </div>
                                                                <p className="text-gray-700 mb-3">{comment.content}</p>
                                                                <div className="flex items-center gap-4">
                                                                    <Button variant="ghost" size="sm">
                                                                        <ThumbsUp className="w-4 h-4 mr-1" />
                                                                        {comment.likes_count}
                                                                    </Button>
                                                                    <Button variant="ghost" size="sm">
                                                                        Reply
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-8">
                                                <MessageCircle className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                                                <h3 className="text-lg font-medium text-gray-900 mb-2">No comments yet</h3>
                                                <p className="text-gray-600">Be the first to share your thoughts!</p>
                                            </div>
                                        )}
                                    </TabsContent>

                                    <TabsContent value="ratings" className="space-y-6">
                                        {auth.user && auth.user?.id !== project.user?.id && (
                                            <div className="border-b pb-6 mb-6">
                                                {!showRatingForm ? (
                                                    <Button onClick={() => setShowRatingForm(true)}>
                                                        <Star className="w-4 h-4 mr-2" />
                                                        Rate This Project
                                                    </Button>
                                                ) : (
                                                    <form onSubmit={handleRatingSubmit} className="space-y-4">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <div>
                                                                <label className="block text-sm font-medium mb-2">
                                                                    UI/UX Design
                                                                </label>
                                                                <StarRating
                                                                    rating={ratingData.ui_ux_score}
                                                                    onRatingChange={(rating) => setRatingData('ui_ux_score', rating)}
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium mb-2">
                                                                    Performance
                                                                </label>
                                                                <StarRating
                                                                    rating={ratingData.performance_score}
                                                                    onRatingChange={(rating) => setRatingData('performance_score', rating)}
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium mb-2">
                                                                    Code Quality
                                                                </label>
                                                                <StarRating
                                                                    rating={ratingData.code_quality_score}
                                                                    onRatingChange={(rating) => setRatingData('code_quality_score', rating)}
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium mb-2">
                                                                    Innovation
                                                                </label>
                                                                <StarRating
                                                                    rating={ratingData.innovation_score}
                                                                    onRatingChange={(rating) => setRatingData('innovation_score', rating)}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium mb-2">
                                                                Overall Rating *
                                                            </label>
                                                            <StarRating
                                                                rating={ratingData.overall_score}
                                                                onRatingChange={(rating) => setRatingData('overall_score', rating)}
                                                            />
                                                        </div>

                                                        <div>
                                                            <Label htmlFor="review">Review Comment (Optional)</Label>
                                                            <Textarea
                                                                id="review"
                                                                value={ratingData.review_comment}
                                                                onChange={(e) => setRatingData('review_comment', e.target.value)}
                                                                placeholder="Share your detailed thoughts about this project..."
                                                                rows={3}
                                                            />
                                                        </div>

                                                        <div className="flex gap-2">
                                                            <Button type="submit" disabled={ratingProcessing || ratingData.overall_score === 0}>
                                                                {ratingProcessing ? 'Submitting...' : 'Submit Rating'}
                                                            </Button>
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                onClick={() => {
                                                                    setShowRatingForm(false);
                                                                    resetRating();
                                                                }}
                                                            >
                                                                Cancel
                                                            </Button>
                                                        </div>
                                                    </form>
                                                )}
                                            </div>
                                        )}

                                        {project.ratings && project.ratings.length > 0 ? (
                                            <div className="space-y-6">
                                                {project.ratings.map((rating) => (
                                                    <div key={rating.id} className="border rounded-lg p-4">
                                                        <div className="flex items-start gap-3">
                                                            <Avatar className="w-8 h-8 flex-shrink-0">
                                                                <AvatarImage src={rating.user?.avatar_url} />
                                                                <AvatarFallback className="text-sm">
                                                                    {getInitials(rating.user?.name)}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-2 mb-2">
                                                                    <Link
                                                                        href={`/users/${rating.user?.id}`}
                                                                        className="font-medium text-gray-900 hover:text-blue-600"
                                                                    >
                                                                        {rating.user?.name}
                                                                    </Link>
                                                                    <span className="text-sm text-gray-500">
                                                                        {formatDate(rating.created_at)}
                                                                    </span>
                                                                </div>

                                                                <div className="flex items-center gap-2 mb-3">
                                                                    <StarRating rating={rating.overall_score} readonly />
                                                                    <span className="text-sm font-medium">
                                                                        {rating.overall_score}/5
                                                                    </span>
                                                                </div>

                                                                {rating.review_comment && (
                                                                    <p className="text-gray-700 mb-3">{rating.review_comment}</p>
                                                                )}

                                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-600">
                                                                    {rating.ui_ux_score && (
                                                                        <div>UI/UX: {rating.ui_ux_score}/5</div>
                                                                    )}
                                                                    {rating.performance_score && (
                                                                        <div>Performance: {rating.performance_score}/5</div>
                                                                    )}
                                                                    {rating.code_quality_score && (
                                                                        <div>Code Quality: {rating.code_quality_score}/5</div>
                                                                    )}
                                                                    {rating.innovation_score && (
                                                                        <div>Innovation: {rating.innovation_score}/5</div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-8">
                                                <Star className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                                                <h3 className="text-lg font-medium text-gray-900 mb-2">No ratings yet</h3>
                                                <p className="text-gray-600">Be the first to rate this project!</p>
                                            </div>
                                        )}
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Project Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Project Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h4 className="text-sm font-medium mb-2">Type</h4>
                                    <Badge variant="secondary">{project.project_type}</Badge>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium mb-2">Status</h4>
                                    <Badge
                                        variant={project.status === 'published' ? 'default' : 'secondary'}
                                    >
                                        {project.status}
                                    </Badge>
                                </div>

                                {project.average_rating && (
                                    <div>
                                        <h4 className="text-sm font-medium mb-2">Average Rating</h4>
                                        <div className="flex items-center gap-2">
                                            <StarRating rating={Math.round(project.average_rating)} readonly />
                                            <span className="text-sm text-gray-600">
                                                {project.average_rating.toFixed(1)} ({project.ratings_count} ratings)
                                            </span>
                                        </div>
                                    </div>
                                )}

                                <Separator />

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Views</span>
                                        <span className="font-medium">{project.views_count.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Likes</span>
                                        <span className="font-medium">{project.likes_count}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Comments</span>
                                        <span className="font-medium">{project.comments_count}</span>
                                    </div>
                                </div>

                                {project.tags.length > 0 && (
                                    <div>
                                        <h4 className="text-sm font-medium mb-2">Tags</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map((tag) => (
                                                <Badge
                                                    key={tag.id}
                                                    style={{ backgroundColor: tag.color + '20', color: tag.color }}
                                                >
                                                    {tag.name}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Author Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>About the Author</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Link
                                    href={`/users/${project.user?.id}`}
                                    className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                                >
                                    <Avatar className="w-12 h-12">
                                        <AvatarImage src={project.user?.avatar_url} />
                                        <AvatarFallback>
                                            {getInitials(project.user?.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <div className="font-medium text-gray-900">{project.user?.name}</div>
                                        {project.user?.job_title && (
                                            <div className="text-sm text-gray-600">{project.user?.job_title}</div>
                                        )}
                                        <div className="text-sm text-gray-500">
                                            {project.user?.reputation_score} reputation points
                                        </div>
                                    </div>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
