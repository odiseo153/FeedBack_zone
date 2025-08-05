<?php

namespace App\Core\Services;

use App\Core\Repositories\BaseRepository;


class CreateService extends BaseService
{
    protected $repository;

    public function __construct(BaseRepository $repository)
    {
        $this->repository = $repository;
    }

    public function execute(array $data)
    {
        return $this->repository->create($data);
    }
}
