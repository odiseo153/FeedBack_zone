<?php

namespace App\Modules\Comment\Domain\Services;

use App\Core\Services\ListService;
use App\Modules\Comment\Domain\Contracts\CommentRepositoryPort;

class ListCommentsService extends ListService
{
    public function __construct(CommentRepositoryPort $commentRepositoryPort)
    {
        parent::__construct($commentRepositoryPort);
    }
}
