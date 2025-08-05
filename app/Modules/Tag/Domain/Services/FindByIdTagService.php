<?php

namespace App\Modules\Tag\Domain\Services;

use App\Core\Services\FindByIdService;
use App\Modules\Tag\Domain\Contracts\TagRepositoryPort;

class FindByIdTagService extends FindByIdService
{
    public function __construct(TagRepositoryPort $repository)
    {
        parent::__construct($repository);
    }
}