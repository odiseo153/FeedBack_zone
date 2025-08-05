<?php

namespace App\Modules\Product\Adapters\Controllers;

use Illuminate\Http\Request;
use App\Core\Controllers\BaseController;
use App\Modules\Product\Http\Resources\ProductResource;
use App\Modules\Product\Http\Requests\StoreProductRequest;
use App\Modules\Product\Domain\Services\ListProductsService;
use App\Modules\Product\Domain\Services\CreateProductService;
use App\Modules\Product\Domain\Services\FindByIdProductService;

class ProductController extends BaseController
{
    public function __construct(
        CreateProductService $createService,
        ListProductsService $listService,
        FindByIdProductService $findByIdService
    ) {
        $this->createService = $createService;
        $this->listService = $listService;
        $this->findByIdService = $findByIdService;
        $this->resourceClass = ProductResource::class;
    }
   
}
