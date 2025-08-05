<?php

return [
    App\Providers\AppServiceProvider::class,

    // Module Service Providers
    App\Modules\Comment\CommentServiceProvider::class,
    App\Modules\User\UserServiceProvider::class,
    App\Modules\Project\ProjectServiceProvider::class,
    App\Modules\Rating\RatingServiceProvider::class,
    App\Modules\Tag\TagServiceProvider::class,
    App\Modules\ProjectLike\ProjectLikeServiceProvider::class,
];
