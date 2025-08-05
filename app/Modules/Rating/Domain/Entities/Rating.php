<?php

namespace App\Modules\Rating\Domain\Entities;

class Rating
{
    public $id;
    public $created_at;
    public $updated_at;

    // Rating-specific properties
    public $project_id;
    public $user_id;
    public $ui_ux_score;
    public $performance_score;
    public $code_quality_score;
    public $innovation_score;
    public $overall_score;
    public $review_comment;

    public function __construct(array $data = [])
    {
        $this->id = $data['id'] ?? null;
        $this->created_at = $data['created_at'] ?? null;
        $this->updated_at = $data['updated_at'] ?? null;

        // Map Rating properties
        $this->project_id = $data['project_id'] ?? null;
        $this->user_id = $data['user_id'] ?? null;
        $this->ui_ux_score = $data['ui_ux_score'] ?? null;
        $this->performance_score = $data['performance_score'] ?? null;
        $this->code_quality_score = $data['code_quality_score'] ?? null;
        $this->innovation_score = $data['innovation_score'] ?? null;
        $this->overall_score = $data['overall_score'] ?? null;
        $this->review_comment = $data['review_comment'] ?? null;
    }
}
