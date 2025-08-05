<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Builder;

class Rating extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'user_id',
        'ui_ux_score',
        'performance_score',
        'code_quality_score',
        'innovation_score',
        'overall_score',
        'review_comment',
    ];

    protected $casts = [
        'ui_ux_score' => 'integer',
        'performance_score' => 'integer',
        'code_quality_score' => 'integer',
        'innovation_score' => 'integer',
        'overall_score' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Relationships
    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Scopes for Spatie Query Builder
    public function scopeRecent(Builder $query, $days = 30)
    {
        return $query->where('created_at', '>=', now()->subDays($days));
    }

    public function scopeHighRating($query, $score = 4)
    {
        return $query->where('overall_score', '>=', $score);
    }

    // Accessors
    public function getAverageSubScoresAttribute()
    {
        $scores = array_filter([
            $this->ui_ux_score,
            $this->performance_score,
            $this->code_quality_score,
            $this->innovation_score,
        ]);

        return count($scores) > 0 ? round(array_sum($scores) / count($scores), 1) : 0;
    }
}
