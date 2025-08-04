import React from 'react';
import { useField } from '../contexts/FieldContext';
import { usePlayers } from '../contexts/PlayerContext';
import SoccerField from '../components/Field/SoccerField';
import PlayerCard from '../components/PlayerCard/PlayerCard'; // Assuming this component exists

const Teams = () => {
  const { isEditMode, toggleEditMode } = useField();
  const { players } = usePlayers(); // Assuming this provides all players

  // Mock data for user's team and bench
  const userTeam = players.slice(0, 9);
  const benchPlayers = players.slice(9, 14);

  return (
    <div className="teams-container">
      <div className="team-header">
        <h1>My Team</h1>
        <button
          className={`edit-btn ${isEditMode ? 'editing' : ''}`}
          onClick={toggleEditMode}
        >
          {isEditMode ? 'Save Lineup' : 'Edit Lineup'}
        </button>
      </div>

      <div className="field-section">
        <SoccerField
          teamData={userTeam}
          isEditMode={isEditMode}
        />
      </div>

      {isEditMode && (
        <div className="bench-section">
          <h3>Bench Players</h3>
          <div className="bench-players">
            {benchPlayers.map(player => (
              <PlayerCard key={player.id} player={player} isDraggable />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Teams;