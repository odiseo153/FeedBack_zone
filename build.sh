#!/usr/bin/env bash

# Instalar dependencias PHP
composer install --no-dev --optimize-autoloader

# Instalar dependencias JS
npm install
npm run build

# Crear archivo de cache de configuración
php artisan config:cache
php artisan route:cache
php artisan view:cache
