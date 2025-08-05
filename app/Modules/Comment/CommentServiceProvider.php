<?php

namespace App\Modules\Comment;
use App\Modules\Comment\Adapters\Repositories\CommentRepository;
use App\Modules\Comment\Domain\Contracts\CommentRepositoryPort;
use Illuminate\Support\ServiceProvider;

    class CommentServiceProvider extends ServiceProvider
    {
        public function register()
        {
        $this->app->bind(CommentRepositoryPort::class,CommentRepository::class);

        }

        public function boot()
        {
        // Perform actions during the booting process
        }
    }
