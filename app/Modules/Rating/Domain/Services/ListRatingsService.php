<?php

namespace App\Modules\Rating\Domain\Services;

use App\Core\Services\ListService;
use App\Modules\Rating\Domain\Contracts\RatingRepositoryPort;

class ListRatingsService extends ListService
{
    public function __construct(RatingRepositoryPort $repository)
    {
        parent::__construct($repository);
    }
}