import { Link } from "@inertiajs/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, MessageCircle } from "lucide-react"

interface UserProjectsProps {
  projects: Array<{
    id: string
    title: string
    description: string
    image: string
    likes: number
    comments: number
    createdAt: string
  }>
}

export function UserProjects({ projects }: UserProjectsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Projects ({projects.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <Link key={project.id} href={`/post/${project.id}`}>
              <div className="group cursor-pointer">
                <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <h4 className="font-medium group-hover:underline">{project.title}</h4>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{project.description}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {project.likes}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" />
                    {project.comments}
                  </div>
                  <span>{project.createdAt}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
