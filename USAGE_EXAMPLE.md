# Ejemplo de Uso del Patrón de Módulos con Spatie Query Builder

## Descripción
El patrón de módulos ahora está completamente conectado con **Spatie Query Builder** que proporciona filtrado, ordenamiento y paginación avanzada automática a través de parámetros de URL.

Solo necesitas definir:
1. **Entidad** - Las propiedades de tu modelo
2. **Resource** - Como se serializa la respuesta
3. **Request** - Las validaciones
4. **setupDefaults()** - Configurar filtros, ordenamientos e includes permitidos

## Pasos para crear un nuevo módulo

### 1. Ejecutar el comando
```bash
php artisan make:module Product
```

### 2. Registrar el ServiceProvider en `bootstrap/providers.php`
```php
<?php

return [
    App\Providers\AppServiceProvider::class,
    App\Modules\Comment\CommentServiceProvider::class,
    App\Modules\Product\ProductServiceProvider::class, // ← Agregar esta línea
];
```

### 3. Definir la entidad en `app/Modules/Product/Domain/Entities/Product.php`
```php
<?php

namespace App\Modules\Product\Domain\Entities;

class Product
{
    public $id;
    public $created_at;
    public $updated_at;
    
    // Propiedades específicas del producto
    public $name;
    public $description;
    public $price;
    public $status;
    public $category_id;

    public function __construct(array $data = [])
    {
        $this->id = $data['id'] ?? null;
        $this->created_at = $data['created_at'] ?? null;
        $this->updated_at = $data['updated_at'] ?? null;
        
        // Mapear propiedades específicas
        $this->name = $data['name'] ?? null;
        $this->description = $data['description'] ?? null;
        $this->price = $data['price'] ?? null;
        $this->status = $data['status'] ?? 'active';
        $this->category_id = $data['category_id'] ?? null;
    }
}
```

### 4. Configurar filtros, ordenamientos e includes en el repositorio
```php
// app/Modules/Product/Adapters/Repositories/ProductRepository.php

protected function setupDefaults()
{
    // Define allowed filters for Product
    $this->allowedFilters = [
        AllowedFilter::exact('id'),
        AllowedFilter::partial('name'),
        AllowedFilter::exact('status'),
        AllowedFilter::exact('category_id'),
        AllowedFilter::scope('price_between'), // Requires scope in model
        AllowedFilter::scope('active'),
        AllowedFilter::scope('created_after'),
    ];

    // Define allowed sorts for Product
    $this->allowedSorts = [
        AllowedSort::field('id'),
        AllowedSort::field('name'),
        AllowedSort::field('price'),
        AllowedSort::field('created_at'),
        AllowedSort::field('updated_at'),
    ];

    // Define allowed includes (relationships) for Product
    $this->allowedIncludes = [
        AllowedInclude::relationship('category'),
        AllowedInclude::relationship('user'),
        AllowedInclude::relationship('reviews'),
    ];

    // Set default sort
    $this->defaultSort = '-created_at';
}
```

### 5. Agregar scopes al modelo Eloquent (opcional)
```php
// app/Models/Product.php

public function scopePriceBetween(Builder $query, $range)
{
    [$min, $max] = explode(',', $range);
    return $query->whereBetween('price', [$min, $max]);
}

public function scopeActive(Builder $query)
{
    return $query->where('status', 'active');
}

public function scopeCreatedAfter(Builder $query, $date)
{
    return $query->where('created_at', '>=', $date);
}
```

### 6. Configurar el Resource
```php
<?php

namespace App\Modules\Product\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'price' => $this->price,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            
            // Incluir relaciones solo cuando se soliciten
            'category' => new CategoryResource($this->whenLoaded('category')),
            'user' => new UserResource($this->whenLoaded('user')),
        ];
    }
}
```

### 7. Definir validaciones
```php
<?php

namespace App\Modules\Product\Http\Requests;

use App\Core\Http\Requests\BaseFormRequest;

class StoreProductRequest extends BaseFormRequest
{
    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'status' => 'required|in:active,inactive',
            'category_id' => 'required|exists:categories,id',
        ];
    }
}
```

### 8. Definir rutas
```php
use App\Modules\Product\Adapters\Controllers\ProductController;

Route::apiResource('products', ProductController::class);
```

## 🚀 Ejemplos de URLs con Spatie Query Builder

### Filtrado
```
# Filtro exacto
GET /products?filter[status]=active
GET /products?filter[category_id]=1

# Filtro parcial (búsqueda)
GET /products?filter[name]=laptop

# Filtros con scopes
GET /products?filter[active]=1
GET /products?filter[price_between]=100,500
GET /products?filter[created_after]=2024-01-01

# Múltiples filtros
GET /products?filter[status]=active&filter[category_id]=1&filter[name]=laptop
```

### Ordenamiento
```
# Orden ascendente
GET /products?sort=name
GET /products?sort=price

# Orden descendente
GET /products?sort=-created_at
GET /products?sort=-price

# Múltiples ordenamientos
GET /products?sort=status,-created_at,name
```

### Incluir relaciones
```
# Incluir una relación
GET /products?include=category

# Incluir múltiples relaciones
GET /products?include=category,user,reviews

# Relaciones anidadas
GET /products?include=category.parent,user.profile
```

### Paginación
```
# Controlar elementos por página
GET /products?per_page=50

# Navegar páginas
GET /products?page=2&per_page=25
```

### Combinando todo
```
# Ejemplo complejo: productos activos, de categoría 1, ordenados por precio, 
# incluyendo categoría y usuario, con 10 elementos por página
GET /products?filter[status]=active&filter[category_id]=1&sort=-price&include=category,user&per_page=10

# Búsqueda de productos con precio entre 100-500, ordenados por nombre
GET /products?filter[name]=laptop&filter[price_between]=100,500&sort=name&include=category

# Productos creados después de cierta fecha, activos, con relaciones
GET /products?filter[created_after]=2024-01-01&filter[active]=1&include=category,user&sort=-created_at
```

## 📊 Respuesta de ejemplo

```json
{
  "data": [
    {
      "id": 1,
      "name": "Laptop Gaming",
      "description": "Powerful gaming laptop",
      "price": 1299.99,
      "status": "active",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z",
      "category": {
        "id": 1,
        "name": "Electronics"
      },
      "user": {
        "id": 1,
        "name": "John Doe"
      }
    }
  ],
  "links": {
    "first": "http://localhost/products?page=1",
    "last": "http://localhost/products?page=10",
    "prev": null,
    "next": "http://localhost/products?page=2"
  },
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 10,
    "per_page": 15,
    "to": 15,
    "total": 150
  }
}
```

## ✅ Características automáticas incluidas:

1. **Filtrado avanzado**: Por campos exactos, parciales y scopes personalizados
2. **Ordenamiento múltiple**: Ascendente y descendente en múltiples campos
3. **Inclusión de relaciones**: Carga automática bajo demanda
4. **Paginación inteligente**: Con metadatos completos
5. **Validación automática**: Solo filtros/ordenamientos permitidos
6. **Performance optimizada**: Solo carga lo que se necesita
7. **URLs RESTful**: Siguiendo estándares de la industria  
8. **Compatibilidad con frontend**: Ideal para React, Vue, Angular
9. **Documentación automática**: Los filtros disponibles son autodocumentados
10. **Seguridad**: Solo permite operaciones explícitamente definidas

## 🔧 Métodos adicionales disponibles:

```php
// En cualquier repositorio, también puedes usar:
$repository->query() // Retorna QueryBuilder para consultas custom
$repository->getAllowedFilters() // Lista filtros permitidos
$repository->getAllowedSorts() // Lista ordenamientos permitidos  
$repository->getAllowedIncludes() // Lista relaciones permitidas
```

¡Con este patrón tienes una API REST completa y potente con solo definir 4 archivos básicos! 
