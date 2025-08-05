<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed in dependency order:
        // 1. Users first (other entities depend on users)
        // 2. Tags (projects need tags)
        // 3. Projects (comments and ratings depend on projects)
        // 4. Comments (depend on users and projects)
        // 5. Ratings (depend on users and projects)

        $this->call([
            UserSeeder::class,     // Create users with complete profiles
            TagSeeder::class,      // Create technology and category tags
            ProjectSeeder::class,  // Create projects with proper user assignments and tags
            CommentTypeSeeder::class,  // Create comment types
            CommentSeeder::class,  // Create realistic comments and replies
            RatingSeeder::class,   // Create detailed ratings with review comments
        ]);

        $this->command->info('🎉 Database seeded successfully with realistic data!');
        $this->command->info('');
        $this->command->info('📊 Seeded Data Summary:');
        $this->command->info('👥 Users: ~26 (1 admin + 10 featured developers + 15 additional)');
        $this->command->info('🏷️  Tags: ~50 technology and category tags');
        $this->command->info('📁 Projects: ~30 (10 featured + 20 additional with varied types)');
        $this->command->info('💬 Comments: Variable based on project popularity (with threaded replies)');
        $this->command->info('⭐ Ratings: Variable based on project engagement (1-5 stars across 4 categories)');
        $this->command->info('');
        $this->command->info('🔑 Test Accounts:');
        $this->command->info('Admin: admin@feedbackzone.com / password');
        $this->command->info('User: sarah.chen@example.com / password');
        $this->command->info('User: marcus.johnson@example.com / password');
        $this->command->info('(All users have password: "password")');
    }
}
