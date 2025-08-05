<?php

namespace App\Modules\Project\Domain\Services;

use App\Core\Services\FindByIdService;
use App\Modules\Project\Domain\Contracts\ProjectRepositoryPort;

class FindByIdProjectService extends FindByIdService
{
    public function __construct(ProjectRepositoryPort $repository)
    {
        parent::__construct($repository);
    }
}