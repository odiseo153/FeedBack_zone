<?php

namespace App\Modules\User\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'username' => $this->username,
            'avatar' => $this->avatar,
            'bio' => $this->bio,
            'github_username' => $this->github_username,
            'portfolio_url' => $this->portfolio_url,
            'twitter_handle' => $this->twitter_handle,
            'location' => $this->location,
            'job_title' => $this->job_title,
            'company' => $this->company,
            'reputation_score' => $this->reputation_score,
            'projects_count' => $this->projects_count,
            'comments_count' => $this->comments_count,
            'ratings_given_count' => $this->ratings_given_count,
            'last_active_at' => $this->last_active_at,
            'skills' => $this->skills,
            'is_verified' => $this->is_verified,
            'is_available_for_hire' => $this->is_available_for_hire,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

            // Include relationships when loaded
            'projects' => $this->projects ?? null,
            'comments' => $this->comments ?? null,
            'ratings' => $this->ratings ?? null,
        ];
    }
}
