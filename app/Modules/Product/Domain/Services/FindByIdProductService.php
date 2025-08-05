<?php

namespace App\Modules\Product\Domain\Services;

use App\Core\Services\FindByIdService;
use App\Modules\Product\Domain\Contracts\ProductRepositoryPort;

class FindByIdProductService extends FindByIdService
{
    public function __construct(ProductRepositoryPort $repository)
    {
        parent::__construct($repository);
    }
}