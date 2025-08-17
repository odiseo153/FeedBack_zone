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
        Schema::create('ratings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->integer('ui_ux_score')->nullable()->comment('Rating 1-5 for UI/UX');
            $table->integer('performance_score')->nullable()->comment('Rating 1-5 for performance');
            $table->integer('code_quality_score')->nullable()->comment('Rating 1-5 for code quality');
            $table->integer('innovation_score')->nullable()->comment('Rating 1-5 for innovation');
            $table->integer('overall_score')->comment('Rating 1-5 overall');
            $table->text('review_comment')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->unique(['project_id', 'user_id']); // One rating per user per project
            $table->index(['project_id', 'overall_score']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ratings');
    }
};
