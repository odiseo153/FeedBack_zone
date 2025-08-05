<?php

namespace App\Modules\UserFollow\Domain\Services;

use App\Core\Services\FindByIdService;
use App\Modules\UserFollow\Domain\Contracts\UserFollowRepositoryPort;

class FindByIdUserFollowService extends FindByIdService
{
    public function __construct(UserFollowRepositoryPort $repository)
    {
        parent::__construct($repository);
    }
}