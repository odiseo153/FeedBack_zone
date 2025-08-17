<?php

namespace App\Modules\Project\Adapters\Controllers;

use App\Models\Tag;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Core\Controllers\BaseController;
use App\Modules\Project\Http\Resources\ProjectResource;
use App\Modules\Project\Http\Requests\StoreProjectRequest;
use App\Modules\Project\Domain\Services\ListProjectsService;
use App\Modules\Project\Domain\Services\CreateProjectService;
use App\Modules\Project\Domain\Services\DeleteProjectService;
use App\Modules\Project\Domain\Services\UpdateProjectService;
use App\Modules\Project\Domain\Services\FindByIdProjectService;

class ProjectController extends BaseController
{
    public function __construct(
        CreateProjectService $createService,
        ListProjectsService $listService,
        FindByIdProjectService $findByIdService,
        UpdateProjectService $updateService,
        DeleteProjectService $deleteService
    ) {
        $this->createService = $createService;
        $this->listService = $listService;
        $this->findByIdService = $findByIdService;
        $this->updateService = $updateService;
        $this->deleteService = $deleteService;
        $this->resourceClass = ProjectResource::class;
    }

    // The store method is inherited from BaseController
    // Validation will be handled by the FormRequest type-hinting in routes

    /**
     * Show projects index page (Web view)
     */
    public function indexWeb(Request $request)
    {
        $perPage = $this->getPerPage($request, 12);
        $projects = $this->listService->execute($perPage);

        return Inertia::render('Projects/Index', [
            'projects' => ProjectResource::collection($projects),
        ]);
    }

    /**
     * Show create project form (Web view)
     */
    public function create(Request $request)
    {
        $tags = Tag::orderBy('name')->get();

        return Inertia::render('Projects/Create', [
            'tags' => $tags,
        ]);
    }

    /**
     * Show project details page (Web view)
     */
    public function showWeb($id)
    {
        $project = $this->findByIdService->execute($id);

        if (!$project) {
            abort(404);
        }

        return Inertia::render('Projects/Show', [
            'project' => $project,
        ]);
    }

    /**
     * Show edit project form (Web view)
     */
    public function edit($id)
    {
        $project = $this->findByIdService->execute($id);

        if (!$project) {
            abort(404);
        }

        // Check if user owns the project
        if ($project->user_id !== auth()->id() && !auth()->user()->is_admin) {
            abort(403);
        }

        return Inertia::render('Projects/Edit', [
            'project' => $project,
        ]);
    }

    /**
     * Update project from web form
     */
    public function updateWeb(StoreProjectRequest $request, $id)
    {

        $project = $this->updateService->execute($id, $request->validated());

        return redirect()->route('projects.show', $project->id)
                        ->with('status', 'project-updated');
    }

    /**
     * Delete project (Web action)
     */
    public function destroyWeb($id)
    {
        $project = $this->findByIdService->execute($id);

        if (!$project) {
            abort(404);
        }

        // Check if user owns the project
        if ($project->user_id !== auth()->id()) {
            abort(403);
        }

        $this->deleteService->execute($id);

        return redirect()->route('projects.index')
                        ->with('status', 'project-deleted');
    }

    /**
     * Store project from web form
     */
    public function storeWeb(StoreProjectRequest $request)
    {
        $project = $this->createService->execute($request->all());

        return redirect()->route('projects.show', $project->id)
                        ->with('status', 'project-created');
    }

    /**
     * Toggle like for a project (Web action)
     */
    public function toggleLike($projectId)
    {
        // This would use ProjectLike module services
        // Implementation depends on your like logic

        return response()->json(['status' => 'toggled']);
    }
}
