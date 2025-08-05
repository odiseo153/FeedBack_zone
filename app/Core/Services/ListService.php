<?php

namespace App\Core\Services;

use App\Core\Repositories\BaseRepository;


class ListService extends BaseService
{
    protected $repository;

    public function __construct(BaseRepository $repository)
    {
        $this->repository = $repository;
    }

    public function execute(int $perPage)
    {
        return $this->repository->getAll($perPage);
    }
}
