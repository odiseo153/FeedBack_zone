<?php

namespace App\Modules\ProjectLike\Domain\Entities;

class ProjectLike
{
    public $id;
    public $created_at;
    public $updated_at;

    // ProjectLike-specific properties
    public $project_id;
    public $user_id;

    public function __construct(array $data = [])
    {
        $this->id = $data['id'] ?? null;
        $this->created_at = $data['created_at'] ?? null;
        $this->updated_at = $data['updated_at'] ?? null;

        // Map ProjectLike properties
        $this->project_id = $data['project_id'] ?? null;
        $this->user_id = $data['user_id'] ?? null;
    }
}
