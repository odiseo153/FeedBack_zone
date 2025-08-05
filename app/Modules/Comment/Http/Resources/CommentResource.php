<?php

namespace App\Modules\Comment\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserResource;
use App\Http\Resources\ProjectResource;

class CommentResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'type' => 'comments',
            'id' => $this->id,
            'attributes' => [
                'content' => $this->content,
                'likes_count' => $this->likes_count,
                'is_edited' => $this->is_edited,
                'edited_at' => $this->edited_at,
                'type' => $this->type,
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
            ],
            'links' => [
                'self' => route('comments.show', ['comment' => $this->id]),
            ],
            'relationships' => [
                'project' =>
                    $this->when($this->project, function() {
                        return $this->project;
                    })
                ,
                'user' =>
                    $this->when($this->user, function() {
                        return $this->user;
                    })
                ,
                'parent' =>
                     $this->when($this->parent, function() {
                        return $this->parent;
                    })

            ],
        ];
    }
}
