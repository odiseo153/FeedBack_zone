<?php

namespace App\Modules\Project\Domain\Services;

use App\Core\Services\DeleteService;
use App\Modules\Project\Domain\Contracts\ProjectRepositoryPort;

class DeleteProjectService extends DeleteService
{
    public function __construct(ProjectRepositoryPort $repository)
    {
        parent::__construct($repository);
    }
}
