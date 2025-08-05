<?php

namespace App\Modules\Product\Domain\Services;

use App\Core\Services\CreateService;
use App\Modules\Product\Domain\Contracts\ProductRepositoryPort;

class CreateProductService extends CreateService
{
    public function __construct(ProductRepositoryPort $repository)
    {
        parent::__construct($repository);
    }
}