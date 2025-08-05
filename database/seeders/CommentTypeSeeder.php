<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\CommentType;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CommentTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Realistic comment templates
        $commentTemplates = [
            [
                'name' => 'praise',
                'description' => 'Positive feedback and compliments about the project',
            ],
            [
                'name' => 'question',
                'description' => 'Questions about implementation, features, or technical details',
            ],
            [
                'name' => 'feedback',
                'description' => 'General feedback and observations about the project',
            ],
            [
                'name' => 'suggestion',
                'description' => 'Constructive suggestions for improvements or enhancements',
            ],
            [
                'name' => 'bug_report',
                'description' => 'Reports of bugs, issues, or problems found in the project',
            ],
            [
                'name' => 'feature_request',
                'description' => 'Requests for new features or functionality',
            ],
            [
                'name' => 'technical_discussion',
                'description' => 'In-depth technical discussions about architecture, patterns, or implementation',
            ],
            [
                'name' => 'collaboration',
                'description' => 'Offers to collaborate, contribute, or work together',
            ],
            [
                'name' => 'resource_sharing',
                'description' => 'Sharing helpful resources, links, or references',
            ],
            [
                'name' => 'critique',
                'description' => 'Constructive criticism and areas for improvement',
            ],
            [
                'name' => 'inspiration',
                'description' => 'Comments about being inspired by or learning from the project',
            ],
            [
                'name' => 'comparison',
                'description' => 'Comparisons with other projects, tools, or approaches',
            ],
            [
                'name' => 'use_case',
                'description' => 'Sharing how the project could be used or applied',
            ],
            [
                'name' => 'appreciation',
                'description' => 'Expressing gratitude or appreciation for the work',
            ],
            [
                'name' => 'clarification',
                'description' => 'Seeking clarification on specific aspects of the project',
            ],
            [
                'name' => 'support',
                'description' => 'Offering help, support, or assistance',
            ],
            [
                'name' => 'experience_sharing',
                'description' => 'Sharing personal experiences related to the project or similar work',
            ],
            [
                'name' => 'documentation',
                'description' => 'Comments about documentation, tutorials, or explanations',
            ],
            [
                'name' => 'performance',
                'description' => 'Comments specifically about performance, optimization, or efficiency',
            ],
            [
                'name' => 'design',
                'description' => 'Feedback focused on UI/UX design, aesthetics, or user experience',
            ],
            [
                'name' => 'accessibility',
                'description' => 'Comments about accessibility features and improvements',
            ],
            [
                'name' => 'security',
                'description' => 'Security-related observations, suggestions, or concerns',
            ],
            [
                'name' => 'testing',
                'description' => 'Comments about testing approaches, coverage, or quality assurance',
            ],
            [
                'name' => 'deployment',
                'description' => 'Feedback about deployment, hosting, or infrastructure',
            ],
            [
                'name' => 'learning',
                'description' => 'Comments about learning opportunities or educational value',
            ],
        ];

        foreach ($commentTemplates as $commentTemplate) {
            CommentType::create($commentTemplate);
        }

    }

}
