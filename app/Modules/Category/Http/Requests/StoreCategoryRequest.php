<?php

namespace App\Modules\Category\Http\Requests;

use App\Core\Http\Requests\BaseFormRequest;

class StoreCategoryRequest extends BaseFormRequest
{
    public function rules()
    {
        return [
            // Define your validation rules here
            // 'name' => 'required|string|max:255',
            // 'description' => 'nullable|string',
            // 'status' => 'required|in:active,inactive',
        ];
    }

    public function messages()
    {
        return [
            // Custom error messages
            // 'name.required' => 'The name field is required.',
        ];
    }
}