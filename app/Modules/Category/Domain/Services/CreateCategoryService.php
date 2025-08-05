<?php

namespace App\Modules\Category\Domain\Services;

use App\Core\Services\CreateService;
use App\Modules\Category\Domain\Contracts\CategoryRepositoryPort;

class CreateCategoryService extends CreateService
{
    public function __construct(CategoryRepositoryPort $repository)
    {
        parent::__construct($repository);
    }
}
