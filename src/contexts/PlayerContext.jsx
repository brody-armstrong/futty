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
          throw new Error('Failed to load players data')
        }
        
        const csvData = await response.json()
        
        // Transform the CSV data into our app format
        const transformedPlayers = transformPlayerData(csvData)
        
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
            realTeam: 'Manchester City',
            stats: {
              goals: 18,
              assists: 5,
              cleanSheets: 0,
              saves: 0,
              tackles: 2,
              interceptions: 1,
              keyPasses: 12,
              shotsOnTarget: 45,
              minutesPlayed: 1620,
              yellowCards: 2,
              redCards: 0,
              ownGoals: 0
            },
            isInjured: false,
            price: 12.5,
            form: 8.5
          },
          {
            id: '2',
            name: 'Kevin De Bruyne',
            position: 'MID',
            realTeam: 'Manchester City',
            stats: {
              goals: 4,
              assists: 15,
              cleanSheets: 0,
              saves: 0,
              tackles: 18,
              interceptions: 12,
              keyPasses: 89,
              shotsOnTarget: 12,
              minutesPlayed: 1680,
              yellowCards: 3,
              redCards: 0,
              ownGoals: 0
            },
            isInjured: false,
            price: 11.0,
            form: 8.2
          }
        ]
        
        setPlayers(mockPlayers)
        setFilteredPlayers(mockPlayers)
        setTeams(['Manchester City', 'Liverpool', 'Arsenal'])
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
      filtered = filtered.filter(player => player.realTeam === filters.team)
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