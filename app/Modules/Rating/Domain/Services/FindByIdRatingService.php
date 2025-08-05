<?php

namespace App\Modules\Rating\Domain\Services;

use App\Core\Services\FindByIdService;
use App\Modules\Rating\Domain\Contracts\RatingRepositoryPort;

class FindByIdRatingService extends FindByIdService
{
    public function __construct(RatingRepositoryPort $repository)
    {
        parent::__construct($repository);
    }
}