<?php

namespace App\Modules\ProjectLike\Adapters\Controllers;

use Illuminate\Http\Request;
use App\Core\Controllers\BaseController;
use App\Modules\ProjectLike\Http\Resources\ProjectLikeResource;
use App\Modules\ProjectLike\Http\Requests\StoreProjectLikeRequest;
use App\Modules\ProjectLike\Domain\Services\ListProjectLikesService;
use App\Modules\ProjectLike\Domain\Services\CreateProjectLikeService;
use App\Modules\ProjectLike\Domain\Services\FindByIdProjectLikeService;

class ProjectLikeController extends BaseController
{
    public function __construct(
        CreateProjectLikeService $createService,
        ListProjectLikesService $listService,
        FindByIdProjectLikeService $findByIdService
    ) {
        $this->createService = $createService;
        $this->listService = $listService;
        $this->findByIdService = $findByIdService;
        $this->resourceClass = ProjectLikeResource::class;
    }

    // The store method is inherited from BaseController
    // Validation will be handled by the FormRequest type-hinting in routes
}
