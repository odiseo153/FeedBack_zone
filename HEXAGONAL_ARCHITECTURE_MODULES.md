# 🏗️ Sistema de Módulos con Arquitectura Hexagonal

## 📋 Descripción General

Este proyecto implementa un sistema completo de módulos basado en **Arquitectura Hexagonal** (Ports and Adapters pattern) con **Spatie Query Builder** para crear APIs REST potentes y flexibles.

## 🎯 Módulos Implementados

### ✅ Módulos Completamente Funcionales

1. **🙋‍♂️ User Module** - Gestión de usuarios
2. **📁 Project Module** - Gestión de proyectos  
3. **💬 Comment Module** - Sistema de comentarios
4. **⭐ Rating Module** - Sistema de calificaciones
5. **🏷️ Tag Module** - Gestión de etiquetas
6. **❤️ ProjectLike Module** - Sistema de likes

## 🏛️ Estructura de Arquitectura Hexagonal

Cada módulo sigue la estructura de arquitectura hexagonal:

```
app/Modules/{Entity}/
├── Domain/                          # ← Capa de Dominio
│   ├── Entities/                   # ← Entidades del dominio
│   │   └── {Entity}.php           # ← Entidad pura (sin dependencias de framework)
│   ├── Contracts/                  # ← Puertos (Interfaces)
│   │   └── {Entity}RepositoryPort.php  # ← Contrato del repositorio
│   └── Services/                   # ← Servicios de dominio
│       ├── Create{Entity}Service.php   # ← Caso de uso: Crear
│       ├── List{Entity}sService.php    # ← Caso de uso: Listar
│       └── FindById{Entity}Service.php # ← Caso de uso: Encontrar por ID
├── Adapters/                       # ← Adaptadores (Infraestructura)
│   ├── Controllers/                # ← Adaptadores de entrada (HTTP)
│   │   └── {Entity}Controller.php # ← Controlador REST
│   └── Repositories/               # ← Adaptadores de salida (Persistencia)
│       └── {Entity}Repository.php # ← Implementación del repositorio
├── Http/                          # ← Capa HTTP
│   ├── Requests/                  # ← Validación de entrada
│   │   └── Store{Entity}Request.php # ← Request para creación
│   └── Resources/                 # ← Transformación de salida
│       └── {Entity}Resource.php   # ← Resource para serialización
└── {Entity}ServiceProvider.php   # ← Registro de dependencias
```

## 🔧 Características Implementadas

### 🚀 Funcionalidades Automáticas

- ✅ **CRUD Completo**: Create, Read, Update, Delete
- ✅ **Filtrado Avanzado**: Por campos exactos, parciales y scopes  
- ✅ **Ordenamiento Múltiple**: Ascendente y descendente
- ✅ **Paginación Inteligente**: Con metadatos completos
- ✅ **Relaciones Bajo Demanda**: Carga solo cuando se solicita
- ✅ **Validación Automática**: Requests con reglas específicas
- ✅ **Respuestas Consistentes**: Resources estandarizados
- ✅ **Inyección de Dependencias**: Completamente configurada

### 🎛️ API Endpoints Disponibles

#### Rutas Base (CRUD Completo)
```http
# Users
GET    /api/v1/users
POST   /api/v1/users
GET    /api/v1/users/{id}
PUT    /api/v1/users/{id}
DELETE /api/v1/users/{id}

# Projects  
GET    /api/v1/projects
POST   /api/v1/projects
GET    /api/v1/projects/{id}
PUT    /api/v1/projects/{id}
DELETE /api/v1/projects/{id}

# Comments
GET    /api/v1/comments
POST   /api/v1/comments
GET    /api/v1/comments/{id}
PUT    /api/v1/comments/{id}
DELETE /api/v1/comments/{id}

# Ratings
GET    /api/v1/ratings
POST   /api/v1/ratings  
GET    /api/v1/ratings/{id}
PUT    /api/v1/ratings/{id}
DELETE /api/v1/ratings/{id}

# Tags
GET    /api/v1/tags
POST   /api/v1/tags
GET    /api/v1/tags/{id}
PUT    /api/v1/tags/{id}
DELETE /api/v1/tags/{id}

# Project Likes
GET    /api/v1/project-likes
POST   /api/v1/project-likes
GET    /api/v1/project-likes/{id}
DELETE /api/v1/project-likes/{id}
```

#### Rutas Específicas de Contexto
```http
# Comentarios de un proyecto específico
GET    /api/v1/projects/{project}/comments
POST   /api/v1/projects/{project}/comments

# Calificaciones de un proyecto específico  
GET    /api/v1/projects/{project}/ratings
POST   /api/v1/projects/{project}/ratings

# Likes de un proyecto específico
GET    /api/v1/projects/{project}/likes
POST   /api/v1/projects/{project}/like
DELETE /api/v1/projects/{project}/unlike

# Proyectos de un usuario específico
GET    /api/v1/users/{user}/projects
GET    /api/v1/users/{user}/comments
GET    /api/v1/users/{user}/ratings
GET    /api/v1/users/{user}/likes

# Proyectos de una etiqueta específica
GET    /api/v1/tags/{tag}/projects
```

## 🔍 Ejemplos de Uso con Spatie Query Builder

### 🙋‍♂️ User Module

```http
# Buscar usuarios verificados disponibles para contratar
GET /api/v1/users?filter[is_verified]=1&filter[is_available_for_hire]=1&sort=-reputation_score

# Usuarios con alta reputación, incluyendo sus proyectos
GET /api/v1/users?filter[reputation_above]=100&include=projects&sort=-reputation_score

# Usuarios activos recientemente por ubicación
GET /api/v1/users?filter[location]=Madrid&filter[active_recently]=1&sort=-last_active_at
```

### 📁 Project Module

```http
# Proyectos publicados por popularidad
GET /api/v1/projects?filter[status]=published&sort=-likes_count&include=user,tags

# Proyectos web app destacados con tecnología específica
GET /api/v1/projects?filter[project_type]=web_app&filter[featured]=1&filter[by_tech_stack]=React

# Proyectos recientes con comentarios y ratings
GET /api/v1/projects?filter[recent]=30&include=comments,ratings,user&sort=-created_at&per_page=10
```

### 💬 Comment Module

```http
# Comentarios de un proyecto específico con usuarios
GET /api/v1/comments?filter[project_id]=1&include=user,project&sort=-created_at

# Comentarios activos con contenido específico
GET /api/v1/comments?filter[active]=1&filter[content]=awesome&include=user&sort=-created_at

# Solo comentarios padre (no respuestas)
GET /api/v1/comments?filter[parent_id]=null&include=user,replies&sort=-created_at
```

### ⭐ Rating Module

```http
# Calificaciones altas de un proyecto
GET /api/v1/ratings?filter[project_id]=1&filter[high_rating]=1&include=user&sort=-overall_score

# Calificaciones recientes con puntuación específica
GET /api/v1/ratings?filter[overall_score]=5&filter[recent]=7&include=user,project&sort=-created_at
```

### 🏷️ Tag Module

```http
# Tags más populares por tipo
GET /api/v1/tags?filter[type]=technology&sort=-usage_count&include=projects

# Búsqueda de tags por nombre
GET /api/v1/tags?filter[name]=javascript&include=projects
```

### ❤️ ProjectLike Module

```http
# Likes de un usuario específico
GET /api/v1/project-likes?filter[user_id]=1&include=project,user&sort=-created_at

# Likes de un proyecto específico
GET /api/v1/project-likes?filter[project_id]=1&include=user&sort=-created_at
```

## 🏭 Generación de Nuevos Módulos

### Comando para Crear Módulos
```bash
php artisan make:module NombreDelModulo
```

### Pasos Post-Generación
1. **Personalizar Entidad**: Definir propiedades en `Domain/Entities/`
2. **Configurar Resource**: Mapear campos en `Http/Resources/`
3. **Definir Validaciones**: Reglas en `Http/Requests/`
4. **Configurar Filtros**: Personalizar `setupDefaults()` en Repository
5. **Registrar Provider**: Agregar a `bootstrap/providers.php`
6. **Definir Rutas**: Agregar a `routes/api.php`

## 📊 Beneficios de la Arquitectura

### 🎯 Principios SOLID
- **S**: Cada clase tiene una responsabilidad única
- **O**: Abierto para extensión, cerrado para modificación
- **L**: Las implementaciones pueden sustituirse sin romper el código
- **I**: Interfaces específicas y pequeñas
- **D**: Dependencias de abstracciones, no de concreciones

### 🔧 Mantenibilidad
- **Separación de responsabilidades** clara
- **Testabilidad** mejorada con inyección de dependencias
- **Flexibilidad** para cambiar implementaciones
- **Escalabilidad** horizontal de módulos

### 🚀 Performance
- **Consultas optimizadas** con Spatie Query Builder
- **Carga bajo demanda** de relaciones
- **Paginación eficiente** con metadatos
- **Filtrado en base de datos** en lugar de memoria

## 🧪 Testing

### Estructura de Tests Recomendada
```
tests/
├── Unit/
│   ├── Modules/
│   │   ├── User/
│   │   │   ├── Domain/
│   │   │   │   └── Services/
│   │   │   └── Adapters/
│   │   │       └── Repositories/
│   │   └── Project/
│   └── ...
└── Feature/
    ├── Api/
    │   ├── UserApiTest.php
    │   ├── ProjectApiTest.php
    │   └── ...
    └── ...
```

### Ejemplo de Test Unitario
```php
<?php

namespace Tests\Unit\Modules\User\Domain\Services;

use App\Modules\User\Domain\Services\CreateUserService;
use App\Modules\User\Domain\Contracts\UserRepositoryPort;
use Tests\TestCase;
use Mockery;

class CreateUserServiceTest extends TestCase
{
    public function test_can_create_user()
    {
        $repository = Mockery::mock(UserRepositoryPort::class);
        $service = new CreateUserService($repository);
        
        $userData = ['name' => 'John Doe', 'email' => 'john@example.com'];
        
        $repository->shouldReceive('create')
                  ->with($userData)
                  ->once()
                  ->andReturn(new User($userData));
        
        $result = $service->execute($userData);
        
        $this->assertInstanceOf(User::class, $result);
        $this->assertEquals('John Doe', $result->name);
    }
}
```

## 📈 Métricas y Monitoreo

### Endpoints de Información
```http
# Obtener filtros disponibles para un módulo
GET /api/v1/users/filters-info

# Estadísticas de uso
GET /api/v1/stats/modules

# Salud del sistema
GET /api/v1/health/modules
```

## 🔄 Migración y Versionado

### Versionado de API
- **v1**: Versión actual estable
- **v2**: Próximas funcionalidades (en desarrollo)

### Compatibilidad hacia atrás
- Los endpoints v1 se mantienen estables
- Cambios breaking solo en nuevas versiones
- Deprecación gradual con avisos

## 🛠️ Herramientas de Desarrollo

### Comandos Artisan Personalizados
```bash
# Generar módulo completo
php artisan make:module EntityName

# Generar solo entidad de dominio
php artisan make:domain-entity EntityName

# Generar solo repositorio con puerto
php artisan make:repository EntityName

# Generar servicio de dominio
php artisan make:domain-service EntityName ActionName
```

## 🎉 Resultado Final

**¡Sistema completamente funcional con arquitectura hexagonal!**

- ✅ **6 módulos independientes** con CRUD completo
- ✅ **API REST versionada** con filtrado avanzado  
- ✅ **Arquitectura hexagonal** siguiendo principios SOLID
- ✅ **Spatie Query Builder** para consultas potentes
- ✅ **Documentación completa** con ejemplos prácticos
- ✅ **Separación de responsabilidades** clara
- ✅ **Testeable y mantenible** a largo plazo

**¡Tu aplicación está lista para escalar! 🚀** 
