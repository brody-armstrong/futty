import React from 'react';
import './KitIcon.css';

const KitIcon = ({ teamColors, squadNumber, playerName, size = 'md' }) => {
  return (
    <div className={`kit-icon kit-${size}`}>
      {/* SVG Jersey Shape */}
      <svg viewBox="0 0 60 70" className="jersey-svg">
        <path
          d="M15,10 L45,10 L50,20 L50,65 L10,65 L10,20 Z"
          fill={teamColors.primary}
          stroke={teamColors.secondary}
          strokeWidth="2"
        />
      </svg>

      {/* Squad Number */}
      <div className="squad-number" style={{ color: teamColors.secondary }}>
        {squadNumber}
      </div>

      {/* Player Name (on hover) */}
      <div className="player-tooltip">
        {playerName}
      </div>
    </div>
  );
};

export default KitIcon;
