// Transform CSV player data into the format expected by our app
export const transformPlayerData = (csvData) => {
  return csvData.map((player, index) => {
    // Map position from CSV to our app format
    const positionMap = {
      'Goalkeeper': 'GK',
      'Defender': 'DEF',
      'Midfielder': 'MID',
      'Forward': 'FWD'
    }

    // Generate mock stats for each player
    const mockStats = generateMockStats(player.position)
    
    // Generate mock form rating (5-10)
    const form = Math.floor(Math.random() * 6) + 5
    
    // Generate mock price (3-15 million)
    const price = Math.floor(Math.random() * 13) + 3

    return {
      id: player.player_id,
      name: player.web_name,
      position: positionMap[player.position] || 'MID',
      realTeam: player.team_name,
      stats: mockStats,
      isInjured: Math.random() < 0.1, // 10% chance of being injured
      price: price,
      form: form,
      playerCode: player.player_code,
      firstName: player.first_name,
      secondName: player.second_name,
      squadNumber: Math.floor(Math.random() * 98) + 1,
      teamColors: { primary: '#00ff00', secondary: '#ff0000' },
      currentTeam: player.team_name
    }
  })
}

// Generate realistic mock stats based on position
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
    minutesPlayed: 0,
    yellowCards: 0,
    redCards: 0,
    ownGoals: 0
  }

  switch (position) {
    case 'Goalkeeper':
      return {
        ...baseStats,
        cleanSheets: Math.floor(Math.random() * 15) + 5,
        saves: Math.floor(Math.random() * 100) + 50,
        minutesPlayed: Math.floor(Math.random() * 500) + 1500,
        yellowCards: Math.floor(Math.random() * 3),
        redCards: Math.floor(Math.random() * 2)
      }
    case 'Defender':
      return {
        ...baseStats,
        goals: Math.floor(Math.random() * 5),
        assists: Math.floor(Math.random() * 8),
        cleanSheets: Math.floor(Math.random() * 12) + 3,
        tackles: Math.floor(Math.random() * 80) + 20,
        interceptions: Math.floor(Math.random() * 60) + 15,
        minutesPlayed: Math.floor(Math.random() * 500) + 1500,
        yellowCards: Math.floor(Math.random() * 6) + 1,
        redCards: Math.floor(Math.random() * 2)
      }
    case 'Midfielder':
      return {
        ...baseStats,
        goals: Math.floor(Math.random() * 8) + 2,
        assists: Math.floor(Math.random() * 12) + 3,
        keyPasses: Math.floor(Math.random() * 100) + 20,
        tackles: Math.floor(Math.random() * 60) + 10,
        interceptions: Math.floor(Math.random() * 40) + 10,
        minutesPlayed: Math.floor(Math.random() * 500) + 1500,
        yellowCards: Math.floor(Math.random() * 5) + 1,
        redCards: Math.floor(Math.random() * 2)
      }
    case 'Forward':
      return {
        ...baseStats,
        goals: Math.floor(Math.random() * 20) + 5,
        assists: Math.floor(Math.random() * 10) + 2,
        keyPasses: Math.floor(Math.random() * 50) + 10,
        shotsOnTarget: Math.floor(Math.random() * 60) + 15,
        minutesPlayed: Math.floor(Math.random() * 500) + 1500,
        yellowCards: Math.floor(Math.random() * 4) + 1,
        redCards: Math.floor(Math.random() * 2)
      }
    default:
      return baseStats
  }
}

// Get unique teams from player data
export const getUniqueTeams = (players) => {
  const teams = [...new Set(players.map(player => player.realTeam))]
  return teams.sort()
}

// Get unique positions from player data
export const getUniquePositions = (players) => {
  const positions = [...new Set(players.map(player => player.position))]
  return positions.sort()
} 