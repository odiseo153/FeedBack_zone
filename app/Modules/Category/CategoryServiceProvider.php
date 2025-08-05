<?php

namespace App\Modules\Category;

use App\Modules\Category\Adapters\Repositories\CategoryRepository;
use App\Modules\Category\Domain\Contracts\CategoryRepositoryPort;
use Illuminate\Support\ServiceProvider;

class CategoryServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(CategoryRepositoryPort::class, CategoryRepository::class);
    }

    public function boot()
    {
        // Register routes, views, etc.
    }
}