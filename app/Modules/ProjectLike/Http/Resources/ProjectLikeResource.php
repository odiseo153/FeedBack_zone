<?php

namespace App\Modules\ProjectLike\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProjectLikeResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'project_id' => $this->project_id,
            'user_id' => $this->user_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

            // Include relationships when loaded
            'user' => $this->whenLoaded('user'),
            'project' => $this->whenLoaded('project'),
        ];
    }
}
