<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Project::class, 'project');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = Project::with(['user', 'tags'])
            ->published()
            ->latest()
            ->paginate(12);

        return Inertia::render('Projects/Index', [
            'projects' => $projects,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $tags = Tag::orderBy('name')->get();

        return Inertia::render('Projects/Create', [
            'tags' => $tags,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'github_url' => 'nullable|url',
            'live_url' => 'nullable|url',
            'project_type' => 'required|in:web,mobile,design,backend,fullstack,other',
            'feedback_request' => 'nullable|string',
            'tech_stack' => 'nullable|array',
            'tech_stack.*' => 'string|max:50',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',
            'thumbnail' => 'nullable|image|max:2048',
            'status' => 'required|in:draft,published',
        ]);

        // Handle thumbnail upload
        if ($request->hasFile('thumbnail')) {
            $validated['thumbnail'] = $request->file('thumbnail')->store('project-thumbnails', 'public');
        }

        $project = Auth::user()->projects()->create($validated);

        // Attach tags
        if ($request->has('tags')) {
            $project->tags()->sync($request->tags);
        }

        return redirect()->route('projects.show', $project)
            ->with('success', 'Project created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $project->increment('views_count');

        $project->load([
            'user',
            'tags',
            'comments' => function ($query) {
                $query->with(['user', 'replies.user'])
                    ->whereNull('parent_id')
                    ->latest();
            },
            'ratings' => function ($query) {
                $query->with('user')->latest();
            },
        ]);

        return Inertia::render('Projects/Show', [
            'project' => $project
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        $tags = Tag::orderBy('name')->get() ?? [];

        return Inertia::render('Projects/Edit', props: [
            'project' => $project->load('tags'),
            'tags' => $tags,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'github_url' => 'nullable|url',
            'live_url' => 'nullable|url',
            'project_type' => 'required|in:web,mobile,design,backend,fullstack,other',
            'feedback_request' => 'nullable|string',
            'tech_stack' => 'nullable|array',
            'tech_stack.*' => 'string|max:50',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',
            'thumbnail' => 'nullable|file',
            'status' => 'required|in:draft,published',
        ]);


        // Handle thumbnail upload
        if ($request->hasFile('thumbnail')) {
            // Delete old thumbnail if exists
            if ($project->thumbnail) {
                Storage::disk('public')->delete($project->thumbnail);
            }
            $validated['thumbnail'] = $request->file('thumbnail')->store('project-thumbnails', 'public');
        }

        $project->update($validated);

        // Sync tags
        if ($request->has('tags')) {
            $project->tags()->sync($request->tags);
        }

        return redirect()->route('projects.show', $project)
            ->with('success', 'Project updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        // Delete thumbnail if exists
        if ($project->thumbnail) {
            Storage::disk('public')->delete($project->thumbnail);
        }

        $project->delete();

        return redirect()->route('projects.index')
            ->with('success', 'Project deleted successfully!');
    }

    /**
     * Toggle like/unlike for a project
     */
    public function toggleLike(Project $project)
    {
        if (!Auth::check()) {
            return response()->json(['error' => 'Authentication required'], 401);
        }

        $user = Auth::user();

        // Check if user already liked this project
        $existingLike = $project->likes()->where('user_id', $user->id)->first();

        if ($existingLike) {
            // Unlike the project
            $project->likes()->where('user_id', $user->id)->delete();
            $project->decrement('likes_count');
            $liked = false;
        } else {
            // Like the project
            $project->likes()->create(['user_id' => $user->id]);
            $project->increment('likes_count');
            $liked = true;
        }

        return response()->json([
            'liked' => $liked,
            'likes_count' => $project->fresh()->likes_count,
        ]);
    }
}
