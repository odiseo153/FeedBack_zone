<?php

namespace Shared\Facades;

use Illuminate\Support\Facades\Validator;
use App\Exceptions\BusinessRuleException;

/**
 * The laravel Validator facede works in many ways, one of them is to validate the information.
 * The idea is to encapsulate the response of (the fails() or validated() information and what is done with it) from what is done with the facade
 */
class ValidationUtils
{
    /**
     * In case you need to validate data and report an exception as failure message.
     */
    public function validateException(array $params, array $rules, string $message = null)
    {
        $validator = Validator::make($params, $rules);
        if ($validator->fails())
            throw new BusinessRuleException($message ?? 'An error occurred while validating the data. Please check.');
        else
            return $validator->validated();
    }
}
