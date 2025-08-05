<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CommentController extends Controller
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
            'parent_id' => 'nullable|exists:comments,id',
            'content' => 'required|string|max:1000',
            'type' => ['nullable', Rule::in(['feedback', 'question', 'suggestion', 'praise'])],
        ]);

        $comment = auth()->user()->comments()->create([
            ...$validated,
            'type' => $validated['type'] ?? 'feedback',
        ]);

        // Increment project comments count
        Project::where('id', $validated['project_id'])->increment('comments_count');

        // Load relationships for response
        $comment->load(['user', 'replies']);

        return response()->json([
            'success' => true,
            'comment' => $comment,
            'message' => 'Comment posted successfully!',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {
        $comment->load([
            'user',
            'project',
            'replies' => function ($query) {
                $query->with('user')->orderBy('created_at', 'asc');
            }
        ]);

        return response()->json([
            'comment' => $comment,
        ]);
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
    public function update(Request $request, Comment $comment)
    {
        $this->authorize('update', $comment);

        $validated = $request->validate([
            'content' => 'required|string|max:1000',
            'type' => ['nullable', Rule::in(['feedback', 'question', 'suggestion', 'praise'])],
        ]);

        $comment->update([
            ...$validated,
            'is_edited' => true,
            'edited_at' => now(),
        ]);

        $comment->load('user');

        return response()->json([
            'success' => true,
            'comment' => $comment,
            'message' => 'Comment updated successfully!',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        $this->authorize('delete', $comment);

        // Decrement project comments count
        Project::where('id', $comment->project_id)->decrement('comments_count');

        $comment->delete();

        return response()->json([
            'success' => true,
            'message' => 'Comment deleted successfully!',
        ]);
    }

    /**
     * Get comments for a specific project
     */
    public function getProjectComments(Project $project)
    {
        $comments = $project->comments()
            ->with([
                'user',
                'replies' => function ($query) {
                    $query->with('user')->orderBy('created_at', 'asc');
                }
            ])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json([
            'comments' => $comments,
        ]);
    }

    /**
     * Like or unlike a comment
     */
    public function toggleLike(Comment $comment)
    {
        // This would typically involve a separate likes table
        // For now, we'll just increment/decrement the likes_count
        // In a real app, you'd want to track which users liked which comments

        $comment->increment('likes_count');

        return response()->json([
            'success' => true,
            'likes_count' => $comment->likes_count,
        ]);
    }
}
