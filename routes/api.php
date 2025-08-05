<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Import all module controllers
use App\Modules\User\Adapters\Controllers\UserController;
use App\Modules\Project\Adapters\Controllers\ProjectController;
use App\Modules\Comment\Adapters\Controllers\CommentController;
use App\Modules\Rating\Adapters\Controllers\RatingController;
use App\Modules\Tag\Adapters\Controllers\TagController;
use App\Modules\ProjectLike\Adapters\Controllers\ProjectLikeController;

// Import Form Requests for validation middleware
use App\Modules\User\Http\Requests\StoreUserRequest;
use App\Modules\Project\Http\Requests\StoreProjectRequest;
use App\Modules\Comment\Http\Requests\StoreCommentRequest;
use App\Modules\Rating\Http\Requests\StoreRatingRequest;
use App\Modules\Tag\Http\Requests\StoreTagRequest;
use App\Modules\ProjectLike\Http\Requests\StoreProjectLikeRequest;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// API Version 1 Routes
Route::prefix('v1')->group(function () {

    // Users API - Complete CRUD with hexagonal architecture
    Route::get('users', [UserController::class, 'index']);
    Route::post('users', [UserController::class, 'store'])->middleware('request:'.StoreUserRequest::class);
    Route::get('users/{id}', [UserController::class, 'show']);
    Route::put('users/{id}', [UserController::class, 'update']);
    Route::delete('users/{id}', [UserController::class, 'destroy']);

    // Projects API - Complete CRUD with hexagonal architecture
    Route::get('projects', [ProjectController::class, 'index']);
    Route::post('projects', [ProjectController::class, 'store'])->middleware('request:'.StoreProjectRequest::class);
    Route::get('projects/{id}', [ProjectController::class, 'show']);
    Route::put('projects/{id}', [ProjectController::class, 'update']);
    Route::delete('projects/{id}', [ProjectController::class, 'destroy']);

    // Comments API - Complete CRUD with hexagonal architecture
    Route::get('comments', [CommentController::class, 'index']);
    Route::post('comments', [CommentController::class, 'store'])->middleware('request:'.StoreCommentRequest::class);
    Route::get('comments/{id}', [CommentController::class, 'show']);
    Route::put('comments/{id}', [CommentController::class, 'update']);
    Route::delete('comments/{id}', [CommentController::class, 'destroy']);

    // Ratings API - Complete CRUD with hexagonal architecture
    Route::get('ratings', [RatingController::class, 'index']);
    Route::post('ratings', [RatingController::class, 'store'])->middleware('request:'.StoreRatingRequest::class);
    Route::get('ratings/{id}', [RatingController::class, 'show']);
    Route::put('ratings/{id}', [RatingController::class, 'update']);
    Route::delete('ratings/{id}', [RatingController::class, 'destroy']);

    // Tags API - Complete CRUD with hexagonal architecture
    Route::get('tags', [TagController::class, 'index']);
    Route::post('tags', [TagController::class, 'store'])->middleware('request:'.StoreTagRequest::class);
    Route::get('tags/{id}', [TagController::class, 'show']);
    Route::put('tags/{id}', [TagController::class, 'update']);
    Route::delete('tags/{id}', [TagController::class, 'destroy']);

    // Project Likes API - Complete CRUD with hexagonal architecture
    Route::get('project-likes', [ProjectLikeController::class, 'index']);
    Route::post('project-likes', [ProjectLikeController::class, 'store'])->middleware('request:'.StoreProjectLikeRequest::class);
    Route::get('project-likes/{id}', [ProjectLikeController::class, 'show']);
    Route::delete('project-likes/{id}', [ProjectLikeController::class, 'destroy']);

    // Additional specific routes for complex operations
    Route::prefix('projects/{project}')->group(function () {
        Route::get('comments', [CommentController::class, 'index']);
        Route::post('comments', [CommentController::class, 'store'])->middleware('request:'.StoreCommentRequest::class);
        Route::get('ratings', [RatingController::class, 'index']);
        Route::post('ratings', [RatingController::class, 'store'])->middleware('request:'.StoreRatingRequest::class);
        Route::get('likes', [ProjectLikeController::class, 'index']);
        Route::post('like', [ProjectLikeController::class, 'store']);
        Route::delete('unlike', [ProjectLikeController::class, 'destroy']);
    });

    // User-specific routes
    Route::prefix('users/{user}')->group(function () {
        Route::get('projects', [ProjectController::class, 'index']);
        Route::get('comments', [CommentController::class, 'index']);
        Route::get('ratings', [RatingController::class, 'index']);
        Route::get('likes', [ProjectLikeController::class, 'index']);
    });

    // Tag-specific routes
    Route::prefix('tags/{tag}')->group(function () {
        Route::get('projects', [ProjectController::class, 'index']);
    });
});
