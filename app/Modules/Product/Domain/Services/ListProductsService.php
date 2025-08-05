<?php

namespace App\Modules\Product\Domain\Services;

use App\Core\Services\ListService;
use App\Modules\Product\Domain\Contracts\ProductRepositoryPort;

class ListProductsService extends ListService
{
    public function __construct(ProductRepositoryPort $repository)
    {
        parent::__construct($repository);
    }
}