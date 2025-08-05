<?php

namespace App\Core\Services;

use App\Core\Repositories\BaseRepository;


class FindByIdService extends BaseService
{
    protected $repository;

    public function __construct(BaseRepository $repository)
    {
        $this->repository = $repository;
    }

    public function execute($id)
    {
        return $this->repository->findById($id);
    }
}
