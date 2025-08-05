<?php

namespace App\Modules\Project\Domain\Services;

use App\Core\Services\CreateService;
use App\Modules\Project\Domain\Contracts\ProjectRepositoryPort;

class CreateProjectService extends CreateService
{
    public function __construct(ProjectRepositoryPort $repository)
    {
        parent::__construct($repository);
    }
}