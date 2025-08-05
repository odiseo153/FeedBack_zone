<?php

namespace App\Modules\Rating;

use App\Modules\Rating\Adapters\Repositories\RatingRepository;
use App\Modules\Rating\Domain\Contracts\RatingRepositoryPort;
use Illuminate\Support\ServiceProvider;

class RatingServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(RatingRepositoryPort::class, RatingRepository::class);
    }

    public function boot()
    {
        // Register routes, views, etc.
    }
}