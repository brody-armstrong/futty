import React from 'react';
import { useDrop } from 'react-dnd';
import { useField } from '../../contexts/FieldContext';
import { usePlayers } from '../../contexts/PlayerContext';
import PlayerPosition from './PlayerPosition';
import './Field.css';

const ItemTypes = {
  PLAYER: 'player',
};

const SoccerField = ({ teamData, isEditMode = false, isOpponent = false }) => {
  const { fieldPositions, movePlayer } = useField();
  const { getPlayerById } = usePlayers();

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.PLAYER,
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);
      movePlayer(item.id, { x: left, y: top });
    },
  }));

  const renderPlayerPositions = () => {
    return Object.keys(fieldPositions).map(zone => {
      return fieldPositions[zone].map(position => {
        const player = getPlayerById(position.playerId);
        if (player) {
          return (
            <PlayerPosition
              key={player.id}
              player={player}
              position={position}
              isEditMode={isEditMode}
            />
          );
        }
        return null;
      });
    });
  };

  const FormationOverlay = () => {
    // Implement this later
    return null;
  }

  const EditModeControls = () => {
    // Implement this later
    return null;
  }

  return (
    <div ref={drop} className="soccer-field-container">
      <div className="field-background">
        <FormationOverlay />
        {renderPlayerPositions()}
        {isEditMode && <EditModeControls />}
      </div>
    </div>
  );
};

export default SoccerField;
