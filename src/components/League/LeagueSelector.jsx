import React from 'react';
import { useLeagues } from '../../contexts/LeagueContext';

const LeagueSelector = () => {
  const { userLeagues, selectedLeagueId, switchLeague } = useLeagues();

  const handleLeagueChange = (e) => {
    switchLeague(e.target.value);
  };

  return (
    <div className="league-selector">
      <select
        className="league-dropdown"
        value={selectedLeagueId}
        onChange={handleLeagueChange}
      >
        {userLeagues.map(league => (
          <option key={league.id} value={league.id}>
            {league.name} (GW {league.currentGameweek})
          </option>
        ))}
      </select>
    </div>
  );
};

export default LeagueSelector;
