<?php

namespace App\Modules\Comment\Adapters\Controllers;

use Illuminate\Http\Request;
use App\Core\Controllers\BaseController;
use App\Modules\Comment\Http\Resources\CommentResource;
use App\Modules\Comment\Http\Requests\StoreCommentRequest;
use App\Modules\Comment\Domain\Services\ListCommentsService;
use App\Modules\Comment\Domain\Services\CreateCommentService;
use App\Modules\Comment\Domain\Services\FindByIdCommentService;

class CommentController extends BaseController
{
    public function __construct(
        CreateCommentService $createCommentService,
        ListCommentsService $listCommentsService,
        FindByIdCommentService $findByIdCommentService
    ) {
        $this->createService = $createCommentService;
        $this->listService = $listCommentsService;
        $this->findByIdService = $findByIdCommentService;
        $this->resourceClass = CommentResource::class;
    }

    // The store method is inherited from BaseController
    // Validation will be handled by the FormRequest type-hinting in routes
}
