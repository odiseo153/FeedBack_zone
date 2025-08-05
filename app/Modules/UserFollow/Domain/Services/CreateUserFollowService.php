<?php

namespace App\Modules\UserFollow\Domain\Services;

use App\Core\Services\CreateService;
use App\Modules\UserFollow\Domain\Contracts\UserFollowRepositoryPort;

class CreateUserFollowService extends CreateService
{
    public function __construct(UserFollowRepositoryPort $repository)
    {
        parent::__construct($repository);
    }
}