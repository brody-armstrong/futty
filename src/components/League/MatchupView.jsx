import React from 'react';
import SoccerField from '../Field/SoccerField';

const MatchupView = ({ matchup }) => {
  return (
    <div className="matchup-container">
      <div className="matchup-header">
        <h2>Gameweek {matchup.gameweek}</h2>
        <div className="live-indicator">● LIVE</div>
      </div>

      <div className="teams-display">
        {/* User Team - Left Side */}
        <div className="team-side user-team">
          <div className="team-score">{matchup.userScore}</div>
          <SoccerField
            teamData={matchup.userTeam}
            isEditMode={false}
            isOpponent={false}
          />
          <div className="team-name">Your Team</div>
        </div>

        {/* VS Divider */}
        <div className="vs-divider">VS</div>

        {/* Opponent Team - Right Side */}
        <div className="team-side opponent-team">
          <div className="team-score">{matchup.opponentScore}</div>
          <SoccerField
            teamData={matchup.opponentTeam}
            isEditMode={false}
            isOpponent={true}
          />
          <div className="team-name">{matchup.opponent.name}</div>
        </div>
      </div>

      <div className="matchup-actions">
        <button className="btn-secondary">League Standings</button>
        <button className="btn-secondary">Upcoming Fixtures</button>
      </div>
    </div>
  );
};

export default MatchupView;
