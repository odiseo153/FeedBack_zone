<?php

use Illuminate\Console\Application;

if (!function_exists('isArrayBidi')) {
    function isArrayBidi($var)
    {
        if (is_array($var)) {
            foreach ($var as $element)
                if (is_array($element))
                    return true;
        }
        return false;
    }
}

if (!function_exists('get_ext_from_base64')) {
    function get_ext_from_base64(string $base64)
    {
        try {
            return explode(',', explode('/', explode(';', $base64)[0])[1])[0];
        } catch (\Throwable $th) {
            return false;
        }
    }
}

/**
 * @param string $base64 file
 * @return int $sizeInMb
 */
if (!function_exists('get_base64_file_size')) {
    function get_base64_file_size(string $base64)
    {
        try {
            $sizeInBytes = (int) (strlen(rtrim($base64, '=')) * 3 / 4);
            $sizeInKb = $sizeInBytes / 1024;
            $sizeInMb = $sizeInKb / 1024;
            return (float) $sizeInMb;
        } catch (\Throwable $th) {
            return false;
        }
    }
}

if (!function_exists('is_max_size')) {
    function is_max_size(float $file_size)
    {
        return $file_size <= MAXIMUM_FILE_SIZE;
    }
}

if (!function_exists('get_all_allowed_file_formats')) {
    function get_all_allowed_file_formats()
    {
        $allAllowedFileFormats = [];

        foreach (FILE_FORMATS as $format) {
            $allAllowedFileFormats = array_merge($allAllowedFileFormats, $format);
        }

        return $allAllowedFileFormats;
    }
}

if (!function_exists("is_date")) {
    function is_date($date)
    {
        if (date(MYSQL_DATE_FORMAT, strtotime($date)) == $date)
            return true;
        else
            return false;
    }
}

if (!function_exists("array_intersect_multi_assoc")) {
    function array_intersect_multi_assoc($array, $key1, $key2)
    {
        $filteredArray = [];

        foreach ($array as $element) {
            $duplicateFound = false;
            foreach ($filteredArray as $filteredElement) {
                if ($element[$key1] == $filteredElement[$key1] && $element[$key2] == $filteredElement[$key2]) {
                    $duplicateFound = true;
                    break;
                }
            }
            if (!$duplicateFound)
                $filteredArray[] = $element;
        }

        return $filteredArray;
    }
}

if (!function_exists("unsort_date")) {
    function unsort_date($dates)
    {
        usort($dates, function ($a, $b) {
            // Convert dates to UNIX
            $dateUnixA = strtotime($a);
            $dateUnixB = strtotime($b);

            return ($dateUnixA > $dateUnixB) ? -1 : 1;
        });

        return $dates;
    }
}

if (!function_exists("sort_date")) {
    function sort_date($dates)
    {
        usort($dates, function ($a, $b) {
            // Convert dates to UNIX
            $dateUnixA = strtotime($a);
            $dateUnixB = strtotime($b);

            return ($dateUnixA < $dateUnixB) ? -1 : 1;
        });

        return $dates;
    }
}

if (!function_exists('app_namespace')) {
    function app_namespace()
    {
        try {
            return Illuminate\Container\Container::getInstance()
                ->make(Application::class)
                ->getNamespace();
        } catch (Throwable $e) {
            return 'App\\';
        }
    }
}

if (!function_exists('get_class_module')) {
    function get_class_module($class)
    {
        /**
         * Get the application namespace for the class.
         *
         * @return string
         */
        $appNamespace = app_namespace();

        $modularizedNamespaces = [
            $appNamespace . "Events",
            $appNamespace . "Http\\Controllers",
            $appNamespace . "Http\\Resources",
            $appNamespace . "Http\\Requests",
            $appNamespace . "Listeners",
            $appNamespace . "Models",
            $appNamespace . "Observers",
            $appNamespace . "Policies",
            $appNamespace . "Providers",
            $appNamespace . "Repositories",
            $appNamespace . "UnitsOfWork",
            $appNamespace . "Validators",
            "Database\\Factories",
            "Tests\\Feature",
            "Tests\\Unit"
        ];

        // Allow to introduce a model instance to get the module name.
        // if($class instanceof Illuminate\Database\Eloquent\Model)

        // To make sure we don't get a false positive, we check if the class' namespace is indeed on a moduralized namespace.
        $isInModularizedNamespace = false;

        foreach ($modularizedNamespaces as $modularizedNamespace) {
            // Checking the class namespace starts with the modularized namespace.
            if (strpos($class, $modularizedNamespace) === 0) {
                $class = str_replace($modularizedNamespace, '', $class);
                $isInModularizedNamespace = true;
                break;
            }
        }

        if (!$isInModularizedNamespace)
            return null;

        $classNameParts = explode('\\', $class);

        // Pop the actual class name off the end of the namespace.
        array_pop($classNameParts);

        // Get the module, it will be the first of the parts. ex. Petitions\\Arrangements\\Class, result will be Petitions.
        foreach ($classNameParts as $part) {
            if (in_array($part, SystemModule::values())) {
                $lowercasePart = Illuminate\Support\Str::lower($part);

                // Module found.
                return constant("\\SystemModule::" . $lowercasePart);
            }
        }

        return null;
    }
}

if (! function_exists('array_columns')) {
    /**
     * Return the given value, optionally passed through the given callback.
     *
     * @template TValue
     * @template TReturn
     *
     * @param  TValue  $value
     * @param  (callable(TValue): (TReturn))|null  $callback
     * @return ($callback is null ? TValue : TReturn)
     */
    function array_columns(array $array, array $columns_key): array
    {
        $columns = [];

        foreach($columns_key as $column) {
            $columns[$column] = array_column($array, $column);
        }
        return $columns;
    }
}

if (! function_exists('classNameExistsInModels')) {
    function classNameExistsInModels(string $targetClass): bool
    {
        $basePath = app_path('Models');
        $iterator = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($basePath)
        );

        foreach ($iterator as $file) {
            if ($file->isFile() && $file->getExtension() === 'php') {
                $relativePath = \Illuminate\Support\Str::after($file->getPathname(), app_path() . DIRECTORY_SEPARATOR);
                $class = 'App\\' . str_replace(
                    ['/', '.php'],
                    ['\\', ''],
                    $relativePath
                );

                if (class_exists($class)) {
                    if (class_basename($class) === $targetClass) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

}

/**
 * Get the class path of a given class name.
 */
if (! function_exists('getClassPath')) {
    function getClassPath(string $targetClass)
    {
        $basePath = app_path('Models');
        $iterator = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($basePath)
        );

        foreach ($iterator as $file) {
            if ($file->isFile() && $file->getExtension() === 'php') {
                $relativePath = \Illuminate\Support\Str::after($file->getPathname(), app_path() . DIRECTORY_SEPARATOR);
                $class = 'App\\' . str_replace(
                    ['/', '.php'],
                    ['\\', ''],
                    $relativePath
                );

                if (class_exists($class)) {
                    if (class_basename($class) === $targetClass) {
                        return $class;
                    }
                }
            }
        }

        return false;
    }

}