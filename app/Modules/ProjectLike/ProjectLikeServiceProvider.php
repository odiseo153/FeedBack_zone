<?php

namespace App\Modules\ProjectLike;

use App\Modules\ProjectLike\Adapters\Repositories\ProjectLikeRepository;
use App\Modules\ProjectLike\Domain\Contracts\ProjectLikeRepositoryPort;
use Illuminate\Support\ServiceProvider;

class ProjectLikeServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(ProjectLikeRepositoryPort::class, ProjectLikeRepository::class);
    }

    public function boot()
    {
        // Register routes, views, etc.
    }
}