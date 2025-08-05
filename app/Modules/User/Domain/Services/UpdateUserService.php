<?php

namespace App\Modules\User\Domain\Services;

use App\Core\Services\UpdateService;
use App\Modules\User\Domain\Contracts\UserRepositoryPort;

class UpdateUserService extends UpdateService
{
    public function __construct(UserRepositoryPort $repository)
    {
        parent::__construct($repository);
    }
}
