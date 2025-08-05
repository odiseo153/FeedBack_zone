<?php

namespace App\Modules\Category\Domain\Services;

use App\Core\Services\ListService;
use App\Modules\Category\Domain\Contracts\CategoryRepositoryPort;

class ListCategorysService extends ListService
{
    public function __construct(CategoryRepositoryPort $repository)
    {
        parent::__construct($repository);
    }
}