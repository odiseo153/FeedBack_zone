<?php

namespace App\Modules\UserFollow\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserFollowResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

            // Map your resource attributes here
            // 'name' => $this->name,
            // 'description' => $this->description,
            // 'status' => $this->status,

            // Include relationships
            // 'user' => new UserResource($this->whenLoaded('user')),
        ];
    }
}