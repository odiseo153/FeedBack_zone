<?php

namespace App\Modules\Rating\Adapters\Repositories;

use App\Models\Rating as RatingModel;
use App\Core\Repositories\BaseRepository;
use App\Modules\Rating\Domain\Contracts\RatingRepositoryPort;
use App\Modules\Rating\Domain\Entities\Rating;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\AllowedInclude;

class RatingRepository extends BaseRepository implements RatingRepositoryPort
{
    public function __construct()
    {
        parent::__construct(RatingModel::class);
    }

    /**
     * Setup Rating-specific filters, sorts and includes
     */
    protected function setupDefaults()
    {
        // Define allowed filters for Rating
        $this->allowedFilters = [
            AllowedFilter::exact('id'),
            AllowedFilter::exact('project_id'),
            AllowedFilter::exact('user_id'),
            AllowedFilter::exact('ui_ux_score'),
            AllowedFilter::exact('performance_score'),
            AllowedFilter::exact('code_quality_score'),
            AllowedFilter::exact('innovation_score'),
            AllowedFilter::exact('overall_score'),
            AllowedFilter::scope('high_rating'),
            AllowedFilter::scope('recent'),
        ];

        // Define allowed sorts for Rating
        $this->allowedSorts = [
            AllowedSort::field('id'),
            AllowedSort::field('ui_ux_score'),
            AllowedSort::field('performance_score'),
            AllowedSort::field('code_quality_score'),
            AllowedSort::field('innovation_score'),
            AllowedSort::field('overall_score'),
            AllowedSort::field('created_at'),
            AllowedSort::field('updated_at'),
        ];

        // Define allowed includes (relationships)
        $this->allowedIncludes = [
            AllowedInclude::relationship('user'),
            AllowedInclude::relationship('project'),
        ];

        // Set default sort
        $this->defaultSort = '-created_at';
    }

    public function getAll(int $perPage, array $filters = [], array $sorts = [], string $defaultSort = '-created_at', array $with = []): LengthAwarePaginator
    {
        // Spatie Query Builder will automatically handle:
        // - Filtering: GET /ratings?filter[project_id]=1&filter[overall_score]=5
        // - Sorting: GET /ratings?sort=-overall_score,created_at
        // - Including: GET /ratings?include=user,project
        // - Combining: GET /ratings?filter[high_rating]=1&sort=-created_at&include=user,project

        return parent::getAll($perPage, $filters, $sorts, $defaultSort, $with);
    }

    public function create(array $data)
    {
        // Set user_id to current authenticated user if not provided
        $data['user_id'] = $data['user_id'] ?? auth()->id();

        $rating = RatingModel::create($data);

        // Load relationships
        $rating->load(['user', 'project']);

        return new Rating($rating->toArray());
    }

    public function findById($id)
    {
        $rating = RatingModel::with(['user', 'project'])
            ->find($id);

        if (!$rating) {
            return null;
        }

        return new Rating($rating->toArray());
    }
}
