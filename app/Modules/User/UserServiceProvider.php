<?php

namespace App\Modules\User;

use App\Modules\User\Adapters\Repositories\UserRepository;
use App\Modules\User\Domain\Contracts\UserRepositoryPort;
use Illuminate\Support\ServiceProvider;

class UserServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(UserRepositoryPort::class, UserRepository::class);
    }

    public function boot()
    {
        // Register routes, views, etc.
    }
}