<?php

namespace App\Modules\Product;

use App\Modules\Product\Adapters\Repositories\ProductRepository;
use App\Modules\Product\Domain\Contracts\ProductRepositoryPort;
use Illuminate\Support\ServiceProvider;

class ProductServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(ProductRepositoryPort::class, ProductRepository::class);
    }

    public function boot()
    {
        // Register routes, views, etc.
    }
}