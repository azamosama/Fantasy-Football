"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Progress } from "@/components/ui/progress"
import { fetchInjuries } from "@/services/api"
import { AlertTriangle, RefreshCw, Calendar, Activity } from "lucide-react"

export default function InjuryRiskPage() {
  const [injuries, setInjuries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadInjuries()
  }, [])

  const loadInjuries = async () => {
    setLoading(true)
    try {
      const data = await fetchInjuries()
      setInjuries(data)
    } catch (error) {
      console.error("Failed to load injuries:", error)
    } finally {
      setLoading(false)
    }
  }

  const getRiskColor = (risk) => {
    const colors = {
      High: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      Medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      Low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    }
    return colors[risk] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }

  const getSeverityProgress = (severity) => {
    const values = {
      Minor: 25,
      Moderate: 60,
      Severe: 90,
    }
    return values[severity] || 0
  }

  const getPositionColor = (position) => {
    const colors = {
      QB: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      RB: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      WR: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      TE: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    }
    return colors[position] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-24" />
        </div>
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-16" />
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  // Sort by risk rating (High -> Medium -> Low)
  const sortedInjuries = [...injuries].sort((a, b) => {
    const riskOrder = { High: 3, Medium: 2, Low: 1 }
    return riskOrder[b.riskRating] - riskOrder[a.riskRating]
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Injury Risk Assessment</h2>
          <p className="text-muted-foreground">Monitor player health and injury risks</p>
        </div>
        <Button onClick={loadInjuries} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Risk Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {["High", "Medium", "Low"].map((risk) => {
          const count = injuries.filter((injury) => injury.riskRating === risk).length
          return (
            <Card key={risk}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{risk} Risk</p>
                    <p className="text-2xl font-bold">{count}</p>
                  </div>
                  <AlertTriangle
                    className={`w-8 h-8 ${
                      risk === "High" ? "text-red-500" : risk === "Medium" ? "text-yellow-500" : "text-green-500"
                    }`}
                  />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Injury List */}
      <div className="grid gap-4">
        {sortedInjuries.map((injury) => (
          <Card key={injury.playerId} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-muted-foreground" />
                  <CardTitle className="text-lg">{injury.name}</CardTitle>
                  <Badge className={getPositionColor(injury.position)}>{injury.position}</Badge>
                  <Badge variant="outline">{injury.team}</Badge>
                </div>
                <Badge className={getRiskColor(injury.riskRating)}>{injury.riskRating} Risk</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Injury Type</p>
                  <p className="font-semibold">{injury.injuryType}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Expected Return</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="font-semibold">{injury.expectedReturn}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-muted-foreground">Severity</p>
                  <span className="text-sm font-semibold">{injury.severity}</span>
                </div>
                <Progress value={getSeverityProgress(injury.severity)} className="h-2" />
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Games Missed: {injury.gamesMissed}</span>
                <span>Last Updated: Just now</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {injuries.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Injury Data</h3>
            <p className="text-muted-foreground">Player injury information will appear here</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
