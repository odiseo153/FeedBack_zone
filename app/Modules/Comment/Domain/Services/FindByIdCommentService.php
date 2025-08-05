<?php

namespace App\Modules\Comment\Domain\Services;

use App\Core\Services\FindByIdService;
use App\Modules\Comment\Domain\Contracts\CommentRepositoryPort;

class FindByIdCommentService extends FindByIdService
{
    public function __construct(CommentRepositoryPort $commentRepositoryPort)
    {
        parent::__construct($commentRepositoryPort);
    }
}
