<?php

namespace App\Modules\Project\Domain\Entities;

class Project
{
    public $id;
    public $created_at;
    public $updated_at;

    // Project-specific properties
    public $title;
    public $description;
    public $github_url;
    public $live_url;
    public $thumbnail;
    public $project_type;
    public $feedback_request;
    public $status;
    public $tech_stack;
    public $views_count;
    public $likes_count;
    public $comments_count;
    public $ratings_count;
    public $is_featured;
    public $user_id;

    public function __construct(array $data = [])
    {
        $this->id = $data['id'] ?? null;
        $this->created_at = $data['created_at'] ?? null;
        $this->updated_at = $data['updated_at'] ?? null;

        // Map Project properties
        $this->title = $data['title'] ?? null;
        $this->description = $data['description'] ?? null;
        $this->github_url = $data['github_url'] ?? null;
        $this->live_url = $data['live_url'] ?? null;
        $this->thumbnail = $data['thumbnail'] ?? null;
        $this->project_type = $data['project_type'] ?? null;
        $this->feedback_request = $data['feedback_request'] ?? null;
        $this->status = $data['status'] ?? 'draft';
        $this->tech_stack = $data['tech_stack'] ?? [];
        $this->views_count = $data['views_count'] ?? 0;
        $this->likes_count = $data['likes_count'] ?? 0;
        $this->comments_count = $data['comments_count'] ?? 0;
        $this->ratings_count = $data['ratings_count'] ?? 0;
        $this->is_featured = $data['is_featured'] ?? false;
        $this->user_id = $data['user_id'] ?? null;
        $this->user = $data['user'] ?? null;
        $this->tags = $data['tags'] ?? null;
        $this->comments = $data['comments'] ?? null;
        $this->ratings = $data['ratings'] ?? null;
        $this->likes = $data['likes'] ?? null;
    }
}
