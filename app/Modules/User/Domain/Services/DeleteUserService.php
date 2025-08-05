<?php

namespace App\Modules\User\Domain\Services;

use App\Core\Services\DeleteService;
use App\Modules\User\Domain\Contracts\UserRepositoryPort;

class DeleteUserService extends DeleteService
{
    public function __construct(UserRepositoryPort $repository)
    {
        parent::__construct($repository);
    }
}
