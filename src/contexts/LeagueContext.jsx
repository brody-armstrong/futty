import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const LeagueContext = createContext()

export const useLeagues = () => {
  const context = useContext(LeagueContext)
  if (!context) {
    throw new Error('useLeagues must be used within a LeagueProvider')
  }
  return context
}

export const LeagueProvider = ({ children }) => {
  const { user } = useAuth()
  const [leagues, setLeagues] = useState([])
  const [userTeams, setUserTeams] = useState([])
  const [currentTeam, setCurrentTeam] = useState(null)
  const [loading, setLoading] = useState(true)

  // Mock league data
  const mockLeagues = [
    {
      id: '1',
      name: 'Premier League Fantasy',
      creatorID: '1',
      settings: {
        maxTeams: 10,
        draftType: 'snake',
        scoringType: 'head-to-head',
        transferLimit: 2,
        wildcardAvailable: true
      },
      teams: [
        {
          id: '1',
          name: 'Haaland\'s Heroes',
          ownerID: '1',
          leagueID: '1',
          roster: [],
          totalPoints: 0,
          rank: 1
        },
        {
          id: '2',
          name: 'De Bruyne Dynasty',
          ownerID: '2',
          leagueID: '1',
          roster: [],
          totalPoints: 0,
          rank: 2
        }
      ],
      draftDate: new Date('2024-08-15T18:00:00Z'),
      status: 'draft-pending'
    },
    {
      id: '2',
      name: 'Champions League Elite',
      creatorID: '1',
      settings: {
        maxTeams: 8,
        draftType: 'snake',
        scoringType: 'head-to-head',
        transferLimit: 1,
        wildcardAvailable: false
      },
      teams: [
        {
          id: '3',
          name: 'City Legends',
          ownerID: '1',
          leagueID: '2',
          roster: [],
          totalPoints: 0,
          rank: 1
        }
      ],
      draftDate: new Date('2024-08-20T18:00:00Z'),
      status: 'draft-pending'
    },
    {
      id: '3',
      name: 'Europa League Warriors',
      creatorID: '1',
      settings: {
        maxTeams: 12,
        draftType: 'snake',
        scoringType: 'head-to-head',
        transferLimit: 3,
        wildcardAvailable: true
      },
      teams: [
        {
          id: '4',
          name: 'Riverside FC',
          ownerID: '1',
          leagueID: '3',
          roster: [],
          totalPoints: 0,
          rank: 1
        }
      ],
      draftDate: new Date('2024-08-25T18:00:00Z'),
      status: 'draft-pending'
    }
  ]

  const mockUserTeams = [
    {
      id: '1',
      name: 'Haaland\'s Heroes',
      ownerID: '1',
      leagueID: '1',
      roster: [],
      totalPoints: 0,
      rank: 1,
      lineup: {
        starters: {
          GK: null,
          DEF1: null,
          DEF2: null,
          DEF3: null,
          MID1: null,
          MID2: null,
          MID3: null,
          FWD1: null,
          FWD2: null
        },
        bench: []
      }
    },
    {
      id: '3',
      name: 'City Legends',
      ownerID: '1',
      leagueID: '2',
      roster: [],
      totalPoints: 0,
      rank: 1,
      lineup: {
        starters: {
          GK: null,
          DEF1: null,
          DEF2: null,
          DEF3: null,
          MID1: null,
          MID2: null,
          MID3: null,
          FWD1: null,
          FWD2: null
        },
        bench: []
      }
    },
    {
      id: '4',
      name: 'Riverside FC',
      ownerID: '1',
      leagueID: '3',
      roster: [],
      totalPoints: 0,
      rank: 1,
      lineup: {
        starters: {
          GK: null,
          DEF1: null,
          DEF2: null,
          DEF3: null,
          MID1: null,
          MID2: null,
          MID3: null,
          FWD1: null,
          FWD2: null
        },
        bench: []
      }
    }
  ]

  // Load current team from localStorage
  useEffect(() => {
    if (userTeams.length > 0) {
      const lastViewed = localStorage.getItem('lastViewedTeam')
      const favoriteTeam = localStorage.getItem('favoriteTeam')
      const teamToUse = lastViewed || favoriteTeam || userTeams[0]?.id
      const selectedTeam = userTeams.find(team => team.id === teamToUse)
      
      if (selectedTeam) {
        setCurrentTeam(selectedTeam)
      } else {
        setCurrentTeam(userTeams[0])
      }
    }
  }, [userTeams])

  useEffect(() => {
    if (user) {
      // Simulate API call
      setTimeout(() => {
        setLeagues(mockLeagues)
        setUserTeams(mockUserTeams)
        setLoading(false)
      }, 1000)
    }
  }, [user])

  const createLeague = (leagueData) => {
    const newLeague = {
      id: Date.now().toString(),
      ...leagueData,
      creatorID: user.id,
      teams: [],
      status: 'draft-pending',
      createdAt: new Date().toISOString()
    }
    
    setLeagues(prev => [...prev, newLeague])
    return newLeague
  }

  const joinLeague = (leagueId) => {
    const league = leagues.find(l => l.id === leagueId)
    if (league && league.teams.length < league.settings.maxTeams) {
      const newTeam = {
        id: Date.now().toString(),
        name: `${user.username}'s Team`,
        ownerID: user.id,
        leagueID: leagueId,
        roster: [],
        totalPoints: 0,
        rank: league.teams.length + 1
      }
      
      setUserTeams(prev => [...prev, newTeam])
      setLeagues(prev => prev.map(l => 
        l.id === leagueId 
          ? { ...l, teams: [...l.teams, newTeam] }
          : l
      ))
    }
  }

  const updateTeamLineup = (teamId, lineup) => {
    setUserTeams(prev => prev.map(team => 
      team.id === teamId 
        ? { ...team, lineup }
        : team
    ))
  }

  const addPlayerToTeam = (teamId, player) => {
    setUserTeams(prev => prev.map(team => 
      team.id === teamId 
        ? { ...team, roster: [...team.roster, player] }
        : team
    ))
  }

  const removePlayerFromTeam = (teamId, playerId) => {
    setUserTeams(prev => prev.map(team => 
      team.id === teamId 
        ? { ...team, roster: team.roster.filter(p => p.id !== playerId) }
        : team
    ))
  }

  const getLeagueById = (id) => {
    return leagues.find(league => league.id === id)
  }

  const getUserTeamInLeague = (leagueId) => {
    return userTeams.find(team => team.leagueID === leagueId)
  }

  const setCurrentTeamById = (teamId) => {
    const team = userTeams.find(t => t.id === teamId)
    if (team) {
      setCurrentTeam(team)
      localStorage.setItem('lastViewedTeam', teamId)
    }
  }

  const getCurrentTeam = () => {
    return currentTeam
  }

  const value = {
    leagues,
    userTeams,
    currentTeam,
    loading,
    createLeague,
    joinLeague,
    updateTeamLineup,
    addPlayerToTeam,
    removePlayerFromTeam,
    getLeagueById,
    getUserTeamInLeague,
    setCurrentTeamById,
    getCurrentTeam
  }

  return (
    <LeagueContext.Provider value={value}>
      {children}
    </LeagueContext.Provider>
  )
} 