<?php

namespace App\Models;

class ProjectLike extends BaseModel
{

    protected $fillable = [
        'project_id',
        'user_id',
    ];

    // Relationships
    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
