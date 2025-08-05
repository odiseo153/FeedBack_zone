import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, MessageCircle, Star } from "lucide-react"

const mockActivity = [
  {
    id: "1",
    type: "comment",
    content: "Great work on the performance optimization! The loading times are impressive.",
    target: {
      type: "post",
      title: "React Performance Dashboard",
      author: "Alex Rodriguez",
    },
    createdAt: "2024-01-15T16:30:00Z",
  },
  {
    id: "2",
    type: "like",
    target: {
      type: "post",
      title: "Minimalist Portfolio Design",
      author: "Maya Patel",
    },
    createdAt: "2024-01-15T14:20:00Z",
  },
  {
    id: "3",
    type: "rating",
    rating: 5,
    category: "UI/UX",
    target: {
      type: "post",
      title: "E-commerce Mobile App",
      author: "David Kim",
    },
    createdAt: "2024-01-15T12:10:00Z",
  },
]

interface Activity {
    id: string;
    type: 'comment' | 'like' | 'rating';
    content?: string;
    target: {
        type: 'post';
        title: string;
        author: string;
    };
    createdAt: string;
    rating?: number;
    category?: string;
}

export function UserActivity() {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "comment":
        return MessageCircle
      case "like":
        return Heart
      case "rating":
        return Star
      default:
        return MessageCircle
    }
  }

  const getActivityText = (activity: Activity) => {
    switch (activity.type) {
      case "comment":
        return `commented on "${activity.target.title}" by ${activity.target.author}`
      case "like":
        return `liked "${activity.target.title}" by ${activity.target.author}`
      case "rating":
        return `rated "${activity.target.title}" by ${activity.target.author} (${activity.rating}/5 for ${activity.category})`
      default:
        return "performed an action"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockActivity.map((activity) => {
            const Icon = getActivityIcon(activity.type)
            return (
              <div key={activity.id} className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-medium">Sarah Chen</span> {getActivityText(activity)}
                  </p>
                  {activity.content && (
                    <p className="text-sm text-muted-foreground mt-1 italic">"{activity.content}"</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.createdAt}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
