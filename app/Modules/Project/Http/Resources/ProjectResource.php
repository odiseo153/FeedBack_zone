<?php

namespace App\Modules\Project\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'github_url' => $this->github_url,
            'live_url' => $this->live_url,
            'thumbnail' => $this->thumbnail,
            'project_type' => $this->project_type,
            'feedback_request' => $this->feedback_request,
            'status' => $this->status,
            'tech_stack' => $this->tech_stack,
            'views_count' => $this->views_count,
            'likes_count' => $this->likes_count,
            'comments_count' => $this->comments_count,
            'ratings_count' => $this->ratings_count,
            'is_featured' => $this->is_featured,
            'user_id' => $this->user_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

            // Include relationships when loaded
            'user' => $this->user ?? null,
            'tags' => $this->tags ?? null,
            'comments' => $this->comments ?? null,
            'ratings' => $this->ratings ?? null,
            'likes' => $this->likes ?? null,
        ];
    }
}
