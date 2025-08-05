<?php

namespace App\Modules\Tag\Domain\Entities;

class Tag
{
    public $id;
    public $created_at;
    public $updated_at;

    // Tag-specific properties
    public $name;
    public $slug;
    public $color;
    public $type;
    public $description;
    public $usage_count;

    public function __construct(array $data = [])
    {
        $this->id = $data['id'] ?? null;
        $this->created_at = $data['created_at'] ?? null;
        $this->updated_at = $data['updated_at'] ?? null;

        // Map Tag properties
        $this->name = $data['name'] ?? null;
        $this->slug = $data['slug'] ?? null;
        $this->color = $data['color'] ?? null;
        $this->type = $data['type'] ?? null;
        $this->description = $data['description'] ?? null;
        $this->usage_count = $data['usage_count'] ?? 0;
    }
}
