import { Link } from "@inertiajs/react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, ExternalLink, Github, Star } from "lucide-react"

interface Post {
  id: string
  title: string
  description: string
  author: {
    id: string
    name: string
    username: string
    avatar: string
    reputation: number
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
    overall: number
  }
  feedbackStatus: "awaiting" | "reviewed" | "trending"
  aiSummary: string
}

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  //const { likeProject, commentOnProject } = useAuthActions()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "trending":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "reviewed":
        return "bg-green-100 text-green-800 border-green-200"
      case "awaiting":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

 // const handleLike = likeProject(parseInt(post.id))
/*
const handleComment = commentOnProject(() => {
  // Navigate to project detail page and scroll to comments
  window.location.href = `/projects/${post.id}#comments`
})
*/

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Link href={`/users/${post.author.id}`}>
              <Avatar className="w-10 h-10">
                <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                <AvatarFallback>{post.author.name?.slice(0, 2)}</AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <Link href={`/users/${post.author.id}`} className="font-semibold hover:underline">
                  {post.author.name}
                </Link>
                <span className="text-sm text-muted-foreground">@{post.author.username}</span>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-muted-foreground">{post.author.reputation}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {post.createdAt}
              </p>
            </div>
          </div>
          <Badge className={getStatusColor(post.feedbackStatus)}>{post.feedbackStatus}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <Link href={`/projects/${post.id}`}>
            <h3 className="text-lg font-semibold hover:underline cursor-pointer">{post.title}</h3>
          </Link>
          <p className="text-muted-foreground mt-1 line-clamp-3">{post.description}</p>
        </div>

        {post.images.length > 0 && (
          <Link href={`/projects/${post.id}`}>
            <div className="relative aspect-video rounded-lg overflow-hidden cursor-pointer">
              <img
                src={post.images[0] || "/placeholder.svg"}
                alt={post.title}
                className="object-cover hover:scale-105 transition-transform"
              />
            </div>
          </Link>
        )}

        <div className="flex flex-wrap gap-2">
          {post.techStack.map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>

        <div className="bg-muted/50 rounded-lg p-3">
          <p className="text-sm font-medium mb-1">AI Analysis</p>
          <p className="text-sm text-muted-foreground">{post.aiSummary}</p>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{post.ratings.overall}</span>
          </div>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground">UI/UX: {post.ratings.uiux}</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground">Performance: {post.ratings.performance}</span>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 hover:text-red-600 hover:bg-red-50"
            >
              <Heart className="w-4 h-4" />
              {post.likes}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 hover:text-blue-600 hover:bg-blue-50"
            >
              <MessageCircle className="w-4 h-4" />
              {post.comments}
            </Button>
          </div>

          <div className="flex items-center gap-2">
            {post.liveUrl && (
              <Button variant="outline" size="sm" asChild>
                <a href={post.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            )}
            {post.githubUrl && (
              <Button variant="outline" size="sm" asChild>
                <a href={post.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
