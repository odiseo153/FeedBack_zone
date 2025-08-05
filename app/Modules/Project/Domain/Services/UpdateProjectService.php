<?php

namespace App\Modules\Project\Domain\Services;

use App\Core\Services\UpdateService;
use App\Modules\Project\Domain\Contracts\ProjectRepositoryPort;

class UpdateProjectService extends UpdateService
{
    public function __construct(ProjectRepositoryPort $repository)
    {
        parent::__construct($repository);
    }
}
