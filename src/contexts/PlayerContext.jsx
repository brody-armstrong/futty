import { createContext, useContext, useState, useEffect } from 'react'
import { transformPlayerData, getUniqueTeams, getUniquePositions } from '../utils/playerData'

const PlayerContext = createContext()

export const usePlayers = () => {
  const context = useContext(PlayerContext)
  if (!context) {
    throw new Error('usePlayers must be used within a PlayerProvider')
  }
  return context
}

export const PlayerProvider = ({ children }) => {
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true)
  const [filteredPlayers, setFilteredPlayers] = useState([])
  const [teams, setTeams] = useState([])
  const [positions, setPositions] = useState([])

  useEffect(() => {
    const loadPlayers = async () => {
      try {
        // Load the JSON file from the public directory
        const response = await fetch('/players.json')
        if (!response.ok) {
          throw new Error(`Failed to load players data: ${response.status}`)
        }
        
        const csvData = await response.json()
        console.log('Loaded players data:', csvData.length, 'players')
        
        // Transform the CSV data into our app format
        const transformedPlayers = transformPlayerData(csvData)
        console.log('Transformed players:', transformedPlayers.length, 'players')
        
        setPlayers(transformedPlayers)
        setFilteredPlayers(transformedPlayers)
        
        // Extract unique teams and positions
        setTeams(getUniqueTeams(transformedPlayers))
        setPositions(getUniquePositions(transformedPlayers))
        
        setLoading(false)
      } catch (error) {
        console.error('Error loading players:', error)
        // Fallback to mock data if loading fails
        const mockPlayers = [
          {
            id: '1',
            name: 'Erling Haaland',
            position: 'FWD',
            team: 'Manchester City',
            realTeam: 'Manchester City',
            stats: { goals: 18, assists: 5, cleanSheets: 0, saves: 0, tackles: 2, interceptions: 1, keyPasses: 12, shotsOnTarget: 45, minutesPlayed: 1620, yellowCards: 2, redCards: 0, ownGoals: 0 },
            isInjured: false,
            injured: false,
            price: 12.5,
            form: 8.5,
            ownership: 85,
            goals: 18,
            assists: 5,
            cleanSheets: 0
          },
          {
            id: '2',
            name: 'Kevin De Bruyne',
            position: 'MID',
            team: 'Manchester City',
            realTeam: 'Manchester City',
            stats: { goals: 4, assists: 15, cleanSheets: 0, saves: 0, tackles: 18, interceptions: 12, keyPasses: 89, shotsOnTarget: 12, minutesPlayed: 1680, yellowCards: 3, redCards: 0, ownGoals: 0 },
            isInjured: false,
            injured: false,
            price: 11.0,
            form: 8.2,
            ownership: 72,
            goals: 4,
            assists: 15,
            cleanSheets: 0
          },
          {
            id: '3',
            name: 'Mohamed Salah',
            position: 'FWD',
            team: 'Liverpool',
            realTeam: 'Liverpool',
            stats: { goals: 15, assists: 8, cleanSheets: 0, saves: 0, tackles: 5, interceptions: 3, keyPasses: 35, shotsOnTarget: 38, minutesPlayed: 1750, yellowCards: 1, redCards: 0, ownGoals: 0 },
            isInjured: false,
            injured: false,
            price: 11.5,
            form: 8.0,
            ownership: 78,
            goals: 15,
            assists: 8,
            cleanSheets: 0
          },
          {
            id: '4',
            name: 'Bukayo Saka',
            position: 'MID',
            team: 'Arsenal',
            realTeam: 'Arsenal',
            stats: { goals: 8, assists: 12, cleanSheets: 0, saves: 0, tackles: 12, interceptions: 8, keyPasses: 45, shotsOnTarget: 22, minutesPlayed: 1650, yellowCards: 2, redCards: 0, ownGoals: 0 },
            isInjured: false,
            injured: false,
            price: 9.5,
            form: 7.8,
            ownership: 65,
            goals: 8,
            assists: 12,
            cleanSheets: 0
          },
          {
            id: '5',
            name: 'Cole Palmer',
            position: 'MID',
            team: 'Chelsea',
            realTeam: 'Chelsea',
            stats: { goals: 12, assists: 9, cleanSheets: 0, saves: 0, tackles: 8, interceptions: 6, keyPasses: 38, shotsOnTarget: 28, minutesPlayed: 1580, yellowCards: 3, redCards: 0, ownGoals: 0 },
            isInjured: false,
            injured: false,
            price: 8.5,
            form: 8.3,
            ownership: 58,
            goals: 12,
            assists: 9,
            cleanSheets: 0
          },
          {
            id: '6',
            name: 'Virgil van Dijk',
            position: 'DEF',
            team: 'Liverpool',
            realTeam: 'Liverpool',
            stats: { goals: 2, assists: 1, cleanSheets: 12, saves: 0, tackles: 35, interceptions: 45, keyPasses: 8, shotsOnTarget: 5, minutesPlayed: 1890, yellowCards: 2, redCards: 0, ownGoals: 0 },
            isInjured: false,
            injured: false,
            price: 6.5,
            form: 7.5,
            ownership: 42,
            goals: 2,
            assists: 1,
            cleanSheets: 12
          },
          {
            id: '7',
            name: 'Alisson',
            position: 'GK',
            team: 'Liverpool',
            realTeam: 'Liverpool',
            stats: { goals: 0, assists: 0, cleanSheets: 14, saves: 85, tackles: 0, interceptions: 2, keyPasses: 0, shotsOnTarget: 0, minutesPlayed: 1980, yellowCards: 1, redCards: 0, ownGoals: 0 },
            isInjured: false,
            injured: false,
            price: 5.5,
            form: 7.8,
            ownership: 35,
            goals: 0,
            assists: 0,
            cleanSheets: 14
          },
          {
            id: '8',
            name: 'Ollie Watkins',
            position: 'FWD',
            team: 'Aston Villa',
            realTeam: 'Aston Villa',
            stats: { goals: 11, assists: 6, cleanSheets: 0, saves: 0, tackles: 3, interceptions: 2, keyPasses: 18, shotsOnTarget: 25, minutesPlayed: 1450, yellowCards: 2, redCards: 0, ownGoals: 0 },
            isInjured: false,
            injured: false,
            price: 7.5,
            form: 7.2,
            ownership: 28,
            goals: 11,
            assists: 6,
            cleanSheets: 0
          }
        ]
        
        setPlayers(mockPlayers)
        setFilteredPlayers(mockPlayers)
        setTeams(['Manchester City', 'Liverpool', 'Arsenal', 'Chelsea', 'Aston Villa'])
        setPositions(['GK', 'DEF', 'MID', 'FWD'])
        setLoading(false)
      }
    }

    loadPlayers()
  }, [])

  const calculatePlayerPoints = (player) => {
    const stats = player.stats
    let points = 0

    switch (player.position) {
      case 'GK':
        points += stats.goals * 6
        points += stats.assists * 3
        points += stats.cleanSheets * 4
        points += stats.saves * 1
        points += stats.yellowCards * -1
        points += stats.redCards * -3
        points += stats.ownGoals * -2
        break
      case 'DEF':
        points += stats.goals * 6
        points += stats.assists * 3
        points += stats.cleanSheets * 4
        points += stats.tackles * 0.5
        points += stats.interceptions * 0.5
        points += stats.yellowCards * -1
        points += stats.redCards * -3
        points += stats.ownGoals * -2
        break
      case 'MID':
        points += stats.goals * 5
        points += stats.assists * 3
        points += stats.keyPasses * 0.5
        points += stats.tackles * 0.5
        points += stats.interceptions * 0.5
        points += stats.yellowCards * -1
        points += stats.redCards * -3
        points += stats.ownGoals * -2
        break
      case 'FWD':
        points += stats.goals * 4
        points += stats.assists * 3
        points += stats.shotsOnTarget * 0.5
        points += stats.keyPasses * 0.5
        points += stats.yellowCards * -1
        points += stats.redCards * -3
        points += stats.ownGoals * -2
        break
    }

    return Math.round(points * 10) / 10
  }

  const filterPlayers = (filters) => {
    let filtered = [...players]

    if (filters.position) {
      filtered = filtered.filter(player => player.position === filters.position)
    }

    if (filters.team) {
      filtered = filtered.filter(player => (player.team || player.realTeam) === filters.team)
    }

    if (filters.search) {
      filtered = filtered.filter(player => 
        player.name.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    if (filters.available) {
      filtered = filtered.filter(player => !player.isInjured)
    }

    setFilteredPlayers(filtered)
  }

  const getPlayerById = (id) => {
    return players.find(player => player.id === id)
  }

  const value = {
    players,
    filteredPlayers,
    teams,
    positions,
    loading,
    calculatePlayerPoints,
    filterPlayers,
    getPlayerById
  }

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  )
} 