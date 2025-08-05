<?php

namespace App\Modules\Tag\Domain\Services;

use App\Core\Services\ListService;
use App\Modules\Tag\Domain\Contracts\TagRepositoryPort;

class ListTagsService extends ListService
{
    public function __construct(TagRepositoryPort $repository)
    {
        parent::__construct($repository);
    }
}