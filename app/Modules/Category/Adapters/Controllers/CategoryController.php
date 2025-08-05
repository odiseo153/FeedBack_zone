<?php

namespace App\Modules\Category\Adapters\Controllers;

use Illuminate\Http\Request;
use App\Core\Controllers\BaseController;
use App\Modules\Category\Http\Resources\CategoryResource;
use App\Modules\Category\Http\Requests\StoreCategoryRequest;
use App\Modules\Category\Domain\Services\ListCategorysService;
use App\Modules\Category\Domain\Services\CreateCategoryService;
use App\Modules\Category\Domain\Services\FindByIdCategoryService;

class CategoryController extends BaseController
{
    public function __construct(
        CreateCategoryService $createService,
        ListCategorysService $listService,
        FindByIdCategoryService $findByIdService
    ) {
        $this->createService = $createService;
        $this->listService = $listService;
        $this->findByIdService = $findByIdService;
        $this->resourceClass = CategoryResource::class;
    }

    public function store(StoreCategoryRequest $request)
    {
        return parent::store($request);
    }
}