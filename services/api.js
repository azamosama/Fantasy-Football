import trades from "../data/trades.json"
import matchups from "../data/matchups.json"
import injuries from "../data/injuries.json"

const USE_MOCK = true // toggle later for live API

export async function fetchTrades() {
  if (USE_MOCK) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    return trades
  }
  return fetch("https://example-nfl-api.com/trades").then((res) => res.json())
}

export async function fetchMatchups() {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return matchups
  }
  return fetch("https://example-nfl-api.com/matchups").then((res) => res.json())
}

export async function fetchInjuries() {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 400))
    return injuries
  }
  return fetch("https://example-nfl-api.com/injuries").then((res) => res.json())
}

export async function fetchPlayerStats(playerId) {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return {
      id: playerId,
      avgPoints: 15.2,
      projectedPoints: 18.5,
      consistency: 0.75,
    }
  }
  return fetch(`https://example-nfl-api.com/players/${playerId}/stats`).then((res) => res.json())
}
