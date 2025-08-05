<?php

namespace App\Modules\Category\Domain\Services;

use App\Core\Services\FindByIdService;
use App\Modules\Category\Domain\Contracts\CategoryRepositoryPort;

class FindByIdCategoryService extends FindByIdService
{
    public function __construct(CategoryRepositoryPort $repository)
    {
        parent::__construct($repository);
    }
}