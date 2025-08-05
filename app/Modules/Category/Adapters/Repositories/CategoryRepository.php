<?php

namespace App\Modules\Category\Adapters\Repositories;

use App\Models\Category as CategoryModel;
use App\Core\Repositories\BaseRepository;
use App\Modules\Category\Domain\Contracts\CategoryRepositoryPort;
use App\Modules\Category\Domain\Entities\Category;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\AllowedInclude;

class CategoryRepository extends BaseRepository implements CategoryRepositoryPort
{
    public function __construct()
    {
        parent::__construct(CategoryModel::class);
    }

    /**
     * Setup Category-specific filters, sorts and includes
     * Customize this method to define what can be filtered, sorted, and included
     */
    protected function setupDefaults()
    {
        // Define allowed filters for Category
        $this->allowedFilters = [
            AllowedFilter::exact('id'),
            AllowedFilter::partial('name'), // Example: partial search on name
            AllowedFilter::exact('status'),
            AllowedFilter::exact('created_at'),
            AllowedFilter::exact('updated_at'),
            // Add more filters as needed:
            // AllowedFilter::exact('user_id'),
            // AllowedFilter::scope('created_after'), // Requires scope in model
            // AllowedFilter::scope('active'), // Requires scope in model
        ];

        // Define allowed sorts for Category
        $this->allowedSorts = [
            AllowedSort::field('id'),
            AllowedSort::field('name'),
            AllowedSort::field('status'),
            AllowedSort::field('created_at'),
            AllowedSort::field('updated_at'),
            // Add more sorts as needed:
            // AllowedSort::field('user_id'),
        ];

        // Define allowed includes (relationships) for Category
        $this->allowedIncludes = [
            // Add relationships that can be included:
            // AllowedInclude::relationship('user'),
            // AllowedInclude::relationship('category'),
        ];

        // Set default sort
        $this->defaultSort = '-created_at';
    }

    public function getAll(int $perPage, array $filters = [], array $sorts = [], string $defaultSort = '-created_at', array $with = []): LengthAwarePaginator
    {
        // Spatie Query Builder will automatically handle:
        // - Filtering: GET /categorys?filter[name]=example&filter[status]=active
        // - Sorting: GET /categorys?sort=-created_at,name
        // - Including: GET /categorys?include=user,category
        // - Combining: GET /categorys?filter[status]=active&sort=-created_at&include=user

        return parent::getAll($perPage, $filters, $sorts, $defaultSort, $with);
    }

    public function create(array $data)
    {
        // Add any specific logic before creation
        // $data['user_id'] = auth()->id(); // Example: Set current user

        $category = CategoryModel::create($data);

        // Load relationships if needed
        // $category->load(['user', 'category']);

        return new Category($category->toArray());
    }

    public function findById($id)
    {
        $category = CategoryModel::find($id);

        if (!$category) {
            return null;
        }

        // Load relationships if needed
        // $category->load(['user', 'category']);

        return new Category($category->toArray());
    }
}