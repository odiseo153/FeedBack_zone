<?php

namespace App\Modules\Tag\Domain\Services;

use App\Core\Services\CreateService;
use App\Modules\Tag\Domain\Contracts\TagRepositoryPort;

class CreateTagService extends CreateService
{
    public function __construct(TagRepositoryPort $repository)
    {
        parent::__construct($repository);
    }
}