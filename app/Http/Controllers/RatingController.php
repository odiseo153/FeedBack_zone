<?php

namespace App\Http\Controllers;

use App\Models\Rating;
use App\Models\Project;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'ui_ux_score' => 'nullable|integer|min:1|max:5',
            'performance_score' => 'nullable|integer|min:1|max:5',
            'code_quality_score' => 'nullable|integer|min:1|max:5',
            'innovation_score' => 'nullable|integer|min:1|max:5',
            'overall_score' => 'required|integer|min:1|max:5',
            'review_comment' => 'nullable|string|max:1000',
        ]);

        // Check if user already rated this project
        $existingRating = Rating::where('project_id', $validated['project_id'])
            ->where('user_id', auth()->id())
            ->first();

        if ($existingRating) {
            return response()->json([
                'success' => false,
                'message' => 'You have already rated this project. You can update your existing rating.',
            ], 409);
        }

        // Prevent users from rating their own projects
        $project = Project::find($validated['project_id']);
        if ($project->user_id === auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'You cannot rate your own project.',
            ], 403);
        }

        $rating = auth()->user()->ratings()->create($validated);
        $rating->load('user');

        return response()->json([
            'success' => true,
            'rating' => $rating,
            'message' => 'Rating submitted successfully!',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Rating $rating)
    {
        $this->authorize('update', $rating);

        $validated = $request->validate([
            'ui_ux_score' => 'nullable|integer|min:1|max:5',
            'performance_score' => 'nullable|integer|min:1|max:5',
            'code_quality_score' => 'nullable|integer|min:1|max:5',
            'innovation_score' => 'nullable|integer|min:1|max:5',
            'overall_score' => 'required|integer|min:1|max:5',
            'review_comment' => 'nullable|string|max:1000',
        ]);

        $rating->update($validated);
        $rating->load('user');

        return response()->json([
            'success' => true,
            'rating' => $rating,
            'message' => 'Rating updated successfully!',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Rating $rating)
    {
        $this->authorize('delete', $rating);

        $rating->delete();

        return response()->json([
            'success' => true,
            'message' => 'Rating deleted successfully!',
        ]);
    }

    /**
     * Get ratings for a specific project
     */
    public function getProjectRatings(Project $project)
    {
        $ratings = $project->ratings()
            ->with('user')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        // Calculate average scores
        $averages = [
            'ui_ux' => $project->ratings()->avg('ui_ux_score') ?? 0,
            'performance' => $project->ratings()->avg('performance_score') ?? 0,
            'code_quality' => $project->ratings()->avg('code_quality_score') ?? 0,
            'innovation' => $project->ratings()->avg('innovation_score') ?? 0,
            'overall' => $project->ratings()->avg('overall_score') ?? 0,
        ];

        $totalRatings = $project->ratings()->count();

        return response()->json([
            'ratings' => $ratings,
            'averages' => $averages,
            'total_ratings' => $totalRatings,
        ]);
    }

    /**
     * Get user's rating for a specific project
     */
    public function getUserRating(Project $project)
    {
        $rating = $project->ratings()
            ->where('user_id', auth()->id())
            ->first();

        return response()->json([
            'rating' => $rating,
        ]);
    }
}
