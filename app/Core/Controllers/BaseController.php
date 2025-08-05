<?php

namespace App\Core\Controllers;

use Illuminate\Http\Request;
use Illuminate\Foundation\Http\FormRequest;

abstract class BaseController
{
    protected $listService;
    protected $createService;
    protected $findByIdService;
    protected $updateService;
    protected $deleteService;
    protected $resourceClass;

    protected function getPerPage(Request $request, int $default = 100, int $max = 1000): int
    {
        $perPage = $request->query('per_page', $default);
        return max(1, min($perPage, $max));
    }

    /**
     * Generic index method
     */
    public function index(Request $request)
    {
        $perPage = $this->getPerPage($request);
        $items = $this->listService->execute($perPage);

        return $this->resourceClass::collection($items);
    }

    /**
     * Generic store method
     */
    public function store(FormRequest $request)
    {
        $item = $this->createService->execute($request->all());

        return new $this->resourceClass($item);
    }

    /**
     * Generic show method
     */
    public function show($id)
    {
        $item = $this->findByIdService->execute($id);

        return new $this->resourceClass($item);
    }

    /**
     * Generic update method
     */
    public function update(Request $request, $id)
    {
        $item = $this->updateService->execute($id, $request->all());

        return new $this->resourceClass($item);
    }

    /**
     * Generic destroy method
     */
    public function destroy($id)
    {
        $this->deleteService->execute($id);

        return response()->json(['message' => 'Resource deleted successfully'], 200);
    }
}
