<?php

namespace App\Modules\ProjectLike\Adapters\Repositories;

use App\Models\ProjectLike as ProjectLikeModel;
use App\Core\Repositories\BaseRepository;
use App\Modules\ProjectLike\Domain\Contracts\ProjectLikeRepositoryPort;
use App\Modules\ProjectLike\Domain\Entities\ProjectLike;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\AllowedInclude;

class ProjectLikeRepository extends BaseRepository implements ProjectLikeRepositoryPort
{
    public function __construct()
    {
        parent::__construct(ProjectLikeModel::class);
    }

    /**
     * Setup ProjectLike-specific filters, sorts and includes
     * Customize this method to define what can be filtered, sorted, and included
     */
    protected function setupDefaults()
    {
        // Define allowed filters for ProjectLike
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

        // Define allowed sorts for ProjectLike
        $this->allowedSorts = [
            AllowedSort::field('id'),
            AllowedSort::field('name'),
            AllowedSort::field('status'),
            AllowedSort::field('created_at'),
            AllowedSort::field('updated_at'),
            // Add more sorts as needed:
            // AllowedSort::field('user_id'),
        ];

        // Define allowed includes (relationships) for ProjectLike
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
        // - Filtering: GET /projectlikes?filter[name]=example&filter[status]=active
        // - Sorting: GET /projectlikes?sort=-created_at,name
        // - Including: GET /projectlikes?include=user,category
        // - Combining: GET /projectlikes?filter[status]=active&sort=-created_at&include=user

        return parent::getAll($perPage, $filters, $sorts, $defaultSort, $with);
    }

    public function create(array $data)
    {
        // Add any specific logic before creation
        // $data['user_id'] = auth()->id(); // Example: Set current user

        $projectlike = ProjectLikeModel::create($data);

        // Load relationships if needed
        // $projectlike->load(['user', 'category']);

        return new ProjectLike($projectlike->toArray());
    }

    public function findById($id)
    {
        $projectlike = ProjectLikeModel::find($id);

        if (!$projectlike) {
            return null;
        }

        // Load relationships if needed
        // $projectlike->load(['user', 'category']);

        return new ProjectLike($projectlike->toArray());
    }
}