<?php

namespace App\Core\Services;

use App\Core\Repositories\BaseRepository;


class DeleteService extends BaseService
{
    protected $repository;

    public function __construct(BaseRepository $repository)
    {
        $this->repository = $repository;
    }

    public function execute($id)
    {
        return $this->repository->delete($id);
    }
}
