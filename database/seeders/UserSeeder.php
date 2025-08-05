<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create a test admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@feedbackzone.com',
            'username' => 'admin',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'bio' => 'Platform administrator and full-stack developer passionate about building collaborative tools.',
            'location' => 'San Francisco, CA',
            'job_title' => 'Platform Administrator',
            'company' => 'FeedBack Zone',
            'github_username' => 'admin',
            'portfolio_url' => 'https://feedbackzone.com',
            'twitter_handle' => 'feedbackzone',
            'reputation_score' => 2500,
            'skills' => ['Laravel', 'React', 'TypeScript', 'MySQL', 'Docker', 'AWS'],
            'is_verified' => true,
            'is_available_for_hire' => false,
            'last_active_at' => now(),
            'is_admin' => true,
        ]);

        // Create realistic developer profiles
        $developers = [
            [
                'name' => 'Sarah Chen',
                'email' => 'sarah.chen@example.com',
                'username' => 'sarahchen',
                'bio' => 'Frontend specialist with 5+ years building React applications. Love creating intuitive user experiences.',
                'location' => 'Seattle, WA',
                'job_title' => 'Senior Frontend Developer',
                'company' => 'Microsoft',
                'github_username' => 'sarahchen',
                'portfolio_url' => 'https://sarahchen.dev',
                'twitter_handle' => 'sarahchen_dev',
                'reputation_score' => 1250,
                'skills' => ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'GraphQL', 'Jest'],
                'is_verified' => true,
                'is_available_for_hire' => false,
            ],
            [
                'name' => 'Marcus Johnson',
                'email' => 'marcus.johnson@example.com',
                'username' => 'marcusj',
                'bio' => 'Full-stack developer specializing in Node.js and React. Building scalable web applications.',
                'location' => 'Austin, TX',
                'job_title' => 'Full Stack Developer',
                'company' => 'Shopify',
                'github_username' => 'marcusj',
                'portfolio_url' => 'https://marcusjohnson.io',
                'reputation_score' => 890,
                'skills' => ['Node.js', 'React', 'MongoDB', 'Express', 'AWS', 'Docker'],
                'is_verified' => false,
                'is_available_for_hire' => true,
            ],
            [
                'name' => 'Emma Rodriguez',
                'email' => 'emma.rodriguez@example.com',
                'username' => 'emmarodz',
                'bio' => 'UI/UX Designer turned Frontend Developer. Passionate about design systems and accessibility.',
                'location' => 'Los Angeles, CA',
                'job_title' => 'Frontend Developer & Designer',
                'company' => 'Adobe',
                'github_username' => 'emmarodz',
                'portfolio_url' => 'https://emmarodriguez.design',
                'twitter_handle' => 'emmarodz',
                'reputation_score' => 675,
                'skills' => ['Figma', 'React', 'CSS', 'JavaScript', 'Design Systems', 'Accessibility'],
                'is_verified' => true,
                'is_available_for_hire' => false,
            ],
            [
                'name' => 'David Park',
                'email' => 'david.park@example.com',
                'username' => 'davidpark',
                'bio' => 'Backend engineer with expertise in microservices and cloud architecture. Love solving complex problems.',
                'location' => 'New York, NY',
                'job_title' => 'Senior Backend Engineer',
                'company' => 'Netflix',
                'github_username' => 'davidpark',
                'reputation_score' => 1100,
                'skills' => ['Java', 'Spring Boot', 'Kubernetes', 'PostgreSQL', 'Redis', 'AWS'],
                'is_verified' => false,
                'is_available_for_hire' => false,
            ],
            [
                'name' => 'Alex Thompson',
                'email' => 'alex.thompson@example.com',
                'username' => 'alexthompson',
                'bio' => 'Mobile app developer creating cross-platform solutions with React Native and Flutter.',
                'location' => 'Toronto, ON',
                'job_title' => 'Mobile Developer',
                'company' => 'Uber',
                'github_username' => 'alexthompson',
                'portfolio_url' => 'https://alexthompson.dev',
                'twitter_handle' => 'alexthompson_dev',
                'reputation_score' => 520,
                'skills' => ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'Redux'],
                'is_verified' => false,
                'is_available_for_hire' => true,
            ],
            [
                'name' => 'Lisa Wang',
                'email' => 'lisa.wang@example.com',
                'username' => 'lisawang',
                'bio' => 'DevOps engineer passionate about automation and infrastructure as code. Building reliable systems.',
                'location' => 'San Jose, CA',
                'job_title' => 'DevOps Engineer',
                'company' => 'Google',
                'github_username' => 'lisawang',
                'reputation_score' => 780,
                'skills' => ['Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'AWS', 'Python'],
                'is_verified' => true,
                'is_available_for_hire' => false,
            ],
            [
                'name' => 'James Miller',
                'email' => 'james.miller@example.com',
                'username' => 'jamesmiller',
                'bio' => 'Freelance web developer helping startups build their digital presence. Always learning new technologies.',
                'location' => 'Denver, CO',
                'job_title' => 'Freelance Web Developer',
                'github_username' => 'jamesmiller',
                'portfolio_url' => 'https://jamesmiller.co',
                'reputation_score' => 340,
                'skills' => ['Vue.js', 'Laravel', 'PHP', 'MySQL', 'WordPress', 'Stripe'],
                'is_verified' => false,
                'is_available_for_hire' => true,
            ],
            [
                'name' => 'Maria Silva',
                'email' => 'maria.silva@example.com',
                'username' => 'mariasilva',
                'bio' => 'Data scientist turned ML engineer. Building intelligent applications with Python and TensorFlow.',
                'location' => 'Boston, MA',
                'job_title' => 'Machine Learning Engineer',
                'company' => 'OpenAI',
                'github_username' => 'mariasilva',
                'portfolio_url' => 'https://mariasilva.ai',
                'twitter_handle' => 'mariasilva_ml',
                'reputation_score' => 950,
                'skills' => ['Python', 'TensorFlow', 'PyTorch', 'Pandas', 'FastAPI', 'Docker'],
                'is_verified' => true,
                'is_available_for_hire' => false,
            ],
            [
                'name' => 'Ryan Foster',
                'email' => 'ryan.foster@example.com',
                'username' => 'ryanfoster',
                'bio' => 'Game developer creating indie games with Unity. Passionate about interactive storytelling.',
                'location' => 'Portland, OR',
                'job_title' => 'Game Developer',
                'company' => 'Indie Developer',
                'github_username' => 'ryanfoster',
                'portfolio_url' => 'https://ryanfoster.games',
                'reputation_score' => 430,
                'skills' => ['Unity', 'C#', 'Blender', 'JavaScript', 'WebGL', 'Git'],
                'is_verified' => false,
                'is_available_for_hire' => true,
            ],
            [
                'name' => 'Nina Patel',
                'email' => 'nina.patel@example.com',
                'username' => 'ninapatel',
                'bio' => 'Product designer focused on user research and creating delightful digital experiences.',
                'location' => 'Chicago, IL',
                'job_title' => 'Senior Product Designer',
                'company' => 'Airbnb',
                'github_username' => 'ninapatel',
                'portfolio_url' => 'https://ninapatel.design',
                'twitter_handle' => 'ninapatel_ux',
                'reputation_score' => 720,
                'skills' => ['Figma', 'Sketch', 'Principle', 'User Research', 'Prototyping', 'Design Systems'],
                'is_verified' => true,
                'is_available_for_hire' => false,
            ]
        ];

        foreach ($developers as $developer) {
            User::create(array_merge($developer, [
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
                'last_active_at' => now()->subDays(rand(0, 30)),
            ]));
        }

        // Create additional users using factory for variety
        User::factory(15)->create();
    }
}
