<?php

namespace App\Modules\Project\Domain\Services;

use App\Core\Services\ListService;
use App\Modules\Project\Domain\Contracts\ProjectRepositoryPort;

class ListProjectsService extends ListService
{
    public function __construct(ProjectRepositoryPort $repository)
    {
        parent::__construct($repository);
    }
}