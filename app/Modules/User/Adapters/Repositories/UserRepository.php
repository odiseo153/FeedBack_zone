<?php

namespace App\Modules\User\Adapters\Repositories;

use App\Models\User as UserModel;
use App\Core\Repositories\BaseRepository;
use App\Modules\User\Domain\Contracts\UserRepositoryPort;
use App\Modules\User\Domain\Entities\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\AllowedInclude;

class UserRepository extends BaseRepository implements UserRepositoryPort
{
    public function __construct()
    {
        parent::__construct(UserModel::class);
    }

    /**
     * Setup User-specific filters, sorts and includes
     */
    protected function setupDefaults()
    {
        // Define allowed filters for User
        $this->allowedFilters = [
            AllowedFilter::exact('id'),
            AllowedFilter::partial('name'),
            AllowedFilter::partial('email'),
            AllowedFilter::partial('username'),
            AllowedFilter::partial('location'),
            AllowedFilter::partial('job_title'),
            AllowedFilter::partial('company'),
            AllowedFilter::exact('is_verified'),
            AllowedFilter::exact('is_available_for_hire'),
            AllowedFilter::scope('reputation_above'),
            AllowedFilter::scope('has_projects'),
            AllowedFilter::scope('active_recently'),
        ];

        // Define allowed sorts for User
        $this->allowedSorts = [
            AllowedSort::field('id'),
            AllowedSort::field('name'),
            AllowedSort::field('username'),
            AllowedSort::field('reputation_score'),
            AllowedSort::field('projects_count'),
            AllowedSort::field('comments_count'),
            AllowedSort::field('ratings_given_count'),
            AllowedSort::field('last_active_at'),
            AllowedSort::field('created_at'),
            AllowedSort::field('updated_at'),
        ];

        // Define allowed includes (relationships)
        $this->allowedIncludes = [
            'projects',
            'comments',
            'ratings',
            'projectLikes',
        ];

        // Set default sort
        $this->defaultSort = '-created_at';
    }

    public function update($id, array $data)
    {
        $item = UserModel::find($id);

        if ($item) {
            $item->update($data);
            return $item;
        }
        return null;
    }


    public function create(array $data)
    {
        // Hash password if provided
        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }

        $user = UserModel::create($data);

        return new User($user->toArray());
    }

    public function findById($id)
    {
        $user = UserModel::with($this->allowedIncludes)->find($id);

        if (!$user) {
            return null;
        }

        return new User($user->toArray());
    }
}
