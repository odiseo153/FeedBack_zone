<?php

namespace App\Modules\Product\Adapters\Repositories;

use App\Models\Product as ProductModel;
use App\Core\Repositories\BaseRepository;
use App\Modules\Product\Domain\Contracts\ProductRepositoryPort;
use App\Modules\Product\Domain\Entities\Product;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ProductRepository extends BaseRepository implements ProductRepositoryPort
{
    public function __construct()
    {
        parent::__construct(ProductModel::class);
    }

    public function getAll(int $perPage, array $filters = [], array $sorts = [], string $defaultSort = '-created_at', array $with = []): LengthAwarePaginator
    {
        // Customize this method if you need specific filtering, sorting, or relationships
        // For example: $with = ['user', 'category'];
        return parent::getAll($perPage, $filters, $sorts, $defaultSort, $with);
    }

    public function create(array $data)
    {
        // Add any specific logic before creation
        // $data['user_id'] = auth()->id(); // Example: Set current user

        $product = ProductModel::create($data);

        // Load relationships if needed
        // $product->load(['user', 'category']);

        return new Product($product->toArray());
    }

    public function findById($id)
    {
        $product = ProductModel::find($id);

        if (!$product) {
            return null;
        }

        // Load relationships if needed
        // $product->load(['user', 'category']);

        return new Product($product->toArray());
    }
}