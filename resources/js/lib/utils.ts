import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Project, Tag } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Transform Laravel project data to PostCard interface
export function transformProjectToPost(project: Project) {
  return {
    id: project.id.toString(),
    title: project.title,
    description: project.description,
    author: {
      id: project.user?.id.toString(),
      name: project.user?.name,
      username: project.user?.username || project.user?.name?.toLowerCase().replace(/\s+/g, ''),
      avatar: project.user?.avatar_url || "/placeholder.svg",
      reputation: project.user?.reputation_score || 0,
    },
    techStack: project.tech_stack || [],
    projectType: project.project_type,
    liveUrl: project.live_url,
    githubUrl: project.github_url,
    images: project.thumbnail_url ? [project.thumbnail_url] : [],
    tags: project.tags?.map((tag: Tag) => tag.name) || [],
    createdAt: new Date(project.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }),
    likes: project.likes_count || 0,
    comments: project.comments_count || 0,
    ratings: {
      uiux: project.average_rating || 0,
      performance: project.average_rating || 0,
      codeQuality: project.average_rating || 0,
      overall: project.average_rating || 0,
    },
    feedbackStatus: project.is_featured ? 'trending' as const :
                   (project.comments_count > 5 ? 'reviewed' as const : 'awaiting' as const),
    aiSummary: project.feedback_request || `This ${project.project_type} project showcases ${project.tech_stack?.slice(0, 2).join(' and ')} implementation with modern development practices.`,
  }
}
