"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Wrench, Zap, Target, TrendingUp, Users, Calendar, BarChart } from "lucide-react"

export default function FutureToolsPage() {
  const futureFeatures = [
    {
      id: 1,
      title: "AI Draft Assistant",
      description: "Get personalized draft recommendations based on your league settings and draft position",
      icon: <Target className="w-6 h-6" />,
      status: "Coming Soon",
      priority: "High",
    },
    {
      id: 2,
      title: "Waiver Wire Optimizer",
      description: "Automatically identify the best waiver wire pickups based on upcoming matchups",
      icon: <TrendingUp className="w-6 h-6" />,
      status: "In Development",
      priority: "High",
    },
    {
      id: 3,
      title: "League Sync",
      description: "Connect directly to your fantasy league for real-time roster and scoring updates",
      icon: <Users className="w-6 h-6" />,
      status: "Planned",
      priority: "Medium",
    },
    {
      id: 4,
      title: "Schedule Analyzer",
      description: "Analyze player schedules and identify favorable/unfavorable matchup periods",
      icon: <Calendar className="w-6 h-6" />,
      status: "Research",
      priority: "Medium",
    },
    {
      id: 5,
      title: "Advanced Analytics",
      description: "Deep dive into player metrics, target share, red zone usage, and more",
      icon: <BarChart className="w-6 h-6" />,
      status: "Planned",
      priority: "Low",
    },
    {
      id: 6,
      title: "Mobile App",
      description: "Native mobile application for iOS and Android with push notifications",
      icon: <Zap className="w-6 h-6" />,
      status: "Research",
      priority: "Low",
    },
  ]

  const getStatusColor = (status) => {
    const colors = {
      "Coming Soon": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      "In Development": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      Planned: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      Research: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
    }
    return colors[status] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }

  const getPriorityColor = (priority) => {
    const colors = {
      High: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      Medium: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      Low: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    }
    return colors[priority] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Wrench className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">Future Tools</h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Exciting new features in development to make your fantasy football experience even better. Stay tuned for
          these upcoming enhancements!
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {futureFeatures.map((feature) => (
          <Card key={feature.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">{feature.icon}</div>
                  <div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Badge className={getStatusColor(feature.status)}>{feature.status}</Badge>
                  <Badge variant="outline" className={getPriorityColor(feature.priority)}>
                    {feature.priority}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm leading-relaxed">{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-muted/50">
        <CardContent className="text-center py-8">
          <h3 className="text-lg font-semibold mb-2">Have a Feature Request?</h3>
          <p className="text-muted-foreground mb-4">
            We'd love to hear your ideas for new tools and features that would help your fantasy football game.
          </p>
          <Button variant="outline">Submit Feedback</Button>
        </CardContent>
      </Card>
    </div>
  )
}
