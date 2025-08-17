<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use App\Models\Tag;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $tags = Tag::all();

        // Realistic project data
        $projects = [
            [
                'title' => 'TaskFlow - Project Management Dashboard',
                'description' => 'A modern project management dashboard built with React and Node.js. Features real-time collaboration, task tracking, and team analytics. Includes drag-and-drop interface, file sharing, and integrations with popular tools.',
                'github_url' => 'https://github.com/sarahchen/taskflow',
                'live_url' => 'https://taskflow-demo.netlify.app',
                'project_type' => 'web',
                'feedback_request' => 'Looking for feedback on the UI/UX design and overall user experience. Also interested in performance optimization suggestions.',
                'status' => 'published',
                'is_featured' => true,
                'tech_stack' => ['React', 'Node.js', 'MongoDB', 'Socket.io', 'Tailwind CSS'],
                'views_count' => 1250,
                'likes_count' => 89,
                'thumbnail' => 'https://picsum.photos/200/300',
                'comments_count' => 23,
                'tags' => ['React', 'Node.js', 'MongoDB', 'Project Management']
            ],
            [
                'title' => 'EcoTrack - Carbon Footprint Calculator',
                'description' => 'Mobile application that helps users track and reduce their carbon footprint. Features personalized recommendations, progress tracking, and gamification elements to encourage sustainable habits.',
                'github_url' => 'https://github.com/alexthompson/ecotrack',
                'live_url' => 'https://apps.apple.com/app/ecotrack',
                'project_type' => 'mobile',
                'feedback_request' => 'Need feedback on the gamification aspects and user engagement features. How can I make sustainability tracking more fun?',
                'status' => 'published',
                'is_featured' => true,
                'tech_stack' => ['React Native', 'Firebase', 'Redux', 'Chart.js'],
                'views_count' => 890,
                'likes_count' => 67,
                'thumbnail' => 'https://picsum.photos/200/300',
                'comments_count' => 15,
                'tags' => ['React Native', 'Mobile', 'Firebase', 'Environment']
            ],
            [
                'title' => 'DevPortfolio - Developer Portfolio Template',
                'description' => 'A clean, responsive portfolio template for developers. Features dark/light mode, smooth animations, blog integration, and easy customization. Built with modern web technologies.',
                'github_url' => 'https://github.com/emmarodz/devportfolio',
                'live_url' => 'https://devportfolio-template.vercel.app',
                'project_type' => 'web',
                'feedback_request' => 'Looking for feedback on accessibility features and mobile responsiveness. Any suggestions for additional components?',
                'status' => 'published',
                'tech_stack' => ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
                'views_count' => 2100,
                'likes_count' => 156,
                'thumbnail' => 'https://picsum.photos/200/400', 
                'comments_count' => 34,
                'tags' => ['Next.js', 'TypeScript', 'Tailwind CSS', 'Portfolio']
            ],
            [
                'title' => 'MicroBank - Banking Microservices',
                'description' => 'A microservices architecture demonstration for a banking system. Implements account management, transaction processing, and notification services with event-driven communication.',
                'github_url' => 'https://github.com/davidpark/microbank',
                'project_type' => 'backend',
                'feedback_request' => 'Seeking feedback on the microservices architecture and scalability patterns. How can I improve the service communication?',
                'status' => 'published',
                'tech_stack' => ['Java', 'Spring Boot', 'Docker', 'Kubernetes', 'PostgreSQL', 'RabbitMQ'],
                'views_count' => 756,
                'likes_count' => 43,
                'thumbnail' => 'https://picsum.photos/200/200',
                'comments_count' => 18,
                'tags' => ['Java', 'Spring Boot', 'Microservices', 'Docker']
            ],
            [
                'title' => 'AIChat - Intelligent Chatbot',
                'description' => 'An AI-powered chatbot using natural language processing for customer support. Features intent recognition, context awareness, and integration with popular messaging platforms.',
                'github_url' => 'https://github.com/mariasilva/aichat',
                'live_url' => 'https://aichat-demo.herokuapp.com',
                'project_type' => 'fullstack',
                'feedback_request' => 'Need feedback on the NLP model accuracy and conversation flow. How can I make the bot more conversational?',
                'status' => 'published',
                'is_featured' => true,
                'tech_stack' => ['Python', 'TensorFlow', 'FastAPI', 'React', 'PostgreSQL'],
                'views_count' => 1450,
                'likes_count' => 98,
                'thumbnail' => 'https://picsum.photos/200/500',
                'comments_count' => 27,
                'tags' => ['Python', 'TensorFlow', 'AI', 'Chatbot']
            ],
            [
                'title' => 'PixelQuest - 2D Adventure Game',
                'description' => 'A retro-style 2D adventure game built with Unity. Features puzzle-solving, character progression, and hand-drawn pixel art. Includes level editor and mod support.',
                'github_url' => 'https://github.com/ryanfoster/pixelquest',
                'live_url' => 'https://pixelquest.itch.io',
                'project_type' => 'other',
                'feedback_request' => 'Looking for feedback on game mechanics and level design. Also interested in suggestions for additional features.',
                'status' => 'published',
                'tech_stack' => ['Unity', 'C#', 'Photoshop'],
                'views_count' => 1890,
                'likes_count' => 134,
                'thumbnail' => 'https://picsum.photos/200/600',
                'comments_count' => 41,
                'tags' => ['Unity', 'C#', 'Game Development', 'Pixel Art']
            ],
            [
                'title' => 'CloudDeploy - CI/CD Pipeline Tool',
                'description' => 'A continuous integration and deployment tool for cloud applications. Features automated testing, deployment pipelines, and infrastructure monitoring.',
                'github_url' => 'https://github.com/lisawang/clouddeploy',
                'project_type' => 'backend',
                'feedback_request' => 'Need feedback on the deployment pipeline architecture and security practices. How can I improve the monitoring features?',
                'status' => 'published',
                'tech_stack' => ['Docker', 'Kubernetes', 'Terraform', 'Python', 'AWS'],
                'views_count' => 540,
                'likes_count' => 32,
                'thumbnail' => 'https://picsum.photos/200/200',
                'comments_count' => 12,
                'tags' => ['Docker', 'Kubernetes', 'DevOps', 'AWS']
            ],
            [
                'title' => 'ShopEasy - E-commerce Platform',
                'description' => 'A full-featured e-commerce platform built with Laravel and Vue.js. Includes inventory management, payment processing, order tracking, and admin dashboard.',
                'github_url' => 'https://github.com/jamesmiller/shopeasy',
                'live_url' => 'https://shopeasy-demo.com',
                'project_type' => 'fullstack',
                'feedback_request' => 'Looking for feedback on the checkout process and payment integration. Any suggestions for improving conversion rates?',
                'status' => 'published',
                'tech_stack' => ['Laravel', 'Vue.js', 'MySQL', 'Stripe', 'Redis'],
                'views_count' => 980,
                'likes_count' => 71,
                'thumbnail' => 'https://picsum.photos/200/300',
                'comments_count' => 19,
                'tags' => ['Laravel', 'Vue.js', 'E-commerce', 'Stripe']
            ],
            [
                'title' => 'DesignSystem - Component Library',
                'description' => 'A comprehensive design system and component library for React applications. Features accessible components, theming support, and detailed documentation.',
                'github_url' => 'https://github.com/ninapatel/designsystem',
                'live_url' => 'https://designsystem-storybook.netlify.app',
                'project_type' => 'design',
                'feedback_request' => 'Need feedback on component accessibility and API design. How can I make the library more developer-friendly?',
                'status' => 'published',
                'is_featured' => true,
                'tech_stack' => ['React', 'TypeScript', 'Storybook', 'CSS-in-JS'],
                'views_count' => 1670,
                'likes_count' => 112,
                'comments_count' => 28,
                'thumbnail' => 'https://picsum.photos/200/400',
                'tags' => ['React', 'Design System', 'Storybook', 'Accessibility']
            ],
            [
                'title' => 'WeatherWise - Weather Prediction App',
                'description' => 'A weather application with advanced prediction algorithms and beautiful visualizations. Features hourly/daily forecasts, weather maps, and severe weather alerts.',
                'github_url' => 'https://github.com/marcusj/weatherwise',
                'live_url' => 'https://weatherwise-app.vercel.app',
                'project_type' => 'web',
                'feedback_request' => 'Looking for feedback on data visualization and user interface. How can I make weather data more engaging?',
                'status' => 'published',
                'tech_stack' => ['React', 'D3.js', 'Node.js', 'Express', 'Weather API'],
                'views_count' => 720,
                'likes_count' => 54,
                'thumbnail' => 'https://picsum.photos/200/500',
                'comments_count' => 16,
                'tags' => ['React', 'D3.js', 'Data Visualization', 'Weather']
            ]
        ];

        foreach ($projects as $projectData) {
            // Find user by looking for matching tech stack or assign randomly
            $user = $this->findBestUserForProject($projectData, $users) ?? $users->random();

            $project = Project::create([
                'user_id' => $user->id,
                'title' => $projectData['title'],
                'description' => $projectData['description'],
                'github_url' => $projectData['github_url'] ?? null,
                'live_url' => $projectData['live_url'] ?? null,
                'project_type' => $projectData['project_type'],
                'feedback_request' => $projectData['feedback_request'],
                'status' => $projectData['status'],
                'is_featured' => $projectData['is_featured'] ?? false,
                'tech_stack' => $projectData['tech_stack'],
                'views_count' => $projectData['views_count'] ?? rand(50, 500),
                'likes_count' => $projectData['likes_count'] ?? rand(5, 50),
                'thumbnail' => $projectData['thumbnail'] ?? null,
                'comments_count' => $projectData['comments_count'] ?? rand(0, 20),
                'created_at' => now()->subDays(rand(1, 90)),
                'updated_at' => now()->subDays(rand(0, 30)),
            ]);

            // Attach relevant tags
            $projectTags = [];
            foreach ($projectData['tags'] as $tagName) {
                $tag = $tags->where('name', $tagName)->first();
                if ($tag) {
                    $projectTags[] = $tag->id;
                }
            }

            if (!empty($projectTags)) {
                $project->tags()->attach($projectTags);
            }
        }

        // Create additional random projects
        $remainingUsers = $users->shuffle();
        for ($i = 0; $i < 20; $i++) {
            $user = $remainingUsers[$i % $remainingUsers->count()];
            $randomTags = $tags->random(rand(2, 5))->pluck('id')->toArray();

            $project = Project::create([
                'user_id' => $user->id,
                'title' => $this->generateRandomProjectTitle(),
                'description' => $this->generateRandomDescription(),
                'github_url' => rand(0, 1) ? 'https://github.com/' . $user->username . '/' . strtolower(str_replace(' ', '-', $this->generateRandomProjectTitle())) : null,
                'live_url' => rand(0, 1) ? 'https://' . strtolower(str_replace(' ', '-', $this->generateRandomProjectTitle())) . '.vercel.app' : null,
                'project_type' => ['web', 'mobile', 'backend', 'fullstack', 'design', 'other'][rand(0, 5)],
                'feedback_request' => $this->generateRandomFeedbackRequest(),
                'status' => rand(0, 10) > 1 ? 'published' : 'draft', // 90% published
                'is_featured' => rand(0, 10) === 0, // 10% featured
                'tech_stack' => $this->generateRandomTechStack(),
                'views_count' => rand(10, 1000),
                'likes_count' => rand(0, 80),
                'thumbnail' => 'https://picsum.photos/200/200',
                'comments_count' => rand(0, 25),
                'created_at' => now()->subDays(rand(1, 180)),
                'updated_at' => now()->subDays(rand(0, 60)),
            ]);

            $project->tags()->attach($randomTags);
        }
    }

    private function findBestUserForProject(array $projectData, $users)
    {
        $projectTech = $projectData['tech_stack'];

        foreach ($users as $user) {
            if ($user->skills && is_array($user->skills)) {
                $commonSkills = array_intersect($projectTech, $user->skills);
                if (count($commonSkills) >= 2) {
                    return $user;
                }
            }
        }

        return null;
    }

    private function generateRandomProjectTitle(): string
    {
        $adjectives = ['Modern', 'Advanced', 'Smart', 'Elegant', 'Powerful', 'Simple', 'Creative', 'Innovative'];
        $nouns = ['Dashboard', 'App', 'Tool', 'Platform', 'System', 'Manager', 'Tracker', 'Builder'];
        $domains = ['Task', 'Project', 'Team', 'Data', 'Content', 'User', 'Analytics', 'Social'];

        return $adjectives[array_rand($adjectives)] . ' ' . $domains[array_rand($domains)] . ' ' . $nouns[array_rand($nouns)];
    }

    private function generateRandomDescription(): string
    {
        $descriptions = [
            'A comprehensive solution for modern development teams looking to streamline their workflow and improve collaboration.',
            'Built with cutting-edge technologies to provide the best user experience and performance optimization.',
            'Features a clean, intuitive interface with powerful functionality under the hood.',
            'Designed to solve real-world problems with elegant code and thoughtful architecture.',
            'An open-source project aimed at helping developers build better applications faster.',
            'Combines modern design principles with robust backend architecture for scalable solutions.',
        ];

        return $descriptions[array_rand($descriptions)];
    }

    private function generateRandomFeedbackRequest(): string
    {
        $requests = [
            'Looking for feedback on the overall architecture and code quality.',
            'Need suggestions on improving user experience and interface design.',
            'Seeking advice on performance optimization and scalability.',
            'Would love feedback on the API design and documentation.',
            'Looking for input on security best practices and implementation.',
            'Need feedback on accessibility features and mobile responsiveness.',
        ];

        return $requests[array_rand($requests)];
    }

    private function generateRandomTechStack(): array
    {
        $allTech = [
            'React', 'Vue.js', 'Angular', 'Node.js', 'Express', 'Laravel', 'Django', 'Flask',
            'TypeScript', 'JavaScript', 'Python', 'PHP', 'Java', 'C#', 'Go', 'Rust',
            'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'Azure'
        ];

        return array_slice(array_unique(array_merge(
            array_rand(array_flip($allTech), rand(2, 4))
        )), 0, rand(3, 6));
    }
}
