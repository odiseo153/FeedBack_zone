<?php

namespace App\Modules\Comment\Domain\Services;

use App\Core\Services\CreateService;
use App\Modules\Comment\Domain\Contracts\CommentRepositoryPort;

class CreateCommentService extends CreateService
{
    public function __construct(CommentRepositoryPort $commentRepositoryPort)
    {
        parent::__construct($commentRepositoryPort);
    }
}
