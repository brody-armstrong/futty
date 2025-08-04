import { useAuth } from '../contexts/AuthContext'
import { useLeagues } from '../contexts/LeagueContext'
import { usePlayers } from '../contexts/PlayerContext'

const DebugInfo = () => {
  const { user, loading: authLoading } = useAuth()
  const { leagues, userTeams, loading: leaguesLoading } = useLeagues()
  const { players, loading: playersLoading } = usePlayers()

  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="fixed top-4 right-4 bg-black bg-opacity-75 text-white p-4 rounded-lg text-xs z-50 max-w-xs">
      <h3 className="font-bold mb-2">Debug Info</h3>
      <div className="space-y-1">
        <div>Auth Loading: {authLoading ? 'Yes' : 'No'}</div>
        <div>User: {user ? user.username : 'None'}</div>
        <div>Leagues Loading: {leaguesLoading ? 'Yes' : 'No'}</div>
        <div>Leagues: {leagues.length}</div>
        <div>Teams: {userTeams.length}</div>
        <div>Players Loading: {playersLoading ? 'Yes' : 'No'}</div>
        <div>Players: {players.length}</div>
      </div>
    </div>
  )
}

export default DebugInfo 