<?php

namespace Shared\Facades;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File as FS;
use Illuminate\Support\Facades\Storage;

class File
{
    public static function saveByModelRequest(Model | string $model, &$attrs)
    {
        $folderName = $model instanceof Model ? class_basename($model) : class_basename(new $model);
        $path = STORAGE_DEFAULT_FOLDER . "/" . $folderName . "/";
        $keyFileName = self::getKeyName($attrs);

        if (!empty($attrs[$keyFileName])) {
            $filename = self::generateFileNameFromBase64($attrs[$keyFileName]);
            $path = $path . $filename;

            $contentBase64 = base64_decode(explode(',', $attrs[$keyFileName])[1]);

            // Max file allowed (example, 5MB)
            $maxSizeInBytes = MAXIMUM_FILE_SIZE * 1024 * 1024; // 5 MB

            if (strlen($contentBase64) > $maxSizeInBytes) {
                throw new \Exception('The file is to big. Maximun file size is ' . MAXIMUM_FILE_SIZE . "MB");
            }

            Storage::put($path, $contentBase64, [
                'visibility' => 'public'
            ]);

            $attrs[$keyFileName] = $path;
        }

        return $attrs;
    }

    private static function getKeyName($attr)
    {
        foreach ($attr as $keyName => $value) {
            if (strpos($keyName, 'file_path') !== false) {
                return $keyName;
            }
        }
        return null;
    }

    // Creates a random filename with the date and the extension.
    private static function generateFileNameFromBase64(string $base64)
    {
        $now = now()->format('Y-m-d-H-i-s-v');
        $randomString = Str::random(10);
        $extension = get_ext_from_base64($base64);

        return  "{$randomString}-{$now}.{$extension}";
    }
}
