import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user?: User | null;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    username?: string;
    avatar?: string;
    avatar_url: string;
    bio?: string;
    github_username?: string;
    portfolio_url?: string;
    twitter_handle?: string;
    location?: string;
    job_title?: string;
    company?: string;
    reputation_score: number;
    skills?: string[];
    projects?: Project[];
    comments?: Comment[];
    ratings?: Rating[];
    is_verified: boolean;
    is_available_for_hire: boolean;
    projects_count?: number;
    comments_count?: number;
    ratings_given_count?: number;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    last_active_at?: string;
}


interface Tag {
    id: number;
    name: string;
    slug: string;
    color: string;
    type: string;
}


interface Comment {
    id: number;
    content: string;
    type: string;
    likes_count: number;
    is_edited: boolean;
    created_at: string;
    user: User;
    replies?: Comment[];
}

interface Rating {
    id: number;
    ui_ux_score?: number;
    performance_score?: number;
    code_quality_score?: number;
    innovation_score?: number;
    overall_score: number;
    review_comment?: string;
    created_at: string;
    user: User;
}

interface Project {
    id: number;
    title: string;
    description: string;
    github_url?: string;
    live_url?: string;
    thumbnail?: string;
    project_type: string;
    feedback_request?: string;
    status: string;
    tech_stack?: string[];
    views_count: number;
    likes_count: number;
    comments_count: number;
    ratings_count: number;
    average_rating?: number;
    is_featured: boolean;
    created_at: string;
    updated_at: string;
    user: User;
    tags: Tag[];
    comments?: Comment[];
    ratings?: Rating[];
}
