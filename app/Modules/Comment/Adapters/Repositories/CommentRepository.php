<?php

namespace App\Modules\Comment\Adapters\Repositories;

use App\Modules\Comment\Domain\Entities\Comment;
use App\Models\Comment as CommentModel;
use App\Core\Repositories\BaseRepository;
use App\Modules\Comment\Domain\Contracts\CommentRepositoryPort;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\AllowedInclude;

class CommentRepository extends BaseRepository implements CommentRepositoryPort
{
    public function __construct()
    {
        parent::__construct(CommentModel::class);
    }

    /**
     * Setup Comment-specific filters, sorts and includes
     */
    protected function setupDefaults()
    {
        // Comment-specific allowed filters
        $this->allowedFilters = [
            AllowedFilter::exact('id'),
            AllowedFilter::exact('project_id'),
            AllowedFilter::exact('user_id'),
            AllowedFilter::exact('parent_id'),
            AllowedFilter::partial('content'),
            AllowedFilter::exact('status'),
            AllowedFilter::scope('created_after'),
            AllowedFilter::scope('created_before'),
        ];

        // Comment-specific allowed sorts
        $this->allowedSorts = [
            AllowedSort::field('id'),
            AllowedSort::field('created_at'),
            AllowedSort::field('updated_at'),
            AllowedSort::field('project_id'),
            AllowedSort::field('user_id'),
        ];

        // Comment-specific allowed includes
        $this->allowedIncludes = [
            AllowedInclude::relationship('user'),
            AllowedInclude::relationship('project'),
            AllowedInclude::relationship('parent'),
            AllowedInclude::relationship('replies'),
        ];

        // Set default sort for comments
        $this->defaultSort = '-created_at';
    }


    public function create(array $data)
    {
        // Add current user if not provided
        $data['user_id'] = $data['user_id'] ?? 1;

        $comment = CommentModel::create($data);
        $comment->load('user','project','parent');

        return new Comment($comment->toArray());
    }

    public function findById($id)
    {
        $comment = CommentModel::with(['user', 'project', 'parent', 'replies'])
            ->find($id);

        if (!$comment) {
            return null;
        }

        return new Comment($comment->toArray());
    }
}
