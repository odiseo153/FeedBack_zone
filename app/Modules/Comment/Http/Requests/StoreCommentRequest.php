<?php

namespace App\Modules\Comment\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCommentRequest extends FormRequest
{
    public function rules()
    {
        return [
            'project_id'=>'required|exists:projects,id',
            'parent_id'=>'nullable|exists:comments,id',
            'content' =>'string|required',
            'type' =>'integer|required|in:1,2,3,4,5,6',
        ];
    }
}
