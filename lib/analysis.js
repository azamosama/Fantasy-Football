export function analyzeMatchup(matchup) {
  const { playersPerformance, result } = matchup

  const topPerformers = [...playersPerformance].sort((a, b) => b.points - a.points).slice(0, 3)

  const underPerformers = [...playersPerformance]
    .filter((p) => p.slot === "starter")
    .sort((a, b) => a.points - b.points)
    .slice(0, 2)

  const injuries = playersPerformance.filter((p) => p.status === "injured")

  // Decision analysis: find better bench players than struggling starters
  const decisionAlerts = []
  underPerformers.forEach((starter) => {
    const betterBench = playersPerformance.filter((p) => p.slot === "bench" && p.points > starter.points)
    if (betterBench.length > 0) {
      const bestBench = betterBench.sort((a, b) => b.points - a.points)[0]
      const pointDiff = bestBench.points - starter.points
      decisionAlerts.push(
        `If ${starter.player} (starter) had been swapped with ${bestBench.player} (bench), the team would have gained ${pointDiff} extra points.`,
      )
    }
  })

  // Narrative builder
  let narrative = `${result}. `
  narrative += `Top performers included ${topPerformers.map((p) => `${p.player} (${p.points} pts)`).join(", ")}. `

  if (underPerformers.length > 0) {
    narrative += `Struggles from ${underPerformers.map((p) => `${p.player} (${p.points} pts)`).join(", ")} hurt the outcome. `
  }

  if (injuries.length > 0) {
    narrative += `Key injuries: ${injuries.map((p) => p.player).join(", ")}. `
  }

  if (decisionAlerts.length > 0) {
    narrative += decisionAlerts.join(" ")
  }

  return narrative
}
