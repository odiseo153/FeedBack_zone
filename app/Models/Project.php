<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;

class Project extends BaseModel
{

    protected $fillable = [
        'title',
        'description',
        'github_url',
        'user_id',
        'live_url',
        'thumbnail',
        'project_type',
        'feedback_request',
        'status',
        'tech_stack',
        'views_count',
        'likes_count',
        'comments_count',
        'ratings_count',
        'is_featured',
    ];


    protected function casts(): array
    {
        return [
            'tech_stack' => 'array',
            'is_featured' => 'boolean',
        ];
    }

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'project_tags');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class)->whereNull('parent_id');
    }

    public function allComments()
    {
        return $this->hasMany(Comment::class);
    }

    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }

    public function likes()
    {
        return $this->hasMany(ProjectLike::class);
    }

    // Scopes for Spatie Query Builder
    public function scopePublished(Builder $query)
    {
        return $query->where('status', 'published');
    }

    public function scopeFeatured(Builder $query)
    {
        return $query->where('is_featured', true);
    }

    public function scopePopular(Builder $query)
    {
        return $query->orderBy('likes_count', 'desc');
    }

    public function scopeRecent(Builder $query, $days = 30)
    {
        return $query->where('created_at', '>=', now()->subDays($days));
    }

    public function scopeByTechStack(Builder $query, $tech)
    {
        return $query->whereJsonContains('tech_stack', $tech);
    }

    public function scopeByType(Builder $query, $type)
    {
        return $query->where('project_type', $type);
    }

    // Accessors
    public function getAverageRatingAttribute()
    {
        return $this->ratings()->avg('overall_score') ?? 0;
    }

    public function getThumbnailUrlAttribute()
    {
        if ($this->thumbnail) {
            return asset('storage/' . $this->thumbnail);
        }
        return null;
    }

    public function setThumbnailAttribute($value)
    {
     return $this->saveFileAtributte('thumbnail', $value);
    }
}
