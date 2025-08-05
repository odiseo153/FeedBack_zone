<?php

namespace App\Core\Services;

use App\Core\Repositories\BaseRepository;


class UpdateService extends BaseService
{
    protected $repository;

    public function __construct(BaseRepository $repository)
    {
        $this->repository = $repository;
    }

    public function execute($id, array $data)
    {
        return $this->repository->update($id, $data);
    }
}
