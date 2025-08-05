<?php

namespace App\Core\Repositories;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\AllowedInclude;

class BaseRepository
{
    protected $model;
    protected $allowedFilters = [];
    protected $allowedSorts = [];
    protected $allowedIncludes = [];
    protected $defaultSort = '-created_at';

    public function __construct(string $modelClass)
    {
        $this->model = new $modelClass;
        $this->setupDefaults();
    }

    /**
     * Setup default filters, sorts and includes
     * Override this method in child repositories to customize
     */
    protected function setupDefaults()
    {
        // Default allowed filters (can be overridden in child classes)
        $this->allowedFilters = [
            AllowedFilter::exact('id'),
            AllowedFilter::partial('name'),
            AllowedFilter::exact('status'),
            AllowedFilter::exact('created_at'),
            AllowedFilter::exact('updated_at'),
        ];

        // Default allowed sorts (can be overridden in child classes)
        $this->allowedSorts = [
            AllowedSort::field('id'),
            AllowedSort::field('name'),
            AllowedSort::field('status'),
            AllowedSort::field('created_at'),
            AllowedSort::field('updated_at'),
        ];

        // Default allowed includes (empty by default)
        $this->allowedIncludes = [];
    }

    public function getAll(int $perPage, array $filters = [], array $sorts = [], string $defaultSort = null, array $with = []): LengthAwarePaginator
    {
        $perPage = max(1, min($perPage, 1000));

        $query = QueryBuilder::for($this->model)
            ->allowedFilters($this->allowedFilters)
            ->allowedSorts($this->allowedSorts)
            ->allowedIncludes($this->allowedIncludes)
            ->defaultSort($defaultSort ?? $this->defaultSort);

        // Apply manual filters if provided (for backward compatibility)
        if (!empty($filters)) {
            foreach ($filters as $field => $value) {
                if ($value !== null) {
                    $query->where($field, $value);
                }
            }
        }

        // Apply manual includes if provided (for backward compatibility)
        if (!empty($with)) {
            $query->with($with);
        }

        return $query->paginate($perPage);
    }

    /**
     * Advanced query method with full Spatie Query Builder features
     */
    public function query(): QueryBuilder
    {
        return QueryBuilder::for($this->model)
            ->allowedFilters($this->allowedFilters)
            ->allowedSorts($this->allowedSorts)
            ->allowedIncludes($this->allowedIncludes)
            ->defaultSort($this->defaultSort);
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function findById($id)
    {
        return $this->model->find($id)->with($this->allowedIncludes);
    }

    public function update($id, array $data)
    {
        $item = $this->findById($id);
        if ($item) {
            $item->update($data);
            return $item;
        }
        return null;
    }

    public function delete($id)
    {
        $item = $this->findById($id);
        if ($item) {
            return $item->delete();
        }
        return false;
    }

    /**
     * Get allowed filters for this repository
     */
    public function getAllowedFilters(): array
    {
        return $this->allowedFilters;
    }

    /**
     * Get allowed sorts for this repository
     */
    public function getAllowedSorts(): array
    {
        return $this->allowedSorts;
    }

    /**
     * Get allowed includes for this repository
     */
    public function getAllowedIncludes(): array
    {
        return $this->allowedIncludes;
    }
}
