import { Link } from "@inertiajs/react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, ExternalLink, Github, Star } from "lucide-react"
import { urlApi } from "@/lib/utils"

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
  tags: string[]
  thumbnail?: string | null
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

 const limitTags = 3;

const projectImage = post.thumbnail ? (post.thumbnail.startsWith("http") ? post.thumbnail : urlApi + post.thumbnail) : "/placeholder.svg"

console.log(post)
  return (
    <Card className="group overflow-hidden border-0 bg-white shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Link href={`/users/${post.author.id}`}>
              <Avatar className="w-10 h-10 ring-2 ring-transparent group-hover:ring-blue-500/30 transition">
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
          <Badge className={`${getStatusColor(post.feedbackStatus)} capitalize tracking-wide rounded-full px-2 py-1 text-xs`}>{post.feedbackStatus}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <Link href={`/projects/${post.id}`}>
            <h3 className="text-xl font-bold hover:underline cursor-pointer leading-snug line-clamp-2">{post.title}</h3>
          </Link>
          <p className="text-muted-foreground mt-2 line-clamp-3 text-sm sm:text-base">{post.description}</p>
        </div>

        {projectImage && (
          <Link href={`/projects/${post.id}`}>
            <div className="relative aspect-video rounded-xl overflow-hidden cursor-pointer ring-1 ring-gray-100 group-hover:ring-blue-200/60 transition">
              <img
                src={projectImage}
                alt={post.title}
                className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>
        )}

        {post.techStack.length > 0 && (
          <div className="flex mt-3 flex-wrap gap-2">
            {post.techStack.slice(0, 4).map((tech, index) => {
              const colors = [
                'bg-blue-500/10 text-blue-700 border-blue-200/50',
                'bg-purple-500/10 text-purple-700 border-purple-200/50',
                'bg-green-500/10 text-green-700 border-green-200/50',
                'bg-pink-500/10 text-pink-700 border-pink-200/50',
                'bg-indigo-500/10 text-indigo-700 border-indigo-200/50',
                'bg-orange-500/10 text-orange-700 border-orange-200/50',
                'bg-teal-500/10 text-teal-700 border-teal-200/50',
                'bg-red-500/10 text-red-700 border-red-200/50',
                'bg-cyan-500/10 text-cyan-700 border-cyan-200/50',
                'bg-emerald-500/10 text-emerald-700 border-emerald-200/50'
              ];
              const colorClass = colors[index % colors.length];
              
              return (
                <Badge 
                  key={tech} 
                  variant="outline" 
                  className={`text-[10px] sm:text-xs rounded-full px-2.5 py-1 font-medium border transition-all duration-200 hover:scale-105 hover:shadow-sm ${colorClass}`}
                >
                  {tech}
                </Badge>
              );
            })}
            {post.techStack.length > limitTags && (
              <Badge 
                variant="outline" 
                className="text-[10px] sm:text-xs rounded-full px-2.5 py-1 bg-gray-100/80 text-gray-600 border-gray-200/50 font-medium hover:bg-gray-200/80 transition-colors duration-200"
              >
                +{post.techStack.length - limitTags}
              </Badge>
            )}
          </div>
        )}

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 5).map((tag) => (
              <Badge key={tag} variant="outline" className="text-[10px] sm:text-xs rounded-full">
                #{tag}
              </Badge>
            ))}
            {post.tags.length > 5 && (
              <Badge variant="secondary" className="text-[10px] sm:text-xs rounded-full">+{post.tags.length - 5}</Badge>
            )}
          </div>
        )}

        <div className="bg-muted/50 rounded-xl p-3 sm:p-4">
          <p className="text-sm font-semibold mb-1">AI Analysis</p>
          <p className="text-sm text-muted-foreground line-clamp-3">{post.aiSummary}</p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm">
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
              className="gap-2 hover:text-red-600 hover:bg-red-50 rounded-full"
            >
              <Heart className="w-4 h-4" />
              {post.likes}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 hover:text-blue-600 hover:bg-blue-50 rounded-full"
            >
              <MessageCircle className="w-4 h-4" />
              {post.comments}
            </Button>
          </div>

          <div className="flex items-center gap-2">
            {post.liveUrl && (
              <Button variant="outline" size="sm" asChild>
                <a href={post.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Open live project" title="Open live project">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            )}
            {post.githubUrl && (
              <Button variant="outline" size="sm" asChild>
                <a href={post.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="Open GitHub repo" title="Open GitHub repo">
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
