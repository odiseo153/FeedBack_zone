<?php

namespace App\Modules\UserFollow\Domain\Services;

use App\Core\Services\ListService;
use App\Modules\UserFollow\Domain\Contracts\UserFollowRepositoryPort;

class ListUserFollowsService extends ListService
{
    public function __construct(UserFollowRepositoryPort $repository)
    {
        parent::__construct($repository);
    }
}