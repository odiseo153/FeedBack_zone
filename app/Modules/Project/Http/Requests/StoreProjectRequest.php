<?php

namespace App\Modules\Project\Http\Requests;

use App\Core\Http\Requests\BaseFormRequest;

class StoreProjectRequest extends BaseFormRequest
{
    public function rules()
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'github_url' => 'nullable|url',
            'live_url' => 'nullable|url',
            'thumbnail' => 'nullable|file',
            'project_type' => 'required|string',
            'feedback_request' => 'nullable|string',
            'status' => 'required|string',
            'tech_stack' => 'nullable|array',
            'tech_stack.*' => 'string|max:50',
            'tag_ids' => 'nullable|array',
            'tag_ids.*' => 'integer|exists:tags,id',
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'El título del proyecto es obligatorio.',
            'description.required' => 'La descripción es obligatoria.',
            'project_type.required' => 'El tipo de proyecto es obligatorio.',
            'project_type.in' => 'El tipo de proyecto debe ser válido.',
            'status.required' => 'El estado del proyecto es obligatorio.',
            'status.in' => 'El estado debe ser: borrador, publicado o archivado.',
            'github_url.url' => 'La URL de GitHub debe ser válida.',
            'live_url.url' => 'La URL en vivo debe ser válida.',
            'thumbnail.url' => 'La URL de la imagen debe ser válida.',
        ];
    }
}
