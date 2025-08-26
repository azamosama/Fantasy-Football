"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchMatchups } from "@/services/api"
import { analyzeMatchup } from "@/lib/analysis"
import { BarChart3, RefreshCw, Trophy, AlertCircle, TrendingUp, TrendingDown } from "lucide-react"

export default function MatchupAnalysisPage() {
  const [matchups, setMatchups] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadMatchups()
  }, [])

  const loadMatchups = async () => {
    setLoading(true)
    try {
      const data = await fetchMatchups()
      setMatchups(data)
    } catch (error) {
      console.error("Failed to load matchups:", error)
    } finally {
      setLoading(false)
    }
  }

  const getPlayerStatusIcon = (status) => {
    if (status === "injured") return <AlertCircle className="w-4 h-4 text-red-500" />
    if (status === "questionable") return <AlertCircle className="w-4 h-4 text-yellow-500" />
    return null
  }

  const getPointsColor = (points) => {
    if (points >= 20) return "text-green-600 dark:text-green-400"
    if (points >= 15) return "text-blue-600 dark:text-blue-400"
    if (points >= 10) return "text-yellow-600 dark:text-yellow-400"
    return "text-red-600 dark:text-red-400"
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-24" />
        </div>
        {[...Array(2)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-64" />
              <Skeleton className="h-4 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-32 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Matchup Analysis</h2>
          <p className="text-muted-foreground">Detailed performance reports and decision analysis</p>
        </div>
        <Button onClick={loadMatchups} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="space-y-6">
        {matchups.map((matchup) => {
          const analysis = analyzeMatchup(matchup)
          const starters = matchup.playersPerformance.filter((p) => p.slot === "starter")
          const bench = matchup.playersPerformance.filter((p) => p.slot === "bench")

          return (
            <Card key={matchup.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                    <div>
                      <CardTitle className="text-xl">
                        {matchup.teamA} vs {matchup.teamB}
                      </CardTitle>
                      <CardDescription>
                        Week {matchup.week} • Final Score: {matchup.finalScore}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant={matchup.result.includes("won") ? "default" : "secondary"}>{matchup.result}</Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Analysis Summary */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Analysis Summary
                  </h4>
                  <p className="text-sm text-foreground leading-relaxed">{analysis}</p>
                </div>

                {/* Player Performance */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Starters */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      Starting Lineup
                    </h4>
                    <div className="space-y-2">
                      {starters.map((player, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-card border rounded-lg">
                          <div className="flex items-center gap-2">
                            {getPlayerStatusIcon(player.status)}
                            <span className="font-medium">{player.player}</span>
                            <Badge variant="outline" className="text-xs">
                              {player.team}
                            </Badge>
                          </div>
                          <span className={`font-bold ${getPointsColor(player.points)}`}>{player.points} pts</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bench */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-gray-500" />
                      Bench Players
                    </h4>
                    <div className="space-y-2">
                      {bench.map((player, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-muted/30 border rounded-lg">
                          <div className="flex items-center gap-2">
                            {getPlayerStatusIcon(player.status)}
                            <span className="font-medium">{player.player}</span>
                            <Badge variant="outline" className="text-xs">
                              {player.team}
                            </Badge>
                          </div>
                          <span className={`font-bold ${getPointsColor(player.points)}`}>{player.points} pts</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {matchups.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Matchup Data</h3>
            <p className="text-muted-foreground">Matchup analysis will appear here after games</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
