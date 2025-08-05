<?php

namespace Database\Seeders;

use App\Models\Rating;
use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RatingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $projects = Project::with('user')->get();
        $users = User::all();

        // Rating comment templates based on overall score
        $ratingComments = [
            5 => [
                'Absolutely exceptional work! This project sets a new standard for quality and innovation.',
                'Outstanding execution across all aspects. The attention to detail is remarkable.',
                'Perfect implementation! This is exactly how this type of project should be built.',
                'Flawless work! The code quality, design, and functionality are all top-notch.',
                'Incredible project! Every aspect exceeds expectations. Truly inspirational work.',
            ],
            4 => [
                'Excellent work! Very well executed with only minor areas for improvement.',
                'Great project overall! The implementation is solid and the design is thoughtful.',
                'Really impressive work! A few small tweaks could make this perfect.',
                'Very well done! The project is polished and shows great attention to detail.',
                'Strong execution! This is a high-quality project with excellent foundations.',
            ],
            3 => [
                'Good work! The project shows promise with solid fundamentals.',
                'Nice implementation! There are some areas for improvement but overall it\'s well done.',
                'Solid project! The core functionality works well, with room for enhancement.',
                'Decent work! The project accomplishes its goals with some areas to polish.',
                'Good effort! The project is functional and shows good understanding of the concepts.',
            ],
            2 => [
                'The project has potential but needs significant improvements in several areas.',
                'Basic functionality is there, but the implementation could be much better.',
                'The concept is good but the execution needs more work to reach its potential.',
                'Some good ideas here, but the project needs refinement in multiple areas.',
                'The foundation is there, but several aspects need improvement for better quality.',
            ],
            1 => [
                'The project needs major improvements across all areas to be considered complete.',
                'While the idea has merit, the current implementation falls short of expectations.',
                'Significant work is needed to bring this project up to acceptable standards.',
                'The concept is interesting but the execution needs substantial improvement.',
                'This project requires extensive revisions to meet basic quality standards.',
            ]
        ];

        foreach ($projects as $project) {
            // Skip if project has no user
            if (!$project->user) continue;

            // Determine number of ratings based on project popularity
            $numRatings = $this->calculateRatingsForProject($project);

            if ($numRatings === 0) continue;

            // Create ratings
            $ratingsCreated = 0;
            $availableUsers = $users->where('id', '!=', $project->user_id)->shuffle();

            foreach ($availableUsers as $rater) {
                if ($ratingsCreated >= $numRatings) break;

                // Generate realistic rating scores
                $ratingScores = $this->generateRealisticRatings($project);

                // Calculate overall score (weighted average or simple average)
                $overallScore = round(($ratingScores['ui_ux'] + $ratingScores['performance'] +
                                     $ratingScores['code_quality'] + $ratingScores['innovation']) / 4);

                // Select appropriate comment based on overall score
                $comments = $ratingComments[$overallScore] ?? $ratingComments[3];
                $reviewComment = $comments[array_rand($comments)];

                // Personalize comment based on project type
                $reviewComment = $this->personalizeRatingComment($reviewComment, $project);

                $rating = Rating::create([
                    'project_id' => $project->id,
                    'user_id' => $rater->id,
                    'ui_ux_score' => $ratingScores['ui_ux'],
                    'performance_score' => $ratingScores['performance'],
                    'code_quality_score' => $ratingScores['code_quality'],
                    'innovation_score' => $ratingScores['innovation'],
                    'overall_score' => $overallScore,
                    'review_comment' => strlen($reviewComment) > 10 ? $reviewComment : null,
                    'created_at' => $this->generateRatingDate($project->created_at),
                    'updated_at' => now(),
                ]);

                $ratingsCreated++;

                // Break early sometimes to create variety in rating counts
                if (rand(1, 100) <= 15) break; // 15% chance to stop early
            }
        }

        // Update project rating statistics
        foreach ($projects as $project) {
            $ratings = $project->ratings;
            $ratingCount = $ratings->count();

            if ($ratingCount > 0) {
                $averageRating = $ratings->avg('overall_score');

                // Update project with rating count (the average is calculated in the model)
                $project->update([
                    'ratings_count' => $ratingCount
                ]);
            }
        }
    }

    private function calculateRatingsForProject(Project $project): int
    {
        $baseRatings = 0;

        // More popular projects get more ratings
        if ($project->views_count > 1500) $baseRatings += rand(5, 12);
        elseif ($project->views_count > 800) $baseRatings += rand(3, 8);
        elseif ($project->views_count > 300) $baseRatings += rand(1, 5);
        else $baseRatings += rand(0, 2);

        if ($project->likes_count > 80) $baseRatings += rand(3, 6);
        elseif ($project->likes_count > 40) $baseRatings += rand(1, 4);

        if ($project->is_featured) $baseRatings += rand(2, 5);

        // Featured projects and certain types get more ratings
        if (in_array($project->project_type, ['web', 'fullstack', 'design'])) {
            $baseRatings += rand(1, 3);
        }

        return min($baseRatings, 15); // Cap at 15 ratings per project
    }

    private function generateRealisticRatings(Project $project): array
    {
        // Define base quality based on project characteristics
        $baseQuality = $this->determineProjectBaseQuality($project);

        // Generate scores with some variance around the base quality
        $variance = 1; // How much scores can vary

        $scores = [];
        $categories = ['ui_ux', 'performance', 'code_quality', 'innovation'];

        foreach ($categories as $category) {
            $baseScore = $baseQuality;

            // Adjust base score for specific categories based on project type
            $baseScore = $this->adjustScoreForCategory($baseScore, $category, $project);

            // Add random variance
            $score = $baseScore + rand(-$variance, $variance);

            // Ensure score is within valid range
            $scores[$category] = max(1, min(5, $score));
        }

        return $scores;
    }

    private function determineProjectBaseQuality(Project $project): int
    {
        $quality = 3; // Default to average

        // Featured projects tend to be higher quality
        if ($project->is_featured) $quality += 1;

        // Projects with more engagement tend to be higher quality
        if ($project->likes_count > 100) $quality += 1;
        elseif ($project->likes_count > 50) $quality += 0.5;

        if ($project->views_count > 1000) $quality += 0.5;

        // Projects with both GitHub and live URLs tend to be more complete
        if ($project->github_url && $project->live_url) $quality += 0.5;

        // Certain tech stacks might indicate higher quality
        $modernTech = ['React', 'Vue.js', 'Angular', 'TypeScript', 'Node.js', 'Python', 'Docker', 'Kubernetes'];
        if ($project->tech_stack) {
            $modernTechCount = count(array_intersect($project->tech_stack, $modernTech));
            if ($modernTechCount >= 3) $quality += 0.5;
        }

        return round(max(2, min(5, $quality))); // Keep between 2-5
    }

    private function adjustScoreForCategory(int $baseScore, string $category, Project $project): int
    {
        switch ($category) {
            case 'ui_ux':
                // Design projects and web projects might score higher in UI/UX
                if (in_array($project->project_type, ['design', 'web'])) {
                    return min(5, $baseScore + 1);
                }
                // Backend projects might score lower in UI/UX
                if ($project->project_type === 'backend') {
                    return max(1, $baseScore - 1);
                }
                break;

            case 'performance':
                // Backend and fullstack projects might score higher in performance
                if (in_array($project->project_type, ['backend', 'fullstack'])) {
                    return min(5, $baseScore + 1);
                }
                break;

            case 'code_quality':
                // All project types can have good code quality, but backend projects might be judged more strictly
                if ($project->project_type === 'backend') {
                    return min(5, $baseScore + 1);
                }
                break;

            case 'innovation':
                // AI/ML projects and unique project types might score higher in innovation
                if ($project->tech_stack &&
                    (in_array('TensorFlow', $project->tech_stack) ||
                     in_array('AI', $project->tech_stack) ||
                     in_array('Python', $project->tech_stack))) {
                    return min(5, $baseScore + 1);
                }
                if ($project->project_type === 'other') {
                    return min(5, $baseScore + 1);
                }
                break;
        }

        return $baseScore;
    }

    private function personalizeRatingComment(string $comment, Project $project): string
    {
        // Replace generic terms with project-specific ones
        $replacements = [
            'implementation' => $project->project_type === 'design' ? 'design execution' : 'implementation',
            'functionality' => $project->project_type === 'backend' ? 'API design' : 'functionality',
            'design' => $project->project_type === 'backend' ? 'architecture' : 'design',
        ];

        $personalized = $comment;
        foreach ($replacements as $search => $replace) {
            $personalized = str_replace($search, $replace, $personalized);
        }

        return $personalized;
    }

    private function generateRatingDate($projectCreatedAt)
    {
        // Ratings should be created after the project, but not immediately
        $minDate = $projectCreatedAt->addDays(rand(2, 14)); // 2-14 days after project creation
        $maxDate = now()->subDays(1); // At least 1 day ago

        if ($minDate > $maxDate) {
            $minDate = $projectCreatedAt->addHours(rand(24, 48));
        }

        $randomTimestamp = rand($minDate->timestamp, $maxDate->timestamp);
        return \Carbon\Carbon::createFromTimestamp($randomTimestamp);
    }
}
