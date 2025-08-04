import React from 'react';
import { useLeagues } from '../contexts/LeagueContext';
import LeagueSelector from '../components/League/LeagueSelector';
import MatchupView from '../components/League/MatchupView';
import NoLeaguePrompt from '../components/League/NoLeaguePrompt';

const Leagues = () => {
  const { userLeagues, selectedLeagueId, currentMatchup } = useLeagues();

  if (userLeagues.length === 0) {
    return <NoLeaguePrompt />;
  }

  return (
    <div className="leagues-container">
      <LeagueSelector />
      <MatchupView matchup={currentMatchup} />
    </div>
  );
};

export default Leagues;