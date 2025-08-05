<?php

namespace App\Modules\Tag\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TagResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'color' => $this->color,
            'type' => $this->type,
            'description' => $this->description,
            'usage_count' => $this->usage_count,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

            // Include relationships when loaded
            'projects' => $this->whenLoaded('projects'),
        ];
    }
}
