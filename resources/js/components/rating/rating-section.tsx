"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

interface RatingSectionProps {
  postId: string
  currentRatings: {
    uiux: number
    performance: number
    codeQuality: number
    accessibility: number
    overall: number
  }
}

export function RatingSection({ currentRatings }: RatingSectionProps) {
  const [userRatings, setUserRatings] = useState({
    uiux: 0,
    performance: 0,
    codeQuality: 0,
    accessibility: 0,
  })

  const ratingCategories = [
    { key: "uiux", label: "UI/UX Design" },
    { key: "performance", label: "Performance" },
    { key: "codeQuality", label: "Code Quality" },
    { key: "accessibility", label: "Accessibility" },
  ]

  const handleRating = (category: string, rating: number) => {
    setUserRatings((prev) => ({
      ...prev,
      [category]: rating,
    }))
  }

  const submitRatings = () => {
    console.log("Submitting ratings:", userRatings)
    // Handle rating submission
  }

  const renderStars = (category: string, currentRating: number, userRating: number) => {
    return (
      <div className="flex items-center gap-2">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} onClick={() => handleRating(category, star)} className="p-0.5" title={`Rate ${category} ${star} stars`} aria-label={`Rate ${category} ${star} stars`} >
              <Star className={`w-4 h-4 ${star <= userRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
            </button>
          ))}
        </div>
        <span className="text-sm text-muted-foreground">Avg: {currentRating.toFixed(1)}</span>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Rate This Project</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold">{currentRatings.overall.toFixed(1)}</div>
          <div className="flex justify-center mb-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= Math.round(currentRatings.overall) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <div className="text-sm text-muted-foreground">Overall Rating</div>
        </div>

        <div className="space-y-3">
          {ratingCategories.map((category) => (
            <div key={category.key} className="space-y-1">
              <label className="text-sm font-medium">{category.label}</label>
              {renderStars(
                category.key,
                currentRatings[category.key as keyof typeof currentRatings],
                userRatings[category.key as keyof typeof userRatings],
              )}
            </div>
          ))}
        </div>

        <Button
          onClick={submitRatings}
          className="w-full"
          disabled={Object.values(userRatings).every((rating) => rating === 0)}
        >
          Submit Rating
        </Button>
      </CardContent>
    </Card>
  )
}
