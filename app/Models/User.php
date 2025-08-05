<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Builder;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'username',
        'avatar',
        'bio',
        'github_username',
        'portfolio_url',
        'twitter_handle',
        'location',
        'job_title',
        'company',
        'reputation_score',
        'last_active_at',
        'skills',
        'is_verified',
        'is_available_for_hire',
        'is_admin',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'last_active_at' => 'datetime',
            'skills' => 'array',
            'is_verified' => 'boolean',
            'is_available_for_hire' => 'boolean',
        ];
    }

    // Relationships
    public function projects()
    {
        return $this->hasMany(Project::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }

    public function projectLikes()
    {
        return $this->hasMany(ProjectLike::class);
    }

    // Follow relationships
    public function following()
    {
        return $this->belongsToMany(User::class, 'user_follows', 'follower_id', 'following_id')
            ->withTimestamps();
    }

    public function followers()
    {
        return $this->belongsToMany(User::class, 'user_follows', 'following_id', 'follower_id')
            ->withTimestamps();
    }

    // Scopes for Spatie Query Builder
    public function scopeReputationAbove(Builder $query, $score)
    {
        return $query->where('reputation_score', '>=', $score);
    }

    public function scopeActiveRecently(Builder $query, $days = 30)
    {
        return $query->where('last_active_at', '>=', now()->subDays($days));
    }

    public function scopeVerified(Builder $query)
    {
        return $query->where('is_verified', true);
    }

    public function scopeAvailableForHire(Builder $query)
    {
        return $query->where('is_available_for_hire', true);
    }

    // Helper methods
    public function isFollowing(User $user)
    {
        return $this->following()->where('following_id', $user->id)->exists();
    }

    public function follow(User $user)
    {
        if ($this->id === $user->id) {
            return false; // Can't follow yourself
        }

        return $this->following()->syncWithoutDetaching([$user->id]);
    }

    public function unfollow(User $user)
    {
        return $this->following()->detach($user->id);
    }

    public function hasLikedProject(Project $project)
    {
        return $this->projectLikes()->where('project_id', $project->id)->exists();
    }

    // Accessors
    public function getAvatarUrlAttribute()
    {
        if ($this->avatar) {
            return asset('storage/' . $this->avatar);
        }

        // Generate avatar based on initials
        return 'https://ui-avatars.com/api/?name=' . urlencode($this->name) . '&color=7F9CF5&background=EBF4FF';
    }

    public function getFullNameAttribute()
    {
        return $this->name;
    }
}
