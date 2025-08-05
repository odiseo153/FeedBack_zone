<?php

namespace App\Modules\User\Domain\Services;

use App\Core\Services\FindByIdService;
use App\Modules\User\Domain\Contracts\UserRepositoryPort;

class FindByIdUserService extends FindByIdService
{
    public function __construct(UserRepositoryPort $repository)
    {
        parent::__construct($repository);
    }
}