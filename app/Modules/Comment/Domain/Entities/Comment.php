<?php

namespace App\Modules\Comment\Domain\Entities;

class Comment
{
    public $id;
    public $project;
    public $user;
    public $parent;
    public $content;
    public $likes_count;
    public $is_edited;
    public $edited_at;
    public $type;
    public $created_at;
    public $updated_at;

    public function __construct(array $data = null)
    {
        $this->id = $data['id'] ?? null;
        $this->project = $data['project'] ?? null;
        $this->user = $data['user'] ?? null;
        $this->parent = $data['parent'] ?? null;
        $this->content = $data['content'] ?? null;
        $this->likes_count = $data['likes_count'] ?? null;
        $this->is_edited = $data['is_edited'] ?? null;
        $this->edited_at = $data['edited_at'] ?? null;
        $this->type = $data['type'] ?? null;
        $this->created_at = $data['created_at'] ?? null;
        $this->updated_at = $data['updated_at'] ?? null;
    }
}
