<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserProfileController extends Controller
{
    /**
     * Display a user's public profile
     */
    public function show(User $user, Request $request)
    {
        // Load user relationships
        $user->load(['projects' => function ($query) {
            $query->published()
                ->with(['tags'])
                ->orderBy('created_at', 'desc')
                ->limit(4); // Just for preview in overview tab
        }]);

        // Get paginated projects for the projects tab
        $projectsQuery = $user->projects()
            ->published()
            ->with(['tags', 'user'])
            ->withCount(['comments', 'ratings']);

        // Add average rating calculation
        $projectsQuery->withAvg('ratings as average_rating', 'overall_score');

        // Filter by project type if specified
        if ($request->has('type') && $request->type !== 'all') {
            $projectsQuery->where('project_type', $request->type);
        }

        // Sort options
        switch ($request->get('sort', 'newest')) {
            case 'popular':
                $projectsQuery->orderBy('likes_count', 'desc')
                      ->orderBy('comments_count', 'desc');
                break;
            case 'rating':
                $projectsQuery->orderBy('average_rating', 'desc');
                break;
            case 'views':
                $projectsQuery->orderBy('views_count', 'desc');
                break;
            default:
                $projectsQuery->orderBy('created_at', 'desc');
        }

        $projects = $projectsQuery->paginate(12)->withQueryString();

        // Calculate comprehensive user statistics
        $userProjects = $user->projects()->published();

        $stats = [
            'total_views' => $userProjects->sum('views_count'),
            'total_likes' => $userProjects->sum('likes_count'),
            'total_comments_received' => $userProjects->withCount('comments')->get()->sum('comments_count'),
            'average_rating' => $userProjects->with('ratings')->get()->flatMap->ratings->avg('overall_score') ?: 0,
            'total_ratings_received' => $userProjects->withCount('ratings')->get()->sum('ratings_count'),
            'projects_count' => $userProjects->count(),
            'comments_given' => $user->comments()->count(),
        ];

        // Round the average rating to 2 decimal places
        $stats['average_rating'] = round($stats['average_rating'], 2);

        return Inertia::render('Profile/Show', [
            'user' => $user,
            'projects' => [
                'data' => $projects->items(),
                //'links' => $projects->linkCollection()->toArray()['data'],
                'meta' => [
                    'current_page' => $projects->currentPage(),
                    'total' => $projects->total(),
                    'per_page' => $projects->perPage(),
                    'from' => $projects->firstItem(),
                    'to' => $projects->lastItem(),
                ],
            ],
            'stats' => $stats,
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }

    /**
     * Show form to edit profile
     */
    public function edit()
    {
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        return Inertia::render('Profile/Edit', [
            'user' => Auth::user(),
        ]);
    }

    /**
     * Update user profile
     */
    public function update(Request $request)
    {
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        $user = Auth::user();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'nullable|string|max:255|unique:users,username,' . $user->id,
            'bio' => 'nullable|string|max:500',
            'github_username' => 'nullable|string|max:255',
            'portfolio_url' => 'nullable|url|max:255',
            'twitter_handle' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'job_title' => 'nullable|string|max:255',
            'company' => 'nullable|string|max:255',
            'skills' => 'nullable|array',
            'skills.*' => 'string|max:100',
            'is_available_for_hire' => 'boolean',
            'avatar' => 'nullable|image|max:2048',
        ]);

        // Handle avatar upload
        if ($request->hasFile('avatar')) {
            // Delete old avatar if exists
            if ($user->avatar) {
                Storage::disk('public')->delete($user->avatar);
            }
            $validated['avatar'] = $request->file('avatar')->store('avatars', 'public');
        }

        $user->update($validated);

        return redirect()->route('profile.show', $user)
            ->with('success', 'Profile updated successfully!');
    }

    /**
     * Follow a user
     */
    public function follow(User $user)
    {
        if (!Auth::check()) {
            return response()->json(['error' => 'Authentication required'], 401);
        }

        $currentUser = Auth::user();

        // Prevent self-following
        if ($currentUser->id === $user->id) {
            return response()->json(['error' => 'Cannot follow yourself'], 422);
        }

        // Check if already following
        if ($currentUser->isFollowing($user)) {
            return response()->json(['error' => 'Already following this user'], 422);
        }

        $currentUser->follow($user);

        return response()->json([
            'following' => true,
            'followers_count' => $user->followers()->count(),
        ]);
    }

    /**
     * Unfollow a user
     */
    public function unfollow(User $user)
    {
        if (!Auth::check()) {
            return response()->json(['error' => 'Authentication required'], 401);
        }

        $currentUser = Auth::user();

        // Check if currently following
        if (!$currentUser->isFollowing($user)) {
            return response()->json(['error' => 'Not currently following this user'], 422);
        }

        $currentUser->unfollow($user);

        return response()->json([
            'following' => false,
            'followers_count' => $user->followers()->count(),
        ]);
    }

    /**
     * Get user's projects with filtering (AJAX endpoint)
     */
    public function projects(User $user, Request $request)
    {
        $query = $user->projects()
            ->published()
            ->with(['tags', 'user'])
            ->withCount(['comments', 'ratings'])
            ->withAvg('ratings as average_rating', 'overall_score');

        // Filter by project type
        if ($request->has('type') && $request->type !== 'all') {
            $query->where('project_type', $request->type);
        }

        // Sort options
        switch ($request->get('sort', 'newest')) {
            case 'popular':
                $query->orderBy('likes_count', 'desc')
                      ->orderBy('comments_count', 'desc');
                break;
            case 'rating':
                $query->orderBy('average_rating', 'desc');
                break;
            case 'views':
                $query->orderBy('views_count', 'desc');
                break;
            default:
                $query->orderBy('created_at', 'desc');
        }

        $projects = $query->paginate(12)->withQueryString();

        return response()->json([
            'projects' => [
                'data' => $projects->items(),
                'links' => $projects->linkCollection()->toArray()['data'],
                'meta' => [
                    'current_page' => $projects->currentPage(),
                    'total' => $projects->total(),
                    'per_page' => $projects->perPage(),
                    'from' => $projects->firstItem(),
                    'to' => $projects->lastItem(),
                ],
            ],
        ]);
    }

    /**
     * Get users directory with search and filtering
     */
    public function directory(Request $request)
    {
        $query = User::where('email_verified_at', '!=', null)
            ->withCount(['projects' => function ($q) {
                $q->published();
            }]);

        // Search functionality
        if ($request->has('search') && !empty($request->search)) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('username', 'like', "%{$search}%")
                  ->orWhere('bio', 'like', "%{$search}%")
                  ->orWhere('job_title', 'like', "%{$search}%")
                  ->orWhere('company', 'like', "%{$search}%")
                  ->orWhereJsonContains('skills', $search);
            });
        }

        // Filter by availability for hire
        if ($request->boolean('available_for_hire')) {
            $query->where('is_available_for_hire', true);
        }

        // Filter by location
        if ($request->has('location') && !empty($request->location)) {
            $query->where('location', 'like', "%{$request->location}%");
        }

        // Sort options
        switch ($request->get('sort', 'reputation')) {
            case 'projects':
                $query->orderBy('projects_count', 'desc');
                break;
            case 'newest':
                $query->orderBy('created_at', 'desc');
                break;
            default:
                $query->orderBy('reputation_score', 'desc');
        }

        $users = $query->paginate(24)->withQueryString();

        return Inertia::render('Profile/Directory', [
            'users' => $users,
            'filters' => [
                'search' => $request->search ?? '',
                'available_for_hire' => $request->boolean('available_for_hire'),
                'location' => $request->location ?? '',
                'sort' => $request->sort ?? 'reputation',
            ],
        ]);
    }
}
