<?php

namespace App\Modules\User\Adapters\Controllers;

use Illuminate\Http\Request;
use App\Core\Controllers\BaseController;
use App\Modules\User\Http\Resources\UserResource;
use App\Modules\User\Http\Requests\StoreUserRequest;
use App\Modules\User\Domain\Services\ListUsersService;
use App\Modules\User\Domain\Services\CreateUserService;
use App\Modules\User\Domain\Services\FindByIdUserService;
use App\Modules\User\Domain\Services\UpdateUserService;
use App\Modules\User\Domain\Services\DeleteUserService;
use Inertia\Inertia;

class UserController extends BaseController
{
    protected $updateService;
    protected $deleteService;

    public function __construct(
        CreateUserService $createService,
        ListUsersService $listService,
        FindByIdUserService $findByIdService,
        UpdateUserService $updateService,
        DeleteUserService $deleteService
    ) {
        $this->createService = $createService;
        $this->listService = $listService;
        $this->findByIdService = $findByIdService;
        $this->updateService = $updateService;
        $this->deleteService = $deleteService;
        $this->resourceClass = UserResource::class;
    }

    // The store method is inherited from BaseController
    // Validation will be handled by the FormRequest type-hinting in routes

    /**
     * Show user profile page (Web view)
     */
    public function showProfile($id)
    {
        $user = $this->findByIdService->execute($id);

        if (!$user) {
            abort(404);
        }


        return Inertia::render('Profile/Show', [
            'user' => $user,
            'stats' => [
                'projects_count' => count($user->projects),
                'total_likes' => count($user->projects),
                'total_comments_received' => count($user->comments),
                'average_rating' => count($user->ratings),
                'total_ratings_received' => count($user->ratings),
            ],
        ]);
    }

    /**
     * Show users directory (Web view)
     */
    public function directory(Request $request)
    {
        $perPage = $this->getPerPage($request, 12);
        $users = $this->listService->execute($perPage);

        return Inertia::render('Profile/Directory', [
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Show edit profile form (Web view)
     */
    public function editProfile(Request $request)
    {
        $user = $this->findByIdService->execute(auth()->id());

        return Inertia::render('Profile/Edit', [
            'user' => $user,
        ]);
    }

    /**
     * Update user profile (Web action)
     */
    public function updateProfile(Request $request)
    {
        // Validation rules for profile update
        $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . auth()->id(),
            'username' => 'sometimes|string|max:255|unique:users,username,' . auth()->id(),
            'bio' => 'nullable|string|max:1000',
            'location' => 'nullable|string|max:255',
            'job_title' => 'nullable|string|max:255',
            'company' => 'nullable|string|max:255',
            'github_username' => 'nullable|string|max:255',
            'portfolio_url' => 'nullable|url',
            'twitter_handle' => 'nullable|string|max:255',
            'skills' => 'nullable|string',
            'is_available_for_hire' => 'boolean',
        ]);

        // Use domain service to update
        $updatedUser = $this->updateService->execute(auth()->id(), $request->all());

        return redirect()->route('profile.edit')->with('status', 'profile-updated');
    }

    /**
     * Delete user account (Web action)
     */
    public function destroyProfile(Request $request)
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        auth()->logout();

        // Use domain service to delete
        $this->deleteService->execute($user->id);

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }

    /**
     * Show projects of a specific user (Web view)
     */
    public function userProjects(Request $request)
    {
        $user = $this->findByIdService->execute(auth()->id());

        if (!$user) {
            abort(404);
        }

        // This would typically use a dedicated service to get user's projects
        // For now, we'll use a simple approach
        $perPage = $this->getPerPage($request, 12);

        return Inertia::render('Profile/Projects', [
            'user' => new UserResource($user),
            'projects' => [], // Would be populated with user's projects
        ]);
    }
}
