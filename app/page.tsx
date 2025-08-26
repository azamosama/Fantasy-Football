"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TradeBlockPage from "@/components/TradeBlockPage"
import MatchupAnalysisPage from "@/components/MatchupAnalysisPage"
import InjuryRiskPage from "@/components/InjuryRiskPage"
import FutureToolsPage from "@/components/FutureToolsPage"
import { TrendingUp, BarChart3, AlertTriangle, Wrench } from "lucide-react"

export default function FantasyFootballApp() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Fantasy Football Companion</h1>
              <p className="text-muted-foreground">Your ultimate fantasy football analysis tool</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="trades" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="trades" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Trade Block
            </TabsTrigger>
            <TabsTrigger value="matchups" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Matchup Analysis
            </TabsTrigger>
            <TabsTrigger value="injuries" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Injury Risk
            </TabsTrigger>
            <TabsTrigger value="future" className="flex items-center gap-2">
              <Wrench className="w-4 h-4" />
              Future Tools
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trades">
            <TradeBlockPage />
          </TabsContent>

          <TabsContent value="matchups">
            <MatchupAnalysisPage />
          </TabsContent>

          <TabsContent value="injuries">
            <InjuryRiskPage />
          </TabsContent>

          <TabsContent value="future">
            <FutureToolsPage />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
