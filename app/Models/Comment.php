<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Comment extends BaseModel
{
    use HasFactory;

    protected $fillable = [
        'content',
        'user_id',
        'project_id',
        'parent_id',
        'status',
        'likes_count',
        'is_edited',
        'edited_at',
        'comment_type_id',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function commentType()
    {
        return $this->belongsTo(CommentType::class);
    }

    public function parent()
    {
        return $this->belongsTo(Comment::class, 'parent_id');
    }

    public function replies()
    {
        return $this->hasMany(Comment::class, 'parent_id');
    }

    // Scopes for Spatie Query Builder
    public function scopeCreatedAfter(Builder $query, $date)
    {
        return $query->where('created_at', '>=', $date);
    }

    public function scopeCreatedBefore(Builder $query, $date)
    {
        return $query->where('created_at', '<=', $date);
    }

    public function scopeActive(Builder $query)
    {
        return $query->where('status', 'active');
    }

    public function scopeByUser(Builder $query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    public function scopeByProject(Builder $query, $projectId)
    {
        return $query->where('project_id', $projectId);
    }

    public function scopeTopLevel(Builder $query)
    {
        return $query->whereNull('parent_id');
    }

    public function scopeReplies(Builder $query)
    {
        return $query->whereNotNull('parent_id');
    }
}
