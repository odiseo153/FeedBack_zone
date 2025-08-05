<?php

namespace App\Modules\Rating\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RatingResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'project_id' => $this->project_id,
            'user_id' => $this->user_id,
            'ui_ux_score' => $this->ui_ux_score,
            'performance_score' => $this->performance_score,
            'code_quality_score' => $this->code_quality_score,
            'innovation_score' => $this->innovation_score,
            'overall_score' => $this->overall_score,
            'review_comment' => $this->review_comment,
            'average_sub_scores' => $this->getAverageSubScores(),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

            // Include relationships when loaded
            'user' => $this->whenLoaded('user'),
            'project' => $this->whenLoaded('project'),
        ];
    }

    private function getAverageSubScores()
    {
        $scores = array_filter([
            $this->ui_ux_score,
            $this->performance_score,
            $this->code_quality_score,
            $this->innovation_score,
        ]);

        return count($scores) > 0 ? round(array_sum($scores) / count($scores), 1) : 0;
    }
}
