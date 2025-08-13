// Transform CSV player data into app format
export const transformPlayerData = (csvData) => {
  return csvData.map((player, index) => {
    // Map position from CSV to our format
    const positionMap = {
      'Goalkeeper': 'GK',
      'Defender': 'DEF', 
      'Midfielder': 'MID',
      'Forward': 'FWD'
    }

    // Generate mock stats for demonstration
    const stats = generateMockStats(player.position)
    
    return {
      id: player.player_id || index.toString(),
      name: player.web_name || `${player.first_name} ${player.second_name}`,
      position: positionMap[player.position] || 'MID',
      team: player.team_name,
      realTeam: player.team_name,
      stats,
      isInjured: Math.random() < 0.1, // 10% chance of being injured
      injured: Math.random() < 0.1, // 10% chance of being injured (for UI consistency)
      price: Math.floor(Math.random() * 15) + 4, // Random price between 4-18m
      form: Math.floor(Math.random() * 4) + 6, // Random form between 6-9
      ownership: Math.floor(Math.random() * 80) + 5, // Random ownership 5-85%
      goals: stats.goals,
      assists: stats.assists,
      cleanSheets: stats.cleanSheets
    }
  })
}

// Generate mock stats based on position
const generateMockStats = (position) => {
  const baseStats = {
    goals: 0,
    assists: 0,
    cleanSheets: 0,
    saves: 0,
    tackles: 0,
    interceptions: 0,
    keyPasses: 0,
    shotsOnTarget: 0,
    minutesPlayed: Math.floor(Math.random() * 1800) + 200,
    yellowCards: Math.floor(Math.random() * 5),
    redCards: Math.floor(Math.random() * 2),
    ownGoals: 0
  }

  switch (position) {
    case 'Goalkeeper':
      return {
        ...baseStats,
        saves: Math.floor(Math.random() * 100) + 20,
        cleanSheets: Math.floor(Math.random() * 10) + 2,
        goals: Math.floor(Math.random() * 2)
      }
    case 'Defender':
      return {
        ...baseStats,
        cleanSheets: Math.floor(Math.random() * 8) + 2,
        tackles: Math.floor(Math.random() * 50) + 10,
        interceptions: Math.floor(Math.random() * 40) + 10,
        goals: Math.floor(Math.random() * 5)
      }
    case 'Midfielder':
      return {
        ...baseStats,
        goals: Math.floor(Math.random() * 8) + 1,
        assists: Math.floor(Math.random() * 10) + 2,
        keyPasses: Math.floor(Math.random() * 60) + 10,
        tackles: Math.floor(Math.random() * 30) + 5
      }
    case 'Forward':
      return {
        ...baseStats,
        goals: Math.floor(Math.random() * 15) + 3,
        assists: Math.floor(Math.random() * 8) + 1,
        shotsOnTarget: Math.floor(Math.random() * 40) + 10,
        keyPasses: Math.floor(Math.random() * 20) + 5
      }
    default:
      return baseStats
  }
}

// Extract unique teams from player data
export const getUniqueTeams = (players) => {
  const teams = [...new Set(players.map(player => player.realTeam))]
  return teams.sort()
}

// Extract unique positions from player data
export const getUniquePositions = (players) => {
  const positions = [...new Set(players.map(player => player.position))]
  return positions.sort()
} 