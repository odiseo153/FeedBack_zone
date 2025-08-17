<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class BaseModel extends Model
{
    use HasFactory, SoftDeletes;

    protected $hidden = [ 'updated_at'];

    public function getFormattedCreatedAt()
    {
        return $this->created_at->translatedFormat('l j \d\e F Y \a \l\a\s H:i');
    }

    public function getFormattedUpdatedAt()
    {
        return $this->updated_at->translatedFormat('l j \d\e F Y \a \l\a\s H:i');
        }

    /*
    protected static function bootSoftDeletes()
    {
        // No hacer nada: evita que se aplique el global scope de SoftDeletes
    }

    */
    protected static function boot()
    {
        parent::boot();

        // Agregar orden por defecto
        static::addGlobalScope('ordered', function ($query) {
            $query->orderBy('id','desc');
        });
    }

    public function scopeName($query, $name)
    {
        return $query->where('name', 'ilike', '%' . $name . '%');
    }

    public function scopeDateRange($query, $startDate, $endDate)
    {
        return $query->whereBetween('created_at', [$startDate, $endDate]);
    }
    public function saveFileAtributte($column, $file, $folder = 'files')
    {
        if ($file) {
            // If it's just a text/URL, store it directly
            if (is_string($file) && !str_starts_with($file, 'data:') && !is_uploaded_file($file)) {
                $this->attributes[$column] = $file;
                return $this->attributes[$column];
            }

            // Delete old file if it exists and is not a URL
            if ($this->$column && !str_starts_with($this->$column, 'http') && str_contains($this->$column, 'storage/')) {
                $oldFilePath = storage_path('app/public/' . str_replace('storage/', '', $this->$column));
                if (file_exists($oldFilePath)) {
                    unlink($oldFilePath);
                }
            }

            // Check if the file is base64 encoded
            if (is_string($file) && str_starts_with($file, 'data:')) {
                // Extract the base64 data
                $base64Data = substr($file, strpos($file, ',') + 1);
                $fileData = base64_decode($base64Data);

                // Get the file extension from the mime type
                preg_match('/data:([a-zA-Z0-9\/]+);/', $file, $matches);
                $mimeType = $matches[1] ?? 'application/octet-stream';

                // Map common mime types to extensions
                $mimeToExtension = [
                    'image/jpeg' => 'jpg',
                    'image/jpg' => 'jpg',
                    'image/png' => 'png',
                    'image/gif' => 'gif',
                    'image/webp' => 'webp',
                    'application/pdf' => 'pdf',
                    'text/plain' => 'txt',
                ];

                $extension = $mimeToExtension[$mimeType] ?? 'bin';

                // Generate a unique filename
                $filename = $folder . '/' . uniqid() . '.' . $extension;

                // Store the file
                \Storage::disk('public')->put($filename, $fileData);

                $this->attributes[$column] = 'storage/' . $filename;
            } else {
                // Handle regular file upload (File object)
                $this->attributes[$column] = 'storage/' . $file->store($folder, 'public');
            }
        }
        return $this->attributes[$column];
    }

    public function getNameAttribute($value)
    {
        return ucfirst($value);
    }
}




