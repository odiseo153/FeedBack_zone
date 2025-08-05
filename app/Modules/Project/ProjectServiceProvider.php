<?php

namespace App\Modules\Project;

use App\Modules\Project\Adapters\Repositories\ProjectRepository;
use App\Modules\Project\Domain\Contracts\ProjectRepositoryPort;
use Illuminate\Support\ServiceProvider;

class ProjectServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(ProjectRepositoryPort::class, ProjectRepository::class);
    }

    public function boot()
    {
        // Register routes, views, etc.
    }
}