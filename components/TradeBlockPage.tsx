"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchTrades } from "@/services/api"
import { RefreshCw, Clock, User, TrendingUp } from "lucide-react"

export default function TradeBlockPage() {
  const [trades, setTrades] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTrades()
  }, [])

  const loadTrades = async () => {
    setLoading(true)
    try {
      const data = await fetchTrades()
      setTrades(data)
    } catch (error) {
      console.error("Failed to load trades:", error)
    } finally {
      setLoading(false)
    }
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Trade Block</h2>
          <p className="text-muted-foreground">Latest trade rumors and player movement</p>
        </div>
        <Button onClick={loadTrades} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="grid gap-4">
        {trades.map((trade) => (
          <Card key={trade.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <CardTitle className="text-lg">{trade.player}</CardTitle>
                  <Badge className={getPositionColor(trade.position)}>{trade.position}</Badge>
                  <Badge variant="outline">{trade.team}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground mb-3">{trade.rumor}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Updated {formatDate(trade.lastUpdated)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {trades.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Trade Rumors</h3>
            <p className="text-muted-foreground">Check back later for the latest trade news</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
