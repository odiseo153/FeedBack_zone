<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HandleAuthRedirects
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        // If user is not authenticated and trying to access protected route
        if (!Auth::check() && $this->isProtectedRoute($request)) {
            // For Inertia requests, return a proper redirect response
            if ($request->header('X-Inertia')) {
                return Inertia::location(route('login'));
            }

            // For regular requests, redirect to login
            return redirect()->guest(route('login'));
        }

        return $next($request);
    }

    /**
     * Check if the current route requires authentication
     */
    private function isProtectedRoute(Request $request): bool
    {
        $protectedRoutes = [
            'dashboard',
            'themes',
            'profile.*',
            'projects.*',
            'settings.*',
            'appearance'
        ];

        $currentRoute = $request->route()?->getName();

        if (!$currentRoute) {
            return false;
        }

        foreach ($protectedRoutes as $pattern) {
            if (str_contains($pattern, '*')) {
                $pattern = str_replace('*', '', $pattern);
                if (str_starts_with($currentRoute, $pattern)) {
                    return true;
                }
            } elseif ($currentRoute === $pattern) {
                return true;
            }
        }

        return false;
    }
}
