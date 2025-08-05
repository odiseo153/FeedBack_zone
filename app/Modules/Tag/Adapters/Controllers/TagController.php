<?php

namespace App\Modules\Tag\Adapters\Controllers;

use Illuminate\Http\Request;
use App\Core\Controllers\BaseController;
use App\Modules\Tag\Http\Resources\TagResource;
use App\Modules\Tag\Http\Requests\StoreTagRequest;
use App\Modules\Tag\Domain\Services\ListTagsService;
use App\Modules\Tag\Domain\Services\CreateTagService;
use App\Modules\Tag\Domain\Services\FindByIdTagService;

class TagController extends BaseController
{
    public function __construct(
        CreateTagService $createService,
        ListTagsService $listService,
        FindByIdTagService $findByIdService
    ) {
        $this->createService = $createService;
        $this->listService = $listService;
        $this->findByIdService = $findByIdService;
        $this->resourceClass = TagResource::class;
    }

    // The store method is inherited from BaseController
    // Validation will be handled by the FormRequest type-hinting in routes
}
