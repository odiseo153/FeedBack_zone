<?php

namespace App\Modules\Tag\Adapters\Repositories;

use App\Models\Tag as TagModel;
use App\Core\Repositories\BaseRepository;
use App\Modules\Tag\Domain\Contracts\TagRepositoryPort;
use App\Modules\Tag\Domain\Entities\Tag;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\AllowedInclude;

class TagRepository extends BaseRepository implements TagRepositoryPort
{
    public function __construct()
    {
        parent::__construct(TagModel::class);
    }

    /**
     * Setup Tag-specific filters, sorts and includes
     * Customize this method to define what can be filtered, sorted, and included
     */
    protected function setupDefaults()
    {
        // Define allowed filters for Tag
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

        // Define allowed sorts for Tag
        $this->allowedSorts = [
            AllowedSort::field('id'),
            AllowedSort::field('name'),
            AllowedSort::field('status'),
            AllowedSort::field('created_at'),
            AllowedSort::field('updated_at'),
            // Add more sorts as needed:
            // AllowedSort::field('user_id'),
        ];

        // Define allowed includes (relationships) for Tag
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
        // - Filtering: GET /tags?filter[name]=example&filter[status]=active
        // - Sorting: GET /tags?sort=-created_at,name
        // - Including: GET /tags?include=user,category
        // - Combining: GET /tags?filter[status]=active&sort=-created_at&include=user

        return parent::getAll($perPage, $filters, $sorts, $defaultSort, $with);
    }

    public function create(array $data)
    {
        // Add any specific logic before creation
        // $data['user_id'] = auth()->id(); // Example: Set current user

        $tag = TagModel::create($data);

        // Load relationships if needed
        // $tag->load(['user', 'category']);

        return new Tag($tag->toArray());
    }

    public function findById($id)
    {
        $tag = TagModel::find($id);

        if (!$tag) {
            return null;
        }

        // Load relationships if needed
        // $tag->load(['user', 'category']);

        return new Tag($tag->toArray());
    }
}