<?php

namespace App\Modules\UserFollow\Http\Requests;

use App\Core\Http\Requests\BaseFormRequest;

class StoreUserFollowRequest extends BaseFormRequest
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