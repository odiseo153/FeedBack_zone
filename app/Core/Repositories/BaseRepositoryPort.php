<?php

namespace App\Core\Repositories;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface BaseRepositoryPort
{
    public function create(array $data);
    public function getAll(int $perPage): LengthAwarePaginator;
    public function findById($id);
    public function update($id, array $data);
    public function delete($id);
}
