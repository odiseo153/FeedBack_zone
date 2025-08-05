<?php

namespace Shared\Facades;

use Illuminate\Support\Str;

class StrUtils
{
    public static function resolveModelName(string $modelName, string $appNamespace)
    {
        return $modelName = Str::startsWith($modelName, $appNamespace . 'Models\\')
            ? Str::after($modelName, $appNamespace . 'Models\\')
            : Str::after($modelName, $appNamespace);
    }

    function snakeToPascalCase($string)
    {
        $words = explode('_', $string);
        $result = '';

        foreach ($words as $i => $word) {
            $result .= ucfirst($word);
        }

        return $result;
    }
    /**
     * @param string $name
     * @param array $pool the pool of names to compare with
     * Takes each word and finds the closest match, the name with the most coincidences.
     * @return string
     */
    function guessMatchingName($name, $pool)
    {
        // return the word in pool with the highest similarity to name
        if (is_a($pool, 'Illuminate\Support\Collection'))
            $pool = $pool->toArray();

        $name = strtolower($name);
        $pool = array_map('strtolower', $pool);
        $max = 0;
        $maxWord = '';
        foreach ($pool as $word) {
            $similarity = similar_text($name, $word);
            if ($similarity > $max) {
                $max = $similarity;
                $maxWord = $word;
            }
        }

        return $maxWord;
    }

    public function hasAccentMark(string $text)
    {
        return preg_match('/[áéíóúÁÉÍÓÚüÜ]/', $text);
    }

    public function removeAccentMark(string $text)
    {
        return str_replace(['á', 'é', 'í', 'ó', 'ú', 'ü'], ['a', 'e', 'i', 'o', 'u', 'u'], $text);
    }
}
