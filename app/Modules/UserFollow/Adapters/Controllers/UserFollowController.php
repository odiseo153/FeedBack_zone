<?php

namespace App\Modules\UserFollow\Adapters\Controllers;

use Illuminate\Http\Request;
use App\Core\Controllers\BaseController;
use App\Modules\UserFollow\Http\Resources\UserFollowResource;
use App\Modules\UserFollow\Http\Requests\StoreUserFollowRequest;
use App\Modules\UserFollow\Domain\Services\ListUserFollowsService;
use App\Modules\UserFollow\Domain\Services\CreateUserFollowService;
use App\Modules\UserFollow\Domain\Services\FindByIdUserFollowService;

class UserFollowController extends BaseController
{
    public function __construct(
        CreateUserFollowService $createService,
        ListUserFollowsService $listService,
        FindByIdUserFollowService $findByIdService
    ) {
        $this->createService = $createService;
        $this->listService = $listService;
        $this->findByIdService = $findByIdService;
        $this->resourceClass = UserFollowResource::class;
    }

    public function store(StoreUserFollowRequest $request)
    {
        return parent::store($request);
    }
}