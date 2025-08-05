<?php

namespace App\Modules\Rating\Domain\Services;

use App\Core\Services\CreateService;
use App\Modules\Rating\Domain\Contracts\RatingRepositoryPort;

class CreateRatingService extends CreateService
{
    public function __construct(RatingRepositoryPort $repository)
    {
        parent::__construct($repository);
    }
}