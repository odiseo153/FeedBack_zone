# 🚀 Spatie Query Builder - Ejemplos Prácticos

## URLs de ejemplo para el módulo Comment

### 🔍 Filtrado

```bash
# Comentarios de un proyecto específico
GET /comments?filter[project_id]=1

# Comentarios de un usuario específico  
GET /comments?filter[user_id]=3

# Comentarios que son respuestas (tienen parent_id)
GET /comments?filter[parent_id]=5

# Búsqueda parcial en el contenido
GET /comments?filter[content]=awesome

# Comentarios creados después de una fecha (usando scope)
GET /comments?filter[created_after]=2024-01-01

# Comentarios creados antes de una fecha (usando scope)  
GET /comments?filter[created_before]=2024-12-31

# Solo comentarios activos (usando scope)
GET /comments?filter[active]=1

# Combinando múltiples filtros
GET /comments?filter[project_id]=1&filter[user_id]=3&filter[active]=1
```

### 📊 Ordenamiento

```bash
# Más recientes primero
GET /comments?sort=-created_at

# Más antiguos primero
GET /comments?sort=created_at

# Por proyecto y luego por fecha
GET /comments?sort=project_id,-created_at

# Por usuario y luego por ID
GET /comments?sort=user_id,id
```

### 🔗 Relaciones (Include)

```bash
# Incluir usuario que comentó
GET /comments?include=user

# Incluir proyecto del comentario
GET /comments?include=project

# Incluir comentario padre (si es respuesta)
GET /comments?include=parent

# Incluir respuestas del comentario
GET /comments?include=replies

# Incluir múltiples relaciones
GET /comments?include=user,project,parent

# Relaciones anidadas (usuario del comentario padre)
GET /comments?include=parent.user,user
```

### 🎯 Combinaciones Avanzadas  

```bash
# Comentarios de un proyecto específico con usuarios incluidos, ordenados por fecha
GET /comments?filter[project_id]=1&include=user&sort=-created_at

# Comentarios activos con contenido específico, incluyendo proyecto y usuario
GET /comments?filter[active]=1&filter[content]=great&include=user,project&sort=-created_at

# Comentarios de usuario específico, con respuestas incluidas, paginado
GET /comments?filter[user_id]=3&include=replies&sort=-created_at&per_page=5

# Solo comentarios padre (top-level) de un proyecto
GET /comments?filter[project_id]=1&filter[parent_id]=null&include=user,replies&sort=-created_at

# Búsqueda compleja: comentarios activos de un proyecto, creados después de una fecha
GET /comments?filter[project_id]=1&filter[active]=1&filter[created_after]=2024-01-01&include=user&sort=-created_at&per_page=10
```

## 🧪 Cómo probar con cURL

### Ejemplo 1: Comentarios de un proyecto con usuario incluido
```bash
curl -X GET "http://localhost:8000/api/comments?filter[project_id]=1&include=user&sort=-created_at" \
     -H "Accept: application/json"
```

### Ejemplo 2: Búsqueda parcial con múltiples relaciones
```bash
curl -X GET "http://localhost:8000/api/comments?filter[content]=awesome&include=user,project&sort=-created_at&per_page=5" \
     -H "Accept: application/json"
```

### Ejemplo 3: Comentarios activos con paginación
```bash
curl -X GET "http://localhost:8000/api/comments?filter[active]=1&include=user,project&sort=-created_at&page=2&per_page=10" \
     -H "Accept: application/json"
```

## 📋 Respuestas Esperadas

### Sin includes
```json
{
  "data": [
    {
      "id": 1,
      "content": "This is an awesome project!",
      "project_id": 1,
      "user_id": 3,
      "parent_id": null,
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ],
  "links": { "..." },
  "meta": { "..." }
}
```

### Con includes (user, project)
```json
{
  "data": [
    {
      "id": 1,
      "content": "This is an awesome project!",
      "project_id": 1,
      "user_id": 3,
      "parent_id": null,
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z",
      "user": {
        "id": 3,
        "name": "John Doe",
        "email": "john@example.com"
      },
      "project": {
        "id": 1,
        "title": "Amazing Project",
        "description": "A really cool project"
      }
    }
  ],
  "links": { "..." },
  "meta": { "..." }
}
```

## ⚙️ Configuración de Filtros Personalizados

### En el modelo Comment agregamos scopes:
```php
// app/Models/Comment.php

public function scopeCreatedAfter(Builder $query, $date)
{
    return $query->where('created_at', '>=', $date);
}

public function scopeCreatedBefore(Builder $query, $date)
{
    return $query->where('created_at', '<=', $date);
}

public function scopeActive(Builder $query)
{
    return $query->where('status', 'active');
}

public function scopeByUser(Builder $query, $userId)
{
    return $query->where('user_id', $userId);
}

public function scopeTopLevel(Builder $query)
{
    return $query->whereNull('parent_id');
}
```

### En el repositorio los habilitamos:
```php
// app/Modules/Comment/Adapters/Repositories/CommentRepository.php

protected function setupDefaults()
{
    $this->allowedFilters = [
        AllowedFilter::exact('id'),
        AllowedFilter::exact('project_id'),
        AllowedFilter::exact('user_id'),
        AllowedFilter::exact('parent_id'),
        AllowedFilter::partial('content'),
        AllowedFilter::exact('status'),
        AllowedFilter::scope('created_after'),    // ← Habilita el scope
        AllowedFilter::scope('created_before'),   // ← Habilita el scope  
        AllowedFilter::scope('active'),           // ← Habilita el scope
    ];
}
```

## 🔧 Depuración y Desarrollo

### Ver la query SQL generada:
```php
// En tu repositorio o controlador
$comments = $this->query()
    ->toSql(); // Ver la SQL query

// O con bindings
$comments = $this->query()
    ->toRawSql(); // Ver la SQL con valores
```

### Obtener filtros permitidos programáticamente:
```php
// En tu controlador
public function getAvailableFilters()
{
    $repository = app(CommentRepositoryPort::class);
    
    return response()->json([
        'filters' => $repository->getAllowedFilters(),
        'sorts' => $repository->getAllowedSorts(),
        'includes' => $repository->getAllowedIncludes()
    ]);
}
```

## 🎨 Frontend Integration

### Con JavaScript/Fetch:
```javascript
// Función helper para construir URLs
function buildCommentsUrl(filters = {}, includes = [], sort = '-created_at', page = 1, perPage = 15) {
    const params = new URLSearchParams();
    
    // Agregar filtros
    Object.entries(filters).forEach(([key, value]) => {
        params.append(`filter[${key}]`, value);
    });
    
    // Agregar includes
    if (includes.length > 0) {
        params.append('include', includes.join(','));
    }
    
    // Agregar ordenamiento
    params.append('sort', sort);
    params.append('page', page);
    params.append('per_page', perPage);
    
    return `/api/comments?${params.toString()}`;
}

// Uso
const url = buildCommentsUrl(
    { project_id: 1, active: 1 },
    ['user', 'project'],
    '-created_at',
    1,
    10
);

fetch(url)
    .then(response => response.json())
    .then(data => console.log(data));
```

### Con React Query:
```javascript
import { useQuery } from '@tanstack/react-query';

function useComments(filters = {}, includes = [], sort = '-created_at', page = 1) {
    return useQuery({
        queryKey: ['comments', filters, includes, sort, page],
        queryFn: () => fetch(buildCommentsUrl(filters, includes, sort, page))
            .then(res => res.json())
    });
}

// En tu componente
function CommentsList({ projectId }) {
    const { data, isLoading } = useComments(
        { project_id: projectId, active: 1 },
        ['user', 'project'],
        '-created_at'
    );
    
    if (isLoading) return <div>Loading...</div>;
    
    return (
        <div>
            {data.data.map(comment => (
                <div key={comment.id}>
                    <strong>{comment.user.name}:</strong> {comment.content}
                </div>
            ))}
        </div>
    );
}
```

¡Spatie Query Builder hace que tu API sea increíblemente potente y flexible con muy poco código! 🚀 
