<?php

namespace Shared\Traits;

trait ValidationRulesTrait
{
    /**
     * Converts a set of rules to an array set of rules.
     * from. 'field' => 'rule1|rule2'
     * to  'request_array_name.*.field' => 'rule1|rule2'
     * ex. 'arrangement_users.*.user_id' => 'exists:user,id'
     * where 'arrangement_users is an
     * @param string $arrayName
     * not adding
     * @param array $exceptFields
     * and gets the rules from
     * @param FormRequest $request
     *
     * @return array $rules
     */
    function toArrayRules(string $arrayName, array $exceptFields = [])
    {
        $rules = $this->rules();

        return self::toArrayRulesFor($rules, $arrayName, $exceptFields);
    }

    static function toArrayRulesFor(array $rules, string $arrayName, array $exceptFields = [])
    {
        $arrayRules = array();

        $rules = array_except($rules, $exceptFields);

        foreach ($rules as $field => $rule) {
            if (is_numeric(mb_substr($field, 0, 1))) {
                $arrayRules["$arrayName.$field"] = $rule;
            } else {
                $arrayRules["$arrayName.*.$field"] = $rule;
            }
        }

        return $arrayRules;
    }

    function rulesExcept(array $exceptFields = [])
    {
        $rules = array_except($this->rules(), $exceptFields);

        return $rules;
    }

    function spreadRules(string $field, array $exceptFields = [])
    {
        $rules = $this->rules();
        $rules = array_except($this->rules(), $exceptFields);
        return $this->spreadRulesFor($rules, $field);
    }

    function spreadRulesFor(array $rules, string $field)
    {
        $spreadRules = array();

        foreach ($rules as $key => $ruleset) {
            $spreadRules["$field.$key"] = $ruleset;
        }

        return $spreadRules;
    }

    // Static variants to get the rules.
    public static function getRules()
    {
        return with(new static)->rules();
    }

    public static function getRulesExcept(array $exceptFields = [])
    {
        return with(new static)->rulesExcept($exceptFields);
    }

    public static function getArrayRules(string $arrayName, array $exceptFields = [])
    {
        return with(new static)->toArrayRules($arrayName, $exceptFields);
    }
}
