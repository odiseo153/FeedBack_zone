<?php

namespace App\Modules\ProjectLike\Domain\Services;

use App\Core\Services\ListService;
use App\Modules\ProjectLike\Domain\Contracts\ProjectLikeRepositoryPort;

class ListProjectLikesService extends ListService
{
    public function __construct(ProjectLikeRepositoryPort $repository)
    {
        parent::__construct($repository);
    }
}