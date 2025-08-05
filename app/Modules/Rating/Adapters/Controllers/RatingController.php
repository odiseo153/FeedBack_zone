<?php

namespace App\Modules\Rating\Adapters\Controllers;

use Illuminate\Http\Request;
use App\Core\Controllers\BaseController;
use App\Modules\Rating\Http\Resources\RatingResource;
use App\Modules\Rating\Http\Requests\StoreRatingRequest;
use App\Modules\Rating\Domain\Services\ListRatingsService;
use App\Modules\Rating\Domain\Services\CreateRatingService;
use App\Modules\Rating\Domain\Services\FindByIdRatingService;

class RatingController extends BaseController
{
    public function __construct(
        CreateRatingService $createService,
        ListRatingsService $listService,
        FindByIdRatingService $findByIdService
    ) {
        $this->createService = $createService;
        $this->listService = $listService;
        $this->findByIdService = $findByIdService;
        $this->resourceClass = RatingResource::class;
    }

    // The store method is inherited from BaseController
    // Validation will be handled by the FormRequest type-hinting in routes
}
