<?php

use Illuminate\Foundation\Application;
use Illuminate\Database\QueryException;
use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;

use Illuminate\Validation\ValidationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: [
            __DIR__.'/../routes/api.php',
            __DIR__.'/../routes/api/comments.php'
        ],
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);

        // Configure authentication redirects for Inertia.js
        $middleware->redirectGuestsTo(fn () => route('login'));
        $middleware->redirectUsersTo(fn () => route('dashboard'));
    })
    ->withExceptions(function (Exceptions $exceptions) {

        $exceptions->render(function (UniqueConstraintViolationException $e, Request $request) {
            $errorString = $e->getMessage();
            $duplicateKeyMessage = "Duplicate key";

            if (preg_match('/Key \((.*?)\)=/', $errorString, $matches)) {
                $keyName = $matches[1];
                $duplicateKeyMessage = "Duplicate key: $keyName";
            }

            return response()->json([
                'errors' => [
                    [
                        'status' => 409,
                        'message' => $duplicateKeyMessage,
                        'source' => $request->path()
                    ]
                ]
            ], 409);
        });
        $exceptions->render(function (ValidationException $e, Request $request) {
            foreach ($e->errors() as $key => $value) {
                foreach ($value as $message) {
                    $errors[] = [
                        'status' => 422,
                        'message' => $message,
                        'source' => $key
                    ];
                }
            }

            return response()->json([
                'errors' => $errors
            ], 422);
        });


        $exceptions->render(function (AuthorizationException $e, Request $request) {
            return response()->json([
                'errors' => [
                    [
                        'status' => 403,
                        'message' => 'Unauthorized',
                        'source' => $request->path()
                    ]
                ]
            ], 403);
        });

        $exceptions->render(function (MethodNotAllowedHttpException $e, Request $request) {
            return response()->json([
                'errors' => [
                    [
                        'status' => 405,
                        'message' => 'Method not allowed',
                        'source' => $request->path()
                    ]
                ]
            ], 405);
        });

        $exceptions->render(function (NotFoundHttpException $e, Request $request) {
            return response()->json([
                'errors' => [
                    [
                        'status' => 404,
                        'message' => 'Resource not found',
                        'source' => $request->path()
                    ]
                ]
            ], 404);
        });

        $exceptions->render(function (ModelNotFoundException $e, Request $request) {
            return response()->json([
                'errors' => [
                    [
                        'status' => 404,
                        'message' => 'Model not found',
                        'source' => $request->path()
                    ]
                ]
            ], 404);
        });

        $exceptions->render(function (BadMethodCallException $e, Request $request) {
            return response()->json([
                'errors' => [
                    [
                        'status' => 405,
                        'message' => $e->getMessage(),
                        'source' => $request->path()
                    ]
                ]
            ], 405);
        });

        $exceptions->render(function (QueryException $e, Request $request) {
            return response()->json([
                'errors' => [
                    [
                        'status' => 500,
                        'message' => 'Internal server error',
                        'source' => $request->path()
                    ]
                ]
            ], 500);
        });

        $exceptions->render(function (HttpException $e, Request $request) {
            return response()->json([
                'errors' => [
                    [
                        'status' => $e->getStatusCode(),
                        'message' => $e->getMessage(),
                        'source' => $request->path()
                    ]
                ]
            ], $e->getStatusCode());
        });
    })->create();
