<?php

namespace App\Modules\UserFollow;

use App\Modules\UserFollow\Adapters\Repositories\UserFollowRepository;
use App\Modules\UserFollow\Domain\Contracts\UserFollowRepositoryPort;
use Illuminate\Support\ServiceProvider;

class UserFollowServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(UserFollowRepositoryPort::class, UserFollowRepository::class);
    }

    public function boot()
    {
        // Register routes, views, etc.
    }
}