<?php

use App\Modules\Comment\Adapters\Controllers\CommentController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::apiResource('/comments', CommentController::class);
