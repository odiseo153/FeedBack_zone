<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FeedController extends Controller
{
    public function index(Request $request)
    {
        $query = Project::with(['user', 'tags', 'ratings'])
            ->published()
            ->withCount(['comments', 'ratings'])
            ->orderBy('created_at', 'desc');

        // Filter by project type
        if ($request->has('type') && $request->type !== 'all') {
            $query->byType($request->type);
        }

        // Filter by tags
        if ($request->has('tags') && !empty($request->tags)) {
            $tags = is_array($request->tags) ? $request->tags : explode(',', $request->tags);
            $query->whereHas('tags', function ($q) use ($tags) {
                $q->whereIn('slug', $tags);
            });
        }

        // Search functionality
        if ($request->has('search') && !empty($request->search)) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhereHas('user', function ($userQuery) use ($search) {
                      $userQuery->where('name', 'like', "%{$search}%");
                  })
                  ->orWhereHas('tags', function ($tagQuery) use ($search) {
                      $tagQuery->where('name', 'like', "%{$search}%");
                  });
            });
        }

        // Sorting options
        if ($request->has('sort')) {
            switch ($request->sort) {
                case 'popular':
                    $query->orderBy('likes_count', 'desc')
                          ->orderBy('comments_count', 'desc');
                    break;
                case 'rating':
                    $query->withAvg('ratings as average_rating', 'overall_score')
                          ->orderBy('average_rating', 'desc');
                    break;
                case 'oldest':
                    $query->orderBy('created_at', 'asc');
                    break;
                default:
                    $query->orderBy('created_at', 'desc');
            }
        }

        $projects = $query->paginate(12)->withQueryString();

        // Get available tags for filtering
        $availableTags = Tag::popular()
            ->byType('technology')
            ->limit(20)
            ->get(['name', 'slug', 'color']);

        // Get project type counts for filter tabs
        $projectTypeCounts = [
            'all' => Project::published()->count(),
            'web' => Project::published()->byType('web')->count(),
            'mobile' => Project::published()->byType('mobile')->count(),
            'design' => Project::published()->byType('design')->count(),
            'backend' => Project::published()->byType('backend')->count(),
            'fullstack' => Project::published()->byType('fullstack')->count(),
        ];

        return Inertia::render('Feed', [
            'projects' => $projects,
            'availableTags' => $availableTags,
            'projectTypeCounts' => $projectTypeCounts,
            'filters' => [
                'type' => $request->type ?? 'all',
                'tags' => $request->tags ?? [],
                'search' => $request->search ?? '',
                'sort' => $request->sort ?? 'newest',
            ],
        ]);
    }

    public function featured()
    {
        $projects = Project::with(['user', 'tags', 'ratings'])
            ->published()
            ->featured()
            ->withCount(['comments', 'ratings'])
            ->orderBy('created_at', 'desc')
            ->paginate(12);

        return Inertia::render('Feed', [
            'projects' => $projects,
            'title' => 'Featured Projects',
            'isFeatured' => true,
        ]);
    }
}
