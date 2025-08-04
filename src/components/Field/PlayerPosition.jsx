import React from 'react';
import { useDrag } from 'react-dnd';
import KitIcon from '../PlayerCard/KitIcon';
import './Field.css';

const ItemTypes = {
  PLAYER: 'player',
};

const PlayerPosition = ({ player, position, isEditMode }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.PLAYER,
    item: { id: player.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={isEditMode ? drag : null}
      className="player-position"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <KitIcon
        teamColors={player.teamColors}
        squadNumber={player.squadNumber}
        playerName={player.name}
      />
    </div>
  );
};

export default PlayerPosition;
