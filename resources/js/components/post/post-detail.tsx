import { Link } from "@inertiajs/react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, ExternalLink, Github, Star, Share2 } from "lucide-react"

interface PostDetailProps {
  post: {
    id: string
    title: string
    description: string
    author: {
      id: string
      name: string
      username: string
      avatar: string
      reputation: number
      bio: string
    }
    techStack: string[]
    projectType: string
    liveUrl?: string
    githubUrl?: string
    images: string[]
    tags: string[]
    createdAt: string
    likes: number
    comments: number
    ratings: {
      uiux: number
      performance: number
      codeQuality: number
      accessibility: number
      overall: number
    }
    feedbackStatus: string
    feedbackAreas: string[]
  }
}

export function PostDetail({ post }: PostDetailProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Link href={`/user/${post.author.id}`}>
              <Avatar className="w-12 h-12">
                <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                <AvatarFallback>{post.author.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <Link href={`/user/${post.author.id}`} className="font-semibold hover:underline">
                  {post.author.name}
                </Link>
                <span className="text-sm text-muted-foreground">@{post.author.username}</span>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-muted-foreground">{post.author.reputation}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{post.author.bio}</p>
              <p className="text-sm text-muted-foreground">
                {post.createdAt}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Heart className="w-4 h-4" />
              {post.likes}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-3">{post.title}</h1>
          <div className="prose max-w-none">
            {post.description.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-3 text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {post.images.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold">Project Screenshots</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {post.images.map((image, index) => (
                <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                    <img
                    src={image || "/placeholder.svg"}
                    alt={`${post.title} screenshot ${index + 1}`}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Technology Stack</h3>
            <div className="flex flex-wrap gap-2">
              {post.techStack.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Feedback Areas</h3>
            <div className="flex flex-wrap gap-2">
              {post.feedbackAreas.map((area) => (
                <Badge key={area} variant="default">
                  {area}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-4 border-t">
          {post.liveUrl && (
            <Button asChild>
              <a href={post.liveUrl} target="_blank" rel="noopener noreferrer" className="gap-2">
                <ExternalLink className="w-4 h-4" />
                View Live
              </a>
            </Button>
          )}
          {post.githubUrl && (
            <Button variant="outline" asChild>
              <a href={post.githubUrl} target="_blank" rel="noopener noreferrer" className="gap-2">
                <Github className="w-4 h-4" />
                View Code
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
