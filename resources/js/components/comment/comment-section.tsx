"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Reply, MoreHorizontal } from "lucide-react"

const mockComments = [
  {
    id: "1",
    author: {
      id: "2",
      name: "Alex Rodriguez",
      username: "alexdesigns",
      avatar: "/placeholder.svg?height=32&width=32",
      reputation: 890,
    },
    content:
      "This is really impressive! The AI prioritization feature is exactly what I've been looking for. Have you considered adding integration with popular calendar apps like Google Calendar or Outlook?",
    createdAt: "2024-01-15T14:30:00Z",
    likes: 8,
    replies: [
      {
        id: "1-1",
        author: {
          id: "1",
          name: "Sarah Chen",
          username: "sarahdev",
          avatar: "/placeholder.svg?height=32&width=32",
          reputation: 1250,
        },
        content:
          "Thanks Alex! Yes, calendar integration is definitely on the roadmap. I'm planning to add Google Calendar first, then expand to other providers.",
        createdAt: "2024-01-15T15:45:00Z",
        likes: 3,
      },
    ],
  },
  {
    id: "2",
    author: {
      id: "3",
      name: "Maya Patel",
      username: "mayabuilds",
      avatar: "/placeholder.svg?height=32&width=32",
      reputation: 2100,
    },
    content:
      "Great work on the performance optimization! I noticed the app loads really quickly. What caching strategies are you using? Also, have you run any accessibility audits?",
    createdAt: "2024-01-15T16:20:00Z",
    likes: 12,
    replies: [],
  },
  {
    id: "3",
    author: {
      id: "4",
      name: "David Kim",
      username: "davidcodes",
      avatar: "/placeholder.svg?height=32&width=32",
      reputation: 1580,
    },
    content:
      "The UI is clean and intuitive! One suggestion: the mobile version could use some improvements in the task creation flow. It feels a bit cramped on smaller screens.",
    createdAt: "2024-01-15T18:10:00Z",
    likes: 6,
    replies: [],
  },
]

export function CommentSection() {
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState("")

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      // Handle comment submission
      console.log("New comment:", newComment)
      setNewComment("")
    }
  }

  const handleSubmitReply = (commentId: string) => {
    if (replyContent.trim()) {
      // Handle reply submission
      console.log("Reply to", commentId, ":", replyContent)
      setReplyContent("")
      setReplyingTo(null)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comments ({mockComments.length})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* New Comment Form */}
        <div className="space-y-3">
          <Textarea
            placeholder="Share your feedback or ask a question..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
          />
          <div className="flex justify-end">
            <Button onClick={handleSubmitComment} disabled={!newComment.trim()}>
              Post Comment
            </Button>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {mockComments.map((comment) => (
            <div key={comment.id} className="space-y-3">
              {/* Main Comment */}
              <div className="flex gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                  <AvatarFallback>{comment.author.name.slice(0, 2)}</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{comment.author.name}</span>
                    <span className="text-sm text-muted-foreground">@{comment.author.username}</span>
                    <span className="text-sm text-muted-foreground">
                      {comment.createdAt}
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed">{comment.content}</p>

                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="gap-1 h-8">
                      <Heart className="w-3 h-3" />
                      {comment.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1 h-8" onClick={() => setReplyingTo(comment.id)}>
                      <Reply className="w-3 h-3" />
                      Reply
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8">
                      <MoreHorizontal className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Reply Form */}
              {replyingTo === comment.id && (
                <div className="ml-11 space-y-2">
                  <Textarea
                    placeholder={`Reply to ${comment.author.name}...`}
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    rows={2}
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleSubmitReply(comment.id)}>
                      Reply
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setReplyingTo(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {/* Replies */}
              {comment.replies.length > 0 && (
                <div className="ml-11 space-y-3">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex gap-3">
                      <Avatar className="w-7 h-7">
                        <AvatarImage src={reply.author.avatar || "/placeholder.svg"} alt={reply.author.name} />
                        <AvatarFallback>{reply.author.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{reply.author.name}</span>
                          <span className="text-xs text-muted-foreground">@{reply.author.username}</span>
                          <span className="text-xs text-muted-foreground">
                            {reply.createdAt}
                          </span>
                        </div>

                        <p className="text-sm leading-relaxed">{reply.content}</p>

                        <div className="flex items-center gap-4">
                          <Button variant="ghost" size="sm" className="gap-1 h-7">
                            <Heart className="w-3 h-3" />
                            {reply.likes}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
