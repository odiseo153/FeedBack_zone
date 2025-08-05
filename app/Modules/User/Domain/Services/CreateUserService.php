<?php

namespace App\Modules\User\Domain\Services;

use App\Core\Services\CreateService;
use App\Modules\User\Domain\Contracts\UserRepositoryPort;

class CreateUserService extends CreateService
{
    public function __construct(UserRepositoryPort $repository)
    {
        parent::__construct($repository);
    }
}