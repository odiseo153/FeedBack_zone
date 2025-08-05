<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tags = [
            // Frontend Technologies
            ['name' => 'React', 'type' => 'framework', 'color' => '#61DAFB'],
            ['name' => 'Vue.js', 'type' => 'framework', 'color' => '#4FC08D'],
            ['name' => 'Angular', 'type' => 'framework', 'color' => '#DD0031'],
            ['name' => 'Svelte', 'type' => 'framework', 'color' => '#FF3E00'],
            ['name' => 'Next.js', 'type' => 'framework', 'color' => '#000000'],
            ['name' => 'Nuxt.js', 'type' => 'framework', 'color' => '#00DC82'],
            ['name' => 'TypeScript', 'type' => 'language', 'color' => '#3178C6'],
            ['name' => 'JavaScript', 'type' => 'language', 'color' => '#F7DF1E'],
            ['name' => 'HTML', 'type' => 'language', 'color' => '#E34F26'],
            ['name' => 'CSS', 'type' => 'language', 'color' => '#1572B6'],
            ['name' => 'Tailwind CSS', 'type' => 'framework', 'color' => '#06B6D4'],
            ['name' => 'Bootstrap', 'type' => 'framework', 'color' => '#7952B3'],
            ['name' => 'Sass', 'type' => 'tool', 'color' => '#CC6699'],

            // Backend Technologies
            ['name' => 'Node.js', 'type' => 'technology', 'color' => '#339933'],
            ['name' => 'Express.js', 'type' => 'framework', 'color' => '#000000'],
            ['name' => 'Laravel', 'type' => 'framework', 'color' => '#FF2D20'],
            ['name' => 'Django', 'type' => 'framework', 'color' => '#092E20'],
            ['name' => 'Flask', 'type' => 'framework', 'color' => '#000000'],
            ['name' => 'Ruby on Rails', 'type' => 'framework', 'color' => '#CC0000'],
            ['name' => 'Spring Boot', 'type' => 'framework', 'color' => '#6DB33F'],
            ['name' => 'ASP.NET', 'type' => 'framework', 'color' => '#512BD4'],
            ['name' => 'PHP', 'type' => 'language', 'color' => '#777BB4'],
            ['name' => 'Python', 'type' => 'language', 'color' => '#3776AB'],
            ['name' => 'Java', 'type' => 'language', 'color' => '#ED8B00'],
            ['name' => 'C#', 'type' => 'language', 'color' => '#239120'],
            ['name' => 'Ruby', 'type' => 'language', 'color' => '#CC342D'],
            ['name' => 'Go', 'type' => 'language', 'color' => '#00ADD8'],
            ['name' => 'Rust', 'type' => 'language', 'color' => '#000000'],

            // Databases
            ['name' => 'MySQL', 'type' => 'technology', 'color' => '#4479A1'],
            ['name' => 'PostgreSQL', 'type' => 'technology', 'color' => '#336791'],
            ['name' => 'MongoDB', 'type' => 'technology', 'color' => '#47A248'],
            ['name' => 'Redis', 'type' => 'technology', 'color' => '#DC382D'],
            ['name' => 'SQLite', 'type' => 'technology', 'color' => '#003B57'],

            // Mobile
            ['name' => 'React Native', 'type' => 'framework', 'color' => '#61DAFB'],
            ['name' => 'Flutter', 'type' => 'framework', 'color' => '#02569B'],
            ['name' => 'Swift', 'type' => 'language', 'color' => '#FA7343'],
            ['name' => 'Kotlin', 'type' => 'language', 'color' => '#7F52FF'],
            ['name' => 'Dart', 'type' => 'language', 'color' => '#0175C2'],

            // DevOps & Tools
            ['name' => 'Docker', 'type' => 'tool', 'color' => '#2496ED'],
            ['name' => 'Kubernetes', 'type' => 'tool', 'color' => '#326CE5'],
            ['name' => 'AWS', 'type' => 'technology', 'color' => '#FF9900'],
            ['name' => 'Google Cloud', 'type' => 'technology', 'color' => '#4285F4'],
            ['name' => 'Azure', 'type' => 'technology', 'color' => '#0078D4'],
            ['name' => 'Vercel', 'type' => 'tool', 'color' => '#000000'],
            ['name' => 'Netlify', 'type' => 'tool', 'color' => '#00C7B7'],
            ['name' => 'Git', 'type' => 'tool', 'color' => '#F05032'],
            ['name' => 'GitHub', 'type' => 'tool', 'color' => '#181717'],
            ['name' => 'GitLab', 'type' => 'tool', 'color' => '#FC6D26'],

            // Categories
            ['name' => 'Web Development', 'type' => 'category', 'color' => '#3B82F6'],
            ['name' => 'Mobile Development', 'type' => 'category', 'color' => '#10B981'],
            ['name' => 'UI/UX Design', 'type' => 'category', 'color' => '#F59E0B'],
            ['name' => 'Backend Development', 'type' => 'category', 'color' => '#8B5CF6'],
            ['name' => 'Full Stack', 'type' => 'category', 'color' => '#EF4444'],
            ['name' => 'DevOps', 'type' => 'category', 'color' => '#6366F1'],
            ['name' => 'Machine Learning', 'type' => 'category', 'color' => '#EC4899'],
            ['name' => 'Data Science', 'type' => 'category', 'color' => '#06B6D4'],
            ['name' => 'Game Development', 'type' => 'category', 'color' => '#84CC16'],
            ['name' => 'Open Source', 'type' => 'category', 'color' => '#22C55E'],
        ];

        foreach ($tags as $tagData) {
            Tag::firstOrCreate(
                ['slug' => Str::slug($tagData['name'])],
                [
                    'name' => $tagData['name'],
                    'type' => $tagData['type'],
                    'color' => $tagData['color'],
                ]
            );
        }
    }
}
