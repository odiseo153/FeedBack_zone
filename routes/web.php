<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;

// Import module controllers
use App\Http\Controllers\FeedController;
use App\Modules\User\Adapters\Controllers\UserController;
use App\Modules\Project\Adapters\Controllers\ProjectController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');


// Public routes (no auth required)
Route::get('/feed', [FeedController::class, 'index'])->name('feed');

Route::get('/themes', function () {
    return Inertia::render('Themes');
})->middleware(['auth', 'verified'])->name('themes');

// Profile routes (web interface) - Using hexagonal User module
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->middleware(['auth', 'verified'])->name('dashboard');

    Route::get('/profile', [UserController::class, 'editProfile'])->name('profile.edit');
    Route::put('/profile', [UserController::class, 'updateProfile'])->name('profile.update.web');
    Route::delete('/profile', [UserController::class, 'destroyProfile'])->name('profile.destroy');
});

// Projects web routes (web interface) - Using hexagonal Project module
Route::middleware('auth')->prefix('projects')->group(function () {
    Route::get('/', [ProjectController::class, 'indexWeb'])->name('projects.index');
    Route::get('/create', [ProjectController::class, 'create'])->name('projects.create');
    Route::post('/', [ProjectController::class, 'storeWeb'])->name('projects.store');
    Route::get('/{project}', [ProjectController::class, 'showWeb'])->name('projects.show');
    Route::get('/{project}/edit', [ProjectController::class, 'edit'])->name('projects.edit');
    Route::put('/{project}', [ProjectController::class, 'updateWeb'])->name('projects.update');
    Route::delete('/{project}', [ProjectController::class, 'destroyWeb'])->name('projects.destroy');
    Route::post('/{project}/like', [ProjectController::class, 'toggleLike'])->name('projects.like');
    Route::delete('/{project}/like', [ProjectController::class, 'toggleLike'])->name('projects.unlike');
    // User profiles web routes - Using hexagonal User module
});

Route::prefix('users')->group(function () {
    Route::get('/{user}', [UserController::class, 'showProfile'])->name('profile.show');
    Route::get('/', [UserController::class, 'directory'])->name('profile.directory');
    Route::get('/projects', [UserController::class, 'userProjects'])->name('user.projects');
})->middleware('auth');


// Public routes (no auth required)
Route::get('/projects/public/{project}', [ProjectController::class, 'showWeb'])->name('projects.public.show');

require __DIR__.'/auth.php';
require __DIR__.'/settings.php';
