<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Comment;
use App\Models\Project;
use App\Models\CommentType;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $projects = Project::with('user')->get();
        $users = User::all();
        $commentTypes = CommentType::all();

        // Realistic comment templates
        $commentTemplates = [
            // Positive feedback
            [
                'content' => 'This is fantastic work! The user interface is incredibly clean and intuitive. I especially love the attention to detail in the animations.',
                'type' => $commentTypes->first()->id,
                'likes_count' => rand(5, 25)
            ],
            [
                'content' => 'Great project! The architecture looks solid and the code quality is impressive. How long did this take you to build?',
                'type' => $commentTypes->where('name', 'question')->first()->id ?? 1,
                'likes_count' => rand(3, 15)
            ],
            [
                'content' => 'Really well done! This solves a real problem I\'ve been facing. Are you planning to add more features in the future?',
                'type' => $commentTypes->where('name', 'feedback')->first()->id ?? 1,
                'likes_count' => rand(2, 20)
            ],

            // Technical feedback
            [
                'content' => 'Nice implementation! I noticed you\'re using React hooks effectively. Have you considered using React Query for state management?',
                'type' => $commentTypes->where('name', 'suggestion')->first()->id ?? 1,
                'likes_count' => rand(8, 30)
            ],
            [
                'content' => 'The performance looks great! Did you implement any specific optimization techniques? I\'d love to learn more about your approach.',
                'type' => $commentTypes->where('name', 'question')->first()->id ?? 1,
                'likes_count' => rand(4, 18)
            ],
            [
                'content' => 'Excellent work on the backend architecture. The microservices pattern is well implemented. How are you handling service communication?',
                'type' => $commentTypes->where('name', 'feedback')->first()->id ?? 1,
                'likes_count' => rand(6, 22)
            ],

            // Constructive suggestions
            [
                'content' => 'This is a solid foundation! One suggestion: consider adding error boundaries to handle React component errors gracefully.',
                'type' => $commentTypes->where('name', 'suggestion')->first()->id ?? 1,
                'likes_count' => rand(10, 35)
            ],
            [
                'content' => 'Love the concept! For accessibility, you might want to add ARIA labels to the interactive elements. Overall great work though!',
                'type' => $commentTypes->where('name', 'suggestion')->first()->id ?? 1,
                'likes_count' => rand(12, 28)
            ],
            [
                'content' => 'Impressive project! The mobile responsiveness could use some tweaks, but the desktop experience is excellent.',
                'type' => $commentTypes->where('name', 'feedback')->first()->id ?? 1,
                'likes_count' => rand(5, 20)
            ],

            // Questions and engagement
            [
                'content' => 'This is exactly what I needed! Is the code open source? I\'d love to contribute or learn from your implementation.',
                'type' => $commentTypes->where('name', 'question')->first()->id ?? 1,
                'likes_count' => rand(8, 25)
            ],
            [
                'content' => 'Brilliant work! What inspired you to build this? The user experience is really thoughtful.',
                'type' => $commentTypes->where('name', 'question')->first()->id ?? 1,
                'likes_count' => rand(3, 12)
            ],
            [
                'content' => 'Amazing project! I\'m working on something similar. Would love to connect and share ideas if you\'re interested.',
                'type' => $commentTypes->where('name', 'feedback')->first()->id ?? 1,
                'likes_count' => rand(6, 18)
            ],
        ];

        // Reply templates
        $replyTemplates = [
            'Thanks for the feedback! I really appreciate your kind words.',
            'Great question! Let me explain my approach...',
            'Thank you! That\'s a really good suggestion, I\'ll definitely consider implementing it.',
            'I\'m glad you find it useful! Feel free to reach out if you have any other questions.',
            'Thanks for pointing that out! You\'re absolutely right, I\'ll work on improving that.',
            'I appreciate the constructive feedback! That\'s exactly the kind of input I was looking for.',
            'Thank you! It took about [X] weeks to build. The most challenging part was [specific challenge].',
            'Great suggestion! I hadn\'t considered that approach. I\'ll definitely look into it.',
            'Thanks for the review! I\'m always looking to improve, so your feedback is very valuable.',
            'I\'m so happy you found it helpful! That was exactly what I was trying to achieve.',
        ];

        foreach ($projects as $project) {
            // Skip if project has no user (shouldn't happen but just in case)
            if (!$project->user) continue;

            // Determine number of comments based on project popularity
            $numComments = $this->calculateCommentsForProject($project);

            if ($numComments === 0) continue;

            // Create main comments
            $mainComments = [];
            for ($i = 0; $i < $numComments; $i++) {
                // Don't let users comment on their own projects
                $availableUsers = $users->where('id', '!=', $project->user_id);
                if ($availableUsers->isEmpty()) continue;

                $commenter = $availableUsers->random();
                $template = $commentTemplates[array_rand($commentTemplates)];

                $comment = Comment::create([
                    'project_id' => $project->id,
                    'user_id' => $commenter->id,
                    'content' => $this->personalizeComment($template['content'], $project, $commenter),
                    'comment_type_id' => $template['type'],
                    'likes_count' => $template['likes_count'],
                    'created_at' => $this->generateCommentDate($project->created_at),
                    'updated_at' => now(),
                ]);

                $mainComments[] = $comment;
            }

            // Create replies (30% chance for each main comment)
            foreach ($mainComments as $mainComment) {
                if (rand(1, 100) <= 30) {
                    // Project owner replies to comment
                    $replyContent = $replyTemplates[array_rand($replyTemplates)];
                    $replyContent = str_replace('[X]', rand(2, 12), $replyContent);
                    $replyContent = str_replace('[specific challenge]', $this->getRandomChallenge(), $replyContent);

                    Comment::create([
                        'project_id' => $project->id,
                        'user_id' => $project->user_id,
                        'parent_id' => $mainComment->id,
                        'content' => $replyContent,
                        'comment_type_id' => $commentTypes->where('name', 'feedback')->first()->id ?? 1,
                        'likes_count' => rand(0, 10),
                        'created_at' => $mainComment->created_at->addMinutes(rand(10, 1440)), // Reply within 24 hours
                        'updated_at' => now(),
                    ]);

                    // Sometimes other users also reply (10% chance)
                    if (rand(1, 100) <= 10) {
                        $availableUsers = $users->whereNotIn('id', [$project->user_id, $mainComment->user_id]);
                        if (!$availableUsers->isEmpty()) {
                            $replier = $availableUsers->random();

                            $additionalReply = [
                                'I agree with this feedback!',
                                'This is a great point. I had the same thought.',
                                'Thanks for sharing this insight!',
                                'I had a similar experience with this.',
                                'Really helpful perspective, thanks!',
                            ];

                            Comment::create([
                                'project_id' => $project->id,
                                'user_id' => $replier->id,
                                'parent_id' => $mainComment->id,
                                'content' => $additionalReply[array_rand($additionalReply)],
                                'comment_type_id' => $commentTypes->where('name', 'feedback')->first()->id ?? 1,
                                'likes_count' => rand(0, 5),
                                'created_at' => $mainComment->created_at->addHours(rand(1, 48)),
                                'updated_at' => now(),
                            ]);
                        }
                    }
                }
            }
        }

        // Update project comment counts
        foreach ($projects as $project) {
            $project->update([
                'comments_count' => $project->comments()->count()
            ]);
        }
    }

    private function calculateCommentsForProject(Project $project): int
    {
        // Base on views and likes to determine engagement
        $baseComments = 0;

        if ($project->views_count > 1000) $baseComments += rand(8, 15);
        elseif ($project->views_count > 500) $baseComments += rand(4, 10);
        elseif ($project->views_count > 100) $baseComments += rand(1, 6);
        else $baseComments += rand(0, 3);

        if ($project->likes_count > 50) $baseComments += rand(3, 8);
        elseif ($project->likes_count > 20) $baseComments += rand(1, 5);

        if ($project->is_featured) $baseComments += rand(2, 6);

        return min($baseComments, 20); // Cap at 20 comments per project
    }

    private function personalizeComment(string $template, Project $project, User $commenter): string
    {
        // Replace placeholders with project-specific content
        $replacements = [
            'React' => in_array('React', $project->tech_stack ?? []) ? 'React' : 'this framework',
            'the animations' => $project->project_type === 'design' ? 'the design system' : 'the functionality',
            'user interface' => $project->project_type === 'backend' ? 'API design' : 'user interface',
            'mobile responsiveness' => $project->project_type === 'mobile' ? 'cross-platform compatibility' : 'mobile responsiveness',
        ];

        $personalized = $template;
        foreach ($replacements as $search => $replace) {
            $personalized = str_replace($search, $replace, $personalized);
        }

        return $personalized;
    }

    private function generateCommentDate($projectCreatedAt)
    {
        // Comments should be created after the project
        $minDate = $projectCreatedAt->addDays(rand(0, 7));
        $maxDate = now();

        $randomTimestamp = rand($minDate->timestamp, $maxDate->timestamp);
        return \Carbon\Carbon::createFromTimestamp($randomTimestamp);
    }

    private function getRandomChallenge(): string
    {
        $challenges = [
            'implementing the authentication system',
            'optimizing the database queries',
            'handling the state management',
            'designing the user interface',
            'setting up the deployment pipeline',
            'integrating the third-party APIs',
            'ensuring cross-browser compatibility',
            'implementing the real-time features',
        ];

        return $challenges[array_rand($challenges)];
    }
}
