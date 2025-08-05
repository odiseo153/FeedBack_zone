<?php

namespace App\Modules\UserFollow\Domain\Entities;

class UserFollow
{
    public $id;
    public $created_at;
    public $updated_at;

    // Add your entity properties here
    // public $name;
    // public $description;
    // public $status;

    public function __construct(array $data = [])
    {
        $this->id = $data['id'] ?? null;
        $this->created_at = $data['created_at'] ?? null;
        $this->updated_at = $data['updated_at'] ?? null;

        // Map your properties here
        // $this->name = $data['name'] ?? null;
        // $this->description = $data['description'] ?? null;
        // $this->status = $data['status'] ?? 'active';
    }
}