<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('username')->unique()->nullable();
            $table->string('avatar')->nullable();
            $table->text('bio')->nullable();
            $table->boolean('is_admin')->default(false);
            $table->string('github_username')->nullable();
            $table->string('portfolio_url')->nullable();
            $table->string('twitter_handle')->nullable();
            $table->string('location')->nullable();
            $table->string('job_title')->nullable();
            $table->string('company')->nullable();
            $table->integer('reputation_score')->default(0);
            $table->timestamp('last_active_at')->nullable();
            $table->json('skills')->nullable(); // Array of user skills
            $table->boolean('is_verified')->default(false);
            $table->boolean('is_available_for_hire')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'username', 'avatar', 'bio', 'is_admin', 'github_username', 'portfolio_url',
                'twitter_handle', 'location', 'job_title', 'company', 'reputation_score',
                'last_active_at',
                'skills', 'is_verified', 'is_available_for_hire'
            ]);
        });
    }
};
