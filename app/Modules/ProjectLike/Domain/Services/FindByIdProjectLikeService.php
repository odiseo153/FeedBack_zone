<?php

namespace App\Modules\ProjectLike\Domain\Services;

use App\Core\Services\FindByIdService;
use App\Modules\ProjectLike\Domain\Contracts\ProjectLikeRepositoryPort;

class FindByIdProjectLikeService extends FindByIdService
{
    public function __construct(ProjectLikeRepositoryPort $repository)
    {
        parent::__construct($repository);
    }
}