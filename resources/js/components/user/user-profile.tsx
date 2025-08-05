import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Globe, Calendar, Star, Users, Heart } from "lucide-react"

interface UserProfileProps {
  user: {
    id: string
    name: string
    username: string
    avatar: string
    bio: string
    location: string
    website: string
    joinedAt: string
    reputation: number
    stats: {
      projects: number
      comments: number
      likes: number
      followers: number
      following: number
    }
    skills: string[]
  }
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="text-center">
          <Avatar className="w-24 h-24 mx-auto">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback className="text-2xl">{user.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <h1 className="text-xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">@{user.username}</p>
            <div className="flex items-center justify-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{user.reputation}</span>
              <span className="text-sm text-muted-foreground">reputation</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">{user.bio}</p>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              {user.location}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Globe className="w-4 h-4" />
              <a href={user.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {user.website}
              </a>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              Joined {user.joinedAt}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="font-bold">{user.stats.projects}</div>
              <div className="text-xs text-muted-foreground">Projects</div>
            </div>
            <div className="text-center">
              <div className="font-bold">{user.stats.comments}</div>
              <div className="text-xs text-muted-foreground">Comments</div>
            </div>
            <div className="text-center">
              <div className="font-bold">{user.stats.followers}</div>
              <div className="text-xs text-muted-foreground">Followers</div>
            </div>
            <div className="text-center">
              <div className="font-bold">{user.stats.following}</div>
              <div className="text-xs text-muted-foreground">Following</div>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button className="flex-1">
              <Users className="w-4 h-4 mr-2" />
              Follow
            </Button>
            <Button variant="outline">
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="font-semibold">Skills</h3>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
