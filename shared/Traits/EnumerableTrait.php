<?php

namespace Shared\Traits;

trait EnumerableTrait
{
    abstract public static function cases();

    public static function names()
    {
        return array_column(static::cases(), 'name');
    }

    public static function values()
    {
        return array_column(static::cases(), 'value');
    }

    public static function get($value)
    {
        return array_first(static::cases(), function ($case, $key) use ($value) {
            return $case->value === $value || $case->name === $value;
        });
    }

    public static function indexOf($constant)
    {
        return array_search($constant->value, static::values()) + 1;
    }
}