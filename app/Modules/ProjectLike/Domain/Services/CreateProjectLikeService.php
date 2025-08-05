<?php

namespace App\Modules\ProjectLike\Domain\Services;

use App\Core\Services\CreateService;
use App\Modules\ProjectLike\Domain\Contracts\ProjectLikeRepositoryPort;

class CreateProjectLikeService extends CreateService
{
    public function __construct(ProjectLikeRepositoryPort $repository)
    {
        parent::__construct($repository);
    }
}