<?php

namespace App\Modules\Rating\Http\Requests;

use App\Core\Http\Requests\BaseFormRequest;

class StoreRatingRequest extends BaseFormRequest
{
    public function rules()
    {
        return [
            'project_id' => 'required|exists:projects,id',
            'ui_ux_score' => 'required|integer|min:1|max:5',
            'performance_score' => 'required|integer|min:1|max:5',
            'code_quality_score' => 'required|integer|min:1|max:5',
            'innovation_score' => 'required|integer|min:1|max:5',
            'overall_score' => 'required|integer|min:1|max:5',
            'review_comment' => 'nullable|string|max:1000',
        ];
    }

    public function messages()
    {
        return [
            'project_id.required' => 'El proyecto es obligatorio.',
            'project_id.exists' => 'El proyecto seleccionado no existe.',
            'ui_ux_score.required' => 'La puntuación de UI/UX es obligatoria.',
            'ui_ux_score.between' => 'La puntuación de UI/UX debe estar entre 1 y 5.',
            'performance_score.required' => 'La puntuación de rendimiento es obligatoria.',
            'performance_score.between' => 'La puntuación de rendimiento debe estar entre 1 y 5.',
            'code_quality_score.required' => 'La puntuación de calidad de código es obligatoria.',
            'code_quality_score.between' => 'La puntuación de calidad debe estar entre 1 y 5.',
            'innovation_score.required' => 'La puntuación de innovación es obligatoria.',
            'innovation_score.between' => 'La puntuación de innovación debe estar entre 1 y 5.',
            'overall_score.required' => 'La puntuación general es obligatoria.',
            'overall_score.between' => 'La puntuación general debe estar entre 1 y 5.',
        ];
    }
}
