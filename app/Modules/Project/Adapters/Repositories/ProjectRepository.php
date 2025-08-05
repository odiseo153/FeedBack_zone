<?php

namespace App\Modules\Project\Adapters\Repositories;

use App\Models\Project as ProjectModel;
use App\Core\Repositories\BaseRepository;
use App\Modules\Project\Domain\Contracts\ProjectRepositoryPort;
use App\Modules\Project\Domain\Entities\Project;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\AllowedInclude;

class ProjectRepository extends BaseRepository implements ProjectRepositoryPort
{
    public function __construct()
    {
        parent::__construct(ProjectModel::class);
    }


    protected function setupDefaults()
    {
        // Define allowed filters for Project
        $this->allowedFilters = [
            AllowedFilter::exact('id'),
            AllowedFilter::partial('title'),
            AllowedFilter::partial('description'),
            AllowedFilter::exact('user_id'),
            AllowedFilter::exact('project_type'),
            AllowedFilter::exact('status'),
            AllowedFilter::exact('is_featured'),
            AllowedFilter::scope('published'),
            AllowedFilter::scope('featured'),
            AllowedFilter::scope('popular'),
            AllowedFilter::scope('recent'),
            AllowedFilter::scope('by_tech_stack'),
        ];

        // Define allowed sorts for Project
        $this->allowedSorts = [
            AllowedSort::field('id'),
            AllowedSort::field('title'),
            AllowedSort::field('views_count'),
            AllowedSort::field('likes_count'),
            AllowedSort::field('comments_count'),
            AllowedSort::field('ratings_count'),
            AllowedSort::field('created_at'),
            AllowedSort::field('updated_at'),
        ];

        // Define allowed includes (relationships)
        $this->allowedIncludes = [
            AllowedInclude::relationship('user'),
            AllowedInclude::relationship('tags'),
            AllowedInclude::relationship('comments'),
            AllowedInclude::relationship('ratings'),
            AllowedInclude::relationship('likes'),
        ];

        // Set default sort
        $this->defaultSort = '-created_at';
    }


    public function create(array $data)
    {
        // Set user_id to current authenticated user if not provided

        $data['user_id'] = $data['user_id'] ?? auth()->id();
        $project = ProjectModel::create($data);

        // Attach tags if provided
        if (isset($data['tag_ids']) && is_array($data['tag_ids'])) {
            $project->tags()->attach($data['tag_ids']);
        }

        // Load relationships
        $project->load(['user', 'tags']);

        return new Project($project->toArray());
    }

    public function findById($id)
    {
        $project = ProjectModel::with(['user', 'tags', 'comments', 'ratings'])
            ->find($id);

        if (!$project) {
            return null;
        }

        return new Project($project->toArray());
    }
}
