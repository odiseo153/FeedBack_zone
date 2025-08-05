<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class CreateModule extends Command
{
    protected $signature = 'make:module {PascalCaseName}';
    protected $description = 'Creates a new module with its files and subdirectories.';

    public function handle()
    {
        $moduleName = $this->argument('PascalCaseName');

        $directories = $this->getModuleDirectories($moduleName);
        $this->createDirectories($directories);

        $this->createModuleClassesAndInterfaces($moduleName);

        $this->info("Module $moduleName created successfully.");
        $this->info("Next steps:");
        $this->info("1. Define your entity properties in Domain/Entities/{$moduleName}.php");
        $this->info("2. Configure your resource mapping in Http/Resources/{$moduleName}Resource.php");
        $this->info("3. Set validation rules in Http/Requests/Store{$moduleName}Request.php");
        $this->info("4. Customize the getAll method in Adapters/Repositories/{$moduleName}Repository.php if needed");
        $this->info("5. Register the service provider in bootstrap/providers.php");
    }

    private function getModuleDirectories(string $moduleName): array
    {
        $directories = [
            app_path("Modules/$moduleName/Adapters/Controllers"),
            app_path("Modules/$moduleName/Adapters/Repositories"),
            app_path("Modules/$moduleName/Domain/Contracts"),
            app_path("Modules/$moduleName/Domain/Entities"),
            app_path("Modules/$moduleName/Domain/Services"),
            app_path("Modules/$moduleName/Http/Requests"),
            app_path("Modules/$moduleName/Http/Resources"),
            app_path("Modules/$moduleName")
        ];

        return $directories;
    }

    private function createDirectories(array $directories): void
    {
        foreach ($directories as $directory) {
            if (!File::exists($directory)) {
                File::makeDirectory($directory, 0777, true);
                $this->info("Created directory: $directory");
            } else {
                $this->comment("Directory already exists: $directory");
            }
        }
    }

    private function createModuleClassesAndInterfaces(string $moduleName): void
    {
        $files = [
            // Controlador completamente conectado
            [
                'type' => 'controller',
                'path' => "Modules/$moduleName/Adapters/Controllers/{$moduleName}Controller.php",
                'content' => $this->generateControllerContent($moduleName)
            ],
            // Repositorio conectado con BaseRepository
            [
                'type' => 'repository',
                'path' => "Modules/$moduleName/Adapters/Repositories/{$moduleName}Repository.php",
                'content' => $this->generateRepositoryContent($moduleName)
            ],
            // Interfaz del repositorio extendiendo BaseRepositoryPort
            [
                'type' => 'repositoryInterface',
                'path' => "Modules/$moduleName/Domain/Contracts/{$moduleName}RepositoryPort.php",
                'content' => $this->generateRepositoryInterfaceContent($moduleName)
            ],
            // Entidad básica
            [
                'type' => 'entity',
                'path' => "Modules/$moduleName/Domain/Entities/{$moduleName}.php",
                'content' => $this->generateEntityContent($moduleName)
            ],
            // Servicios conectados
            [
                'type' => 'service',
                'path' => "Modules/$moduleName/Domain/Services/Create{$moduleName}Service.php",
                'content' => $this->generateCreateServiceContent($moduleName)
            ],
            [
                'type' => 'service',
                'path' => "Modules/$moduleName/Domain/Services/List{$moduleName}sService.php",
                'content' => $this->generateListServiceContent($moduleName)
            ],
            [
                'type' => 'service',
                'path' => "Modules/$moduleName/Domain/Services/FindById{$moduleName}Service.php",
                'content' => $this->generateFindByIdServiceContent($moduleName)
            ],
            // Request con validaciones básicas
            [
                'type' => 'request',
                'path' => "Modules/$moduleName/Http/Requests/Store{$moduleName}Request.php",
                'content' => $this->generateRequestContent($moduleName)
            ],
            // Resource básico
            [
                'type' => 'resource',
                'path' => "Modules/$moduleName/Http/Resources/{$moduleName}Resource.php",
                'content' => $this->generateResourceContent($moduleName)
            ],
            // ServiceProvider completamente configurado
            [
                'type' => 'serviceProvider',
                'path' => "Modules/$moduleName/{$moduleName}ServiceProvider.php",
                'content' => $this->generateServiceProviderContent($moduleName)
            ]
        ];

        foreach ($files as $file) {
            $this->createFile(app_path($file['path']), $file['content'], $file['type']);
        }
    }

    private function generateControllerContent(string $moduleName): string
    {
        return "<?php

namespace App\\Modules\\$moduleName\\Adapters\\Controllers;

use Illuminate\\Http\\Request;
use App\\Core\\Controllers\\BaseController;
use App\\Modules\\$moduleName\\Http\\Resources\\{$moduleName}Resource;
use App\\Modules\\$moduleName\\Http\\Requests\\Store{$moduleName}Request;
use App\\Modules\\$moduleName\\Domain\\Services\\List{$moduleName}sService;
use App\\Modules\\$moduleName\\Domain\\Services\\Create{$moduleName}Service;
use App\\Modules\\$moduleName\\Domain\\Services\\FindById{$moduleName}Service;

class {$moduleName}Controller extends BaseController
{
    public function __construct(
        Create{$moduleName}Service \$createService,
        List{$moduleName}sService \$listService,
        FindById{$moduleName}Service \$findByIdService
    ) {
        \$this->createService = \$createService;
        \$this->listService = \$listService;
        \$this->findByIdService = \$findByIdService;
        \$this->resourceClass = {$moduleName}Resource::class;
    }

    public function store(Store{$moduleName}Request \$request)
    {
        return parent::store(\$request);
    }
}";
    }

    private function generateRepositoryContent(string $moduleName): string
    {
        $modelName = strtolower($moduleName);
        return "<?php

namespace App\\Modules\\$moduleName\\Adapters\\Repositories;

use App\\Models\\$moduleName as {$moduleName}Model;
use App\\Core\\Repositories\\BaseRepository;
use App\\Modules\\$moduleName\\Domain\\Contracts\\{$moduleName}RepositoryPort;
use App\\Modules\\$moduleName\\Domain\\Entities\\$moduleName;
use Illuminate\\Contracts\\Pagination\\LengthAwarePaginator;
use Spatie\\QueryBuilder\\AllowedFilter;
use Spatie\\QueryBuilder\\AllowedSort;
use Spatie\\QueryBuilder\\AllowedInclude;

class {$moduleName}Repository extends BaseRepository implements {$moduleName}RepositoryPort
{
    public function __construct()
    {
        parent::__construct({$moduleName}Model::class);
    }

    /**
     * Setup {$moduleName}-specific filters, sorts and includes
     * Customize this method to define what can be filtered, sorted, and included
     */
    protected function setupDefaults()
    {
        // Define allowed filters for {$moduleName}
        \$this->allowedFilters = [
            AllowedFilter::exact('id'),
            AllowedFilter::partial('name'), // Example: partial search on name
            AllowedFilter::exact('status'),
            AllowedFilter::exact('created_at'),
            AllowedFilter::exact('updated_at'),
            // Add more filters as needed:
            // AllowedFilter::exact('user_id'),
            // AllowedFilter::scope('created_after'), // Requires scope in model
            // AllowedFilter::scope('active'), // Requires scope in model
        ];

        // Define allowed sorts for {$moduleName}
        \$this->allowedSorts = [
            AllowedSort::field('id'),
            AllowedSort::field('name'),
            AllowedSort::field('status'),
            AllowedSort::field('created_at'),
            AllowedSort::field('updated_at'),
            // Add more sorts as needed:
            // AllowedSort::field('user_id'),
        ];

        // Define allowed includes (relationships) for {$moduleName}
        \$this->allowedIncludes = [
            // Add relationships that can be included:
            // AllowedInclude::relationship('user'),
            // AllowedInclude::relationship('category'),
        ];

        // Set default sort
        \$this->defaultSort = '-created_at';
    }

    public function getAll(int \$perPage, array \$filters = [], array \$sorts = [], string \$defaultSort = '-created_at', array \$with = []): LengthAwarePaginator
    {
        // Spatie Query Builder will automatically handle:
        // - Filtering: GET /{$modelName}s?filter[name]=example&filter[status]=active
        // - Sorting: GET /{$modelName}s?sort=-created_at,name
        // - Including: GET /{$modelName}s?include=user,category
        // - Combining: GET /{$modelName}s?filter[status]=active&sort=-created_at&include=user

        return parent::getAll(\$perPage, \$filters, \$sorts, \$defaultSort, \$with);
    }

    public function create(array \$data)
    {
        // Add any specific logic before creation
        // \$data['user_id'] = auth()->id(); // Example: Set current user

        \${$modelName} = {$moduleName}Model::create(\$data);

        // Load relationships if needed
        // \${$modelName}->load(['user', 'category']);

        return new $moduleName(\${$modelName}->toArray());
    }

    public function findById(\$id)
    {
        \${$modelName} = {$moduleName}Model::find(\$id);

        if (!\${$modelName}) {
            return null;
        }

        // Load relationships if needed
        // \${$modelName}->load(['user', 'category']);

        return new $moduleName(\${$modelName}->toArray());
    }
}";
    }

    private function generateRepositoryInterfaceContent(string $moduleName): string
    {
        return "<?php

namespace App\\Modules\\$moduleName\\Domain\\Contracts;

use App\\Core\\Repositories\\BaseRepositoryPort;

interface {$moduleName}RepositoryPort extends BaseRepositoryPort
{
    // Add any specific methods for this module here
    // Example: public function findByStatus(string \$status);
}";
    }

    private function generateEntityContent(string $moduleName): string
    {
        return "<?php

namespace App\\Modules\\$moduleName\\Domain\\Entities;

class $moduleName
{
    public \$id;
    public \$created_at;
    public \$updated_at;

    // Add your entity properties here
    // public \$name;
    // public \$description;
    // public \$status;

    public function __construct(array \$data = [])
    {
        \$this->id = \$data['id'] ?? null;
        \$this->created_at = \$data['created_at'] ?? null;
        \$this->updated_at = \$data['updated_at'] ?? null;

        // Map your properties here
        // \$this->name = \$data['name'] ?? null;
        // \$this->description = \$data['description'] ?? null;
        // \$this->status = \$data['status'] ?? 'active';
    }
}";
    }

    private function generateCreateServiceContent(string $moduleName): string
    {
        return "<?php

namespace App\\Modules\\$moduleName\\Domain\\Services;

use App\\Core\\Services\\CreateService;
use App\\Modules\\$moduleName\\Domain\\Contracts\\{$moduleName}RepositoryPort;

class Create{$moduleName}Service extends CreateService
{
    public function __construct({$moduleName}RepositoryPort \$repository)
    {
        parent::__construct(\$repository);
    }
}";
    }

    private function generateListServiceContent(string $moduleName): string
    {
        return "<?php

namespace App\\Modules\\$moduleName\\Domain\\Services;

use App\\Core\\Services\\ListService;
use App\\Modules\\$moduleName\\Domain\\Contracts\\{$moduleName}RepositoryPort;

class List{$moduleName}sService extends ListService
{
    public function __construct({$moduleName}RepositoryPort \$repository)
    {
        parent::__construct(\$repository);
    }
}";
    }

    private function generateFindByIdServiceContent(string $moduleName): string
    {
        return "<?php

namespace App\\Modules\\$moduleName\\Domain\\Services;

use App\\Core\\Services\\FindByIdService;
use App\\Modules\\$moduleName\\Domain\\Contracts\\{$moduleName}RepositoryPort;

class FindById{$moduleName}Service extends FindByIdService
{
    public function __construct({$moduleName}RepositoryPort \$repository)
    {
        parent::__construct(\$repository);
    }
}";
    }

    private function generateRequestContent(string $moduleName): string
    {
        return "<?php

namespace App\\Modules\\$moduleName\\Http\\Requests;

use App\\Core\\Http\\Requests\\BaseFormRequest;

class Store{$moduleName}Request extends BaseFormRequest
{
    public function rules()
    {
        return [
            // Define your validation rules here
            // 'name' => 'required|string|max:255',
            // 'description' => 'nullable|string',
            // 'status' => 'required|in:active,inactive',
        ];
    }

    public function messages()
    {
        return [
            // Custom error messages
            // 'name.required' => 'The name field is required.',
        ];
    }
}";
    }

    private function generateResourceContent(string $moduleName): string
    {
        return "<?php

namespace App\\Modules\\$moduleName\\Http\\Resources;

use Illuminate\\Http\\Resources\\Json\\JsonResource;

class {$moduleName}Resource extends JsonResource
{
    public function toArray(\$request)
    {
        return [
            'id' => \$this->id,
            'created_at' => \$this->created_at,
            'updated_at' => \$this->updated_at,

            // Map your resource attributes here
            // 'name' => \$this->name,
            // 'description' => \$this->description,
            // 'status' => \$this->status,

            // Include relationships
            // 'user' => new UserResource(\$this->whenLoaded('user')),
        ];
    }
}";
    }

    private function generateServiceProviderContent(string $moduleName): string
    {
        return "<?php

                namespace App\\Modules\\$moduleName;

                use App\\Modules\\$moduleName\\Adapters\\Repositories\\{$moduleName}Repository;
                use App\\Modules\\$moduleName\\Domain\\Contracts\\{$moduleName}RepositoryPort;
                use Illuminate\\Support\\ServiceProvider;

                    class {$moduleName}ServiceProvider extends ServiceProvider
                    {
                        public function register()
                        {
        \$this->app->bind({$moduleName}RepositoryPort::class, {$moduleName}Repository::class);
                        }

                        public function boot()
                        {
        // Register routes, views, etc.
    }
}";
    }

    private function createFile(string $filePath, string $content, string $type): void
    {
        if (!File::exists($filePath)) {
            file_put_contents($filePath, $content);
            $this->info("Created file: $filePath");
        } else {
            $this->comment("File already exists: $filePath");
        }
    }
}
