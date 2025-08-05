<?php

namespace App\Modules\User\Domain\Services;

use App\Core\Services\ListService;
use App\Modules\User\Domain\Contracts\UserRepositoryPort;

class ListUsersService extends ListService
{
    public function __construct(UserRepositoryPort $repository)
    {
        parent::__construct($repository);
    }
}