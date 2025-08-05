<?php

namespace App\Modules\User\Domain\Entities;

class User
{
    public $id;
    public $created_at;
    public $updated_at;

    // User-specific properties
    public $name;
    public $email;
    public $username;
    public $avatar;
    public $bio;
    public $github_username;
    public $portfolio_url;
    public $twitter_handle;
    public $location;
    public $job_title;
    public $company;
    public $reputation_score;
    public $projects;
    public $comments;
    public $ratings;
    public $last_active_at;
    public $skills;
    public $is_verified;
    public $is_available_for_hire;

    public function __construct(array $data = [])
    {
        $this->id = $data['id'] ?? null;
        $this->created_at = $data['created_at'] ?? null;
        $this->updated_at = $data['updated_at'] ?? null;

        // Map User properties
        $this->name = $data['name'] ?? null;
        $this->email = $data['email'] ?? null;
        $this->username = $data['username'] ?? null;
        $this->avatar = $data['avatar'] ?? null;
        $this->bio = $data['bio'] ?? null;
        $this->github_username = $data['github_username'] ?? null;
        $this->portfolio_url = $data['portfolio_url'] ?? null;
        $this->twitter_handle = $data['twitter_handle'] ?? null;
        $this->location = $data['location'] ?? null;
        $this->job_title = $data['job_title'] ?? null;
        $this->company = $data['company'] ?? null;
        $this->reputation_score = $data['reputation_score'] ?? 0;
        $this->projects = $data['projects'] ?? [];
        $this->comments = $data['comments'] ?? [];
        $this->ratings = $data['ratings'] ?? [];
        $this->last_active_at = $data['last_active_at'] ?? null;
        $this->skills = $data['skills'] ?? null;
        $this->is_verified = $data['is_verified'] ?? false;
        $this->is_available_for_hire = $data['is_available_for_hire'] ?? false;
    }
}
