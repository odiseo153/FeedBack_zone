<?php

namespace App\Modules\Tag;

use App\Modules\Tag\Adapters\Repositories\TagRepository;
use App\Modules\Tag\Domain\Contracts\TagRepositoryPort;
use Illuminate\Support\ServiceProvider;

class TagServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(TagRepositoryPort::class, TagRepository::class);
    }

    public function boot()
    {
        // Register routes, views, etc.
    }
}